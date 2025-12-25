import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, url, description, order } = body;

    const relatedLink = await prisma.relatedLink.create({
      data: {
        workId: id,
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
    console.error('Error creating related link:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create related link',
      },
      { status: 500 }
    );
  }
}
