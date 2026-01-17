'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { isCoursePurchased, getUserPurchases, addCoursePurchase } from '@/lib/purchases';
import coursesMetadata from '@/codelab_docs/courses_metadata.json';

interface Course {
    id: string;
    title: string;
    track: string;
    level: string;
    icon: string;
}

function getCoursePrice(level: string): number {
    if (level.includes("Intermediate")) return 9.99;
    if (level.includes("Advanced")) return 14.99;
    if (level.includes("Professional") || level.includes("Expert")) return 19.99;
    return 5.99;
}

export default function CheckoutClient({ courseId }: { courseId: string }) {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [alreadyOwned, setAlreadyOwned] = useState(false);

    const course = (coursesMetadata as Course[]).find(c => c.id === courseId);
    const price = course ? getCoursePrice(course.level) : 0;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/auth?returnUrl=/checkout/${courseId}`);
            return;
        }

        if (user) {
            getUserPurchases(user.uid).then(purchases => {
                if (isCoursePurchased(purchases, courseId)) {
                    setAlreadyOwned(true);
                }
            });
        }
    }, [user, authLoading, router, courseId]);

    const handleCheckout = async () => {
        if (!user || !course) return;

        setLoading(true);

        try {
            // Demo: Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Save purchase to Firestore
            const success = await addCoursePurchase(user.uid, courseId);

            if (success) {
                router.push(`/order/success?course=${courseId}`);
            } else {
                throw new Error('Failed to save purchase');
            }

        } catch (err) {
            console.error('Checkout error:', err);
            setLoading(false);
            alert('Payment failed. Please try again.');
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
                        <p className="text-gray-600 mt-2">The course you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/pricing" className="text-brand-primary mt-4 inline-block hover:underline">
                            Browse Courses
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (alreadyOwned) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-check text-2xl text-green-600"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">You Already Own This Course</h2>
                        <p className="text-gray-600 mt-2">{course.title} is already in your library.</p>
                        <Link href="/account" className="mt-6 inline-block px-6 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90">
                            Go to My Courses
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">

                <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

                {/* Demo Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        <i className="fa-solid fa-info-circle mr-2"></i>
                        <strong>Demo Mode:</strong> This is a simulated checkout. Real payments via Cashfree coming soon.
                    </p>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <h2 className="font-medium text-gray-500 text-sm uppercase tracking-wide mb-4">Order Summary</h2>

                    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
                        <span className="text-4xl">{course.icon}</span>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{course.title}</p>
                            <p className="text-sm text-gray-500">{course.track} • {course.level}</p>
                        </div>
                        <p className="font-bold text-gray-900">${price.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <span className="font-medium text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <h2 className="font-medium text-gray-500 text-sm uppercase tracking-wide mb-4">Payment Method</h2>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-brand-primary">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <i className="fa-solid fa-credit-card text-brand-primary"></i>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">Secure Payment</p>
                            <p className="text-sm text-gray-500">Cards, UPI, Netbanking (Demo)</p>
                        </div>
                        <i className="fa-solid fa-check-circle text-brand-primary"></i>
                    </div>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <i className="fa-solid fa-spinner animate-spin"></i>
                            Processing...
                        </span>
                    ) : (
                        `Complete Purchase - $${price.toFixed(2)}`
                    )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    <i className="fa-solid fa-lock mr-1"></i>
                    Your payment is secure and encrypted.
                </p>

            </main>
            <Footer />
        </div>
    );
}
