'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import GoogleButton from '@/components/auth/GoogleButton';

export default function AdminLogin() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && !loading) {
            router.push('/admin/dashboard');
        }
    }, [user, loading, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
                        Institute Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to manage your CodeVarsity School Environment
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <GoogleButton
                        onSuccess={() => router.push('/admin/institutes')}
                        onError={(e) => alert(e.message)}
                    />
                </div>
            </div>
        </div>
    );
}
