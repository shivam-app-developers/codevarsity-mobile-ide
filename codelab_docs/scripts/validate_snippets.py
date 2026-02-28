import os
import json
import argparse
from pathlib import Path
import sys

# Add parent directory to sys.path to allow importing schemas.py
sys.path.append(str(Path(__file__).parent.parent))
from schemas import VISUALIZER_SCHEMAS

try:
    import jsonschema
except ImportError:
    print("Required library not found. Please run: pip install jsonschema")
    exit()


def validate_json_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Failed to parse {file_path.name}: {e}")
        return False

    # Support both flat and wrapped (with difficulty) structures
    if "visualizerType" not in data and "visualizerParams" in data:
        # It's likely a wrapped object: { "difficulty": ..., "visualizerParams": { ... } }
        data = data["visualizerParams"]

    v_type = data.get("visualizerType")
    v_params = data.get("visualizerParams")

    if not v_type or not v_params:
        print(f"❌ Missing visualizerType or visualizerParams in {file_path.name}")
        return False

    if v_type not in VISUALIZER_SCHEMAS:
        print(f"❌ Unknown visualizerType '{v_type}' in {file_path.name}")
        return False

    schema = VISUALIZER_SCHEMAS[v_type]["properties"]["visualizerParams"]

    try:
        jsonschema.validate(instance=v_params, schema=schema)

        # Enforce exact code match for GuidedPractice
        if v_type == "GuidedPractice":
            if v_params.get("ghostCode") != v_params.get("finalCode"):
                print(
                    f"❌ Validation Failed for {file_path.name}: ghostCode and finalCode must be EXACTLY identical."
                )
                return False

        print(f"✅ Validation Passed: {file_path.name}")
        return True
    except jsonschema.exceptions.ValidationError as e:
        print(f"❌ Validation Failed for {file_path.name}: {e.message}")
        # Print path and instance to help debug
        print(f"  Path: {list(e.path)}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Validate generated JSON snippets.")
    parser.add_argument(
        "--output_dir",
        type=str,
        default="output_json",
        help="Directory containing output JSON files to validate.",
    )
    args = parser.parse_args()

    output_path = Path(args.output_dir)
    if not output_path.exists():
        print(f"Directory not found: {output_path}")
        return

    json_files = list(output_path.rglob("*.json"))
    if not json_files:
        print(f"No JSON files found in {output_path}")
        return

    print(f"Validating {len(json_files)} Snippets found in {output_path}...")
    success_count = 0
    for f in json_files:
        if validate_json_file(f):
            success_count += 1

    print(f"\nSummary: {success_count}/{len(json_files)} passed validation.")


if __name__ == "__main__":
    main()
