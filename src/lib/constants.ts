/**
 * 장르 분류 상수 및 유틸리티
 */

/**
 * 장르 코드 enum
 */
export enum GenreCode {
  SYMPHONY = 'SYMPHONY',           // 교향곡
  ORCHESTRAL = 'ORCHESTRAL',       // 관현악곡
  CONCERTO = 'CONCERTO',           // 협주곡
  CHAMBER = 'CHAMBER',             // 실내악
  SOLO = 'SOLO',                   // 독주곡
  VOCAL = 'VOCAL',                 // 성악곡
  OPERA = 'OPERA',                 // 오페라
  RELIGIOUS = 'RELIGIOUS',         // 종교음악
  DANCE = 'DANCE',                 // 무곡
  OTHER = 'OTHER',                 // 기타
}

/**
 * 장르 코드와 한글 이름 매핑
 */
export const GENRE_LABELS: Record<GenreCode, string> = {
  [GenreCode.SYMPHONY]: '교향곡',
  [GenreCode.ORCHESTRAL]: '관현악곡',
  [GenreCode.CONCERTO]: '협주곡',
  [GenreCode.CHAMBER]: '실내악',
  [GenreCode.SOLO]: '독주곡',
  [GenreCode.VOCAL]: '성악곡',
  [GenreCode.OPERA]: '오페라',
  [GenreCode.RELIGIOUS]: '종교음악',
  [GenreCode.DANCE]: '무곡',
  [GenreCode.OTHER]: '기타',
};

/**
 * 장르 선택 옵션 배열 (드롭다운 등에서 사용)
 */
export const GENRE_OPTIONS = Object.entries(GENRE_LABELS).map(([code, label]) => ({
  code: code as GenreCode,
  label,
}));

/**
 * 장르 코드를 한글 레이블로 변환
 */
export function getGenreLabel(code: GenreCode | string | null | undefined): string {
  if (!code) return '';
  return GENRE_LABELS[code as GenreCode] || code;
}

/**
 * 한글 레이블을 장르 코드로 변환 (마이그레이션 및 역호환용)
 */
export function getLabelToGenreCode(label: string | null | undefined): GenreCode | null {
  if (!label) return null;

  const entry = Object.entries(GENRE_LABELS).find(([_, value]) => value === label);
  return entry ? (entry[0] as GenreCode) : null;
}
