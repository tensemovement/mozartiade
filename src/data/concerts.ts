export interface Concert {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  thumbnail: string;
  date: string;
  time: string;
  venue: string;
  venueEn?: string;
  price: string;
  category: string;
  conductor?: string;
  performers?: string[];
  program?: string[];
  availableSeats?: number;
  totalSeats?: number;
}

export const concertCategories = [
  { id: 'featured', label: '추천 공연' },
  { id: 'opera', label: '오페라' },
  { id: 'symphony', label: '교향악' },
  { id: 'chamber', label: '실내악' },
  { id: 'recital', label: '독주회' },
];

export const concertsData: Concert[] = [
  // Featured
  {
    id: 'concert-1',
    title: '모차르트 교향곡의 밤',
    titleEn: 'Mozart Symphony Night',
    description: '모차르트 후기 3대 교향곡을 한 자리에서 감상하는 특별한 밤. 세계적인 지휘자와 오케스트라가 선사하는 감동의 무대.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-12-15',
    time: '19:30',
    venue: '예술의전당 콘서트홀',
    venueEn: 'Seoul Arts Center',
    price: '50,000원 ~ 150,000원',
    category: 'featured',
    conductor: '정명훈',
    performers: ['서울시립교향악단'],
    program: [
      '교향곡 39번 E♭장조 K.543',
      '교향곡 40번 G단조 K.550',
      '교향곡 41번 C장조 "주피터" K.551',
    ],
    availableSeats: 245,
    totalSeats: 1200,
  },
  {
    id: 'concert-2',
    title: '마술피리 오페라 공연',
    titleEn: 'Die Zauberflöte',
    description: '모차르트의 마지막 오페라이자 최고의 걸작. 환상적인 무대와 아름다운 아리아가 어우러진 감동의 무대.',
    thumbnail: '/images/o/magicflute001.jpg',
    date: '2025-12-20',
    time: '18:00',
    venue: '국립오페라단',
    venueEn: 'National Opera Company',
    price: '70,000원 ~ 200,000원',
    category: 'opera',
    conductor: '임헌정',
    performers: ['국립오페라단 합창단', '서울필하모닉오케스트라'],
    program: ['마술피리 전막 (독일어 원어, 한글 자막)'],
    availableSeats: 180,
    totalSeats: 800,
  },
  {
    id: 'concert-3',
    title: '피아노 협주곡 갈라 콘서트',
    titleEn: 'Piano Concerto Gala',
    description: '모차르트의 가장 아름다운 피아노 협주곡들을 세계적인 피아니스트의 연주로 만나보세요.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-12-10',
    time: '19:30',
    venue: '롯데콘서트홀',
    venueEn: 'Lotte Concert Hall',
    price: '60,000원 ~ 180,000원',
    category: 'symphony',
    conductor: '금난새',
    performers: ['조성진 (피아노)', 'KBS교향악단'],
    program: [
      '피아노 협주곡 20번 D단조 K.466',
      '피아노 협주곡 21번 C장조 K.467',
      '피아노 협주곡 23번 A장조 K.488',
    ],
    availableSeats: 320,
    totalSeats: 1200,
  },
  {
    id: 'concert-4',
    title: '모차르트 세레나데',
    titleEn: 'Mozart Serenade',
    description: '모차르트의 우아하고 경쾌한 세레나데 작품들을 실내악 편성으로 감상하는 특별한 시간.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-11-25',
    time: '20:00',
    venue: '세종체임버홀',
    venueEn: 'Sejong Chamber Hall',
    price: '40,000원 ~ 80,000원',
    category: 'chamber',
    performers: ['코리안심포니오케스트라 챔버 앙상블'],
    program: [
      '아이네 클라이네 나흐트무지크 K.525',
      '디베르티멘토 D장조 K.136',
      '세레나데 13번 "아이네 클라이네 나흐트무지크"',
    ],
    availableSeats: 95,
    totalSeats: 300,
  },
  {
    id: 'concert-5',
    title: '피가로의 결혼',
    titleEn: 'Le nozze di Figaro',
    description: '계급과 사랑을 다룬 모차르트의 희극 오페라 걸작. 웃음과 감동이 있는 완벽한 오페라 부파.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2026-01-05',
    time: '18:00',
    venue: 'LG아트센터',
    venueEn: 'LG Arts Center',
    price: '80,000원 ~ 220,000원',
    category: 'opera',
    conductor: '성시연',
    performers: ['빈체로 오페라단', '코리안심포니'],
    program: ['피가로의 결혼 전막 (이탈리아어 원어, 한글 자막)'],
    availableSeats: 210,
    totalSeats: 1000,
  },
  {
    id: 'concert-6',
    title: '바이올린 협주곡의 밤',
    titleEn: 'Violin Concerto Night',
    description: '모차르트의 바이올린 협주곡 전곡을 한 자리에서. 젊은 바이올리니스트의 열정적인 연주.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-11-30',
    time: '19:30',
    venue: '예술의전당 IBK챔버홀',
    venueEn: 'Seoul Arts Center IBK Chamber Hall',
    price: '45,000원 ~ 100,000원',
    category: 'recital',
    conductor: '김덕기',
    performers: ['김봄소리 (바이올린)', '프라임필하모닉오케스트라'],
    program: [
      '바이올린 협주곡 3번 G장조 K.216',
      '바이올린 협주곡 4번 D장조 K.218',
      '바이올린 협주곡 5번 A장조 K.219 "터키풍"',
    ],
    availableSeats: 150,
    totalSeats: 600,
  },
  {
    id: 'concert-7',
    title: '현악 4중주 마티네',
    titleEn: 'String Quartet Matinee',
    description: '모차르트 현악 4중주의 정수를 담은 주말 마티네 콘서트. 가까이서 듣는 실내악의 진수.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-12-07',
    time: '15:00',
    venue: '금호아트홀 연세',
    venueEn: 'Kumho Art Hall Yonsei',
    price: '30,000원 ~ 60,000원',
    category: 'chamber',
    performers: ['에스메 콰르텟'],
    program: [
      '현악 4중주 14번 G장조 K.387',
      '현악 4중주 19번 C장조 "불협화음" K.465',
    ],
    availableSeats: 85,
    totalSeats: 400,
  },
  {
    id: 'concert-8',
    title: '돈 조반니 하이라이트',
    titleEn: 'Don Giovanni Highlights',
    description: '모차르트 오페라의 걸작 돈 조반니 하이라이트 콘서트. 주요 아리아와 앙상블을 콘서트 형식으로.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2026-01-12',
    time: '19:30',
    venue: '롯데콘서트홀',
    venueEn: 'Lotte Concert Hall',
    price: '55,000원 ~ 130,000원',
    category: 'opera',
    conductor: '박은성',
    performers: ['국립합창단', '코리안챔버오케스트라'],
    program: ['돈 조반니 주요 아리아 및 앙상블'],
    availableSeats: 280,
    totalSeats: 1200,
  },
  {
    id: 'concert-9',
    title: '모차르트 관악 세레나데',
    titleEn: 'Mozart Wind Serenade',
    description: '관악기의 아름다운 하모니. 모차르트의 관악 세레나데와 디베르티멘토.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-12-03',
    time: '19:30',
    venue: '예술의전당 리사이틀홀',
    venueEn: 'Seoul Arts Center Recital Hall',
    price: '35,000원 ~ 70,000원',
    category: 'chamber',
    performers: ['서울 윈드 앙상블'],
    program: [
      '세레나데 10번 B♭장조 "그랑 파르티타" K.361',
      '디베르티멘토 E♭장조 K.166',
    ],
    availableSeats: 120,
    totalSeats: 380,
  },
  {
    id: 'concert-10',
    title: '모차르트 피아노 소나타 전곡 시리즈 I',
    titleEn: 'Mozart Piano Sonatas Complete Series I',
    description: '모차르트 피아노 소나타 전곡 연주 시리즈의 첫 번째 공연. 초기 소나타들의 매력을 발견하세요.',
    thumbnail: '/images/o/concert001.jpg',
    date: '2025-11-28',
    time: '20:00',
    venue: '금호아트홀',
    venueEn: 'Kumho Art Hall',
    price: '40,000원',
    category: 'recital',
    performers: ['손민수 (피아노)'],
    program: [
      '피아노 소나타 1번 C장조 K.279',
      '피아노 소나타 2번 F장조 K.280',
      '피아노 소나타 3번 B♭장조 K.281',
      '피아노 소나타 4번 E♭장조 K.282',
    ],
    availableSeats: 65,
    totalSeats: 350,
  },
];

// Helper function to get concerts by category
export function getConcertsByCategory(categoryId: string): Concert[] {
  if (categoryId === 'all') {
    return concertsData;
  }
  return concertsData.filter((concert) => concert.category === categoryId);
}

// Helper function to get featured concert
export function getFeaturedConcert(): Concert {
  return concertsData[0];
}

// Helper function to get upcoming concerts (sorted by date)
export function getUpcomingConcerts(): Concert[] {
  return [...concertsData].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

// Helper function to format date
export function formatConcertDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} (${weekday})`;
}

// Helper function to calculate booking status
export function getBookingStatus(concert: Concert): {
  status: 'available' | 'limited' | 'soldout';
  percentage: number;
} {
  if (!concert.availableSeats || !concert.totalSeats) {
    return { status: 'available', percentage: 100 };
  }

  const percentage = (concert.availableSeats / concert.totalSeats) * 100;

  if (percentage === 0) {
    return { status: 'soldout', percentage: 0 };
  } else if (percentage <= 20) {
    return { status: 'limited', percentage };
  } else {
    return { status: 'available', percentage };
  }
}
