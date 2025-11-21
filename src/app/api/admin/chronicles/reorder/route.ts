import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse } from '@/types';

// PATCH - Reorder chronicles within a year
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

    // Editor and above can reorder chronicles
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
    const { chronicleId, newOrder, year } = body;

    if (!chronicleId || newOrder === undefined || !year) {
      return NextResponse.json(
        {
          success: false,
          error: '필수 파라미터가 누락되었습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Get the chronicle to move
    const chronicle = await prisma.chronicle.findUnique({
      where: { id: chronicleId },
    });

    if (!chronicle) {
      return NextResponse.json(
        {
          success: false,
          error: '일대기를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Verify chronicle belongs to the specified year
    if (chronicle.year !== year) {
      return NextResponse.json(
        {
          success: false,
          error: '일대기가 지정된 년도에 속하지 않습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Get all chronicles in the same year ordered by chronicleOrder
    const chroniclesInYear = await prisma.chronicle.findMany({
      where: {
        year: year,
        month: null, // Only chronicles with year only (no month/day)
        day: null,
      },
      orderBy: [
        { chronicleOrder: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    // Find current and new positions
    const currentIndex = chroniclesInYear.findIndex(c => c.id === chronicleId);
    if (currentIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: '순서 변경 조건을 만족하지 않습니다. 년도만 입력된 일대기만 순서 변경이 가능합니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Reorder the array
    const reorderedChronicles = [...chroniclesInYear];
    const [movedChronicle] = reorderedChronicles.splice(currentIndex, 1);
    reorderedChronicles.splice(newOrder, 0, movedChronicle);

    // Update chronicleOrder for all affected chronicles
    await prisma.$transaction(
      reorderedChronicles.map((chronicle, index) =>
        prisma.chronicle.update({
          where: { id: chronicle.id },
          data: { chronicleOrder: index + 1 },
        })
      )
    );

    return NextResponse.json(
      {
        success: true,
        data: { message: '순서가 성공적으로 변경되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Reorder chronicles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '일대기 순서 변경 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
