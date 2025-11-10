'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { videosData, videoCategories, getFeaturedVideo, getVideosByCategory } from '@/data/videos';
import { MdPlayArrow, MdInfo, MdChevronLeft, MdChevronRight, MdAdd } from 'react-icons/md';

export default function VideoPage() {
  const featuredVideo = getFeaturedVideo();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <>
      <Navigation />

      {/* Hero Section - Amadeus Featured */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={featuredVideo.thumbnail}
            alt={featuredVideo.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-32">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded">
                  Featured
                </span>
                <span className="text-gray-300 text-sm">영화</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                {featuredVideo.title}
              </h1>

              {/* Metadata */}
              <div className="flex items-center gap-3 mb-6 text-sm text-gray-300">
                <span className="text-green-400 font-semibold">98% Match</span>
                <span>{featuredVideo.year}</span>
                <span className="px-2 py-0.5 border border-gray-400 text-xs">15+</span>
                <span>{featuredVideo.duration}</span>
                <span className="px-2 py-0.5 bg-gray-800/80 text-xs">HD</span>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                {featuredVideo.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-all shadow-lg hover:scale-105">
                  <MdPlayArrow className="h-7 w-7" />
                  재생
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-700/80 text-white rounded font-semibold hover:bg-gray-600/80 transition-all backdrop-blur-sm">
                  <MdInfo className="h-6 w-6" />
                  상세 정보
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </section>

      {/* Video Categories */}
      <section className="bg-gray-950 py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Category Tabs */}
          <div className="flex gap-6 mb-12 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              전체
            </button>
            {videoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded font-semibold whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Video Rows by Category */}
          {activeCategory === 'all' ? (
            // Show all categories
            videoCategories.map((category) => {
              const categoryVideos = getVideosByCategory(category.id);
              if (categoryVideos.length === 0) return null;

              return (
                <VideoRow
                  key={category.id}
                  title={category.label}
                  videos={categoryVideos}
                />
              );
            })
          ) : (
            // Show selected category
            <VideoRow
              title={videoCategories.find((c) => c.id === activeCategory)?.label || ''}
              videos={getVideosByCategory(activeCategory)}
            />
          )}
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

// Video Row Component with Horizontal Scroll
interface VideoRowProps {
  title: string;
  videos: any[];
}

function VideoRow({ title, videos }: VideoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = rowRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 md:px-0">
        {title}
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-gray-950 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center">
              <MdChevronLeft className="h-8 w-8 text-white" />
            </div>
          </button>
        )}

        {/* Video Cards */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-0"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-gray-950 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center">
              <MdChevronRight className="h-8 w-8 text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// Video Card Component
interface VideoCardProps {
  video: any;
}

function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl group bg-gray-800">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-opacity duration-300"
        />

        {/* Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all">
              <MdPlayArrow className="h-10 w-10 text-white ml-1" />
            </div>
          </div>

          {/* Info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between mb-2">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MdPlayArrow className="h-6 w-6 text-black ml-0.5" />
              </button>
              <button className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <MdAdd className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded">
          {video.duration}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
          {video.year && <span>{video.year}</span>}
          {video.artist && (
            <>
              <span>•</span>
              <span className="line-clamp-1">{video.artist}</span>
            </>
          )}
        </div>
        {video.views && (
          <div className="text-xs text-gray-500">
            {(video.views / 1000).toFixed(0)}K views
          </div>
        )}
      </div>
    </div>
  );
}
