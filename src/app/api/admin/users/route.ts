import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, User } from '@/types';

// GET - List all users
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

    // Admin and above can view users
    if (!hasMinimumRole(authResult.admin.role, 'ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get users and total count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          users,
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
    console.error('Get users error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '사용자 목록 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
