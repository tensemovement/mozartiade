import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Movement } from '@/types';

// PUT - Update movement
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

    // Editor and above can update movements
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

    // Check if movement exists
    const existingMovement = await prisma.movement.findUnique({
      where: { id: params.id },
    });

    if (!existingMovement) {
      return NextResponse.json(
        {
          success: false,
          error: '악장을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Update movement
    const movement = await prisma.movement.update({
      where: { id: params.id },
      data: {
        order: body.order,
        title: body.title,
        titleEn: body.titleEn,
        character: body.character,
        description: body.description,
        youtubeUrl: body.youtubeUrl,
        duration: body.duration,
        highlights: body.highlights,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: movement,
      } as ApiResponse<Movement>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update movement error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '악장 수정 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE - Delete movement
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

    // Admin and above can delete movements
    if (!hasMinimumRole(authResult.admin.role, 'ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Check if movement exists
    const existingMovement = await prisma.movement.findUnique({
      where: { id: params.id },
    });

    if (!existingMovement) {
      return NextResponse.json(
        {
          success: false,
          error: '악장을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Delete movement
    await prisma.movement.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        success: true,
        data: { message: '악장이 삭제되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete movement error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '악장 삭제 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
