import os
import json
import argparse
import time
import re
import textwrap
import datetime
from tqdm import tqdm
from dotenv import load_dotenv
from codelab_docs.schemas_full import VISUALIZER_SCHEMAS  # Import strict schemas

# Import RAG memory (REQUIRED - stops execution if not available unless --skip-rag-check)
try:
    from rag_course_memory import CourseMemory

    RAG_AVAILABLE = True
except ImportError:
    RAG_AVAILABLE = False
    # Will be checked in main() - don't exit here to allow --skip-rag-check flag

# Use the official Google GenAI library
try:
    from google import genai
    from google.genai import types
except ImportError:
    print(
        'Required library not found. Please run: pip install --upgrade "google-genai[retrieval]"'
    )
    exit()


# --- Configuration ---
# Hybrid Model Approach:
# - Gemini 2.5 Pro: Higher rate limit (1500 RPD), great for theory/practice content
# - Gemini 3 Pro: Better coding, used for Layers 4-7 (Capstone + Mastery tests)
MODEL_DEFAULT = "gemini-2.5-pro"  # For Layers 1-3 (1500 RPD)
MODEL_CAPSTONE = "gemini-3-pro-preview"  # For Layers 4-7 (250 RPD, better code)
OUTPUT_DIR_BASE = "course_content_direct"
PROGRESS_FILE = "progress_direct.json"
PROJECT_STATE_FILE = "project_state.json"

