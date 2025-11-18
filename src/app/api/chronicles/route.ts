import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const type = searchParams.get('type') as 'life' | 'work' | null;
    const highlight = searchParams.get('highlight') === 'true';

    const chronicles = await prisma.chronicle.findMany({
      where: {
        ...(year && { year: parseInt(year) }),
        ...(type && { type }),
        ...(highlight && { highlight: true }),
      },
      include: {
        work: {
          select: {
            id: true,
            catalogNumber: true,
            title: true,
            titleEn: true,
            description: true,
            genre: true,
            youtubeUrl: true,
            sheetMusicUrl: true,
            compositionDetails: true,
            voteCount: true,
            image: true,
          }
        }
      },
      orderBy: [
        { year: 'asc' },
        { month: 'asc' },
        { day: 'asc' }
      ]
    });

    // Transform to ChronologyItem format for compatibility
    const chronologyItems = chronicles.map((chronicle: any) => {
      if (chronicle.type === 'life') {
        return {
          id: chronicle.id,
          type: 'life' as const,
          year: chronicle.year,
          month: chronicle.month,
          day: chronicle.day,
          title: chronicle.title || '',
          description: chronicle.description || '',
          location: chronicle.location,
          highlight: chronicle.highlight,
          image: chronicle.image,
        };
      } else {
        // type === 'work'
        const work = chronicle.work;
        return {
          id: chronicle.id,
          type: 'work' as const,
          year: chronicle.year,
          month: chronicle.month,
          day: chronicle.day,
          title: work?.title || '',
          titleEn: work?.titleEn,
          description: work?.description || '',
          catalogNumber: work?.catalogNumber,
          genre: work?.genre,
          youtubeUrl: work?.youtubeUrl,
          sheetMusicUrl: work?.sheetMusicUrl,
          compositionDetails: work?.compositionDetails,
          voteCount: work?.voteCount,
          highlight: chronicle.highlight,
          image: chronicle.image || work?.image,
        };
      }
    });

    return NextResponse.json({
      success: true,
      data: chronologyItems,
      total: chronologyItems.length
    });
  } catch (error) {
    console.error('Error fetching chronicles:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch chronicles'
      },
      { status: 500 }
    );
  }
}
