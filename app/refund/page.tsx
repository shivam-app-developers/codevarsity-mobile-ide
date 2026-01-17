import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
                <p className="text-gray-500 mb-8">Last updated: January 17, 2026</p>

                <div className="prose prose-gray max-w-none">

                    {/* Highlight Box */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">7-Day Money-Back Guarantee</h3>
                        <p className="text-blue-800">
                            Not satisfied with your purchase? Request a full refund within 7 days for courses and
                            48 hours for subscriptions. No questions asked.
                        </p>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Purchases</h2>
                        <p className="text-gray-600 mb-4">For individual course purchases:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Refund Period:</strong> 7 days from the date of purchase</li>
                            <li><strong>Condition:</strong> Less than 30% of course content accessed</li>
                            <li><strong>Process:</strong> Contact support with your order ID</li>
                            <li><strong>Timeline:</strong> Refunds processed within 5-7 business days</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Subscriptions</h2>
                        <p className="text-gray-600 mb-4">For subscription plans:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>New Subscriptions:</strong> Full refund within 48 hours of first payment</li>
                            <li><strong>Renewals:</strong> Cancel anytime; access continues until period ends</li>
                            <li><strong>Prorated Refunds:</strong> Not available for partial periods</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Lifetime Power Pack</h2>
                        <p className="text-gray-600 mb-4">
                            One-time lifetime purchases are eligible for a full refund within <strong>14 days</strong>
                            if less than 30% of content has been accessed.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Non-Refundable Items</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Courses purchased more than 7 days ago</li>
                            <li>Courses where more than 30% of content has been accessed</li>
                            <li>Purchases made with promotional codes (unless defective)</li>
                            <li>Duplicate purchases (contact support for account credit instead)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <ol className="list-decimal pl-6 text-gray-600 space-y-3">
                                <li>Email <a href="mailto:support@shivamappstudio.com" className="text-brand-primary hover:underline">support@shivamappstudio.com</a></li>
                                <li>Include your order ID or transaction reference</li>
                                <li>Briefly state the reason for your refund request</li>
                                <li>Our team will review and respond within 24-48 hours</li>
                            </ol>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Refund Methods</h2>
                        <p className="text-gray-600 mb-4">
                            Refunds are processed to the original payment method:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                            <li><strong>UPI/Netbanking:</strong> 3-5 business days</li>
                            <li><strong>Wallet:</strong> 1-2 business days</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-4">
                            Having trouble? We&apos;re here to help.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90"
                        >
                            Contact Support
                        </Link>
                    </section>
                </div>

            </main>
            <Footer />
        </div>
    );
}
