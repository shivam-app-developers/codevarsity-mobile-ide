import ProfileClient from './ProfileClient';

// Generate a placeholder for dynamic profiles - they'll be loaded client-side
export function generateStaticParams() {
  // Return empty array - profiles are fully dynamic
  // With dynamicParams: true, any ID will work
  return [];
}

// Allow any profile ID to be accessed
export const dynamicParams = true;

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProfileClient id={id} />;
}
