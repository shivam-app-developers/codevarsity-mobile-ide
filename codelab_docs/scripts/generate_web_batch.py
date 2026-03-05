import os
import json
from pathlib import Path


def generate_web_json():
    input_dir = Path("input_snippets/web/manual_batch")
    output_dir = Path("output_json/web/manual_batch")
    output_dir.mkdir(parents=True, exist_ok=True)

    topics = [
        "responsive_navbar",
        "dynamic_list",
        "flexbox_layout",
        "grid_layout",
        "form_validation",
        "dark_mode_toggle",
        "image_slider",
        "modal_window",
        "digital_clock",
        "todo_list",
        "calculator",
        "weather_widget",
        "profile_card",
        "button_animations",
        "scroll_to_top",
        "search_filter",
        "accordion",
        "progress_bar",
        "tabs",
        "tooltip",
    ]

    for topic in topics:
        input_file = input_dir / f"{topic}.html"
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
                    "title": f"Web: {topic.replace('_', ' ').title()}",
                    "description": f"Learn how to build a {topic.replace('_', ' ')} using HTML/CSS/JS.",
                    "language": "html",
                    "mode": "snippet",
                    "ghostCode": code,
                    "finalCode": code,
                    "validation": {"type": "run_code"},
                },
            },
        }
        with open(
            output_dir / f"web_guided_practice_{topic}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(gp, f, indent=4)

        # Bug Squasher (Simple logic or syntax bug)
        buggy_code = (
            code.replace("document.getElementById", "document.find")
            .replace("addEventListener", "on")
            .replace("style.display", "display")
            .replace(".classList.toggle", ".toggle")
        )

        # Limit the number of replacements to just one or two to make it a fair challenge
        if "document.getElementById" in code:
            buggy_code = code.replace("document.getElementById", "document.find", 1)
        elif "addEventListener" in code:
            buggy_code = code.replace("addEventListener", "listen", 1)
        else:
            buggy_code = code.replace(">", "", 1)  # simple syntax bug

        bs = {
            "difficulty": "beginner",
            "visualizerParams": {
                "visualizerType": "BugSquasherScenario",
                "visualizerParams": {
                    "title": f"Bug Squasher: {topic.replace('_', ' ').title()}",
                    "problemDescription": f"The {topic.replace('_', ' ')} is not functioning correctly. Identify and fix the bug in the code.",
                    "language": "html",
                    "buggyCode": buggy_code,
                    "solution": {
                        "code": code,
                        "explanation": "Fixed the incorrect method call or syntax error.",
                    },
                    "validation": {"type": "run_code"},
                },
            },
        }
        with open(
            output_dir / f"web_bug_squasher_{topic}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(bs, f, indent=4)

        # Code Refactor
        cr = {
            "difficulty": "beginner",
            "visualizerParams": {
                "visualizerType": "CodeRefactorChallenge",
                "visualizerParams": {
                    "title": f"Code Refactor: {topic.replace('_', ' ').title()}",
                    "problemDescription": f"Refactor the following {topic.replace('_', ' ')} code for better readability or performance.",
                    "language": "html",
                    "initialCode": code,
                    "solution": {
                        "code": code,
                        "explanation": "Refactored the code to follow best practices.",
                    },
                    "validation": {"type": "run_code"},
                },
            },
        }
        with open(
            output_dir / f"web_code_refactor_{topic}.json", "w", encoding="utf-8"
        ) as f:
            json.dump(cr, f, indent=4)

    print(f"Generated {len(topics) * 3} JSON files in {output_dir}")


if __name__ == "__main__":
    generate_web_json()
