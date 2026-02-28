import os
import json
import argparse
import time
from pathlib import Path
from tqdm import tqdm
import sys
from dotenv import load_dotenv

# Add parent directory to sys.path to allow importing schemas.py
sys.path.append(str(Path(__file__).parent.parent))
from schemas import VISUALIZER_SCHEMAS

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("Required library not found. Please run: pip install google-genai")
    exit()

# Configure the model
MODEL = "gemini-2.5-flash"

PROMPT_TEMPLATES = {
    "bug_squasher": """
You are an expert coding instructor. Below is a clean, perfectly working code snippet in {language}.
Your task is to introduce a realistic, subtle, and educational bug into this code (e.g., an off-by-one error, an incorrect variable reference, missing return, logic flaw).

Generate a JSON object for a `BugSquasherScenario` using this buggy code. The `solution` should contain the original perfect code.
The JSON must strictly follow this schema for the `visualizerParams` object:
{schema}

## Critical Instruction
1. You must return the object exactly as defined above, wrapped in a parent JSON object that ALSO includes a "difficulty" property.
2. Evaluate the code complexity and assign a difficulty of exactly "beginner", "medium", or "advanced".
3. Mobile Optimization: In your generated `initialCode`, `solution`, and `ghostCode` fields, you MUST aggressively strip out all explanatory comments, docstrings, and wikipedia links to keep the code extremely concise for mobile screens. Use clear variable names instead of long comments.
4. Interactive Execution (Mobile Runnable): Users will run this code in a mobile terminal. You MUST ensure the code is complete and runnable by adding a main entry point if missing:
   - **Python**: Use `if __name__ == "__main__":` with `print()` calls.
   - **C**: Use `int main() { ... }` with `printf()`.
   - **Java**: Use `public static void main(String[] args) { ... }` with `System.out.println()`.
   - **Go**: Ensure `package main` and `func main() { ... }` with `fmt.Println()`.
   - **JavaScript**: Ensure evidence of calling the primary function with sample inputs via `console.log()`.
   - **Web (HTML/CSS)**: Ensure the HTML is a complete, standalone document if needed for the scenario.

The final JSON output MUST match this exact schema:
{{
  "difficulty": "beginner|medium|advanced",
  "visualizerParams": {{ ... above schema ... }}
}}

Original Code:
```{language}
{code}
```

Return ONLY the valid JSON object. Do not include markdown formatting or commentary.
""",
    "code_refactor": """
You are an expert coding instructor. Below is a clean, efficient, and working code snippet in {language}.
Your task is to rewrite this code to be INEFFICIENT or messy (e.g., using O(n^2) nested loops instead of a set, using string concatenation in a loop instead of builder, etc.).

Generate a JSON object for a `CodeRefactorChallenge` using your inefficient code as `initialCode`. The `solution` should contain the original clean code.
The JSON must strictly follow this schema for the `visualizerParams` object:
{schema}

## Critical Instruction
1. You must return the object exactly as defined above, wrapped in a parent JSON object that ALSO includes a "difficulty" property.
2. Evaluate the code complexity and assign a difficulty of exactly "beginner", "medium", or "advanced".
3. Mobile Optimization: In your generated `initialCode`, `solution`, and `ghostCode` fields, you MUST aggressively strip out all explanatory comments, docstrings, and wikipedia links to keep the code extremely concise for mobile screens. Use clear variable names instead of long comments.
4. Interactive Execution (Mobile Runnable): Users will run this code in a mobile terminal. You MUST ensure the code is complete and runnable by adding a main entry point if missing:
   - **Python**: Use `if __name__ == "__main__":` with `print()` calls.
   - **C**: Use `int main() { ... }` with `printf()`.
   - **Java**: Use `public static void main(String[] args) { ... }` with `System.out.println()`.
   - **Go**: Ensure `package main` and `func main() { ... }` with `fmt.Println()`.
   - **JavaScript**: Ensure evidence of calling the primary function with sample inputs via `console.log()`.

The final JSON output MUST match this exact schema:
{{
  "difficulty": "beginner|medium|advanced",
  "visualizerParams": {{ ... above schema ... }}
}}

Original Clean Code:
```{language}
{code}
```

Return ONLY the valid JSON object. Do not include markdown formatting or commentary.
""",
    "guided_practice": """
You are an expert coding instructor. Below is a code snippet in {language}.
Your task is to create a simple typing drill/walkthrough for this code using `snippet` mode.

Generate a JSON object for a `GuidedPractice` visualizer. 
Set `mode` to "snippet".
Set `ghostCode` to the provided code (or the most important part the user should type).
Set `finalCode` to the fully completed code.
The JSON must strictly follow this schema for the `visualizerParams` object:
{schema}

## Critical Instruction
1. You must return the object exactly as defined above, wrapped in a parent JSON object that ALSO includes a "difficulty" property.
2. Evaluate the code complexity and assign a difficulty of exactly "beginner", "medium", or "advanced".
3. Mobile Optimization: In your generated `initialCode`, `solution`, and `ghostCode` fields, you MUST aggressively strip out all explanatory comments, docstrings, and wikipedia links to keep the code extremely concise for mobile screens. Use clear variable names instead of long comments.
4. Interactive Execution (Mobile Runnable): Users will run this code in a mobile terminal. You MUST ensure the code is complete and runnable by adding a main entry point if missing:
   - **Python**: Use `if __name__ == "__main__":` with `print()` calls.
   - **C**: Use `int main() { ... }` with `printf()`.
   - **Java**: Use `public static void main(String[] args) { ... }` with `System.out.println()`.
   - **Go**: Ensure `package main` and `func main() { ... }` with `fmt.Println()`.
   - **JavaScript**: Ensure evidence of calling the primary function with sample inputs via `console.log()`.

The final JSON output MUST match this exact schema:
{{
  "difficulty": "beginner|medium|advanced",
  "visualizerParams": {{ ... above schema ... }}
}}

Original Code:
```{language}
{code}
```

Return ONLY the valid JSON object. Do not include markdown formatting or commentary.
""",
}


