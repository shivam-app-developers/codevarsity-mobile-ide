'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { InstituteGroup, getInstituteGroups, createInstituteGroup, deleteInstituteGroup } from '@/lib/instituteApi';

const AVAILABLE_LANGUAGES = ['python', 'c', 'cpp', 'java', 'go', 'javascript'];
const AVAILABLE_COURSES = ['python_101', 'c_101', 'cpp_101', 'java_101'];

export default function GroupsPage() {
    const { user } = useAuth();

    const [groups, setGroups] = useState<InstituteGroup[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [newName, setNewName] = useState('');
    const [selectedLangs, setSelectedLangs] = useState<string[]>(['python']);
    const [selectedCourses, setSelectedCourses] = useState<string[]>(['python_101']);
    const [allowFreePractice, setAllowFreePractice] = useState(true);

    useEffect(() => {
        if (user) {
            loadGroups(user.uid);
        }
    }, [user]);

    async function loadGroups(instId: string) {
        setLoading(true);
        try {
            const data = await getInstituteGroups(instId);
            setGroups(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        if (!newName.trim() || !user) return;

        try {
            const newGroup = await createInstituteGroup({
                instituteId: user.uid,
                name: newName,
                allowedLanguages: selectedLangs,
                assignedCourses: selectedCourses,
                allowFreePractice: allowFreePractice
            });
            setGroups([...groups, newGroup]);
            setIsCreating(false);
            setNewName('');
        } catch (e) {
            console.error(e);
            alert('Failed to create group');
        }
    }

    async function handleDelete(groupId: string, groupName: string) {
        if (!confirm(`Are you sure you want to permanently delete the class "${groupName}"? This action cannot be undone.`)) return;

        setIsDeleting(groupId);
        try {
            await deleteInstituteGroup(groupId);
            setGroups(groups.filter(g => g.id !== groupId));
        } catch (e) {
            console.error(e);
            alert('Failed to delete group');
        }
        setIsDeleting(null);
    }

    function toggleItem(list: string[], setList: (l: string[]) => void, item: string) {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    }

    if (loading) return <div className="p-8">Loading Classes...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Groups & Classes</h1>
                    <p className="text-gray-500 mt-1">Manage the curriculum and access codes for your classes.</p>
                </div>
            </div>

            <div className="mb-6">
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        + Create New Group
                    </button>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-bold mb-4">Create New Group</h2>
                        <form onSubmit={handleCreate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class / Group Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    className="w-full max-w-md p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 10th Standard CS - Section A"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Languages (Workspace & Practice)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {AVAILABLE_LANGUAGES.map(lang => (
                                            <button
                                                key={lang}
                                                type="button"
                                                onClick={() => toggleItem(selectedLangs, setSelectedLangs, lang)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${selectedLangs.includes(lang) ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                                            >
                                                {lang.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Courses (Learn Tab)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {AVAILABLE_COURSES.map(course => (
                                            <button
                                                key={course}
                                                type="button"
                                                onClick={() => toggleItem(selectedCourses, setSelectedCourses, course)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${selectedCourses.includes(course) ? 'bg-green-100 border-green-200 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
                                            >
                                                {course.replace('_', ' ').toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={allowFreePractice}
                                        onChange={(e) => setAllowFreePractice(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <div>
                                        <span className="block text-sm font-bold text-gray-900">Allow Free Practice</span>
                                        <span className="block text-xs text-gray-500">If unchecked, students can only see snippets explicitly Assigned.</span>
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
                                    Create Group
                                </button>
                                <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {groups.length === 0 && !isCreating ? (
                    <div className="text-center p-8 bg-white border border-gray-200 border-dashed rounded-xl text-gray-500">
                        You have not created any classes yet. Create your first class to get a join code!
                    </div>
                ) : (
                    groups.map(group => (
                        <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                                    <span className="px-2.5 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-sm font-mono tracking-widest font-bold">
                                        Code: {group.joinCode}
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <p><span className="font-semibold text-gray-700">Courses:</span> {group.assignedCourses.length}</p>
                                    <p><span className="font-semibold text-gray-700">Langs:</span> {group.allowedLanguages.map(l => l.toUpperCase()).join(', ')}</p>
                                    <p><span className="font-semibold text-gray-700">Practice:</span> {group.allowFreePractice ? 'Free' : 'Guided'}</p>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded font-medium text-sm transition cursor-not-allowed opacity-50">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(group.id, group.name)}
                                    disabled={isDeleting === group.id}
                                    className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 rounded font-medium text-sm transition disabled:opacity-50"
                                >
                                    {isDeleting === group.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
