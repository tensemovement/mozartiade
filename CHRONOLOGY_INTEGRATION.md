# 연대기와 작품 테이블 연결 가이드

## 📋 현재 데이터 구조

### 1. LifeEvent 테이블 (새로 추가됨)
순수한 생애 사건만 저장합니다.

```prisma
model LifeEvent {
  id          String   @id @default(cuid())
  year        Int
  month       Int?
  day         Int?
  title       String
  description String   @db.Text
  location    String?
  highlight   Boolean  @default(false)
  image       String?
}
```

**예시 데이터**:
- 1756년 1월 27일: 잘츠부르크에서 탄생
- 1781년 3월: 빈으로 이주
- 1782년 8월 4일: 콘스탄체 베버와 결혼

### 2. Work 테이블 (기존)
작품 정보를 저장합니다.

```prisma
model Work {
  id                     String   @id @default(cuid())
  catalogNumber          String?  @unique // K. 492
  year                   Int
  month                  Int?
  day                    Int?
  compositionOrder       Int?
  title                  String
  genre                  String?
  // ... 기타 필드
}
```

**예시 데이터**:
- K. 492: 피가로의 결혼 (1786년 5월 1일)
- K. 527: 돈 조반니 (1787년 10월 29일)
- K. 620: 마술피리 (1791년 9월 30일)

---

## 🔗 연결 방법

### 방법 1: 애플리케이션 레벨에서 병합 (현재 구현, 권장)

데이터베이스에서는 두 테이블을 독립적으로 유지하고, 필요할 때 애플리케이션에서 합쳐서 사용합니다.

#### 장점
- ✅ 데이터 중복 없음
- ✅ 각 테이블 독립적으로 관리 가능
- ✅ 작품 정보 일관성 유지
- ✅ 유연한 쿼리 및 필터링

#### 구현 예시

**1) API 엔드포인트 생성**

```typescript
// src/app/api/chronology/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const yearNum = year ? parseInt(year) : undefined

  // 1. LifeEvent 조회
  const lifeEvents = await prisma.lifeEvent.findMany({
    where: yearNum ? { year: yearNum } : {},
    orderBy: [
      { year: 'asc' },
      { month: 'asc' },
      { day: 'asc' }
    ]
  })

  // 2. Work 조회 (중요 작품만 또는 전체)
  const works = await prisma.work.findMany({
    where: {
      ...(yearNum && { year: yearNum }),
      highlight: true // 중요 작품만 표시
    },
    orderBy: [
      { year: 'asc' },
      { month: 'asc' },
      { compositionOrder: 'asc' }
    ],
    select: {
      id: true,
      catalogNumber: true,
      year: true,
      month: true,
      day: true,
      title: true,
      titleEn: true,
      description: true,
      genre: true,
      youtubeUrl: true,
      sheetMusicUrl: true,
      compositionDetails: true,
      highlight: true,
      image: true,
      voteCount: true,
    }
  })

  // 3. 통합 연대기 아이템 생성
  const chronologyItems = [
    ...lifeEvents.map(event => ({
      id: event.id,
      type: 'life' as const,
      year: event.year,
      month: event.month,
      day: event.day,
      title: event.title,
      description: event.description,
      location: event.location,
      highlight: event.highlight,
      image: event.image,
    })),
    ...works.map(work => ({
      id: work.id,
      type: 'work' as const,
      year: work.year,
      month: work.month,
      day: work.day,
      title: work.title,
      titleEn: work.titleEn,
      description: work.description,
      catalogNumber: work.catalogNumber,
      genre: work.genre,
      youtubeUrl: work.youtubeUrl,
      sheetMusicUrl: work.sheetMusicUrl,
      compositionDetails: work.compositionDetails,
      highlight: work.highlight,
      image: work.image,
      voteCount: work.voteCount,
    }))
  ]

  // 4. 날짜순 정렬
  chronologyItems.sort((a, b) => {
    // 연도 비교
    if (a.year !== b.year) return a.year - b.year

    // 월 비교
    const aMonth = a.month || 0
    const bMonth = b.month || 0
    if (aMonth !== bMonth) return aMonth - bMonth

    // 일 비교
    const aDay = a.day || 0
    const bDay = b.day || 0
    return aDay - bDay
  })

  return NextResponse.json({
    success: true,
    data: chronologyItems,
    total: chronologyItems.length
  })
}
```

**2) 서버 컴포넌트에서 직접 사용**

