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
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type') || '';
    const yearFrom = searchParams.get('yearFrom') || '';
    const yearTo = searchParams.get('yearTo') || '';
    const highlight = searchParams.get('highlight') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (type) {
      where.type = type;
    }
    if (yearFrom) {
      where.year = { ...where.year, gte: parseInt(yearFrom) };
    }
    if (yearTo) {
      where.year = { ...where.year, lte: parseInt(yearTo) };
    }
    if (highlight) {
      where.highlight = highlight === 'true';
    }

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
        orderBy: [
          { year: 'desc' },
          { month: 'desc' },
          { day: 'desc' },
        ],
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
