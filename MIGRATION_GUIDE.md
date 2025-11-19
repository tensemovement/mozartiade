# Database Migration Guide

## 새로운 필드 추가 (Köchel Catalog Editions & Composition Location)

이 마이그레이션은 Work 테이블에 다음 필드들을 추가합니다:

### 추가된 필드
- `catalogNumberFirstEd` (TEXT, nullable) - 쾨헬 번호 초판 (1862)
- `catalogNumberNinthEd` (TEXT, nullable) - 쾨헬 번호 9판 (2024)
- `compositionLocation` (TEXT, nullable) - 작곡 장소

## 마이그레이션 실행 방법

### 1. Prisma Client 생성
```bash
npx prisma generate
```

### 2. 데이터베이스 마이그레이션 적용
```bash
npx prisma migrate deploy
```

또는 개발 환경에서:
```bash
npx prisma migrate dev
```

### 3. 시드 데이터 업데이트
```bash
npx tsx prisma/seed.ts
```

## 환경 변수

`.env` 파일에 다음 환경 변수가 설정되어 있어야 합니다:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/enjoymozart?schema=public"
```

## 네트워크 제한 환경에서

Prisma 엔진 다운로드가 차단된 환경에서는:

```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma migrate deploy
```

## 마이그레이션 내용

```sql
-- AlterTable
ALTER TABLE "Work" ADD COLUMN "catalogNumberFirstEd" TEXT;
ALTER TABLE "Work" ADD COLUMN "catalogNumberNinthEd" TEXT;
ALTER TABLE "Work" ADD COLUMN "compositionLocation" TEXT;
```

## 시드 데이터 정보

### 작곡 장소 (574개 작품 모두 추가됨)
- **Salzburg**: 1756-1781 시기 작품들
- **Italy/Milan**: 1769-1773 이탈리아 투어 작품들
- **Paris**: 1778년 작품들 (K.297 Paris Symphony 등)
- **Vienna**: 1781-1791 빈 시기 작품들 (후기 걸작들)
- **Prague**: K.504, K.527, K.621
- **Munich**: K.366

### 한글 제목 번역
100개 이상의 작품 제목이 영어에서 한글로 번역되었습니다.

## 검증

마이그레이션 후 다음 쿼리로 확인:

```sql
-- 새 필드 확인
SELECT "catalogNumber", "catalogNumberFirstEd", "catalogNumberNinthEd", "compositionLocation"
FROM "Work"
WHERE "catalogNumber" IN ('K. 525', 'K. 550', 'K. 626')
LIMIT 10;

-- 작곡 장소별 작품 수
SELECT "compositionLocation", COUNT(*)
FROM "Work"
WHERE "compositionLocation" IS NOT NULL
GROUP BY "compositionLocation"
ORDER BY COUNT(*) DESC;
```

## 롤백

문제가 발생한 경우:

```bash
npx prisma migrate resolve --rolled-back 20251119052500_add_catalog_editions_and_location
```

그 후 수동으로 필드 제거:

```sql
ALTER TABLE "Work" DROP COLUMN "catalogNumberFirstEd";
ALTER TABLE "Work" DROP COLUMN "catalogNumberNinthEd";
ALTER TABLE "Work" DROP COLUMN "compositionLocation";
```
