# 모차르트 연대기(Chronicle) 데이터베이스 통합 가이드

## 📋 개요

이 문서는 모차르트의 연대기(생애 사건 + 작품 작곡)를 데이터베이스와 통합하는 방법을 설명합니다.
**Chronicle 테이블**을 중심으로 생애 사건과 작품을 하나의 타임라인에서 관리합니다.

## 🎯 핵심 설계 개념

### Chronicle 테이블 = 일대기 메인 테이블

```
Chronicle (연대기)
├── type: 'life'  → 순수 생애 사건 (독립적)
└── type: 'work'  → 작품 작곡 (Work 테이블 참조)
```

### 작동 방식

1. **type = 'life'**: 생애 사건
   - `title`, `description`, `location` 필드 사용
   - Work 테이블과 연결 없음
   - 예: 출생, 여행, 결혼, 사망 등

2. **type = 'work'**: 작품 작곡
   - `workId`로 Work 테이블 참조
   - Work의 정보를 조회하여 표시
   - 작품 정보 중복 없음

## 🗄️ 데이터베이스 스키마

### Chronicle 테이블

```prisma
model Chronicle {
  id          String        @id @default(cuid())
  type        ChronicleType // 'life' | 'work'
  year        Int
  month       Int?
  day         Int?

  // 생애 사건 정보 (type='life'일 때만 사용)
  title       String?
  description String?       @db.Text
  location    String?

  // 작품 참조 (type='work'일 때만 사용)
  workId      String?
  work        Work?         @relation(fields: [workId], references: [id], onDelete: Cascade)

  // 공통 필드
  highlight   Boolean       @default(false)
  image       String?

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([year])
  @@index([type])
  @@index([year, month, day])
  @@index([workId])
}

enum ChronicleType {
  life // 생애 사건
  work // 작품 작곡
}
```

### Work 테이블 (기존)

```prisma
model Work {
  id                     String   @id @default(cuid())
  catalogNumber          String?  @unique
  title                  String
  // ... 기타 필드들

  // Chronicle 관계 추가
  chronicles             Chronicle[] // 이 작품을 참조하는 연대기 항목들
}
```

## 📊 Seed 데이터 구조

### chronicle-data.json

```json
[
  {
    "type": "life",
    "year": 1756,
    "month": 1,
    "day": 27,
    "title": "잘츠부르크에서 탄생",
    "description": "볼프강 아마데우스 모차르트, 레오폴트 모차르트와 안나 마리아 페르틀의 아들로 태어남",
    "location": "잘츠부르크, 오스트리아",
    "highlight": true,
    "image": "/images/m/mozart001.jpg"
  },
  {
    "type": "work",
    "year": 1786,
    "month": 5,
    "day": 1,
    "catalogNumber": "K. 492",
    "highlight": true,
    "image": "/images/m/mozart007.jpg"
  }
]
```

**필드 설명**:
- `type`: 'life' 또는 'work'
- `catalogNumber`: type='work'일 때 Work 테이블 조회에 사용
- `title/description/location`: type='life'일 때만 사용

## 🔧 설치 및 마이그레이션

### 1. Prisma 클라이언트 재생성

```bash
npx prisma generate
```

### 2. 데이터베이스 마이그레이션

```bash
# 개발 환경
npx prisma migrate dev --name add_chronicle_table

# 프로덕션 환경
npx prisma migrate deploy
```

### 3. 시드 데이터 적용

```bash
npx prisma db seed
```

시드 스크립트는 다음 순서로 처리합니다:
1. Work 테이블 시딩 (626개 작품)
2. Movement 테이블 시딩 (악장/아리아)
3. Chronicle 테이블 시딩:
   - type='life': title, description, location 직접 저장
   - type='work': catalogNumber로 Work 찾아서 workId 연결

## 💻 사용 예제

### 1. 전체 연대기 조회 (생애 + 작품)

```typescript
import { prisma } from '@/lib/prisma'

// 모든 연대기 조회 (작품 정보 포함)
const chronicles = await prisma.chronicle.findMany({
  orderBy: [
    { year: 'asc' },
    { month: 'asc' },
    { day: 'asc' }
  ],
  include: {
    work: true  // type='work'일 때 작품 정보 포함
  }
})

// 연대기 표시
for (const item of chronicles) {
  if (item.type === 'life') {
    console.log(`[생애] ${item.year}: ${item.title}`)
    console.log(`  ${item.description}`)
    console.log(`  📍 ${item.location}`)
  } else if (item.type === 'work' && item.work) {
    console.log(`[작품] ${item.year}: ${item.work.title}`)
    console.log(`  ${item.work.catalogNumber} - ${item.work.genre}`)
    console.log(`  ${item.work.description}`)
  }
}
```

