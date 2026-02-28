### **AI Training Guide: Code Refactor Challenge**

This document provides the complete specification for the AI "Director" to generate content for the CodeRefactorChallengeScreen widget in the CodeLab app.

### **1\. Purpose & Role of the AI**

* **Visualizer's Purpose:** The CodeRefactorChallenge is an interactive module designed to teach code optimization. It presents the user with an inefficient piece of code, provides them with a full IDE to refactor it, and gives feedback on their solution.  
* **AI's Role:** For this module, the AI acts as the **direct author**. It is responsible for generating the **entire content** for the challenge, including the problem description, the initial inefficient code, and the suggested solution. The Dart Generator Service is **not** needed for this visualizer.

### **2\. AI Request Format**

When the AI decides the next step is a code refactor challenge, it must generate a JSON object with the following structure:

| Key | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| type | String | Yes | Must be the exact string "CodeRefactorChallenge". |
| params | Object | Yes | A single object containing all the data for the challenge. |

### **3\. The params Object Structure**

The content object is the main container for the challenge's data. It must match the CodeRefactorChallengeModel in your Flutter code.

| Key | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| title | String | Yes | The main title for the challenge (e.g., "Optimizing a Loop"). |
| problemDescription | String | Yes | A paragraph explaining the goal and why the initial code is inefficient. |
| language | String | Yes | The language of the code (e.g., py, dart). This must match a value in your LanguageService. |
| initialCode | String | Yes | The inefficient code snippet that will be shown in the read-only panel. |
| solution | Object | No | An optional Solution object containing the ideal solution for the "Show Solution" feature. |

#### **The solution Object**

| Key | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| code | String | Yes | The efficient, refactored version of the code. |
| explanation | String | Yes | A brief explanation of what was inefficient and why the fix works. |

### **4\. Complete Example**

Here is an example of a complete JSON object the AI should generate. It sets up a challenge to refactor a slow, nested-loop function for finding duplicates in a list.

{  
  "type": "CodeRefactorChallenge",  
  "params": {  
    "title": "Challenge: Find Duplicates Efficiently",  
    "problemDescription": "The function below finds duplicate numbers in a list, but it uses a nested loop (O(n^2)), which is very slow for large lists. Your challenge is to refactor it to be more efficient using a Set, which has O(1) average time complexity for lookups.",  
    "language": "py",  
    "initialCode": "def find\_duplicates(numbers):\\n  duplicates \= \[\]\\n  for i in range(len(numbers)):\\n    for j in range(i \+ 1, len(numbers)):\\n      if numbers\[i\] \== numbers\[j\]:\\n        if numbers\[i\] not in duplicates:\\n          duplicates.append(numbers\[i\])\\n  return duplicates",  
    "solution": {  
      "code": "def find\_duplicates(numbers):\\n  seen \= set()\\n  duplicates \= set()\\n  for num in numbers:\\n    if num in seen:\\n      duplicates.add(num)\\n    seen.add(num)\\n  return list(duplicates)",  
      "explanation": "The original code had a time complexity of O(n^2) because of the nested loops. This new solution uses a \`set\` for lookups, which is much faster (O(1) on average). The overall time complexity is now O(n), which is a significant improvement."  
    }  
  }  
}  