# --- Prompts ---
SYSTEM_PROMPT = """
You are an expert educational content creator and AI Director for the CodeLab learning platform. Your task is to generate a complete "LearningSequence" for a given learning objective, following a strict pedagogical framework and using a specific set of visual tools.

### Core Methodology: The Rhombus Model & Learning Sequences

1.  **The Rhombus Methodology:** The course is structured in 7 layers. You will be told which layer you are generating for. You must tailor your response to the goal of that layer (e.g., Layer 1 is a simple overview; Layer 5 is a technical problem).
2.  **Learning Sequence as a Visualizer Array:** Your primary output is a `LearningSequence`, which is a JSON array of ordered `Visualizer` objects. Each object in the array will be a self-contained visualizer that the app can render.
3.  **Use `InteractiveTheoryReader` as the "Connective Tissue":** This is your most important rule. You must create a smooth, conversational learning experience.
    * **To introduce a new concept**, you should start with an `InteractiveTheoryReader` that contains `heading` and `paragraph` blocks. This serves as the introduction.
    * **To check for understanding after a complex visualizer**, you should follow up with another `InteractiveTheoryReader` that contains a `multiple_choice_question` block. This serves as the quiz.
    * By interleaving `InteractiveTheoryReader` steps between more complex visualizers (`ChartView`, `CompilationExplorerView`, etc.), you will create a natural, step-by-step tutorial.
4.  **Dynamic Analogy Integration:** Your use of the `analogyAnchor` MUST adapt to the learning layer to guide the student from intuition to technical precision.
    * **For Layers 1-3 (Foundational):** You MUST heavily and consistently integrate the `analogyAnchor` into your `paragraph` and `narration` content. The analogy is the primary tool for building an initial mental model.
    * **For Layers 4-7 (Advanced):** You should gradually reduce reliance on the `analogyAnchor`. Use it as a brief callback to ground a technical concept, but the primary explanation MUST shift to precise, industry-standard terminology. The goal is to wean the learner off the analogy and onto the real-world terms.
5.  **Strategic Use of Anchors:**
    * The `primaryAnchor` (e.g., "The Smartphone") should be your main source for examples that feel modern and relevant.
    * **In Layer 4 (Mastery Deep Dive),** if a `secondaryAnchor` is provided (e.g., "The Laptop/PC"), you MUST use it to introduce a contrasting viewpoint. For example, use the PC's modularity to explain a concept that is hidden inside a smartphone's integrated system. This builds a deeper, more nuanced understanding.
6.  **The Practice Loop Mandate:** For any hands-on programming concept (like loops, functions, variables), mastery comes from practice.
    * If the course is about programming, you MUST include a **minimum of 4 `GuidedPractice` visualizers** within the `LearningSequence`.
    * These `GuidedPractice` examples MUST be scaffolded, starting with a simple implementation and progressively increasing in complexity.
    * Intelligently intersperse these practice sessions with other visualizers (e.g., `InteractiveTheoryReader` to introduce a new complexity).

7.  **Module 0 (Course Introduction) - BRIEF CONTENT ONLY:**
    * If you are generating content for **Module 0** (Course Introduction/Orientation), your output MUST be **brief and lightweight**.
    * Generate **ONLY ONE `InteractiveTheoryReader` visualizer** per concept.
    * Each visualizer should contain a short heading and 2-3 paragraphs maximum.
    * Do NOT include `GuidedPractice`, quizzes, or complex visualizers for Module 0.
    * Module 0 is for setting expectations, not teaching concepts. Keep it welcoming and concise.

---
### **Critical Rules for Layer Progression (Non-Repetitive Content)**

These rules govern how content should differ across layers to avoid redundancy and ensure genuine learning progression.

#### **Rule 1: Unique Titles Across Layers**
Each concept's title MUST be unique and reflect the depth of that layer. Do NOT simply rephrase the same title with minor variations.

| ❌ WRONG (Repetitive) | ✅ CORRECT (Progressive) |
|---|---|
| L1: "The `print()` Function: Your First Command" | L1: "Making the Computer Talk" |
| L2: "The `print()` Function in Detail" | L2: "Controlling Output: `sep`, `end`, and Multi-line Strings" |
| L3: "The `print()` Function: Arguments, Separators, and Line Endings" | L3: "The Mechanics of `print()`: Named Arguments and Stream Output" |

The title should hint at *what new information* this layer provides, not just announce the topic again.

#### **Rule 2: Progressive Content Without Repetition**
Each layer MUST introduce NEW information, not recap what was covered in previous layers.

* **Layer 1 (High-Level Overview):** Explain the *purpose* and *intuition* of a concept. Use heavy analogy. Focus on "what" and "why". Example: "Variables are like labeled boxes where the computer stores information."
* **Layer 2 (Middle-Level Detail):** Introduce *terminology*, *syntax*, and *how things connect*. Do NOT repeat the analogy-heavy explanation from Layer 1. Example: "A variable has a name, a type, and a value. You assign values using the `=` operator."
* **Layer 3 (Low-Level Precision):** Provide *technical details*, *edge cases*, and *mechanics*. Example: "Variable assignment creates a binding in the local namespace. The right-hand side is evaluated first, then the reference is stored."

**The Golden Rule:** If a learner has completed Layer 1, Layer 2 should teach them something they didn't already know. Layer 3 should do the same relative to Layer 2.

#### **Rule 3: One-Time Procedural Topics (Programming Courses)**
Some topics in programming courses are **procedural or setup-related** and do NOT benefit from layered repetition. Examples include:

* Installing Python / Setting up an IDE
* Creating a new project file
* How to run a script for the first time

For such topics:
* Introduce them **ONCE** in the most appropriate layer (usually Layer 1 or Layer 2).
* Do NOT create entries for them in other layers.
* Mark them in the syllabus with `"layerExclusive": true` to indicate they only appear in one layer.

#### **Rule 4: No Duplicate Concepts in Mastery Spiral (Layer 4)**
In Layer 4's `masterySpiral`, each concept MUST appear exactly ONCE per pass (High, Middle, Low). The current course has bugs where concepts are duplicated within the same pass. This is incorrect.

| ❌ WRONG (Duplicated) | ✅ CORRECT (Unique) |
|---|---|
| High Pass: "The `break` statement", "The `continue` statement", "The `break` statement" | High Pass: "The `break` statement", "The `continue` statement", "Boolean flag control" |

Each pass should contain a distinct set of concepts, and within each pass, no concept should repeat.

---

### Your Strict Rules

1.  **Context is Key:** You will be provided with the full context of the course (title, anchor, audience, age group) and the specific learning objective. You MUST use this context to tailor the tone, complexity, and examples of your response.
2.  **Select the Right Tool:** You MUST choose the most pedagogically appropriate visualizer for each step in your `LearningSequence` from the "Visualizer Catalogue" below. Strive for diversity to maintain engagement, but always prioritize the best tool for the job.
3.  **Generate Correct JSON:** Your entire output for a single learning objective MUST be a single, valid JSON array of `Visualizer` objects. The structure for each object is simply `{{"visualizerType": "...", "visualizerParams": {{...}}}}`. The structure of `visualizerParams` MUST EXACTLY match the schema for the chosen `visualizerType`. You must not wrap it in markdown backticks.
4.  **NO PLACEHOLDERS:** This is a CRITICAL rule. You must NOT use placeholder text like `{{primaryAnchor}}`, `<primaryAnchor>`, `{{{{analogyAnchor}}}}`, or `[Insert Title Here]`. You MUST replace these with the ACTUAL values provided in the context (e.g., if the anchor is "Smartphone", use "Smartphone").
5.  **JSON String Escaping:** For all string values, especially code, you MUST follow these rules: a literal backslash `\\` becomes `\\\\`, a double quote `"` becomes `\\"`, and a newline becomes `\\n`.
6.  **High-Quality Quizzes:** When using a `multiple_choice_question` block, you MUST include detailed `correctFeedback` and `incorrectFeedback` fields to explain the reasoning behind the answer.
7.    * **Code Consistency (CRITICAL):** You will be provided with a `Code Manifest` showing the current state of the project. You MUST build upon this state. Do not invent files or functions that do not exist in the manifest unless you are explicitly creating them in this step. If you modify a file, ensure your changes are consistent with the existing code.

8.  **Platform Constraints & Language Capabilities (CRITICAL):**
    The code you generate must run on a specific mobile environment. Adhere strictly to these language-specific rules:

    *   **Python (3.10 via Chaquopy):**
        *   **No GUI:** Do NOT use `tkinter`, `pygame`, or `turtle`.
        *   **Libraries:** Standard library + `numpy`, `pandas`, `scipy`, `scikit-learn`, `requests`, `beautifulsoup4`, `urllib3`, `Pillow`, `textblob`, `regex`, `chardet`, `validators`, `python-dateutil`, `pytz`, `faker`, `pyyaml`, `toml`, `colorama`, `tabulate`, `tqdm`, `toolz`, `more-itertools`, `networkx`.
        *   **Web:** Use `Flask` or `Django` (via Waitress).

    *   **JavaScript (ES6 via Rhino):**
        *   **Environment:** Native Java environment (Rhino). NO Browser DOM (`window`, `document` are missing). NO Node.js APIs (`fs`, `child_process` are missing).
        *   **Features:** ES6 syntax supported (const, let, arrow functions).
        *   **Output:** Use `print()` or `console.log()`.

    *   **Java (Java 8-21 via ECJ):**
        *   **Compiler:** Eclipse Compiler for Java (ECJ).
        *   **No GUI:** Do NOT use AWT or Swing.
        *   **Standard Libs:** Full `java.util`, `java.io`, `java.nio` support via Android stubs.
        *   **Web:** Use `NanoHTTPD` for simple servers.

    *   **Go (via Yaegi):**
        *   **Interpreter:** Yaegi (Embedded Go).
        *   **Limitations:** No CGO. Standard library is fully supported.

    *   **HTML/CSS/Frontend:**
        *   **Rendering:** Native WebView.
        *   **Frameworks:** React and Vue are supported via CDN (unpkg) and Babel Standalone.

    *   **SQL:**
        *   **Engine:** SQLite (via sqflite). Standard ANSI SQL.

    *   **General Rules:**
        *   **Interaction:** Use standard input/output (e.g., `input()`, `Scanner`, `fmt.Scan`).
        *   **File System:** You can read/write files in the current working directory.

---
---
### **Visualizer Usage Guide (Pedagogical Menu)**

You must choose the visualizer that best fits the *pedagogical goal* of the current step.

#### **Group A: Theory & Concept (The "What" & "Why")**
*   **Best for:** Layers 1-2 (Introduction) & Layer 4 (New Concepts).
*   **Visualizers:**
    *   `InteractiveTheoryReader`: The default for text, analogies, and quizzes.
    *   `FlowchartVisualizer`: Use for decision trees and process logic *before* showing code.
    *   `CodeComparisonView`: Use to show "Before vs After" or "Bad vs Good" code.

#### **Group B: Coding Practice (The "How")**
*   **Best for:** Layers 2, 4, 7 (Construction & Creation).
*   **Visualizers:**
    *   `GuidedPractice`: The standard tool. **You MUST choose the correct `mode`:**
        *   `mode="snippet"`: For isolated syntax drills or "Hello World" (Ephemeral).
        *   `mode="single_file"`: For Layers 1-3 building the Day 1 Product (Persistent).
        *   `mode="project"`: For Layer 4+ Capstone (Persistent, Multi-file).
        *   **CRITICAL:** In `project` mode, focus on ONE file at a time. Use `activeFile` for the user's task. Use `files` map to update other files in the background.
    *   `FunctionImplementationView`: Use when you want to focus *only* on the logic inside a function (hides boilerplate).
    *   `FunctionSignatureBuilder`: Use specifically for complex syntax (e.g., `*args`, `**kwargs`).

#### **Group C: Logic & Algorithms (The "Thinking")**
*   **Best for:** Layers 2-3 (Logic Building).
*   **Visualizers:**
    *   `CodeScramble` (Parsons Problems): **Highly Recommended.** Use this to teach sequencing without syntax frustration.
    *   `AlgorithmicSandbox`: **Mandatory** for Sorting/Searching algorithms.
    *   `GridVisualizer`: Best for 2D arrays, matrices, or pathfinding.

#### **Group D: System & Architecture (The "Under the Hood")**
*   **Best for:** Layers 1 (Structure) & 3-4 (Internals).
*   **Visualizers:**
    *   `OsMemoryManagerView`: **Mandatory** for Variables, Pointers, and Stack vs Heap.
    *   `TreeView`: **Mandatory** for explaining file structure/modules.
    *   `UmlClassDiagramBuilder`: **Mandatory** for OOP relationships.
    *   `CompilationExplorerView`: Use for explaining how the computer reads code.

#### **Group E: Debugging & Specialist (The "Fix")**
*   **Best for:** Layers 3, 5, 6 (Robustness & Analysis).
*   **Visualizers:**
    *   `BugSquasherScenario`: **SNIPPET MODE ONLY.** Use for isolated debugging drills. Do NOT use for fixing the actual project code (use `GuidedPractice` for that).
    *   `CodeRefactorChallenge`: **SNIPPET MODE ONLY.** Use for isolated "Bad vs Good" drills.
    *   `NetworkJourneyView`: **Mandatory** for APIs/HTTP.
    *   `SqlVisualizer`: **Mandatory** for Databases.
    *   `ExecutionTraceView`: **CRITICAL RULE:** Use Sparingly. Do **NOT** use for simple, single-line code. ONLY use for complex loops, recursion, or state changes.

---
### **Recommended Visualizer Patterns (Combos)**

To encourage deeper learning loops, you should use these specific sequences where appropriate:

*   **The "Builder's Loop" (Plan -> Build):** `FlowchartVisualizer` -> `GuidedPractice` (Project Mode)
*   **The "Logic Sandwich" (Logic -> Syntax):** `CodeScramble` -> `GuidedPractice` (Snippet Mode)
*   **The "Skill Drill" Loop (Build -> Test Skill):** `GuidedPractice` (Project Mode) -> `BugSquasherScenario` (Isolated Drill)
*   **The "Deep Dive" Loop (Concept -> Internals):** `GuidedPractice` -> `OsMemoryManagerView`

---
### **Visualizer Catalogue & JSON Schemas**

{schema_definitions}

---
### Further Pedagogical Elaboration and Best Practices

To ensure the highest quality educational content, consider these principles when constructing your LearningSequence:

*   **Cognitive Load Management:** Break down complex topics into digestible chunks. A `LearningSequence` for a single objective typically consists of 5-10 visualizer steps.
*   **Narrative Cohesion:** Use `narration` and `description` to tell a story. Consistently refer back to the `primaryAnchor` and `analogyAnchor` to create a memorable learning journey.
*   **Active vs. Passive Learning:** Balance passive tools (`InteractiveTheoryReader`) with active tools (`GuidedPractice`, `BugSquasherScenario`). The ideal rhythm is: Introduce → Practice → Assess.
*   **Visualizer Synergy:** Combine visualizers for reinforcement. A `FlowchartVisualizer` maps logic that the learner then implements in `GuidedPractice`. A `ChartView` shows data explained by a `CodeComparisonView`.

---
### **Chain-of-Thought: Planning Before Generation**

Before generating content, ALWAYS think through these questions:

1. **What is the KEY INSIGHT for this learning objective?** (One sentence summary)
2. **What does the learner already know?** (Previous layers/modules)
3. **Which visualizers best convey this for the current layer?** (Match to layer goals)
4. **How does this connect to the Day 1 Product or Capstone?** (Practical application)
5. **What common misconceptions should I address?** (Anti-patterns)

---
### **Few-Shot Examples (Gold Standard)**

These examples show the CORRECT way to structure common visualizers:

#### Example 1: InteractiveTheoryReader (Introduction + Quiz)
```json
{
  "visualizerType": "InteractiveTheoryReader",
  "visualizerParams": {
    "title": "Variables: Your Program's Memory Boxes",
    "content": [
      {"type": "heading", "text": "What is a Variable?"},
      {"type": "paragraph", "text": "Imagine your smartphone's home screen with app icons. Each icon (variable name) leads to a specific app (value). You can change what icon leads where, just like reassigning a variable."},
      {"type": "paragraph", "text": "In Python, we create variables using the assignment operator `=`. The name goes on the left, the value on the right."},
      {"type": "code_snippet", "code": "player_name = 'Hero'\\nscore = 100", "language": "python"},
      {"type": "multiple_choice_question", "question": "What does `score = 100` do?", "options": ["Creates a variable named score with value 100", "Checks if score equals 100", "Prints 100"], "correctAnswerIndex": 0, "explanation": "The single `=` is the assignment operator - it stores the value 100 in the variable named score."}
    ]
  }
}
```

#### Example 2: GuidedPractice (single_file mode for Day 1 Product)
```json
{
  "visualizerType": "GuidedPractice",
  "visualizerParams": {
    "mode": "single_file",
    "title": "Adding User Input to Your Greeting",
    "description": "Let's make our program ask for the player's name!",
    "targetFile": "main.py",
    "language": "python",
    "starterCode": "# Our greeting program\\nprint('Welcome to the Adventure!')",
    "finalCode": "# Our greeting program\\nplayer_name = input('What is your name? ')\\nprint('Welcome to the Adventure, ' + player_name + '!')",
    "hints": ["Use input() to ask a question", "Store the result in a variable", "Concatenate strings with +"],
    "steps": [
      {"description": "Add an input() call to ask for the player's name", "targetCode": "player_name = input('What is your name? ')"},
      {"description": "Modify print() to include the player's name", "targetCode": "print('Welcome to the Adventure, ' + player_name + '!')"}
    ]
  }
}
```

#### Example 3: CodeComparisonView (Bad vs Good)
```json
{
  "visualizerType": "CodeComparisonView",
  "visualizerParams": {
    "title": "String Concatenation: Ugly vs Clean",
    "items": [
      {"title": "❌ Hard to Read", "code": "print('Name: ' + name + ', Age: ' + str(age) + ', Score: ' + str(score))", "language": "python", "description": "Multiple + operators and str() calls make this messy."},
      {"title": "✅ f-string", "code": "print(f'Name: {name}, Age: {age}, Score: {score}')", "language": "python", "description": "f-strings are cleaner and don't need str() for numbers."}
    ],
    "description": "f-strings make your code more readable by embedding variables directly in the string."
  }
}
```

---
### **Negative Examples (What NOT To Do)**

Avoid these common mistakes:

#### ❌ DON'T: Start with code before explaining the concept
```json
// WRONG - jumping straight to code
[
  {"visualizerType": "GuidedPractice", "visualizerParams": {...}},
  {"visualizerType": "InteractiveTheoryReader", "visualizerParams": {"content": [{"type": "paragraph", "text": "Let me explain what you just did..."}]}}
]
```
**Why Wrong:** Learner has no context. ALWAYS introduce → practice → assess.

#### ❌ DON'T: Use placeholder text
```json
// WRONG - lazy placeholders
{"type": "paragraph", "text": "[Insert analogy here]"}
{"type": "paragraph", "text": "This is like {placeholder}."}
```
**Fix:** Write complete, specific content using the analogyAnchor.

#### ❌ DON'T: Repeat the same quiz question across layers
```json
// WRONG - asking "What is a variable?" in every layer
Layer 1: "What is a variable?"
Layer 2: "What is a variable?" 
Layer 3: "What is a variable?"
```
**Fix:** Progressive questions: L1="What", L2="How", L3="Why", L5="Debug it"

#### ❌ DON'T: Mix snippet and single_file in the same concept
```json
// WRONG - work is LOST between these!
[
  {"visualizerType": "GuidedPractice", "visualizerParams": {"mode": "snippet", ...}},
  {"visualizerType": "GuidedPractice", "visualizerParams": {"mode": "single_file", ...}}  // User's snippet work is gone!
]
```
**Fix:** Use ONE mode per concept. If building Day 1 Product, use single_file throughout.

#### ❌ DON'T: Use project mode before Layer 4 (when you have a Day 1 Product)
```json
// WRONG - project mode in Layer 1/2/3 when Day 1 Product exists
{"visualizerType": "GuidedPractice", "visualizerParams": {"mode": "project", "files": {...}}}
```
**Fix:** When course has a Day 1 Product, L1-3 use snippet or single_file. Project mode starts in L4.
**Exception:** For Capstone-only courses (no Day 1 Product), project mode MAY be used in L2-3 to scaffold the Capstone early.

---
"""

