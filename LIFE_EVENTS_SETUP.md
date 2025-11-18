# 모차르트 일대기(LifeEvent) 데이터베이스 연동 가이드

## 📋 개요

이 문서는 모차르트의 일대기(전기적 사건)를 데이터베이스와 연동하는 방법을 설명합니다.
기존의 하드코딩된 일대기 정보를 데이터베이스로 이관하여 관리의 용이성을 높이고, 작품 정보와의 중복을 방지합니다.

## 🎯 주요 변경 사항

### 1. 데이터베이스 스키마 추가

#### LifeEvent 테이블
모차르트의 생애 사건을 저장하는 새로운 테이블이 추가되었습니다.

```prisma
model LifeEvent {
  id          String   @id @default(cuid())
  year        Int                    // 연도 (필수)
  month       Int?                   // 월 (선택)
  day         Int?                   // 일 (선택)
  title       String                 // 사건 제목
  description String   @db.Text      // 사건 상세 설명
  location    String?                // 발생 장소
  highlight   Boolean  @default(false) // 중요 사건 표시
  image       String?                // 관련 이미지 경로

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([year])
  @@index([year, month, day])
}
```

**필드 설명:**
- `id`: 고유 식별자 (자동 생성)
- `year`: 사건이 발생한 연도 (필수)
- `month`, `day`: 월/일 정보 (있는 경우만)
- `title`: 사건의 제목 (예: "잘츠부르크에서 탄생")
- `description`: 사건에 대한 상세 설명
- `location`: 사건이 발생한 장소 (예: "잘츠부르크, 오스트리아")
- `highlight`: 타임라인에서 강조 표시할 중요 사건
- `image`: 관련 이미지 경로

### 2. 데이터 구조 설계

#### 일대기와 작품의 분리
- **LifeEvent 테이블**: 순수 전기적 사건만 저장 (출생, 여행, 결혼, 사망 등)
- **Work 테이블**: 작품 정보 (기존 테이블 그대로 유지)
- **통합 뷰**: 필요시 애플리케이션 레벨에서 두 테이블의 데이터를 병합하여 연대기 표시

#### 기존 chronology.ts와의 관계
기존 `src/data/chronology.ts` 파일은 다음과 같이 구성되어 있습니다:
- `type: 'life'`: LifeEvent 테이블로 이관됨
- `type: 'work'`: 기존 Work 테이블과 중복되므로, Work 테이블 데이터 활용

## 🔧 설치 및 마이그레이션

### 1. Prisma 클라이언트 재생성

스키마가 변경되었으므로 Prisma 클라이언트를 재생성합니다:

```bash
npx prisma generate
```

### 2. 데이터베이스 마이그레이션 생성 및 적용

새로운 LifeEvent 테이블을 데이터베이스에 추가합니다:

```bash
# 개발 환경
npx prisma migrate dev --name add_life_events_table

# 프로덕션 환경
npx prisma migrate deploy
```

### 3. 시드 데이터 적용

일대기 데이터를 데이터베이스에 추가합니다:

```bash
npx prisma db seed
```

시드 스크립트는 다음 파일들을 처리합니다:
- `prisma/seed-data.json`: 작품 데이터 (~626개)
- `prisma/movements-data.json`: 악장/아리아 데이터
- `prisma/life-events-data.json`: 일대기 데이터 (7개 주요 사건)

## 📊 시드 데이터 구조

### life-events-data.json

```json
[
  {
    "year": 1756,
    "month": 1,
    "day": 27,
    "title": "잘츠부르크에서 탄생",
    "description": "볼프강 아마데우스 모차르트, 레오폴트 모차르트와 안나 마리아 페르틀의 아들로 태어남",
    "location": "잘츠부르크, 오스트리아",
    "highlight": true,
    "image": "/images/m/mozart001.jpg"
  },
  // ... 추가 이벤트
]
```

### 현재 포함된 일대기 이벤트

1. **1756년 1월 27일** - 잘츠부르크에서 탄생
2. **1762년 1월** - 첫 공개 연주 여행
3. **1769년 12월** - 이탈리아 여행 시작
4. **1773년** - 잘츠부르크 궁정 음악가 임명
5. **1781년 3월** - 빈으로 이주
6. **1782년 8월 4일** - 콘스탄체 베버와 결혼
7. **1791년 12월 5일** - 빈에서 별세

