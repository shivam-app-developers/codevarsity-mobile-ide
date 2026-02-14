'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPurchases, hasActiveSubscription, Purchases } from '@/lib/purchases';
import { getUserStats } from '@/lib/userStats';
import { UserStatsSummary } from '@/types/userStats';
import coursesMetadata from '@/codelab_docs/courses_metadata.json';
import { getLanguageIcon } from '@/lib/icons';

interface Course {
    id: string;
    title: string;
    track: string;
    level: string;
    icon: string;
}

export default function AccountPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [purchases, setPurchases] = useState<Purchases | null>(null);
    const [stats, setStats] = useState<UserStatsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/auth?returnUrl=/account');
            return;
        }

        if (user) {
            Promise.all([
                getUserPurchases(user.uid),
                getUserStats(user.uid)
            ]).then(([purchaseData, statsData]) => {
                setPurchases(purchaseData);
                setStats(statsData);
                setLoading(false);
            });
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) {
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

    if (!user) return null;

    const purchasedCourseIds = purchases?.purchasedCourses || [];
    const purchasedCourses = (coursesMetadata as Course[]).filter(c =>
        purchasedCourseIds.includes(c.id)
    );
    const hasSubscription = hasActiveSubscription(purchases);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

                {/* Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-20 h-20 rounded-full"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold">
                                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </div>
                        )}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user.displayName || 'User'}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                        <Link
                            href={`/profile/${btoa(user.uid)}`}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                        >
                            View Public Profile
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                {stats && (
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Your Learning Progress</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                <div className="text-gray-500 text-xs mb-1">Courses</div>
                                <div className="text-2xl font-bold text-brand-primary">{stats.coursesCompleted}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                <div className="text-gray-500 text-xs mb-1">Total XP</div>
                                <div className="text-2xl font-bold text-brand-secondary">{stats.xp.toLocaleString()}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                <div className="text-gray-500 text-xs mb-1">Lines Typed</div>
                                <div className="text-2xl font-bold text-brand-accent">{stats.linesTyped.toLocaleString()}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                <div className="text-gray-500 text-xs mb-1">Current Streak</div>
                                <div className="text-2xl font-bold text-orange-500">{stats.currentStreak} 🔥</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subscription Status */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Subscription</h2>
                    {hasSubscription ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {purchases?.activeSubscription === 'lifetime_power_pack'
                                        ? 'Lifetime Power Pack'
                                        : purchases?.activeSubscription?.replace(/_/g, ' ').replace(/sub /i, '').replace(/\b\w/g, l => l.toUpperCase())}
                                </p>
                                {purchases?.subscriptionExpiresAt && purchases.activeSubscription !== 'lifetime_power_pack' && (
                                    <p className="text-sm text-gray-500">
                                        Expires: {purchases.subscriptionExpiresAt.toDate().toLocaleDateString()}
                                    </p>
                                )}
                                {purchases?.activeSubscription === 'lifetime_power_pack' && (
                                    <p className="text-sm text-green-600">Never expires</p>
                                )}
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                Active
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">No active subscription</p>
                            <Link
                                href="/pricing"
                                className="px-4 py-2 gradient-bg text-white rounded-lg text-sm font-medium hover:opacity-90"
                            >
                                View Plans
                            </Link>
                        </div>
                    )}
                </div>

                {/* Purchased Courses */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">My Courses ({purchasedCourses.length})</h2>
                        <Link href="/pricing" className="text-brand-primary text-sm font-medium hover:underline">
                            Browse More
                        </Link>
                    </div>

                    {purchasedCourses.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {purchasedCourses.map(course => {
                                const langIcon = getLanguageIcon((course as any).language);
                                return (
                                    <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl ${langIcon.color} shadow-sm`}>
                                            <i className={langIcon.icon}></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{course.title}</p>
                                            <p className="text-sm text-gray-500">{course.track}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                            Owned
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fa-solid fa-book text-2xl text-gray-400"></i>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-2">No courses yet</h3>
                            <p className="text-gray-500 text-sm mb-4">Start learning by purchasing your first course</p>
                            <Link href="/pricing" className="text-brand-primary font-medium hover:underline">
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    );
}
