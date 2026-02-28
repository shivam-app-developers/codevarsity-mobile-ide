# schemas.py

"""
Strict JSON schemas for CodeLab Visualizers.
Source of Truth: visualizer_instructions.md
"""

VISUALIZER_SCHEMAS = {
    "InteractiveTheoryReader": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "InteractiveTheoryReader"},
            "visualizerParams": {
                "type": "object",
                "required": ["content"],
                "additionalProperties": False,
                "properties": {
                    "content": {
                        "type": "array",
                        "description": "Array of content blocks",
                        "items": {
                            "oneOf": [
                                {
                                    "type": "object",
                                    "required": ["type", "text"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "type": {"const": "heading"},
                                        "id": {"type": "string"},
                                        "level": {
                                            "type": "integer",
                                            "minimum": 1,
                                            "maximum": 6,
                                            "default": 1,
                                        },
                                        "text": {"type": "string"},
                                    },
                                },
                                {
                                    "type": "object",
                                    "required": ["type", "text"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "type": {"const": "paragraph"},
                                        "id": {"type": "string"},
                                        "text": {"type": "string"},
                                    },
                                },
                                {
                                    "type": "object",
                                    "required": ["type", "language", "code"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "type": {"const": "code"},
                                        "language": {"type": "string"},
                                        "code": {"type": "string"},
                                    },
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "type",
                                        "id",
                                        "questionText",
                                        "options",
                                    ],
                                    "additionalProperties": False,
                                    "properties": {
                                        "type": {"const": "multiple_choice_question"},
                                        "id": {"type": "string"},
                                        "questionText": {"type": "string"},
                                        "options": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": ["text"],
                                                "additionalProperties": False,
                                                "properties": {
                                                    "text": {"type": "string"},
                                                    "isCorrect": {"type": "boolean"},
                                                    "feedback": {"type": "string"},
                                                    "nextBlockId": {"type": "string"},
                                                },
                                            },
                                        },
                                        "correctFeedback": {"type": "string"},
                                        "incorrectFeedback": {"type": "string"},
                                    },
                                },
                                {
                                    "type": "object",
                                    "required": ["type", "id", "contentBlocks"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "type": {"const": "conditional_branch"},
                                        "id": {"type": "string"},
                                        "contentBlocks": {"type": "array"},
                                    },
                                },
                                {
                                    "type": "object",
                                    "required": ["type", "src"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "type": {"const": "image"},
                                        "src": {"type": "string"},
                                        "alt": {"type": "string"},
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    },
    "OsMemoryManagerView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "OsMemoryManagerView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "ramSize", "apps", "tasks"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "ramSize": {
                        "type": "integer",
                        "description": "Total RAM size in units",
                    },
                    "apps": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["id", "displayName", "memoryCost"],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "displayName": {"type": "string"},
                                "iconName": {
                                    "type": "string",
                                    "description": "Icon identifier",
                                },
                                "memoryCost": {"type": "integer"},
                            },
                        },
                    },
                    "tasks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["displayName", "timeline"],
                            "additionalProperties": False,
                            "properties": {
                                "displayName": {"type": "string"},
                                "timeline": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": ["narration", "actions"],
                                        "additionalProperties": False,
                                        "properties": {
                                            "narration": {"type": "string"},
                                            "actions": {"type": "array"},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "NetworkJourneyView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "NetworkJourneyView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "nodes", "tasks"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "nodes": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["id", "displayName", "type", "position"],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "displayName": {"type": "string"},
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "PHONE",
                                        "ROUTER",
                                        "DNS_SERVER",
                                        "WEBSITE_SERVER",
                                    ],
                                },
                                "position": {
                                    "type": "array",
                                    "items": {"type": "number"},
                                    "description": "[x, y] coordinates",
                                },
                                "ipAddress": {"type": "string"},
                            },
                        },
                    },
                    "tasks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["displayName", "initialPacket", "timeline"],
                            "additionalProperties": False,
                            "properties": {
                                "displayName": {"type": "string"},
                                "initialPacket": {
                                    "type": "object",
                                    "required": ["atNodeId"],
                                    "properties": {
                                        "atNodeId": {"type": "string"},
                                        "label": {"type": "string"},
                                    },
                                },
                                "timeline": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": ["narration", "actions"],
                                        "properties": {
                                            "narration": {"type": "string"},
                                            "actions": {"type": "array"},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "GuidedPractice": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "GuidedPractice"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "description", "language", "ghostCode"],
                "additionalProperties": False,
                "properties": {
                    "mode": {
                        "type": "string",
                        "enum": ["snippet", "single_file", "project"],
                        "default": "single_file",
                        "description": "snippet=ephemeral, single_file=Day1Product, project=Capstone",
                    },
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "language": {"type": "string"},
                    "ghostCode": {
                        "type": "string",
                        "description": "Incremental code to be typed by user",
                    },
                    "targetFile": {
                        "type": "string",
                        "description": "For single_file mode. Defaults to main.{language}",
                    },
                    "files": {
                        "type": "object",
                        "description": "Map of filenames to content for project mode",
                        "additionalProperties": {"type": "string"},
                    },
                    "activeFile": {
                        "type": "string",
                        "description": "The file to focus on initially",
                    },
                    "cursor": {
                        "type": "object",
                        "description": "Initial cursor position for typing",
                        "additionalProperties": False,
                        "properties": {
                            "line": {
                                "type": "integer",
                                "minimum": 1,
                                "description": "1-based line number",
                            },
                            "column": {
                                "type": "integer",
                                "minimum": 1,
                                "description": "1-based column number",
                            },
                        },
                    },
                    "finalCode": {
                        "type": "string",
                        "description": "Full expected content for Show Solution",
                    },
                    "validation": {
                        "type": "object",
                        "description": "Rules for checking user code",
                        "additionalProperties": False,
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": ["exact", "regex", "run_output"],
                            },
                            "pattern": {
                                "type": "string",
                                "description": "Regex pattern or expected output",
                            },
                        },
                    },
                },
            },
        },
    },
    "HistoryTimelineView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "HistoryTimelineView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "events"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "events": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["id", "date", "title", "description"],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "date": {"type": "string"},
                                "title": {"type": "string"},
                                "description": {"type": "string"},
                                "type": {
                                    "type": "string",
                                    "enum": ["milestone", "release", "default"],
                                    "description": "Optional event type for visual styling",
                                },
                                "branch": {
                                    "type": "object",
                                    "description": "Optional branch for exploring related sub-events",
                                    "required": ["title", "events"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "title": {"type": "string"},
                                        "events": {
                                            "type": "array",
                                            "description": "Recursive array of Event objects",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "CompilationExplorerView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "CompilationExplorerView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "layers", "tasks"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "layers": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["id", "title"],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "title": {"type": "string"},
                                "subtitle": {"type": "string"},
                                "color": {
                                    "type": "string",
                                    "description": "Hex color like #FF5733",
                                },
                            },
                        },
                    },
                    "tasks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["displayName", "packet", "timeline"],
                            "additionalProperties": False,
                            "properties": {
                                "displayName": {"type": "string"},
                                "packet": {
                                    "type": "object",
                                    "required": ["label"],
                                    "properties": {
                                        "label": {"type": "string"},
                                    },
                                },
                                "timeline": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": ["narration", "actions"],
                                        "properties": {
                                            "narration": {"type": "string"},
                                            "actions": {"type": "array"},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "CodeComparisonView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "CodeComparisonView"},
            "visualizerParams": {
                "type": "object",
                "required": ["items"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "items": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "required": ["title", "language", "code"],
                            "additionalProperties": False,
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "description": "Title of the code panel",
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Optional description",
                                },
                                "language": {
                                    "type": "string",
                                    "description": "Programming language identifier",
                                },
                                "code": {
                                    "type": "string",
                                    "description": "The code to display",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "FunctionImplementationView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "FunctionImplementationView"},
            "visualizerParams": {
                "type": "object",
                "required": ["functions"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "functions": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "required": ["displayName", "highLevel", "lowLevel"],
                            "additionalProperties": False,
                            "properties": {
                                "displayName": {
                                    "type": "string",
                                    "description": "Name shown in dropdown",
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Optional description",
                                },
                                "highLevel": {
                                    "type": "object",
                                    "required": ["title", "language", "code"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "title": {"type": "string"},
                                        "language": {"type": "string"},
                                        "code": {"type": "string"},
                                    },
                                },
                                "lowLevel": {
                                    "type": "object",
                                    "required": ["title", "language", "code"],
                                    "additionalProperties": False,
                                    "properties": {
                                        "title": {"type": "string"},
                                        "language": {"type": "string"},
                                        "code": {"type": "string"},
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "ChartView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "ChartView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "chartType", "data"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "chartType": {"type": "string", "enum": ["bar", "pie", "line"]},
                    "data": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["label", "value"],
                            "additionalProperties": False,
                            "properties": {
                                "label": {"type": "string"},
                                "value": {"type": "number"},
                                "color": {
                                    "type": "string",
                                    "description": "Hex color like #FF5733",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "FlowchartVisualizer": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "FlowchartVisualizer"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "startNodeId", "nodes", "timeline"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "startNodeId": {"type": "string"},
                    "nodes": {
                        "type": "object",
                        "description": "Map of nodeId to NodeModel",
                        "additionalProperties": {
                            "type": "object",
                            "required": ["type", "label", "x", "y"],
                            "additionalProperties": False,
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["start", "end", "process", "decision"],
                                },
                                "label": {"type": "string"},
                                "x": {
                                    "type": "number",
                                    "description": "X position 0.0-1.0",
                                },
                                "y": {
                                    "type": "number",
                                    "description": "Y position 0.0-1.0",
                                },
                                "nextId": {
                                    "type": "string",
                                    "description": "Next node for process",
                                },
                                "trueNextId": {
                                    "type": "string",
                                    "description": "True branch for decision",
                                },
                                "falseNextId": {
                                    "type": "string",
                                    "description": "False branch for decision",
                                },
                            },
                        },
                    },
                    "timeline": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["narration", "action"],
                            "additionalProperties": False,
                            "properties": {
                                "narration": {"type": "string"},
                                "action": {
                                    "type": "object",
                                    "required": ["type"],
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "enum": ["move", "highlight", "traverse"],
                                        },
                                        "fromNodeId": {"type": "string"},
                                        "toNodeId": {"type": "string"},
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "TreeView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "TreeView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "rootNode"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "rootNode": {
                        "type": "object",
                        "required": ["label"],
                        "additionalProperties": False,
                        "description": "Recursive node structure",
                        "properties": {
                            "label": {"type": "string"},
                            "children": {
                                "type": "array",
                                "description": "Recursive array of NodeModel objects",
                            },
                        },
                    },
                },
            },
        },
    },
    "UITreeVisualizer": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "UITreeVisualizer"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "initialTree", "timeline"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "initialTree": {
                        "type": "object",
                        "description": "Recursive NodeModel tree",
                        "required": ["id", "label"],
                        "properties": {
                            "id": {"type": "string"},
                            "label": {"type": "string"},
                            "properties": {
                                "type": "object",
                                "additionalProperties": {"type": "string"},
                            },
                            "children": {
                                "type": "array",
                                "description": "Recursive NodeModel array",
                            },
                        },
                    },
                    "timeline": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["narration", "actions"],
                            "additionalProperties": False,
                            "properties": {
                                "narration": {"type": "string"},
                                "actions": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": ["type", "targetId"],
                                        "properties": {
                                            "type": {
                                                "type": "string",
                                                "enum": [
                                                    "add_node",
                                                    "remove_node",
                                                    "update_property",
                                                    "highlight_node",
                                                    "rebuild_node",
                                                ],
                                            },
                                            "targetId": {"type": "string"},
                                            "parentId": {"type": "string"},
                                            "newNode": {"type": "object"},
                                            "propertyKey": {"type": "string"},
                                            "newValue": {"type": "string"},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "FunctionSignatureBuilder": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "FunctionSignatureBuilder"},
            "visualizerParams": {
                "type": "object",
                "required": [
                    "title",
                    "description",
                    "language",
                    "correctSignature",
                    "dropTargets",
                    "codeBlocks",
                ],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "language": {"type": "string"},
                    "correctSignature": {"type": "string"},
                    "dropTargets": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["id", "label", "correctBlockId"],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "label": {
                                    "type": "string",
                                    "description": "Placeholder text shown",
                                },
                                "correctBlockId": {
                                    "type": "string",
                                    "description": "ID of correct block",
                                },
                            },
                        },
                    },
                    "codeBlocks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["id", "text"],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "text": {
                                    "type": "string",
                                    "description": "Code text to display",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "UmlClassDiagramBuilder": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "UmlClassDiagramBuilder"},
            "visualizerParams": {
                "type": "object",
                "required": [
                    "title",
                    "description",
                    "language",
                    "classes",
                    "relationships",
                ],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "language": {"type": "string"},
                    "classes": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "id",
                                "name",
                                "x",
                                "y",
                                "attributes",
                                "methods",
                            ],
                            "additionalProperties": False,
                            "properties": {
                                "id": {"type": "string"},
                                "name": {"type": "string"},
                                "x": {
                                    "type": "number",
                                    "description": "Relative X position 0.0-1.0",
                                },
                                "y": {
                                    "type": "number",
                                    "description": "Relative Y position 0.0-1.0",
                                },
                                "attributes": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": ["access", "name", "type"],
                                        "additionalProperties": False,
                                        "properties": {
                                            "access": {
                                                "type": "string",
                                                "enum": [
                                                    "public",
                                                    "private",
                                                    "protected",
                                                ],
                                            },
                                            "name": {"type": "string"},
                                            "type": {"type": "string"},
                                        },
                                    },
                                },
                                "methods": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": ["access", "name", "type"],
                                        "additionalProperties": False,
                                        "properties": {
                                            "access": {
                                                "type": "string",
                                                "enum": [
                                                    "public",
                                                    "private",
                                                    "protected",
                                                ],
                                            },
                                            "name": {"type": "string"},
                                            "type": {
                                                "type": "string",
                                                "description": "Return type",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "relationships": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["from", "to", "type"],
                            "additionalProperties": False,
                            "properties": {
                                "from": {
                                    "type": "string",
                                    "description": "Source class ID",
                                },
                                "to": {
                                    "type": "string",
                                    "description": "Target class ID",
                                },
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "inheritance",
                                        "composition",
                                        "aggregation",
                                        "association",
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "CodeScramble": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "CodeScramble"},
            "visualizerParams": {
                "type": "object",
                "required": [
                    "title",
                    "description",
                    "language",
                    "scrambledBlocks",
                    "correctOrder",
                ],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "language": {"type": "string"},
                    "scrambledBlocks": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Array of code lines in scrambled order",
                    },
                    "correctOrder": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Array of code lines in correct order",
                    },
                },
            },
        },
    },
    "CodeRefactorChallenge": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "CodeRefactorChallenge"},
            "visualizerParams": {
                "type": "object",
                "required": [
                    "title",
                    "problemDescription",
                    "language",
                    "initialCode",
                    "solution",
                ],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "problemDescription": {"type": "string"},
                    "language": {"type": "string"},
                    "initialCode": {"type": "string"},
                    "solution": {
                        "type": "object",
                        "required": ["code", "explanation"],
                        "additionalProperties": False,
                        "properties": {
                            "code": {
                                "type": "string",
                                "description": "Correct refactored solution code",
                            },
                            "explanation": {
                                "type": "string",
                                "description": "Why this refactoring is better",
                            },
                        },
                    },
                },
            },
        },
    },
    "BugSquasherScenario": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "properties": {
            "visualizerType": {"const": "BugSquasherScenario"},
            "visualizerParams": {
                "type": "object",
                "required": [
                    "title",
                    "problemDescription",
                    "language",
                    "buggyCode",
                    "solution",
                ],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "problemDescription": {"type": "string"},
                    "language": {"type": "string"},
                    "buggyCode": {"type": "string"},
                    "solution": {
                        "type": "object",
                        "required": ["code", "explanation"],
                        "additionalProperties": False,
                        "properties": {
                            "code": {
                                "type": "string",
                                "description": "Correct debugged solution code",
                            },
                            "explanation": {
                                "type": "string",
                                "description": "Why this fix works",
                            },
                        },
                    },
                },
            },
        },
    },
    "ExecutionTraceView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates elements and timeline",
        "properties": {
            "visualizerType": {"const": "ExecutionTraceView"},
            "visualizerParams": {
                "type": "object",
                "required": ["language", "codeToTrace"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "language": {"type": "string"},
                    "codeToTrace": {
                        "type": "string",
                        "description": "Code to trace execution",
                    },
                },
            },
        },
    },
    "AlgorithmicSandbox": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "AlgorithmicSandbox"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "dataType", "algorithm", "dataSet"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "dataType": {"type": "string", "enum": ["array"]},
                    "algorithm": {
                        "type": "string",
                        "enum": [
                            "bubbleSort",
                            "selectionSort",
                            "insertionSort",
                            "linearSearch",
                            "binarySearch",
                        ],
                    },
                    "dataSet": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "description": "Array of integers for sorting/searching",
                    },
                    "targetValue": {
                        "type": "integer",
                        "description": "Target for search algorithms",
                    },
                },
            },
        },
    },
    "GridVisualizer": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "GridVisualizer"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "animationType"],
                "additionalProperties": True,
                "description": "Required fields vary by animationType",
                "properties": {
                    "title": {"type": "string"},
                    "animationType": {
                        "type": "string",
                        "enum": [
                            "pathfinding",
                            "convolution",
                            "matrix_multiplication",
                            "game_of_life",
                        ],
                    },
                    "mainGrid": {
                        "type": "object",
                        "required": ["rows", "cols", "data"],
                        "additionalProperties": False,
                        "properties": {
                            "rows": {"type": "integer"},
                            "cols": {"type": "integer"},
                            "data": {
                                "type": "array",
                                "items": {
                                    "type": "array",
                                    "items": {"type": "integer"},
                                },
                                "description": "2D array of integers",
                            },
                        },
                    },
                    "kernel": {
                        "type": "object",
                        "description": "For convolution",
                        "required": ["rows", "cols", "data"],
                        "additionalProperties": False,
                        "properties": {
                            "rows": {"type": "integer"},
                            "cols": {"type": "integer"},
                            "data": {
                                "type": "array",
                                "items": {"type": "array", "items": {"type": "number"}},
                            },
                        },
                    },
                    "start": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "minItems": 2,
                        "maxItems": 2,
                        "description": "[row, col] for pathfinding",
                    },
                    "end": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "minItems": 2,
                        "maxItems": 2,
                        "description": "[row, col] for pathfinding",
                    },
                    "matrixA": {
                        "type": "object",
                        "description": "For matrix_multiplication",
                        "required": ["rows", "cols", "data"],
                        "additionalProperties": False,
                        "properties": {
                            "rows": {"type": "integer"},
                            "cols": {"type": "integer"},
                            "data": {
                                "type": "array",
                                "items": {"type": "array", "items": {"type": "number"}},
                            },
                        },
                    },
                    "matrixB": {
                        "type": "object",
                        "description": "For matrix_multiplication",
                        "required": ["rows", "cols", "data"],
                        "additionalProperties": False,
                        "properties": {
                            "rows": {"type": "integer"},
                            "cols": {"type": "integer"},
                            "data": {
                                "type": "array",
                                "items": {"type": "array", "items": {"type": "number"}},
                            },
                        },
                    },
                    "generations": {
                        "type": "integer",
                        "description": "For game_of_life",
                    },
                },
            },
        },
    },
    "StateMachineView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "StateMachineView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "animationType", "elements", "inputString"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "animationType": {
                        "type": "string",
                        "enum": ["DFA", "NFA", "PushdownAutomaton"],
                    },
                    "elements": {
                        "type": "object",
                        "description": "State machine nodes and edges",
                    },
                    "inputString": {
                        "type": "string",
                        "description": "String to process through the automaton",
                    },
                },
            },
        },
    },
    "GraphVisualizer": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "GraphVisualizer"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "animationType", "elements", "startNodeId"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "animationType": {
                        "type": "string",
                        "enum": ["bfs", "dfs", "dijkstra", "mst_prim"],
                    },
                    "elements": {
                        "type": "object",
                        "description": "Graph nodes and edges",
                    },
                    "startNodeId": {"type": "string"},
                    "endNodeId": {"type": "string", "description": "For dijkstra"},
                },
            },
        },
    },
    "ConcurrencyView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "ConcurrencyView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "animationType", "elements", "schedule"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "animationType": {
                        "type": "string",
                        "enum": [
                            "locking",
                            "race_condition",
                            "deadlock",
                            "producer_consumer",
                        ],
                    },
                    "elements": {
                        "type": "object",
                        "description": "Threads/resources to visualize",
                    },
                    "schedule": {
                        "type": "array",
                        "description": "Execution schedule steps",
                    },
                },
            },
        },
    },
    "SqlVisualizer": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "SqlVisualizer"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "query", "tables"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "query": {
                        "type": "string",
                        "description": "SQL query to visualize",
                    },
                    "tables": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["name", "headers", "rows"],
                            "additionalProperties": False,
                            "properties": {
                                "name": {"type": "string"},
                                "headers": {
                                    "type": "array",
                                    "items": {"type": "string"},
                                },
                                "rows": {
                                    "type": "array",
                                    "items": {"type": "array"},
                                    "description": "2D array of cell values",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "NumberBaseConverter": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates explanationTimeline",
        "properties": {
            "visualizerType": {"const": "NumberBaseConverter"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "initialDecimalValue", "bases"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "initialDecimalValue": {"type": "integer"},
                    "bases": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": ["binary", "octal", "decimal", "hexadecimal"],
                        },
                        "description": "Number bases to show conversions for",
                    },
                },
            },
        },
    },
    "RegexVisualizer": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates explanation",
        "properties": {
            "visualizerType": {"const": "RegexVisualizer"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "pattern", "initialTestString"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "pattern": {
                        "type": "string",
                        "description": "Regex pattern to explain",
                    },
                    "initialTestString": {
                        "type": "string",
                        "description": "String to test against",
                    },
                },
            },
        },
    },
    "ConceptDecoderView": {
        "type": "object",
        "required": ["visualizerType", "visualizerParams"],
        "additionalProperties": False,
        "description": "AI provides input; Dart service generates timeline",
        "properties": {
            "visualizerType": {"const": "ConceptDecoderView"},
            "visualizerParams": {
                "type": "object",
                "required": ["title", "animationType", "layout", "elements"],
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "animationType": {
                        "type": "string",
                        "enum": ["stack_vs_heap_value", "stack_vs_heap_reference"],
                    },
                    "layout": {
                        "type": "object",
                        "description": "Panel layout configuration",
                    },
                    "elements": {
                        "type": "object",
                        "description": "Memory elements to visualize",
                    },
                },
            },
        },
    },
}
