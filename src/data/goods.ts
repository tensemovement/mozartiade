export interface GoodsItem {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export const goodsCategories = [
  { id: 'all', label: '전체', emoji: '🎁' },
  { id: 'fashion', label: '패션', emoji: '👕' },
  { id: 'stationery', label: '문구', emoji: '✏️' },
  { id: 'living', label: '리빙', emoji: '🏠' },
  { id: 'accessory', label: '액세서리', emoji: '💍' },
  { id: 'toy', label: '피규어·인형', emoji: '🎭' },
  { id: 'book', label: '도서', emoji: '📚' },
];

export const goodsItems: GoodsItem[] = [
  // Fashion Items
  {
    id: 'fashion-1',
    name: '모차르트 초상화 티셔츠',
    nameEn: 'Mozart Portrait T-Shirt',
    description:
      '귀여운 일러스트로 재해석한 모차르트 초상화가 그려진 프리미엄 티셔츠. 100% 코튼 소재로 편안한 착용감을 자랑합니다.',
    price: 29000,
    originalPrice: 35000,
    thumbnail: '/images/o/goods001.png',
    category: 'fashion',
    isNew: true,
    isBestSeller: true,
    stock: 50,
    rating: 4.8,
    reviewCount: 127,
    tags: ['면100%', '유니섹스', '한정판'],
  },
  {
    id: 'fashion-2',
    name: '아이네 클라이네 나흐트무지크 후드',
    nameEn: 'Eine Kleine Nachtmusik Hoodie',
    description:
      '아이네 클라이네 나흐트무지크의 악보가 프린트된 따뜻한 후드티. 겨울철 필수 아이템!',
    price: 49000,
    thumbnail: '/images/o/goods002.png',
    category: 'fashion',
    isNew: false,
    isBestSeller: true,
    stock: 30,
    rating: 4.9,
    reviewCount: 89,
    tags: ['기모', '오버핏', '커플룩'],
  },
  {
    id: 'fashion-3',
    name: '모차르트 미니멀 에코백',
    nameEn: 'Mozart Minimal Eco Bag',
    description:
      '심플한 모차르트 실루엣이 그려진 친환경 에코백. 가볍고 튼튼해서 일상 사용에 완벽합니다.',
    price: 15000,
    thumbnail: '/images/o/goods003.png',
    category: 'fashion',
    isNew: true,
    stock: 100,
    rating: 4.6,
    reviewCount: 234,
    tags: ['친환경', '경량', '대용량'],
  },
  {
    id: 'fashion-4',
    name: '모차르트 양말 세트 (3족)',
    nameEn: 'Mozart Socks Set (3 pairs)',
    description: '음표와 모차르트 얼굴이 귀엽게 그려진 양말 3족 세트. 선물하기 좋아요!',
    price: 12000,
    thumbnail: '/images/o/goods001.png',
    category: 'fashion',
    stock: 80,
    rating: 4.7,
    reviewCount: 156,
    tags: ['3족세트', '선물추천', 'Free Size'],
  },

  // Stationery Items
  {
    id: 'stationery-1',
    name: '모차르트 오선지 노트',
    nameEn: 'Mozart Manuscript Notebook',
    description:
      '고급스러운 오선지 노트. 작곡가를 꿈꾸는 분들께 완벽한 선물입니다. 100매 구성.',
    price: 18000,
    thumbnail: '/images/o/goods002.png',
    category: 'stationery',
    isBestSeller: true,
    stock: 45,
    rating: 4.9,
    reviewCount: 312,
    tags: ['하드커버', '100매', '고급용지'],
  },
  {
    id: 'stationery-2',
    name: '모차르트 마스킹 테이프 세트',
    nameEn: 'Mozart Masking Tape Set',
    description:
      '악보, 음표, 모차르트 초상화 등 다양한 디자인의 마스킹 테이프 5종 세트.',
    price: 14000,
    thumbnail: '/images/o/goods003.png',
    category: 'stationery',
    isNew: true,
    stock: 120,
    rating: 4.8,
    reviewCount: 89,
    tags: ['5종세트', '다이어리꾸미기', '선물용'],
  },
  {
    id: 'stationery-3',
    name: '모차르트 볼펜 세트',
    nameEn: 'Mozart Ballpoint Pen Set',
    description: '고급스러운 금색 포인트의 모차르트 테마 볼펜 3종 세트. 부드러운 필기감.',
    price: 16000,
    thumbnail: '/images/o/goods001.png',
    category: 'stationery',
    stock: 60,
    rating: 4.7,
    reviewCount: 78,
    tags: ['3종세트', '0.5mm', '선물용'],
  },
  {
    id: 'stationery-4',
    name: '모차르트 스티커 팩',
    nameEn: 'Mozart Sticker Pack',
    description: '귀여운 모차르트와 음악 관련 스티커 30종이 들어있는 스티커 팩.',
    price: 8000,
    thumbnail: '/images/o/goods002.png',
    category: 'stationery',
    isNew: true,
    isBestSeller: true,
    stock: 200,
    rating: 4.9,
    reviewCount: 445,
    tags: ['30종', '방수', '다이어리용'],
  },

  // Living Items
  {
    id: 'living-1',
    name: '모차르트 머그컵',
    nameEn: 'Mozart Mug Cup',
    description:
      '아침을 우아하게 시작하는 모차르트 테마 머그컵. 전자레인지 사용 가능.',
    price: 22000,
    thumbnail: '/images/o/goods003.png',
    category: 'living',
    isBestSeller: true,
    stock: 75,
    rating: 4.8,
    reviewCount: 203,
    tags: ['350ml', '전자레인지OK', '식기세척기OK'],
  },
  {
    id: 'living-2',
    name: '모차르트 쿠션',
    nameEn: 'Mozart Cushion',
    description: '포근한 벨벳 소재의 모차르트 초상화 쿠션. 인테리어 소품으로 완벽해요.',
    price: 35000,
    thumbnail: '/images/o/goods001.png',
    category: 'living',
    isNew: true,
    stock: 40,
    rating: 4.7,
    reviewCount: 92,
    tags: ['45x45cm', '벨벳', '속통포함'],
  },
  {
    id: 'living-3',
    name: '모차르트 포스터 세트',
    nameEn: 'Mozart Poster Set',
    description: '미니멀한 디자인의 모차르트 포스터 3종 세트. A3 사이즈, 프레임 미포함.',
    price: 25000,
    thumbnail: '/images/o/goods002.png',
    category: 'living',
    stock: 55,
    rating: 4.6,
    reviewCount: 67,
    tags: ['A3', '3종세트', '고급인쇄'],
  },
  {
    id: 'living-4',
    name: '모차르트 방향제',
    nameEn: 'Mozart Room Fragrance',
    description: '우아한 라벤더 향의 모차르트 테마 디퓨저. 클래식한 디자인이 매력적이에요.',
    price: 28000,
    thumbnail: '/images/o/goods003.png',
    category: 'living',
    isNew: true,
    isBestSeller: true,
    stock: 90,
    rating: 4.9,
    reviewCount: 178,
    tags: ['라벤더향', '200ml', '2개월사용'],
  },

  // Accessory Items
  {
    id: 'accessory-1',
    name: '모차르트 북마크 세트',
    nameEn: 'Mozart Bookmark Set',
    description: '금박 장식이 들어간 고급스러운 메탈 북마크 3종 세트.',
    price: 12000,
    thumbnail: '/images/o/goods001.png',
    category: 'accessory',
    stock: 85,
    rating: 4.8,
    reviewCount: 134,
    tags: ['3종세트', '금박', '메탈'],
  },
  {
    id: 'accessory-2',
    name: '모차르트 키링',
    nameEn: 'Mozart Keyring',
    description: '귀여운 치비 스타일 모차르트 아크릴 키링. 가방에 달아보세요!',
    price: 9000,
    thumbnail: '/images/o/goods002.png',
    category: 'accessory',
    isNew: true,
    stock: 150,
    rating: 4.7,
    reviewCount: 267,
    tags: ['아크릴', '양면인쇄', '치비'],
  },
  {
    id: 'accessory-3',
    name: '모차르트 브로치',
    nameEn: 'Mozart Brooch',
    description: '우아한 모차르트 실루엣 브로치. 가방이나 옷에 포인트를 더해보세요.',
    price: 15000,
    thumbnail: '/images/o/goods003.png',
    category: 'accessory',
    isBestSeller: true,
    stock: 70,
    rating: 4.9,
    reviewCount: 95,
    tags: ['금도금', '수제', '한정판'],
  },
  {
    id: 'accessory-4',
    name: '모차르트 뱃지 세트',
    nameEn: 'Mozart Badge Set',
    description: '다양한 표정의 모차르트 뱃지 6종 세트. 귀여운 디자인이 매력적!',
    price: 10000,
    thumbnail: '/images/o/goods001.png',
    category: 'accessory',
    isNew: true,
    stock: 120,
    rating: 4.6,
    reviewCount: 189,
    tags: ['6종세트', '32mm', '안전핀'],
  },

  // Toy & Figure Items
  {
    id: 'toy-1',
    name: '모차르트 피규어',
    nameEn: 'Mozart Figure',
    description:
      '정교하게 제작된 모차르트 미니 피규어. 책상 위 인테리어로 완벽합니다. 높이 15cm.',
    price: 45000,
    originalPrice: 55000,
    thumbnail: '/images/o/goods002.png',
    category: 'toy',
    isBestSeller: true,
    stock: 25,
    rating: 4.9,
    reviewCount: 76,
    tags: ['15cm', '수제', '한정판'],
  },
  {
    id: 'toy-2',
    name: '모차르트 인형',
    nameEn: 'Mozart Plush Doll',
    description: '포근한 모차르트 인형. 아이들도 좋아하는 귀여운 디자인!',
    price: 32000,
    thumbnail: '/images/o/goods003.png',
    category: 'toy',
    isNew: true,
    isBestSeller: true,
    stock: 60,
    rating: 5.0,
    reviewCount: 234,
    tags: ['30cm', 'KC인증', '세탁가능'],
  },
  {
    id: 'toy-3',
    name: '모차르트 레고 스타일 블록',
    nameEn: 'Mozart Building Blocks',
    description: '모차르트를 만들 수 있는 미니 블록 세트. 완성 후 디스플레이 가능!',
    price: 28000,
    thumbnail: '/images/o/goods001.png',
    category: 'toy',
    stock: 40,
    rating: 4.8,
    reviewCount: 112,
    tags: ['450피스', '14세이상', '디스플레이'],
  },

  // Books
  {
    id: 'book-1',
    name: '모차르트 컬러링북',
    nameEn: 'Mozart Coloring Book',
    description: '모차르트의 생애와 음악을 컬러링으로 만나보세요. 40가지 디자인 수록.',
    price: 16000,
    thumbnail: '/images/o/goods002.png',
    category: 'book',
    isNew: true,
    stock: 95,
    rating: 4.7,
    reviewCount: 145,
    tags: ['40페이지', '고급용지', '힐링'],
  },
  {
    id: 'book-2',
    name: '모차르트 엽서북',
    nameEn: 'Mozart Postcard Book',
    description: '아름다운 모차르트 일러스트 엽서 30장이 수록된 엽서북.',
    price: 18000,
    thumbnail: '/images/o/goods003.png',
    category: 'book',
    isBestSeller: true,
    stock: 110,
    rating: 4.9,
    reviewCount: 289,
    tags: ['30장', '고급인쇄', '편지쓰기'],
  },
  {
    id: 'book-3',
    name: '모차르트 명언 노트',
    nameEn: 'Mozart Quotes Notebook',
    description: '모차르트의 명언이 담긴 고급 노트. 매일 영감을 받으세요!',
    price: 15000,
    thumbnail: '/images/o/goods001.png',
    category: 'book',
    stock: 70,
    rating: 4.8,
    reviewCount: 98,
    tags: ['하드커버', '200페이지', '영문병기'],
  },
];

// Helper functions
export function getGoodsByCategory(categoryId: string): GoodsItem[] {
  if (categoryId === 'all') {
    return goodsItems;
  }
  return goodsItems.filter((item) => item.category === categoryId);
}

export function getBestSellers(): GoodsItem[] {
  return goodsItems.filter((item) => item.isBestSeller);
}

export function getNewArrivals(): GoodsItem[] {
  return goodsItems.filter((item) => item.isNew);
}

export function getDiscountedItems(): GoodsItem[] {
  return goodsItems.filter((item) => item.originalPrice);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

export function calculateDiscount(
  price: number,
  originalPrice?: number
): number {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
