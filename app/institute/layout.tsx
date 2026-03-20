'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

    // If not logged in and not on login page, don't render anything while redirecting
    if (!user && !pathname.includes('/login')) {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0">
                <div className="p-6 font-bold text-xl text-gray-800 border-b border-gray-100">
                    Institute Admin
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2 flex flex-col pt-8">
                    <Link href="/institute/dashboard" className={`p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors ${pathname.includes('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                        Overview Dashboard
                    </Link>
                    <Link href="/institute/profile" className={`p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors ${pathname.includes('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                        Institute Profile
                    </Link>
                    <Link href="/institute/groups" className={`p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors ${pathname.includes('/groups') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                        Groups & Classes
                    </Link>
                    <Link href="/institute/roster" className={`p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors ${pathname.includes('/roster') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                        Student Roster
                    </Link>
                    <Link href="/institute/approvals" className={`p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors ${pathname.includes('/approvals') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                        Pending Approvals
                    </Link>
                    <Link href="/institute/assignments" className={`p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors ${pathname.includes('/assignments') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                        Assignments
                    </Link>
                </nav>

                {/* User Card */}
                <div className="absolute bottom-0 w-full md:w-64 p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {user?.email?.[0].toUpperCase() || 'A'}
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
