'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoogleButton from '@/components/auth/GoogleButton';
import { getInstituteProfile, getCreatorProfile, saveInstituteProfile, saveCreatorProfile } from '@/lib/instituteApi';

export default function AdminLogin() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [evaluating, setEvaluating] = useState(false);
    const [needsSelection, setNeedsSelection] = useState(false);

    useEffect(() => {
        if (user && !loading && !needsSelection) {
            checkProfilesAndRoute();
        }
    }, [user, loading, router, needsSelection]);

    const checkProfilesAndRoute = async () => {
        if (!user) return;
        setEvaluating(true);
        try {
            // Check if they are an institute
            const instProfile = await getInstituteProfile(user.uid);
            if (instProfile) {
                router.push('/institute/dashboard');
                return;
            }

            // Check if they are a creator
            const creatorProfile = await getCreatorProfile(user.uid);
            if (creatorProfile) {
                router.push('/creator/dashboard');
                return;
            }

            // New user, needs to select a portal
            setNeedsSelection(true);
        } catch (e) {
            console.error(e);
        } finally {
            setEvaluating(false);
        }
    };

    const handleSelectPortal = async (type: 'institute' | 'creator') => {
        if (!user) return;
        setEvaluating(true);
        try {
            if (type === 'institute') {
                await saveInstituteProfile(user.uid, { name: user.displayName || 'New Institute' });
                router.push('/institute/dashboard');
            } else {
                await saveCreatorProfile(user.uid, { displayName: user.displayName || 'New Channel' });
                router.push('/creator/dashboard');
            }
        } catch (e) {
            console.error(e);
            alert("Failed to initialize profile. Please try again.");
            setEvaluating(false);
        }
    };

    if (evaluating) {
        return <div className="flex min-h-screen items-center justify-center bg-gray-50">Evaluating account...</div>;
    }

    if (needsSelection) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Welcome to CodeVarsity</h2>
                        <p className="mt-2 text-gray-600">How do you plan to use the platform?</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <button onClick={() => handleSelectPortal('institute')} className="border border-blue-200 bg-blue-50/50 p-8 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all text-left flex flex-col gap-3 group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">For Educators & Institutes</h3>
                                <p className="text-sm text-gray-600 mt-1">Manage student rosters, create classes, and assign offline coding practice.</p>
                            </div>
                        </button>

                        <button onClick={() => handleSelectPortal('creator')} className="border border-purple-200 bg-purple-50/50 p-8 rounded-xl hover:bg-purple-100 hover:border-purple-300 transition-all text-left flex flex-col gap-3 group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                <i className="fa-brands fa-youtube"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">For Content Creators</h3>
                                <p className="text-sm text-gray-600 mt-1">Monetize tutorials with interactive IDE starters attached directly to your videos.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to manage your CodeVarsity Environment
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <GoogleButton
                        onSuccess={() => { }} // Nav is handled by the useEffect watching user state
                        onError={(e) => alert(e.message)}
                    />
                </div>
            </div>
        </div>
    );
}
