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

/**
 * Admin types
 */
export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  admin: Omit<Admin, 'password'>;
  token: string;
}

export interface AdminCreateRequest {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}

export interface AdminUpdateRequest {
  email?: string;
  password?: string;
  name?: string;
  role?: AdminRole;
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
  compositionOrder?: number; // Order within the year for precise chronological sorting
  compositionLocation?: string; // Location where the work was composed
  title: string;
  titleEn?: string; // English title
  description: string;
  catalogNumber?: string; // K. number 6th edition (e.g., "K. 525", "K. 297b") - default display version
  catalogNumberNumeric?: number; // Numeric part of K. number for sorting (e.g., 525, 297)
  catalogNumberSuffix?: string; // Suffix part of K. number (e.g., "", "b")
  catalogNumberFirstEd?: string; // K. number original first edition (1862)
  catalogNumberNinthEd?: string; // K. number 9th edition (2024)
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
  relatedLinks?: RelatedLink[]; // 관련 링크
}

/**
 * Related Link (관련 링크) types
 */
export interface RelatedLink {
  title: string;
  url: string;
  description?: string;
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
 * Chronicle (연대기) types
 * 생애 사건과 작품 작곡을 모두 포함하는 타임라인
 */
export type ChronicleType = 'life' | 'work';

export interface Chronicle {
  id: string;
  type: ChronicleType;
  year: number;
  month?: number;
  day?: number;

  // 생애 사건 정보 (type='life'일 때만 사용)
  title?: string;
  description?: string;
  location?: string;

  // 작품 참조 (type='work'일 때만 사용)
  workId?: string;
  work?: Work; // 관계 포함 시

  // 공통 필드
  highlight?: boolean;
  image?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Chronology & Timeline types (기존 하드코딩 데이터용 - 호환성)
 */
export type ChronologyItemType = ChronicleType; // 'life' | 'work'

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
