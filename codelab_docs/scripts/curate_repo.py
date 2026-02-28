import os
import shutil
import argparse
from pathlib import Path


def count_lines(filepath):
    """Count the total number of lines in a file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return sum(1 for _ in f)
    except Exception as e:
        print(f"Warning: Could not read {filepath}: {e}")
        return -1


def curate_repository(repo_path, output_dir, extensions, max_lines, ignore_dirs):
    """
    Recursively scans a repository and copies valid source code files
    into a flat output directory.
    """
    repo = Path(repo_path)
    out_dir = Path(output_dir)
    ext_list = [ext if ext.startswith(".") else f".{ext}" for ext in extensions]

    if not repo.exists() or not repo.is_dir():
        print(f"❌ Target repository path not found: {repo}")
        return

    out_dir.mkdir(parents=True, exist_ok=True)

    copied_count = 0
    skipped_count = 0

    print(f"🔍 Scanning {repo} for files ending in {ext_list}...")
    print(f"⚙️ Constraints: max {max_lines} lines, ignoring {ignore_dirs}")

    for root, dirs, files in os.walk(repo):
        # Modify dirs in-place to skip ignored directories
        dirs[:] = [d for d in dirs if d not in ignore_dirs and not d.startswith(".")]

        for file in files:
            file_path = Path(root) / file

            # Check extension
            if file_path.suffix not in ext_list:
                continue

            # Skip test files or init files often found in repos
            if "test" in file_path.stem.lower() or file_path.stem == "__init__":
                continue

            # Check line count constraint
            lines = count_lines(file_path)
            if lines == -1 or lines > max_lines or lines < 3:
                skipped_count += 1
                continue

            # Copy to output
            # We copy flat, but prepend parent dir if filename collision occurs
            dest_file = out_dir / file
            if dest_file.exists():
                # To prevent overwriting e.g., 'utils.py' in multiple folders,
                # prefix with parent folder name.
                parent_name = file_path.parent.name
                new_name = f"{parent_name}_{file}"
                dest_file = out_dir / new_name

            try:
                shutil.copy2(file_path, dest_file)
                copied_count += 1
            except Exception as e:
                print(f"❌ Failed to copy {file_path}: {e}")

    print("\n✅ Curation Complete!")
    print(f"📂 Copied {copied_count} suitable files to {out_dir}")
    print(f"⏭️ Skipped {skipped_count} files (exceeded length or unreadable)")


def main():
    parser = argparse.ArgumentParser(
        description="Extract clean snippets from cloned repositories."
    )
    parser.add_argument("repo_path", help="Path to the cloned repository directory")
    parser.add_argument(
        "output_dir", help="Destination folder (e.g. input_snippets/python/batch_01)"
    )
    parser.add_argument(
        "--ext",
        nargs="+",
        required=True,
        help="File extensions to capture (e.g., .py .dart)",
    )
    parser.add_argument(
        "--max_lines",
        type=int,
        default=100,
        help="Maximum number of lines per script (default 100)",
    )
    parser.add_argument(
        "--ignore",
        nargs="+",
        default=["tests", "venv", "docs", "node_modules", "bin"],
        help="Directories to ignore",
    )

    args = parser.parse_args()

    curate_repository(
        repo_path=args.repo_path,
        output_dir=args.output_dir,
        extensions=args.ext,
        max_lines=args.max_lines,
        ignore_dirs=args.ignore,
    )


if __name__ == "__main__":
    main()
