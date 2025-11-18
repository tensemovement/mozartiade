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

interface ParsedCatalogNumber {
  numeric: number | null
  suffix: string
}

/**
 * Parse Köchel catalog number into numeric and suffix parts
 * @param catalogNumber - e.g., "K. 297b", "K. 550", "K. 61h"
 * @returns { numeric: 297, suffix: "b" }
 */
function parseCatalogNumber(catalogNumber: string): ParsedCatalogNumber {
  if (!catalogNumber) {
    return { numeric: null, suffix: '' }
  }

  // Match "K. 297b" format - extract number and optional letter suffix
  const match = catalogNumber.match(/K\.\s*(\d+)([a-z]?)/i)

  if (!match) {
    return { numeric: null, suffix: '' }
  }

  const numeric = parseInt(match[1], 10)
  const suffix = match[2]?.toLowerCase() || ''

  return { numeric, suffix }
}

interface SeedWork {
  catalogNumber: string
  catalogNumberNumeric?: number | null
  catalogNumberSuffix?: string
  year: number
  month?: number
  day?: number
  compositionOrder?: number
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
  const parsed = parseCatalogNumber(sym.k)

  // Known composition dates for major symphonies
  let month, day;
  if (sym.k === 'K. 550') { // Symphony No. 40
    month = 7; day = 25;
  } else if (sym.k === 'K. 551') { // Symphony No. 41 "Jupiter"
    month = 8; day = 10;
  } else if (sym.k === 'K. 543') { // Symphony No. 39
    month = 6; day = 26;
  }

