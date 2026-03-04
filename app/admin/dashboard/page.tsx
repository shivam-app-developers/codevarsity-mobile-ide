'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getInstituteProfile, getDashboardStats, Institute } from '@/lib/instituteApi';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Institute | null>(null);
    const [stats, setStats] = useState({ totalGroups: 0, pendingRequests: 0, activeStudents: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadData(user.uid);
        }
    }, [user]);

    async function loadData(uid: string) {
        setLoading(true);
        try {
            const [prof, st] = await Promise.all([
                getInstituteProfile(uid),
                getDashboardStats(uid)
            ]);
            setProfile(prof);
            setStats(st);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    if (loading) return <div className="p-8">Loading Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile?.name || 'Admin'}</h1>
                <p className="text-gray-500 mt-1">Here is a quick overview of your organization.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Total Students</h3>
                    <div className="flex items-end gap-3 z-10">
                        <span className="text-5xl font-black text-gray-900">{stats.activeStudents}</span>
                    </div>
                    <Link href="/admin/roster" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4 z-10">Manage Roster &rarr;</Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Active Classes</h3>
                    <div className="flex items-end gap-3 z-10">
                        <span className="text-5xl font-black text-gray-900">{stats.totalGroups}</span>
                    </div>
                    <Link href="/admin/groups" className="text-green-600 hover:text-green-800 text-sm font-medium mt-4 z-10">Manage Classes &rarr;</Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Pending Joins</h3>
                    <div className="flex items-end gap-3 z-10">
                        <span className="text-5xl font-black text-gray-900">{stats.pendingRequests}</span>
                        {stats.pendingRequests > 0 && (
                            <span className="text-sm font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full mb-1">Needs Action</span>
                        )}
                    </div>
                    <Link href="/admin/approvals" className="text-orange-600 hover:text-orange-800 text-sm font-medium mt-4 z-10">Review Approvals &rarr;</Link>
                </div>

            </div>

            {/* Admin Checklist / Guides */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">1</div>
                        <div>
                            <h3 className="font-bold text-gray-900">Setup your Profile</h3>
                            <p className="text-gray-600 text-sm mt-1">Go to <Link href="/admin/profile" className="text-blue-600 hover:underline">Institute Profile</Link> to add your organization's logo, bio, and custom brand color.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
                        <div>
                            <h3 className="font-bold text-gray-900">Create a Class</h3>
                            <p className="text-gray-600 text-sm mt-1">Go to <Link href="/admin/groups" className="text-blue-600 hover:underline">Groups & Classes</Link> to create your first class and get a 6-digit Join Code.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">3</div>
                        <div>
                            <h3 className="font-bold text-gray-900">Invite Students</h3>
                            <p className="text-gray-600 text-sm mt-1">Students download the CodeVarsity mobile app, tap 'Join Organization', and enter your Join Code.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">4</div>
                        <div>
                            <h3 className="font-bold text-gray-900">Push Assignments</h3>
                            <p className="text-gray-600 text-sm mt-1">Use <Link href="/admin/assignments" className="text-blue-600 hover:underline">Assignments</Link> to push practice constraints right to their phones.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
