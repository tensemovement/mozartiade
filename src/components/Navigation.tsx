'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '홈', href: '/' },
    { label: '카탈로그', href: '/catalog' },
    { label: '연대기', href: '/chronology' },
    { label: '작품', href: '/works' },
    { label: '악보', href: '/scores' },
    { label: '음원', href: '/audio' },
    { label: '영상', href: '/video' },
    { label: '해설', href: '/commentary' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-2xl">🎵</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-primary-900 transition-colors">
                EnjoyMozart
              </h1>
              <p className="text-xs text-primary-700 font-sans">
                완전한 카탈로그와 연대기
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg font-sans text-sm font-medium text-primary-900 hover:bg-primary-50 hover:text-primary-800 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-primary-50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="px-5 py-2 bg-primary-800 text-white rounded-lg font-sans text-sm font-semibold hover:bg-primary-900 transition-colors shadow-md hover:shadow-lg">
              시작하기
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-primary-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 rounded-lg font-sans text-sm font-medium text-primary-900 hover:bg-primary-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button className="mx-4 mt-4 px-5 py-3 bg-primary-800 text-white rounded-lg font-sans text-sm font-semibold hover:bg-primary-900 transition-colors">
                시작하기
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
