export interface Video {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  thumbnail: string;
  duration: string;
  year?: number;
  category: string;
  videoUrl?: string;
  artist?: string;
  views?: number;
}

export const videoCategories = [
  { id: 'featured', label: '주요 영상' },
  { id: 'opera', label: '오페라' },
  { id: 'symphony', label: '교향곡' },
  { id: 'concerto', label: '협주곡' },
  { id: 'chamber', label: '실내악' },
  { id: 'documentary', label: '다큐멘터리' },
];

export const videosData: Video[] = [
  // Featured - Amadeus
  {
    id: 'amadeus-1',
    title: '아마데우스',
    titleEn: 'Amadeus',
    description: '밀로시 포먼 감독의 불멸의 걸작. 모차르트의 천재성과 살리에리의 질투를 그린 영화의 역사에 길이 남을 명작입니다.',
    thumbnail: '/images/o/amadeus001.jpg',
    duration: '2:40:00',
    year: 1984,
    category: 'featured',
    artist: '밀로시 포먼',
    views: 1250000,
  },
  {
    id: 'amadeus-2',
    title: '아마데우스 - 감독판',
    titleEn: "Amadeus - Director's Cut",
    description: '20분의 추가 장면이 포함된 감독판. 모차르트의 삶과 음악을 더욱 깊이 있게 경험할 수 있습니다.',
    thumbnail: '/images/o/amadeus001.jpg',
    duration: '3:00:00',
    year: 2002,
    category: 'featured',
    artist: '밀로시 포먼',
    views: 850000,
  },

  // Opera
  {
    id: 'opera-1',
    title: '마술피리',
    titleEn: 'Die Zauberflöte',
    description: '모차르트의 마지막 오페라. 환상적인 이야기와 아름다운 아리아가 어우러진 걸작.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '2:45:00',
    year: 1791,
    category: 'opera',
    artist: '베를린 필하모닉',
    views: 520000,
  },
  {
    id: 'opera-2',
    title: '돈 조반니',
    titleEn: 'Don Giovanni',
    description: '방탕한 귀족 돈 후안의 이야기를 그린 오페라의 걸작. 드라마와 음악의 완벽한 조화.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '2:55:00',
    year: 1787,
    category: 'opera',
    artist: '메트로폴리탄 오페라',
    views: 480000,
  },
  {
    id: 'opera-3',
    title: '피가로의 결혼',
    titleEn: 'Le nozze di Figaro',
    description: '계급과 사랑을 다룬 희극 오페라. 모차르트의 천재적인 음악성이 빛나는 작품.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '3:10:00',
    year: 1786,
    category: 'opera',
    artist: '로열 오페라 하우스',
    views: 620000,
  },
  {
    id: 'opera-4',
    title: '코지 판 투테',
    titleEn: 'Così fan tutte',
    description: '사랑과 배신을 다룬 오페라 부파. 모차르트의 섬세한 심리 묘사가 돋보입니다.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '3:00:00',
    year: 1790,
    category: 'opera',
    artist: '빈 슈타츠오퍼',
    views: 380000,
  },

  // Symphony
  {
    id: 'symphony-1',
    title: '교향곡 40번 G단조',
    titleEn: 'Symphony No.40 in G minor, K.550',
    description: '모차르트의 가장 유명한 교향곡 중 하나. 극적이고 정열적인 선율이 인상적입니다.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '33:00',
    year: 1788,
    category: 'symphony',
    artist: '카라얀 & 베를린 필',
    views: 980000,
  },
  {
    id: 'symphony-2',
    title: '교향곡 41번 C장조 "주피터"',
    titleEn: 'Symphony No.41 in C major, K.551 "Jupiter"',
    description: '모차르트 최후의 교향곡. 웅장하고 장엄한 피날레가 압권입니다.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '35:00',
    year: 1788,
    category: 'symphony',
    artist: '번스타인 & 빈 필',
    views: 750000,
  },
  {
    id: 'symphony-3',
    title: '교향곡 25번 G단조',
    titleEn: 'Symphony No.25 in G minor, K.183',
    description: '17세 모차르트가 작곡한 극적인 교향곡. 영화 아마데우스의 오프닝 곡.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '25:00',
    year: 1773,
    category: 'symphony',
    artist: '빈 필하모닉',
    views: 540000,
  },
  {
    id: 'symphony-4',
    title: '교향곡 39번 E♭장조',
    titleEn: 'Symphony No.39 in E♭ major, K.543',
    description: '모차르트 후기 3대 교향곡 중 첫 번째. 우아하고 품격 있는 작품.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '30:00',
    year: 1788,
    category: 'symphony',
    artist: '아바도 & 베를린 필',
    views: 420000,
  },

  // Concerto
  {
    id: 'concerto-1',
    title: '피아노 협주곡 21번 C장조',
    titleEn: 'Piano Concerto No.21 in C major, K.467',
    description: '아름다운 2악장 "안단테"로 유명한 협주곡. 영화 엘비라 마디간의 배경음악.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '32:00',
    year: 1785,
    category: 'concerto',
    artist: '마리아 주앙 피레스',
    views: 890000,
  },
  {
    id: 'concerto-2',
    title: '피아노 협주곡 20번 D단조',
    titleEn: 'Piano Concerto No.20 in D minor, K.466',
    description: '극적이고 낭만적인 협주곡. 베토벤이 가장 좋아했던 모차르트 작품.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '34:00',
    year: 1785,
    category: 'concerto',
    artist: '마우리치오 폴리니',
    views: 670000,
  },
  {
    id: 'concerto-3',
    title: '클라리넷 협주곡 A장조',
    titleEn: 'Clarinet Concerto in A major, K.622',
    description: '모차르트가 남긴 마지막 협주곡. 클라리넷의 아름다운 음색이 빛나는 명곡.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '28:00',
    year: 1791,
    category: 'concerto',
    artist: '자비네 마이어',
    views: 560000,
  },
  {
    id: 'concerto-4',
    title: '바이올린 협주곡 3번 G장조',
    titleEn: 'Violin Concerto No.3 in G major, K.216',
    description: '우아하고 서정적인 바이올린 협주곡. 모차르트 19세 때의 작품.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '26:00',
    year: 1775,
    category: 'concerto',
    artist: '안네 소피 무터',
    views: 440000,
  },

  // Chamber Music
  {
    id: 'chamber-1',
    title: '현악 4중주 19번 C장조 "불협화음"',
    titleEn: 'String Quartet No.19 in C major, K.465 "Dissonance"',
    description: '충격적인 서주로 유명한 현악 4중주. 하이든에게 헌정된 6개의 4중주 중 마지막 작품.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '32:00',
    year: 1785,
    category: 'chamber',
    artist: '알반 베르크 4중주단',
    views: 320000,
  },
  {
    id: 'chamber-2',
    title: '클라리넷 5중주 A장조',
    titleEn: 'Clarinet Quintet in A major, K.581',
    description: '클라리넷과 현악 4중주를 위한 아름다운 실내악. 슈타들러에게 헌정.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '33:00',
    year: 1789,
    category: 'chamber',
    artist: '에머슨 현악 4중주단',
    views: 280000,
  },
  {
    id: 'chamber-3',
    title: '피아노 4중주 1번 G단조',
    titleEn: 'Piano Quartet No.1 in G minor, K.478',
    description: '극적이고 낭만적인 피아노 4중주. 모차르트 실내악의 걸작.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '28:00',
    year: 1785,
    category: 'chamber',
    artist: '보자르 트리오',
    views: 240000,
  },
  {
    id: 'chamber-4',
    title: '아이네 클라이네 나흐트무지크',
    titleEn: 'Eine kleine Nachtmusik, K.525',
    description: '모차르트의 가장 유명한 세레나데. 경쾌하고 우아한 선율로 사랑받는 명곡.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '18:00',
    year: 1787,
    category: 'chamber',
    artist: '빈 필하모닉',
    views: 1450000,
  },

  // Documentary
  {
    id: 'doc-1',
    title: '모차르트의 생애와 음악',
    titleEn: "Mozart's Life and Music",
    description: '천재 음악가의 삶을 조명하는 다큐멘터리. 음악과 함께 모차르트의 여정을 따라갑니다.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '58:00',
    year: 2020,
    category: 'documentary',
    artist: 'BBC',
    views: 680000,
  },
  {
    id: 'doc-2',
    title: '모차르트 탄생 250주년 특집',
    titleEn: 'Mozart 250th Anniversary Special',
    description: '2006년 모차르트 탄생 250주년을 기념하는 특별 다큐멘터리.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '1:30:00',
    year: 2006,
    category: 'documentary',
    artist: 'EuroArts',
    views: 420000,
  },
  {
    id: 'doc-3',
    title: '잘츠부르크: 모차르트의 고향',
    titleEn: 'Salzburg: Mozart\'s Hometown',
    description: '모차르트가 태어나고 자란 잘츠부르크의 아름다운 풍경과 역사를 탐험합니다.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '45:00',
    year: 2018,
    category: 'documentary',
    artist: 'DW Documentary',
    views: 320000,
  },
  {
    id: 'doc-4',
    title: '모차르트: 천재의 비밀',
    titleEn: 'Mozart: The Genius Revealed',
    description: '최신 연구를 바탕으로 모차르트의 천재성을 과학적으로 분석합니다.',
    thumbnail: '/images/m/mozart002.jpg',
    duration: '52:00',
    year: 2019,
    category: 'documentary',
    artist: 'National Geographic',
    views: 590000,
  },
];

// Helper function to get videos by category
export function getVideosByCategory(categoryId: string): Video[] {
  if (categoryId === 'all') {
    return videosData;
  }
  return videosData.filter((video) => video.category === categoryId);
}

// Helper function to get featured video (Amadeus)
export function getFeaturedVideo(): Video {
  return videosData[0]; // Amadeus
}