## 🔄 데이터 업데이트 방법

### 새로운 일대기 이벤트 추가

#### 방법 1: Seed 파일 수정 후 재시딩

1. `prisma/life-events-data.json` 파일을 수정합니다:

```json
{
  "year": 1777,
  "month": 9,
  "day": 23,
  "title": "만하임 여행",
  "description": "어머니와 함께 만하임으로 여행, 베버 가족을 만남",
  "location": "만하임, 독일",
  "highlight": false,
  "image": null
}
```

2. 데이터베이스를 재시딩합니다:

```bash
npx prisma db seed
```

**주의**: 이 방법은 기존 데이터를 모두 삭제하고 다시 생성합니다!

#### 방법 2: 프로그래매틱 방식 (추천)

Prisma 클라이언트를 사용하여 직접 추가합니다:

```typescript
import { prisma } from '@/lib/prisma'

async function addLifeEvent() {
  const newEvent = await prisma.lifeEvent.create({
    data: {
      year: 1777,
      month: 9,
      day: 23,
      title: "만하임 여행",
      description: "어머니와 함께 만하임으로 여행, 베버 가족을 만남",
      location: "만하임, 독일",
      highlight: false,
    }
  })

  console.log('Created:', newEvent)
}
```

#### 방법 3: API 엔드포인트를 통한 추가 (향후 구현 권장)

관리자 페이지나 API를 통해 CRUD 작업을 수행할 수 있도록 구현하는 것을 권장합니다.

### 기존 일대기 이벤트 수정

```typescript
import { prisma } from '@/lib/prisma'

async function updateLifeEvent(id: string) {
  const updated = await prisma.lifeEvent.update({
    where: { id },
    data: {
      title: "수정된 제목",
      description: "수정된 설명",
      // 필요한 필드만 업데이트
    }
  })

  return updated
}
```

### 일대기 이벤트 삭제

```typescript
import { prisma } from '@/lib/prisma'

async function deleteLifeEvent(id: string) {
  await prisma.lifeEvent.delete({
    where: { id }
  })
}
```

## 📱 API 사용 가이드 (향후 구현)

### 일대기 목록 조회 API

```typescript
// src/app/api/life-events/route.ts (생성 필요)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const highlight = searchParams.get('highlight')

  const events = await prisma.lifeEvent.findMany({
    where: {
      ...(year && { year: parseInt(year) }),
      ...(highlight === 'true' && { highlight: true }),
    },
    orderBy: [
      { year: 'asc' },
      { month: 'asc' },
      { day: 'asc' },
    ]
  })

  return NextResponse.json(events)
}
```

### 통합 연대기 API

```typescript
// src/app/api/chronology/route.ts (생성 필요)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')

  // 일대기 이벤트와 작품을 함께 조회
  const [lifeEvents, works] = await Promise.all([
    prisma.lifeEvent.findMany({
      where: year ? { year: parseInt(year) } : {},
      orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }],
    }),
    prisma.work.findMany({
      where: {
        ...(year && { year: parseInt(year) }),
        highlight: true, // 중요 작품만
      },
      orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }],
    }),
  ])

  // 통합 연대기 아이템 생성
  const chronologyItems = [
    ...lifeEvents.map(event => ({
      ...event,
      type: 'life' as const,
    })),
    ...works.map(work => ({
      ...work,
      type: 'work' as const,
    })),
  ].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    if ((a.month || 0) !== (b.month || 0)) return (a.month || 0) - (b.month || 0)
    return (a.day || 0) - (b.day || 0)
  })

  return NextResponse.json(chronologyItems)
}
```

## 🎨 프론트엔드 통합

### LifeEvent 데이터 가져오기

```typescript
// src/app/chronology/page.tsx (기존 페이지 수정 필요)
import { prisma } from '@/lib/prisma'
import { LifeEvent, Work } from '@/types'

export default async function ChronologyPage() {
  // 서버 컴포넌트에서 직접 조회
  const lifeEvents = await prisma.lifeEvent.findMany({
    orderBy: [
      { year: 'asc' },
      { month: 'asc' },
      { day: 'asc' },
    ],
  })

  const works = await prisma.work.findMany({
    where: { highlight: true },
    orderBy: [
      { year: 'asc' },
      { compositionOrder: 'asc' },
    ],
  })

  // 연대기 아이템 통합
  const chronologyItems = [
    ...lifeEvents.map(e => ({ ...e, type: 'life' as const })),
    ...works.map(w => ({ ...w, type: 'work' as const })),
  ].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    if ((a.month || 0) !== (b.month || 0)) return (a.month || 0) - (b.month || 0)
    return (a.day || 0) - (b.day || 0)
  })

  return (
    <div>
      {/* 연대기 렌더링 */}
    </div>
  )
}
```

