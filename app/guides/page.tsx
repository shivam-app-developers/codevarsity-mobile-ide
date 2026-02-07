import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = createMetadata({
  title: 'User Guides',
  description: 'Complete guides to using CoderKit - getting started, features, IDE guide, and more.',
  path: '/guides',
  type: 'website',
});

interface Guide {
  title: string;
  slug: string;
  excerpt: string;
  icon: string;
}

const guides: Guide[] = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    excerpt: 'Start your coding journey with step-by-step setup instructions.',
    icon: 'fa-rocket'
  },
  {
    title: 'Features Overview',
    slug: 'features-overview',
    excerpt: 'Explore all the powerful features CoderKit has to offer.',
    icon: 'fa-star'
  },
  {
    title: 'IDE Guide',
    slug: 'ide-guide',
    excerpt: 'Master the integrated development environment and maximize productivity.',
    icon: 'fa-code'
  },
  {
    title: 'Learn Mode Guide',
    slug: 'learn-mode-guide',
    excerpt: 'Understand the interactive learning features and visualizers.',
    icon: 'fa-book'
  },
  {
    title: 'Supported Languages',
    slug: 'supported-languages',
    excerpt: 'Complete list of programming languages supported by CoderKit.',
    icon: 'fa-language'
  },
  {
    title: 'FAQ',
    slug: 'faq',
    excerpt: 'Frequently asked questions and troubleshooting solutions.',
    icon: 'fa-circle-question'
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">User Guides</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to get the most out of CoderKit.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                 <i className={`fa-solid ${guide.icon}`}></i>
               </div>
               <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{guide.title}</h2>
               <p className="text-gray-600 text-sm">{guide.excerpt}</p>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}