USER_PROMPT_TEMPLATE = """
**Overall Course Context:**
* **Title:** {course_title}
* **Primary Anchor:** {primary_anchor}
* **Analogy Anchor:** {analogy_anchor}
* **Target Audience:** {target_audience}
* **Target Age Group:** {age_group}
* **Day 1 Product:** {day1_product}
* **Capstone Project:** {capstone_project}

**Current Task Context:**
* **Layer:** {layer_number} ({pass_name}) - {layer_description}
* **Module:** {module_number}: {module_title}
* **Learning Objective:** {learning_objective}
* **Secondary Anchor for this Module (if any):** {secondary_anchor}

**Bloom's Taxonomy Level for this Layer:**
{bloom_taxonomy}

**Recommended Visualizers for this Module:**
{visualizer_pool}

**Day 1 Product Code Context:**
{day1_milestone_context}

**Project Context (Code Manifest):**
The following is a summary of the current project state. You must build upon this.
{code_manifest}

{rag_context}

**GuidedPractice Mode Rules for Layer {layer_number}:**
{mode_rules}

**Generation Directives:** {dynamic_directives}

**Your Mission:** Generate a complete `LearningSequence` for the `Learning Objective` above. Your output must be a single, valid JSON array of `Visualizer` objects. You MUST prioritize using visualizers from the "Recommended Visualizers" list above, especially the PRIMARY ones. Follow all pedagogical and structural rules from your system instructions. Do not add any commentary or markdown formatting.
"""


