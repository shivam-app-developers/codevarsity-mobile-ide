'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CreatorHub, CreatorLesson, getCreatorProfile, saveCreatorProfile, updateCreatorLessons } from '@/lib/instituteApi';

export default function CreatorHubPage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<CreatorHub | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form states
    const [displayName, setDisplayName] = useState('');
    const [vanityCode, setVanityCode] = useState('');
    const [description, setDescription] = useState('');

    // Lessons state
    const [lessons, setLessons] = useState<CreatorLesson[]>([]);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [newVideoTitle, setNewVideoTitle] = useState('');

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        try {
            const data = await getCreatorProfile(user!.uid);
            if (data) {
                setProfile(data);
                setDisplayName(data.displayName);
                setVanityCode(data.vanityCode);
                setDescription(data.description || '');
                setLessons(data.lessons || []);
            }
        } catch (error) {
            console.error("Failed to load creator profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const updated = await saveCreatorProfile(user.uid, {
                displayName,
                vanityCode,
                description,
                lessons // Keep existing lessons
            });
            setProfile(updated);
            alert('Creator Profile saved successfully!');
        } catch (error) {
            console.error("Error saving profile:", error);
            alert('Failed to save profile. Vanity code might be taken.');
        } finally {
            setSaving(false);
        }
    };

    const extractYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleAddLesson = async () => {
        const videoId = extractYouTubeId(newVideoUrl);
        if (!videoId) {
            alert('Invalid YouTube URL');
            return;
        }
        if (!newVideoTitle.trim()) {
            alert('Please provide a title for the lesson');
            return;
        }

        const newLesson: CreatorLesson = {
            id: crypto.randomUUID(),
            youtubeVideoId: videoId,
            title: newVideoTitle,
            description: '',
            order: lessons.length
        };

        const updatedLessons = [...lessons, newLesson];
        setLessons(updatedLessons);

        // Clear inputs
        setNewVideoUrl('');
        setNewVideoTitle('');

        // Save immediately to Firestore
        if (user) {
            await updateCreatorLessons(user.uid, updatedLessons);
        }
    };

    const handleRemoveLesson = async (idToRemove: string) => {
        const updatedLessons = lessons.filter(l => l.id !== idToRemove);
        // Update order
        updatedLessons.forEach((l, idx) => l.order = idx);

        setLessons(updatedLessons);

        if (user) {
            await updateCreatorLessons(user.uid, updatedLessons);
        }
    };

    if (loading) return <div className="p-8">Loading Creator Hub...</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 pb-32">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Creator Hub</h1>
                <p className="text-gray-500 mt-2">Manage your public channel, vanity URL, and interactive YouTube lessons.</p>
            </div>

            {/* Profile Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">Channel Settings</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={e => setDisplayName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                placeholder="e.g., Fireship"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vanity Code (Users search this)</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                    @
                                </span>
                                <input
                                    type="text"
                                    value={vanityCode}
                                    onChange={e => setVanityCode(e.target.value.replace(/[^a-zA-Z0-9_\-]/g, ''))}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                    placeholder="fireship"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Channel Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            placeholder="Welcome to my interactive coding channel..."
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Channel Settings'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Lessons Curations Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Curated Video Lessons</h2>
                    <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{lessons.length} Videos</span>
                </div>

                <div className="p-6">
                    {/* Add New Lesson Form */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-8">
                        <h3 className="text-sm font-semibold text-purple-800 mb-3">Add a YouTube Video</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                value={newVideoUrl}
                                onChange={e => setNewVideoUrl(e.target.value)}
                                className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="Paste YouTube URL here..."
                            />
                            <input
                                type="text"
                                value={newVideoTitle}
                                onChange={e => setNewVideoTitle(e.target.value)}
                                className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="Lesson Title"
                            />
                            <button
                                onClick={handleAddLesson}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-sm"
                            >
                                Add Lesson
                            </button>
                        </div>
                    </div>

                    {/* Lessons List */}
                    {lessons.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No lessons added yet. Paste a YouTube URL above to start building your interactive playlist.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {lessons.map((lesson, index) => (
                                <div key={lesson.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors bg-white">
                                    <div className="w-40 h-24 bg-gray-200 rounded-md overflow-hidden shrink-0 relative">
                                        <img
                                            src={`https://img.youtube.com/vi/${lesson.youtubeVideoId}/mqdefault.jpg`}
                                            alt={lesson.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                                            #{index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className="font-bold text-gray-900 line-clamp-1">{lesson.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">Video ID: {lesson.youtubeVideoId}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                                                No Starter Template Attached
                                            </span>
                                            <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                                                Attach Template
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center border-l border-gray-100 pl-4 ml-2">
                                        <button
                                            onClick={() => handleRemoveLesson(lesson.id)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            title="Remove Lesson"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