  seedData.push({
    catalogNumber: sym.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: sym.year,
    month,
    day,
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
  const parsed = parseCatalogNumber(pc.k)

  // Known composition dates for major piano concertos
  let month, day;
  if (pc.k === 'K. 467') { // Piano Concerto No. 21
    month = 3; day = 9;
  } else if (pc.k === 'K. 466') { // Piano Concerto No. 20
    month = 2; day = 10;
  } else if (pc.k === 'K. 491') { // Piano Concerto No. 24
    month = 3; day = 24;
  } else if (pc.k === 'K. 488') { // Piano Concerto No. 23
    month = 3; day = 2;
  }

  seedData.push({
    catalogNumber: pc.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: pc.year,
    month,
    day,
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
  const parsed = parseCatalogNumber(opera.k)

  // Known composition dates for major operas
  let month, day;
  if (opera.k === 'K. 492') { // Le nozze di Figaro
    month = 4; day = 29;
  } else if (opera.k === 'K. 527') { // Don Giovanni
    month = 10; day = 28;
  } else if (opera.k === 'K. 620') { // Die Zauberflöte
    month = 7;
  } else if (opera.k === 'K. 621') { // La clemenza di Tito
    month = 9;
  }

  seedData.push({
    catalogNumber: opera.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: opera.year,
    month,
    day,
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
  const parsed = parseCatalogNumber(ser.k)

  // Known composition dates for major serenades
  let month, day;
  if (ser.k === 'K. 525') { // Eine kleine Nachtmusik
    month = 8; day = 10;
  }

  seedData.push({
    catalogNumber: ser.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: ser.year,
    month,
    day,
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
  const parsed = parseCatalogNumber(rm.k)

  // Known composition dates for major religious works
  let month, day;
  if (rm.k === 'K. 626') { // Requiem
    month = 12; // Started in summer, worked on until death in December
  }

  seedData.push({
    catalogNumber: rm.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: rm.year,
    month,
    day,
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
  const parsed = parseCatalogNumber(oc.k)

  seedData.push({
    catalogNumber: oc.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(hc.k)

  seedData.push({
    catalogNumber: hc.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(vs.k)

  seedData.push({
    catalogNumber: vs.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(min.k)

  seedData.push({
    catalogNumber: min.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(gd.k)

  seedData.push({
    catalogNumber: gd.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(cd.k)

  seedData.push({
    catalogNumber: cd.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(aria.k)

  seedData.push({
    catalogNumber: aria.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(cs.k)

  seedData.push({
    catalogNumber: cs.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(oc.k)

  seedData.push({
    catalogNumber: oc.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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
  const parsed = parseCatalogNumber(vari.k)

  seedData.push({
    catalogNumber: vari.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
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

// Process String Quintets
additionalWorks.string_quintets.forEach((sq: any) => {
  const parsed = parseCatalogNumber(sq.k)

  seedData.push({
    catalogNumber: sq.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: sq.year,
    title: `현악 5중주 ${sq.key}장조`,
    titleEn: `String Quintet in ${sq.key}`,
    description: `${sq.movements}악장으로 구성된 현악 5중주`,
    genre: '실내악',
    compositionDetails: `2대의 바이올린, 2대의 비올라, 첼로를 위한 ${sq.movements}악장 구성의 현악 5중주입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${sq.k.replace('K. ', 'K.')}`,
    highlight: sq.highlight || false,
    voteCount: sq.highlight ? Math.floor(Math.random() * 3500) + 2000 : Math.floor(Math.random() * 1200) + 400,
  })
})

// Process String Trios
additionalWorks.string_trios.forEach((st: any) => {
  const keyText = st.key ? `${st.key}장조` : ''
  const titleKo = st.title || `현악 3중주 ${keyText}`
  const titleEn = st.title || `String Trio in ${st.key}`
  seedData.push({
    catalogNumber: st.k,
    year: st.year,
    title: titleKo,
    titleEn: titleEn,
    description: `바이올린, 비올라, 첼로를 위한 현악 3중주`,
    genre: '실내악',
    compositionDetails: `바이올린, 비올라, 첼로를 위한 ${st.movements || 3}악장 구성의 현악 3중주입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${st.k.replace('K. ', 'K.')}`,
    highlight: st.highlight || false,
    voteCount: st.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Piano Trios
additionalWorks.piano_trios.forEach((pt: any) => {
  const parsed = parseCatalogNumber(pt.k)

  seedData.push({
    catalogNumber: pt.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: pt.year,
    title: `피아노 트리오 ${pt.key}장조`,
    titleEn: `Piano Trio in ${pt.key}`,
    description: `피아노, 바이올린, 첼로를 위한 트리오`,
    genre: '실내악',
    compositionDetails: `피아노, 바이올린, 첼로를 위한 ${pt.movements}악장 구성의 트리오입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${pt.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1200) + 400,
  })
})

// Process Flute Quartets
additionalWorks.flute_quartets.forEach((fq: any) => {
  const parsed = parseCatalogNumber(fq.k)

  seedData.push({
    catalogNumber: fq.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: fq.year,
    title: `플루트 4중주 ${fq.key}장조`,
    titleEn: `Flute Quartet in ${fq.key}`,
    description: `플루트, 바이올린, 비올라, 첼로를 위한 4중주`,
    genre: '실내악',
    compositionDetails: `플루트와 현악 3중주를 위한 ${fq.movements}악장 구성의 작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${fq.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Wind Music
additionalWorks.wind_music.forEach((wm: any) => {
  const parsed = parseCatalogNumber(wm.k)

  seedData.push({
    catalogNumber: wm.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: wm.year,
    title: wm.title,
    titleEn: wm.title,
    description: `${wm.movements}악장으로 구성된 관악 앙상블 작품`,
    genre: '관악',
    compositionDetails: `관악기를 위한 ${wm.movements}악장 구성의 작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${wm.k.replace('K. ', 'K.')}`,
    highlight: wm.highlight || false,
    voteCount: wm.highlight ? Math.floor(Math.random() * 5000) + 2500 : Math.floor(Math.random() * 1200) + 400,
  })
})

// Process Lieder
additionalWorks.lieder.forEach((lied: any) => {
  const parsed = parseCatalogNumber(lied.k)

  seedData.push({
    catalogNumber: lied.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: lied.year,
    title: `가곡: ${lied.title}`,
    titleEn: lied.title,
    description: `성악과 피아노를 위한 가곡`,
    genre: '성악',
    compositionDetails: `성악과 피아노를 위한 독일 가곡(Lied)입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${lied.k.replace('K. ', 'K.')}`,
    highlight: lied.highlight || false,
    voteCount: lied.highlight ? Math.floor(Math.random() * 2500) + 1000 : Math.floor(Math.random() * 800) + 200,
  })
})

// Process Canons
additionalWorks.canons.forEach((canon: any) => {
  const parsed = parseCatalogNumber(canon.k)

  seedData.push({
    catalogNumber: canon.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: canon.year,
    title: `카논: ${canon.title}`,
    titleEn: `Canon: ${canon.title}`,
    description: `다성 성악을 위한 카논`,
    genre: '성악',
    compositionDetails: `다성 성악을 위한 카논 형식의 작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${canon.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 600) + 200,
  })
})

// Process Marches
additionalWorks.marches.forEach((march: any) => {
  const parsed = parseCatalogNumber(march.k)

  seedData.push({
    catalogNumber: march.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: march.year,
    title: `행진곡 ${march.key}장조`,
    titleEn: `March in ${march.key}`,
    description: `관현악을 위한 행진곡`,
    genre: '관현악',
    compositionDetails: `관현악을 위한 행진곡입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${march.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 800) + 200,
  })
})

// Process Sacred Works
additionalWorks.sacred_works.forEach((sw: any) => {
  const parsed = parseCatalogNumber(sw.k)

  seedData.push({
    catalogNumber: sw.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: sw.year,
    title: sw.title,
    titleEn: sw.title,
    description: `종교 음악 작품`,
    genre: '종교음악',
    compositionDetails: `${sw.year}년에 작곡된 종교 음악 작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${sw.title.replace(/ /g, '_')}`,
    highlight: sw.highlight || false,
    voteCount: sw.highlight ? Math.floor(Math.random() * 5000) + 2000 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Miscellaneous
additionalWorks.miscellaneous.forEach((misc: any) => {
  const parsed = parseCatalogNumber(misc.k)

  seedData.push({
    catalogNumber: misc.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: misc.year,
    title: misc.title,
    titleEn: misc.title,
    description: `다양한 장르의 작품`,
    genre: '기타',
    compositionDetails: `${misc.year}년에 작곡된 작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${misc.title.replace(/ /g, '_')}`,
    highlight: misc.highlight || false,
    voteCount: misc.highlight ? Math.floor(Math.random() * 4000) + 2000 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Early Works
additionalWorks.early_works.forEach((work: any) => {
  const parsed = parseCatalogNumber(work.k)

  seedData.push({
    catalogNumber: work.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: work.year,
    title: work.title,
    titleEn: work.title,
    description: `초기 작품`,
    genre: '초기작',
    compositionDetails: `모차르트의 초기 작품으로 ${work.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${work.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 800) + 200,
  })
})

// Process Flute Concertos
additionalWorks.flute_concertos.forEach((fc: any) => {
  const parsed = parseCatalogNumber(fc.k)

  seedData.push({
    catalogNumber: fc.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: fc.year,
    title: `플루트 협주곡 제${fc.no}번 ${fc.key}장조`,
    titleEn: `Flute Concerto No. ${fc.no} in ${fc.key}`,
    description: `${fc.movements}악장으로 구성된 플루트 협주곡`,
    genre: '협주곡',
    compositionDetails: `${fc.movements}개 악장으로 구성된 플루트 협주곡입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/Flute_Concerto_No.${fc.no}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 3000) + 1500,
  })
})

// Process Piano Rondos
additionalWorks.piano_rondos.forEach((rondo: any) => {
  const parsed = parseCatalogNumber(rondo.k)

  seedData.push({
    catalogNumber: rondo.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: rondo.year,
    title: rondo.title,
    titleEn: rondo.title,
    description: `피아노를 위한 론도`,
    genre: '피아노',
    compositionDetails: `피아노를 위한 론도로 ${rondo.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${rondo.k.replace('K. ', 'K.')}`,
    highlight: rondo.highlight || false,
    voteCount: rondo.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1200) + 400,
  })
})

// Process Piano Fantasias
additionalWorks.piano_fantasias.forEach((fantasia: any) => {
  const parsed = parseCatalogNumber(fantasia.k)

  seedData.push({
    catalogNumber: fantasia.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: fantasia.year,
    title: fantasia.title,
    titleEn: fantasia.title,
    description: `피아노를 위한 환상곡`,
    genre: '피아노',
    compositionDetails: `피아노를 위한 환상곡으로 ${fantasia.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${fantasia.k.replace('K. ', 'K.')}`,
    highlight: fantasia.highlight || false,
    voteCount: fantasia.highlight ? Math.floor(Math.random() * 4000) + 2000 : Math.floor(Math.random() * 1200) + 400,
  })
})

// Process Vocal Ensembles
additionalWorks.vocal_ensembles.forEach((vocal: any) => {
  const parsed = parseCatalogNumber(vocal.k)

  seedData.push({
    catalogNumber: vocal.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: vocal.year,
    title: vocal.title,
    titleEn: vocal.title,
    description: `성악 앙상블`,
    genre: '성악',
    compositionDetails: `성악 앙상블을 위한 작품으로 ${vocal.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${vocal.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1000) + 300,
  })
})

// Process Dances and Ländler
additionalWorks.dances_landler.forEach((dance: any) => {
  const parsed = parseCatalogNumber(dance.k)

  seedData.push({
    catalogNumber: dance.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: dance.year,
    title: dance.title,
    titleEn: dance.title,
    description: `춤곡`,
    genre: '무곡',
    compositionDetails: `춤곡으로 ${dance.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${dance.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 800) + 200,
  })
})

// Process Keyboard Works
additionalWorks.keyboard_works.forEach((kw: any) => {
  const parsed = parseCatalogNumber(kw.k)

  seedData.push({
    catalogNumber: kw.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: kw.year,
    title: kw.title,
    titleEn: kw.title,
    description: `건반악기 작품`,
    genre: '피아노',
    compositionDetails: `건반악기를 위한 작품으로 ${kw.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${kw.k.replace('K. ', 'K.')}`,
    highlight: kw.highlight || false,
    voteCount: kw.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1000) + 300,
  })
})

// Process String Duos
additionalWorks.string_duos.forEach((duo: any) => {
  const parsed = parseCatalogNumber(duo.k)

  seedData.push({
    catalogNumber: duo.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: duo.year,
    title: duo.title,
    titleEn: duo.title,
    description: `현악 이중주`,
    genre: '실내악',
    compositionDetails: `바이올린과 비올라를 위한 이중주입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${duo.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Bassoon Works
additionalWorks.bassoon_works.forEach((bassoon: any) => {
  const parsed = parseCatalogNumber(bassoon.k)

  seedData.push({
    catalogNumber: bassoon.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: bassoon.year,
    title: bassoon.title,
    titleEn: bassoon.title,
    description: `바순을 위한 작품`,
    genre: '실내악',
    compositionDetails: `바순을 위한 작품으로 ${bassoon.year}년에 작곡되었습니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${bassoon.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1200) + 400,
  })
})

// Process Early Symphonies
additionalWorks.early_symphonies.forEach((sym: any) => {
  const parsed = parseCatalogNumber(sym.k)

  seedData.push({
    catalogNumber: sym.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: sym.year,
    title: sym.title,
    titleEn: sym.title,
    description: `초기 교향곡`,
    genre: '교향곡',
    compositionDetails: `${sym.year}년에 작곡된 초기 교향곡입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${sym.k.replace('K. ', 'K.')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 2000) + 800,
  })
})

// Process Additional Sacred Works
additionalWorks.additional_sacred.forEach((sacred: any) => {
  const parsed = parseCatalogNumber(sacred.k)

  seedData.push({
    catalogNumber: sacred.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: sacred.year,
    title: sacred.title,
    titleEn: sacred.title,
    description: `종교 음악`,
    genre: '종교음악',
    compositionDetails: `${sacred.year}년에 작곡된 종교 음악입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${sacred.title.replace(/ /g, '_')}`,
    highlight: false,
    voteCount: Math.floor(Math.random() * 1500) + 500,
  })
})

// Process Additional Opera Arias
additionalWorks.additional_opera_arias.forEach((aria: any) => {
  const parsed = parseCatalogNumber(aria.k)

  seedData.push({
    catalogNumber: aria.k,
    catalogNumberNumeric: parsed.numeric,
    catalogNumberSuffix: parsed.suffix,
    year: aria.year,
    title: aria.title,
    titleEn: aria.title,
    description: `오페라 아리아 및 기타 작품`,
    genre: aria.title.includes('Sonata') ? '실내악' : (aria.title.includes('Aria') || aria.title.includes('Rondo') || aria.title.includes('Scena') ? '성악' : '기타'),
    compositionDetails: `${aria.year}년에 작곡된 작품입니다.`,
    sheetMusicUrl: `https://imslp.org/wiki/${aria.k.replace('K. ', 'K.')}`,
    highlight: aria.highlight || false,
    voteCount: aria.highlight ? Math.floor(Math.random() * 3000) + 1500 : Math.floor(Math.random() * 1000) + 300,
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

/**
 * Calculate compositionOrder for each work
 * Groups works by year and assigns order within each year based on:
 * 1. Month/day if available (chronological)
 * 2. Catalog number if no date (as proxy for composition order)
 *
 * Note: Only assigns compositionOrder, does NOT modify month/day fields
 */
function assignCompositionOrder(works: SeedWork[]) {
  // Group works by year
  const worksByYear = new Map<number, SeedWork[]>()

  works.forEach(work => {
    if (!worksByYear.has(work.year)) {
      worksByYear.set(work.year, [])
    }
    worksByYear.get(work.year)!.push(work)
  })

  // For each year, sort works and assign order
  worksByYear.forEach((yearWorks, year) => {
    // Sort within year:
    // 1. Works with month/day come first (by date)
    // 2. Works without month/day come after (by catalog number)
    yearWorks.sort((a, b) => {
      const hasDateA = a.month !== undefined
      const hasDateB = b.month !== undefined

      // Both have dates - sort chronologically
      if (hasDateA && hasDateB) {
        const monthDiff = (a.month || 0) - (b.month || 0)
        if (monthDiff !== 0) return monthDiff
        return (a.day || 0) - (b.day || 0)
      }

      // One has date, one doesn't - date comes first
      if (hasDateA && !hasDateB) return -1
      if (!hasDateA && hasDateB) return 1

      // Neither has date - sort by catalog number (arbitrary order based on K number)
      const numA = a.catalogNumberNumeric || 9999
      const numB = b.catalogNumberNumeric || 9999
      if (numA !== numB) return numA - numB

      const suffixA = a.catalogNumberSuffix || ''
      const suffixB = b.catalogNumberSuffix || ''
      return suffixA.localeCompare(suffixB)
    })

    // Assign compositionOrder: 1, 2, 3, ...
    // This is the only modification - we do NOT change month/day
    yearWorks.forEach((work, index) => {
      work.compositionOrder = index + 1
    })
  })
}

// Assign composition order to all works
assignCompositionOrder(seedData)

// Write to file
fs.writeFileSync(
  path.join(__dirname, '../prisma/seed-data.json'),
  JSON.stringify(seedData, null, 2),
  'utf-8'
)

console.log(`✅ Generated ${seedData.length} works!`)
console.log(`📊 Breakdown:`)
console.log(`\n🎼 Major Works (${completeWorks.symphonies.length + completeWorks.piano_concertos.length + completeWorks.operas.length + completeWorks.violin_concertos.length + completeWorks.piano_sonatas.length + completeWorks.string_quartets.length + completeWorks.serenades.length + completeWorks.religious_music.length + completeWorks.other_chamber.length} total):`)
console.log(`  - Symphonies: ${completeWorks.symphonies.length}`)
console.log(`  - Piano Concertos: ${completeWorks.piano_concertos.length}`)
console.log(`  - Operas: ${completeWorks.operas.length}`)
console.log(`  - Violin Concertos: ${completeWorks.violin_concertos.length}`)
console.log(`  - Piano Sonatas: ${completeWorks.piano_sonatas.length}`)
console.log(`  - String Quartets: ${completeWorks.string_quartets.length}`)
console.log(`  - Serenades: ${completeWorks.serenades.length}`)
console.log(`  - Religious Music: ${completeWorks.religious_music.length}`)
console.log(`  - Other Chamber: ${completeWorks.other_chamber.length}`)

const additionalTotal = additionalWorks.horn_concertos.length + additionalWorks.violin_sonatas.length +
  additionalWorks.divertimenti.length + additionalWorks.minuets.length + additionalWorks.german_dances.length +
  additionalWorks.contradances.length + additionalWorks.concert_arias.length + additionalWorks.church_sonatas.length +
  additionalWorks.other_concertos.length + additionalWorks.variations.length + additionalWorks.string_quintets.length +
  additionalWorks.string_trios.length + additionalWorks.piano_trios.length + additionalWorks.flute_quartets.length +
  additionalWorks.wind_music.length + additionalWorks.lieder.length + additionalWorks.canons.length +
  additionalWorks.marches.length + additionalWorks.sacred_works.length + additionalWorks.miscellaneous.length +
  additionalWorks.early_works.length + additionalWorks.flute_concertos.length + additionalWorks.piano_rondos.length +
  additionalWorks.piano_fantasias.length + additionalWorks.vocal_ensembles.length + additionalWorks.dances_landler.length +
  additionalWorks.keyboard_works.length + additionalWorks.string_duos.length + additionalWorks.bassoon_works.length +
  additionalWorks.early_symphonies.length + additionalWorks.additional_sacred.length + additionalWorks.additional_opera_arias.length

console.log(`\n🎵 Additional Works (${additionalTotal} total):`)
console.log(`  📌 Core Collections:`)
console.log(`    - Horn Concertos: ${additionalWorks.horn_concertos.length}`)
console.log(`    - Violin Sonatas: ${additionalWorks.violin_sonatas.length}`)
console.log(`    - Divertimenti: ${additionalWorks.divertimenti.length}`)
console.log(`    - Concert Arias: ${additionalWorks.concert_arias.length}`)
console.log(`    - Variations: ${additionalWorks.variations.length}`)
console.log(`  🎹 Keyboard Works:`)
console.log(`    - Piano Rondos: ${additionalWorks.piano_rondos.length}`)
console.log(`    - Piano Fantasias: ${additionalWorks.piano_fantasias.length}`)
console.log(`    - Other Keyboard: ${additionalWorks.keyboard_works.length}`)
console.log(`  🎻 Chamber Music:`)
console.log(`    - String Quintets: ${additionalWorks.string_quintets.length}`)
console.log(`    - String Trios: ${additionalWorks.string_trios.length}`)
console.log(`    - String Duos: ${additionalWorks.string_duos.length}`)
console.log(`    - Piano Trios: ${additionalWorks.piano_trios.length}`)
console.log(`    - Flute Quartets: ${additionalWorks.flute_quartets.length}`)
console.log(`    - Wind Music: ${additionalWorks.wind_music.length}`)
console.log(`    - Bassoon Works: ${additionalWorks.bassoon_works.length}`)
console.log(`  🎺 Concertos & Symphonies:`)
console.log(`    - Flute Concertos: ${additionalWorks.flute_concertos.length}`)
console.log(`    - Other Concertos: ${additionalWorks.other_concertos.length}`)
console.log(`    - Early Symphonies: ${additionalWorks.early_symphonies.length}`)
console.log(`  🎤 Vocal & Sacred:`)
console.log(`    - Lieder: ${additionalWorks.lieder.length}`)
console.log(`    - Vocal Ensembles: ${additionalWorks.vocal_ensembles.length}`)
console.log(`    - Canons: ${additionalWorks.canons.length}`)
console.log(`    - Church Sonatas: ${additionalWorks.church_sonatas.length}`)
console.log(`    - Sacred Works: ${additionalWorks.sacred_works.length}`)
console.log(`    - Additional Sacred: ${additionalWorks.additional_sacred.length}`)
console.log(`  💃 Dances & Marches:`)
console.log(`    - Minuets: ${additionalWorks.minuets.length}`)
console.log(`    - German Dances: ${additionalWorks.german_dances.length}`)
console.log(`    - Contradances: ${additionalWorks.contradances.length}`)
console.log(`    - Dances/Ländler: ${additionalWorks.dances_landler.length}`)
console.log(`    - Marches: ${additionalWorks.marches.length}`)
console.log(`  🌟 Special:`)
console.log(`    - Early Works: ${additionalWorks.early_works.length}`)
console.log(`    - Additional Opera/Arias: ${additionalWorks.additional_opera_arias.length}`)
console.log(`    - Miscellaneous: ${additionalWorks.miscellaneous.length}`)
console.log(`\n🎯 Progress: ${seedData.length}/626 works (${Math.round(seedData.length / 626 * 100)}%)`)
