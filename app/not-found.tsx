import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-full mb-4">
              <div className="text-7xl font-black text-red-600">404</div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-black text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-brand-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Back to Home
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-brand-primary hover:text-brand-primary transition"
            >
              Browse Docs
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Looking for something?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/blog" className="text-sm text-brand-primary hover:underline">Blog</Link>
              <span className="text-gray-300">•</span>
              <Link href="/pricing" className="text-sm text-brand-primary hover:underline">Pricing</Link>
              <span className="text-gray-300">•</span>
              <Link href="/docs" className="text-sm text-brand-primary hover:underline">Docs</Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-sm text-brand-primary hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
