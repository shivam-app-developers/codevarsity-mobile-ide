import os
from pathlib import Path


def rename_js_files(base_dir):
    js_dir = Path(base_dir) / "javascript"
    if not js_dir.exists():
        print(f"Directory {js_dir} not found.")
        return

    count = 0
    for root, dirs, files in os.walk(js_dir):
        for file in files:
            if file.startswith("js_") and file.endswith(".json"):
                old_path = Path(root) / file
                new_name = file.replace("js_", "javascript_", 1)
                new_path = Path(root) / new_name

                try:
                    os.rename(old_path, new_path)
                    print(f"Renamed: {file} -> {new_name}")
                    count += 1
                except Exception as e:
                    print(f"Error renaming {file}: {e}")

    print(f"Total files renamed: {count}")


if __name__ == "__main__":
    output_json_dir = "output_json"
    rename_js_files(output_json_dir)
