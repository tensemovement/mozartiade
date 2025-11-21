# 트랜잭션 격리 수준 (Transaction Isolation Levels) 가이드

## 개요

이 문서는 PostgreSQL의 트랜잭션 격리 수준과 프로젝트에서의 권장 사용법을 설명합니다.

## PostgreSQL 트랜잭션 격리 수준

PostgreSQL은 4가지 트랜잭션 격리 수준을 지원합니다:

### 1. READ UNCOMMITTED (지원하지만 READ COMMITTED처럼 동작)
- PostgreSQL에서는 READ COMMITTED와 동일하게 동작
- 실질적으로 사용되지 않음

### 2. READ COMMITTED (기본값) ⭐️ **추천**
**특징:**
- 커밋된 데이터만 읽음
- 각 쿼리마다 새로운 스냅샷 사용
- Non-repeatable read 발생 가능
- Phantom read 발생 가능

**장점:**
- ✅ 높은 동시성 (Concurrency)
- ✅ 적은 잠금 (Lock contention)
- ✅ 대부분의 경우 충분한 격리 수준
- ✅ 데드락 발생 확률 낮음

**단점:**
- ❌ 같은 트랜잭션 내에서 동일 쿼리가 다른 결과 반환 가능
- ❌ 다른 트랜잭션이 데이터를 삽입/삭제하면 영향을 받음

**사용 시나리오:**
- 대부분의 일반적인 업데이트 작업
- 단일 레코드 수정
- 여러 레코드를 수정하지만 동시성이 중요한 경우

### 3. REPEATABLE READ
**특징:**
- 트랜잭션 시작 시점의 스냅샷 사용
- 같은 쿼리는 항상 같은 결과 반환
- Phantom read 방지 (PostgreSQL은 MVCC로 구현)
- Serialization anomaly 발생 가능

**장점:**
- ✅ 트랜잭션 내에서 일관된 읽기 보장
- ✅ Non-repeatable read 방지
- ✅ Phantom read 방지 (PostgreSQL 특성)

**단점:**
- ❌ 동시성 감소
- ❌ 업데이트 충돌 시 재시도 필요
- ❌ Serialization failure 가능성

**사용 시나리오:**
- 보고서 생성 (일관된 데이터 필요)
- 복잡한 조회 및 계산
- 금융 거래 (잔액 확인 후 출금)

### 4. SERIALIZABLE (가장 엄격)
**특징:**
- 완전한 직렬화 격리
- 동시 실행 트랜잭션이 순차 실행된 것처럼 보장
- 모든 이상 현상 방지

**장점:**
- ✅ 최고 수준의 데이터 무결성
- ✅ 모든 anomaly 방지
- ✅ 비즈니스 로직이 단순해짐 (동시성 고려 불필요)

**단점:**
- ❌ 매우 낮은 동시성
- ❌ 높은 재시도 비용
- ❌ 성능 저하
- ❌ 데드락 및 직렬화 실패 빈번

**사용 시나리오:**
- 중요한 금융 거래
- 재고 관리 (정확한 수량 보장 필요)
- 티켓 예약 (중복 예약 절대 방지)

---

## 프로젝트 적용 가이드

### 현재 구현된 트랜잭션 래퍼

#### 1. `withTransaction()` - 일반 트랜잭션 (READ COMMITTED)
```typescript
// src/lib/transaction.ts
export async function withTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
  options?: {
    isolationLevel?: Prisma.TransactionIsolationLevel;
  }
): Promise<T>
```

**기본 격리 수준:** READ COMMITTED
**타임아웃:** 10초
**사용 예:**
```typescript
await withTransaction(async (tx) => {
  await tx.work.update({ ... });
  await tx.movement.create({ ... });
  return result;
});
```

#### 2. `withReadTransaction()` - 읽기 전용 트랜잭션 (READ COMMITTED)
```typescript
export async function withReadTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T>
```

**기본 격리 수준:** READ COMMITTED
**타임아웃:** 5초 (읽기 작업용)
**사용 예:**
```typescript
await withReadTransaction(async (tx) => {
  const work = await tx.work.findUnique({ ... });
  const movements = await tx.movement.findMany({ ... });
  return { work, movements };
});
```

#### 3. `withBatchTransaction()` - 배치 작업용 (READ COMMITTED)
```typescript
export async function withBatchTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T>
```

**기본 격리 수준:** READ COMMITTED
**타임아웃:** 30초 (대량 처리용)
**사용 예:**
```typescript
await withBatchTransaction(async (tx) => {
  for (const item of items) {
    await tx.work.update({ ... });
  }
});
```

---

## API별 권장 격리 수준

### 작품 관리 API

| API | 격리 수준 | 래퍼 | 이유 |
|-----|---------|------|------|
| `PUT /api/admin/works/[id]` | READ COMMITTED | `withTransaction` | 작품+악장+링크 통합 수정, 동시성 중요 |
| `POST /api/admin/works` | 없음 (단일 CREATE) | - | 단일 생성은 원자적 |
| `DELETE /api/admin/works/[id]` | 없음 (CASCADE) | - | Prisma CASCADE로 처리 |
| `PATCH /api/admin/works/reorder` | READ COMMITTED | `withBatchTransaction` | 여러 순서 업데이트, 일관성 중요 |

### 연대기 관리 API

