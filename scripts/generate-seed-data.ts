import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read the complete works data
const completeWorks = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../prisma/mozart-complete-works.json'), 'utf-8')
)

// Read the additional works data
const additionalWorks = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../prisma/additional-works.json'), 'utf-8')
)

interface SeedWork {
  catalogNumber: string
  year: number
  month?: number
  day?: number
  title: string
  titleEn: string
  description: string
  genre: string
  youtubeUrl?: string
  sheetMusicUrl?: string
  compositionDetails?: string
  highlight?: boolean
  image?: string
  voteCount: number
  detailImage?: string
  behindStory?: string
  usageExamples?: string[]
}

const seedData: SeedWork[] = []

// Process Symphonies
completeWorks.symphonies.forEach((sym: any) => {
  const nickname = sym.nickname ? ` "${sym.nickname}"` : ''
  seedData.push({
    catalogNumber: sym.k,
    year: sym.year,
    title: `교향곡 제${sym.no}번 ${sym.key}장조${nickname}`,
    titleEn: `Symphony No. ${sym.no} in ${sym.key} major${nickname}`,
    description: `${sym.movements}악장으로 구성된 ${sym.year}년 작곡된 교향곡`,
    genre: '교향곡',
    compositionDetails: `${sym.movements}개 악장으로 구성되어 있으며, ${sym.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Symphony_No.${sym.no}`,
    highlight: sym.highlight || false,
    voteCount: sym.highlight ? Math.floor(Math.random() * 5000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Piano Concertos
completeWorks.piano_concertos.forEach((pc: any) => {
  const nickname = pc.nickname ? ` "${pc.nickname}"` : ''
  const special = pc.special ? ` (${pc.special})` : ''
  seedData.push({
    catalogNumber: pc.k,
    year: pc.year,
    title: `피아노 협주곡 제${pc.no}번 ${pc.key}장조${nickname}${special}`,
    titleEn: `Piano Concerto No. ${pc.no} in ${pc.key} major${nickname}${special}`,
    description: `${pc.movements}악장으로 구성된 피아노 협주곡`,
    genre: '협주곡',
    compositionDetails: `${pc.movements}개 악장으로 구성된 피아노 협주곡으로 ${pc.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Piano_Concerto_No.${pc.no}`,
    highlight: pc.highlight || false,
    voteCount: pc.highlight ? Math.floor(Math.random() * 5000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Operas
completeWorks.operas.forEach((opera: any) => {
  const incomplete = opera.incomplete ? ' (미완성)' : ''
  seedData.push({
    catalogNumber: opera.k,
    year: opera.year,
    title: opera.title,
    titleEn: opera.title,
    description: `${opera.genre}${incomplete}`,
    genre: '오페라',
    compositionDetails: `${opera.year}년에 작곡된 ${opera.genre} 형식의 오페라입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${opera.title.replace(/ /g, '_')}`,
    highlight: opera.highlight || false,
    voteCount: opera.highlight ? Math.floor(Math.random() * 8000) + 3000 : Math.floor(Math.random() * 2000) + 500,
  })
})

// Process Violin Concertos
completeWorks.violin_concertos.forEach((vc: any) => {
  const nickname = vc.nickname ? ` "${vc.nickname}"` : ''
  seedData.push({
    catalogNumber: vc.k,
    year: vc.year,
    title: `바이올린 협주곡 제${vc.no}번 ${vc.key}장조${nickname}`,
    titleEn: `Violin Concerto No. ${vc.no} in ${vc.key} major${nickname}`,
    description: `${vc.movements}악장으로 구성된 바이올린 협주곡`,
    genre: '협주곡',
    compositionDetails: `${vc.movements}개 악장으로 구성되어 있습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Violin_Concerto_No.${vc.no}`,
    highlight: vc.highlight || false,
    voteCount: vc.highlight ? Math.floor(Math.random() * 4000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Piano Sonatas
completeWorks.piano_sonatas.forEach((ps: any) => {
  const nickname = ps.nickname ? ` "${ps.nickname}"` : ''
  seedData.push({
    catalogNumber: ps.k,
    year: ps.year,
    title: `피아노 소나타 제${ps.no}번 ${ps.key}장조${nickname}`,
    titleEn: `Piano Sonata No. ${ps.no} in ${ps.key} major${nickname}`,
    description: `${ps.movements}악장으로 구성된 피아노 소나타`,
    genre: '피아노',
    compositionDetails: `${ps.movements}개 악장으로 구성된 독주 피아노를 위한 소나타입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Piano_Sonata_No.${ps.no}`,
    highlight: ps.highlight || false,
    voteCount: ps.highlight ? Math.floor(Math.random() * 6000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process String Quartets
completeWorks.string_quartets.forEach((sq: any) => {
  const nickname = sq.nickname ? ` "${sq.nickname}"` : ''
  const series = sq.series ? ` (${sq.series})` : ''
  seedData.push({
    catalogNumber: sq.k,
    year: sq.year,
    title: `현악 4중주 제${sq.no}번 ${sq.key}장조${nickname}${series}`,
    titleEn: `String Quartet No. ${sq.no} in ${sq.key} major${nickname}${series}`,
    description: `${sq.movements}악장으로 구성된 현악 4중주`,
    genre: '실내악',
    compositionDetails: `2대의 바이올린, 비올라, 첼로를 위한 ${sq.movements}악장 구성의 현악 4중주입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/String_Quartet_No.${sq.no}`,
    highlight: sq.highlight || false,
    voteCount: sq.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Serenades
completeWorks.serenades.forEach((ser: any) => {
  const nickname = ser.nickname ? ` "${ser.nickname}"` : ''
  seedData.push({
    catalogNumber: ser.k,
    year: ser.year,
    title: `세레나데 제${ser.no}번 ${ser.key}장조${nickname}`,
    titleEn: `Serenade No. ${ser.no} in ${ser.key} major${nickname}`,
    description: `${ser.movements}악장으로 구성된 세레나데`,
    genre: '세레나데',
    compositionDetails: `${ser.movements}개 악장으로 구성된 관현악 세레나데입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Serenade_No.${ser.no}`,
    highlight: ser.highlight || false,
    voteCount: ser.highlight ? Math.floor(Math.random() * 8000) + 3000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Religious Music
completeWorks.religious_music.forEach((rm: any) => {
  const incomplete = rm.incomplete ? ' (미완성)' : ''
  seedData.push({
    catalogNumber: rm.k,
    year: rm.year,
    title: rm.title,
    titleEn: rm.title,
    description: `${rm.genre}${incomplete}`,
    genre: '종교음악',
    compositionDetails: `${rm.year}년에 작곡된 ${rm.genre} 형식의 종교음악입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${rm.title.replace(/ /g, '_')}`,
    highlight: rm.highlight || false,
    voteCount: rm.highlight ? Math.floor(Math.random() * 10000) + 4000 : Math.floor(Math.random() * 1500) + 300,
  })
})

// Process Other Chamber Music
completeWorks.other_chamber.forEach((oc: any) => {
  seedData.push({
    catalogNumber: oc.k,
    year: oc.year,
    title: oc.title,
    titleEn: oc.title,
    description: `${oc.movements ? oc.movements + '악장으로 구성된 ' : ''}${oc.genre}`,
    genre: oc.genre === 'Concerto' ? '협주곡' : (oc.genre === 'Chamber music' ? '실내악' : oc.genre),
    compositionDetails: `${oc.year}년에 작곡된 ${oc.movements ? oc.movements + '악장 구성의 ' : ''}작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${oc.k.replace('K. ', 'K.')}`,
    highlight: oc.highlight || false,
    voteCount: oc.highlight ? Math.floor(Math.random() * 5000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Horn Concertos
additionalWorks.horn_concertos.forEach((hc: any) => {
  seedData.push({
    catalogNumber: hc.k,
    year: hc.year,
    title: `호른 협주곡 제${hc.no}번 ${hc.key}장조`,
    titleEn: `Horn Concerto No. ${hc.no} in ${hc.key}`,
    description: `${hc.movements}악장으로 구성된 호른 협주곡`,
    genre: '협주곡',
    compositionDetails: `${hc.movements}개 악장으로 구성된 호른 협주곡으로 ${hc.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Horn_Concerto_No.${hc.no}`,
    highlight: hc.highlight || false,
    voteCount: hc.highlight ? Math.floor(Math.random() * 4000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Violin Sonatas
additionalWorks.violin_sonatas.forEach((vs: any) => {
  seedData.push({
    catalogNumber: vs.k,
    year: vs.year,
    title: `바이올린 소나타 제${vs.no}번 ${vs.key}장조`,
    titleEn: `Violin Sonata No. ${vs.no} in ${vs.key}`,
    description: `${vs.movements}악장으로 구성된 바이올린과 피아노를 위한 소나타`,
    genre: '실내악',
    compositionDetails: `바이올린과 피아노를 위한 ${vs.movements}악장 구성의 소나타입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Violin_Sonata_${vs.k.replace('K. ', 'K.')}`,
    highlight: vs.highlight || false,
    voteCount: vs.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Divertimenti
additionalWorks.divertimenti.forEach((div: any) => {
  const noText = div.no ? `제${div.no}번 ` : ''
  seedData.push({
    catalogNumber: div.k,
    year: div.year,
    title: `디베르티멘토 ${noText}${div.key}장조`,
    titleEn: `Divertimento${div.no ? ' No. ' + div.no : ''} in ${div.key}`,
    description: `${div.movements}악장으로 구성된 디베르티멘토`,
    genre: '디베르티멘토',
    compositionDetails: `${div.movements}개 악장으로 구성된 경쾌한 디베르티멘토입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${div.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Minuets
additionalWorks.minuets.forEach((min: any) => {
  seedData.push({
    catalogNumber: min.k,
    year: min.year,
    title: `미뉴에트 모음곡 (${min.count}곡)`,
    titleEn: `${min.count} Minuets`,
    description: `${min.count}개의 미뉴에트로 구성된 무곡 모음`,
    genre: '무곡',
    compositionDetails: `${min.count}개의 미뉴에트로 구성된 춤곡 모음입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${min.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 800) + 200,
  })
})

// Process German Dances
additionalWorks.german_dances.forEach((gd: any) => {
  seedData.push({
    catalogNumber: gd.k,
    year: gd.year,
    title: `독일 무곡 (${gd.count}곡)`,
    titleEn: `${gd.count} German Dances`,
    description: `${gd.count}개의 독일 무곡으로 구성된 춤곡 모음`,
    genre: '무곡',
    compositionDetails: `${gd.count}개의 독일 무곡으로 구성된 춤곡 모음입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${gd.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 800) + 200,
  })
})

// Process Contradances
additionalWorks.contradances.forEach((cd: any) => {
  seedData.push({
    catalogNumber: cd.k,
    year: cd.year,
    title: `콘트라댄스 (${cd.count}곡)`,
    titleEn: `${cd.count} Contradances`,
    description: `${cd.count}개의 콘트라댄스로 구성된 춤곡 모음`,
    genre: '무곡',
    compositionDetails: `${cd.count}개의 콘트라댄스로 구성된 춤곡 모음입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${cd.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 800) + 200,
  })
})

// Process Concert Arias
additionalWorks.concert_arias.forEach((aria: any) => {
  seedData.push({
    catalogNumber: aria.k,
    year: aria.year,
    title: `콘서트 아리아 "${aria.title}"`,
    titleEn: `Concert Aria "${aria.title}"`,
    description: `독립적인 콘서트용 아리아`,
    genre: '성악',
    compositionDetails: `독립적인 콘서트용 아리아로 ${aria.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${aria.k.replace('K. ', 'K.')}`,
    highlight: aria.highlight || false,
    voteCount: aria.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 800) + 200,
  })
})

// Process Church Sonatas
additionalWorks.church_sonatas.forEach((cs: any) => {
  seedData.push({
    catalogNumber: cs.k,
    year: cs.year,
    title: `교회 소나타 ${cs.key}장조`,
    titleEn: `Church Sonata in ${cs.key}`,
    description: `오르간과 현악을 위한 교회 소나타`,
    genre: '종교음악',
    compositionDetails: `오르간과 현악기를 위한 교회 소나타입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${cs.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 600) + 200,
  })
})

// Process Other Concertos
additionalWorks.other_concertos.forEach((oc: any) => {
  seedData.push({
    catalogNumber: oc.k,
    year: oc.year,
    title: oc.title,
    titleEn: oc.title,
    description: `${oc.movements}악장으로 구성된 ${oc.genre}`,
    genre: '협주곡',
    compositionDetails: `${oc.movements}개 악장으로 구성된 협주곡입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${oc.k.replace('K. ', 'K.')}`,
    highlight: oc.highlight || false,
    voteCount: oc.highlight ? Math.floor(Math.random() * 4000) + 2000 : Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Variations
additionalWorks.variations.forEach((vari: any) => {
  seedData.push({
    catalogNumber: vari.k,
    year: vari.year,
    title: vari.title,
    titleEn: vari.title,
    description: `피아노 변주곡`,
    genre: '피아노',
    compositionDetails: `피아노를 위한 변주곡으로 ${vari.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${vari.k.replace('K. ', 'K.')}`,
    highlight: vari.highlight || false,
    voteCount: vari.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Sort by Köchel number
seedData.sort((a, b) => {
  const getKNumber = (k: string) => {
    const match = k.match(/K\.\s*(\d+)/)
    return match ? parseInt(match[1]) : 0
  }
  return getKNumber(a.catalogNumber) - getKNumber(b.catalogNumber)
})

// Write to file
fs.writeFileSync(
  path.join(__dirname, '../prisma/seed-data.json'),
  JSON.stringify(seedData, null, 2),
  'utf-8'
)

console.log(`✅ Generated ${seedData.length} works!`)
console.log(`📊 Breakdown:`)
console.log(`\n🎼 Major Works:`)
console.log(`  - Symphonies: ${completeWorks.symphonies.length}`)
console.log(`  - Piano Concertos: ${completeWorks.piano_concertos.length}`)
console.log(`  - Operas: ${completeWorks.operas.length}`)
console.log(`  - Violin Concertos: ${completeWorks.violin_concertos.length}`)
console.log(`  - Piano Sonatas: ${completeWorks.piano_sonatas.length}`)
console.log(`  - String Quartets: ${completeWorks.string_quartets.length}`)
console.log(`  - Serenades: ${completeWorks.serenades.length}`)
console.log(`  - Religious Music: ${completeWorks.religious_music.length}`)
console.log(`  - Other Chamber: ${completeWorks.other_chamber.length}`)
console.log(`\n🎵 Additional Works:`)
console.log(`  - Horn Concertos: ${additionalWorks.horn_concertos.length}`)
console.log(`  - Violin Sonatas: ${additionalWorks.violin_sonatas.length}`)
console.log(`  - Divertimenti: ${additionalWorks.divertimenti.length}`)
console.log(`  - Minuets: ${additionalWorks.minuets.length}`)
console.log(`  - German Dances: ${additionalWorks.german_dances.length}`)
console.log(`  - Contradances: ${additionalWorks.contradances.length}`)
console.log(`  - Concert Arias: ${additionalWorks.concert_arias.length}`)
console.log(`  - Church Sonatas: ${additionalWorks.church_sonatas.length}`)
console.log(`  - Other Concertos: ${additionalWorks.other_concertos.length}`)
console.log(`  - Variations: ${additionalWorks.variations.length}`)
