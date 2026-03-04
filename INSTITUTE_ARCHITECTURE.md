# CodeLabs Institute & Groups Architecture

This document outlines the architecture, data models, and user flows for the "Institute Mode" feature in CodeLabs, designed to support B2B/B2B2C distribution to schools and colleges.

## Overview

The Institute feature allows educational organizations to distribute CodeLabs to their students with curated content and isolated environments. To support real-world school hierarchies (e.g., "Stanford University" -> "CS101 Fall 2026"), the system uses a two-tier architecture: **Institutes** and **Groups**.

### Core Concepts

1. **Institute**: Represents the top-level organization (e.g., a high school or university). It defines global limits (max students, max teachers) and global branding.
2. **Institute Group**: Represents a specific class or section (e.g., "10th Standard CS - Section A"). It defines the specific courses and languages allowed for students in that class.
3. **Join Codes**: Unique 6-character alphanumeric codes (e.g., `CS10-26`) are attached to **Groups**, not Institutes. When a student enters a code, they are automatically linked to both the Group and its parent Institute.

> **Hardware Compatibility Note:** The CodeLabs mobile application (Android APK) can be installed directly on modern Interactive Whiteboards (Smart Boards). Most interactive panels used in schools today (e.g., BenQ, Promethean, ViewSonic, Newline) run directly on a customized Android OS. Teachers can install the CodeLabs APK, log in to their Admin/Teacher dashboard, and use the large touchscreen to demonstrate code execution and run interactive learning sessions for the whole class.

---

## Data Models

### 1. UserProfile (Hive Model Update)

The existing `UserProfile` model needs to be updated to track the user's current context.

```dart
class UserProfile extends HiveObject {
  // Existing fields...
  final String id;
  final String email;
  
  // New Fields
  final String? instituteId; // The ID of the institute they belong to
  final String? groupId;     // The ID of their specific class/section
  final bool isInInstituteMode; // UI toggle state (Personal vs Institute view)
  final String? instituteRole;  // 'student', 'teacher', or 'admin'
}
```

### 2. Institute Model (Firestore / Backend)

Represents the organization.

```json
{
  "id": "inst_12345",
  "name": "Stanford University",
  "logoUrl": "https://...",
  "maxStudents": 500,
  "maxTeachers": 20,
  "currentStudentCount": 145,
  "currentTeacherCount": 3,
  "createdAt": "timestamp"
}
```

### 3. InstituteGroup Model (Firestore / Backend)

Represents the specific class or section.

```json
{
  "id": "group_9876",
  "instituteId": "inst_12345",
  "name": "Intro to Python - Fall",
  "joinCode": "PY101-F",     // The code students enter in the app
  "teacherIds": ["user_abc"],  // Who can manage/approve students in this group
  "assignedCourses": ["python_101", "c_101"], // Curated curriculum
  "allowedLanguages": ["python", "c"],        // Curated practice & workspace
  "allowFreePractice": false,                 // If false, students only see assigned snippets
  "currentStudentCount": 42,
  "assignments": [
    {
      "id": "asgn_001",
      "title": "Solve Python Variables Bug Squasher",
      "type": "practice_challenge", // 'course_layer', 'practice_challenge', 'workspace_project'
      "targetId": "python_variables_bug_1",
      "dueDate": "timestamp"
    }
  ]
}
```

### 4. InstituteMembership Model (Firestore / Backend)

Strictly tracks the relationship and approval status.

```json
{
  "id": "mem_555",
  "userId": "user_xyz",
  "instituteId": "inst_12345",
  "groupId": "group_9876",
  "role": "student", // or 'teacher', 'admin'
  "status": "approved", // 'pending', 'approved', 'rejected'
  "requestedAt": "timestamp",
  "approvedAt": "timestamp"
}
```

---

## User Flows

### A. Institute Setup (Web Dashboard)

1. **Registration**: An institute creates an account on the CodeLabs website. An `Institute` profile is generated with a unique ID.
2. **Environment Setup (Free Trial)**: The institute gets a 7-day free trial to configure their environment, add teachers, create groups/classes, and assign teachers to those groups.
3. **Student Roster Upload**: The institute admin uploads an Excel/CSV file containing their official student roster (Name, Class, Roll Number/ID). This populates an `InstituteRoster` database collection. **Only these uploaded students can join the institute.**

### B. Student Onboarding Flow (Mobile App)

