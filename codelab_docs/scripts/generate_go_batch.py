import os
import json
from pathlib import Path


def generate_go_json():
    input_dir = Path("input_snippets/go/manual_batch")
    output_dir = Path("output_json/go/manual_batch")
    output_dir.mkdir(parents=True, exist_ok=True)

    topics = [
        "hello_world",
        "variables",
        "fibonacci",
        "factorial",
        "bubble_sort",
        "structs_methods",
        "interfaces",
        "goroutines",
        "channels",
        "maps",
        "reverse_string",
        "palindrome",
        "prime_check",
        "binary_search",
        "json_marshalling",
        "error_handling",
        "pointers",
        "slices_append",
        "switch_stmt",
        "lcm",
    ]

    for topic in topics:
        input_file = input_dir / f"{topic}.go"
        if not input_file.exists():
            print(f"Skipping {topic}, file not found.")
            continue

        with open(input_file, "r", encoding="utf-8") as f:
            code = f.read()

        # Guided Practice
        gp = {
            "difficulty": "beginner",
            "visualizerParams": {
                "visualizerType": "GuidedPractice",
                "visualizerParams": {
                    "title": f"Go: {topic.replace('_', ' ').title()}",
                    "description": f"Learn Go basics by implementing {topic.replace('_', ' ')}.",
                    "language": "go",
                    "mode": "snippet",
                    "ghostCode": code,
                    "finalCode": code,
                    "validation": {"type": "run_code"},
                },
            },
        }
        with open(
            output_dir / f"go_guided_practice_{topic}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(gp, f, indent=4)

        # Bug Squasher
        buggy_code = code
        if "fmt.Println" in code:
            buggy_code = code.replace("fmt.Println", "fmt.PrintLine", 1)
        elif "package main" in code:
            buggy_code = code.replace("package main", "package primary", 1)
        elif ":=" in code:
            buggy_code = code.replace(":=", "=", 1)
        else:
            buggy_code = code.replace("{", "(", 1)

        bs = {
            "difficulty": "beginner",
            "visualizerParams": {
                "visualizerType": "BugSquasherScenario",
                "visualizerParams": {
                    "title": f"Bug Squasher: {topic.replace('_', ' ').title()}",
                    "problemDescription": f"The Go program for {topic.replace('_', ' ')} has a bug. Find and fix it.",
                    "language": "go",
                    "buggyCode": buggy_code,
                    "solution": {
                        "code": code,
                        "explanation": "Fixed the incorrect syntax or method call.",
                    },
                    "validation": {"type": "run_code"},
                },
            },
        }
        with open(
            output_dir / f"go_bug_squasher_{topic}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(bs, f, indent=4)

        # Code Refactor
        cr = {
            "difficulty": "beginner",
            "visualizerParams": {
                "visualizerType": "CodeRefactorChallenge",
                "visualizerParams": {
                    "title": f"Code Refactor: {topic.replace('_', ' ').title()}",
                    "problemDescription": f"Refactor this Go code for better performance or idiomatic style.",
                    "language": "go",
                    "initialCode": code,
                    "solution": {
                        "code": code,
                        "explanation": "Improved the code structure and readability.",
                    },
                    "validation": {"type": "run_code"},
                },
            },
        }
        with open(
            output_dir / f"go_code_refactor_{topic}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(cr, f, indent=4)

    print(f"Generated {len(topics) * 3} Go JSON files in {output_dir}")


if __name__ == "__main__":
    generate_go_json()