### 2. 특정 연도의 연대기

```typescript
const year = 1786

const chroniclesIn1786 = await prisma.chronicle.findMany({
  where: { year },
  include: { work: true },
  orderBy: [{ month: 'asc' }, { day: 'asc' }]
})
```

### 3. 생애 사건만 조회

```typescript
const lifeEvents = await prisma.chronicle.findMany({
  where: { type: 'life' },
  orderBy: { year: 'asc' }
})
```

### 4. 작품 작곡 사건만 조회

```typescript
const workChronicles = await prisma.chronicle.findMany({
  where: { type: 'work' },
  include: {
    work: {
      include: {
        movements: true  // 악장 정보도 포함
      }
    }
  },
  orderBy: { year: 'asc' }
})
```

### 5. 중요한 사건만 조회

```typescript
const highlights = await prisma.chronicle.findMany({
  where: { highlight: true },
  include: { work: true },
  orderBy: { year: 'asc' }
})
```

### 6. 특정 작품의 연대기 정보

```typescript
// 피가로의 결혼의 연대기 항목 찾기
const figaro = await prisma.work.findUnique({
  where: { catalogNumber: 'K. 492' },
  include: {
    chronicles: true  // 이 작품을 참조하는 연대기 항목
  }
})
```

## 🎨 API 엔드포인트 예제

### 연대기 API 생성

```typescript
// src/app/api/chronicles/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const type = searchParams.get('type') as 'life' | 'work' | null
  const highlight = searchParams.get('highlight') === 'true'

  const chronicles = await prisma.chronicle.findMany({
    where: {
      ...(year && { year: parseInt(year) }),
      ...(type && { type }),
      ...(highlight && { highlight: true }),
    },
    include: {
      work: true  // 작품 정보 포함
    },
    orderBy: [
      { year: 'asc' },
      { month: 'asc' },
      { day: 'asc' }
    ]
  })

  return NextResponse.json({
    success: true,
    data: chronicles,
    total: chronicles.length
  })
}
```

### 사용법

```bash
# 전체 연대기
GET /api/chronicles

# 1786년 연대기
GET /api/chronicles?year=1786

# 생애 사건만
GET /api/chronicles?type=life

# 작품만
GET /api/chronicles?type=work

# 중요 사건만
GET /api/chronicles?highlight=true

# 조합: 1786년의 중요 작품
GET /api/chronicles?year=1786&type=work&highlight=true
```

## 🖼️ 프론트엔드 통합

### 서버 컴포넌트에서 사용

