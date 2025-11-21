import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Chronicle } from '@/types';

// GET - Get single chronicle
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

    const chronicle = await prisma.chronicle.findUnique({
      where: { id: params.id },
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

    if (!chronicle) {
      return NextResponse.json(
        {
          success: false,
          error: '일대기를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: chronicle,
      } as ApiResponse<Chronicle>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get chronicle error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '일대기 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// PUT - Update chronicle
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

    // Editor and above can update chronicles
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

    // Check if chronicle exists
    const existingChronicle = await prisma.chronicle.findUnique({
      where: { id: params.id },
    });

    if (!existingChronicle) {
      return NextResponse.json(
        {
          success: false,
          error: '일대기를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // If workId is provided, verify it exists
    if (body.workId) {
      const work = await prisma.work.findUnique({
        where: { id: body.workId },
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

    // Update chronicle
    const chronicle = await prisma.chronicle.update({
      where: { id: params.id },
      data: {
        type: body.type,
        year: body.year,
        month: body.month,
        day: body.day,
        title: body.title,
        description: body.description,
        location: body.location,
        workId: body.workId,
        highlight: body.highlight,
        image: body.image,
        isVisible: body.isVisible,
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
      { status: 200 }
    );
  } catch (error) {
    console.error('Update chronicle error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '일대기 수정 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE - Delete chronicle
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

    // Admin and above can delete chronicles
    if (!hasMinimumRole(authResult.admin.role, 'ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Check if chronicle exists
    const existingChronicle = await prisma.chronicle.findUnique({
      where: { id: params.id },
    });

    if (!existingChronicle) {
      return NextResponse.json(
        {
          success: false,
          error: '일대기를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Delete chronicle
    await prisma.chronicle.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        success: true,
        data: { message: '일대기가 삭제되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete chronicle error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '일대기 삭제 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
