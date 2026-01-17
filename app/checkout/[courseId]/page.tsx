import CheckoutClient from './CheckoutClient';
import coursesMetadata from '@/codelab_docs/courses_metadata.json';

interface Course {
    id: string;
    title: string;
    track: string;
    level: string;
    icon: string;
}

// Generate static pages for all courses
export function generateStaticParams() {
    return (coursesMetadata as Course[]).map((course) => ({
        courseId: course.id,
    }));
}

export default async function CheckoutPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    return <CheckoutClient courseId={courseId} />;
}
