export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  order: number;
}

export type FAQCategory =
  | '일반'
  | '작품'
  | '연대기';

export const faqCategories: FAQCategory[] = [
  '일반',
  '작품',
  '연대기',
];

export const faqs: FAQ[] = [
  // 일반
  {
    id: 'general-1',
    category: '일반',
    question: 'Mozartiade는 어떤 서비스인가요?',
    answer: 'Mozartiade는 볼프강 아마데우스 모차르트의 생애와 작품을 종합적으로 탐색할 수 있는 디지털 플랫폼입니다. 626개의 전체 작품 목록, 생애 연대기, 비디오 라이브러리, 퀴즈, 공연 정보, 그리고 굿즈 샵까지 모차르트와 관련된 모든 것을 한 곳에서 만나보실 수 있습니다.',
    order: 1,
  },
  {
    id: 'general-2',
    category: '일반',
    question: '회원가입 없이도 서비스를 이용할 수 있나요?',
    answer: '네, 대부분의 콘텐츠는 회원가입 없이 자유롭게 이용하실 수 있습니다. 다만, 작품 투표, 퀴즈 기록 저장, 공연 예매, 굿즈 구매 등의 기능은 회원가입 후 이용 가능합니다.',
    order: 2,
  },
  {
    id: 'general-3',
    category: '일반',
    question: '모바일에서도 이용할 수 있나요?',
    answer: '네, Mozartiade는 반응형 웹 디자인으로 제작되어 PC, 태블릿, 모바일 등 모든 디바이스에서 최적화된 경험을 제공합니다.',
    order: 3,
  },
  {
    id: 'general-4',
    category: '일반',
    question: '콘텐츠는 얼마나 자주 업데이트되나요?',
    answer: '작품 정보와 연대기는 지속적으로 업데이트되며, 새로운 공연 정보와 비디오 콘텐츠는 매주 추가됩니다. 굿즈 샵의 신상품도 정기적으로 업데이트됩니다.',
    order: 4,
  },

  // 작품
  {
    id: 'works-1',
    category: '작품',
    question: '작품은 총 몇 개가 등록되어 있나요?',
    answer: '현재 모차르트의 전체 작품 626개가 쾨헬 목록(Köchel catalog)을 기준으로 등록되어 있습니다. 각 작품마다 상세 정보, 악장 구성, 유튜브 링크, 악보 등의 자료가 제공됩니다.',
    order: 1,
  },
  {
    id: 'works-2',
    category: '작품',
    question: '작품을 어떻게 검색하나요?',
    answer: '작품 페이지 상단의 검색창에서 작품 제목, 쾨헬 번호(K.번호), 또는 설명으로 검색할 수 있습니다. 예를 들어 "교향곡", "K.550", "피가로" 등으로 검색 가능합니다.',
    order: 2,
  },
  {
    id: 'works-3',
    category: '작품',
    question: '작품을 장르별로 필터링할 수 있나요?',
    answer: '네, 작품 페이지에서 장르(교향곡, 협주곡, 오페라, 실내악 등)와 악기별로 필터링할 수 있습니다. 또한 작곡 연도, 쾨헬 번호, 제목 순으로 정렬도 가능합니다.',
    order: 3,
  },
  {
    id: 'works-4',
    category: '작품',
    question: '그리드 보기와 리스트 보기의 차이는 무엇인가요?',
    answer: '그리드 보기는 작품 이미지와 주요 정보를 카드 형태로 보여주는 시각적인 방식이고, 리스트 보기는 더 많은 정보를 테이블 형식으로 간결하게 보여주는 방식입니다. 우측 상단의 아이콘으로 전환할 수 있습니다.',
    order: 4,
  },
  {
    id: 'works-5',
    category: '작품',
    question: '작품 투표 기능은 어떻게 사용하나요?',
    answer: '각 작품 카드에 표시된 투표 수는 다른 사용자들의 인기도를 나타냅니다. 작품 상세 페이지에서 하트 버튼을 클릭하여 투표할 수 있으며, 투표한 작품은 마이페이지에서 확인 가능합니다.',
    order: 5,
  },
  {
    id: 'works-6',
    category: '작품',
    question: '악보나 음원은 어디서 확인할 수 있나요?',
    answer: '작품 상세 페이지에서 유튜브 링크와 악보 다운로드 링크를 제공합니다. 일부 작품의 경우 IMSLP(국제 악보 라이브러리 프로젝트)로 연결되어 무료로 악보를 다운로드할 수 있습니다.',
    order: 6,
  },

  // 연대기
  {
    id: 'chronology-1',
    category: '연대기',
    question: '연대기 페이지는 어떤 정보를 제공하나요?',
    answer: '연대기 페이지는 모차르트의 1756년 탄생부터 1791년 사망까지 생애의 주요 사건과 작품을 시간순으로 보여줍니다. 생애 사건(이사, 여행, 중요한 만남 등)과 작품 완성 시점이 함께 표시됩니다.',
    order: 1,
  },
  {
    id: 'chronology-2',
    category: '연대기',
    question: '특정 연도의 사건만 보고 싶어요.',
    answer: '페이지 상단의 연도 필터를 사용하면 원하는 연도의 사건만 볼 수 있습니다. 좌우로 드래그하여 연도를 탐색하거나 특정 연도를 클릭하여 해당 시기로 바로 이동할 수 있습니다.',
    order: 2,
  },
  {
    id: 'chronology-3',
    category: '연대기',
    question: '생애 사건과 작품을 구분해서 볼 수 있나요?',
    answer: '네, 각 카드는 색상과 아이콘으로 구분됩니다. 생애 사건은 위치 아이콘과 함께 표시되고, 작품은 쾨헬 번호와 장르 정보가 함께 표시됩니다. 필터 기능으로 특정 유형만 선택하여 볼 수도 있습니다.',
    order: 3,
  },
  {
    id: 'chronology-4',
    category: '연대기',
    question: '하이라이트 표시는 무엇인가요?',
    answer: '특별히 중요한 작품이나 생애 사건은 하이라이트로 표시됩니다. 예를 들어 "마술피리", "레퀴엠" 같은 대표작이나 "빈으로 이주", "콘스탄체와 결혼" 같은 중요한 생애 사건이 강조 표시됩니다.',
    order: 4,
  },
];

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(category: FAQCategory): FAQ[] {
  return faqs
    .filter((faq) => faq.category === category)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get all FAQs sorted by category and order
 */
export function getAllFAQs(): FAQ[] {
  return [...faqs].sort((a, b) => {
    const categoryIndexA = faqCategories.indexOf(a.category);
    const categoryIndexB = faqCategories.indexOf(b.category);

    if (categoryIndexA !== categoryIndexB) {
      return categoryIndexA - categoryIndexB;
    }

    return a.order - b.order;
  });
}

/**
 * Search FAQs by keyword
 */
export function searchFAQs(keyword: string): FAQ[] {
  const lowerKeyword = keyword.toLowerCase().trim();

  if (!lowerKeyword) {
    return getAllFAQs();
  }

  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerKeyword) ||
      faq.answer.toLowerCase().includes(lowerKeyword)
  );
}