```typescript
// src/app/chronology/page.tsx
import { prisma } from '@/lib/prisma'
import { ChronologyItem } from '@/types'

export default async function ChronologyPage() {
  // 데이터베이스에서 직접 조회
  const [lifeEvents, works] = await Promise.all([
    prisma.lifeEvent.findMany({
      orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }]
    }),
    prisma.work.findMany({
      where: { highlight: true },
      orderBy: [{ year: 'asc' }, { compositionOrder: 'asc' }]
    })
  ])

  // 연대기 아이템으로 변환
  const chronologyItems: ChronologyItem[] = [
    ...lifeEvents.map(e => ({ ...e, type: 'life' as const })),
    ...works.map(w => ({ ...w, type: 'work' as const }))
  ].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    if ((a.month || 0) !== (b.month || 0)) return (a.month || 0) - (b.month || 0)
    return (a.day || 0) - (b.day || 0)
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">모차르트 연대기</h1>

      <div className="space-y-8">
        {chronologyItems.map(item => (
          <div
            key={`${item.type}-${item.id}`}
            className={`p-6 rounded-lg ${
              item.type === 'life'
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : 'bg-purple-50 border-l-4 border-purple-500'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-sm font-semibold text-gray-500">
                {item.year}
                {item.month && `.${item.month}`}
                {item.day && `.${item.day}`}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  {item.type === 'work' && 'catalogNumber' in item && (
                    <span className="text-sm text-purple-600 font-mono">
                      {item.catalogNumber}
                    </span>
                  )}
                  {item.type === 'life' && 'location' in item && item.location && (
                    <span className="text-sm text-blue-600">
                      📍 {item.location}
                    </span>
                  )}
                </div>

                <p className="text-gray-700">{item.description}</p>

                {item.type === 'work' && 'genre' in item && (
                  <div className="mt-2 text-sm text-gray-500">
                    장르: {item.genre}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**3) 클라이언트 컴포넌트에서 사용**

```typescript
// src/components/ChronologyTimeline.tsx
'use client'

import { useEffect, useState } from 'react'
import { ChronologyItem } from '@/types'

export default function ChronologyTimeline() {
  const [items, setItems] = useState<ChronologyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    const fetchChronology = async () => {
      setLoading(true)
      const url = selectedYear
        ? `/api/chronology?year=${selectedYear}`
        : '/api/chronology'

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setItems(data.data)
      }
      setLoading(false)
    }

    fetchChronology()
  }, [selectedYear])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {/* 연도 필터 */}
      <div className="mb-8">
        <select
          onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
          className="border rounded px-4 py-2"
        >
          <option value="">전체 연도</option>
          {Array.from({length: 1791 - 1756 + 1}, (_, i) => 1756 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* 타임라인 */}
      <div className="relative">
        {items.map((item, index) => (
          <div key={`${item.type}-${item.id}`} className="mb-8 flex">
            <div className="w-24 text-right pr-4 pt-1">
              <div className="font-bold text-lg">{item.year}</div>
              {item.month && <div className="text-sm text-gray-500">{item.month}월</div>}
            </div>

            <div className="relative flex-1">
              {/* 타임라인 라인 */}
              {index !== items.length - 1 && (
                <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-gray-300" />
              )}

              {/* 타임라인 점 */}
              <div className={`absolute left-0 top-2 w-4 h-4 rounded-full ${
                item.type === 'life' ? 'bg-blue-500' : 'bg-purple-500'
              }`} />

              {/* 내용 */}
              <div className="ml-8">
                <div className={`p-4 rounded-lg ${
                  item.type === 'life' ? 'bg-blue-50' : 'bg-purple-50'
                }`}>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>

                  {item.type === 'work' && 'catalogNumber' in item && (
                    <div className="mt-2 text-sm">
                      <span className="font-mono text-purple-600">
                        {item.catalogNumber}
                      </span>
                      {' • '}
                      <span className="text-gray-600">{item.genre}</span>
                    </div>
                  )}

                  {item.type === 'life' && 'location' in item && item.location && (
                    <div className="mt-2 text-sm text-blue-600">
                      📍 {item.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### 방법 2: 명시적 관계 추가 (선택적, 향후 개선)

데이터베이스 레벨에서 LifeEvent와 Work 간의 관계를 명시적으로 설정합니다.

#### 사용 사례
- "빈 이주 당시 작곡한 작품들"
- "결혼 전후의 작품 비교"
- "이탈리아 여행 중 작곡한 오페라"

#### 스키마 수정

```prisma
model LifeEvent {
  id          String   @id @default(cuid())
  year        Int
  month       Int?
  day         Int?
  title       String
  description String   @db.Text
  location    String?
  highlight   Boolean  @default(false)
  image       String?

  // 관련 작품들 (다대다 관계)
  relatedWorks LifeEventWork[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([year])
  @@index([year, month, day])
}

model Work {
  id                     String   @id @default(cuid())
  catalogNumber          String?  @unique
  year                   Int
  title                  String
  // ... 기존 필드들

  // 관련 생애 사건들 (다대다 관계)
  relatedLifeEvents      LifeEventWork[]

  movements              Movement[]
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt
}

// 중간 테이블 (다대다 관계)
model LifeEventWork {
  id          String    @id @default(cuid())
  lifeEventId String
  workId      String
  relationship String?  // "작곡 시기", "영향 받음", "헌정" 등

  lifeEvent   LifeEvent @relation(fields: [lifeEventId], references: [id], onDelete: Cascade)
  work        Work      @relation(fields: [workId], references: [id], onDelete: Cascade)

  createdAt   DateTime  @default(now())

  @@unique([lifeEventId, workId])
  @@index([lifeEventId])
  @@index([workId])
}
```

#### 사용 예시

```typescript
// 빈 이주 사건과 관련 작품들 함께 조회
const viennaMove = await prisma.lifeEvent.findFirst({
  where: {
    year: 1781,
    title: { contains: '빈' }
  },
  include: {
    relatedWorks: {
      include: {
        work: true
      }
    }
  }
})

// 피가로의 결혼과 관련된 생애 사건들
const figaro = await prisma.work.findFirst({
  where: { catalogNumber: 'K. 492' },
  include: {
    relatedLifeEvents: {
      include: {
        lifeEvent: true
      }
    }
  }
})
```

---

## 🎨 실제 화면 구성 예시

### 1. 통합 연대기 페이지

```
┌─────────────────────────────────────────────┐
│  모차르트 연대기                              │
├─────────────────────────────────────────────┤
│  [1756] [1760] [1770] [1780] [1790]  ← 연도 필터 │
├─────────────────────────────────────────────┤
│                                             │
│  1756.1.27  🔵 잘츠부르크에서 탄생           │
│              볼프강 아마데우스 모차르트...    │
│              📍 잘츠부르크, 오스트리아        │
│                                             │
│  1761       🟣 안단테 C장조 (K. 1a)          │
│              5세 때 작곡한 첫 작품...         │
│              🎹 피아노                        │
│                                             │
│  1762.1     🔵 첫 공개 연주 여행              │
│              6세 때 뮌헨과 빈에서...          │
│              📍 뮌헨, 빈                      │
│                                             │
│  ...                                        │
└─────────────────────────────────────────────┘

🔵 = 생애 사건 (LifeEvent)
🟣 = 작품 (Work)
```

### 2. 작품 상세 페이지에 관련 생애 사건 표시

```typescript
// src/app/works/[id]/page.tsx
export default async function WorkDetailPage({ params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({
    where: { id: params.id },
    include: { movements: true }
  })

  // 같은 연도의 생애 사건 찾기
  const relatedLifeEvents = await prisma.lifeEvent.findMany({
    where: {
      year: work.year,
      // 월이 있으면 비슷한 시기
      ...(work.month && {
        month: {
          gte: Math.max(1, work.month - 3),
          lte: Math.min(12, work.month + 3)
        }
      })
    }
  })

  return (
    <div>
      <h1>{work.title}</h1>
      <p>{work.description}</p>

      {relatedLifeEvents.length > 0 && (
        <section className="mt-8">
          <h2>같은 시기의 모차르트</h2>
          <div className="space-y-4">
            {relatedLifeEvents.map(event => (
              <div key={event.id} className="bg-blue-50 p-4 rounded">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
```

---

## 📊 데이터 흐름

```
데이터베이스
├── LifeEvent 테이블 (7개 사건)
│   ├── 1756: 탄생
│   ├── 1762: 첫 연주 여행
│   └── ...
│
└── Work 테이블 (626개 작품)
    ├── K. 1a: 안단테 C장조
    ├── K. 492: 피가로의 결혼
    └── ...

        ↓ (API 또는 서버 컴포넌트)

통합 연대기 배열 [
  { type: 'life', year: 1756, ... },
  { type: 'work', year: 1761, ... },
  { type: 'life', year: 1762, ... },
  ...
]

        ↓ (정렬)

시간순 연대기 표시
```

---

## 🔍 쿼리 최적화 팁

### 1. 특정 연도만 조회

```typescript
const year = 1786

const [lifeEvents, works] = await Promise.all([
  prisma.lifeEvent.findMany({ where: { year } }),
  prisma.work.findMany({ where: { year } })
])
```

### 2. 중요 항목만 조회

```typescript
const [highlightLifeEvents, highlightWorks] = await Promise.all([
  prisma.lifeEvent.findMany({ where: { highlight: true } }),
  prisma.work.findMany({ where: { highlight: true } })
])
```

### 3. 페이지네이션

```typescript
const page = 1
const pageSize = 20

// 전체 개수
const [lifeEventsCount, worksCount] = await Promise.all([
  prisma.lifeEvent.count(),
  prisma.work.count({ where: { highlight: true } })
])

// 데이터 조회
const [lifeEvents, works] = await Promise.all([
  prisma.lifeEvent.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { year: 'asc' }
  }),
  prisma.work.findMany({
    where: { highlight: true },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { year: 'asc' }
  })
])
```

---

## ✅ 권장사항

**현재 단계에서는 방법 1 (애플리케이션 레벨 병합)을 권장합니다:**

1. ✅ 구현이 간단함
2. ✅ 데이터 중복 없음
3. ✅ 각 테이블 독립적 관리
4. ✅ 유연한 쿼리 가능

**향후 필요시 방법 2 (명시적 관계)를 추가할 수 있습니다:**
- 생애 사건과 작품 간의 의미있는 연결이 필요할 때
- "이 시기에 작곡된 작품들" 같은 기능이 필요할 때

---

**작성일**: 2025-11-18
