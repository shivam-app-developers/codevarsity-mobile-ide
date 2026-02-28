# Practice Snippets Generation Workflow

This guide details the end-to-end process for generating practice modules for the Codevarsity app using the Gemini Batch API.

The strategy behind this pipeline (Option A) relies on writing high-quality, working code snippets manually, and allowing the LLM to expand each snippet into three related challenges (Bug Squasher, Code Refactor, and Guided Practice).

## Directory Structure

Ensure you are in the `codelab_docs/scripts` directory. The pipeline uses the following structure:

```text
codelab_docs/
└── scripts/
    ├── input_snippets/
    │   ├── python/              # Drop clean python scripts here
    │   └── dart/                # Drop clean dart scripts here
    ├── output_json/             # The Gemini output JSONs will be saved here in subfolders
    ├── generate_practice_snippets.py # The main generator script
    ├── validate_snippets.py         # The schema verification script
    └── schemas.py                   # (In parent dir) Defines the JSON rules
```

## Step 1: Preparation

1. **Write Clean Code:** Create standard, working scripts in your language of choice (e.g., `01_loops.py`, `02_async.dart`).
2. **Place Files:** Copy all these files into language-specific folders like `codelab_docs/scripts/input_snippets/python/`.
3. **Set API Key:** Ensure your `.env` file contains your `GOOGLE_API_KEY`.

## Step 2: Submit the Batch Job To Gemini

To generate the 3 visualizer modes for each file without paying the synchronous API markup, submit a Gemini Batch Job.

Run the following command from the `scripts` folder:

```bash
python generate_practice_snippets.py --submit --language python --input_dir input_snippets/python/batch_01 --output_dir output_json/python
```

*(This reads only the files in `--input_dir`. The `--language` flag is still required to set the correct metadata inside the JSON payloads.)*

This command reads all files in the target input directory, creates the complex prompts for the three modes, packages them into a `.jsonl` file, and uploads it to Google.

**IMPORTANT:** The output will give you a `Job ID` (e.g., `batches/123xxxyyy`). **Save this ID.**

## Step 3: Fetch the Results (with Auto-Polling)

Gemini Batch jobs typically take between 5 to 15 minutes to process depending on the queue size.

Run the script in fetch mode with the `--poll` flag so you don't have to manually check:

```bash
python generate_practice_snippets.py --fetch batches/YOUR_JOB_ID_HERE --poll --output_dir output_json
```

**What this does:**

* It checks the status of your task every 5 minutes.
* Once the job succeeds, it downloads the large JSONL result file.
* It parses the LLM Markdown and wraps everything into the exact schema expected by the Codevarsity Dart code.
* It saves all fully-formatted JSON payloads into language and difficulty subfolders like `output_json/python/medium/` based on the original filenames.

## Step 4: Validate the JSON Schemas

Before loading the files into the app, it is highly recommended to validate that the LLM successfully adhered to the strict structure defined in `schemas.py`.

Run the validation script:

```bash
python validate_snippets.py --output_dir output_json
```

This will run `jsonschema` verification on every generated file. If any file fails, the script will output the exact missing key or formatting error, allowing you to manually repair it or re-generate that specific snippet.

## Step 5: Integration

Copy the files from `output_json/<language>/<difficulty>/` into your main Codevarsity course payload folder (`course_content/`) and import them into the application payload as usual.
