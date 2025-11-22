import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/user';
import prisma from '@/lib/prisma';

// 좋아요 토글 (추가/제거)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const workId = params.id;

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작품 존재 확인
    const work = await prisma.work.findUnique({
      where: { id: workId },
    });

    if (!work) {
      return NextResponse.json(
        { error: '작품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 좋아요한 상태인지 확인
    const existingLike = await prisma.workLike.findUnique({
      where: {
        userId_workId: {
          userId: user.id,
          workId: workId,
        },
      },
    });

    if (existingLike) {
      // 좋아요 취소
      await prisma.$transaction([
        prisma.workLike.delete({
          where: { id: existingLike.id },
        }),
        prisma.work.update({
          where: { id: workId },
          data: { likesCount: { decrement: 1 } },
        }),
      ]);

      const updatedWork = await prisma.work.findUnique({
        where: { id: workId },
        select: { likesCount: true },
      });

      return NextResponse.json({
        liked: false,
        likesCount: updatedWork?.likesCount || 0,
      });
    } else {
      // 좋아요 추가
      await prisma.$transaction([
        prisma.workLike.create({
          data: {
            userId: user.id,
            workId: workId,
          },
        }),
        prisma.work.update({
          where: { id: workId },
          data: { likesCount: { increment: 1 } },
        }),
      ]);

      const updatedWork = await prisma.work.findUnique({
        where: { id: workId },
        select: { likesCount: true },
      });

      return NextResponse.json({
        liked: true,
        likesCount: updatedWork?.likesCount || 0,
      });
    }
  } catch (error) {
    console.error('좋아요 토글 오류:', error);
    return NextResponse.json(
      { error: '좋아요 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 좋아요 상태 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ liked: false, likesCount: 0 });
    }

    const workId = params.id;

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ liked: false, likesCount: 0 });
    }

    // 작품 찾기 및 좋아요 상태 확인
    const [work, like] = await Promise.all([
      prisma.work.findUnique({
        where: { id: workId },
        select: { likesCount: true },
      }),
      prisma.workLike.findUnique({
        where: {
          userId_workId: {
            userId: user.id,
            workId: workId,
          },
        },
      }),
    ]);

    return NextResponse.json({
      liked: !!like,
      likesCount: work?.likesCount || 0,
    });
  } catch (error) {
    console.error('좋아요 상태 조회 오류:', error);
    return NextResponse.json({ liked: false, likesCount: 0 });
  }
}
