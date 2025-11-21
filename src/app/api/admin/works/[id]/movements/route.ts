import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Movement } from '@/types';

// POST - Create movement for a work
export async function POST(
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

    // Editor and above can create movements
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
    const { order, title, titleEn, character, description, youtubeUrl, highlights } = body;

    // Check if work exists
    const work = await prisma.work.findUnique({
      where: { id: params.id },
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

    // Create movement
    const movement = await prisma.movement.create({
      data: {
        workId: params.id,
        order,
        title,
        titleEn,
        character,
        description,
        youtubeUrl,
        highlights,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: movement,
      } as ApiResponse<Movement>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create movement error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '악장 생성 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
