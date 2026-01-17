// Purchase helper functions matching mobile app Firestore schema
import { doc, getDoc, setDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Purchases {
    purchasedCourses: string[];
    activeSubscription: string | null;
    subscriptionExpiresAt: Timestamp | null;
    lastSyncedAt: Timestamp;
}

export async function getUserPurchases(userId: string): Promise<Purchases | null> {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) return null;

        const data = userDoc.data();
        return data?.purchases || {
            purchasedCourses: [],
            activeSubscription: null,
            subscriptionExpiresAt: null,
            lastSyncedAt: Timestamp.now()
        };
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return null;
    }
}

export async function addCoursePurchase(userId: string, courseId: string): Promise<boolean> {
    try {
        await setDoc(doc(db, 'users', userId), {
            purchases: {
                purchasedCourses: arrayUnion(courseId),
                lastSyncedAt: serverTimestamp()
            }
        }, { merge: true });
        return true;
    } catch (error) {
        console.error('Error adding course purchase:', error);
        return false;
    }
}

export async function activateSubscription(
    userId: string,
    subscriptionId: string,
    durationMonths: number = 1
): Promise<boolean> {
    try {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

        await setDoc(doc(db, 'users', userId), {
            purchases: {
                activeSubscription: subscriptionId,
                subscriptionExpiresAt: Timestamp.fromDate(expiresAt),
                lastSyncedAt: serverTimestamp()
            }
        }, { merge: true });
        return true;
    } catch (error) {
        console.error('Error activating subscription:', error);
        return false;
    }
}

export function hasActiveSubscription(purchases: Purchases | null): boolean {
    if (!purchases) return false;

    // Lifetime never expires
    if (purchases.activeSubscription === 'lifetime_power_pack') {
        return true;
    }

    // Check if subscription exists and hasn't expired
    if (purchases.activeSubscription && purchases.subscriptionExpiresAt) {
        const expiresAt = purchases.subscriptionExpiresAt.toDate();
        return expiresAt > new Date();
    }

    return false;
}

export function isCoursePurchased(purchases: Purchases | null, courseId: string): boolean {
    if (!purchases) return false;
    return purchases.purchasedCourses.includes(courseId);
}
