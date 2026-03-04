import { db } from './firebase';
import { collection, doc, setDoc, getDocs, getDoc, query, where, Timestamp } from 'firebase/firestore';

export interface Institute {
    id: string;
    name: string;
    type?: string;
    description?: string;
    website?: string;
    phone?: string;
    logoUrl?: string;
    primaryColor?: string;
    maxTeachers: number;
    subscriptionStatus: string;
    createdAt: any;
}

export interface InstituteMembership {
    id: string;
    userId: string;
    instituteId: string;
    groupId?: string;
    role: 'student' | 'teacher' | 'admin';
    status: 'pending' | 'approved' | 'rejected';
}

export interface InstituteGroup {
    id: string;
    instituteId: string;
    name: string;
    joinCode: string;
    allowedLanguages: string[];
    assignedCourses: string[];
    allowFreePractice: boolean;
    assignments: any[];
}

export interface InstituteRoster {
    id: string;
    instituteId: string;
    groupId: string;
    studentName: string;
    rollNumber: string;
}

// --- CREATOR HUB SCHEMAS ---

export interface CreatorLesson {
    id: string; // generated client-side or random string
    youtubeVideoId: string;
    title: string;
    description: string;
    starterTemplateId?: string; // ID of a PracticeSnippet or PracticeProject
    order: number; // For ordering in the playlist
}

export interface CreatorHub {
    id: string; // usually same as userId
    vanityCode: string; // e.g., @Fireship
    displayName: string;
    youtubeChannelId?: string;
    description?: string;
    logoUrl?: string;
    lessons: CreatorLesson[]; // Embedded array for cost-efficiency
}

// Create or Update the Institute Profile (1:1 with User)
export async function saveInstituteProfile(userId: string, data: Partial<Institute>): Promise<Institute> {
    const instituteRef = doc(db, 'institutes', userId); // The doc ID IS the user ID

    // We fetch to see if it exists to preserve creation date
    const snap = await getDoc(instituteRef);
    let createdAt = Timestamp.now();
    let subStatus = 'trial';

    if (snap.exists()) {
        const existing = snap.data() as Institute;
        createdAt = existing.createdAt || createdAt;
        subStatus = existing.subscriptionStatus || subStatus;
    }

    const institute: Institute = {
        id: userId,
        name: data.name || 'New Institute Profile',
        type: data.type || 'Other',
        description: data.description || '',
        website: data.website || '',
        phone: data.phone || '',
        logoUrl: data.logoUrl || '',
        primaryColor: data.primaryColor || '#2563ea',
        maxTeachers: 10, // Hardcoded limit for everyone
        subscriptionStatus: subStatus,
        createdAt: createdAt,
    };
    try {
        await setDoc(instituteRef, institute, { merge: true });
        return institute;
    } catch (e) {
        console.error("Firebase setDoc failed:", e);
        throw e;
    }
}

// Fetch the user's single Institute Profile
export async function getInstituteProfile(userId: string): Promise<Institute | null> {
    const iDoc = await getDoc(doc(db, 'institutes', userId));
    if (iDoc.exists()) {
        return iDoc.data() as Institute;
    }
    return null;
}

// Generate a random 6 character code
function generateJoinCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // removed confusing I, O, 0, 1
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function createInstituteGroup(data: Partial<InstituteGroup>): Promise<InstituteGroup> {
    const groupRef = doc(collection(db, 'institute_groups'));
    const group: InstituteGroup = {
        id: groupRef.id,
        instituteId: data.instituteId!,
        name: data.name || 'New Class',
        joinCode: generateJoinCode(),
        allowedLanguages: data.allowedLanguages || [],
        assignedCourses: data.assignedCourses || [],
        allowFreePractice: data.allowFreePractice ?? false,
        assignments: [],
    };

    await setDoc(groupRef, group);
    return group;
}

