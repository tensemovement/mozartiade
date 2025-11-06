# Claude Design System Guide

이 문서는 프로젝트의 디자인 시스템과 개발 가이드를 정의합니다.

## 1. 디자인 시스템 프롬프트 템플릿

프로젝트 전반에 걸쳐 사용할 디자인 언어:

```
Classical, elegant UI with Mozart-inspired theme:
- Color scheme (Mozart Theme):
  - Primary: #D97706 (Royal Gold) - 모차르트 시대의 금박, 음악의 풍부함
  - Secondary: #7C3AED (Imperial Purple) - 왕실의 고귀함, 오페라의 벨벳
  - Accent: #991B1B (Burgundy Red) - 깊이 있는 클래식함, 와인 레드
  - Background: #FFFBEB (Cream) - 악보의 색상
  - Surface: #FEF3C7 (Ivory) - 부드러운 표면
  - Text Primary: #78350F (Dark Gold) - 따뜻한 어두운 톤
  - Text Secondary: #92400E (Medium Gold) - 보조 텍스트

- Typography (Mozart-inspired):
  - Headings: Playfair Display (font-serif) - 18세기 타이포그래피에서 영감
    - 한글: Noto Serif KR - 우아한 세리프 폰트
    - 사용: font-serif, font-semibold to font-bold
  - Body: Inter (font-sans) - 현대적이고 가독성 높은 산세리프
    - 한글: Noto Sans KR - 깔끔한 산세리프
    - 사용: font-sans, font-normal to font-medium
  - Code: 'Fira Code', 'Monaco', monospace

- Spacing: 8px grid system
  - Base unit: 8px
  - Common scales: 4px, 8px, 16px, 24px, 32px, 48px, 64px

- Shadow: subtle box-shadow for depth
  - sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
  - md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
  - lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)

- Border radius: 8-12px for cards
  - Small: 6px (buttons, inputs)
  - Medium: 8px (cards)
  - Large: 12px (modals, panels)
  - Full: 9999px (pills, avatars)
```

## 2. UI 프레임워크

### Tailwind CSS 사용 가이드

```
Use Tailwind CSS with Mozart Theme:
- Solid color backgrounds: bg-cream, bg-white (NO gradients)
- Subtle gold accents: border-primary-400, text-primary-600
- Glass morphism effects: backdrop-blur-lg bg-cream/80 (minimal use)
- Smooth, refined transitions: transition-all duration-300 ease-out
- Classical shadows: shadow-lg with warm tones
- Responsive design: mobile-first approach (sm:, md:, lg:, xl:, 2xl:)

⚠️ IMPORTANT: Avoid gradients for classical elegance
- Use solid colors for backgrounds and elements
- Gradients distract from the timeless, elegant aesthetic
- Exception: Subtle gradients ONLY for hero images/illustrations (rarely)
```

**예시:**
```jsx
<div className="bg-cream backdrop-blur-lg">
  <div className="bg-white rounded-xl shadow-lg border border-primary-200">
    {/* Content */}
  </div>
</div>
```

## 3. 참조 디자인 패턴

### Stripe-like 스타일

```
Implement Stripe-like checkout flow with:
- Subtle animations on scroll
- Clean, spacious layout
- Progressive disclosure
- Clear visual hierarchy
- Micro-interactions on hover
```

## 4. 컴포넌트 가이드

### Navigation Bar

```jsx
"Create a navigation bar with:
- Sticky positioning with backdrop blur
  → className="sticky top-0 z-50 backdrop-blur-md bg-cream/90 border-b border-primary-200"

- Smooth scroll indicators
  → Use IntersectionObserver for active states

- Active state with golden underline animation
  → className="relative after:absolute after:bottom-0 after:left-0
     after:h-0.5 after:w-full after:bg-primary-600 after:scale-x-0
     after:transition-transform hover:after:scale-x-100"
```

### Buttons

```jsx
Primary: "bg-primary-600 hover:bg-primary-700 text-white font-semibold
          px-6 py-3 rounded-lg transition-all duration-300 shadow-md
          hover:shadow-lg hover:scale-105"

Secondary: "bg-secondary-600 hover:bg-secondary-700 text-white font-semibold
            px-6 py-3 rounded-lg transition-all duration-300"

Outline: "border-2 border-primary-600 text-primary-700 hover:bg-primary-50
          font-semibold px-6 py-3 rounded-lg transition-all duration-300"

Accent: "bg-accent-800 hover:bg-accent-900 text-white font-semibold
         px-6 py-3 rounded-lg transition-all duration-300"
```

### Cards

```jsx
"rounded-xl bg-cream shadow-md hover:shadow-xl
 transition-all duration-300 p-6 border border-primary-200
 hover:border-primary-300 hover:-translate-y-1"
```

### Forms

```jsx
Input: "w-full px-4 py-3 rounded-lg border-2 border-primary-200
        bg-cream focus:border-primary-600 focus:ring-2 focus:ring-primary-300
        outline-none transition-all duration-300"
```

## 5. 마이크로 인터랙션

### 호버 상태
```
"Add hover states with smooth transitions (200ms ease)"
- Buttons: Scale slightly (scale-105) or change background
- Cards: Lift with shadow increase
- Links: Underline animation or color change
```

