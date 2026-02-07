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
          <Link href="/docs/getting-started/installation" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">
               <i className="fa-solid fa-rocket"></i>
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">Getting Started</h2>
             <p className="text-gray-600 text-sm">Installation guides for Android and setting up your environment.</p>
          </Link>

          <Link href="/docs/getting-started/first-program" className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
             <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">
               <i className="fa-solid fa-code"></i>
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">Your First Program</h2>
             <p className="text-gray-600 text-sm">Write and run your first program in minutes.</p>
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}