```typescript
// src/app/chronology/page.tsx
import { prisma } from '@/lib/prisma'
import { Chronicle } from '@/types'

export default async function ChronologyPage() {
  const chronicles = await prisma.chronicle.findMany({
    include: { work: true },
    orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }]
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">모차르트 연대기</h1>

      <div className="space-y-6">
        {chronicles.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-lg border-l-4 ${
              item.type === 'life'
                ? 'bg-blue-50 border-blue-500'
                : 'bg-purple-50 border-purple-500'
            }`}
          >
            {/* 날짜 */}
            <div className="text-sm font-semibold text-gray-500 mb-2">
              {item.year}
              {item.month && `.${item.month}`}
              {item.day && `.${item.day}`}
            </div>

            {/* 생애 사건 */}
            {item.type === 'life' && (
              <>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-2">{item.description}</p>
                {item.location && (
                  <p className="text-sm text-blue-600">📍 {item.location}</p>
                )}
              </>
            )}

            {/* 작품 작곡 */}
            {item.type === 'work' && item.work && (
              <>
                <h3 className="text-xl font-bold mb-2">
                  {item.work.title}
                  <span className="ml-2 text-sm text-purple-600 font-mono">
                    {item.work.catalogNumber}
                  </span>
                </h3>
                <p className="text-gray-700 mb-2">{item.work.description}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>🎵 {item.work.genre}</span>
                  {item.work.youtubeUrl && (
                    <a
                      href={item.work.youtubeUrl}
                      target="_blank"
                      className="text-purple-600 hover:underline"
                    >
                      유튜브 듣기 →
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 클라이언트 컴포넌트에서 사용

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Chronicle } from '@/types'

export default function ChronicleTimeline() {
  const [chronicles, setChronicles] = useState<Chronicle[]>([])
  const [filter, setFilter] = useState<'all' | 'life' | 'work'>('all')

  useEffect(() => {
    const url = filter === 'all'
      ? '/api/chronicles'
      : `/api/chronicles?type=${filter}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setChronicles(data.data)
        }
      })
  }, [filter])

  return (
    <div>
      {/* 필터 */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('life')}
          className={`px-4 py-2 rounded ${
            filter === 'life' ? 'bg-blue-600 text-white' : 'bg-blue-100'
          }`}
        >
          생애 사건
        </button>
        <button
          onClick={() => setFilter('work')}
          className={`px-4 py-2 rounded ${
            filter === 'work' ? 'bg-purple-600 text-white' : 'bg-purple-100'
          }`}
        >
          작품
        </button>
      </div>

      {/* 타임라인 */}
      <div className="space-y-4">
        {chronicles.map(item => (
          <div key={item.id}>
            {/* 연대기 항목 렌더링 */}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 📝 데이터 업데이트 방법

### 새로운 생애 사건 추가

```typescript
import { prisma } from '@/lib/prisma'

await prisma.chronicle.create({
  data: {
    type: 'life',
    year: 1777,
    month: 9,
    day: 23,
    title: "만하임 여행",
    description: "어머니와 함께 만하임으로 여행, 베버 가족을 만남",
    location: "만하임, 독일",
    highlight: false,
  }
})
```

### 새로운 작품 연대기 추가

```typescript
// 먼저 작품 찾기
const work = await prisma.work.findUnique({
  where: { catalogNumber: 'K. 550' }
})

if (work) {
  await prisma.chronicle.create({
    data: {
      type: 'work',
      year: 1788,
      month: 7,
      day: 25,
      workId: work.id,
      highlight: true,
    }
  })
}
```

### 연대기 항목 수정

```typescript
await prisma.chronicle.update({
  where: { id: 'some-id' },
  data: {
    highlight: true,
    image: '/images/m/new-image.jpg'
  }
})
```

### 연대기 항목 삭제

```typescript
await prisma.chronicle.delete({
  where: { id: 'some-id' }
})
```

## 🔍 고급 쿼리

### 1. 연도별 그룹화

```typescript
const chronicles = await prisma.chronicle.findMany({
  include: { work: true },
  orderBy: [{ year: 'asc' }, { month: 'asc' }]
})

// 연도별로 그룹화
const byYear = chronicles.reduce((acc, item) => {
  if (!acc[item.year]) {
    acc[item.year] = []
  }
  acc[item.year].push(item)
  return acc
}, {} as Record<number, typeof chronicles>)
```

### 2. 통계

```typescript
// 타입별 개수
const stats = await prisma.chronicle.groupBy({
  by: ['type'],
  _count: true
})

// 결과: [
//   { type: 'life', _count: 7 },
//   { type: 'work', _count: 14 }
// ]
```

### 3. 검색

```typescript
// 생애 사건에서 "빈" 검색
const results = await prisma.chronicle.findMany({
  where: {
    type: 'life',
    OR: [
      { title: { contains: '빈', mode: 'insensitive' } },
      { description: { contains: '빈', mode: 'insensitive' } },
      { location: { contains: '빈', mode: 'insensitive' } }
    ]
  }
})
```

## 📚 TypeScript 타입 정의

```typescript
// src/types/index.ts

export type ChronicleType = 'life' | 'work';

export interface Chronicle {
  id: string;
  type: ChronicleType;
  year: number;
  month?: number;
  day?: number;

  // 생애 사건 정보 (type='life'일 때만)
  title?: string;
  description?: string;
  location?: string;

  // 작품 참조 (type='work'일 때만)
  workId?: string;
  work?: Work;

  // 공통
  highlight?: boolean;
  image?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
```

## ✅ 장점

1. **데이터 중복 없음**: 작품 정보는 Work 테이블에만 저장
2. **일관성**: 작품 정보 수정 시 연대기에 자동 반영
3. **유연성**: 생애 사건과 작품을 하나의 타임라인에서 관리
4. **확장성**: 새로운 타입 추가 가능 (예: 'performance', 'publication' 등)
5. **쿼리 효율**: type 필드로 빠른 필터링

## ⚠️ 주의사항

1. **타입별 필드**: type='life'일 때는 title이 필수, type='work'일 때는 workId가 필수
2. **데이터 검증**: 애플리케이션 레벨에서 타입별 필드 검증 필요
3. **시딩 순서**: Work를 먼저 시딩한 후 Chronicle 시딩
4. **삭제 주의**: Work 삭제 시 관련 Chronicle도 함께 삭제됨 (onDelete: Cascade)

## 🚀 향후 개선 사항

1. **추가 타입**: performance (공연), publication (출판) 등
2. **관계 확장**: 특정 생애 사건이 특정 작품에 영향을 준 경우 연결
3. **미디어**: 이미지, 오디오, 비디오 등 멀티미디어 지원
4. **다국어**: titleEn, descriptionEn 등 다국어 필드 추가
5. **태그**: 장소, 인물, 주제별 태그 시스템

---

**작성일**: 2025-11-18
**버전**: 2.0.0
