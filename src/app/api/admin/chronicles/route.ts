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
    const yearParam = searchParams.get('year');
    const year = yearParam && yearParam.trim() !== '' ? yearParam.trim() : null;
    const reorderMode = searchParams.get('reorderMode') === 'true';

    // When reorder mode is enabled, show all items on one page (no pagination)
    const limit = reorderMode ? 9999 : parseInt(searchParams.get('limit') || '20');
    const skip = reorderMode ? 0 : (page - 1) * limit;

    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const highlight = searchParams.get('highlight') || '';
    const isVisible = searchParams.get('isVisible') || '';
    const order = searchParams.get('order') || 'desc';

    console.log('=== Chronicles API Debug ===');
    console.log('Raw yearParam:', yearParam);
    console.log('Processed year:', year);
    console.log('All params:', { search, type, year, highlight, isVisible, order, page });

    // Build where clause
    const where: any = {};

    if (search) {
      // When search is present, use AND to combine all conditions
      const andConditions: any[] = [];

      // Search condition (title OR work.title)
      andConditions.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { work: { title: { contains: search, mode: 'insensitive' } } }
        ]
      });

      // Other filters
      if (type) {
        andConditions.push({ type });
      }
      if (year) {
        andConditions.push({ year: parseInt(year) });
      }
      if (highlight) {
        andConditions.push({ highlight: highlight === 'true' });
      }
      if (isVisible) {
        andConditions.push({ isVisible: isVisible === 'true' });
      }

      where.AND = andConditions;
    } else {
      // When no search, add filters directly
      if (type) {
        where.type = type;
      }
      if (year) {
        where.year = parseInt(year);
      }
      if (highlight) {
        where.highlight = highlight === 'true';
      }
      if (isVisible) {
        where.isVisible = isVisible === 'true';
      }
    }

    console.log('Final WHERE clause:', JSON.stringify(where, null, 2));

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

    console.log('Query results:', { total, chroniclesCount: chronicles.length, skip, limit });

    const response = {
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
    };

    console.log('API Response structure:', {
      success: response.success,
      hasData: !!response.data,
      chroniclesInResponse: response.data.chronicles.length,
      paginationInResponse: response.data.pagination,
    });
    console.log('=== End Debug ===\n');

    return NextResponse.json(response as ApiResponse, { status: 200 });
  } catch (error) {
    console.error('Get chronicles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '연대기 목록 조회 중 오류가 발생했습니다.',
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
      isVisible,
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
        isVisible: isVisible || false,
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
        error: '연대기 생성 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
