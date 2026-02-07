import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Product',
  description: 'Learn about CodeVarsity - product overview, features, education guide, and success stories.',
  path: '/product',
  type: 'website',
});

interface ProductPage {
  title: string;
  slug: string;
  excerpt: string;
  icon: string;
}

const pages: ProductPage[] = [
  {
    title: 'Product Overview',
    slug: 'product-overview',
    excerpt: 'Discover what makes CodeVarsity the ultimate mobile coding platform.',
    icon: 'fa-box'
  },
  {
    title: 'Why CodeVarsity?',
    slug: 'why-codelab',
    excerpt: 'Understand the unique advantages and features that set us apart.',
    icon: 'fa-check-circle'
  },
  {
    title: 'Education Guide',
    slug: 'education-guide',
    excerpt: 'For educators: how to integrate CodeVarsity into your curriculum.',
    icon: 'fa-graduation-cap'
  },
  {
    title: 'Success Stories',
    slug: 'success-stories',
    excerpt: 'Real stories from learners who transformed their coding journey.',
    icon: 'fa-trophy'
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Product</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Learn more about CodeVarsity and how it can transform your coding education.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page) => (
            <Link key={page.slug} href={`/product/${page.slug}`} className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                <i className={`fa-solid ${page.icon}`}></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">{page.title}</h2>
              <p className="text-gray-600 text-sm">{page.excerpt}</p>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}
