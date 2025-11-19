'use client';

import { useState, useMemo } from 'react';
import { FiSearch, FiHelpCircle, FiMail } from 'react-icons/fi';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FAQList } from '@/components/FAQAccordion';
import {
  faqCategories,
  getAllFAQs,
  getFAQsByCategory,
  searchFAQs,
  type FAQCategory,
} from '@/data/faqs';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    FAQCategory | '전체'
  >('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedFAQs = useMemo(() => {
    let faqs = getAllFAQs();

    // Apply category filter
    if (selectedCategory !== '전체') {
      faqs = getFAQsByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      faqs = searchFAQs(searchQuery).filter((faq) =>
        selectedCategory === '전체' ? true : faq.category === selectedCategory
      );
    }

    return faqs;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-cream/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-secondary via-secondary/90 to-primary-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FiHelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">자주 묻는 질문</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              무엇을 도와드릴까요?
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Enjoy Mozart 서비스 이용에 대한 궁금한 점들을 모았습니다.
              <br />
              원하시는 답변을 찾아보세요.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="궁금한 내용을 검색해보세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-6 rounded-full bg-white/95 backdrop-blur-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-elevated"
                />
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-400" />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <div>
                <div className="text-3xl font-bold font-serif">
                  {getAllFAQs().length}+
                </div>
                <div className="text-sm text-white/70 mt-1">질문과 답변</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold font-serif">
                  {faqCategories.length}
                </div>
                <div className="text-sm text-white/70 mt-1">카테고리</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold font-serif">24/7</div>
                <div className="text-sm text-white/70 mt-1">언제든지</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-lg border-b border-primary-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('전체')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === '전체'
                    ? 'bg-gradient-to-r from-secondary to-secondary/80 text-white shadow-md'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                }`}
              >
                전체
              </button>
              {faqCategories.map((category) => {
                const count = getFAQsByCategory(category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-secondary to-secondary/80 text-white shadow-md'
                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                    }`}
                  >
                    {category}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        selectedCategory === category
                          ? 'bg-white/20'
                          : 'bg-primary-200'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-900">
                {selectedCategory === '전체' ? '전체 질문' : selectedCategory}
              </h2>
              <p className="text-primary-600 mt-2">
                {displayedFAQs.length}개의 질문
                {searchQuery && ` (검색: "${searchQuery}")`}
              </p>
            </div>

            {/* FAQ Items */}
            <FAQList faqs={displayedFAQs} allowMultiple={false} />
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-cream via-ivory to-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-secondary via-secondary/90 to-primary-900 rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-elevated">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                  <FiMail className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-3xl font-bold mb-4">
                  찾으시는 답변이 없으신가요?
                </h3>

                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  더 궁금하신 사항이 있으시면 언제든지 문의해주세요.
                  <br />
                  친절하게 답변해드리겠습니다.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:support@enjoymozart.com"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary rounded-full font-medium hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <FiMail className="w-5 h-5" />
                    이메일 문의하기
                  </a>
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/20">
                    고객센터 바로가기
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-white/70">
                    평일 10:00 - 18:00 (주말 및 공휴일 휴무)
                    <br />
                    이메일: support@enjoymozart.com | 전화: 02-1234-5678
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