### 클라이언트 컴포넌트에서 사용

```typescript
'use client'

import { useEffect, useState } from 'react'
import { LifeEvent } from '@/types'

export default function LifeEventsClient() {
  const [events, setEvents] = useState<LifeEvent[]>([])

  useEffect(() => {
    fetch('/api/life-events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🔍 쿼리 예제

### 특정 연도의 일대기 조회

```typescript
const eventsIn1781 = await prisma.lifeEvent.findMany({
  where: { year: 1781 }
})
```

### 중요 일대기만 조회

```typescript
const highlightEvents = await prisma.lifeEvent.findMany({
  where: { highlight: true },
  orderBy: { year: 'asc' }
})
```

### 특정 장소의 일대기 조회

```typescript
const viennaEvents = await prisma.lifeEvent.findMany({
  where: {
    location: {
      contains: '빈'
    }
  }
})
```

### 연도 범위로 조회

```typescript
const earlyLife = await prisma.lifeEvent.findMany({
  where: {
    year: {
      gte: 1756,
      lte: 1770
    }
  },
  orderBy: { year: 'asc' }
})
```

## 📝 TypeScript 타입 정의

프로젝트에 다음 타입이 추가되었습니다 (`src/types/index.ts`):

```typescript
export interface LifeEvent {
  id: string;
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  location?: string;
  highlight?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🚀 향후 개선 사항

### 1. 관리자 페이지 구현
- CRUD 인터페이스를 통한 일대기 관리
- 이미지 업로드 기능
- 미리보기 기능

### 2. API 엔드포인트 구현
- `/api/life-events` - 일대기 목록/생성
- `/api/life-events/[id]` - 특정 일대기 조회/수정/삭제
- `/api/chronology` - 통합 연대기 API

### 3. 고급 필터링
- 장소별 필터
- 연도 범위 선택
- 키워드 검색

### 4. 관계 확장
- 일대기와 작품 간의 명시적 관계 설정
- 일대기에 관련 작품 링크 추가
- 작품에 관련 일대기 이벤트 표시

### 5. 다국어 지원
- `titleEn`, `descriptionEn` 필드 추가
- 국제화(i18n) 구현

## 📚 참고 자료

- [Prisma 공식 문서](https://www.prisma.io/docs)
- [Next.js 데이터 페칭](https://nextjs.org/docs/app/building-your-application/data-fetching)
- 프로젝트 내 관련 파일:
  - `prisma/schema.prisma` - 데이터베이스 스키마
  - `prisma/seed.ts` - 시드 스크립트
  - `prisma/life-events-data.json` - 일대기 시드 데이터
  - `src/types/index.ts` - TypeScript 타입 정의
  - `src/data/chronology.ts` - 기존 하드코딩된 연대기 (참고용)

## ⚠️ 주의사항

1. **데이터 백업**: 프로덕션 환경에서 마이그레이션 전 반드시 데이터베이스를 백업하세요.

2. **시드 데이터 재실행**: `npx prisma db seed`는 기존 데이터를 삭제하므로 프로덕션에서는 주의하세요.

3. **환경 변수**: `.env` 파일에 올바른 `DATABASE_URL`이 설정되어 있는지 확인하세요.

4. **이미지 경로**: 이미지 파일이 `public/images/m/` 경로에 실제로 존재하는지 확인하세요.

## 🆘 문제 해결

### 마이그레이션 오류
```bash
# 마이그레이션 상태 확인
npx prisma migrate status

# 마이그레이션 리셋 (개발 환경에만 사용!)
npx prisma migrate reset
```

### Prisma 클라이언트 오류
```bash
# Prisma 클라이언트 재생성
npx prisma generate

# node_modules 재설치
rm -rf node_modules
npm install
```

### 시드 데이터 오류
```bash
# 시드 스크립트 직접 실행 (에러 확인)
npx tsx prisma/seed.ts
```

---

**작성일**: 2025-11-18
**버전**: 1.0.0