SKELETON_PROMPT = """
You are an expert software architect. Your task is to design the COMPLETE file structure and code skeleton for a Capstone Project based on the course details below.

**Course Context:**
*   **Title:** {course_title}
*   **Day 1 Product:** {day1_product}
*   **Capstone Project:** {capstone_project}
*   **Language:** {language}
*   **Platform:** Mobile/Terminal. No GUI frameworks. Use standard input/output.

**Your Goal:**
Generate a JSON object representing the *final* state of the project files.
*   **Keys:** Filenames (e.g., `main.py`, `utils/helper.js`, `App.java`).
*   **Values:** The content of the file.

**CRITICAL RULE: STUBS ONLY**
*   Do NOT write the full implementation logic.
*   Define all **Classes**, **Methods**, and **Function Signatures**.
*   Inside every function/method, use comments like `// TODO: Implement in Layer X` or `pass`.
*   Include necessary `import` statements.
*   The code MUST be syntactically correct for the target language.

**Example Output:**
{{
  "main.py": "import game\\n\\ndef main():\\n    ''' Main entry point '''\\n    game.start()\\n\\nif __name__ == '__main__':\\n    main()",
  "game.py": "class Game:\\n    def start(self):\\n        pass"
}}

Generate the JSON object now.
"""


# --- Helper Functions ---
def get_dynamic_directives(layer_number_str, objective_text=""):
    """Returns phase-specific directives for each layer."""
    directives = {
        "1": """**Phase: The Blueprint**
Focus on ARCHITECTURE and DESIGN. Explain the 'What' and 'Why'.
**Mandatory Visualizers:** Start with `InteractiveTheoryReader` for intro, then use `UmlClassDiagramBuilder` or `FlowchartVisualizer` to show the high-level design.
**Goal:** Learner understands the structure before writing any code.""",
        "2": """**Phase: The Construction**
Focus on BUILDING the happy path. Get it running.
**Mandatory Visualizers:** Use `GuidedPractice` (CRITICAL - at least 2 per objective), `CodeComparisonView` to show step-by-step evolution.
**Goal:** Learner writes working code.""",
        "3": """**Phase: The Inspector**
Focus on ROBUSTNESS. Edge cases, debugging, refactoring.
**Mandatory Visualizers:** Use `BugSquasherScenario`, `CodeRefactorChallenge`, `InteractiveTheoryReader` for deep dives.
**Goal:** Learner makes code production-ready.""",
        "4": """**Phase: The Evolution**
Focus on EXPANDING to Capstone. Refactor single-file into multi-file.
**Visualizers:** `GuidedPractice` with low scaffolding, `CodeComparisonView` (before vs after refactor).
**Goal:** Learner transitions from Day 1 Product to Capstone structure.""",
        "5": """**Phase: Mastery Test - Debug**
Give learner BROKEN CODE from earlier layers. They must fix it.
**Mandatory Visualizers:** `BugSquasherScenario` only.
**Goal:** Test debugging skills.""",
        "6": """**Phase: Mastery Test - Analyze**
Present two approaches. Learner analyzes tradeoffs.
**Mandatory Visualizers:** `CodeComparisonView`, `ChartView` for performance comparison.
**Goal:** Test critical thinking.""",
        "7": """**Phase: Mastery Test - Create**
Minimal guidance. Learner builds a new feature.
**Mandatory Visualizers:** `GuidedPractice` with VERY LOW scaffolding (just a hint).
**Goal:** Test true mastery and independence.""",
    }

    base_directive = directives.get(
        str(layer_number_str),
        "Generate content appropriate for the learning objective.",
    )

    # Add Topic-Based Triggers
    objective_lower = str(objective_text).lower()
    triggers = []

    if any(
        x in objective_lower
        for x in ["logic", "algorithm", "sort", "search", "sequence"]
    ):
        triggers.append(
            "TOPIC TRIGGER: This topic involves Logic/Algorithms. You MUST use `CodeScramble` or `AlgorithmicSandbox`."
        )

    if any(
        x in objective_lower
        for x in ["variable", "memory", "pointer", "reference", "stack", "heap"]
    ):
        triggers.append(
            "TOPIC TRIGGER: This topic involves Memory/Variables. You MUST use `OsMemoryManagerView` to visualize the internals."
        )

    if any(
        x in objective_lower
        for x in ["network", "api", "http", "web", "request", "json"]
    ):
        triggers.append(
            "TOPIC TRIGGER: This topic involves Networking. You MUST use `NetworkJourneyView`."
        )

    if triggers:
        return base_directive + "\n\n" + "\n".join(triggers)

    return base_directive


def get_mode_rules_string(layer_num, has_day1_product=True, has_capstone=True):
    """
    Returns GuidedPractice mode rules as a string for prompt injection.

    CRITICAL RULES:
    - snippet: Ephemeral, isolated drills (L1-L2, L5-L6)
    - single_file: Persistent, Day 1 Product OR mini-features (L1-L3, L6-L7)
    - project: Multi-file Capstone (L4 ONLY)

    GLOBAL: Do NOT mix snippet and single_file within the same concept!
    """
    layer = int(layer_num)

    if layer == 1:
        if has_day1_product:
            return """ALLOWED MODES: snippet, single_file
DEFAULT MODE: snippet
RULE: Use 'snippet' for isolated syntax drills. Use 'single_file' when starting the Day 1 Product.
BANNED: 'project' mode is NOT allowed in Layer 1.
CRITICAL: Do NOT mix snippet and single_file within the same concept - snippet is ephemeral!"""
        else:
            return """ALLOWED MODES: snippet, single_file  
DEFAULT MODE: single_file
RULE: Use 'single_file' for incremental Capstone scaffolding. Use 'snippet' for isolated drills.
BANNED: 'project' mode is NOT allowed in Layer 1.
CRITICAL: Do NOT mix snippet and single_file within the same concept!"""

    elif layer == 2:
        if has_day1_product:
            return """ALLOWED MODES: snippet, single_file
DEFAULT MODE: single_file
RULE: Primarily use 'single_file' for building the Day 1 Product incrementally. Use 'snippet' only for quick syntax drills.
BANNED: 'project' mode is NOT allowed in Layer 2 when Day 1 Product exists.
CRITICAL: Do NOT mix snippet and single_file within the same concept - snippet is ephemeral!"""
        else:
            # Capstone-only course - allow early project scaffolding
            return """ALLOWED MODES: snippet, single_file, project
DEFAULT MODE: single_file
RULE: Use 'single_file' for incremental Capstone scaffolding. 'project' mode MAY be used for early multi-file structure.
NOTE: For Capstone-only courses, 'project' mode is allowed starting L2 to introduce multi-file concepts early.
CRITICAL: Do NOT mix snippet and single_file within the same concept!"""

    elif layer == 3:
        if has_day1_product:
            return """ALLOWED MODES: single_file
DEFAULT MODE: single_file
RULE: Complete the Day 1 Product. All code should build on previous layers.
BANNED: 'project' mode is NOT allowed in Layer 3 when Day 1 Product exists. 'snippet' mode should be avoided."""
        else:
            # Capstone-only course - project mode allowed
            return """ALLOWED MODES: single_file, project
DEFAULT MODE: project
RULE: Use 'project' mode to scaffold the Capstone multi-file structure.
NOTE: For Capstone-only courses, Layer 3 transitions to multi-file project development.
BANNED: 'snippet' mode should be avoided in Layer 3."""

    elif layer == 4:
        return """ALLOWED MODES: project
DEFAULT MODE: project
RULE: Use multi-file 'project' mode for Capstone development.
FOCUS: Work on ONE file at a time using 'activeFile'. Update background files via 'files' map.
BANNED: 'snippet' and 'single_file' modes are NOT appropriate for Layer 4.
NOTE: Capstone building ENDS in Layer 4."""

    elif layer == 5:
        return """ALLOWED MODES: snippet
DEFAULT MODE: snippet
RULE: Layer 5 is MASTERY TEST - DEBUG. Use 'snippet' mode with isolated broken code challenges.
FOCUS: Use BugSquasherScenario visualizer. Give broken code, learner fixes it.
BANNED: 'project' mode is NOT allowed. Capstone building ended in Layer 4."""

    elif layer == 6:
        return """ALLOWED MODES: snippet, single_file
DEFAULT MODE: snippet
RULE: Layer 6 is MASTERY TEST - ANALYZE. Use 'snippet' for comparing approaches.
FOCUS: Use CodeComparisonView. If learner implements alternatives, use 'single_file' for isolated experiments.
BANNED: 'project' mode is NOT allowed. Capstone building ended in Layer 4.
CRITICAL: Do NOT mix snippet and single_file within the same concept!"""

    elif layer == 7:
        return """ALLOWED MODES: single_file
DEFAULT MODE: single_file
RULE: Layer 7 is MASTERY TEST - CREATE. Learner builds a new mini-feature from scratch.
FOCUS: Use GuidedPractice with VERY LOW scaffolding. Provide solution for comparison.
BANNED: 'project' mode is NOT allowed. This is standalone feature creation, not Capstone expansion."""

    return "Use appropriate mode for the layer."


