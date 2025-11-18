import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface SeedWork {
  catalogNumber?: string
  year: number
  month?: number
  day?: number
  title: string
  titleEn?: string
  description: string
  genre?: string
  youtubeUrl?: string
  sheetMusicUrl?: string
  compositionDetails?: string
  highlight?: boolean
  image?: string
  voteCount?: number
  detailImage?: string
  behindStory?: string
  usageExamples?: string[]
}

async function main() {
  console.log('🎵 Starting Mozart works seeding...')

  // Read seed data
  const seedDataPath = path.join(__dirname, 'seed-data.json')
  const seedData: SeedWork[] = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

  console.log(`📚 Found ${seedData.length} works to seed`)

  // Clear existing data
  console.log('🗑️  Clearing existing works...')
  await prisma.movement.deleteMany({})
  await prisma.work.deleteMany({})

  // Seed works
  let successCount = 0
  let errorCount = 0

  for (const workData of seedData) {
    try {
      await prisma.work.create({
        data: {
          catalogNumber: workData.catalogNumber,
          year: workData.year,
          month: workData.month,
          day: workData.day,
          title: workData.title,
          titleEn: workData.titleEn,
          description: workData.description,
          genre: workData.genre,
          youtubeUrl: workData.youtubeUrl,
          sheetMusicUrl: workData.sheetMusicUrl,
          compositionDetails: workData.compositionDetails,
          highlight: workData.highlight || false,
          image: workData.image,
          voteCount: workData.voteCount || 0,
          detailImage: workData.detailImage,
          behindStory: workData.behindStory,
          usageExamples: workData.usageExamples || [],
        },
      })
      successCount++
      console.log(`✅ Created: ${workData.catalogNumber} - ${workData.title}`)
    } catch (error) {
      errorCount++
      console.error(`❌ Failed to create ${workData.catalogNumber}:`, error)
    }
  }

  console.log('\n🎉 Seeding completed!')
  console.log(`✅ Successfully created: ${successCount} works`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} works`)
  }

  // Also seed the detailed "Magic Flute" movements if not already in data
  console.log('\n🎼 Seeding Magic Flute movements...')

  const magicFlute = await prisma.work.findFirst({
    where: { catalogNumber: 'K. 620' }
  })

  if (magicFlute) {
    const movements = [
      {
        workId: magicFlute.id,
        order: 1,
        title: '서곡',
        titleEn: 'Overture',
        description: '장엄하면서도 경쾌한 서곡으로 오페라의 분위기를 완벽하게 열어줍니다.',
        youtubeUrl: 'https://www.youtube.com/watch?v=OP9SgPUPYvs',
        duration: '7:30',
        highlights: '프리메이슨의 상징인 3화음으로 시작하는 강렬한 도입부가 인상적입니다.',
      },
      {
        workId: magicFlute.id,
        order: 2,
        title: '나는 새잡이',
        titleEn: 'Der Vogelfänger bin ich ja',
        character: '파파게노',
        description: '파파게노가 자신을 소개하는 경쾌하고 유쾌한 아리아입니다.',
        duration: '2:45',
        highlights: '단순하면서도 중독성 있는 선율로 대중적으로 가장 사랑받는 아리아 중 하나입니다.',
      },
      {
        workId: magicFlute.id,
        order: 3,
        title: '이 초상화는 마법처럼 아름다워',
        titleEn: 'Dies Bildnis ist bezaubernd schön',
        character: '타미노',
        description: '타미노가 파미나의 초상화를 보고 부르는 사랑의 아리아입니다.',
        duration: '4:15',
        highlights: '순수하고 진실한 사랑의 감정이 아름다운 선율로 표현됩니다.',
      },
      {
        workId: magicFlute.id,
        order: 4,
        title: '오, 떨지 말아요, 내 아들이여',
        titleEn: 'O zittre nicht, mein lieber Sohn',
        character: '밤의 여왕',
        description: '밤의 여왕이 타미노에게 딸 파미나의 구출을 부탁하는 아리아입니다.',
        duration: '5:00',
        highlights: '극적인 레치타티보와 화려한 콜로라투라가 돋보입니다.',
      },
      {
        workId: magicFlute.id,
        order: 5,
        title: '복수의 마음이 끓어올라',
        titleEn: 'Der Hölle Rache kocht in meinem Herzen',
        character: '밤의 여왕',
        description: '밤의 여왕의 복수심이 폭발하는 초고난도 아리아입니다.',
        youtubeUrl: 'https://www.youtube.com/watch?v=YuBeBjqKSGQ',
        duration: '3:00',
        highlights: 'F6까지 올라가는 초고음과 화려한 기교가 압권인 오페라 역사상 가장 어려운 아리아 중 하나입니다.',
      },
      {
        workId: magicFlute.id,
        order: 6,
        title: '파파파파 파파게나',
        titleEn: 'Pa-Pa-Pa-Papagena',
        character: '파파게노, 파파게나',
        description: '파파게노와 파파게나가 부르는 사랑스러운 이중창입니다.',
        duration: '2:30',
        highlights: '파파파파로 시작하는 귀여운 가사와 경쾌한 리듬이 인상적입니다.',
      },
      {
        workId: magicFlute.id,
        order: 7,
        title: '이 신성한 전당에서',
        titleEn: "In diesen heil'gen Hallen",
        character: '자라스트로',
        description: '자라스트로가 지혜와 사랑의 세계를 노래하는 숭고한 아리아입니다.',
        duration: '4:00',
        highlights: '깊고 풍부한 베이스 음색과 장엄한 선율이 조화를 이룹니다.',
      },
      {
        workId: magicFlute.id,
        order: 8,
        title: '마술 종소리',
        titleEn: 'Das klinget so herrlich',
        character: '합창',
        description: '파파게노가 마술 방울을 울리자 모두가 춤추는 신비로운 장면입니다.',
        duration: '1:50',
        highlights: '글로켄슈필의 맑은 소리가 마법 같은 분위기를 만듭니다.',
      },
    ]

    for (const movement of movements) {
      await prisma.movement.create({ data: movement })
    }

    console.log(`✅ Created ${movements.length} movements for Magic Flute`)
  }

  console.log('\n✨ All done!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
