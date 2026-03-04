# Web Dashboard implementation Plan (CodeLabs Institute)

This document outlines the implementation plan for the CodeLabs Institute Web Dashboard. This project serves as the administration portal where schools and teachers manage their students and curriculum.

## System Dependencies

1. **Firebase Project**: This web app must connect to the *same* Firebase project as the CodeLabs Mobile App to share Authentication, Firestore, and Remote Config data.
2. **Framework**: Flutter Web (or chosen web framework).

---

## 1. Firestore Database Schemas

The first step in the web project is to define and interact with the shared Cloud Firestore collections.

### Collection: `institutes`

Represents the top-level school/college.

- `id` (String): Unique identifier (e.g., 'inst_1234')
- `name` (String): School Name
- `logoUrl` (String): URL to the school logo
- `maxStudents` (int): Total licensed seats
- `maxTeachers` (int): Total licensed teachers
- `subscriptionStatus` (String): 'active', 'suspended', 'trial'

### Collection: `institute_groups`

Represents the specific classes (e.g., '10th Standard CS - Section A').

- `id` (String): Unique identifier
- `instituteId` (String): Reference to parent `institutes` document
- `name` (String): Group/Class name
- `joinCode` (String): Unique 6-character auto-generated string (e.g., 'A8F2K9')
- `allowedLanguages` (List<String>): e.g., `["python", "c"]`
- `assignedCourses` (List<String>): e.g., `["python_101"]`
- `allowFreePractice` (bool): Toggle for practice area freedom
- `assignments` (List<Map>): Array of low-cost assignment objects (`{id, title, targetId, type, dueDate}`)

### Collection: `institute_rosters`

Pre-approved list of students uploaded by the school to prevent unauthorized access.

- `id` (String): Auto-generated
- `instituteId` (String): Reference to parent `institutes` document
- `studentName` (String): Full student name
- `rollNumber` (String): School ID or Roll Number
- `groupId` (String): Assigned class ID

### Collection: `institute_memberships`

Active relationships between Users (Students/Teachers) and Groups.

- `id` (String): Auto-generated
- `userId` (String): Firebase Auth UID of the user
- `instituteId` (String): Reference to `institutes`
- `groupId` (String): Reference to `institute_groups`
- `role` (String): 'student', 'teacher', or 'admin'
- `status` (String): 'pending', 'approved', 'rejected'

---

## 2. Web UI Views to Build

### A. Authentication & Onboarding

- **Admin Login**: Secure login for Institute Admins using Firebase Auth.
- **Institute Setup (Wizard)**: Form to define the Institute's name, logo, and subscribe to a billing tier based on seat counts.

### B. Group (Class) Management

- **Groups List**: Display all classes operating under the institute.
- **Group Details**: View specific class statistics and the auto-generated 6-character `joinCode`.
- **Curriculum Builder**: Interface to modify the Group's `allowedLanguages`, `assignedCourses`, and toggle `allowFreePractice`.

### C. The "Low-Cost" Assignment Manager

- **Assignment Creator**: Form to append new tasks to the `institute_groups -> assignments` array. Must specify a `title` and a `targetId` mapping to existing CodeLabs courses/snippets.

### D. User Management & Rosters

- **Teacher Assignment**: Input field to add Teacher emails, generating an `institute_memberships` doc with `role: teacher`.
- **Roster Bulk Upload**: A drag-and-drop CSV parser that reads Student Names and Roll Numbers, batching writes to the `institute_rosters` collection.
- **Approvals Dashboard**: A queue showing all `institute_memberships` where `status == 'pending'`. Teachers click "Approve" to grant access to students who entered the mobile app's join code.

### E. Billing & Analytics (Phase 4)

- **Billing View**: Show total "Approved" seats vs. "Max Seats" and display installment payment statuses.

---

## 3. Recommended Development Phases (Web Project)

Since this is a separate project, approach development in this order:

**Phase 2.1: Firebase Connection & Admin Login**

- Initialize Firebase for Web.
- Create simple login to authenticate as an Institute Admin.

**Phase 2.2: The Core CRUD**

- Build the UI to create `institutes` and `institute_groups` in Firestore.
- Generate the random `joinCode` on Group creation.

**Phase 2.3: User Management**

- Build the Roster CSV uploader.
- Build the "Pending Approvals" list for teachers to click "Approve".

**Phase 2.4: Curriculum & Assignments**

- Add the forms to edit `assignedCourses`, `allowedLanguages`, and push new `assignments` to the Group's array.