### 로딩 상태
```
"Include loading skeletons instead of spinners"
- Use shimmer animation: animate-pulse
- Preserve layout to prevent layout shift
- Gray placeholder blocks matching content structure
```

### 접근성
```
"Implement focus-visible for accessibility"
- focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
- Use focus-visible: for keyboard-only focus styles
- Maintain color contrast ratio ≥ 4.5:1
```

### 애니메이션 원칙
```
- Duration:
  - Fast: 100-200ms (hover, focus)
  - Medium: 200-300ms (transitions)
  - Slow: 300-500ms (page transitions)

- Easing:
  - ease-in: Accelerating
  - ease-out: Decelerating (preferred for enter animations)
  - ease-in-out: Smooth start and end
```

### ⚠️ Gradient Usage Policy (IMPORTANT)

```
RULE: Avoid gradients to maintain classical elegance

❌ DO NOT USE:
- Background gradients (bg-gradient-to-*)
- Text gradients (bg-clip-text)
- Border gradients
- Icon/element gradients

✅ USE INSTEAD:
- Solid backgrounds: bg-cream, bg-white, bg-primary-50
- Solid colors for icons: bg-primary-600, bg-secondary-700
- Solid text colors: text-primary-700, text-secondary-900
- Borders with single colors: border-primary-200

🎯 RATIONALE:
- Classical design emphasizes simplicity and timelessness
- Mozart-era aesthetics favor solid, rich colors
- Gradients can appear trendy and date quickly
- Solid colors are more elegant and professional

📝 RARE EXCEPTIONS (must be justified):
- Hero section illustrations/artwork ONLY
- Must be subtle and purposeful
- Requires explicit approval in code review
```

## 6. 코드 구조화

### 프로젝트 구조
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ...
├── components/            # React components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
├── lib/                  # Utility functions
│   ├── utils.ts
│   └── prisma.ts
├── store/                # Recoil state management
│   ├── atoms/
│   └── selectors/
├── styles/               # Global styles
│   └── globals.css
└── types/                # TypeScript types
    └── index.ts
```

### 명명 규칙
```
"Consistent naming conventions:"
- Components: PascalCase (Button.tsx, UserProfile.tsx)
- Files: camelCase (utils.ts, useAuth.ts)
- Hooks: use prefix (useAuth, useDebounce)
- Constants: UPPER_SNAKE_CASE (API_URL, MAX_RETRIES)
- Types/Interfaces: PascalCase with 'I' prefix for interfaces (IUser, ButtonProps)
```

### 컴포넌트 작성 패턴
```tsx
// 1. Imports
import { FC } from 'react'
import { cn } from '@/lib/utils'

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  onClick?: () => void
}

// 3. Component
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
        {
          'bg-blue-500 hover:bg-blue-600 text-white': variant === 'primary',
          'bg-gray-100 hover:bg-gray-200 text-gray-900': variant === 'secondary',
        }
      )}
    >
      {children}
    </button>
  )
}
```

### Custom Hooks 패턴
```tsx
// hooks/useDebounce.ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

## 7. 기술 스택

### Core Framework
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **React 18+** with Server Components

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-specific styles (optional)

### State Management
- **Recoil** for global state
- React hooks for local state

### Database & ORM
- **Supabase** (PostgreSQL)
- **Prisma** ORM

### Validation
- **Zod** for schema validation

### Deployment
- **Vercel** for hosting and deployment

### Package Manager
- **npm** (or yarn/pnpm as alternative)

## 8. 개발 워크플로우

### 새로운 기능 개발
1. 타입 정의 (types/)
2. Prisma 스키마 업데이트 (필요시)
3. API 라우트 생성 (app/api/)
4. UI 컴포넌트 개발 (components/)
5. 상태 관리 설정 (store/)
6. 페이지 통합 (app/)

### 코드 품질
- ESLint + Prettier for code formatting
- TypeScript strict mode
- Zod for runtime validation
- Component testing (optional: Jest/Vitest)

## 9. 성능 최적화

### Next.js 최적화
```
- Use Server Components by default
- Use 'use client' only when necessary
- Implement dynamic imports for heavy components
- Use next/image for optimized images
- Enable streaming with Suspense
```

### Tailwind 최적화
```
- Purge unused styles in production
- Use JIT mode for faster builds
- Minimize custom CSS
```

## 10. 베스트 프랙티스

### 접근성 (a11y)
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Maintain color contrast
- Test with screen readers

### SEO
- Use Next.js Metadata API
- Add structured data
- Optimize images with alt text
- Use semantic heading hierarchy

### 보안
- Validate all inputs with Zod
- Use environment variables for secrets
- Implement CSRF protection
- Use Prisma for SQL injection prevention

---

## Quick Reference

### 새 컴포넌트 만들기
```bash
# Create component
touch src/components/ui/NewComponent.tsx

# With types
touch src/types/newComponent.ts
```

### 새 API 라우트 만들기
```bash
mkdir -p src/app/api/endpoint
touch src/app/api/endpoint/route.ts
```

### Prisma 스키마 업데이트
```bash
# Edit schema
nano prisma/schema.prisma

# Generate client
npx prisma generate

# Create migration
npx prisma migrate dev --name description

# Push to database
npx prisma db push
```

### 환경 변수
```bash
# .env.local
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="https://..."
```

---

**Last Updated:** 2025-11-05
**Version:** 1.0.0
