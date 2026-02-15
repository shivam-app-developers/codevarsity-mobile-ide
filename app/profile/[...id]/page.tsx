import ProfileClient from '@/app/profile/[...id]/ProfileClient';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { getUserStats } from '@/lib/userStats';

// Mark as dynamic since profiles are user-specific
export const dynamic = 'force-dynamic';

// Generate a placeholder for dynamic profiles
export function generateStaticParams() {
    return [];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string[] } }): Promise<Metadata> {
    try {
        const fullId = params.id.join('/');
        // Only attempt to fetch stats if we have a valid id
        if (!fullId || fullId.length < 5) {
            throw new Error('Invalid ID');
        }

        // 1. Try fetching with the ID as provided (raw UID or already decoded)
        let stats = null;
        try {
            stats = await Promise.race([
                getUserStats(fullId),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
            ]) as any;
        } catch {
            // Ignore timeout/error and proceed to decoding
        }

        // 2. If not found, it might be Base64 encoded
        if (!stats) {
            try {
                // Support both standard and URL-safe base64
                const base64 = fullId.replace(/-/g, '+').replace(/_/g, '/');
                const decodedValue = atob(base64);

                if (decodedValue && decodedValue.length >= 20) {
                    stats = await getUserStats(decodedValue);
                }
            } catch {
                // Not valid base64, ignore
            }
        }

        // 3. Fallback: if it has segments, try the last segment
        if (!stats && fullId.includes('/')) {
            const lastSegment = fullId.split('/').pop();
            if (lastSegment && lastSegment.length >= 20) {
                stats = await getUserStats(lastSegment);
            }
        }

        const profileName = stats?.displayName || 'CodeVarsity Profile';

        return createMetadata({
            title: `${profileName}'s Profile | CodeVarsity`,
            description: `Verified coding profile. ${stats?.coursesCompleted || 0} courses completed, ${stats?.linesTyped || 0} lines typed.`,
            path: `/profile/${fullId}`,
            type: 'profile',
        });
    } catch {
        return createMetadata({
            title: 'Verified Coding Profile',
            description: 'View verified CodeVarsity coding profile with stats and achievements.',
            path: `/profile/${params.id.join('/')}`,
            type: 'profile',
        });
    }
}

export default function ProfilePage({ params }: { params: { id: string[] } }) {
    return <ProfileClient id={params.id.join('/')} />;
}
