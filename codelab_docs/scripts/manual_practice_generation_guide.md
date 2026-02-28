# Manual Practice Snippets Generation Guide

This guide details the process for manually generating practice modules (Bug Squasher, Code Refactor, and Guided Practice) from existing code snippets. Use this guide when bypassing the LLM pipeline or delegating manual refinement work.

## Goal

For every input source file, generate **three** JSON files corresponding to the core practice modes.

## Workflow Overview

1. **Select Snippet**: Choose a file from `input_snippets/python/batch_01/`.
2. **Analyze Logic**: Understand the core algorithm or logic.
3. **Generate Modes**: Create the 3 JSON files described below.
4. **Validate**: Run the validation script on the output.

---

## JSON Structure & Difficulty (CRITICAL)

Each JSON file must be wrapped in a parent object that includes a `difficulty` level.

* **Difficulty Options**: `"beginner"`, `"medium"`, or `"advanced"`.
* **Structure**:

    ```json
    {
      "difficulty": "beginner",
      "visualizerParams": {
        "visualizerType": "TYPE_HERE",
        "visualizerParams": { ... }
      }
    }
    ```

### JSON Symbol Support & Escaping

To ensure the JSON remains valid and can be parsed by the mobile app, follow these escaping rules within string values (especially for code):

* **Newline**: Use `\n` (literal backslash followed by n).
* **Double Quotes**: Use `\"` (literal backslash followed by quote).
* **Literal Backslash**: Use `\\` (double backslash).
* **No Placeholders**: Do NOT use text like `{{analogyAnchor}}`. Replace them with literal values.

---

## 1. Guided Practice Mode

A typing drill to help users memorize syntax and patterns.

* **Logic**: `ghostCode` and `finalCode` must be **IDENTICAL**.
* **Mode**: Must be set to `"snippet"`.
* **Mobile Optimization**: Aggressively strip all comments, docstrings, and external links.
* **Runnable**: Include an `if __name__ == "__main__":` block with sample inputs and `print()` statements.
* **Filename**: `python_guided_practice_<original_name>.json`

```json
{
  "difficulty": "beginner",
  "visualizerParams": {
    "visualizerType": "GuidedPractice",
    "visualizerParams": {
      "mode": "snippet",
      "title": "Title Here",
      "description": "Short description for mobile.",
      "language": "python",
      "ghostCode": "CORE_CODE_HERE",
      "finalCode": "CORE_CODE_HERE"
    }
  }
}
```

---

## 2. Bug Squasher Mode

A debugging challenge where the user identifies and fixes a subtle bug.

* **Logic**: Introduce a realistic logic flaw (e.g., off-by-one, wrong operator).
* **Problem Description**: Explain expected vs actual behavior without giving away the fix.
* **Solution**: Include the corrected code and a clear explanation.
* **Filename**: `python_bug_squasher_<original_name>.json`

```json
{
  "difficulty": "medium",
  "visualizerParams": {
    "visualizerType": "BugSquasherScenario",
    "visualizerParams": {
      "title": "Bug Title",
      "problemDescription": "Describe the symptom...",
      "language": "python",
      "buggyCode": "CODE_WITH_STRICT_LOGIC_BUG",
      "solution": {
        "code": "CORRECTED_CODE",
        "explanation": "Explain the fix..."
      }
    }
  }
}
```

---

## Mobile Runnability & Language Constraints

Generated code MUST be runnable in the app's mobile terminal. Follow these rules for each language:

### 1. Mandatory Main Entry Points

Every snippet must be self-contained and runnable. Add a main entry point if missing:
* **Python**: Use `if __name__ == "__main__":` with `print()` calls.
* **C**: Use `int main() { ... }` with `printf()`.
* **Java**: Use `public static void main(String[] args) { ... }` with `System.out.println()`.
* **Go**: Ensure `package main` and `func main() { ... }` with `fmt.Println()`.
* **JavaScript**: Call the primary function/logic directly with sample inputs via `console.log()`.
* **Web (HTML/CSS)**: Ensure the HTML is a complete, standalone document.

### 2. Mobile Optimization (Conciseness)

Mobile screens are small. Keep code tight:
* **Aggressively Remove**: Docstrings, long explanatory comments, and external links in the code fields.
* **Use Clear Names**: Favor self-documenting code over lengthy comments.
* **Avoid GUI**: Do NOT use GUI-related libraries (Tkinter, Swing, AWT, etc.). Standard I/O only.

### 3. Language-Specific Environments

- **Python**: Chaquopy (3.10). Standard libraries + Data Science stack.
* **Java**: ECJ compiler. Java 8-21 support.
* **Go**: Yaegi interpreter. Standard library only (no CGO).
* **JavaScript**: Rhino engine (ES6). No DOM/Node APIs.
* **Web**: Native WebView. Supports React/Vue via Babel.
* **C**: Standard C. No external libraries beyond standard headers.

---

## 3. Code Refactor Mode

A performance or clean-code challenge.

* **Logic**: Start with inefficient or "messy" code (e.g., O(N^2) instead of O(N)).
* **Solution**: Include the original "clean" version and explain the benefits.
* **Filename**: `python_code_refactor_<original_name>.json`

```json
{
  "difficulty": "advanced",
  "visualizerParams": {
    "visualizerType": "CodeRefactorChallenge",
    "visualizerParams": {
      "title": "Refactor Topic",
      "problemDescription": "Why is it inefficient?",
      "language": "python",
      "initialCode": "INEFFICIENT_CODE_HERE",
      "solution": {
        "code": "CLEAN_OPTIMIZED_CODE",
        "explanation": "Why this is better..."
      }
    }
  }
}
```

---

## Validation

Run the validation script to ensure schema compliance:

```bash
python validate_snippets.py --output_dir output_json/python/test_batch
```
