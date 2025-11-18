import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Work } from '@/types';

// GET - Get single work
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const work = await prisma.work.findUnique({
      where: { id: params.id },
      include: {
        movements: {
          orderBy: {
            order: 'asc',
          },
        },
      },
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

    return NextResponse.json(
      {
        success: true,
        data: work,
      } as ApiResponse<Work>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// PUT - Update work
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Editor and above can update works
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

    // Check if work exists
    const existingWork = await prisma.work.findUnique({
      where: { id: params.id },
    });

    if (!existingWork) {
      return NextResponse.json(
        {
          success: false,
          error: '작품을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Update work
    const work = await prisma.work.update({
      where: { id: params.id },
      data: {
        catalogNumber: body.catalogNumber,
        catalogNumberNumeric: body.catalogNumberNumeric,
        catalogNumberSuffix: body.catalogNumberSuffix,
        year: body.year,
        month: body.month,
        day: body.day,
        compositionOrder: body.compositionOrder,
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        genre: body.genre,
        youtubeUrl: body.youtubeUrl,
        sheetMusicUrl: body.sheetMusicUrl,
        compositionDetails: body.compositionDetails,
        highlight: body.highlight,
        image: body.image,
        detailImage: body.detailImage,
        behindStory: body.behindStory,
        usageExamples: body.usageExamples,
      },
      include: {
        movements: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: work,
      } as ApiResponse<Work>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 수정 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE - Delete work
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Admin and above can delete works
    if (!hasMinimumRole(authResult.admin.role, 'ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Check if work exists
    const existingWork = await prisma.work.findUnique({
      where: { id: params.id },
    });

    if (!existingWork) {
      return NextResponse.json(
        {
          success: false,
          error: '작품을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Delete work (movements will be cascade deleted)
    await prisma.work.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        success: true,
        data: { message: '작품이 삭제되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 삭제 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
