# Admin Dashboard Setup Guide

## 관리자 대시보드 설정 가이드

이 가이드는 EnjoyMozart Admin Dashboard를 설정하고 사용하는 방법을 안내합니다.

---

## 1. 데이터베이스 마이그레이션

Admin 모델과 역할 시스템을 데이터베이스에 적용합니다.

```bash
# Prisma 클라이언트 생성
npm run prisma:generate

# 마이그레이션 실행
npm run prisma:migrate
```

마이그레이션 이름을 입력하라는 메시지가 나오면 `add_admin_model`을 입력합니다.

---

## 2. 초기 관리자 계정 생성

기본 Super Admin 계정을 생성합니다.

```bash
npm run prisma:seed-admin
```

### 기본 로그인 정보

- **이메일**: `admin@enjoymozart.com`
- **비밀번호**: `admin123`
- **역할**: SUPER_ADMIN

> ⚠️ **보안 주의**: 프로덕션 환경에서는 반드시 기본 비밀번호를 변경하세요!

---

## 3. 관리자 대시보드 접속

### 로그인

1. 브라우저에서 `http://localhost:3000/admin/login` 접속
2. 위의 기본 로그인 정보로 로그인

### 대시보드 메인

로그인 후 자동으로 `/admin` 대시보드로 이동합니다.

---

## 4. 관리자 역할 (Roles)

### SUPER_ADMIN (최고 관리자)
- **권한**: 모든 기능 접근 가능
- 관리자 추가, 수정, 삭제
- 회원 관리
- 작품 및 일대기 관리

### ADMIN (관리자)
- **권한**: 관리자 관리를 제외한 모든 기능
- 회원 관리
- 작품 및 일대기 관리

### EDITOR (편집자)
- **권한**: 컨텐츠 편집만 가능
- 작품 및 일대기 편집
- 회원 관리 및 관리자 관리 불가

---

## 5. 주요 기능

### 5.1 관리자 관리 (`/admin/admins`)
- **접근 권한**: SUPER_ADMIN만
- 새 관리자 추가
- 관리자 정보 수정
- 관리자 삭제
- 역할 변경

### 5.2 회원 관리 (`/admin/users`)
- **접근 권한**: ADMIN 이상
- 가입 회원 목록 조회
- 회원 정보 수정
- 회원 삭제
- 검색 기능

### 5.3 작품 관리 (`/admin/works`)
- **접근 권한**: EDITOR 이상
- 작품 목록 조회
- 작품 추가/수정/삭제
- 악장(Movement) 관리
- 검색 및 필터링

### 5.4 일대기 관리 (`/admin/chronicles`)
- **접근 권한**: EDITOR 이상
- 생애 사건 및 작품 일대기 관리
- 일대기 추가/수정/삭제
- 작품 연결 기능
- 유형별 필터링 (생애/작품)

---

## 6. API 엔드포인트

### 인증 (Authentication)
```
POST   /api/admin/auth/login          # 로그인
GET    /api/admin/auth/me             # 현재 관리자 정보
```

### 관리자 (Admins)
```
GET    /api/admin/admins              # 관리자 목록
POST   /api/admin/admins              # 관리자 생성
PUT    /api/admin/admins/[id]         # 관리자 수정
DELETE /api/admin/admins/[id]         # 관리자 삭제
```

### 회원 (Users)
```
GET    /api/admin/users               # 회원 목록
PUT    /api/admin/users/[id]          # 회원 수정
DELETE /api/admin/users/[id]          # 회원 삭제
```

### 작품 (Works)
```
GET    /api/admin/works               # 작품 목록
POST   /api/admin/works               # 작품 생성
GET    /api/admin/works/[id]          # 작품 조회
PUT    /api/admin/works/[id]          # 작품 수정
DELETE /api/admin/works/[id]          # 작품 삭제
```

### 악장 (Movements)
```
POST   /api/admin/works/[id]/movements    # 악장 추가
PUT    /api/admin/movements/[id]          # 악장 수정
DELETE /api/admin/movements/[id]          # 악장 삭제
```

### 일대기 (Chronicles)
```
GET    /api/admin/chronicles          # 일대기 목록
POST   /api/admin/chronicles          # 일대기 생성
GET    /api/admin/chronicles/[id]     # 일대기 조회
PUT    /api/admin/chronicles/[id]     # 일대기 수정
DELETE /api/admin/chronicles/[id]     # 일대기 삭제
```

---

## 7. 인증 방식

### JWT 토큰
- 토큰은 로그인 시 발급되며 7일간 유효
- 쿠키에 `admin_token` 키로 저장
- 모든 API 요청 시 `Authorization: Bearer <token>` 헤더 필요

### 환경 변수
`.env` 파일에 JWT 시크릿 키 설정:

```env
JWT_SECRET=your-super-secret-key-change-this-in-production
```

> ⚠️ 프로덕션 환경에서는 반드시 강력한 시크릿 키로 변경하세요!

---

## 8. 디자인 가이드

### 색상 팔레트
- **Primary**: Slate 900 (#0f172a) - 메인 다크 컬러
- **Background**: Gray 50 (#f9fafb) - 배경색
- **Border**: Gray 200 (#e5e7eb) - 테두리

### 컴포넌트
- **모달**: 중앙 정렬, 반투명 배경
- **버튼**: 둥근 모서리, 호버 효과
- **테이블**: 깔끔한 구분선, 호버 하이라이트
- **사이드바**: 고정 위치, 다크 테마

---

## 9. 보안 권장사항

### 비밀번호 관리
- bcrypt를 사용한 비밀번호 해싱 (salt rounds: 10)
- 기본 관리자 비밀번호 즉시 변경
- 복잡한 비밀번호 정책 적용 권장

### 토큰 관리
- JWT 토큰 만료 시간: 7일
- 안전한 시크릿 키 사용
- HTTPS 사용 권장

### 권한 관리
- 역할 기반 접근 제어 (RBAC)
- API 레벨에서 권한 검증
- 최소 권한 원칙 적용

---

## 10. 문제 해결

### 로그인이 안 되는 경우
1. 데이터베이스 연결 확인
2. 관리자 계정 생성 확인: `npm run prisma:seed-admin`
3. 브라우저 쿠키 확인

### API 오류
1. 토큰 만료 확인
2. 네트워크 콘솔에서 요청/응답 확인
3. 서버 로그 확인

### 권한 오류
1. 현재 관리자의 역할 확인
2. API 엔드포인트의 필요 권한 확인
3. 토큰 재발급 시도 (재로그인)

---

## 11. 개발 환경

### 필요 도구
- Node.js 18+
- PostgreSQL
- npm 또는 yarn

### 개발 서버 실행
```bash
npm run dev
```

### Prisma Studio (데이터베이스 GUI)
```bash
npm run prisma:studio
```

---

## 12. 향후 확장 가능 기능

- [ ] 파일 업로드 시스템 (이미지, 악보 등)
- [ ] 대시보드 통계 및 차트
- [ ] 활동 로그
- [ ] 이메일 알림
- [ ] 다중 언어 지원
- [ ] 고급 검색 및 필터
- [ ] 일괄 작업 (Bulk operations)
- [ ] 데이터 내보내기/가져오기

---

## 문의 및 지원

문제가 발생하거나 도움이 필요한 경우 시스템 관리자에게 문의하세요.
