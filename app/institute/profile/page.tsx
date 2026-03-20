'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Institute, getInstituteProfile, saveInstituteProfile } from '@/lib/instituteApi';

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Institute | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'limits'>('general');

    // General State
    const [name, setName] = useState('');
    const [type, setType] = useState('High School');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');

    // Branding State
    const [logoUrl, setLogoUrl] = useState('');
    const [primaryColor, setPrimaryColor] = useState('#2563eb'); // Default blue

    // Limits State (Read Only)
    const [subscriptionStatus, setSubscriptionStatus] = useState('trial');

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    async function loadProfile() {
        setLoading(true);
        try {
            const data = await getInstituteProfile(user!.uid);
            if (data) {
                setProfile(data);
                setName(data.name || '');
                setType(data.type || 'High School');
                setDescription(data.description || '');
                setWebsite(data.website || '');
                setPhone(data.phone || '');
                setLogoUrl(data.logoUrl || '');
                setPrimaryColor(data.primaryColor || '#2563eb');
                setSubscriptionStatus(data.subscriptionStatus || 'trial');
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSaving(true);
        try {
            const updatedProfile = await saveInstituteProfile(user!.uid, {
                name,
                type,
                description,
                website,
                phone,
                logoUrl,
                primaryColor,
                subscriptionStatus
            });
            setProfile(updatedProfile);
            alert("Profile saved successfully!");
        } catch (e) {
            console.error(e);
            alert('Failed to save profile');
        }
        setIsSaving(false);
    }

    if (loading) return <div className="p-8">Loading Profile...</div>;

    const navTabs = [
        { id: 'general', label: 'General Information' },
        { id: 'branding', label: 'Custom Branding' },
        { id: 'limits', label: 'Limits & Subscription' }
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Institute Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your organization's settings and custom app branding.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Desktop Sidebar Tabs */}
                <div className="md:w-64 shrink-0">
                    <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto pb-4 md:pb-0">
                        {navTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-3 text-sm font-bold text-left rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-200">

                        {/* GENERAL TAB */}
                        {activeTab === 'general' && (
                            <div className="p-8 space-y-6">
                                <div className="border-b border-gray-100 pb-4 mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">General Information</h2>
                                    <p className="text-sm text-gray-500">This helps students identify your organization.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Organization Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                                            placeholder="e.g. CodeVarsity Academy"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Organization Type</label>
                                        <select
                                            value={type}
                                            onChange={e => setType(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                                        >
                                            <option value="High School">High School</option>
                                            <option value="University">University</option>
                                            <option value="Bootcamp">Bootcamp / Tuition</option>
                                            <option value="Corporate">Corporate Training</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Phone</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Official Website</label>
                                        <input
                                            type="url"
                                            value={website}
                                            onChange={e => setWebsite(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                                            placeholder="https://example.edu"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Welcome Bio / Description</label>
                                        <textarea
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            rows={4}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                                            placeholder="Write a short welcome message for students joining your institute..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BRANDING TAB */}
                        {activeTab === 'branding' && (
                            <div className="p-8 space-y-6">
                                <div className="border-b border-gray-100 pb-4 mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Custom Branding</h2>
                                    <p className="text-sm text-gray-500">Make the CodeVarsity app feel like your own. Changes here affect what your students see.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Brand Color</label>
                                            <div className="flex gap-4 items-center">
                                                <input
                                                    type="color"
                                                    value={primaryColor}
                                                    onChange={e => setPrimaryColor(e.target.value)}
                                                    className="w-14 h-14 rounded cursor-pointer border-0 p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={primaryColor}
                                                    onChange={e => setPrimaryColor(e.target.value)}
                                                    className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Logo URL (Icon)</label>
                                            <input
                                                type="url"
                                                value={logoUrl}
                                                onChange={e => setLogoUrl(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 transition"
                                                placeholder="https://imgur.com/your-logo.png"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Provide a direct link to a square, transparent PNG or SVG for best results.</p>
                                        </div>
                                    </div>

                                    {/* LIVE PREVIEW WIDGET */}
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Live App Preview</p>

                                        {/* Mobile Phone Mockup */}
                                        <div className="w-64 h-96 bg-white rounded-[2rem] shadow-xl border-4 border-gray-900 overflow-hidden relative flex flex-col">
                                            {/* Status Bar */}
                                            <div className="h-6 w-full flex justify-between items-center px-4 text-[10px] font-bold text-gray-800 shrink-0">
                                                <span>9:41</span>
                                                <div className="flex gap-1">
                                                    <span>LTE</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="px-5 py-4 shrink-0 transition-colors" style={{ backgroundColor: primaryColor }}>
                                                <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center mb-2 overflow-hidden">
                                                    {logoUrl ? (
                                                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                                                    ) : (
                                                        <span className="text-white text-xs font-bold">Logo</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white font-bold text-lg leading-tight">{name || 'Your Organization'}</h3>
                                                <p className="text-white/70 text-xs mt-0.5">{type}</p>
                                            </div>

                                            {/* App Body */}
                                            <div className="flex-1 p-5 flex flex-col gap-3 bg-gray-50">
                                                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                                <div className="h-2 w-full bg-gray-200 rounded"></div>
                                                <div className="h-2 w-3/4 bg-gray-200 rounded"></div>

                                                <div className="mt-auto h-12 w-full rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: primaryColor }}>
                                                    <span className="text-white font-bold text-sm">Join Class</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* LIMITS TAB (Read-only for now) */}
                        {activeTab === 'limits' && (
                            <div className="p-8 space-y-6">
                                <div className="border-b border-gray-100 pb-4 mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Limits & Subscription</h2>
                                    <p className="text-sm text-gray-500">Your current plan constraints. Contact support to upgrade.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Current Plan</p>
                                            <p className="text-2xl font-black text-gray-900 capitalize">{subscriptionStatus}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">License Utilization</p>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium text-gray-700">Students</span>
                                                    <span className="font-bold text-gray-900">Unlimited</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium text-gray-700">Teachers</span>
                                                    <span className="font-bold text-gray-900">? / {profile?.maxTeachers || 10}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Footer */}
                        <div className="px-8 py-5 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving || activeTab === 'limits'}
                                className={`px-8 py-3 rounded-lg font-bold shadow-sm transition-colors ${isSaving || activeTab === 'limits'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {isSaving ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