def get_schema(challenge_type):
    if challenge_type == "bug_squasher":
        schema_key = "BugSquasherScenario"
    elif challenge_type == "code_refactor":
        schema_key = "CodeRefactorChallenge"
    elif challenge_type == "guided_practice":
        schema_key = "GuidedPractice"
    else:
        raise ValueError(f"Unknown challenge type: {challenge_type}")

    return VISUALIZER_SCHEMAS[schema_key]["properties"]["visualizerParams"]


def determine_difficulty(file_path: Path):
    # We now offload difficulty determination to the LLM.
    # Returning a placeholder here because the filename ID needs something,
    # but the actual file routing will happen during the fetch phase based on LLM output.
    return "auto"


def construct_batch_request(language, file_stem, challenge_type, code_content):
    schema = get_schema(challenge_type)
    prompt = PROMPT_TEMPLATES[challenge_type].format(
        language=language, code=code_content, schema=json.dumps(schema)
    )

    # ID format: {language}_{challenge_type}_{file_stem}
    # This ensures related snippets share the file_stem part.
    # Note: difficulty is injected locally later.
    req_id = f"{language}_{challenge_type}_{file_stem}"

    # We map to the REST GenerateContentRequest body
    request_body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2,
        },
    }

    return {"id": req_id, "request": request_body}


def submit_batch(client, args):
    input_path = Path(args.input_dir)
    if not input_path.exists():
        print(f"Error: Input directory {input_path} does not exist.")
        return

    files_to_process = [f for f in input_path.iterdir() if f.is_file()]
    if not files_to_process:
        print(f"No files found in {input_path}.")
        return

    challenge_types = ["bug_squasher", "code_refactor", "guided_practice"]
    jsonl_filename = f"batch_input_{args.language}_{int(time.time())}.jsonl"
    jsonl_path = Path(jsonl_filename)

    print(f"Preparing {len(files_to_process) * len(challenge_types)} requests...")

    with open(jsonl_path, "w", encoding="utf-8") as f:
        for file_path in files_to_process:
            with open(file_path, "r", encoding="utf-8") as in_f:
                code_content = in_f.read()

            for c_type in challenge_types:
                req = construct_batch_request(
                    args.language, file_path.stem, c_type, code_content
                )
                f.write(json.dumps(req) + "\n")

    print(f"Uploading {jsonl_filename} to Gemini...")
    upload_file = client.files.upload(
        file=str(jsonl_path), config={"mime_type": "application/jsonl"}
    )

    print(f"File uploaded as {upload_file.name}. Starting Batch Job...")
    job = client.batches.create(model=MODEL, src=upload_file.name)

    print("\n" + "=" * 50)
    print("✅ BATCH JOB SUCCESSFULLY SUBMITTED")
    print(f"Job Name (ID): {job.name}")
    print(f"Status: {job.state}")
    print("=" * 50)
    print(
        "\nThis job will run asynchronously. To check status and fetch results later, run:"
    )
    print(f"  python generate_practice_snippets.py --fetch {job.name}")

    # Cleanup local jsonl
    if args.cleanup:
        jsonl_path.unlink()


