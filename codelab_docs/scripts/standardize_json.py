import os
import json
from pathlib import Path

def standardize_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return False

    # Check if already standardized (nested structure)
    if (
        "visualizerParams" in data
        and isinstance(data["visualizerParams"], dict)
        and "visualizerType" in data["visualizerParams"]
    ):
        # Even if nested, ensure the internal fields are correct
        return False

    difficulty = data.get("difficulty", "medium")
    if isinstance(difficulty, str):
        difficulty = difficulty.lower()
    if difficulty not in ["beginner", "medium", "advanced"]:
        difficulty = "medium"

    filename = file_path.name.lower()

    if "guided_practice" in filename:
        v_type = "GuidedPractice"
        # Extract fields from flat structure
        code = data.get("code", data.get("finalCode", ""))
        new_params = {
            "mode": "snippet",
            "title": data.get("title", "Guided Practice"),
            "description": data.get("description", "Complete the code snippet."),
            "language": "python",
            "ghostCode": data.get("ghostCode", code),
            "finalCode": data.get("finalCode", code)
        }
    elif "bug_squasher" in filename:
        v_type = "BugSquasherScenario"
        sol_data = data.get("solution", {})
        if isinstance(sol_data, str):
            sol_code = sol_data
            sol_expl = "Fix the logic bug."
        else:
            sol_code = sol_data.get("code", "")
            sol_expl = sol_data.get("explanation", "Fix the logic bug.")

        new_params = {
            "title": data.get("title", "Bug Squasher"),
            "problemDescription": data.get("description", "Find and fix the logic bug."),
            "language": "python",
            "buggyCode": data.get("code", data.get("buggyCode", "")),
            "solution": {
                "code": sol_code,
                "explanation": sol_expl
            }
        }
    elif "code_refactor" in filename:
        v_type = "CodeRefactorChallenge"
        sol_data = data.get("solution", {})
        if isinstance(sol_data, str):
            sol_code = sol_data
            sol_expl = "Refactor for better quality."
        else:
            sol_code = data.get("refactoredCode", sol_data.get("code", ""))
            sol_expl = data.get("explanation", sol_data.get("explanation", "Refactor for better quality."))

        new_params = {
            "title": data.get("title", "Code Refactor"),
            "problemDescription": data.get("description", "Refactor the following code for better performance or readability."),
            "language": "python",
            "initialCode": data.get("code", data.get("initialCode", "")),
            "solution": {
                "code": sol_code,
                "explanation": sol_expl
            }
        }
    else:
        return False

    final_json = {
        "difficulty": difficulty,
        "visualizerParams": {
            "visualizerType": v_type,
            "visualizerParams": new_params
        }
    }

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(final_json, f, indent=2)
    return True

def main():
    base_dir = Path("codelab_docs/scripts/output_json/python/batch_01")
    count = 0
    for json_file in base_dir.rglob("*.json"):
        if standardize_json(json_file):
            print(f"Standardized: {json_file}")
            count += 1
    print(f"Finished. Total files standardized: {count}")

if __name__ == "__main__":
    main()
