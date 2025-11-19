import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Work } from '@/types';

// GET - List all works (admin version with all fields)
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
    const search = searchParams.get('search') || '';
    const genre = searchParams.get('genre') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } },
        { catalogNumber: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (genre) {
      where.genre = genre;
    }

    // Get works and total count
    const [works, total] = await Promise.all([
      prisma.work.findMany({
        where,
        skip,
        take: limit,
        include: {
          movements: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: [
          { year: 'desc' },
          { compositionOrder: 'desc' },
        ],
      }),
      prisma.work.count({ where }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          works,
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
    console.error('Get works error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 목록 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// POST - Create new work
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

    // Editor and above can create works
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
      catalogNumber,
      catalogNumberNumeric,
      catalogNumberSuffix,
      catalogNumberFirstEd,
      catalogNumberNinthEd,
      year,
      month,
      day,
      compositionOrder,
      compositionLocation,
      title,
      titleEn,
      description,
      genre,
      youtubeUrl,
      sheetMusicUrl,
      compositionDetails,
      highlight,
      image,
      detailImage,
      behindStory,
      usageExamples,
    } = body;

    // Create work
    const work = await prisma.work.create({
      data: {
        catalogNumber,
        catalogNumberNumeric,
        catalogNumberSuffix,
        catalogNumberFirstEd,
        catalogNumberNinthEd,
        year,
        month,
        day,
        compositionOrder,
        compositionLocation,
        title,
        titleEn,
        description,
        genre,
        youtubeUrl,
        sheetMusicUrl,
        compositionDetails,
        highlight: highlight || false,
        image,
        detailImage,
        behindStory,
        usageExamples: usageExamples || [],
      },
      include: {
        movements: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: work,
      } as ApiResponse<Work>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 생성 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
