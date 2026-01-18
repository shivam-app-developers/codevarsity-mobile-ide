'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setError(event.error);
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      setHasError(true);
      setError(new Error(event.reason));
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  if (hasError) {
    return (
      fallback || (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-bold text-red-900 mb-2">Something went wrong</h2>
          <p className="text-red-700 mb-4">{error?.message || 'An unexpected error occurred'}</p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )
    );
  }

  return children;
}
