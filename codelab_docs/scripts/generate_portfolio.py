import os
import json
from pathlib import Path

# Configuration
REPO_OWNER = "shivam-app-developers"
REPO_NAME = "codevarsity-mobile-ide"
BRANCH = "main"
BASE_GITHUB_URL = f"https://raw.githubusercontent.com/{REPO_OWNER}/{REPO_NAME}/{BRANCH}/codelab_docs/scripts/output_json"

OUTPUT_DIR = Path("portfolio")
INPUT_DIR = Path("output_json")


def get_snippet_type(filename):
    filename = filename.lower()
    if "bug_squasher" in filename:
        return "bug_squasher"
    if "code_refactor" in filename:
        return "refactor"
    if "guided_practice" in filename:
        return "guided"
    return "unknown"


def generate_portfolio():
    OUTPUT_DIR.mkdir(exist_ok=True)

    index_data = {"version": 1, "catalogs": []}

    languages = [d.name for d in INPUT_DIR.iterdir() if d.is_dir()]

    for lang in languages:
        catalog_filename = f"practice_{lang}.json"
        catalog_path = OUTPUT_DIR / catalog_filename

        snippets = []
        lang_dir = INPUT_DIR / lang / "test_batch"

        if not lang_dir.exists():
            print(f"Skipping {lang}, test_batch dir not found.")
            continue

        for json_file in lang_dir.glob("*.json"):
            with open(json_file, "r", encoding="utf-8") as f:
                try:
                    data = json.load(f)
                    # Support the nested structure correctly
                    inner_params = data.get("visualizerParams", {}).get(
                        "visualizerParams", {}
                    )
                    title = inner_params.get(
                        "title", json_file.stem.replace("_", " ").title()
                    )
                    difficulty = data.get("difficulty", "medium")

                    snippet_id = json_file.stem
                    snippet_type = get_snippet_type(snippet_id)

                    # URL: {BASE_GITHUB_URL}/{lang}/test_batch/{filename}
                    url = f"{BASE_GITHUB_URL}/{lang}/test_batch/{json_file.name}"

                    snippets.append(
                        {
                            "id": snippet_id,
                            "type": snippet_type,
                            "language": lang,
                            "title": title,
                            "url": url,
                            "difficulty": difficulty,
                        }
                    )
                except Exception as e:
                    print(f"Error parsing {json_file}: {e}")

        if snippets:
            # Sort by difficulty or ID? Let's do ID for consistency
            snippets.sort(key=lambda x: x["id"])

            catalog_data = {"version": 1, "snippets": snippets, "projects": []}

            with open(catalog_path, "w", encoding="utf-8") as f:
                json.dump(catalog_data, f, indent=2)

            index_data["catalogs"].append(
                {
                    "language": lang,
                    "url": f"https://raw.githubusercontent.com/{REPO_OWNER}/{REPO_NAME}/{BRANCH}/codelab_docs/scripts/portfolio/{catalog_filename}",
                }
            )
            print(f"Generated {catalog_filename} with {len(snippets)} snippets.")

    # Sort index by language
    index_data["catalogs"].sort(key=lambda x: x["language"])

    with open(OUTPUT_DIR / "practice_index.json", "w", encoding="utf-8") as f:
        json.dump(index_data, f, indent=2)
    print("Generated practice_index.json")


if __name__ == "__main__":
    generate_portfolio()
