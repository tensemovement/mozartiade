'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = {
    product: [
      { label: '카탈로그', href: '/catalog' },
      { label: '연대기', href: '/chronology' },
      { label: '작품', href: '/works' },
      { label: '악보', href: '/scores' },
    ],
    resources: [
      { label: '음원 라이브러리', href: '/audio' },
      { label: '영상 아카이브', href: '/video' },
      { label: '해설 & 연구', href: '/commentary' },
      { label: 'API 문서', href: '/api-docs' },
    ],
    company: [
      { label: '소개', href: '/about' },
      { label: '팀', href: '/team' },
      { label: '블로그', href: '/blog' },
      { label: '채용', href: '/careers' },
    ],
    support: [
      { label: '고객센터', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: '이용약관', href: '/terms' },
      { label: '개인정보처리방침', href: '/privacy' },
      { label: '문의하기', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <Image
                  src="/images/logo.svg"
                  alt="EnjoyMozart Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold">EnjoyMozart</h3>
                <p className="text-xs text-primary-200">
                  완전한 카탈로그와 연대기
                </p>
              </div>
            </Link>
            <p className="font-sans text-sm text-primary-200 mb-6 max-w-sm">
              모차르트의 626개 작품을 한 곳에서 탐색하세요.
              악보, 음원, 영상, 해설까지 모든 자료를 제공합니다.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-white text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-sans font-bold text-white mb-4">제품</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
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
            <h4 className="font-sans font-bold text-white mb-4">리소스</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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
            <h4 className="font-sans font-bold text-white mb-4">회사</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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
            <h4 className="font-sans font-bold text-white mb-4">지원</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
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

        {/* Newsletter */}
        <div className="border-t border-primary-800 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="font-serif text-2xl font-bold mb-4">
              뉴스레터 구독
            </h4>
            <p className="font-sans text-sm text-primary-200 mb-6">
              새로운 콘텐츠와 이벤트 소식을 가장 먼저 받아보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-6 py-3 rounded-lg bg-primary-800 text-white placeholder-primary-400 border border-primary-700 focus:border-primary-500 focus:outline-none font-sans"
              />
              <button className="px-8 py-3 bg-white hover:bg-gray-100 text-primary-900 rounded-lg font-sans font-semibold transition-colors whitespace-nowrap shadow-lg hover:shadow-xl">
                구독하기
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-sm text-primary-300">
              © 2025 EnjoyMozart. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="font-sans text-sm text-primary-300 hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="font-sans text-sm text-primary-300 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/cookies"
                className="font-sans text-sm text-primary-300 hover:text-white transition-colors"
              >
                쿠키 정책
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