def fetch_batch(client, args):
    while True:
        print(f"Fetching status for job: {args.fetch}")
        job = client.batches.get(name=args.fetch)
        print(f"Current Status: {job.state}")

        if job.state == "JOB_STATE_SUCCEEDED":
            print("Job has completed successfully!")
            if job.dest and job.dest.file_name:
                print("To proceed, you need to download the output file.")
                # The python SDK generally exposes the output GCS or File API URI in job.dest
                print("\nDest details:", job.dest)

                # Since the google-genai SDK abstracts files, we can often fetch the file via the client.files
                try:
                    result_file = client.files.get(name=job.dest.file_name)
                    print(f"Downloading output file: {result_file.name}")
                    content = client.files.download(name=result_file.name)

                    output_path = Path(args.output_dir)
                    output_path.mkdir(parents=True, exist_ok=True)

                    # The output is also JSONL
                    lines = content.splitlines()
                    for line in tqdm(lines, desc="Saving Snippets"):
                        if not line.strip():
                            continue
                        result_obj = json.loads(line)
                        res_id = result_obj.get("id", "unknown_id")

                        # Determine type from ID to wrap it in our schema
                        # ID format: {language}_{challenge_type}_{file_stem}
                        parts = res_id.split("_", 2)
                        c_type = "guided_practice"  # Fallback
                        if len(parts) >= 2:
                            # Re-derive visualizerType
                            if "bug" in parts[1]:
                                c_type = "BugSquasherScenario"
                            elif "refactor" in parts[1]:
                                c_type = "CodeRefactorChallenge"
                            else:
                                c_type = "GuidedPractice"

                        try:
                            raw_json_str = result_obj["response"]["candidates"][0][
                                "content"
                            ]["parts"][0]["text"]
                            # Clean markdown wrappers if present
                            if raw_json_str.startswith("```json"):
                                raw_json_str = raw_json_str[7:-3]

                            params_data = json.loads(raw_json_str)
                        except Exception as e:
                            print(f"❌ Failed to parse response for {res_id}: {e}")
                            continue

                        # Structure final
                        difficulty = params_data.get(
                            "difficulty", "medium"
                        )  # Read LLM difficulty

                        # Ensure visualizerParams is correctly nested
                        v_params = params_data.get("visualizerParams", params_data)

                        final_json = {
                            "visualizerType": c_type,
                            "visualizerParams": v_params,
                        }

                        diff_dir = output_path / difficulty
                        diff_dir.mkdir(exist_ok=True)

                        out_file = diff_dir / f"{res_id}.json"
                        with open(out_file, "w", encoding="utf-8") as f:
                            json.dump(final_json, f, indent=2)

                    print(f"\n✅ All snippets saved to {output_path}")

                except Exception as e:
                    print(f"Error downloading or processing file: {e}")
                    print(
                        "You may need to manually fetch the file from:",
                        job.dest.gcs_uri if job.dest.gcs_uri else job.dest.file_name,
                    )
            else:
                print("No output destination found in job details.")
            break

        elif job.state in ("JOB_STATE_FAILED", "JOB_STATE_CANCELLED"):
            print(f"Job encountered an error or was cancelled. Details: {job.error}")
            break
        else:
            if args.poll:
                print("Job is not yet complete. Sleeping for 5 minutes (--poll)...")
                time.sleep(300)
            else:
                print(
                    "Job is not yet complete. Please check again later or use the --poll flag."
                )
                break


def main():
    parser = argparse.ArgumentParser(
        description="Generate Practice JSON Snippets using Gemini Batch API."
    )
    parser.add_argument(
        "--submit",
        action="store_true",
        help="Reads input_dir, creates a batch job, and submits to Gemini.",
    )
    parser.add_argument(
        "--fetch",
        type=str,
        help="Job ID (e.g., 'batches/123...') to check status and download results.",
    )
    parser.add_argument(
        "--poll",
        action="store_true",
        help="When used with --fetch, keeps the script running and checks status every 5 minutes until complete.",
    )
    parser.add_argument(
        "--input_dir",
        type=str,
        required=False,
        help="Explicit directory containing source code files (used with --submit). e.g., input_snippets/python/batch_01",
    )
    parser.add_argument(
        "--output_dir",
        type=str,
        required=False,
        help="Directory to save generated JSON files. e.g., output_json/python",
    )
    parser.add_argument(
        "--language",
        type=str,
        default="python",
        help="Programming language of the snippets (e.g., python, dart).",
    )
    parser.add_argument(
        "--api_key",
        type=str,
        help="Optional: Pass your GOOGLE_API_KEY directly if not using a .env file.",
    )
    parser.add_argument(
        "--cleanup",
        action="store_true",
        default=True,
        help="Cleanup the generated .jsonl file after upload.",
    )
    args = parser.parse_args()

    env_path = Path(__file__).parent / ".env"
    load_dotenv(env_path)

    api_key = args.api_key or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print(
            f"Error: GOOGLE_API_KEY not found in {env_path} and --api_key not provided."
        )
        return

    client = genai.Client(api_key=api_key)

    if args.submit:
        if not args.input_dir:
            print(
                "Error: --input_dir is required when using --submit. e.g., --input_dir input_snippets/python/batch_01"
            )
            return
        submit_batch(client, args)
    elif args.fetch:
        if not args.output_dir:
            print(
                "Error: --output_dir is required when using --fetch. e.g., --output_dir output_json/python"
            )
            return
        fetch_batch(client, args)
    else:
        print("Please specify either --submit or --fetch <job_id>. Use -h for help.")


if __name__ == "__main__":
    main()
