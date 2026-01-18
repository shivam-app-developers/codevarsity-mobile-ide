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

export default function CheckoutPage({ params }: { params: { courseId: string } }) {
    return <CheckoutClient courseId={params.courseId} />;
}
