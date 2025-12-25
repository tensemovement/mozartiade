import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, url, description, order } = body;

    const relatedLink = await prisma.relatedLink.update({
      where: { id },
      data: {
        title,
        url,
        description,
        order,
      },
    });

    return NextResponse.json({
      success: true,
      data: relatedLink,
    });
  } catch (error) {
    console.error('Error updating related link:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update related link',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.relatedLink.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error deleting related link:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete related link',
      },
      { status: 500 }
    );
  }
}
