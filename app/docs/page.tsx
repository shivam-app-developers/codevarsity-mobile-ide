import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Documentation',
  description: 'Complete guide to CodeVarsity. Learn installation, features, visualizers, profile system, and API documentation.',
  path: '/docs',
  type: 'website',
});

export default function DocsIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about CodeVarsity, from installation to advanced visualizers.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/docs/user-guides/getting-started" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">Getting Started</h2>
            <p className="text-gray-600 text-sm">Download, install, and set up your local development environment.</p>
          </Link>

          <Link href="/docs/user-guides/ide-guide" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-code"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">IDE Guide</h2>
            <p className="text-gray-600 text-sm">Master the mobile IDE, keyboard shortcuts, and workspace features.</p>
          </Link>

          <Link href="/docs/user-guides/learn-mode-guide" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">Learning Features</h2>
            <p className="text-gray-600 text-sm">Understand interactive visualizers, Ghost Code, and our pedagogy.</p>
          </Link>

          <Link href="/docs/product/product-overview" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-box"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition">Product Details</h2>
            <p className="text-gray-600 text-sm">Overview of features, architecture, and why we built CodeVarsity.</p>
          </Link>

          <Link href="/docs/product/education-guide" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-chalkboard-user"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">Education Guide</h2>
            <p className="text-gray-600 text-sm">Information for teachers and schools using CodeVarsity in class.</p>
          </Link>

          <Link href="/faq" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition">FAQ</h2>
            <p className="text-gray-600 text-sm">Frequently asked questions and technical troubleshooting.</p>
          </Link>

          <Link href="/stats-explained" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition">Understanding Stats</h2>
            <p className="text-gray-600 text-sm">Learn what your profile metrics mean and how we verify them.</p>
          </Link>

          <Link href="/docs/product/success-stories" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4 text-xl">
              <i className="fa-solid fa-award"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition">Success Stories</h2>
            <p className="text-gray-600 text-sm">Real stories from people who transformed their lives with CodeVarsity.</p>
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}

