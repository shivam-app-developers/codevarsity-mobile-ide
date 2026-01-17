'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/auth';

export default function Navbar() {
  const { user, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">
            &lt;/&gt;
          </div>
          <span className="font-bold text-lg text-gray-900">CoderKit</span>
        </Link>

        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#courses" className="text-gray-600 hover:text-brand-primary">Courses</a>
          <a href="#visualizers" className="text-gray-600 hover:text-brand-primary">Visualizers</a>
          <Link href="/pricing" className="text-gray-600 hover:text-brand-primary">Pricing</Link>
          <Link href="/docs" className="text-gray-600 hover:text-brand-primary">Docs</Link>
          <Link href="/blog" className="text-gray-600 hover:text-brand-primary">Blog</Link>
          <Link href="/faq" className="text-gray-600 hover:text-brand-primary">FAQ</Link>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                )}
                <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition ${dropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900 truncate">{user.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <i className="fa-solid fa-book w-4"></i>
                    My Courses
                  </Link>
                  <Link
                    href={`/profile/${btoa(user.uid)}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <i className="fa-solid fa-chart-simple w-4"></i>
                    Profile Stats
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <i className="fa-solid fa-gear w-4"></i>
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <i className="fa-solid fa-right-from-bracket w-4"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-primary"
            >
              Sign In
            </Link>
          )}

          <Link href="#" className="gradient-bg text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            Get App
          </Link>
        </div>
      </div>
    </nav>
  );
}
