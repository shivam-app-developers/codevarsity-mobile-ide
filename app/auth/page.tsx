'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleButton from '@/components/auth/GoogleButton';
import GithubButton from '@/components/auth/GithubButton';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const returnUrl = searchParams.get('returnUrl') || '/';

    useEffect(() => {
        if (!loading && user) {
            router.push(returnUrl);
        }
    }, [user, loading, router, returnUrl]);

    const handleSuccess = () => {
        router.push(returnUrl);
    };

    const handleError = (error: Error) => {
        setError(error.message || 'An error occurred during sign in');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            &lt;/&gt;
                        </div>
                        <span className="font-bold text-2xl text-gray-900">CoderKit</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Welcome back
                    </h1>
                    <p className="text-gray-600 text-center mb-8">
                        Sign in to access your courses and track progress
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <GoogleButton onSuccess={handleSuccess} onError={handleError} />
                        <GithubButton onSuccess={handleSuccess} onError={handleError} />
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-brand-primary hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-brand-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Back link */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