export async function getInstituteGroups(instituteId: string): Promise<InstituteGroup[]> {
    const q = query(collection(db, 'institute_groups'), where('instituteId', '==', instituteId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as InstituteGroup);
}

// Roster Uploading
export async function uploadRoster(instituteId: string, groupId: string, students: { name: string, rollNumber: string }[]) {
    // In a real app with large CSVs, you'd use a batched write (writeBatch(db)).
    // For MVP, we'll do simple setDocs.
    const promises = students.map(student => {
        const rosterRef = doc(collection(db, 'institute_rosters'));
        return setDoc(rosterRef, {
            id: rosterRef.id,
            instituteId,
            groupId,
            studentName: student.name,
            rollNumber: student.rollNumber
        });
    });
    await Promise.all(promises);
}

// Fetch Pending Memberships for an Institute
export async function getPendingMemberships(instituteId: string): Promise<InstituteMembership[]> {
    const q = query(
        collection(db, 'institute_memberships'),
        where('instituteId', '==', instituteId),
        where('status', '==', 'pending')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as InstituteMembership);
}

// Approve a Membership
export async function approveMembership(membershipId: string) {
    const ref = doc(db, 'institute_memberships', membershipId);
    await setDoc(ref, { status: 'approved' }, { merge: true });
}

// Update Assignments for a Group
export async function updateGroupAssignments(groupId: string, assignments: any[]) {
    const ref = doc(db, 'institute_groups', groupId);
    await setDoc(ref, { assignments }, { merge: true });
}

// Delete a Group
export async function deleteInstituteGroup(groupId: string) {
    const ref = doc(db, 'institute_groups', groupId);
    // Note: In production, we'd also want to delete related assignments, rosters, and memberships via a Cloud Function trigger.
    // For MVP, deleting the top-level doc is sufficient to remove it from the UI.
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(ref);
}

// Fetch aggregate stats for the Dashboard
export async function getDashboardStats(instituteId: string) {
    const [snapGroups, snapPending, snapApproved] = await Promise.all([
        getDocs(query(collection(db, 'institute_groups'), where('instituteId', '==', instituteId))),
        getDocs(query(collection(db, 'institute_memberships'), where('instituteId', '==', instituteId), where('status', '==', 'pending'))),
        getDocs(query(collection(db, 'institute_memberships'), where('instituteId', '==', instituteId), where('status', '==', 'approved'), where('role', '==', 'student')))
    ]);

    return {
        totalGroups: snapGroups.size,
        pendingRequests: snapPending.size,
        activeStudents: snapApproved.size
    };
}

// --- CREATOR HUB API ---

export async function saveCreatorProfile(userId: string, data: Partial<CreatorHub>): Promise<CreatorHub> {
    const ref = doc(db, 'creators', userId);
    const snap = await getDoc(ref);

    // Auto strip the @ symbol if they typed it
    let cleanVanity = data.vanityCode ? data.vanityCode.replace('@', '') : '';
    let existingLessons: CreatorLesson[] = [];

    if (snap.exists()) {
        existingLessons = (snap.data() as CreatorHub).lessons || [];
    }

    const creator: CreatorHub = {
        id: userId,
        vanityCode: cleanVanity || (snap.exists() ? (snap.data() as CreatorHub).vanityCode : `user_${userId.substring(0, 5)}`),
        displayName: data.displayName || 'New Channel',
        youtubeChannelId: data.youtubeChannelId || '',
        description: data.description || '',
        logoUrl: data.logoUrl || '',
        lessons: data.lessons || existingLessons
    };

    await setDoc(ref, creator, { merge: true });
    return creator;
}

export async function getCreatorProfile(userId: string): Promise<CreatorHub | null> {
    const cDoc = await getDoc(doc(db, 'creators', userId));
    return cDoc.exists() ? cDoc.data() as CreatorHub : null;
}

export async function getCreatorByVanityCode(vanityCode: string): Promise<CreatorHub | null> {
    const cleanVanity = vanityCode.replace('@', '');
    const q = query(collection(db, 'creators'), where('vanityCode', '==', cleanVanity));
    const snap = await getDocs(q);
    return snap.docs.length > 0 ? snap.docs[0].data() as CreatorHub : null;
}

// Replaces the old separate lesson collections to just update the array in the creator doc
export async function updateCreatorLessons(creatorId: string, lessons: CreatorLesson[]) {
    const ref = doc(db, 'creators', creatorId);
    await setDoc(ref, { lessons }, { merge: true });
}
