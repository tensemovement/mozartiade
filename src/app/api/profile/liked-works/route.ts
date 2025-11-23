import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';

// 좋아하는 작품 목록 조회
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 좋아요한 작품 목록 가져오기
    const likedWorks = await prisma.workLike.findMany({
      where: { userId: user.id },
      include: {
        work: {
          include: {
            movements: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const works = likedWorks.map((like: any) => like.work);

    return NextResponse.json({
      success: true,
      data: works,
    });
  } catch (error) {
    console.error('좋아하는 작품 목록 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '좋아하는 작품 목록을 불러오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
