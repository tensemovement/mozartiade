import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/works/[id]
 * Fetch a single Mozart work with all details including movements
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const work = await prisma.work.findUnique({
      where: { id },
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
    })

    if (!work) {
      return NextResponse.json(
        {
          success: false,
          error: 'Work not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: work,
    })
  } catch (error) {
    console.error('Error fetching work:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch work',
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/works/[id]
 * Update vote count or other work properties
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    // For now, we'll just support incrementing vote count
    if (body.action === 'incrementVote') {
      const work = await prisma.work.update({
        where: { id },
        data: {
          voteCount: {
            increment: 1,
          },
        },
      })

      return NextResponse.json({
        success: true,
        data: work,
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating work:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update work',
      },
      { status: 500 }
    )
  }
}