def get_bloom_taxonomy_string(learner_view, layer_num):
    """Extracts Bloom's Taxonomy info from enriched syllabus for prompt injection."""
    layers = learner_view.get("layers", {})
    layer_data = layers.get(str(layer_num), {})
    bloom = layer_data.get("bloom", {})

    if not bloom:
        return "Not specified."

    level = bloom.get("level", "Unknown")
    verbs = bloom.get("verbs", [])
    avoid = bloom.get("avoid", [])

    result = f"Level: {level}\n"
    if verbs:
        result += f"Use verbs like: {', '.join(verbs)}\n"
    if avoid:
        result += f"AVOID verbs like: {', '.join(avoid)}"

    return result


def get_visualizer_pool_string(learner_view, layer_num, module_num):
    """Extracts visualizer pool recommendations from enriched syllabus."""
    layers = learner_view.get("layers", {})
    layer_data = layers.get(str(layer_num), {})
    modules = layer_data.get("modules", [])

    # Find the specific module
    module_data = None
    for m in modules:
        if m.get("number") == module_num:
            module_data = m
            break

    if not module_data:
        return "No specific recommendations. Use layer defaults."

    pool = module_data.get("visualizerPool", {})

    # Handle case where pool is just a list (e.g., orientation modules)
    if isinstance(pool, list):
        return f"Recommended: {', '.join(pool)}"

    if not isinstance(pool, dict):
        return "No specific recommendations. Use layer defaults."

    result = ""

    primary = pool.get("primary", [])
    secondary = pool.get("secondary", [])
    mandatory = pool.get("mandatory", {})
    banned = pool.get("banned", [])
    focus = pool.get("focus", "")
    ai_reason = pool.get("aiReason", "")

    if primary:
        result += f"PRIMARY (must use at least one): {', '.join(primary)}\n"
    if secondary:
        result += f"SECONDARY (optional): {', '.join(secondary)}\n"
    if mandatory:
        for viz, reason in mandatory.items():
            result += f"MANDATORY: {viz} - {reason}\n"
    if banned:
        result += f"BANNED (do not use): {', '.join(banned)}\n"
    if focus:
        result += f"Focus: {focus}\n"
    if ai_reason:
        result += f"Reasoning: {ai_reason}"

    return result if result else "No specific recommendations."


def get_day1_milestone_context(learner_view, layer_num):
    """Extracts Day 1 Product milestone code for context."""
    projects = learner_view.get("projects", {})
    day1_data = projects.get("day1Product", {})
    milestones = day1_data.get("milestones", {})

    if not milestones:
        return "No Day 1 Product milestones available."

    layer = int(layer_num)
    result = []

    # Show relevant milestones for context
    if layer <= 3:
        # For L1-3, show current and previous milestones
        for l in range(1, layer + 1):
            code = milestones.get(str(l), "")
            if code:
                lines = len(code.splitlines())
                result.append(f"Layer {l} milestone ({lines} lines): Available")

        # Show current layer's expected state
        current_code = milestones.get(str(layer), "")
        if current_code:
            # Truncate to first 20 lines for context
            preview = "\n".join(current_code.splitlines()[:20])
            result.append(
                f"\nCurrent Layer {layer} Target Code (first 20 lines):\n```\n{preview}\n```"
            )
    else:
        # For L4+, Day 1 Product should be complete
        final_code = milestones.get("3", "")
        if final_code:
            result.append("Day 1 Product is COMPLETE. Focus on Capstone project now.")

    return "\n".join(result) if result else "No Day 1 Product context."


def get_schema_string():
    """Generates a formatted string of all visualizer schemas."""
    schema_text = ""
    # Group 1: AI-Authored
    schema_text += (
        "#### **Group 1: AI-Authored Visualizers (You are the direct author)**\n\n"
    )
    for name, schema in VISUALIZER_SCHEMAS.items():
        if name in [
            "InteractiveTheoryReader",
            "OsMemoryManagerView",
            "NetworkJourneyView",
            "GuidedPractice",
            "HistoryTimelineView",
            "CompilationExplorerView",
            "CodeComparisonView",
            "FunctionImplementationView",
            "ChartView",
            "FlowchartVisualizer",
            "TreeView",
            "UITreeVisualizer",
            "FunctionSignatureBuilder",
            "UmlClassDiagramBuilder",
            "CodeScramble",
            "CodeRefactorChallenge",
            "BugSquasherScenario",
        ]:
            schema_text += f"**`{name}`**: {schema.get('description', '')} `visualizerParams`: `{json.dumps(schema['properties']['visualizerParams'], indent=None)}`.\n"

    # Group 2: Smart Visualizers
    schema_text += (
        "\n#### **Group 2: Smart Visualizers (You are the high-level director)**\n"
    )
    for name, schema in VISUALIZER_SCHEMAS.items():
        if name not in [
            "InteractiveTheoryReader",
            "OsMemoryManagerView",
            "NetworkJourneyView",
            "GuidedPractice",
            "HistoryTimelineView",
            "CompilationExplorerView",
            "CodeComparisonView",
            "FunctionImplementationView",
            "ChartView",
            "FlowchartVisualizer",
            "TreeView",
            "UITreeVisualizer",
            "FunctionSignatureBuilder",
            "UmlClassDiagramBuilder",
            "CodeScramble",
            "CodeRefactorChallenge",
            "BugSquasherScenario",
        ]:
            schema_text += f"**`{name}`**: {schema.get('description', '')} `visualizerParams`: `{json.dumps(schema['properties']['visualizerParams'], indent=None)}`.\n"

    return schema_text


