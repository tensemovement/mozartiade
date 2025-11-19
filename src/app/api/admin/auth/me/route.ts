import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth } from '@/lib/adminAuth';
import { ApiResponse, Admin } from '@/types';

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

    // Get fresh admin data from database
    const admin = await prisma.admin.findUnique({
      where: { id: authResult.admin.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: '관리자를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: admin,
      } as ApiResponse<Admin>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get admin info error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '관리자 정보 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
