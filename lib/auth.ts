// Auth helper functions
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "./firebase";
import { initializeUserStats } from "./userStats";

async function initializeNewUser(user: User) {
    try {
        // Initialize user stats document on first sign-in
        await initializeUserStats(
            user.uid,
            user.email || '',
            user.displayName || undefined,
            user.photoURL || undefined
        );
    } catch (error) {
        console.error("Error initializing user stats:", error);
        // Don't throw - auth was successful even if stats init failed
    }
}

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // Initialize user stats on successful sign-in
        await initializeNewUser(result.user);
        return { user: result.user, error: null };
    } catch (error) {
        console.error("Google sign-in error:", error);
        return { user: null, error: error as Error };
    }
}

export async function signInWithGithub() {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        // Initialize user stats on successful sign-in
        await initializeNewUser(result.user);
        return { user: result.user, error: null };
    } catch (error) {
        console.error("GitHub sign-in error:", error);
        return { user: null, error: error as Error };
    }
}

export async function signOut() {
    try {
        await firebaseSignOut(auth);
        return { error: null };
    } catch (error) {
        console.error("Sign-out error:", error);
        return { error: error as Error };
    }
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
    return auth.currentUser;
}
