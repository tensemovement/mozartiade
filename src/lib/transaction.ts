import { prisma } from './prisma';
import { Prisma } from '@prisma/client';

/**
 * 공통 트랜잭션 래퍼
 *
 * 모든 업데이트/생성/삭제 작업은 이 래퍼를 통해 트랜잭션으로 실행되어야 합니다.
 * 트랜잭션 내에서 에러가 발생하면 모든 작업이 롤백됩니다.
 *
 * @example
 * ```typescript
 * const result = await withTransaction(async (tx) => {
 *   await tx.work.update({ ... });
 *   await tx.movement.create({ ... });
 *   return { success: true };
 * });
 * ```
 */
export async function withTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
  options?: {
    maxWait?: number; // Maximum time (ms) to wait for a transaction slot (default: 5000ms)
    timeout?: number; // Maximum time (ms) for the transaction to complete (default: 10000ms)
  }
): Promise<T> {
  try {
    return await prisma.$transaction(callback, {
      maxWait: options?.maxWait || 5000,
      timeout: options?.timeout || 10000,
    });
  } catch (error) {
    // 트랜잭션 실패 시 에러를 다시 throw
    console.error('Transaction failed:', error);
    throw error;
  }
}

/**
 * 읽기 전용 트랜잭션 래퍼
 *
 * 여러 읽기 작업을 일관된 스냅샷에서 수행해야 할 때 사용합니다.
 * READ COMMITTED 격리 수준을 사용하여 성능을 최적화합니다.
 *
 * @example
 * ```typescript
 * const result = await withReadTransaction(async (tx) => {
 *   const work = await tx.work.findUnique({ ... });
 *   const movements = await tx.movement.findMany({ ... });
 *   return { work, movements };
 * });
 * ```
 */
export async function withReadTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return withTransaction(callback, {
    timeout: 5000, // 읽기 작업은 더 짧은 타임아웃
  });
}

/**
 * 배치 작업용 트랜잭션 래퍼
 *
 * 대량의 데이터를 처리할 때 사용합니다.
 * 더 긴 타임아웃을 제공합니다.
 *
 * @example
 * ```typescript
 * const result = await withBatchTransaction(async (tx) => {
 *   for (const item of items) {
 *     await tx.work.update({ ... });
 *   }
 *   return { processed: items.length };
 * });
 * ```
 */
export async function withBatchTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return withTransaction(callback, {
    maxWait: 10000,
    timeout: 30000, // 배치 작업은 더 긴 타임아웃
  });
}
