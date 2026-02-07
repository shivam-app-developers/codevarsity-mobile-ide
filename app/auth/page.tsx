'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleButton from '@/components/auth/GoogleButton';
import GithubButton from '@/components/auth/GithubButton';
import { useAuth } from '@/contexts/AuthContext';

function AuthContent() {
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
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-brand-primary/20 rounded-full animate-pulse"></div>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary relative"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-sans">
            {/* Soft University Brand Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/[0.03] rounded-full blur-[140px] -mr-64 -mt-64 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/[0.03] rounded-full blur-[140px] -ml-64 -mb-64 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-md w-full relative z-10 px-4">
                {/* Logo Section - University Style */}
                <div className="text-center mb-10 transform translate-y-0 opacity-0 animate-[fade-down_0.8s_ease-out_forwards]">
                    <Link href="/" className="inline-flex flex-col items-center gap-4 active:scale-95 transition-transform group">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-primary/5 rounded-full blur-xl group-hover:bg-brand-primary/10 transition-colors"></div>
                            <img
                                src="/assets/logo-brand.png"
                                alt="CodeVarsity Logo"
                                className="w-20 h-20 relative z-10 drop-shadow-2xl"
                            />
                        </div>
                        <div className="text-center">
                            <span className="block font-black text-3xl text-brand-primary tracking-tight leading-none mb-1">CodeVarsity</span>
                            <span className="text-[11px] font-black text-brand-primary/60 uppercase tracking-[0.3em]">Professional IDE</span>
                        </div>
                    </Link>
                </div>

                {/* Auth Card with High-End Light Polish */}
                <div className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-[0_32px_80px_-20px_rgba(5,43,35,0.12)] transform translate-y-0 opacity-0 animate-[fade-up_0.8s_ease-out_0.2s_forwards]">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black text-brand-primary mb-3 tracking-tight">
                            Master Your Code
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Step into the professional developer ecosystem.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span className="font-semibold">{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <GoogleButton onSuccess={handleSuccess} onError={handleError} />
                            <GithubButton onSuccess={handleSuccess} onError={handleError} />
                        </div>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                                <span className="bg-white px-4 text-gray-400 font-black tracking-[0.2em]">Student Access</span>
                            </div>
                        </div>

                        <p className="text-gray-400 text-[11px] text-center leading-relaxed font-bold uppercase tracking-wider">
                            By continuing, you agree to our <br className="hidden sm:block" />
                            <Link href="/terms" className="text-brand-primary hover:text-brand-secondary transition-colors underline decoration-brand-primary/20">Terms</Link>
                            {' '}and{' '}
                            <Link href="/privacy" className="text-brand-primary hover:text-brand-secondary transition-colors underline decoration-brand-primary/20">Privacy</Link>
                        </p>
                    </div>
                </div>

                {/* Back link */}
                <div className="text-center mt-10 opacity-0 animate-[fade-in_1s_ease-out_1s_forwards]">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-primary text-sm font-black uppercase tracking-widest transition-all group">
                        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                        <span>Return to Main</span>
                    </Link>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}

