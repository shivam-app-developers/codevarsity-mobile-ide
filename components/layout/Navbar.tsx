'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/auth';
import { SearchBox } from '@/components/search/SearchBox';

export default function Navbar() {
  const { user, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Courses', href: '/#courses' },
    { label: 'Visualizers', href: '/#visualizers' },
    { label: 'Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur border-b border-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center relative">
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group flex-shrink min-w-0">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-2 bg-brand-primary/5 rounded-lg blur group-hover:bg-brand-primary/10 transition-colors"></div>
            <img
              src="/assets/logo-brand.png"
              alt="CodeVarsity - Professional Mobile IDE"
              className="w-10 h-10 relative z-10 drop-shadow-sm"
            />
          </div>
          <div className="block truncate">
            <span className="block font-black text-xl text-brand-primary tracking-tight leading-none mb-0.5 truncate">CodeVarsity</span>
            <span className="block text-[8px] font-black text-brand-primary/60 uppercase tracking-[0.2em] truncate">Institutional IDE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-brand-primary transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Search Box (Desktop) */}
        <div className="hidden lg:flex mx-6 flex-shrink-0">
          <SearchBox />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all flex-shrink-0 z-20"
          aria-label="Toggle mobile menu"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-gray-700 text-lg`}></i>
        </button>

        <div className="hidden md:flex items-center gap-3">
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
            null
          )}

          <a href="https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="gradient-bg text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            Get App
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg transition"
            >
              {link.label}
            </a>
          ))}

          <div className="border-t border-gray-100 pt-3 mt-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mx-4 mb-2"></div>
            ) : user ? (
              <>
                <div className="px-4 py-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <i className="fa-solid fa-book w-4 mr-2"></i>My Courses
                </Link>
                <Link
                  href={`/profile/${btoa(user.uid)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <i className="fa-solid fa-chart-simple w-4 mr-2"></i>Profile Stats
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <i className="fa-solid fa-right-from-bracket w-4 mr-2"></i>Sign Out
                </button>
              </>
            ) : (
              null
            )}
          </div>

          <a
            href="https://play.google.com/store/apps/details?id=com.shivam_app_studio.codelab&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 gradient-bg text-white rounded-lg text-sm font-medium text-center hover:opacity-90"
          >
            Get App
          </a>
        </div>
      )}
    </nav>
  );
}
