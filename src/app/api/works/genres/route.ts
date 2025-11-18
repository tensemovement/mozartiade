import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/works/genres
 * Get list of all unique genres
 */
export async function GET() {
  try {
    const genres = await prisma.work.findMany({
      where: {
        genre: {
          not: null,
        },
      },
      select: {
        genre: true,
      },
      distinct: ['genre'],
      orderBy: {
        genre: 'asc',
      },
    })

    const genreList = genres.map((g) => g.genre).filter((g): g is string => g !== null)

    return NextResponse.json({
      success: true,
      data: genreList,
    })
  } catch (error) {
    console.error('Error fetching genres:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch genres',
      },
      { status: 500 }
    )
  }
}
