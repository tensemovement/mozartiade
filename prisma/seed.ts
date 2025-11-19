import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface SeedWork {
  catalogNumber?: string
  catalogNumberFirstEd?: string
  catalogNumberNinthEd?: string
  year: number
  month?: number
  day?: number
  compositionLocation?: string
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

interface MovementData {
  order: number
  title: string
  titleEn?: string
  character?: string
  description: string
  youtubeUrl?: string
  duration?: string
  highlights?: string
}

interface SeedChronicle {
  type: 'life' | 'work'
  year: number
  month?: number | null
  day?: number | null
  // For type='life'
  title?: string
  description?: string
  location?: string | null
  // For type='work'
  catalogNumber?: string
  // Common
  highlight?: boolean
  image?: string | null
}

async function main() {
  console.log('🎵 Starting Mozart database seeding...')

  // Read seed data
  const seedDataPath = path.join(__dirname, 'seed-data.json')
  const seedData: SeedWork[] = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

  // Read movements data
  const movementsDataPath = path.join(__dirname, 'movements-data.json')
  const movementsData: Record<string, { title: string; movements: MovementData[] }> = JSON.parse(
    fs.readFileSync(movementsDataPath, 'utf-8')
  )

  // Read chronicle data
  const chronicleDataPath = path.join(__dirname, 'chronicle-data.json')
  const chronicleData: SeedChronicle[] = JSON.parse(fs.readFileSync(chronicleDataPath, 'utf-8'))

  console.log(`📚 Found ${seedData.length} works to seed`)
  console.log(`🎼 Found ${Object.keys(movementsData).length} works with movement data`)
  console.log(`📖 Found ${chronicleData.length} chronicle items to seed`)

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.chronicle.deleteMany({})
  await prisma.movement.deleteMany({})
  await prisma.work.deleteMany({})

  // Seed works
  let successCount = 0
  let errorCount = 0
  let movementsCreated = 0

  for (const workData of seedData) {
    try {
      const work = await prisma.work.create({
        data: {
          catalogNumber: workData.catalogNumber,
          catalogNumberFirstEd: workData.catalogNumberFirstEd,
          catalogNumberNinthEd: workData.catalogNumberNinthEd,
          year: workData.year,
          month: workData.month,
          day: workData.day,
          compositionLocation: workData.compositionLocation,
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

      // Check if this work has movement data
      if (workData.catalogNumber && movementsData[workData.catalogNumber]) {
        const workMovements = movementsData[workData.catalogNumber].movements

        for (const movementData of workMovements) {
          await prisma.movement.create({
            data: {
              workId: work.id,
              order: movementData.order,
              title: movementData.title,
              titleEn: movementData.titleEn,
              character: movementData.character,
              description: movementData.description,
              youtubeUrl: movementData.youtubeUrl,
              duration: movementData.duration,
              highlights: movementData.highlights,
            },
          })
          movementsCreated++
        }

        console.log(`✅ Created: ${workData.catalogNumber} - ${workData.title} with ${workMovements.length} movements`)
      } else {
        console.log(`✅ Created: ${workData.catalogNumber} - ${workData.title}`)
      }

      successCount++
    } catch (error) {
      errorCount++
      console.error(`❌ Failed to create ${workData.catalogNumber}:`, error)
    }
  }

  // Seed chronicles
  console.log('\n📖 Seeding chronicles...')
  let chronicleSuccessCount = 0
  let chronicleErrorCount = 0

  for (const chronicleItem of chronicleData) {
    try {
      if (chronicleItem.type === 'life') {
        // 생애 사건 - title, description, location 사용
        await prisma.chronicle.create({
          data: {
            type: 'life',
            year: chronicleItem.year,
            month: chronicleItem.month || undefined,
            day: chronicleItem.day || undefined,
            title: chronicleItem.title!,
            description: chronicleItem.description || undefined,
            location: chronicleItem.location || undefined,
            highlight: chronicleItem.highlight || false,
            image: chronicleItem.image || undefined,
          },
        })

        console.log(`✅ Created chronicle (life): ${chronicleItem.year} - ${chronicleItem.title}`)
        chronicleSuccessCount++
      } else if (chronicleItem.type === 'work') {
        // 작품 작곡 - catalogNumber로 Work 찾아서 연결
        const work = await prisma.work.findUnique({
          where: { catalogNumber: chronicleItem.catalogNumber }
        })

        if (work) {
          await prisma.chronicle.create({
            data: {
              type: 'work',
              year: chronicleItem.year,
              month: chronicleItem.month || undefined,
              day: chronicleItem.day || undefined,
              workId: work.id,
              highlight: chronicleItem.highlight || false,
              image: chronicleItem.image || undefined,
            },
          })

          console.log(`✅ Created chronicle (work): ${chronicleItem.year} - ${work.title} (${chronicleItem.catalogNumber})`)
          chronicleSuccessCount++
        } else {
          console.log(`⚠️  Work not found for catalog number: ${chronicleItem.catalogNumber}`)
          chronicleErrorCount++
        }
      }
    } catch (error) {
      chronicleErrorCount++
      console.error(`❌ Failed to create chronicle item:`, error)
    }
  }

  console.log('\n🎉 Seeding completed!')
  console.log(`✅ Successfully created: ${successCount} works`)
  console.log(`🎼 Successfully created: ${movementsCreated} movements`)
  console.log(`📖 Successfully created: ${chronicleSuccessCount} chronicle items`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} works`)
  }
  if (chronicleErrorCount > 0) {
    console.log(`❌ Failed: ${chronicleErrorCount} chronicle items`)
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
