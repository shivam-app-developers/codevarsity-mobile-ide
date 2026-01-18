'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full mb-4">
            <span className="text-6xl">⚠️</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-black text-gray-900 mb-4">Something Went Wrong</h1>
        <p className="text-xl text-gray-600 mb-8">
          We encountered an unexpected error. Our team has been notified, and we're working on a fix.
        </p>

        {/* Error Details */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-xs font-mono text-red-600 break-words">{error.message}</p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-brand-primary hover:text-brand-primary transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            If the problem persists, please{' '}
            <Link href="/contact" className="text-brand-primary hover:underline">
              contact support
            </Link>
            .
          </p>
          <p className="text-xs text-gray-500">Error ID: {error.digest || 'unknown'}</p>
        </div>
      </div>
    </div>
  );
}
