'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { InstituteGroup, getInstituteGroups, updateGroupAssignments } from '@/lib/instituteApi';

export default function AssignmentsPage() {
    const { user } = useAuth();
    const [groups, setGroups] = useState<InstituteGroup[]>([]);
    const [activeGroupId, setActiveGroupId] = useState<string>('');

    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newTargetId, setNewTargetId] = useState('');
    const [newType, setNewType] = useState('practice_challenge');

    useEffect(() => {
        if (user) {
            getInstituteGroups(user.uid).then(data => {
                setGroups(data);
                if (data.length > 0) setActiveGroupId(data[0].id);
                else setActiveGroupId('');
            });
        }
    }, [user]);

    const activeGroup = groups.find(g => g.id === activeGroupId);

    async function handleAddAssignment(e: React.FormEvent) {
        e.preventDefault();
        if (!activeGroup || !newTitle.trim() || !newTargetId.trim()) return;

        const newAssignment = {
            id: `asgn_${Date.now()}`,
            title: newTitle,
            targetId: newTargetId,
            type: newType,
            dueDate: new Date().toISOString()
        };

        const updatedAssignments = [...(activeGroup.assignments || []), newAssignment];

        try {
            await updateGroupAssignments(activeGroupId, updatedAssignments);
            // Update local state
            setGroups(groups.map(g => g.id === activeGroupId ? { ...g, assignments: updatedAssignments } : g));
            setIsAdding(false);
            setNewTitle('');
            setNewTargetId('');
        } catch (e) {
            console.error(e);
            alert('Failed to add assignment');
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Curriculum Assignments</h1>
                <p className="text-gray-500 mt-1">Push targeted practice snippets and course layers directly to student devices.</p>
            </div>

            <div className="max-w-md mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Target Class / Group</label>
                <select
                    value={activeGroupId}
                    onChange={(e) => setActiveGroupId(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm bg-white"
                    disabled={groups.length === 0}
                >
                    {groups.length === 0 && <option value="">-- No Groups Available --</option>}
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
            </div>

            {!activeGroup ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                    Please select a class group to manage its curriculum.
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{activeGroup.name} Assignments</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Practice Model: {activeGroup.allowFreePractice ? <span className="font-bold text-blue-600">Free Practice</span> : <span className="font-bold text-purple-600">Guided Only (Highly Restricted)</span>}
                            </p>
                        </div>
                        {!isAdding && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
                            >
                                + Create Assignment
                            </button>
                        )}
                    </div>

                    {isAdding && (
                        <div className="p-6 bg-gray-50 border-b border-gray-100">
                            <form onSubmit={handleAddAssignment} className="max-w-2xl space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title (visible to students)</label>
                                    <input
                                        type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} required
                                        placeholder="e.g. Solve Python Variables Bug Squasher"
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Target ID (CodeVarsity Reference)</label>
                                        <input
                                            type="text" value={newTargetId} onChange={e => setNewTargetId(e.target.value)} required
                                            placeholder="e.g. python_variables_bug_1"
                                            className="w-full p-2 border border-gray-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                                        <select
                                            value={newType} onChange={e => setNewType(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 bg-white"
                                        >
                                            <option value="practice_challenge">Practice Snippet / Bug Squasher</option>
                                            <option value="course_layer">Course Lesson/Layer</option>
                                            <option value="workspace_project">Workspace Project</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition">
                                        Push to Devices
                                    </button>
                                    <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2 bg-white border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="p-0">
                        {(!activeGroup.assignments || activeGroup.assignments.length === 0) ? (
                            <div className="p-12 text-center text-gray-400 font-medium">No assignments posted for this group.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {activeGroup.assignments.map(asgn => (
                                    <li key={asgn.id} className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center group">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-1">{asgn.title}</h4>
                                            <div className="flex gap-3 text-xs">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 uppercase font-black tracking-wider">
                                                    {asgn.type.replace('_', ' ')}
                                                </span>
                                                <span className="text-gray-500 font-mono flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                    </svg>
                                                    {asgn.targetId}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
