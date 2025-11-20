# Pull Request: Design System - Mozart-Inspired Classical Theme with Typography

## 개요
Mozartiade Portal을 위한 디자인 시스템 구축 및 모차르트에서 영감받은 클래식 테마 적용

## 주요 변경사항

### 🎨 1. 모차르트 테마 색상 시스템
- **Primary (Royal Gold)**: `#D97706` - 모차르트 시대의 금박과 음악의 풍부함
- **Secondary (Imperial Purple)**: `#7C3AED` - 왕실의 고귀함과 오페라의 벨벳
- **Accent (Burgundy Red)**: `#991B1B` - 깊이 있는 클래식함
- **Background**: Cream (`#FFFBEB`), Ivory (`#FEF3C7`) - 악보의 색상

### ✍️ 2. 우아한 타이포그래피
- **Headings**: Playfair Display + Noto Serif KR
  - 18세기 타이포그래피에서 영감받은 우아한 세리프
- **Body**: Inter + Noto Sans KR
  - 현대적이고 가독성 높은 산세리프
- Next.js font optimization 적용

### 🚫 3. No-Gradient Policy
- 모든 그라데이션 제거 (배경, 텍스트, 아이콘)
- 클래식한 우아함을 위한 단색 디자인 원칙 수립
- 명확한 사용 규칙 문서화

### 📖 4. 포괄적인 디자인 가이드 (claude.md)
- 디자인 시스템 프롬프트 템플릿
- 컴포넌트 패턴 (버튼, 카드, 폼, 네비게이션)
- 마이크로 인터랙션 가이드
- 코드 구조화 및 명명 규칙
- Gradient Usage Policy

## 기술 스택
- Next.js 14 + App Router
- TypeScript
- Tailwind CSS (Mozart Theme)
- Recoil
- Prisma + Supabase PostgreSQL
- Zod

## 디자인 철학
모차르트 시대의 우아함과 현대적 웹 디자인의 조화:
- 시대를 초월한 단색의 우아함
- 절제된 심플함과 명확한 계층 구조
- 의도적이고 풍부한 색상 선택
- 프로페셔널하고 세련된 미학

## 파일 변경사항
- `claude.md`: 디자인 시스템 가이드
- `tailwind.config.ts`: Mozart 테마 색상 및 폰트 설정
- `src/app/layout.tsx`: Google Fonts 설정
- `src/app/page.tsx`: 테마 적용된 홈페이지
- `package.json`: 프로젝트 의존성
- `prisma/schema.prisma`: 데이터베이스 스키마
- 기본 프로젝트 설정 파일들

## 테스트 체크리스트
- [ ] `npm run dev`로 개발 서버 실행 확인
- [ ] 모든 색상이 올바르게 표시되는지 확인
- [ ] 폰트가 올바르게 로드되는지 확인
- [ ] 그라데이션이 완전히 제거되었는지 확인
- [ ] 반응형 디자인 동작 확인

## 스크린샷
홈페이지가 모차르트 테마로 업데이트되었습니다:
- Cream 배경에 White 카드
- 골드/퍼플/버건디 색상 조합
- Playfair Display 제목 폰트
- 단색 디자인 (그라데이션 없음)
- 우아한 호버 효과 (그림자, translate, scale)

## 다음 단계
- [ ] 추가 페이지에 테마 적용
- [ ] UI 컴포넌트 라이브러리 구축 (Button, Card, Input 등)
- [ ] Navigation 컴포넌트 개발
- [ ] Footer 컴포넌트 개발
- [ ] 다크 모드 고려 (선택사항)

---

## 커밋 내역
1. **Initial project setup with design system guide** (66aa39c)
   - Next.js 14 프로젝트 초기 설정
   - 기본 디렉토리 구조 생성
   - claude.md 디자인 가이드 작성

2. **Update theme to Mozart-inspired classical color scheme** (eb5c8c1)
   - Royal Gold, Imperial Purple, Burgundy Red 색상 적용
   - Tailwind CSS 테마 설정
   - 홈페이지에 새로운 색상 적용

3. **Add Mozart-inspired typography with elegant fonts** (979a661)
   - Playfair Display, Inter, Noto Serif KR, Noto Sans KR 추가
   - Next.js Google Fonts 최적화
   - 폰트 계층 구조 적용

4. **Remove gradients and establish no-gradient policy** (4d3c391)
   - 모든 그라데이션 제거
   - No-Gradient Policy 문서화
   - 클래식한 단색 디자인으로 변경

---

## 브랜치 정보
- **Source**: `claude/design-system-prompt-template-011CUpVn2Ww4hvRznt3SCvFN`
- **Target**: `main` (또는 기본 브랜치)

## 리뷰어를 위한 참고사항
- `claude.md` 파일을 먼저 검토하여 디자인 시스템 이해
- `src/app/page.tsx`에서 실제 적용 예시 확인
- `npm run dev`로 로컬에서 확인 권장