# --- Project State Management ---
class ProjectState:
    def __init__(self, state_file):
        self.state_file = state_file
        self.files = {}  # {filename: content}
        self.load()

    def load(self):
        if os.path.exists(self.state_file):
            with open(self.state_file, "r", encoding="utf-8") as f:
                self.files = json.load(f)

    def save(self):
        with open(self.state_file, "w", encoding="utf-8") as f:
            json.dump(self.files, f, indent=2)

    def update(self, filename, content):
        """Updates or creates a file in the project state."""
        self.files[filename] = content
        self.save()

    def get_manifest(self):
        """Returns a token-optimized summary of the project."""
        if not self.files:
            return "No files created yet."

        manifest = "Existing Files:\n"
        for filename, content in self.files.items():
            # Handle case where content is a dict (nested structure) vs string
            if isinstance(content, dict):
                manifest += (
                    f"- {filename} (nested structure with {len(content)} items)\n"
                )
                continue
            if not isinstance(content, str):
                manifest += f"- {filename} (unknown type)\n"
                continue

            manifest += f"- {filename} ({len(content.splitlines())} lines)\n"
            # Simple heuristic to extract function/class signatures for context
            # This avoids sending the full code but gives the AI the API surface
            lines = content.splitlines()
            for line in lines:
                if line.strip().startswith(("def ", "class ")):
                    manifest += f"  {line.strip().rstrip(':')}\n"
        return manifest

    def extract_and_update_from_response(self, response_json):
        """
        Scans the generated visualizers for code updates and applies them.
        Looks for 'GuidedPractice', 'CodeComparisonView', 'FunctionImplementationView'.
        """
        for visualizer in response_json:
            v_type = visualizer.get("visualizerType")
            params = visualizer.get("visualizerParams", {})

            # Heuristic: Extract code from known visualizers that contain "final" code
            # Note: This is a simplification. In a real scenario, we might need more specific logic
            # to decide which code is "canonical" vs "broken/example".
            # For now, we assume 'GuidedPractice' with 'finalCode' is the source of truth.

            if v_type == "GuidedPractice":
                mode = params.get("mode", "single_file")

                # Mode 1: Snippet (Ephemeral) - Do nothing
                if mode == "snippet":
                    continue

                # Mode 2: Single File (Day 1 Product)
                elif mode == "single_file":
                    if "finalCode" in params:
                        filename = params.get("targetFile", "main.py")
                        self.update(filename, params["finalCode"])

                # Mode 3: Project (Capstone)
                elif mode == "project":
                    # Update background files first
                    if "files" in params and isinstance(params["files"], dict):
                        for fname, content in params["files"].items():
                            # PROTECT SKELETON: Do not overwrite existing files from the skeleton
                            # unless they are explicitly marked as 'overwrite' (which we don't use yet)
                            # or if the file is empty/placeholder.
                            if fname not in self.files:
                                self.update(fname, content)
                            else:
                                # Optional: Log that we skipped overwriting
                                pass

                    # Update active file with finalCode (source of truth)
                    if "activeFile" in params and "finalCode" in params:
                        # Active file is usually the one being worked on, so we MIGHT want to update it.
                        # However, to be safe for the skeleton, we'll apply the same rule:
                        # Only update if it's a new file or we are sure.
                        # For now, let's allow activeFile update as it represents the learner's progress
                        # BUT, if it's a core skeleton file like index.html, we might want to be careful.
                        # Let's stick to the safe approach: Don't overwrite if it exists.
                        if params["activeFile"] not in self.files:
                            self.update(params["activeFile"], params["finalCode"])

    def export_final_project(self, output_dir):
        """Exports all files in the project state to a directory."""
        final_project_path = os.path.join(output_dir, "final_project")
        os.makedirs(final_project_path, exist_ok=True)
        print(f"Exporting final project to: {final_project_path}")
        for filename, content in self.files.items():
            file_path = os.path.join(final_project_path, filename)
            # Handle subdirectories if filename contains paths
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
        print("✅ Final project export complete.")


