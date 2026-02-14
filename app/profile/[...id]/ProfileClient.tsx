'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getUserStats } from '@/lib/userStats';
import { UserStatsSummary } from '@/types/userStats';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';

export default function ProfileClient({ id }: { id: string }) {
    const [stats, setStats] = useState<UserStatsSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                // Try decoding first, but be prepared for it to be a raw UID
                let userId = id;
                try {
                    // Only try decoding if it looks like it might be base64 (not a standard 28-char UID)
                    // Standard Firebase UIDs are 28 chars. Base64 would be ~40 chars for these.
                    if (id.length > 30) {
                        const decodedValue = atob(id);
                        // Simple heuristic: if it decodes to something alphanumeric and reasonably long, it's likely a UID
                        if (decodedValue.length >= 20 && /^[a-zA-Z0-9_-]+$/.test(decodedValue)) {
                            userId = decodedValue;
                        }
                    }
                } catch (e) {
                    // Not valid base64, stick with raw id
                    userId = id;
                }

                const userStats = await getUserStats(userId);

                if (userStats) {
                    setStats(userStats);
                    setError(null);
                } else {
                    // If not found, and we didn't try the other format, try it now
                    if (userId !== id) {
                        const directStats = await getUserStats(id);
                        if (directStats) {
                            setStats(directStats);
                            setError(null);
                            return;
                        }
                    }
                    setError('Profile not found');
                    setStats(null);
                }
            } catch (err) {
                console.error('Error decoding or fetching stats:', err);
                setError('Failed to load profile');
                setStats(null);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchStats();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-exclamation text-2xl text-red-600"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
                        <p className="text-gray-600 mb-6">{error || 'The requested profile could not be loaded.'}</p>
                        <a href="/" className="inline-block px-6 py-2 bg-brand-primary text-white rounded-lg font-medium hover:opacity-90 transition">
                            Back to Home
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

                {/* Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center text-white text-3xl font-bold">
                            {stats.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-gray-900">{stats.displayName}</h1>
                            <p className="text-gray-500 text-sm mt-1">CodeVarsity Learner • Verified Profile</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-4">
                            <div className="w-full md:w-auto">
                                <SocialShareButtons
                                    title={`${stats.displayName}'s CodeVarsity Profile`}
                                    description={`Check out ${stats.displayName}'s verified coding profile with ${stats.coursesCompleted} courses completed and ${stats.xp} XP!`}
                                    url={`${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL}/profile/${id}`}
                                    showLabel={false}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    const url = `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL}/profile/${id}`;
                                    navigator.clipboard.writeText(url);
                                    alert('Profile URL copied to clipboard!');
                                }}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                            >
                                <i className="fa-solid fa-link mr-2"></i>Copy Link
                            </button>
                        </div>
                    </div>
                </div>

                {/* Learning Stats */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Learning Stats</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-gray-500 text-sm mb-2">Courses Completed</div>
                            <div className="text-3xl font-bold text-brand-primary">{stats.coursesCompleted}</div>
                            <p className="text-xs text-gray-500 mt-2">Complete learning paths</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-gray-500 text-sm mb-2">Total XP</div>
                            <div className="text-3xl font-bold text-brand-secondary">{stats.xp.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-2">Experience earned</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-gray-500 text-sm mb-2">Lines Typed</div>
                            <div className="text-3xl font-bold text-brand-accent">{stats.linesTyped.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-2">Genuine code practice</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-gray-500 text-sm mb-2">Current Streak</div>
                            <div className="text-3xl font-bold text-orange-500">{stats.currentStreak} 🔥</div>
                            <p className="text-xs text-gray-500 mt-2">Consecutive days</p>
                        </div>
                    </div>
                </div>

                {/* Problem Solving Stats */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 Problem Solving</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">🐛</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Bug Squasher</h3>
                                    <p className="text-xs text-gray-500">Debugging challenges</p>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stats.bugSquasherCompleted}</div>
                            <p className="text-sm text-gray-600 mt-2">Fixed broken code and syntax errors</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">✨</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Code Refactor</h3>
                                    <p className="text-xs text-gray-500">Improvement challenges</p>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stats.codeRefactorCompleted}</div>
                            <p className="text-sm text-gray-600 mt-2">Improved code quality and design</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">🔧</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Errors Fixed</h3>
                                    <p className="text-xs text-gray-500">Runtime corrections</p>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stats.errorsFixed}</div>
                            <p className="text-sm text-gray-600 mt-2">Independent debugging</p>
                        </div>
                    </div>
                </div>

                {/* Building Stats */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">📁 Building Projects</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Projects Created</h3>
                                <span className="text-2xl">💼</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.projectsCreated}</div>
                            <p className="text-sm text-gray-600">Self-directed coding projects</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Capstones</h3>
                                <span className="text-2xl">🎓</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.capstonesCompleted}</div>
                            <p className="text-sm text-gray-600">Comprehensive multi-skill projects</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Code Scrambles</h3>
                                <span className="text-2xl">🧩</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.scramblesSolved}</div>
                            <p className="text-sm text-gray-600">Code arrangement puzzles solved</p>
                        </div>
                    </div>
                </div>

                {/* Consistency Stats */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Consistency & Quality</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Longest Streak</h3>
                                <span className="text-2xl">⭐</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.longestStreak} days</div>
                            <p className="text-sm text-gray-600">Highest consecutive days</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Guided Practice</h3>
                                <span className="text-2xl">📖</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.practiceSessionsCompleted}</div>
                            <p className="text-sm text-gray-600">Character-by-character exercises</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">First-Try Rate</h3>
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.firstTryRate}%</div>
                            <p className="text-sm text-gray-600">{stats.firstTryRate >= 70 ? '⭐ Excellent competency' : 'Quality metric'}</p>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                {stats.achievements && stats.achievements.length > 0 && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏅 Achievements ({stats.achievements.length})</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {stats.achievements.map((achievement, index) => (
                                <div key={index} className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:shadow-md transition">
                                    <div className="text-4xl mb-2">{achievement.icon}</div>
                                    <span className="font-semibold text-gray-900 text-sm text-center">{achievement.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Verified Badge */}
                <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">✓</div>
                        <div>
                            <h3 className="font-bold text-gray-900">Verified by CodeVarsity</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                This profile represents verified coding activity. Stats are tracked in real-time and cannot be falsified.
                                The custom keyboard requirement ensures all code was genuinely typed through our platform.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
