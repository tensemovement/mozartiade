'use client';

import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import Image from 'next/image';
import { selectedItemState, selectedMovementState } from '@/store/atoms';
import { MdSearch, MdMenu, MdClose } from 'react-icons/md';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selectedItem = useRecoilValue(selectedItemState);
  const selectedMovement = useRecoilValue(selectedMovementState);

  // 어느 패널이라도 열려있으면 true
  const isPanelOpen = selectedItem !== null || selectedMovement !== null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '홈', href: '/' },
    { label: '연대기', href: '/chronology' },
    { label: '작품', href: '/works' },
    { label: '영상', href: '/video' },
    { label: '공연', href: '/concert' },
    { label: '퀴즈', href: '/quiz' },
    { label: '굿즈', href: '/goods' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 z-50 transition-all duration-300 w-full ${
        isPanelOpen ? 'md:w-[66.666667%]' : ''
      } ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/10 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transform transition-all group-hover:scale-110 overflow-hidden ${
              isScrolled ? 'bg-white' : 'bg-white/90 backdrop-blur-sm'
            }`}>
              <Image
                src="/images/logo.svg"
                alt="EnjoyMozart Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className={`font-serif text-xl font-bold transition-colors ${
                isScrolled ? 'text-primary-900' : 'text-white drop-shadow-lg'
              }`}>
                EnjoyMozart
              </h1>
              <p className={`text-xs font-sans ${
                isScrolled ? 'text-primary-700' : 'text-white/90 drop-shadow'
              }`}>
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
                className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? 'text-primary-900 hover:bg-primary-50 hover:text-primary-800'
                    : 'text-white hover:bg-white/20 drop-shadow-md'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className={`p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'hover:bg-primary-50 text-primary-700'
                : 'hover:bg-white/20 text-white'
            }`}>
              <MdSearch className="h-5 w-5" />
            </button>
            <Link
              href="/auth"
              className={`px-5 py-2 rounded-lg font-sans text-sm font-semibold transition-all shadow-md hover:shadow-lg ${
                isScrolled
                  ? 'bg-primary-800 text-white hover:bg-primary-900'
                  : 'bg-white text-primary-900 hover:bg-cream'
              }`}
            >
              시작하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'hover:bg-primary-50' : 'hover:bg-white/20'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <MdClose className={`h-6 w-6 ${isScrolled ? 'text-primary-900' : 'text-white'}`} />
            ) : (
              <MdMenu className={`h-6 w-6 ${isScrolled ? 'text-primary-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-2 bg-white/95 backdrop-blur-md rounded-lg p-4 shadow-lg">
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
              <Link
                href="/auth"
                className="mx-4 mt-4 px-5 py-3 bg-primary-800 text-white rounded-lg font-sans text-sm font-semibold hover:bg-primary-900 transition-colors block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                시작하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
