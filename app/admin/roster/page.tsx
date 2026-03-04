'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { InstituteGroup, getInstituteGroups, uploadRoster } from '@/lib/instituteApi';

interface StudentData {
    name: string;
    rollNumber: string;
}

export default function RosterPage() {
    const { user } = useAuth();
    const [groups, setGroups] = useState<InstituteGroup[]>([]);
    const [activeGroupId, setActiveGroupId] = useState<string>('');

    const [csvText, setCsvText] = useState('');
    const [previewStudents, setPreviewStudents] = useState<StudentData[] | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<{ message: string, isError: boolean } | null>(null);

    useEffect(() => {
        if (user) {
            getInstituteGroups(user.uid).then(data => {
                setGroups(data);
                if (data.length > 0) setActiveGroupId(data[0].id);
                else setActiveGroupId('');
            });
        }
    }, [user]);

    function handlePreview() {
        setUploadStatus(null);
        if (!csvText.trim()) return;

        try {
            const lines = csvText.split('\n').filter(l => l.trim().length > 0);
            const students = lines.map(line => {
                const parts = line.split(',');
                return {
                    name: parts[0]?.trim() || 'Unknown',
                    rollNumber: parts[1]?.trim() || 'N/A'
                };
            });

            if (students.length === 0) {
                throw new Error("No valid student data found in text.");
            }

            setPreviewStudents(students);
        } catch (e: any) {
            console.error(e);
            setUploadStatus({ message: e.message || "Failed to parse CSV.", isError: true });
        }
    }

    async function handleConfirmUpload() {
        if (!user || !activeGroupId || !previewStudents) return;

        setIsUploading(true);
        setUploadStatus(null);

        try {
            await uploadRoster(user.uid, activeGroupId, previewStudents);

            setUploadStatus({ message: `Successfully uploaded ${previewStudents.length} students to the roster!`, isError: false });
            setCsvText('');
            setPreviewStudents(null);
        } catch (e: any) {
            console.error(e);
            setUploadStatus({ message: e.message || "Failed to upload roster.", isError: true });
        }

        setIsUploading(false);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Student Roster</h1>
                <p className="text-gray-500 mt-1">Pre-authorize students to join your classes by uploading their details.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <div className="max-w-md mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Target Class / Group</label>
                    <select
                        value={activeGroupId}
                        onChange={(e) => setActiveGroupId(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm bg-white"
                        disabled={groups.length === 0 || previewStudents !== null}
                    >
                        {groups.length === 0 && <option value="">-- No Groups Available --</option>}
                        {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    {!previewStudents ? (
                        <>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Bulk Upload via CSV format</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Paste your student list below. Format each line as: <strong className="font-mono bg-gray-100 px-1 py-0.5 rounded">Student Name, Roll Number</strong>
                            </p>

                            <div className="mb-4">
                                <textarea
                                    value={csvText}
                                    onChange={(e) => setCsvText(e.target.value)}
                                    placeholder="John Doe, 10A-24&#10;Jane Smith, 10A-25"
                                    className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm shadow-inner focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {uploadStatus && !previewStudents && (
                                <div className={`p-4 mb-4 rounded-lg text-sm font-medium ${uploadStatus.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                    {uploadStatus.message}
                                </div>
                            )}

                            <button
                                onClick={handlePreview}
                                disabled={!activeGroupId || !csvText.trim()}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                Preview Roster
                            </button>
                        </>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Preview Roster</h2>
                                    <p className="text-sm text-gray-500">Please review the parsed data before confirming.</p>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {previewStudents.length} Students
                                </span>
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                                <div className="max-h-64 overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">#</th>
                                                <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                                                <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Roll Number</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {previewStudents.map((student, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-6 py-3 whitespace-nowrap text-gray-500 font-mono">{idx + 1}</td>
                                                    <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{student.name}</td>
                                                    <td className="px-6 py-3 whitespace-nowrap text-gray-500 font-mono">{student.rollNumber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {uploadStatus && (
                                <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${uploadStatus.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                    {uploadStatus.message}
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={handleConfirmUpload}
                                    disabled={isUploading}
                                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Uploading...
                                        </>
                                    ) : 'Confirm & Upload'}
                                </button>
                                <button
                                    onClick={() => { setPreviewStudents(null); setUploadStatus(null); }}
                                    disabled={isUploading}
                                    className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
