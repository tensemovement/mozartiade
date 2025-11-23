import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types';

// GET - Get current user profile
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: '로그인이 필요합니다.',
        } as ApiResponse,
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        provider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: '사용자를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '프로필 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// PATCH - Update user profile
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: '로그인이 필요합니다.',
        } as ApiResponse,
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, image } = body;

    // Validate input
    const updateData: any = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: '이름은 비어있을 수 없습니다.',
          } as ApiResponse,
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (image !== undefined) {
      if (typeof image !== 'string') {
        return NextResponse.json(
          {
            success: false,
            error: '잘못된 이미지 URL입니다.',
          } as ApiResponse,
          { status: 400 }
        );
      }
      updateData.image = image;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        provider: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '프로필 업데이트 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
