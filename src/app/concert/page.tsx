'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  concertsData,
  concertCategories,
  getFeaturedConcert,
  getConcertsByCategory,
  formatConcertDate,
  getBookingStatus,
  type Concert,
} from '@/data/concerts';
import {
  MdCalendarToday,
  MdLocationOn,
  MdAccessTime,
  MdConfirmationNumber,
  MdPerson,
  MdMusicNote,
} from 'react-icons/md';

export default function ConcertPage() {
  const featuredConcert = getFeaturedConcert();
  const [activeCategory, setActiveCategory] = useState('all');
  const bookingStatus = getBookingStatus(featuredConcert);

  return (
    <>
      <Navigation />

      {/* Hero Section - Featured Concert */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={featuredConcert.thumbnail}
            alt={featuredConcert.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-32">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold uppercase rounded">
                  추천 공연
                </span>
                <span className="text-gray-300 text-sm">클래식 콘서트</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                {featuredConcert.title}
              </h1>

              {/* Date & Venue */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <MdCalendarToday className="h-5 w-5 text-rose-400" />
                  <span>{formatConcertDate(featuredConcert.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdAccessTime className="h-5 w-5 text-rose-400" />
                  <span>{featuredConcert.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdLocationOn className="h-5 w-5 text-rose-400" />
                  <span>{featuredConcert.venue}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-2xl">
                {featuredConcert.description}
              </p>

              {/* Conductor & Performers */}
              {(featuredConcert.conductor || featuredConcert.performers) && (
                <div className="mb-6 space-y-2">
                  {featuredConcert.conductor && (
                    <div className="flex items-start gap-2 text-gray-300">
                      <MdPerson className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <span className="text-gray-400">지휘:</span>{' '}
                        {featuredConcert.conductor}
                      </span>
                    </div>
                  )}
                  {featuredConcert.performers && featuredConcert.performers.length > 0 && (
                    <div className="flex items-start gap-2 text-gray-300">
                      <MdMusicNote className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <span className="text-gray-400">연주:</span>{' '}
                        {featuredConcert.performers.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Booking Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="text-white">
                  <div className="text-sm text-gray-400 mb-1">예매 가격</div>
                  <div className="text-2xl font-bold">{featuredConcert.price}</div>
                </div>
                {bookingStatus.status === 'limited' && (
                  <div className="px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-lg">
                    좌석 {Math.round(bookingStatus.percentage)}% 남음
                  </div>
                )}
                {bookingStatus.status === 'soldout' && (
                  <div className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-lg">
                    매진
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 px-8 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={bookingStatus.status === 'soldout'}
                >
                  <MdConfirmationNumber className="h-6 w-6" />
                  {bookingStatus.status === 'soldout' ? '매진' : '예매하기'}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/30 hover:border-white/50">
                  상세 정보
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </section>

      {/* Concert Categories */}
      <section className="bg-gray-950 py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Category Tabs */}
          <div className="flex gap-6 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-rose-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              전체
            </button>
            {concertCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded font-semibold whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-rose-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Concert Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'all'
              ? concertsData
              : getConcertsByCategory(activeCategory)
            ).map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

// Concert Card Component
interface ConcertCardProps {
  concert: Concert;
}

function ConcertCard({ concert }: ConcertCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const bookingStatus = getBookingStatus(concert);

  return (
    <div
      className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={concert.thumbnail}
          alt={concert.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Status Badge */}
        {bookingStatus.status === 'soldout' && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg">
            매진
          </div>
        )}
        {bookingStatus.status === 'limited' && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg">
            마감 임박
          </div>
        )}

        {/* Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <MdConfirmationNumber className="h-5 w-5" />
              예매하기
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-rose-400 transition-colors">
          {concert.title}
        </h3>

        {/* Date & Time */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MdCalendarToday className="h-4 w-4 text-rose-400 flex-shrink-0" />
            <span>{formatConcertDate(concert.date)}</span>
            <span className="text-gray-600">•</span>
            <span>{concert.time}</span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-400">
            <MdLocationOn className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{concert.venue}</span>
          </div>
        </div>

        {/* Performers */}
        {(concert.conductor || (concert.performers && concert.performers.length > 0)) && (
          <div className="mb-4 pb-4 border-b border-gray-800">
            {concert.conductor && (
              <div className="text-sm text-gray-400 mb-1">
                <span className="text-gray-500">지휘:</span> {concert.conductor}
              </div>
            )}
            {concert.performers && concert.performers.length > 0 && (
              <div className="text-sm text-gray-400 line-clamp-1">
                <span className="text-gray-500">연주:</span>{' '}
                {concert.performers.join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Price & Booking Status */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-1">예매 가격</div>
            <div className="text-white font-bold">{concert.price}</div>
          </div>

          {concert.availableSeats !== undefined &&
            concert.totalSeats !== undefined && (
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">잔여 좌석</div>
                <div
                  className={`text-sm font-semibold ${
                    bookingStatus.status === 'soldout'
                      ? 'text-red-400'
                      : bookingStatus.status === 'limited'
                      ? 'text-amber-400'
                      : 'text-green-400'
                  }`}
                >
                  {bookingStatus.status === 'soldout'
                    ? '매진'
                    : `${concert.availableSeats}석`}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
