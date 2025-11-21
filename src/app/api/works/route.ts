import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/works
 * Fetch Mozart works with filtering, sorting, and pagination
 *
 * Query params:
 * - genre: Filter by genre
 * - search: Search in title/titleEn/description
 * - highlight: Filter highlighted works (true/false)
 * - sort: Sort by field (year, voteCount, title, catalogNumber)
 * - order: Sort order (asc/desc)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Filters
    const genre = searchParams.get('genre')
    const search = searchParams.get('search')
    const highlight = searchParams.get('highlight')

    // Sorting
    const sort = searchParams.get('sort') || 'year'
    const order = searchParams.get('order') || 'asc'

    // Build where clause
    const where: any = {
      isVisible: true, // 사용자 화면에서는 노출 항목만 표시
    }

    if (genre) {
      where.genre = genre
    }

    if (highlight !== null && highlight !== '') {
      where.highlight = highlight === 'true'
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { catalogNumber: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Build orderBy clause
    let orderBy: any

    // Special handling for catalog number sorting
    if (sort === 'catalogNumber') {
      orderBy = [
        { catalogNumberNumeric: order },
        { catalogNumberSuffix: order },
      ]
    } else if (sort === 'year') {
      // Year sorting includes compositionOrder for proper chronological ordering
      orderBy = [
        { year: order },
        { compositionOrder: order },
        { month: order },
        { day: order },
      ]
    } else {
      orderBy = { [sort]: order }
    }

    // Execute query
    const [works, total] = await Promise.all([
      prisma.work.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          catalogNumber: true,
          catalogNumberNumeric: true,
          catalogNumberSuffix: true,
          year: true,
          month: true,
          day: true,
          compositionOrder: true,
          title: true,
          titleEn: true,
          description: true,
          genre: true,
          youtubeUrl: true,
          sheetMusicUrl: true,
          compositionDetails: true,
          highlight: true,
          image: true,
          voteCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.work.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        works,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching works:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch works',
      },
      { status: 500 }
    )
  }
}
