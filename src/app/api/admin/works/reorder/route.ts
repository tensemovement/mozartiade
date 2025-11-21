import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse } from '@/types';
import { withBatchTransaction } from '@/lib/transaction';

// PATCH - Reorder works within a year
export async function PATCH(req: NextRequest) {
  try {
    const authResult = verifyAdminAuth(req);

    if (!authResult.authenticated || !authResult.admin) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error || '인증되지 않은 요청입니다.',
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Editor and above can reorder works
    if (!hasMinimumRole(authResult.admin.role, 'EDITOR')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    const body = await req.json();
    const { workId, newOrder, year } = body;

    if (!workId || newOrder === undefined || !year) {
      return NextResponse.json(
        {
          success: false,
          error: '필수 파라미터가 누락되었습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Get the work to move
    const work = await prisma.work.findUnique({
      where: { id: workId },
    });

    if (!work) {
      return NextResponse.json(
        {
          success: false,
          error: '작품을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Verify work belongs to the specified year
    if (work.year !== year) {
      return NextResponse.json(
        {
          success: false,
          error: '작품이 지정된 년도에 속하지 않습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Get all works in the same year ordered by compositionOrder
    const worksInYear = await prisma.work.findMany({
      where: {
        year: year,
        month: null, // Only works with year only (no month/day)
        day: null,
      },
      orderBy: [
        { compositionOrder: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    // Find current and new positions
    const currentIndex = worksInYear.findIndex((w: { id: string }) => w.id === workId);
    if (currentIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: '순서 변경 조건을 만족하지 않습니다. 작곡년도만 입력된 작품만 순서 변경이 가능합니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Reorder the array
    const reorderedWorks = [...worksInYear];
    const [movedWork] = reorderedWorks.splice(currentIndex, 1);
    reorderedWorks.splice(newOrder, 0, movedWork);

    // Update compositionOrder for all affected works in a transaction
    await withBatchTransaction(async (tx) => {
      for (let i = 0; i < reorderedWorks.length; i++) {
        await tx.work.update({
          where: { id: reorderedWorks[i].id },
          data: { compositionOrder: i + 1 },
        });
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: { message: '순서가 성공적으로 변경되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Reorder works error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 순서 변경 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