| API | 격리 수준 | 래퍼 | 이유 |
|-----|---------|------|------|
| `PUT /api/admin/chronicles/[id]` | READ COMMITTED | `withTransaction` | workId 검증 후 업데이트 |
| `POST /api/admin/chronicles` | READ COMMITTED | `withTransaction` | workId 검증 필요 시 |
| `DELETE /api/admin/chronicles/[id]` | 없음 | - | 단일 삭제 |
| `PATCH /api/admin/chronicles/reorder` | READ COMMITTED | `withBatchTransaction` | 여러 순서 업데이트 |

### 악장 관리 API

| API | 격리 수준 | 래퍼 | 이유 |
|-----|---------|------|------|
| `PUT /api/admin/movements/[id]` | 없음 | - | 단일 업데이트 (작품 수정 API에 통합 권장) |
| `POST /api/admin/works/[id]/movements` | 없음 | - | 단일 생성 (작품 수정 API에 통합 권장) |
| `DELETE /api/admin/movements/[id]` | 없음 | - | 단일 삭제 (작품 수정 API에 통합 권장) |

### 관련 링크 관리 API

| API | 격리 수준 | 래퍼 | 이유 |
|-----|---------|------|------|
| `PUT /api/admin/related-links/[id]` | 없음 | - | 단일 업데이트 (작품 수정 API에 통합 권장) |
| `POST /api/admin/works/[id]/related-links` | 없음 | - | 단일 생성 (작품 수정 API에 통합 권장) |
| `DELETE /api/admin/related-links/[id]` | 없음 | - | 단일 삭제 (작품 수정 API에 통합 권장) |

---

## 특수 상황별 격리 수준 가이드

### 1. 재고 관리 / 티켓 예약 (중복 방지 필수)
```typescript
// SERIALIZABLE 사용
await withTransaction(
  async (tx) => {
    // 재고 확인
    const stock = await tx.product.findUnique({ where: { id } });
    if (stock.quantity < requestedAmount) {
      throw new Error('재고 부족');
    }

    // 재고 차감
    await tx.product.update({
      where: { id },
      data: { quantity: { decrement: requestedAmount } },
    });

    return { success: true };
  },
  { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
);
```

### 2. 금융 거래 (정확한 잔액 보장)
```typescript
// REPEATABLE READ 또는 SERIALIZABLE
await withTransaction(
  async (tx) => {
    // 잔액 조회
    const account = await tx.account.findUnique({ where: { id } });

    if (account.balance < withdrawAmount) {
      throw new Error('잔액 부족');
    }

    // 출금 처리
    await tx.account.update({
      where: { id },
      data: { balance: { decrement: withdrawAmount } },
    });

    return { success: true };
  },
  { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
);
```

### 3. 보고서 생성 (일관된 스냅샷)
```typescript
// REPEATABLE READ
await withTransaction(
  async (tx) => {
    // 여러 테이블 조회 시 일관된 데이터 보장
    const works = await tx.work.findMany({ ... });
    const movements = await tx.movement.findMany({ ... });
    const chronicles = await tx.chronicle.findMany({ ... });

    // 복잡한 계산
    const report = generateReport(works, movements, chronicles);

    return report;
  },
  { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
);
```

### 4. 일반 CRUD 작업 (대부분)
```typescript
// READ COMMITTED (기본값)
await withTransaction(async (tx) => {
  await tx.work.update({ ... });
  await tx.movement.create({ ... });
  return result;
});
```

---

## 성능 vs 일관성 트레이드오프

| 격리 수준 | 동시성 | 성능 | 일관성 | 사용 비율 권장 |
|----------|-------|------|--------|--------------|
| READ COMMITTED | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 90% |
| REPEATABLE READ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 8% |
| SERIALIZABLE | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ | 2% |

---

## 권장사항 요약

### ✅ 대부분의 경우: READ COMMITTED
- 기본 `withTransaction()` 사용
- 90% 이상의 작업에 적합
- 높은 동시성과 성능 보장

### ⚠️ 특수한 경우만: REPEATABLE READ
- 보고서 생성
- 복잡한 조회 및 계산
- 일관된 스냅샷 필요
- `isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead` 명시

### 🚨 매우 드문 경우: SERIALIZABLE
- 재고 관리
- 금융 거래
- 중복 방지가 절대적으로 필요한 경우
- `isolationLevel: Prisma.TransactionIsolationLevel.Serializable` 명시
- 재시도 로직 구현 필수

---

## 재시도 로직 예시

REPEATABLE READ나 SERIALIZABLE 사용 시 직렬화 실패가 발생할 수 있으므로 재시도 로직이 필요합니다:

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Serialization failure인 경우에만 재시도
      if (error.code === 'P2034' || error.message?.includes('serialization')) {
        // 지수 백오프
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 100));
        continue;
      }

      // 다른 에러는 즉시 throw
      throw error;
    }
  }

  throw lastError;
}

// 사용 예
await withRetry(() =>
  withTransaction(
    async (tx) => {
      // SERIALIZABLE 트랜잭션 로직
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  )
);
```

---

## 참고 자료

- [PostgreSQL Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [Prisma Transactions](https://www.prisma.io/docs/concepts/components/prisma-client/transactions)
- [MVCC in PostgreSQL](https://www.postgresql.org/docs/current/mvcc.html)

---

**작성일:** 2025-11-21
**버전:** 1.0.0
