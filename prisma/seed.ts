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

async function main() {
  console.log('🎵 Starting Mozart works seeding...')

  // Read seed data
  const seedDataPath = path.join(__dirname, 'seed-data.json')
  const seedData: SeedWork[] = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'))

  // Read movements data
  const movementsDataPath = path.join(__dirname, 'movements-data.json')
  const movementsData: Record<string, { title: string; movements: MovementData[] }> = JSON.parse(
    fs.readFileSync(movementsDataPath, 'utf-8')
  )

  console.log(`📚 Found ${seedData.length} works to seed`)
  console.log(`🎼 Found ${Object.keys(movementsData).length} works with movement data`)

  // Clear existing data
  console.log('🗑️  Clearing existing works...')
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

  console.log('\n🎉 Seeding completed!')
  console.log(`✅ Successfully created: ${successCount} works`)
  console.log(`🎼 Successfully created: ${movementsCreated} movements`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} works`)
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