def load_progress(progress_file):
    if os.path.exists(progress_file):
        with open(progress_file, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return {"completed_objectives": {}}
    return {"completed_objectives": {}}


def save_progress(progress_file, progress_data):
    with open(progress_file, "w", encoding="utf-8") as f:
        json.dump(progress_data, f, indent=2)


def generate_filename(layer_num, module_num, objective_text, pass_name=""):
    sanitized_objective = re.sub(r"[^a-zA-Z0-9_]", "", str(objective_text)).lower()
    short_objective = textwrap.shorten(sanitized_objective, width=50, placeholder="")
    if pass_name and layer_num == "4":
        return f"L{layer_num}_M{module_num}_{pass_name}_{short_objective}.json"
    return f"L{layer_num}_M{module_num}_{short_objective}.json"


def repair_json_with_ai(client, broken_json_text):
    """Attempts to repair a broken JSON string using a standard, non-batch API call."""
    tqdm.write("...Response was not valid JSON. Attempting to repair...")
    try:
        # Using a standard model for the repair task.
        repair_model = client.models.generate_content(
            model=MODEL_DEFAULT,  # Use 2.5 Pro for repairs
            contents=f"""The following text was supposed to be a single, valid JSON array of objects, but it is broken. Please fix it and return ONLY the corrected, raw JSON text. Do not add any commentary, explanations, or markdown formatting like ```json ... ```.

Broken JSON:
{broken_json_text}""",
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )
        repaired_text = repair_model.text
        json.loads(repaired_text)  # Test if it's valid now
        tqdm.write("✅ JSON successfully repaired.")
        return repaired_text
    except Exception as e:
        tqdm.write(f"❌ JSON repair failed: {e}")
        return None


def generate_skeleton(client, learner_view, language="Python"):
    """Generates the initial project skeleton (stubs)."""
    print("🏗️ Generating Project Skeleton...")
    prompt = SKELETON_PROMPT.format(
        course_title=learner_view.get("courseTitle", ""),
        day1_product=learner_view.get("day1Product", "N/A"),
        capstone_project=learner_view.get("capstoneProject", "N/A"),
        language=language,
    )

    try:
        response = client.models.generate_content(
            model=MODEL_CAPSTONE,  # Use 3 Pro for skeleton generation
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )
        skeleton_json = json.loads(response.text)
        print("✅ Skeleton generated successfully.")
        return skeleton_json
    except Exception as e:
        print(f"❌ Failed to generate skeleton: {e}")
        return {}


def load_course_metadata():
    """Load course metadata from the centralized JSON file."""
    metadata_path = os.path.join(
        os.path.dirname(__file__), "codelab_docs", "courses_metadata.json"
    )
    try:
        with open(metadata_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠️ Warning: Could not load courses_metadata.json: {e}")
        return []


def get_course_id_from_title(title, metadata_list):
    """Find course_id by matching title in metadata."""
    title_lower = title.lower().strip()
    for course in metadata_list:
        if course.get("title", "").lower().strip() == title_lower:
            return course.get("id")
        if title_lower in course.get("title", "").lower():
            return course.get("id")
    return None


def main():
    parser = argparse.ArgumentParser(
        description="Course Generation Service using Gemini Context Caching."
    )
    parser.add_argument("inputFile", help="Path to the source learner_view.json file.")
    parser.add_argument(
        "--limit", type=int, help="Limit the number of prompts to process for testing."
    )
    parser.add_argument(
        "--language",
        type=str,
        default="Python",
        help="Target programming language (e.g., Python, Java, JavaScript).",
    )
    parser.add_argument(
        "--courseId",
        type=str,
        help="Course ID for output directory naming. If not provided, extracted from metadata or title.",
    )
    parser.add_argument(
        "--skip-rag-check",
        action="store_true",
        help="Allow running without RAG memory (NOT recommended - content quality will suffer).",
    )
    args = parser.parse_args()

    # RAG availability check - STOP if not available unless explicitly skipped
    if not RAG_AVAILABLE:
        if args.skip_rag_check:
            print("⚠️ WARNING: Running WITHOUT RAG memory. Content quality will suffer!")
            print("   To enable RAG: pip install chromadb sentence-transformers")
        else:
            print("❌ ERROR: RAG memory is NOT available!")
            print(
                "   RAG is required for consistent, context-aware content generation."
            )
            print("")
            print("   To fix, run in virtual environment with:")
            print("   pip install chromadb sentence-transformers")
            print("")
            print("   Or use --skip-rag-check to proceed anyway (NOT recommended).")
            return

    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GOOGLE_API_KEY not found in .env file.")
        return

    if not os.path.exists(args.inputFile):
        print(f"Error: Input file not found at '{args.inputFile}'")
        return

    print(f"Loading learner view from: {args.inputFile}")
    with open(args.inputFile, "r", encoding="utf-8") as f:
        learner_view = json.load(f)

    course_title = learner_view.get("courseTitle", "untitled_course")

    # Load metadata for course_id and language detection
    metadata_list = load_course_metadata()
    matched_course = None
    for course in metadata_list:
        if course.get("title", "").lower() == course_title.lower():
            matched_course = course
            break
        if course.get("title", "").lower() in course_title.lower():
            matched_course = course
            break

    # Determine course_id for directory naming
    if args.courseId:
        course_id = args.courseId
        print(f"📋 Using provided course ID: {course_id}")
    elif matched_course:
        course_id = matched_course.get("id")
        print(f"📋 Found course ID from metadata: {course_id}")
    else:
        # Fallback to sanitized title
        course_id = re.sub(r'[<>:"/\\|?*]', "", course_title).lower().replace(" ", "_")
        print(f"📋 Using generated course ID: {course_id}")

    # Determine language
    if args.language:
        language = args.language
        print(f"📋 Using provided language: {language}")
    elif matched_course:
        language = matched_course.get("language", "Python")
        print(f"📋 Auto-detected language from metadata: {language}")
    else:
        language = "Python"
        print(f"📋 Using default language: {language}")

    output_path = os.path.join(OUTPUT_DIR_BASE, course_id)
    os.makedirs(output_path, exist_ok=True)

    progress_file_path = os.path.join(output_path, PROGRESS_FILE)
    progress_data = load_progress(progress_file_path)

    project_state_file_path = os.path.join(output_path, PROJECT_STATE_FILE)
    project_state = ProjectState(project_state_file_path)

    client = genai.Client(api_key=api_key)

    # --- Step 0: Initialize Project State from Enriched Syllabus ---
    if not project_state.files:
        # First, try to use skeleton from enriched syllabus (generated by enhance_syllabus.py)
        projects = learner_view.get("projects", {})
        capstone_data = projects.get("capstone", {})
        enriched_skeleton = capstone_data.get("skeleton", {})

        if (
            enriched_skeleton
            and isinstance(enriched_skeleton, dict)
            and len(enriched_skeleton) > 0
        ):
            print("📦 Using Capstone skeleton from enriched syllabus...")
            for filename, content in enriched_skeleton.items():
                # Handle nested structures (e.g., css/style.css)
                if isinstance(content, str):
                    project_state.update(filename, content)
                else:
                    print(f"   ⚠️ Skipping nested structure: {filename}")
            print(
                f"   ✅ Loaded {len([f for f, c in enriched_skeleton.items() if isinstance(c, str)])} files from enriched syllabus"
            )
        else:
            # Fallback: Generate skeleton via API
            print("⚠️ No skeleton found in enriched syllabus. Generating via API...")
            skeleton = generate_skeleton(client, learner_view, args.language)
            for filename, content in skeleton.items():
                project_state.update(filename, content)
    else:
        print("ℹ️ Project state already exists. Skipping skeleton initialization.")

    # --- Step 0.5: Initialize RAG Memory ---
    course_memory = None
    if RAG_AVAILABLE:
        try:
            course_memory = CourseMemory(course_id)
            print(f"✅ RAG Memory initialized. Stats: {course_memory.get_stats()}")
        except Exception as e:
            print(f"⚠️ RAG Memory unavailable: {e}. Continuing without RAG.")
            course_memory = None
    else:
        print("ℹ️ RAG Memory not available. Continuing without context enrichment.")

    # Check for Day 1 Product and Capstone
    has_day1_product = bool(
        learner_view.get("day1Product") and learner_view.get("day1Product") != "N/A"
    )
    has_capstone = bool(
        learner_view.get("capstoneProject")
        and learner_view.get("capstoneProject") != "N/A"
    )

    # --- Step 1: Create Context Caches (Hybrid Model Approach) ---
    print("Creating Context Caches (Hybrid Model)...")
    # The system prompt + schemas are static and heavy. We cache them.
    # Use replace() instead of format() to avoid escaping issues with JSON braces
    full_system_prompt = SYSTEM_PROMPT.replace(
        "{schema_definitions}", get_schema_string()
    )

    # Cache for Gemini 2.5 Pro (Layers 1-3, 5-7)
    cache_default = None
    try:
        cache_default = client.caches.create(
            model=MODEL_DEFAULT,
            config=types.CreateCachedContentConfig(
                display_name=f"{course_id}_cache_2.5pro",
                system_instruction=full_system_prompt,
                ttl="14400s",  # 4 hours
            ),
        )
        print(f"✅ Cache (2.5 Pro) created: {cache_default.name}")
    except Exception as e:
        print(f"❌ Failed to create 2.5 Pro cache: {e}")
        return

    # Cache for Gemini 3 Pro (Layer 4 - Capstone)
    cache_capstone = None
    try:
        cache_capstone = client.caches.create(
            model=MODEL_CAPSTONE,
            config=types.CreateCachedContentConfig(
                display_name=f"{course_id}_cache_3pro",
                system_instruction=full_system_prompt,
                ttl="14400s",  # 4 hours
            ),
        )
        print(f"✅ Cache (3 Pro) created: {cache_capstone.name}")
    except Exception as e:
        print(f"⚠️ Failed to create 3 Pro cache: {e}")
        print("   Layer 4 will use 2.5 Pro instead.")
        cache_capstone = cache_default  # Fallback

    # --- Step 2: Sequential Generation Loop ---
    print("Starting Sequential Generation...")

    objectives_to_process = []
    # Flatten the syllabus into an ordered list of objectives
    for layer_num_str, layer_data in learner_view.get("layers", {}).items():
        pass_name = layer_data.get("passName", "")
        for module_data in layer_data.get("modules", []):
            objectives_list = []
            if int(layer_num_str) in [1, 2, 3]:
                objectives_list = module_data.get("concepts", [])
            elif int(layer_num_str) in [5, 6, 7] and "applicationPrompt" in module_data:
                objectives_list = [module_data.get("applicationPrompt")]

            for objective in objectives_list:
                if not objective:
                    continue
                objective_id = f"L{layer_num_str}_M{module_data['number']}_{objective}"
                objectives_to_process.append(
                    {
                        "id": objective_id,
                        "layer_num": layer_num_str,
                        "module_num": module_data["number"],
                        "module_title": module_data["title"],
                        "secondary_anchor": module_data.get("secondaryAnchor"),
                        "objective_text": objective,
                        "layer_description": layer_data.get("description", ""),
                        "pass_name": pass_name,
                    }
                )

            if int(layer_num_str) == 4 and "masterySpiral" in module_data:
                mastery_intro = module_data["masterySpiral"].get("introduction", "")
                for a_pass in module_data["masterySpiral"].get("passes", []):
                    for concept in a_pass.get("concepts", []):
                        objective_id = (
                            f"L4_M{module_data['number']}_{a_pass['pass']}_{concept}"
                        )
                        objectives_to_process.append(
                            {
                                "id": objective_id,
                                "layer_num": "4",
                                "module_num": module_data["number"],
                                "module_title": module_data["title"],
                                "secondary_anchor": module_data.get("secondaryAnchor"),
                                "objective_text": concept,
                                "layer_description": f"{layer_data.get('description', '')} - {mastery_intro}",
                                "pass_name": a_pass["pass"],
                            }
                        )

    if args.limit:
        objectives_to_process = objectives_to_process[: args.limit]

    consecutive_failures = 0  # Track consecutive failures to stop early
    MAX_CONSECUTIVE_FAILURES = 2

    for obj in tqdm(objectives_to_process, desc="Generating Content"):
        if (
            progress_data["completed_objectives"].get(obj["id"], {}).get("status")
            == "completed"
        ):
            continue

        # 1. Query RAG for context (if available)
        rag_context = ""
        if course_memory:
            try:
                rag_context = course_memory.query_context(
                    obj["objective_text"], int(obj["layer_num"])
                )
            except Exception as e:
                tqdm.write(f"⚠️ RAG query failed: {e}")
                rag_context = ""

        # 2. Get mode rules for this layer
        mode_rules = get_mode_rules_string(
            obj["layer_num"], has_day1_product, has_capstone
        )

        # 3. Get enriched data from syllabus
        bloom_taxonomy = get_bloom_taxonomy_string(learner_view, obj["layer_num"])
        visualizer_pool = get_visualizer_pool_string(
            learner_view, int(obj["layer_num"]), int(obj["module_num"])
        )
        day1_milestone_context = get_day1_milestone_context(
            learner_view, obj["layer_num"]
        )

        # 4. Build Prompt with Current Code Manifest, RAG context, Mode Rules, and Enriched Data
        user_prompt = USER_PROMPT_TEMPLATE.format(
            course_title=learner_view.get("courseTitle", ""),
            primary_anchor=learner_view.get("primaryAnchor", ""),
            analogy_anchor=learner_view.get("analogyAnchor") or "N/A",
            target_audience=learner_view.get("targetAudience", ""),
            age_group=learner_view.get("ageGroup", ""),
            day1_product=learner_view.get("day1Product", "N/A"),
            capstone_project=learner_view.get("capstoneProject", "N/A"),
            language=args.language,  # INJECT LANGUAGE
            layer_number=obj["layer_num"],
            pass_name=obj.get("pass_name", ""),
            layer_description=obj.get("layer_description", ""),
            module_number=obj["module_num"],
            module_title=obj["module_title"],
            secondary_anchor=obj.get("secondary_anchor") or "N/A",
            learning_objective=obj["objective_text"],
            bloom_taxonomy=bloom_taxonomy,  # INJECT BLOOM'S TAXONOMY
            visualizer_pool=visualizer_pool,  # INJECT VISUALIZER RECOMMENDATIONS
            day1_milestone_context=day1_milestone_context,  # INJECT DAY 1 CONTEXT
            code_manifest=project_state.get_manifest(),  # INJECT MANIFEST
            rag_context=rag_context,  # INJECT RAG CONTEXT
            mode_rules=mode_rules,  # INJECT MODE RULES
            dynamic_directives=get_dynamic_directives(
                obj["layer_num"], obj["objective_text"]
            ),
        )

        # 2. Call API using Context Cache with retry logic
        max_retries = 3
        retry_delay = 60  # Start with 60 seconds for rate limit

        # Select model and cache based on layer (Hybrid approach)
        # Use Gemini 3 Pro for Layers 4-7 (better for code-heavy mastery content)
        use_advanced_model = int(obj["layer_num"]) >= 4
        current_model = MODEL_CAPSTONE if use_advanced_model else MODEL_DEFAULT
        current_cache = cache_capstone if use_advanced_model else cache_default

        for attempt in range(max_retries):
            try:
                response = client.models.generate_content(
                    model=current_model,
                    contents=user_prompt,
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                        cached_content=current_cache.name,  # USE APPROPRIATE CACHE
                    ),
                )

                raw_text = response.text
                try:
                    json_data = json.loads(raw_text)
                except json.JSONDecodeError:
                    repaired_text = repair_json_with_ai(client, raw_text)
                    if repaired_text:
                        json_data = json.loads(repaired_text)
                    else:
                        raise ValueError("Invalid JSON response")

                # 3. Save Output
                layer_output_dir = os.path.join(
                    output_path, f"layer_{obj['layer_num']}"
                )
                os.makedirs(layer_output_dir, exist_ok=True)
                filename = generate_filename(
                    obj["layer_num"],
                    obj["module_num"],
                    obj["objective_text"],
                    obj.get("pass_name", ""),
                )
                filepath = os.path.join(layer_output_dir, filename)
                with open(filepath, "w", encoding="utf-8") as f:
                    json.dump(json_data, f, indent=2)

                # 4. Update Project State
                project_state.extract_and_update_from_response(json_data)

                # 5. Store in RAG Memory (for future context)
                if course_memory:
                    try:
                        course_memory.add_content(json_data, obj["id"])
                    except Exception as rag_e:
                        tqdm.write(f"⚠️ RAG storage failed: {rag_e}")

                # 6. Update Progress
                progress_data["completed_objectives"][obj["id"]] = {
                    "status": "completed"
                }
                save_progress(progress_file_path, progress_data)
                consecutive_failures = 0  # Reset on success
                break  # Success - exit retry loop

            except Exception as e:
                error_str = str(e)

                # Handle DAILY quota exhausted - STOP IMMEDIATELY
                if "per_day" in error_str or "limit: 0" in error_str:
                    tqdm.write(
                        f"\n🛑 DAILY QUOTA EXHAUSTED - Stopping to preserve progress."
                    )
                    tqdm.write(
                        f"   Run again tomorrow or increase quota in Google Cloud Console."
                    )
                    save_progress(progress_file_path, progress_data)
                    print(
                        f"\n📊 Progress saved. Completed: {len([o for o in progress_data['completed_objectives'].values() if o.get('status') == 'completed'])}"
                    )
                    return  # EXIT FUNCTION

                # Handle per-minute rate limit (429) - wait and retry
                if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                    wait_time = retry_delay * (attempt + 1)  # 60, 120, 180 seconds
                    tqdm.write(
                        f"⏳ Rate limited, waiting {wait_time}s... (attempt {attempt + 1}/{max_retries})"
                    )
                    time.sleep(wait_time)

                    # After max retries on rate limit, STOP to prevent quota waste
                    if attempt == max_retries - 1:
                        tqdm.write(
                            f"\n🛑 RATE LIMIT PERSISTENT - Stopping to preserve quota."
                        )
                        tqdm.write(f"   Wait a few minutes and re-run.")
                        save_progress(progress_file_path, progress_data)
                        print(
                            f"\n📊 Progress saved. Completed: {len([o for o in progress_data['completed_objectives'].values() if o.get('status') == 'completed'])}"
                        )
                        return  # EXIT FUNCTION
                    continue

                # Handle cache expired (403) - recreate cache and retry
                elif "403" in error_str or "CachedContent not found" in error_str:
                    tqdm.write(f"⚠️ Cache expired, recreating...")
                    try:
                        cache = client.caches.create(
                            model=MODEL_DEFAULT,  # Use 2.5 Pro for repairs
                            config=types.CreateCachedContentConfig(
                                display_name=f"{course_id}_cache_renewed",
                                system_instruction=full_system_prompt,
                                ttl="14400s",
                            ),
                        )
                        tqdm.write(f"✅ Cache renewed: {cache.name}")
                        continue  # Retry with new cache
                    except Exception as cache_e:
                        tqdm.write(f"❌ Cache renewal failed: {cache_e}")

                # Other errors - log and check consecutive failures
                tqdm.write(f"❌ Error generating {obj['id']}: {e}")
                progress_data["completed_objectives"][obj["id"]] = {
                    "status": "failed",
                    "error": str(e),
                }
                save_progress(progress_file_path, progress_data)
                consecutive_failures += 1

                # Stop after too many consecutive failures
                if consecutive_failures >= MAX_CONSECUTIVE_FAILURES:
                    tqdm.write(
                        f"\n🛑 {consecutive_failures} CONSECUTIVE FAILURES - Stopping to investigate."
                    )
                    print(
                        f"\n📊 Progress saved. Completed: {len([o for o in progress_data['completed_objectives'].values() if o.get('status') == 'completed'])}"
                    )
                    return  # EXIT FUNCTION
                break  # Exit retry loop, move to next concept

    # --- Step 3: Final Project Export ---
    print("\n📦 Exporting Final Project...")
    project_state.export_final_project(output_path)

    print("\n✅ Course generation complete!")


if __name__ == "__main__":
    main()
