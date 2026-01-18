import ProfileClient from './ProfileClient';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { getUserStats } from '@/lib/userStats';

// Generate a placeholder for dynamic profiles
export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const userId = atob(params.id);
    const stats = await getUserStats(userId);
    const profileName = stats?.displayName || 'CoderKit Profile';
    
    return createMetadata({
      title: `${profileName}'s Profile`,
      description: `Verified coding profile. ${stats?.learningStats.courses || 0} courses completed, ${stats?.buildingStats.projectsBuilt || 0} projects built.`,
      path: `/profile/${params.id}`,
      type: 'profile',
    });
  } catch {
    return createMetadata({
      title: 'Profile',
      description: 'Verified CoderKit coding profile with stats and achievements.',
      path: `/profile/${params.id}`,
      type: 'profile',
    });
  }
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfileClient id={params.id} />;
}
