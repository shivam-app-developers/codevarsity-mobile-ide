'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { InstituteMembership, getPendingMemberships, approveMembership } from '@/lib/instituteApi';

export default function ApprovalsPage() {
    const { user } = useAuth();

    const [pendingRequests, setPendingRequests] = useState<InstituteMembership[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            loadPending(user.uid);
        }
    }, [user]);

    async function loadPending(instId: string) {
        setLoading(true);
        try {
            const data = await getPendingMemberships(instId);
            setPendingRequests(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    async function handleApprove(membershipId: string) {
        setProcessingId(membershipId);
        try {
            await approveMembership(membershipId);
            // Remove from list
            setPendingRequests(prev => prev.filter(m => m.id !== membershipId));
        } catch (e) {
            console.error(e);
            alert('Failed to approve membership.');
        }
        setProcessingId(null);
    }

    if (loading && !user) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
                    <p className="text-gray-500 mt-1">Review and approve students who have requested to join using a Class Code.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Fetching requests...</div>
                ) : pendingRequests.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">You're all caught up!</h3>
                        <p className="text-gray-500">There are no pending student join requests at this time.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                    <th className="p-4 font-semibold uppercase tracking-wider">User ID / Email</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider">Role</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider">Target Group ID</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingRequests.map(req => (
                                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">{req.userId}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="capitalize px-2.5 py-1 rounded-full text-xs font-bold leading-none bg-blue-100 text-blue-800">
                                                {req.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 font-mono">
                                            {req.groupId || 'N/A'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    disabled={processingId === req.id}
                                                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent rounded transition disabled:opacity-50"
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(req.id)}
                                                    disabled={processingId === req.id}
                                                    className="px-4 py-1.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded transition shadow-sm disabled:opacity-50"
                                                >
                                                    {processingId === req.id ? '...' : 'Approve'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
