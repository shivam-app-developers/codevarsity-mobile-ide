import os
import ast
import sys
from pathlib import Path

# Supported 3rd party libraries based on APP_CAPABILITIES.md
SUPPORTED_3RD_PARTY = {
    "numpy",
    "pandas",
    "scipy",
    "scikit-learn",
    "sklearn",
    "networkx",
    "django",
    "flask",
    "requests",
    "bs4",
    "beautifulsoup4",
    "urllib3",
    "regex",
    "faker",
    "yaml",
    "toml",
    "tqdm",
    "colorama",
    "waitress",
}

# Standard library modules (a reasonably comprehensive set for Python 3.10)
# Instead of hardcoding all, we can dynamically check if it's in sys.stdlib_module_names
# (Available in Python 3.10+)
try:
    STD_MODULES = sys.stdlib_module_names
except AttributeError:
    # Fallback for < 3.10
    import sysconfig

    STD_MODULES = set(sys.builtin_module_names) | set(
        [Path(p).stem for p in Path(sysconfig.get_path("stdlib")).glob("*.py")]
    )


def is_supported_module(module_name):
    # Get base module name (e.g., 'matplotlib.pyplot' -> 'matplotlib')
    base_module = module_name.split(".")[0]

    if base_module in STD_MODULES:
        return True
    if base_module.lower() in SUPPORTED_3RD_PARTY:
        return True
    return False


def get_imports(filepath):
    imports = set()
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            tree = ast.parse(f.read(), filename=filepath)
            for node in ast.walk(tree):
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        imports.add(alias.name)
                elif isinstance(node, ast.ImportFrom):
                    if node.module:
                        imports.add(node.module)
    except Exception as e:
        print(f"Error parsing {filepath}: {e}")
    return imports


def main():
    target_dir = Path("input_snippets/python/batch_01")
    if not target_dir.exists():
        print(f"Directory not found: {target_dir}")
        return

    python_files = list(target_dir.rglob("*.py"))
    removed_count = 0

    print(
        f"Scanning {len(python_files)} files in {target_dir} for unsupported imports...\n"
    )

    for py_file in python_files:
        imports = get_imports(py_file)
        unsupported = [mod for mod in imports if not is_supported_module(mod)]

        if unsupported:
            print(f"🗑️ Deleting {py_file.name}")
            print(f"   Unsupported imports found: {', '.join(unsupported)}")
            try:
                os.remove(py_file)
                removed_count += 1
            except Exception as e:
                print(f"   Failed to delete: {e}")

    print(f"\nSummary: Deleted {removed_count} out of {len(python_files)} files.")


if __name__ == "__main__":
    main()
