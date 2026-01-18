'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface SearchResult {
  type: 'blog' | 'doc';
  title: string;
  description: string;
  slug: string;
  url: string;
}

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    async function performSearch() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [debouncedQuery]);

  const handleSelectResult = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value) setIsOpen(true);
          }}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search blog, docs..."
          className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-brand-primary"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <Link
                  key={result.url}
                  href={result.url}
                  onClick={handleSelectResult}
                  className="block px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          result.type === 'blog'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {result.type === 'blog' ? 'Blog' : 'Doc'}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 truncate">{result.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{result.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query && !isLoading ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
