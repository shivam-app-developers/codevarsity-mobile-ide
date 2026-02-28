import os
import json
from pathlib import Path


def fix_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Check if already fixed
    if (
        "visualizerType" in data
        and "visualizerParams" in data
        and isinstance(data["visualizerParams"], dict)
        and "visualizerType" in data["visualizerParams"]
    ):
        return False

    old_params = data.get("visualizerParams", {})
    difficulty = data.get("difficulty", "medium")

    filename = file_path.name.lower()

    if "guided_practice" in filename:
        v_type = "GuidedPractice"
        # GuidedPractice matches my structure mostly, but need to ensure it's nested
        new_params = old_params.copy()
    elif "bug_squasher" in filename:
        v_type = "BugSquasherScenario"
        new_params = {
            "title": old_params.get("title", ""),
            "problemDescription": old_params.get("description", ""),
            "language": old_params.get("language", ""),
            "buggyCode": old_params.get("initialCode", ""),
            "solution": {
                "code": old_params.get("solution", ""),
                "explanation": old_params.get("bugLocation", {}).get(
                    "explanation", "Fix the bug."
                ),
            },
        }
    elif "code_refactor" in filename:
        v_type = "CodeRefactorChallenge"
        new_params = {
            "title": old_params.get("title", ""),
            "problemDescription": old_params.get("description", ""),
            "language": old_params.get("language", ""),
            "initialCode": old_params.get("initialCode", ""),
            "solution": {
                "code": old_params.get("solution", ""),
                "explanation": old_params.get(
                    "refactorReason", "Refactor for better code quality."
                ),
            },
        }
    else:
        return False

    final_json = {
        "difficulty": difficulty,
        "visualizerParams": {"visualizerType": v_type, "visualizerParams": new_params},
    }

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(final_json, f, indent=2)
    return True


def main():
    base_dir = Path("output_json")
    count = 0
    for json_file in base_dir.rglob("*.json"):
        # Skip existing scripts or unrelated files
        if "test_batch" not in str(json_file):
            continue
        if fix_json(json_file):
            print(f"Fixed: {json_file}")
            count += 1
    print(f"Finished. Total files fixed: {count}")


if __name__ == "__main__":
    main()
