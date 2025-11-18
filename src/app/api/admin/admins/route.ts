import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { hashPassword } from '@/lib/auth';
import { ApiResponse, Admin, AdminCreateRequest } from '@/types';

// GET - List all admins
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

    // Only SUPER_ADMIN can view admin list
    if (!hasMinimumRole(authResult.admin.role, 'SUPER_ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: admins,
      } as ApiResponse<Admin[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get admins error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '관리자 목록 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// POST - Create new admin
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

    // Only SUPER_ADMIN can create admins
    if (!hasMinimumRole(authResult.admin.role, 'SUPER_ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    const body: AdminCreateRequest = await req.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        {
          success: false,
          error: '모든 필드를 입력해주세요.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: '이미 존재하는 이메일입니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: admin,
      } as ApiResponse<Admin>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '관리자 생성 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
