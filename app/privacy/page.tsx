import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect your data on CoderKit. Learn about our privacy practices and your rights.',
  path: '/privacy',
  type: 'website',
});

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">Last updated: January 17, 2026</p>

                <div className="prose prose-gray max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p className="text-gray-600 mb-4">We collect information you provide directly:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Account Information:</strong> Name, email address when you sign up</li>
                            <li><strong>Payment Information:</strong> Processed securely by Cashfree; we do not store card details</li>
                            <li><strong>Usage Data:</strong> Course progress, learning statistics, time spent</li>
                            <li><strong>Device Information:</strong> Device type, operating system for app optimization</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>To provide and personalize the learning experience</li>
                            <li>To process purchases and maintain purchase history</li>
                            <li>To sync your progress across devices</li>
                            <li>To send important service updates</li>
                            <li>To improve our courses and features</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Data Storage and Security</h2>
                        <p className="text-gray-600 mb-4">
                            We use Google Firebase to securely store your data. Our security measures include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Encrypted data transmission (HTTPS)</li>
                            <li>Secure authentication via Google/GitHub OAuth</li>
                            <li>Access controls on database operations</li>
                            <li>Regular security reviews</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
                        <p className="text-gray-600 mb-4">We use the following third-party services:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Firebase:</strong> Authentication and data storage</li>
                            <li><strong>Cashfree:</strong> Payment processing</li>
                            <li><strong>Google Analytics:</strong> Usage analytics (anonymized)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                        <p className="text-gray-600 mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your account</li>
                            <li>Export your data</li>
                            <li>Opt out of marketing communications</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                        <p className="text-gray-600 mb-4">
                            We retain your data as long as your account is active. Upon account deletion,
                            we remove your personal data within 30 days, except where required by law.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
                        <p className="text-gray-600 mb-4">
                            CoderKit is not intended for children under 13. We do not knowingly collect
                            personal information from children under 13.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
                        <p className="text-gray-600 mb-4">
                            We may update this policy periodically. We will notify you of significant changes
                            via email or in-app notification.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                        <p className="text-gray-600 mb-4">
                            For privacy-related questions, contact us at{' '}
                            <a href="mailto:privacy@shivamappstudio.com" className="text-brand-primary hover:underline">
                                privacy@shivamappstudio.com
                            </a>
                            {' '}or visit our <Link href="/contact" className="text-brand-primary hover:underline">Contact page</Link>.
                        </p>
                    </section>
                </div>

            </main>
            <Footer />
        </div>
    );
}
