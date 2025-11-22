import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, hasMinimumRole } from '@/lib/adminAuth';
import { ApiResponse, Work } from '@/types';
import { withTransaction } from '@/lib/transaction';

// GET - Get single work
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

    const work = await prisma.work.findUnique({
      where: { id: params.id },
      include: {
        movements: {
          orderBy: {
            order: 'asc',
          },
        },
        relatedLinks: {
          orderBy: {
            order: 'asc',
          },
        },
      },
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

    return NextResponse.json(
      {
        success: true,
        data: work,
      } as ApiResponse<Work>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 조회 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// PUT - Update work with all related data in a transaction
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

    // Editor and above can update works
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
    const {
      movements = [],
      deletedMovementIds = [],
      relatedLinks = [],
      deletedRelatedLinkIds = [],
      ...workData
    } = body;

    // Check if work exists
    const existingWork = await prisma.work.findUnique({
      where: { id: params.id },
    });

    if (!existingWork) {
      return NextResponse.json(
        {
          success: false,
          error: '작품을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Execute all operations in a transaction
    const work = await withTransaction(async (tx) => {
      // 1. Delete removed movements
      if (deletedMovementIds.length > 0) {
        await tx.movement.deleteMany({
          where: {
            id: { in: deletedMovementIds },
            workId: params.id, // Ensure movements belong to this work
          },
        });
      }

      // 2. Delete removed related links
      if (deletedRelatedLinkIds.length > 0) {
        await tx.relatedLink.deleteMany({
          where: {
            id: { in: deletedRelatedLinkIds },
            workId: params.id, // Ensure links belong to this work
          },
        });
      }

      // 3. Update or create movements
      for (const movement of movements) {
        if (movement.id) {
          // Update existing movement
          await tx.movement.update({
            where: { id: movement.id },
            data: {
              order: movement.order,
              title: movement.title,
              titleEn: movement.titleEn,
              character: movement.character,
              description: movement.description,
              youtubeUrl: movement.youtubeUrl,
              highlights: movement.highlights,
            },
          });
        } else {
          // Create new movement
          await tx.movement.create({
            data: {
              workId: params.id,
              order: movement.order,
              title: movement.title,
              titleEn: movement.titleEn,
              character: movement.character,
              description: movement.description,
              youtubeUrl: movement.youtubeUrl,
              highlights: movement.highlights,
            },
          });
        }
      }

      // 4. Update or create related links
      for (const link of relatedLinks) {
        if (link.id) {
          // Update existing link
          await tx.relatedLink.update({
            where: { id: link.id },
            data: {
              title: link.title,
              url: link.url,
              description: link.description,
              order: link.order,
            },
          });
        } else {
          // Create new link
          await tx.relatedLink.create({
            data: {
              workId: params.id,
              title: link.title,
              url: link.url,
              description: link.description,
              order: link.order,
            },
          });
        }
      }

      // 5. Update work (last to ensure all related data is consistent)
      return await tx.work.update({
        where: { id: params.id },
        data: {
          catalogNumber: workData.catalogNumber,
          catalogNumberNumeric: workData.catalogNumberNumeric,
          catalogNumberSuffix: workData.catalogNumberSuffix,
          catalogNumberFirstEd: workData.catalogNumberFirstEd,
          catalogNumberNinthEd: workData.catalogNumberNinthEd,
          year: workData.year,
          month: workData.month,
          day: workData.day,
          compositionOrder: workData.compositionOrder,
          compositionLocation: workData.compositionLocation,
          title: workData.title,
          titleEn: workData.titleEn,
          description: workData.description,
          genre: workData.genre,
          instruments: workData.instruments || [],
          youtubeUrl: workData.youtubeUrl,
          sheetMusicUrl: workData.sheetMusicUrl,
          compositionDetails: workData.compositionDetails,
          highlight: workData.highlight,
          image: workData.image,
          detailImage: workData.detailImage,
          behindStory: workData.behindStory,
          usageExamples: workData.usageExamples,
          isVisible: workData.isVisible,
        },
        include: {
          movements: {
            orderBy: {
              order: 'asc',
            },
          },
          relatedLinks: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        data: work,
      } as ApiResponse<Work>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 수정 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// DELETE - Delete work
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

    // Admin and above can delete works
    if (!hasMinimumRole(authResult.admin.role, 'ADMIN')) {
      return NextResponse.json(
        {
          success: false,
          error: '권한이 없습니다.',
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Check if work exists
    const existingWork = await prisma.work.findUnique({
      where: { id: params.id },
    });

    if (!existingWork) {
      return NextResponse.json(
        {
          success: false,
          error: '작품을 찾을 수 없습니다.',
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Delete work (movements will be cascade deleted)
    await prisma.work.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        success: true,
        data: { message: '작품이 삭제되었습니다.' },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete work error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '작품 삭제 중 오류가 발생했습니다.',
      } as ApiResponse,
      { status: 500 }
    );
  }
}
