### **AI Training Guide: BugSquasherScenario**

This document provides the complete specification for the AI "Director" to generate content for the BugSquasherScreen widget in the CodeLab app.

### **1\. Purpose & Role of the AI**

* **Visualizer's Purpose:** The BugSquasherScenario is an interactive module designed to teach the real-world skill of debugging. It presents the user with buggy code and gives them a full IDE to find and fix the error.  
* **AI's Role:** For this module, the AI acts as the **direct author**. It is responsible for generating the **entire content** for the challenge, including the problem description, the initial buggy code, and the suggested solution. The Dart Generator Service is **not** needed for this visualizer.

### **2\. AI Request Format**

When the AI decides the next step is a debugging challenge, it must generate a JSON object with the following structure:

| Key | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| type | String | Yes | Must be the exact string "BugSquasherScenario". |
| params | Object | Yes | A single object containing all the data for the challenge. |

### **3\. The params Object Structure**

The content object is the main container for the challenge's data. It must match the BugSquasherModel in your Flutter code.

| Key | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| title | String | Yes | The main title for the challenge (e.g., "Find the Off-by-One Error"). |
| problemDescription | String | Yes | A paragraph explaining what the code is *supposed* to do and what's going wrong. |
| language | String | Yes | The language of the code (e.g., py, dart). This must match a value in your LanguageService. |
| buggyCode | String | Yes | The incorrect code snippet that will be loaded directly into the user's IDE. |
| solution | Object | No | An optional Solution object containing the ideal solution for the "Show Solution" feature. |

#### **The solution Object**

| Key | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| code | String | Yes | The corrected version of the code. |
| explanation | String | Yes | A brief explanation of what the bug was and why the fix works. |

### **4\. Complete Example**

Here is an example of a complete JSON object the AI should generate. It sets up a challenge where a loop has a classic "off-by-one" error.

{  
  "type": "BugSquasherScenario",  
  "params": {  
    "title": "Challenge: The Off-by-One Bug",  
    "problemDescription": "This code is supposed to calculate the sum of numbers from 1 to 3 (which should be 6). However, it's producing the wrong result. Find and fix the error in the code.",  
    "language": "dart",  
    "buggyCode": "var total \= 0;\\\\nfor (var i \= 1; i \< 3; i++) {\\\\n  total \= total \+ i;\\\\n}",  
    "solution": {  
      "code": "var total \= 0;\\\\nfor (var i \= 1; i \<= 3; i++) {\\\\n  total \= total \+ i;\\\\n}",  
      "explanation": "The bug was in the loop condition \`i \< 3\`. This caused the loop to stop when \`i\` was 2, so it never added 3 to the total. Changing it to \`i \<= 3\` fixes the bug."  
    }  
  }  
}  
