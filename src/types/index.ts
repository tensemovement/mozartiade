/**
 * Common type definitions
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Work (작품) types
 */
export interface Work {
  id: string;
  year: number;
  month?: number;
  day?: number;
  title: string;
  titleEn?: string; // English title
  description: string;
  catalogNumber?: string; // K. number (e.g., "K. 525", "K. 297b")
  catalogNumberNumeric?: number; // Numeric part of K. number for sorting (e.g., 525, 297)
  catalogNumberSuffix?: string; // Suffix part of K. number (e.g., "", "b")
  genre?: string;
  youtubeUrl?: string;
  sheetMusicUrl?: string;
  compositionDetails?: string;
  highlight?: boolean;
  image?: string;
  voteCount?: number; // 투표/좋아요 수

  // 상세 페이지용 추가 정보
  detailImage?: string; // 상세 페이지 배경 이미지
  behindStory?: string; // 비하인드 스토리
  usageExamples?: string[]; // 활용 사례 (공연, 이벤트 등)
  movements?: Movement[]; // 악장 목록
}

/**
 * Movement (악장) types
 */
export interface Movement {
  id: string;
  order: number; // 순서
  title: string;
  titleEn?: string;
  character?: string; // 등장인물
  description: string;
  youtubeUrl?: string;
  duration?: string; // 재생 시간
  highlights?: string; // 하이라이트/특징
}

/**
 * Chronology & Timeline types
 */
export type ChronologyItemType = 'life' | 'work';

export interface ChronologyItem {
  id: string;
  type: ChronologyItemType;
  year: number;
  month?: number;
  day?: number;
  title: string;
  titleEn?: string; // English title for works
  description: string;
  location?: string;

  // For works
  catalogNumber?: string; // K. number
  genre?: string;
  youtubeUrl?: string;
  sheetMusicUrl?: string;
  compositionDetails?: string;
  voteCount?: number; // 투표/좋아요 수

  // UI
  highlight?: boolean;
  image?: string;
}
