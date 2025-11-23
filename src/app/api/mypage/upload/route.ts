import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/user';
import { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
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

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: '파일이 없습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: '이미지 파일만 업로드 가능합니다. (JPG, PNG, WEBP)',
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: '파일 크기는 5MB를 초과할 수 없습니다.',
        } as ApiResponse,
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'profiles');
    const filepath = join(uploadDir, filename);

    // Create upload directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    await writeFile(filepath, buffer);

    // Return public URL
    const url = `/uploads/profiles/${filename}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          url,
          filename,
          size: file.size,
          type: file.type,
        },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '파일 업로드 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
