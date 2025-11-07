'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { chronologyData } from '@/data/chronology';
import { ChronologyItem } from '@/types';

export default function ChronologyPage() {
  const [selectedItem, setSelectedItem] = useState<ChronologyItem | null>(null);

  const getDateString = (item: ChronologyItem) => {
    if (item.day && item.month) {
      return `${item.year}.${String(item.month).padStart(2, '0')}.${String(item.day).padStart(2, '0')}`;
    } else if (item.month) {
      return `${item.year}.${String(item.month).padStart(2, '0')}`;
    }
    return `${item.year}`;
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm text-primary-600 rounded-full font-sans text-sm font-bold mb-6 shadow-md">
              1756 — 1791
            </span>
            <h1 className="font-serif text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              모차르트 연대기
            </h1>
            <p className="font-sans text-xl text-gray-600 leading-relaxed">
              35년의 짧은 생애 동안 626개의 불멸의 작품을 남긴 천재.
              <br />
              그의 발자취를 따라 역사를 여행하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-24 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"></div>

              {/* Timeline items */}
              <div className="space-y-0">
                {chronologyData.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative pl-40 pb-16 group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Year badge */}
                    <div className="absolute left-0 top-0 w-20 text-right">
                      <div className={`inline-block px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                        item.highlight
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.year}
                      </div>
                    </div>

                    {/* Dot on line */}
                    <div className="absolute left-24 top-2 -translate-x-1/2">
                      <div className={`w-3 h-3 rounded-full transition-all ${
                        item.highlight
                          ? 'bg-primary-500 shadow-lg shadow-primary-300 scale-125'
                          : 'bg-gray-300 group-hover:bg-primary-400'
                      }`}></div>
                      {item.highlight && (
                        <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-75"></div>
                      )}
                    </div>

                    {/* Content card */}
                    <div className={`relative rounded-2xl p-6 transition-all duration-300 ${
                      item.type === 'work'
                        ? 'bg-gradient-to-br from-secondary-50 to-secondary-100/50 border-2 border-secondary-200 hover:border-secondary-400 hover:shadow-xl'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100/50 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl'
                    } group-hover:-translate-y-1`}>
                      {/* Type badge */}
                      <div className="flex items-center gap-2 mb-3">
                        {item.type === 'work' ? (
                          <div className="flex items-center gap-2 px-3 py-1 bg-secondary-500 text-white rounded-full text-xs font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                            작품
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1 bg-primary-500 text-white rounded-full text-xs font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            생애
                          </div>
                        )}
                        {item.catalogNumber && (
                          <span className="px-2 py-1 bg-white/80 text-gray-700 rounded text-xs font-mono font-bold">
                            {item.catalogNumber}
                          </span>
                        )}
                      </div>

                      {/* Title and description */}
                      <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm text-gray-600 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        {item.location && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {item.location}
                          </div>
                        )}
                        {item.genre && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {item.genre}
                          </div>
                        )}
                        <div className="flex items-center gap-1 ml-auto text-primary-500 font-semibold">
                          자세히 보기
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Panel */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`relative p-8 ${
              selectedItem.type === 'work'
                ? 'bg-gradient-to-br from-secondary-100 to-secondary-50'
                : 'bg-gradient-to-br from-primary-100 to-primary-50'
            }`}>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className={`px-4 py-2 rounded-xl font-mono text-sm font-bold ${
                  selectedItem.highlight
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700'
                }`}>
                  {getDateString(selectedItem)}
                </div>
                {selectedItem.catalogNumber && (
                  <div className="px-4 py-2 bg-white rounded-xl font-mono text-sm font-bold text-gray-700 shadow-md">
                    {selectedItem.catalogNumber}
                  </div>
                )}
              </div>

              <h2 className="font-serif text-4xl font-bold text-gray-900 mb-2">
                {selectedItem.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedItem.type === 'work'
                    ? 'bg-secondary-500 text-white'
                    : 'bg-primary-500 text-white'
                }`}>
                  {selectedItem.type === 'work' ? '작품' : '생애'}
                </div>
                {selectedItem.genre && (
                  <div className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-700">
                    {selectedItem.genre}
                  </div>
                )}
                {selectedItem.location && (
                  <div className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-700 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {selectedItem.location}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {selectedItem.compositionDetails && (
                <div className="mb-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    작곡 배경
                  </h3>
                  <p className="font-sans text-gray-700 leading-relaxed">
                    {selectedItem.compositionDetails}
                  </p>
                </div>
              )}

              {/* YouTube and Sheet Music */}
              {selectedItem.type === 'work' && (
                <div className="space-y-4">
                  {selectedItem.youtubeUrl && (
                    <div className="rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/50 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          <p className="text-white/70 text-sm font-sans">
                            유튜브 연동 준비 중
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedItem.sheetMusicUrl && (
                    <a
                      href={selectedItem.sheetMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-lg font-bold text-gray-900 mb-1">
                            악보 다운로드
                          </h4>
                          <p className="font-sans text-sm text-gray-600">
                            IMSLP에서 무료 악보 열람하기
                          </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              )}

              {/* Image if available */}
              {selectedItem.image && (
                <div className="mt-6 rounded-2xl overflow-hidden border-2 border-gray-200 relative aspect-video">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
