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
  | '연대기'
  | '퀴즈'
  | '영상'
  | '공연'
  | '굿즈';

export const faqCategories: FAQCategory[] = [
  '일반',
  '작품',
  '연대기',
  '퀴즈',
  '영상',
  '공연',
  '굿즈',
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

  // 퀴즈
  {
    id: 'quiz-1',
    category: '퀴즈',
    question: '퀴즈는 어떻게 플레이하나요?',
    answer: '퀴즈 페이지에서 원하는 카테고리(음악, 생애, 작품, 트리비아)를 선택하거나 "랜덤 퀴즈"를 시작할 수 있습니다. 각 퀴즈는 5문제로 구성되며, 객관식 답안 중 하나를 선택하면 즉시 정답 여부와 해설을 확인할 수 있습니다.',
    order: 1,
  },
  {
    id: 'quiz-2',
    category: '퀴즈',
    question: '난이도는 어떻게 구분되나요?',
    answer: '퀴즈는 쉬움(Easy), 보통(Medium), 어려움(Hard) 3단계로 구분됩니다. 각 문제 카드에 난이도 뱃지가 표시되며, 카테고리별로 다양한 난이도의 문제가 섞여 있습니다.',
    order: 2,
  },
  {
    id: 'quiz-3',
    category: '퀴즈',
    question: '점수는 어떻게 계산되나요?',
    answer: '각 문제당 20점이 주어지며, 5문제 기준 최고 100점입니다. 점수에 따라 뱃지가 부여됩니다: 0-20점(초보자), 40점(학습자), 60점(애호가), 80점(전문가), 100점(마스터).',
    order: 3,
  },
  {
    id: 'quiz-4',
    category: '퀴즈',
    question: '퀴즈 기록은 저장되나요?',
    answer: '회원 로그인 시 퀴즈 기록과 최고 점수가 자동으로 저장됩니다. 마이페이지에서 카테고리별 기록과 전체 통계를 확인할 수 있습니다.',
    order: 4,
  },

  // 영상
  {
    id: 'video-1',
    category: '영상',
    question: '어떤 종류의 영상이 제공되나요?',
    answer: '오페라 전체 공연, 교향곡 연주, 협주곡, 실내악, 다큐멘터리, 마스터클래스 등 다양한 카테고리의 영상이 제공됩니다. 세계적인 오케스트라와 연주자들의 공연 실황을 감상할 수 있습니다.',
    order: 1,
  },
  {
    id: 'video-2',
    category: '영상',
    question: '영상은 무료로 시청할 수 있나요?',
    answer: '대부분의 영상은 무료로 시청 가능하며, 주로 YouTube에서 제공되는 공식 공연 영상입니다. 일부 프리미엄 콘텐츠의 경우 별도 표시가 되어 있습니다.',
    order: 2,
  },
  {
    id: 'video-3',
    category: '영상',
    question: '영상을 찾기 쉽게 정리되어 있나요?',
    answer: '네, 영상은 카테고리별로 구분되어 있으며, 각 카테고리는 가로 스크롤 방식으로 탐색할 수 있습니다. 썸네일에는 영상 길이, 조회수, 연도, 연주자 정보가 표시되어 선택에 도움을 줍니다.',
    order: 3,
  },
  {
    id: 'video-4',
    category: '영상',
    question: '특집 영상은 어떻게 선정되나요?',
    answer: '페이지 상단의 특집(Featured) 영상은 편집팀이 선정한 화제의 공연이나 특별한 의미가 있는 영상입니다. 정기적으로 업데이트되며, 시즌별 특집도 기획됩니다.',
    order: 4,
  },

  // 공연
  {
    id: 'concert-1',
    category: '공연',
    question: '공연 예매는 어떻게 하나요?',
    answer: '공연 카드에서 "예매하기" 버튼을 클릭하면 예매 페이지로 이동합니다. 날짜, 좌석, 수량을 선택한 후 결제를 진행하시면 됩니다. 회원 로그인이 필요합니다.',
    order: 1,
  },
  {
    id: 'concert-2',
    category: '공연',
    question: '예매 가능 여부는 어떻게 확인하나요?',
    answer: '각 공연 카드에 예매 상태가 표시됩니다: "예매 가능"(Available), "잔여석 적음"(Limited), "매진"(Sold Out). 잔여석이 적을 경우 남은 좌석 수도 함께 표시됩니다.',
    order: 2,
  },
  {
    id: 'concert-3',
    category: '공연',
    question: '공연 정보는 어떤 내용이 포함되나요?',
    answer: '각 공연마다 일시, 장소, 지휘자, 연주자, 프로그램, 가격, 예매 상태 등의 정보가 제공됩니다. 상세 페이지에서는 더 자세한 프로그램 노트와 연주자 소개도 확인할 수 있습니다.',
    order: 3,
  },
  {
    id: 'concert-4',
    category: '공연',
    question: '공연 카테고리는 어떻게 나뉘나요?',
    answer: '오케스트라 공연, 실내악, 독주회, 오페라, 특별 기획 공연 등으로 카테고리가 구분되어 있습니다. 카테고리 탭을 클릭하여 원하는 유형의 공연만 모아볼 수 있습니다.',
    order: 4,
  },

  // 굿즈
  {
    id: 'goods-1',
    category: '굿즈',
    question: '어떤 상품들을 판매하나요?',
    answer: 'CD/DVD, 악보, 서적, 포스터, 의류, 문구류, 홈데코, 악기 액세서리 등 모차르트와 클래식 음악을 테마로 한 다양한 상품을 판매합니다. 한정판 및 독점 상품도 정기적으로 출시됩니다.',
    order: 1,
  },
  {
    id: 'goods-2',
    category: '굿즈',
    question: '배송비와 배송 기간은 어떻게 되나요?',
    answer: '3만원 이상 구매 시 무료배송이며, 미만일 경우 3,000원의 배송비가 부과됩니다. 일반 배송은 주문 후 2-3일 소요되며, 도서산간 지역은 추가 시간이 필요할 수 있습니다.',
    order: 2,
  },
  {
    id: 'goods-3',
    category: '굿즈',
    question: '선물 포장 서비스가 제공되나요?',
    answer: '네, 대부분의 상품에 대해 무료 선물 포장 서비스를 제공합니다. 장바구니에서 선물 포장 옵션을 선택하시면 됩니다. 메시지 카드 작성도 가능합니다.',
    order: 3,
  },
  {
    id: 'goods-4',
    category: '굿즈',
    question: '재고가 없는 상품은 어떻게 구매하나요?',
    answer: '재고가 없는 상품은 "품절" 표시가 되며, "재입고 알림" 버튼을 클릭하면 재입고 시 이메일로 알림을 받을 수 있습니다. 일부 상품은 예약 주문도 가능합니다.',
    order: 4,
  },
  {
    id: 'goods-5',
    category: '굿즈',
    question: '베스트셀러와 신상품은 어디서 확인하나요?',
    answer: '굿즈 페이지 상단에 베스트셀러 4개가 별도로 표시되며, 신상품 섹션에서 최근 등록된 상품들을 확인할 수 있습니다. 각 상품에는 NEW 또는 BEST 뱃지가 표시됩니다.',
    order: 5,
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
