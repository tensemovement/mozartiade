import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Chronicle } from '@/types';

// GET - List all chronicles
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const year = searchParams.get('year') || '';
    const reorderMode = searchParams.get('reorderMode') === 'true';

    // When reorder mode is enabled, show all items on one page (no pagination)
    const limit = reorderMode ? 9999 : parseInt(searchParams.get('limit') || '20');
    const skip = reorderMode ? 0 : (page - 1) * limit;

    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const highlight = searchParams.get('highlight') || '';
    const order = searchParams.get('order') || 'desc';

    // Build where clause
    const where: any = {};
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    if (type) {
      where.type = type;
    }
    if (year) {
      where.year = parseInt(year);
    }
    if (highlight) {
      where.highlight = highlight === 'true';
    }

    // Build orderBy clause
    const orderBy: any[] = [
      { year: order as 'asc' | 'desc' },
      { month: order as 'asc' | 'desc' },
      { day: order as 'asc' | 'desc' },
      { chronicleOrder: order as 'asc' | 'desc' },
    ];

    // Get chronicles and total count
    const [chronicles, total] = await Promise.all([
      prisma.chronicle.findMany({
        where,
        skip,
        take: limit,
        include: {
          work: {
            select: {
              id: true,
              title: true,
              catalogNumber: true,
              genre: true,
            },
          },
        },
        orderBy,
      }),
      prisma.chronicle.count({ where }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          chronicles,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get chronicles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '일대기 목록 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// POST - Create new chronicle
export async function POST(req: NextRequest) {
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

    // Editor and above can create chronicles
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
    const {
      type,
      year,
      month,
      day,
      title,
      description,
      location,
      workId,
      highlight,
      image,
    } = body;

    // Validate required fields based on type
    if (type === 'life' && !title) {
      return NextResponse.json(
        {
          success: false,
          error: '생애 사건은 제목이 필요합니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    if (type === 'work' && !workId) {
      return NextResponse.json(
        {
          success: false,
          error: '작품 연대기는 작품이 필요합니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // If workId is provided, verify it exists
    if (workId) {
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
    }

    // Create chronicle
    const chronicle = await prisma.chronicle.create({
      data: {
        type,
        year,
        month,
        day,
        title,
        description,
        location,
        workId,
        highlight: highlight || false,
        image,
      },
      include: {
        work: {
          select: {
            id: true,
            title: true,
            catalogNumber: true,
            genre: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: chronicle,
      } as ApiResponse<Chronicle>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create chronicle error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '일대기 생성 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
