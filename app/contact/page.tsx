'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit form');
            }

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">We&apos;re here to help with any questions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-envelope text-brand-primary"></i>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Email Support</h3>
                                    <a href="mailto:support@shivamappstudio.com" className="text-brand-primary hover:underline">
                                        support@shivamappstudio.com
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">Typical response: within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-headset text-brand-primary"></i>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Technical Support</h3>
                                    <a href="mailto:tech@shivamappstudio.com" className="text-brand-primary hover:underline">
                                        tech@shivamappstudio.com
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">For app issues and bugs</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i className="fa-solid fa-building text-brand-primary"></i>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Shivam App Studio</h3>
                                    <p className="text-gray-600">India</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-10 p-6 bg-gray-100 rounded-xl">
                            <h3 className="font-medium text-gray-900 mb-4">Helpful Links</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/faq" className="text-brand-primary hover:underline text-sm">FAQ</Link>
                                <Link href="/docs" className="text-brand-primary hover:underline text-sm">Documentation</Link>
                                <Link href="/refund" className="text-brand-primary hover:underline text-sm">Refund Policy</Link>
                                <Link href="/terms" className="text-brand-primary hover:underline text-sm">Terms of Service</Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fa-solid fa-check text-2xl text-green-600"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">We&apos;ll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-brand-primary hover:underline font-medium"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                        placeholder="Your name"
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                        placeholder="you@example.com"
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                        disabled={loading}
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing & Payments</option>
                                        <option value="refund">Refund Request</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                                        placeholder="How can we help you?"
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
