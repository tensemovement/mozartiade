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
  catalogNumber?: string; // K. number
  genre?: string;
  youtubeUrl?: string;
  sheetMusicUrl?: string;
  compositionDetails?: string;
  highlight?: boolean;
  image?: string;
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

  // UI
  highlight?: boolean;
  image?: string;
}