1. **Get Institute Code**: The student receives the unique `instituteId` from their school.
2. **Enter Code**: The student downloads CodeLabs, taps "Institute Login", and enters the `instituteId`. The app fetches the Institute's branding and name.
3. **Identity Selection (Restricted Access)**: Instead of arbitrary sign-ups, the app displays a form with dropdowns/search fields populated specifically from the pre-uploaded `InstituteRoster` for that institute.
   - The student selects their Class/Group.
   - The student searches for their Name / Roll Number.
4. **Validation and Pending Request**: The student confirms their identity. A `MembershipRequest` is generated and marked as `pending`. This ensures no external users can even *request* access.
5. **Teacher Approval**: The teacher assigned to that group logs into the web dashboard and approves the pending requests for their class.

### C. Teacher Onboarding & Experience Flow

1. **Admin Assignment**: The Institute Admin assigns a teacher to a specific `InstituteGroup` via the Web Dashboard using the teacher's email address. This pre-creates an `InstituteMembership` with `role: 'teacher'`.
2. **Teacher Mobile Login**: When the teacher logs into the CodeLabs Mobile App using that same email, the app detects their `teacher` membership upon startup.
3. **Auto-Join**: Teachers DO NOT use "Join Codes". They are automatically placed into "Institute Mode".
4. **Teacher App Profile**:
    - The `InstituteDashboardView` looks similar to the students' view so the teacher can accurately project and demonstrate the same UI on the Smart Board.
    - However, an extra **"Classroom Management"** button is visible to teachers. This allows them to quickly view pending student approvals or jump to the Web Dashboard.
5. **Teacher Web Dashboard**: Teachers log into the Web Portal to:
    - Approve/reject student join requests.
    - View student progression (XP, courses completed, lines of code).
    - Manage group settings.

### C. Billing & Subscription Strategy (B2B SaaS)

CodeLabs uses an "Active Seats" billing model with flexible installments.

1. **Pricing Parameter**: For example, ₹1,000 per student, per year.
2. **Billing Basis**: The institute is billed *only* for the number of students who have actually been **given access (approved)** by teachers, *not* the total number of students uploaded in the initial Excel file. (e.g., 200 approved students = ₹200,000).
3. **Installment Plans**: To ease the financial burden on schools, the subscription can be paid in installments:
   - **Quarterly**: (Max 4 installments). e.g., ₹50,000 every 3 months.
   - **Biannual**: (Max 2 installments). e.g., ₹100,000 every 6 months.
   - **Annual**: Paid upfront.
4. **Subscription Checking**: The app periodically checks the `Institute` subscription status. If an installment is missed, the institute mode is suspended for all users under that tenant until payment is resolved.

*Note: For Phase 1 (MVP) development, entering a valid mock code will instantly set the membership to `approved` so the UI can be built and tested without an Admin Dashboard.*

### D. Institute Mode UI Experience

When `isInInstituteMode == true`:

- **Learn Tab**: The global course catalog is replaced by the `InstituteDashboardView`. This view displays the Institute/Group branding and *only* lists the courses defined in `InstituteGroup.assignedCourses`.
- **Assignments Section**: The dashboard will display active tasks from the `InstituteGroup.assignments` array.
- **Practice & Workspace**: The standard language selection lists are filtered. Only the languages defined in `InstituteGroup.allowedLanguages` are available for selection.
- **Profile Tab**: A toggle switch appears allowing the student to switch back to "Personal Mode" so they can still access the global CodeVarsity features on their own time.

### E. Low-Cost Assignment Strategy

To keep database costs near negligible, we will **NOT** create a heavy 'Assignments/Submissions' system where each student upload generates new Firestore documents.

Instead, an "Assignment" in CodeLabs is a direct reference (`targetId`) to existing curriculum (e.g., a specific Course Layer, a Bug Squasher challenge, or a Workspace Project template).

- Teachers create assignments on the Web Portal, adding a small object to the `InstituteGroup.assignments` array.
- The mobile app renders these links.
- Completion is calculated *locally* or by reading the student's *existing* `UserStats`/`UserProgress` documents string which CodeLabs already synchronizes. We simply ask: "Has the student completed `targetId`?". No extra database writes required.

### F. Practice Area Control (Teacher Directed)

For the Practice section, CodeLabs employs a hybrid "Teacher's Choice" model:

- **Free Practice Mode** (`allowFreePractice: true`): The Institute Group limits *which languages* can be practiced (via `allowedLanguages`), but students are free to attempt any snippet within those languages at any time.
- **Guided Practice Mode** (`allowFreePractice: false`): The general Practice catalog is heavily restricted. Students can **only** access snippets that the teacher has explicitly added to the `assignments` array. This keeps students focused directly on the day's lesson without being distracted by advanced concepts.
