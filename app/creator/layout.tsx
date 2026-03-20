'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && !pathname.includes('/login')) {
            router.push('/login');
        }
    }, [user, loading, pathname, router]);

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    if (!user && !pathname.includes('/login')) {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0">
                <div className="p-6 font-bold text-xl text-gray-800 border-b border-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-camera text-purple-600"></i> CodeVarsity Creator
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2 flex flex-col pt-8">
                    <Link href="/creator/dashboard" className={`p-3 hover:bg-purple-50 hover:text-purple-600 rounded-lg font-medium transition-colors ${pathname.includes('/dashboard') ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}>
                        <i className="fa-solid fa-play mr-2"></i> Creator Hub
                    </Link>
                    {/* Placeholder for future expansion */}
                    <div className="p-3 text-gray-400 rounded-lg font-medium cursor-not-allowed hidden">
                        <i className="fa-solid fa-chart-line mr-2"></i> Analytics (Coming Soon)
                    </div>
                </nav>

                {/* User Card */}
                <div className="absolute bottom-0 w-full md:w-64 p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                            {user?.email?.[0].toUpperCase() || 'C'}
                        </div>
                        <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap font-medium text-gray-700">
                            {user?.email}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50/50 relative">
                {children}
            </main>
        </div>
    );
}
