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

        // Try decoding if it looks like base64
        let userId = fullId;
        try {
            if (fullId.length > 30) {
                const decoded = atob(fullId);
                if (decoded.length >= 20 && /^[a-zA-Z0-9_-]+$/.test(decoded)) {
                    userId = decoded;
                }
            }
        } catch {
            userId = fullId;
        }

        const stats = await Promise.race([
            getUserStats(userId),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
        ]) as any;

        // If stats is null, it might be that we need to try the other format
        let finalStats = stats;
        if (!finalStats && userId !== fullId) {
            finalStats = await Promise.race([
                getUserStats(fullId),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
            ]) as any;
        }

        const profileName = finalStats?.displayName || 'CodeVarsity Profile';

        return createMetadata({
            title: `${profileName}'s Profile | CodeVarsity`,
            description: `Verified coding profile. ${finalStats?.coursesCompleted || 0} courses completed, ${finalStats?.linesTyped || 0} lines typed.`,
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
