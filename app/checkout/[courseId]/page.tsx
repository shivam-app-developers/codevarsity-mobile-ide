import CheckoutClient from './CheckoutClient';

export default function CheckoutPage({ params }: { params: { courseId: string } }) {
    return <CheckoutClient courseId={params.courseId} />;
}
