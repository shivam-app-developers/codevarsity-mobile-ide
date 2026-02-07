import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description: 'CodeVarsity Terms of Service. Read our terms for using the platform, purchases, intellectual property, and user responsibilities.',
  path: '/terms',
  type: 'website',
});

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                <p className="text-gray-500 mb-8">Last updated: January 17, 2026</p>

                <div className="prose prose-gray max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 mb-4">
                            By accessing or using CodeVarsity (&quot;the Service&quot;), provided by Shivam App Studio (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
                            you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                        <p className="text-gray-600 mb-4">
                            CodeVarsity is a mobile coding IDE and learning platform that provides:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Offline code editors for Python, Java, Go, C, and web technologies</li>
                            <li>Interactive programming courses and tutorials</li>
                            <li>Code visualization tools for learning</li>
                            <li>Practice exercises and coding challenges</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                        <p className="text-gray-600 mb-4">
                            To access certain features, you must create an account. You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized use</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Purchases and Payments</h2>
                        <p className="text-gray-600 mb-4">
                            Certain features require payment. By making a purchase, you agree that:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>You are authorized to use the payment method provided</li>
                            <li>All payment information is accurate and complete</li>
                            <li>Prices are subject to change without notice</li>
                            <li>Digital products are non-refundable except as specified in our <Link href="/refund" className="text-brand-primary hover:underline">Refund Policy</Link></li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                        <p className="text-gray-600 mb-4">
                            All content, including courses, code, graphics, and trademarks, is owned by Shivam App Studio
                            and protected by intellectual property laws. You may not reproduce, distribute, or create
                            derivative works without explicit permission.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. Prohibited Conduct</h2>
                        <p className="text-gray-600 mb-4">You agree not to:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Share your account credentials with others</li>
                            <li>Attempt to reverse engineer the application</li>
                            <li>Use the Service for any illegal purpose</li>
                            <li>Redistribute or resell course content</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                        <p className="text-gray-600 mb-4">
                            The Service is provided &quot;as is&quot; without warranties of any kind. We shall not be liable
                            for any indirect, incidental, or consequential damages arising from your use of the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
                        <p className="text-gray-600 mb-4">
                            We reserve the right to modify these terms at any time. Continued use of the Service
                            after changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">9. Contact</h2>
                        <p className="text-gray-600 mb-4">
                            For questions about these Terms, please contact us at{' '}
                            <a href="mailto:support@shivamappstudio.com" className="text-brand-primary hover:underline">
                                support@shivamappstudio.com
                            </a>
                        </p>
                    </section>
                </div>

            </main>
            <Footer />
        </div>
    );
}

