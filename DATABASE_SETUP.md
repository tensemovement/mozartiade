# 데이터베이스 설정 가이드

## 📋 개요

모차르트 작품을 PostgreSQL 데이터베이스로 관리하기 위한 설정 가이드입니다.

## 🚀 빠른 시작

### 1. 데이터베이스 준비

두 가지 옵션이 있습니다:

#### 옵션 A: Supabase 사용 (추천)

1. [Supabase](https://supabase.com)에서 무료 프로젝트 생성
2. Settings > Database에서 Connection String 복사
3. `.env` 파일 생성 및 설정:

```bash
cp .env.example .env
```

`.env` 파일 수정:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
```

#### 옵션 B: 로컬 PostgreSQL

1. PostgreSQL 설치 및 실행
2. 데이터베이스 생성:
```bash
createdb enjoymozart
```

3. `.env` 파일 생성:
```env
DATABASE_URL="postgresql://localhost:5432/enjoymozart"
```

### 2. Prisma 설정

```bash
# Prisma Client 생성
npx prisma generate

# 마이그레이션 실행 (테이블 생성)
npx prisma migrate dev --name init

# 데이터 시드 (80개의 모차르트 작품 삽입)
npm run prisma:seed
```

### 3. 확인

```bash
# Prisma Studio로 데이터 확인
npm run prisma:studio
```

브라우저에서 http://localhost:5555 열림

---

## 📊 데이터베이스 스키마

### Work (작품)

```prisma
model Work {
  id                  String   @id @default(cuid())
  catalogNumber       String?  @unique      // K. 번호
  year                Int                   // 작곡 연도
  month               Int?                  // 작곡 월
  day                 Int?                  // 작곡 일
  title               String                // 한글 제목
  titleEn             String?               // 영문 제목
  description         String                // 설명
  genre               String?               // 장르
  youtubeUrl          String?               // YouTube URL
  sheetMusicUrl       String?               // 악보 URL (IMSLP)
  compositionDetails  String?               // 작곡 상세
  highlight           Boolean  @default(false)
  image               String?               // 이미지
  voteCount           Int      @default(0)  // 투표수

  // 상세 페이지용
  detailImage         String?               // 상세 배경 이미지
  behindStory         String?               // 비하인드 스토리
  usageExamples       String[]              // 활용 사례

  // 관계
  arias               Aria[]

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

### Aria (아리아/악장)

```prisma
model Aria {
  id          String   @id @default(cuid())
  workId      String                        // Work FK
  order       Int                            // 순서
  title       String                         // 한글 제목
  titleEn     String?                        // 영문 제목
  character   String?                        // 등장인물
  description String                         // 설명
  youtubeUrl  String?                        // YouTube URL
  duration    String?                        // 재생 시간
  highlights  String?                        // 하이라이트

  work        Work     @relation(fields: [workId], references: [id], onDelete: Cascade)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🎵 포함된 작품

시드 데이터에는 다음 작품들이 포함되어 있습니다:

- **교향곡**: 41개 전체 (제1번 ~ 제41번 '주피터')
- **피아노 협주곡**: 27개 전체
- **바이올린 협주곡**: 5개 전체
- **오페라**: 주요 작품 12개 (마술피리, 피가로의 결혼, 돈 조반니 등)
- **실내악**: 현악 4중주, 5중주, 피아노 4중주 등
- **피아노 소나타**: 주요 작품들
- **기타**: 세레나데, 협주 교향곡, 종교음악 등

**총 약 80개의 주요 작품**

---

## 🔧 API 엔드포인트

### GET /api/works

작품 목록 조회 (필터링, 정렬, 페이지네이션)

**Query Parameters:**
- `genre`: 장르 필터
- `search`: 제목/설명 검색
- `highlight`: 하이라이트 작품만 (true/false)
- `sort`: 정렬 필드 (year, voteCount, title, catalogNumber)
- `order`: 정렬 순서 (asc, desc)
- `page`: 페이지 번호 (기본: 1)
- `limit`: 페이지당 항목 수 (기본: 20)

**예시:**
```bash
GET /api/works?genre=오페라&sort=voteCount&order=desc
GET /api/works?search=협주곡&page=1&limit=10
```

### GET /api/works/[id]

작품 상세 조회 (아리아 포함)

**예시:**
```bash
GET /api/works/clxxx123456789
```

### PATCH /api/works/[id]

작품 업데이트 (투표수 증가)

**Body:**
```json
{
  "action": "incrementVote"
}
```

### GET /api/works/genres

모든 장르 목록 조회

---

## 📝 추가 작업

### 더 많은 작품 추가

1. `prisma/seed-data.json`에 작품 추가
2. 시드 재실행:
```bash
npm run prisma:seed
```

### 스키마 변경

1. `prisma/schema.prisma` 수정
2. 마이그레이션 생성:
```bash
npx prisma migrate dev --name your_migration_name
```

### 데이터 백업

```bash
# Export
pg_dump $DATABASE_URL > backup.sql

# Import
psql $DATABASE_URL < backup.sql
```

---

## 🐛 문제 해결

### "Environment variable not found: DATABASE_URL"
→ `.env` 파일이 있는지 확인하고 `DATABASE_URL`이 설정되어 있는지 확인

### "Can't reach database server"
→ 데이터베이스가 실행 중인지 확인
→ Supabase의 경우 프로젝트가 일시 중지되지 않았는지 확인

### 마이그레이션 오류
```bash
# 마이그레이션 초기화
npx prisma migrate reset
```

---

## 📚 참고 자료

- [Prisma 공식 문서](https://www.prisma.io/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
