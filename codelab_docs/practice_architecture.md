# Practice Feature Architecture & Documentation

## Overview

The "Practice" feature is a dedicated hub in the application where users can practice coding through various bite-sized challenges called **Snippets**. It replaces the legacy "Spaces" tab and is gated by a Workspace Subscription (or an active free trial/temporary access).

The goal of the Practice feature is to provide fresh, over-the-air practice content without requiring app store updates. To achieve this, the content is decoupled from the app binary and hosted remotely on GitHub.

## Data Architecture & Storage

### 1. Remote Hosting Structure (GitHub Raw)

All practice content is stored as JSON files and hosted on a public repository (e.g., GitHub). The architecture uses a multi-catalog approach to keep file sizes small and scalable:

1. **Master Index (`practice_index.json`)**: The entry point. A single JSON file that lists the raw URLs of all available language-specific catalogs.
2. **Language Catalogs (e.g., `practice_python.json`)**: JSON files containing the metadata (title, difficulty, snippet payload URL) for all practices in a specific language.
3. **Practice Payloads (e.g., `snippets/python_bug_01.json`)**: Individual files containing the specific setup code, test cases, and instructions for a single practice challenge.

**IMPORTANT SCHEMA REQUIREMENT for Payloads**:
The individual snippet JSON payloads MUST strictly adhere to the defined schemas for their respective types (`GuidedPractice`, `BugSquasherScenario`, `CodeRefactorChallenge`).
The single source of truth for generating these payloads is the `codelab_docs/schemas.py` file. Any LLM or developer generating these snippets MUST read `schemas.py` to ensure the correct keys are used (e.g., `buggyCode` vs `initialCode`). Failure to follow the schema exactly will result in parsing errors and a white screen when loading the visualizer.

### 2. Local Caching Strategy (Hive Box)

To ensure fast load times and offline accessibility (after the initial fetch), the app uses `Hive` to cache the downloaded JSON data.

- **Cache Box**: `practice_cache`
- **Index Key**: `practice_index_cache`
- **Catalog Keys**: `practice_catalog_{language}` (e.g., `practice_catalog_python`)
- **Payload Keys**: `practice_payload_{snippet_id}`

The `PracticeRepository` handles the fetching logic:

1. Checks the Hive box for cached data.
2. If hit (and `forceRefresh` is false), it parses and returns the cached JSON.
3. If miss (or `forceRefresh` is true), it makes an HTTP GET request to the remote GitHub URL, saves the response to Hive, and returns the parsed data.

## JSON File Generation Guide & Data Structures

If you are generating new practice snippets to host on your public repository, you must create files that match these exact structures.

### 1. Master Index (e.g., `practice_index.json`)

This file sits at the root of your practice repository. The `PracticeRepository` in the Flutter app fetches this first to discover available languages.

```json
{
  "version": 1,
  "catalogs": [
    {
      "language": "python",
      "url": "https://raw.githubusercontent.com/your-repo/main/practices/python_catalog.json"
    },
    {
      "language": "dart",
      "url": "https://raw.githubusercontent.com/your-repo/main/practices/dart_catalog.json"
    }
  ]
}
```

### 2. Language Catalogs (e.g., `python_catalog.json`)

The app concurrently fetches these catalogs based on the index. The `url` field inside the `snippets` list points to the individual snippet payload JSON files.

```json
{
  "version": 1,
  "snippets": [
    {
      "id": "python_bug_01",
      "type": "bug_squasher",
      "language": "python",
      "title": "Fix the Loop Range",
      "url": "https://raw.githubusercontent.com/your-repo/main/practices/snippets/python_bug_01.json",
      "difficulty": "beginner"
    }
  ],
  "projects": []
}
```

*Note: Valid snippet `type` values in this catalog are exactly `bug_squasher`, `refactor`, or `guided`.*

### 3. Snippet Payloads (e.g., `python_bug_01.json`)

These are the actual coding challenges loaded when a user taps a card. **You must format these according to `codelab_docs/schemas.py`**.

Here is a brief, concrete example of a `BugSquasherScenario` payload:

```json
{
  "visualizerType": "BugSquasherScenario",
  "visualizerParams": {
    "title": "Fix the Loop Range",
    "problemDescription": "The loop is skipping the last element. Fix the off-by-one error.",
    "language": "python",
    "buggyCode": "def print_items(items):\n    for i in range(len(items) - 1):\n        print(items[i])\n",
    "solution": {
      "code": "def print_items(items):\n    for i in range(len(items)):\n        print(items[i])\n",
      "explanation": "Removed the `- 1` from the range to ensure it loops through the entire list."
    }
  }
}
```

### 2. `PracticeSnippet`

Represents an individual item in the catalog. Key fields:

- `id`: Unique identifier.
- `type`: The type of challenge (`bug_squasher`, `refactor`, `guided`).
- `language`: The programming language (`python`, `dart`, `cpp`, etc.).
- `title`: Display name.
- `url`: The remote URL to fetch the full JSON payload.
- `difficulty`: `beginner`, `intermediate`, `advanced`.

## UI Design

The Practice UI is built using GetX for State Management (`PracticeController` and `PracticeView`). It features a modern, premium design:

1. **Language Filter Chips**:
   - A horizontally scrollable list of `ChoiceChip`s (`All`, `Python`, `Dart`, etc.).
   - Dynamically generated by extracting unique languages from the available snippets in the catalog.
   - Selecting a chip instantly filters the list below.

2. **Practice List Items**:
   - Rendered as premium `Card`s with a slight glassmorphic gradient surface.
   - **Icons**: Displays a language-specific FontAwesome icon.
   - **Badges**: Displays colored difficulty and type badges (e.g., Red for Bug Squasher, Orange for Refactor).

## Routing & Integration

When a user taps on a `PracticeListItem`, the `PracticeController` orchestrates the following flow:

1. **Access Check**: Verifies if the user has an active Workspace access (`UserProgressService.hasWorkspaceAccess()`). If not, it shows a paywall dialog.
2. **Payload Fetch**: Shows a loading overlay and calls `PracticeRepository.fetchPracticePayload(snippet)`.
3. **Dynamic Routing**: Based on the snippet's `type`, the controller routes the user to the corresponding existing visualizer screen, passing the fetched JSON payload as an argument.

| Snippet Type   | Visualizer Route |
| :--- | :--- |
| `bug_squasher` | `Routes.bugSquasher` (`BugSquasherScreen`) |
| `refactor`     | `Routes.codeRefactor` (`CodeRefactorChallengeScreen`) |
| `guided`       | `Routes.guidedPractice` (`GuidedPracticeScreen`) |

## Future Extensibility: Projects

The architecture is designed to support multi-file incremental "Projects" in the future. The `PracticeCatalog` already contains a (currently empty) `projects` array. When implemented, projects will likely route to a more complex IDE/Workspace view rather than the single-file visualizer screens.
