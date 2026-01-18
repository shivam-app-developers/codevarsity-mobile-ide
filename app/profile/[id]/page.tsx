import ProfileClient from './ProfileClient';

// Generate a placeholder for dynamic profiles
export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfileClient id={params.id} />;
}
