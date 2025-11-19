import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';
import { AdminLoginRequest, ApiResponse, AdminLoginResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: AdminLoginRequest = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: '이메일과 비밀번호를 입력해주세요.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: '이메일 또는 비밀번호가 올바르지 않습니다.',
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: '이메일 또는 비밀번호가 올바르지 않습니다.',
        } as ApiResponse,
        { status: 401 }
      );
    }

    // Generate token
    const { password: _, ...adminWithoutPassword } = admin;
    const token = generateToken(adminWithoutPassword);

    return NextResponse.json(
      {
        success: true,
        data: {
          admin: adminWithoutPassword,
          token,
        } as AdminLoginResponse,
      } as ApiResponse<AdminLoginResponse>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '로그인 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
