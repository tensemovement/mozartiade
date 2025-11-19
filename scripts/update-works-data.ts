/**
 * Script to update Mozart works with composition locations and Korean titles
 * Based on historical chronology and Mozart's documented locations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Work {
  catalogNumber?: string;
  catalogNumberNumeric?: number;
  catalogNumberSuffix?: string;
  catalogNumberFirstEd?: string;
  catalogNumberNinthEd?: string;
  year: number;
  month?: number;
  day?: number;
  compositionOrder?: number;
  compositionLocation?: string;
  title: string;
  titleEn?: string;
  description: string;
  genre?: string;
  youtubeUrl?: string;
  sheetMusicUrl?: string;
  compositionDetails?: string;
  highlight?: boolean;
  image?: string;
  voteCount?: number;
  detailImage?: string;
  behindStory?: string;
  usageExamples?: string[];
}

// Specific work locations (historically documented)
const specificLocations: Record<string, string> = {
  'K. 87': 'Milan',      // Mitridate, re di Ponto (1770)
  'K. 111': 'Milan',     // Ascanio in Alba (1771)
  'K. 135': 'Milan',     // Lucio Silla (1772)
  'K. 165': 'Milan',     // Exsultate, jubilate (1773)
  'K. 297': 'Paris',     // Paris Symphony (1778)
  'K. 310': 'Paris',     // Piano Sonata No. 8 (1778)
  'K. 304': 'Paris',     // Violin Sonata (1778)
  'K. 293': 'Salzburg',  // Oboe Concerto (1778, completed in Salzburg)
  'K. 299': 'Paris',     // Flute & Harp Concerto (1778)
  'K. 366': 'Munich',    // Idomeneo (1781)
  'K. 384': 'Vienna',    // Die Entführung aus dem Serail (1782)
  'K. 385': 'Vienna',    // Haffner Symphony (1782)
  'K. 427': 'Salzburg',  // Great Mass in C minor (1782-1783)
  'K. 448': 'Vienna',    // Sonata for Two Pianos (1781)
  'K. 449': 'Vienna',    // Piano Concerto No. 14 (1784)
  'K. 450': 'Vienna',    // Piano Concerto No. 15 (1784)
  'K. 451': 'Vienna',    // Piano Concerto No. 16 (1784)
  'K. 453': 'Vienna',    // Piano Concerto No. 17 (1784)
  'K. 456': 'Vienna',    // Piano Concerto No. 18 (1784)
  'K. 459': 'Vienna',    // Piano Concerto No. 19 (1784)
  'K. 464': 'Vienna',    // String Quartet No. 18 (1785)
  'K. 466': 'Vienna',    // Piano Concerto No. 20 (1785)
  'K. 467': 'Vienna',    // Piano Concerto No. 21 (1785)
  'K. 482': 'Vienna',    // Piano Concerto No. 22 (1785)
  'K. 488': 'Vienna',    // Piano Concerto No. 23 (1786)
  'K. 491': 'Vienna',    // Piano Concerto No. 24 (1786)
  'K. 492': 'Vienna',    // The Marriage of Figaro (1786)
  'K. 503': 'Vienna',    // Piano Concerto No. 25 (1786)
  'K. 504': 'Prague',    // Prague Symphony (1786)
  'K. 525': 'Vienna',    // Eine kleine Nachtmusik (1787)
  'K. 527': 'Prague',    // Don Giovanni (1787)
  'K. 537': 'Vienna',    // Coronation Concerto (1788)
  'K. 543': 'Vienna',    // Symphony No. 39 (1788)
  'K. 550': 'Vienna',    // Symphony No. 40 (1788)
  'K. 551': 'Vienna',    // Jupiter Symphony (1788)
  'K. 563': 'Vienna',    // Divertimento for String Trio (1788)
  'K. 588': 'Vienna',    // Così fan tutte (1790)
  'K. 595': 'Vienna',    // Piano Concerto No. 27 (1791)
  'K. 614': 'Vienna',    // String Quintet in E♭ (1791)
  'K. 620': 'Vienna',    // The Magic Flute (1791)
  'K. 621': 'Prague',    // La clemenza di Tito (1791)
  'K. 622': 'Vienna',    // Clarinet Concerto (1791)
  'K. 626': 'Vienna',    // Requiem (1791)
};

// Year-based location estimates for works without specific documentation
function getLocationByYear(year: number): string | undefined {
  if (year >= 1756 && year <= 1762) return 'Salzburg';
  if (year >= 1763 && year <= 1766) return undefined; // Grand Tour - various cities
  if (year >= 1766 && year <= 1769) return 'Salzburg';
  if (year >= 1769 && year <= 1773) return 'Italy'; // Mostly Milan/Italy tours
  if (year >= 1773 && year <= 1777) return 'Salzburg';
  if (year >= 1777 && year <= 1779) return undefined; // Mannheim/Paris - mixed
  if (year >= 1779 && year <= 1781) return 'Salzburg';
  if (year >= 1781 && year <= 1791) return 'Vienna';
  return undefined;
}

// Korean title translations for common works
const koreanTitles: Record<string, string> = {
  // Operas
  'Mitridate, re di Ponto': '오페라 "폰토의 왕 미트리다테"',
  'Exsultate, jubilate': '엑술타테 유빌라테 (기뻐하며 환호하라)',
  'Bassoon Concerto in B♭': '바순 협주곡 B♭장조',
  'Oboe Concerto in C': '오보에 협주곡 C장조',
  'Concerto for Flute and Harp in C': '플루트와 하프를 위한 협주곡 C장조',
  "12 Variations on 'Ah vous dirai-je, Maman'": '"아, 엄마에게 말할래요" 주제에 의한 12개 변주곡 (반짝반짝 작은 별)',
  "Missa in C 'Coronation'": '미사 C장조 "대관식"',
};

async function main() {
  console.log('🎼 Updating Mozart works data with locations and Korean titles...\n');

  // Read seed data
  const seedDataPath = path.join(__dirname, '../prisma/seed-data.json');
  const works: Work[] = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

  let locationUpdates = 0;
  let titleUpdates = 0;

  // Update each work
  for (const work of works) {
    let updated = false;

    // Update composition location
    if (!work.compositionLocation && work.catalogNumber) {
      // Check specific locations first
      if (specificLocations[work.catalogNumber]) {
        work.compositionLocation = specificLocations[work.catalogNumber];
        locationUpdates++;
        updated = true;
      } else {
        // Use year-based estimate
        const estimatedLocation = getLocationByYear(work.year);
        if (estimatedLocation) {
          work.compositionLocation = estimatedLocation;
          locationUpdates++;
          updated = true;
        }
      }
    }

    // Update Korean title if missing
    if (work.title === work.titleEn || (work.title && /^[A-Za-z]/.test(work.title.charAt(0)))) {
      // Title is in English, try to translate
      if (koreanTitles[work.title]) {
        work.title = koreanTitles[work.title];
        titleUpdates++;
        updated = true;
      }
    }

    if (updated && work.catalogNumber) {
      console.log(`✅ Updated ${work.catalogNumber}: ${work.title}`);
      if (work.compositionLocation) {
        console.log(`   📍 Location: ${work.compositionLocation}`);
      }
    }
  }

  // Write updated data
  fs.writeFileSync(seedDataPath, JSON.stringify(works, null, 2), 'utf-8');

  console.log('\n✨ Update complete!');
  console.log(`📍 Location updates: ${locationUpdates}`);
  console.log(`🇰🇷 Title translations: ${titleUpdates}`);
  console.log(`📚 Total works: ${works.length}`);
}

main().catch(console.error);
