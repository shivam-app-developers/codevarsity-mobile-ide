# GuidedPractice V2: Specification & Implementation Details

## Overview

The `GuidedPractice` visualizer has been upgraded to serve as the unified coding interface for the CodeLab platform. It now supports three distinct modes of operation to handle everything from simple syntax drills to complex, multi-file Capstone projects.

## Core Concept: The 3 Modes

### 1. `snippet` (Ephemeral Mode)

* **Purpose:** Isolated syntax practice, "Hello World" examples, or logic drills that do not need to be saved.
* **Behavior:**
  * UI shows a simple editor.
  * No file tree or tabs.
  * Code is **NOT** saved to the persistent `ProjectState`.
* **Use Case:** Layer 1-2 introductions, algorithmic puzzles.

### 2. `single_file` (Day 1 Product Mode)

* **Purpose:** Building the initial single-file application (Layers 1-3).
* **Behavior:**
  * UI shows a focused editor.
  * Implicitly edits `main.py` (or the language equivalent).
  * Code **IS** saved to `ProjectState`.
* **Use Case:** Building the "Calculator" or "Text Adventure" before it gets split into modules.

### 3. `project` (Capstone Mode)

* **Purpose:** Complex, multi-file development (Layers 4-7).
* **Behavior:**
  * UI shows a full IDE with **File Tree** and **Tabs**.
  * Supports background updates to multiple files while the user focuses on one.
  * Code **IS** saved to `ProjectState`.
* **Use Case:** Refactoring, creating modules, adding features to the Capstone.

---

## JSON Schema Specification

```json
"GuidedPractice": {
    "type": "object",
    "required": ["visualizerType", "visualizerParams"],
    "properties": {
        "visualizerType": {"const": "GuidedPractice"},
        "visualizerParams": {
            "type": "object",
            "required": ["mode", "title", "description", "language", "ghostCode"],
            "properties": {
                "mode": {
                    "type": "string",
                    "enum": ["snippet", "single_file", "project"],
                    "default": "single_file",
                    "description": "snippet=ephemeral, single_file=Day1Product, project=Capstone"
                },
                "title": {"type": "string"},
                "description": {"type": "string"},
                "language": {"type": "string"},
                
                "ghostCode": {
                    "type": "string", 
                    "description": "Incremental code to be typed by user. Only contains the NEW lines."
                },
                
                "cursor": {
                    "type": "object",
                    "description": "Where to place the cursor for the user to start typing.",
                    "properties": {
                        "line": {"type": "integer", "description": "1-based line number"},
                        "column": {"type": "integer", "description": "1-based column number"}
                    }
                },
                
                "targetFile": {
                    "type": "string", 
                    "description": "For single_file mode. Defaults to main.py"
                },
                
                "files": {
                    "type": "object",
                    "description": "Map of filenames to content. Updates existing files or creates new ones in the background."
                },
                
                "activeFile": {
                    "type": "string",
                    "description": "The file to focus on initially in project mode."
                },
                
                "finalCode": {
                    "type": "string",
                    "description": "The FULL expected content of the active file. Used for 'Show Solution', Validation, and AI state tracking."
                },
                
                "validation": {
                    "type": "object",
                    "description": "Rules for checking the user's code.",
                    "properties": {
                        "type": {"type": "string", "enum": ["exact", "regex", "run_output"]},
                        "pattern": {"type": "string", "description": "Regex pattern or expected output string"}
                    }
                }
            }
        }
    }
}
```

---

## AI Generation Rules (System Prompt)

The AI is instructed to follow these rules when generating `GuidedPractice`:

1. **Mode Selection:**
    * Use `snippet` for throwaway code.
    * Use `single_file` for early course stages.
    * Use `project` for advanced stages.

2. **One File Focus:**
    * Even in `project` mode, the user should only edit **ONE** file per step.
    * If multiple files need changes, the AI must use the `files` map to update the others in the background, or split the task into multiple steps.

3. **Incremental Ghost Code:**
    * `ghostCode` should NOT contain the entire file if it's large. It should only contain the *new* code the user needs to type.
    * The App is responsible for overlaying this at the `cursor` position.

4. **State Tracking:**
    * The AI MUST provide `finalCode`. This is the "commit message" that tells the system what the file *should* look like after the user is done.

---

## State Management Logic (`ProjectState`)

The `course_generator_api.py` script handles state updates as follows:

```python
if v_type == "GuidedPractice":
    mode = params.get("mode", "single_file")

    # Mode 1: Snippet (Ephemeral)
    if mode == "snippet":
        pass # Do nothing. State is not updated.

    # Mode 2: Single File (Persistent)
    elif mode == "single_file":
        if "finalCode" in params:
            filename = params.get("targetFile", "main.py")
            self.update(filename, params["finalCode"])

    # Mode 3: Project (Persistent)
    elif mode == "project":
        # 1. Update background files
        if "files" in params:
            for fname, content in params["files"].items():
                self.update(fname, content)
        
        # 2. Update active file with finalCode
        if "activeFile" in params and "finalCode" in params:
            self.update(params["activeFile"], params["finalCode"])
```

## Example Payloads

### Snippet Mode

```json
{
  "visualizerType": "GuidedPractice",
  "visualizerParams": {
    "mode": "snippet",
    "title": "Print Hello",
    "description": "Type the print command.",
    "language": "python",
    "ghostCode": "print('Hello World')"
  }
}
```

### Project Mode (Adding a method)

```json
{
  "visualizerType": "GuidedPractice",
  "visualizerParams": {
    "mode": "project",
    "title": "Add Subtract Method",
    "description": "Add the subtraction logic to the Calculator class.",
    "language": "python",
    "activeFile": "calculator.py",
    "cursor": { "line": 15, "column": 4 },
    "ghostCode": "def subtract(self, a, b):\n    return a - b",
    "finalCode": "class Calculator:\n    def add(self, a, b):\n        return a + b\n\n    def subtract(self, a, b):\n        return a - b",
    "files": {
        "main.py": "import calculator\n..." # Background update if needed
    }
  }
}
```
