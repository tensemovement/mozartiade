export interface QuizQuestion {
  id: string;
  type: 'music' | 'trivia';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  audioUrl?: string; // For music quiz
  category?: string;
}

export const quizCategories = [
  { id: 'all', label: '전체' },
  { id: 'music', label: '음악 맞추기' },
  { id: 'life', label: '생애' },
  { id: 'works', label: '작품' },
  { id: 'trivia', label: '상식' },
];

export const quizQuestions: QuizQuestion[] = [
  // Music Recognition Quizzes
  {
    id: 'music-1',
    type: 'music',
    question: '이 음악은 모차르트의 어떤 작품일까요?',
    options: [
      '교향곡 40번 G단조',
      '아이네 클라이네 나흐트무지크',
      '피아노 협주곡 21번',
      '레퀴엠 K.626',
    ],
    correctAnswer: 1,
    explanation:
      '아이네 클라이네 나흐트무지크(Eine kleine Nachtmusik)는 모차르트의 가장 유명한 세레나데로, 1787년에 작곡되었습니다.',
    difficulty: 'easy',
    category: 'music',
  },
  {
    id: 'music-2',
    type: 'music',
    question: '다음 오페라 아리아는 어느 작품에서 나온 것일까요?',
    options: ['마술피리', '피가로의 결혼', '돈 조반니', '코지 판 투테'],
    correctAnswer: 0,
    explanation:
      '이 아리아는 모차르트의 마지막 오페라 "마술피리(Die Zauberflöte)"의 유명한 곡입니다.',
    difficulty: 'medium',
    category: 'music',
  },
  {
    id: 'music-3',
    type: 'music',
    question: '이 피아노 협주곡은 몇 번일까요?',
    options: ['20번 D단조', '21번 C장조', '23번 A장조', '27번 B♭장조'],
    correctAnswer: 1,
    explanation:
      '피아노 협주곡 21번 C장조의 2악장 안단테는 영화 "엘비라 마디간"의 배경음악으로 유명합니다.',
    difficulty: 'hard',
    category: 'music',
  },

  // Life & Biography Quizzes
  {
    id: 'life-1',
    type: 'trivia',
    question: '모차르트는 몇 세에 처음으로 작곡을 시작했을까요?',
    options: ['3세', '5세', '7세', '9세'],
    correctAnswer: 1,
    explanation:
      '모차르트는 놀랍게도 5세의 어린 나이에 처음으로 작곡을 시작했습니다. 천재 음악가의 재능이 일찍부터 발현되었죠.',
    difficulty: 'easy',
    category: 'life',
  },
  {
    id: 'life-2',
    type: 'trivia',
    question: '모차르트가 태어난 도시는 어디일까요?',
    options: ['빈', '잘츠부르크', '프라하', '뮌헨'],
    correctAnswer: 1,
    explanation:
      '모차르트는 1756년 1월 27일 오스트리아의 잘츠부르크에서 태어났습니다. 현재 그의 생가는 박물관으로 운영되고 있습니다.',
    difficulty: 'easy',
    category: 'life',
  },
  {
    id: 'life-3',
    type: 'trivia',
    question: '모차르트의 전체 이름은 무엇일까요?',
    options: [
      'Wolfgang Amadeus Mozart',
      'Wolfgang Theophilus Mozart',
      'Johannes Chrysostomus Wolfgangus Theophilus Mozart',
      'Wolfgang Gottlieb Mozart',
    ],
    correctAnswer: 2,
    explanation:
      '모차르트의 세례명은 Johannes Chrysostomus Wolfgangus Theophilus Mozart입니다. Amadeus는 Theophilus의 라틴어 번역입니다.',
    difficulty: 'hard',
    category: 'life',
  },
  {
    id: 'life-4',
    type: 'trivia',
    question: '모차르트는 몇 세에 세상을 떠났을까요?',
    options: ['28세', '31세', '35세', '40세'],
    correctAnswer: 2,
    explanation:
      '모차르트는 1791년 12월 5일, 35세의 젊은 나이에 빈에서 세상을 떠났습니다. 그의 조기 사망은 음악사의 큰 비극입니다.',
    difficulty: 'medium',
    category: 'life',
  },
  {
    id: 'life-5',
    type: 'trivia',
    question: '모차르트의 아내 이름은 무엇일까요?',
    options: [
      '콘스탄체 베버',
      '마리아 안나',
      '알로이지아 베버',
      '카타리나 카발리에리',
    ],
    correctAnswer: 0,
    explanation:
      '모차르트는 1782년 콘스탄체 베버(Constanze Weber)와 결혼했습니다. 그들 사이에는 6명의 자녀가 태어났지만 2명만 성인까지 생존했습니다.',
    difficulty: 'medium',
    category: 'life',
  },

  // Works & Compositions Quizzes
  {
    id: 'works-1',
    type: 'trivia',
    question: '모차르트가 작곡한 총 교향곡의 수는?',
    options: ['31곡', '41곡', '51곡', '61곡'],
    correctAnswer: 1,
    explanation:
      '모차르트는 총 41개의 교향곡을 작곡했습니다. 마지막 교향곡인 41번 "주피터"는 그의 최고 걸작 중 하나로 평가받습니다.',
    difficulty: 'medium',
    category: 'works',
  },
  {
    id: 'works-2',
    type: 'trivia',
    question: '모차르트의 마지막 미완성 작품은?',
    options: ['레퀴엠', '마술피리', '클라리넷 협주곡', '피아노 협주곡 27번'],
    correctAnswer: 0,
    explanation:
      '레퀴엠 K.626은 모차르트가 세상을 떠나면서 미완성으로 남겨진 작품입니다. 제자 쥐스마이어가 완성했습니다.',
    difficulty: 'easy',
    category: 'works',
  },
  {
    id: 'works-3',
    type: 'trivia',
    question: '모차르트가 작곡한 오페라가 아닌 것은?',
    options: ['마술피리', '피델리오', '돈 조반니', '피가로의 결혼'],
    correctAnswer: 1,
    explanation:
      '피델리오는 베토벤의 유일한 오페라입니다. 나머지는 모두 모차르트의 걸작 오페라들입니다.',
    difficulty: 'medium',
    category: 'works',
  },
  {
    id: 'works-4',
    type: 'trivia',
    question: '모차르트의 작품 번호 체계를 만든 사람은?',
    options: [
      '루트비히 폰 쾨헬',
      '오토 얀',
      '알프레트 아인슈타인',
      '헤르만 아베르트',
    ],
    correctAnswer: 0,
    explanation:
      '루트비히 폰 쾨헬(Ludwig von Köchel)이 1862년 모차르트의 작품 목록을 작성했으며, 이것이 현재 사용되는 K 번호(Köchel 번호)입니다.',
    difficulty: 'hard',
    category: 'works',
  },
  {
    id: 'works-5',
    type: 'trivia',
    question: '모차르트가 11세에 작곡한 오페라는?',
    options: [
      '바스티앵과 바스티엔느',
      '이도메네오',
      '후궁으로부터의 도주',
      '티토 황제의 자비',
    ],
    correctAnswer: 0,
    explanation:
      '바스티앵과 바스티엔느는 모차르트가 11세에 작곡한 징슈필(독일어 오페라)입니다.',
    difficulty: 'hard',
    category: 'works',
  },

  // General Trivia Quizzes
  {
    id: 'trivia-1',
    type: 'trivia',
    question: '영화 "아마데우스"에서 모차르트를 질투하는 인물은?',
    options: ['하이든', '살리에리', '베토벤', '글루크'],
    correctAnswer: 1,
    explanation:
      '안토니오 살리에리는 영화 "아마데우스"의 주요 인물로, 모차르트의 천재성을 질투하는 궁정 악장으로 그려집니다.',
    difficulty: 'easy',
    category: 'trivia',
  },
  {
    id: 'trivia-2',
    type: 'trivia',
    question: '모차르트가 가장 많이 작곡한 장르는?',
    options: ['오페라', '교향곡', '협주곡', '피아노 소나타'],
    correctAnswer: 2,
    explanation:
      '모차르트는 50여 개의 협주곡을 작곡했습니다. 특히 피아노 협주곡은 27곡으로 그의 중요한 유산입니다.',
    difficulty: 'medium',
    category: 'trivia',
  },
  {
    id: 'trivia-3',
    type: 'trivia',
    question: '모차르트가 프리메이슨 회원이었던 것은 사실일까요?',
    options: [
      '사실이다',
      '거짓이다',
      '일시적으로 가입했다가 탈퇴했다',
      '명예 회원이었다',
    ],
    correctAnswer: 0,
    explanation:
      '모차르트는 1784년 프리메이슨에 가입했으며, "마술피리"에는 프리메이슨의 상징과 철학이 많이 담겨 있습니다.',
    difficulty: 'medium',
    category: 'trivia',
  },
  {
    id: 'trivia-4',
    type: 'trivia',
    question: '모차르트가 가장 존경했던 작곡가는?',
    options: ['바흐', '헨델', '하이든', '비발디'],
    correctAnswer: 2,
    explanation:
      '모차르트는 요제프 하이든을 깊이 존경했으며, 하이든에게 6개의 현악 4중주를 헌정했습니다. 두 사람은 서로를 존중하는 우정을 나눴습니다.',
    difficulty: 'medium',
    category: 'trivia',
  },
  {
    id: 'trivia-5',
    type: 'trivia',
    question: '모차르트의 누나 이름은?',
    options: [
      '마리아 안나(난네를)',
      '엘리자베트',
      '요제파',
      '카타리나',
    ],
    correctAnswer: 0,
    explanation:
      '모차르트의 누나는 마리아 안나 모차르트로, 애칭은 "난네를(Nannerl)"입니다. 그녀 역시 뛰어난 음악적 재능을 가지고 있었습니다.',
    difficulty: 'hard',
    category: 'trivia',
  },
];

// Helper functions
export function getQuizzesByCategory(categoryId: string): QuizQuestion[] {
  if (categoryId === 'all') {
    return quizQuestions;
  }
  if (categoryId === 'music') {
    return quizQuestions.filter((q) => q.type === 'music');
  }
  return quizQuestions.filter((q) => q.category === categoryId);
}

export function getRandomQuizzes(count: number = 5): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getQuizzesByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard'
): QuizQuestion[] {
  return quizQuestions.filter((q) => q.difficulty === difficulty);
}
