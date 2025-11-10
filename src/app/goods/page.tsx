'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  goodsItems,
  goodsCategories,
  getGoodsByCategory,
  getBestSellers,
  getNewArrivals,
  formatPrice,
  calculateDiscount,
  type GoodsItem,
} from '@/data/goods';
import {
  MdShoppingCart,
  MdFavorite,
  MdStar,
  MdLocalShipping,
  MdCardGiftcard,
  MdVerified,
} from 'react-icons/md';

export default function GoodsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (itemId: string) => {
    setCartItems((prev) => [...prev, itemId]);
    // Show a brief notification (you could add a toast here)
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/o/goods001.png"
            alt="Mozart Goods"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-50 via-pink-100/80 to-purple-100/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200/60 to-purple-200/60"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 relative z-10">
            {/* Floating emojis decoration */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-6xl animate-bounce">
              🎵
            </div>
            <div className="absolute -top-10 left-1/4 text-4xl animate-pulse">
              🎹
            </div>
            <div className="absolute -top-10 right-1/4 text-4xl animate-pulse delay-150">
              🎻
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 shadow-lg">
              <MdCardGiftcard className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-bold">모차르트 굿즈샵</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
              귀여운 모차르트
              <br />
              <span className="text-6xl md:text-8xl">굿즈 천국! ✨</span>
            </h1>

            <p className="text-xl text-purple-900 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              클래식을 사랑하는 당신을 위한 특별한 굿즈
              <br />
              일상에 모차르트의 감성을 더해보세요 💝
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                <MdLocalShipping className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-semibold text-gray-800">
                  무료배송
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                <MdCardGiftcard className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-semibold text-gray-800">
                  선물포장
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                <MdVerified className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-semibold text-gray-800">
                  정품보장
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Special Sections */}
      <section className="bg-gradient-to-b from-white to-pink-50/30 py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Best Sellers */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🏆</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">베스트셀러</h2>
                <p className="text-gray-600">가장 사랑받는 아이템</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {getBestSellers().slice(0, 4).map((item) => (
                <GoodsCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onAddToCart={() => addToCart(item.id)}
                />
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">✨</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">신상품</h2>
                <p className="text-gray-600">따끈따끈한 신제품</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {getNewArrivals().slice(0, 4).map((item) => (
                <GoodsCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onAddToCart={() => addToCart(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              카테고리별 쇼핑 🛍️
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {goodsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{category.emoji}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* All Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {getGoodsByCategory(activeCategory).map((item) => (
              <GoodsCard
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onAddToCart={() => addToCart(item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Floating Button */}
      {cartItems.length > 0 && (
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40">
          <MdShoppingCart className="h-7 w-7 text-white" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {cartItems.length}
          </span>
        </button>
      )}

      <Footer />
    </>
  );
}

// Goods Card Component
interface GoodsCardProps {
  item: GoodsItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}

function GoodsCard({
  item,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: GoodsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = calculateDiscount(item.price, item.originalPrice);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {item.isNew && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
            NEW
          </span>
        )}
        {item.isBestSeller && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
            BEST
          </span>
        )}
        {discount > 0 && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
            {discount}%
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
      >
        <MdFavorite
          className={`h-5 w-5 ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
        <Image
          src={item.thumbnail}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-3 left-3 right-3">
            <button
              onClick={onAddToCart}
              className="w-full py-2.5 bg-white hover:bg-pink-50 text-gray-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MdShoppingCart className="h-5 w-5" />
              장바구니
            </button>
          </div>
        </div>

        {/* Stock Warning */}
        {item.stock < 10 && item.stock > 0 && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            {item.stock}개 남음
          </div>
        )}
        {item.stock === 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="px-4 py-2 bg-gray-800 text-white font-bold rounded-lg">
              품절
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-gray-900 font-bold text-sm md:text-base mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-pink-600 transition-colors">
          {item.name}
        </h3>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1 mb-2">
            <MdStar className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {item.rating}
            </span>
            {item.reviewCount && (
              <span className="text-xs text-gray-500">
                ({item.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-3">
          {item.originalPrice && (
            <div className="text-xs text-gray-400 line-through mb-1">
              {formatPrice(item.originalPrice)}원
            </div>
          )}
          <div className="flex items-baseline gap-1">
            {discount > 0 && (
              <span className="text-red-500 font-bold text-sm">
                {discount}%
              </span>
            )}
            <span className="text-gray-900 font-bold text-lg">
              {formatPrice(item.price)}원
            </span>
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
