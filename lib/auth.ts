// Auth helper functions
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "./firebase";

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user, error: null };
    } catch (error) {
        console.error("Google sign-in error:", error);
        return { user: null, error: error as Error };
    }
}

export async function signInWithGithub() {
    try {
        const result = await signInWithPopup(auth, githubProvider);
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
