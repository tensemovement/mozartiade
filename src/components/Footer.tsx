'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = {
    explore: [
      { label: '작품 카탈로그', href: '/catalog' },
      { label: '연대기', href: '/chronology' },
    ],
    about: [
      { label: '프로젝트 소개', href: '/about' },
      { label: '사용 방법', href: '/guide' },
      { label: 'FAQ', href: '/faq' },
      { label: '문의하기', href: '/contact' },
    ],
    legal: [
      { label: '이용약관', href: '/terms' },
      { label: '개인정보처리방침', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <Image
                  src="/images/logo.svg"
                  alt="Mozartiade Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold">Mozartiade</h3>
                <p className="text-xs text-primary-200">
                  완전한 카탈로그와 연대기
                </p>
              </div>
            </Link>
            <p className="font-sans text-sm text-primary-200 mb-6 max-w-sm">
              모차르트의 626개 작품을 작곡 시기별, 장르별로 탐색하고
              케헬 번호로 상세 정보를 확인하세요.
            </p>
            {/* YouTube Link */}
            <a
              href="https://www.youtube.com/@EnjoyMozart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              aria-label="YouTube Channel"
            >
              <FaYoutube className="text-white text-xl" />
              <span className="font-sans text-sm font-semibold">YouTube 채널</span>
            </a>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-sans font-bold text-white mb-4">탐색</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white mb-4">정보</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <p className="font-sans text-sm text-primary-300">
              © 2025 Mozartiade. 모차르트 작품 카탈로그 & 연대기
            </p>
            <p className="font-sans text-xs text-primary-400">
              Wolfgang Amadeus Mozart (1756-1791)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
