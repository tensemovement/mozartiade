import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { hashPassword } from '@/lib/auth/admin';
import { ApiResponse, Admin, AdminUpdateRequest } from '@/types';

// PUT - Update admin
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Only SUPER_ADMIN can update admins
    if (!hasMinimumRole(authResult.admin.role, 'SUPER_ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    const body: AdminUpdateRequest = await req.json();
    const { email, password, name, role } = body;

    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: '관리자를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // If email is being changed, check if new email already exists
    if (email && email !== existingAdmin.email) {
      const emailExists = await prisma.admin.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            error: '이미 존재하는 이메일입니다.',
          } as ApiResponse,
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Update admin
    const admin = await prisma.admin.update({
      where: { id },
      data: updateData,
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
      { status: 200 }
    );
  } catch (error) {
    console.error('Update admin error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '관리자 수정 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE - Delete admin
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Only SUPER_ADMIN can delete admins
    if (!hasMinimumRole(authResult.admin.role, 'SUPER_ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (authResult.admin.id === id) {
      return NextResponse.json(
        {
          success: false,
          error: '자기 자신은 삭제할 수 없습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: '관리자를 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Delete admin
    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        data: { message: '관리자가 삭제되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete admin error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '관리자 삭제 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
