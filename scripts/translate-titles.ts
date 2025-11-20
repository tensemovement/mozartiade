/**
 * Comprehensive Korean title translations for Mozart works
 * Adds extensive translation mappings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Work {
  catalogNumber?: string;
  title: string;
  titleEn?: string;
  [key: string]: any;
}

// Comprehensive Korean translations
const koreanTitles: Record<string, string> = {
  // Early keyboard works
  'Minuet and Trio in G for keyboard': '건반을 위한 미뉴에트와 트리오 G장조',
  'Minuet in F for keyboard': '건반을 위한 미뉴에트 F장조',
  'Allegro in B♭ for keyboard': '건반을 위한 알레그로 B♭장조',

  // Operas
  'Mitridate, re di Ponto': '오페라 "폰토의 왕 미트리다테"',
  'Ascanio in Alba': '오페라 "알바의 아스카니오"',
  'Lucio Silla': '오페라 "루치오 실라"',
  'La finta giardiniera': '오페라 "거짓 정원사"',
  'La finta semplice': '오페라 "순진한 척하는 여인"',
  'Il sogno di Scipione': '오페라 "스키피오의 꿈"',
  'Il re pastore': '오페라 "양치기 왕"',
  'Idomeneo': '오페라 "이도메네오"',
  "L'oca del Cairo": '오페라 "카이로의 거위"',
  'Lo sposo deluso': '오페라 "속은 신랑"',
  'Die Entführung aus dem Serail': '오페라 "후궁으로부터의 도주"',
  'Le nozze di Figaro': '오페라 "피가로의 결혼"',
  'Don Giovanni': '오페라 "돈 조반니"',
  'Così fan tutte': '오페라 "여자는 다 그래"',
  'La clemenza di Tito': '오페라 "티토 황제의 자비"',
  'Die Zauberflöte': '오페라 "마술 피리"',
  'The Magic Flute': '오페라 "마술 피리"',
  'Der Schauspieldirektor': '오페라 "극장 지배인"',

  // Sacred works
  'Exsultate, jubilate': '엑술타테 유빌라테 (기뻐하며 환호하라)',
  'Missa brevis in G': '소미사 G장조',
  'Missa brevis in D minor': '소미사 D단조',
  'Missa brevis in D': '소미사 D장조',
  'Missa brevis in F': '소미사 F장조',
  'Missa brevis in C': '소미사 C장조',
  'Missa brevis in B♭': '소미사 B♭장조',
  "Missa in C 'Dominicus'": '미사 C장조 "도미니쿠스"',
  "Missa in C 'Coronation'": '미사 C장조 "대관식"',
  "Missa in C 'Credo'": '미사 C장조 "크레도"',
  "Missa brevis in C 'Sparrow'": '소미사 C장조 "참새"',
  "Missa brevis in C 'Spaur'": '소미사 C장조 "스파우르"',
  "Missa brevis in C 'Organ Solo'": '소미사 C장조 "오르간 독주"',
  'Missa longa in C': '대미사 C장조',
  'Missa solemnis in C minor': '장엄 미사 C단조',
  'Missa solemnis in C': '장엄 미사 C장조',
  "Mass in C minor 'Great Mass'": '미사 C단조 "대미사"',
  'Requiem in D minor': '레퀴엠 D단조',
  'Regina Coeli in C': '레지나 체리 C장조',
  'Regina Coeli in B♭': '레지나 체리 B♭장조',
  'Vesperae solennes de confessore': '고해자를 위한 장엄한 저녁 기도',
  'Te Deum in C': '테 데움 C장조',
  'Kyrie in C': '키리에 C장조',
  'Kyrie in D minor': '키리에 D단조',
  'Kyrie in G minor': '키리에 G단조',
  'Litaniae Lauretanae': '로레토 연도',
  'Litaniae de venerabili': '성체 연도',
  'Betulia liberata (oratorio)': '오라토리오 "해방된 베툴리아"',
  'Davide penitente (cantata)': '칸타타 "회개하는 다윗"',

  // Concertos
  'Bassoon Concerto in B♭': '바순 협주곡 B♭장조',
  'Oboe Concerto in C': '오보에 협주곡 C장조',
  'Concerto for Flute and Harp in C': '플루트와 하프를 위한 협주곡 C장조',
  'Violin Concerto in E♭': '바이올린 협주곡 E♭장조',
  'Piano Concerto No. 1 in F': '피아노 협주곡 제1번 F장조',
  'Piano Concerto No. 2 in B♭': '피아노 협주곡 제2번 B♭장조',
  'Piano Concerto No. 3 in D': '피아노 협주곡 제3번 D장조',

  // Chamber music
  'Oboe Quartet in F': '오보에 4중주 F장조',
  'Piano Quartet No. 1 in G minor': '피아노 4중주 제1번 G단조',
  'Piano Quartet No. 2 in E♭': '피아노 4중주 제2번 E♭장조',
  'String Trio in E♭': '현악 3중주 E♭장조',
  "String Trio in E♭ 'Divertimento'": '현악 3중주 E♭장조 "디베르티멘토"',
  'String Trio in G': '현악 3중주 G장조',
  'String Quintet No. 3 in C': '현악 5중주 제3번 C장조',
  'String Quintet No. 4 in G minor': '현악 5중주 제4번 G단조',
  'String Quintet in E♭': '현악 5중주 E♭장조',
  'Quintet for Piano and Winds in E♭': '피아노와 관악을 위한 5중주 E♭장조',
  'Quintet in E♭ for horn and strings': '호른과 현악을 위한 5중주 E♭장조',
  'Clarinet Quintet in A': '클라리넷 5중주 A장조',
  'Duo for violin and viola in G': '바이올린과 비올라를 위한 듀오 G장조',
  'Duo for violin and viola in B♭': '바이올린과 비올라를 위한 듀오 B♭장조',
  'Trio in E♭ for clarinet, viola, piano': '클라리넷, 비올라, 피아노를 위한 트리오 E♭장조',
  "Ein musikalischer Spaß": '음악적 농담',

  // Piano works
  "12 Variations on 'Ah vous dirai-je, Maman'": '"아, 엄마에게 말할래요" 주제에 의한 12개 변주곡 (반짝반짝 작은 별)',
  '12 Variations in C': '12개 변주곡 C장조',
  '6 Variations in G': '6개 변주곡 G장조',
  '8 Variations in F': '8개 변주곡 F장조',
  '12 Variations in E♭': '12개 변주곡 E♭장조',
  '12 Variations in B♭': '12개 변주곡 B♭장조',
  '10 Variations in G': '10개 변주곡 G장조',
  '8 Variations in A': '8개 변주곡 A장조',
  '9 Variations on a Minuet by Duport': '듀포르의 미뉴에트 주제에 의한 9개 변주곡',
  'Andante with 5 Variations in G': '5개 변주를 가진 안단테 G장조',
  'Fantasia and Fugue in C': '환상곡과 푸가 C장조',
  'Fantasia in D minor': '환상곡 D단조',
  'Fantasia in C minor': '환상곡 C단조',
  'Rondo in A minor for piano': '론도 A단조 (피아노)',
  'Rondo in D for piano': '론도 D장조 (피아노)',
  'Rondo in F for piano': '론도 F장조 (피아노)',
  'Adagio in B minor for piano': '아다지오 B단조 (피아노)',
  'Adagio in C minor for piano': '아다지오 C단조 (피아노)',
  'Gigue in G for piano': '지그 G장조 (피아노)',
  'Minuet in D for piano': '미뉴에트 D장조 (피아노)',
  'Suite in C for piano': '모음곡 C장조 (피아노)',
  'Allegro in B♭ for piano': '알레그로 B♭장조 (피아노)',
  'Allegro in G minor for piano': '알레그로 G단조 (피아노)',
  'Fugue in G minor for piano': '푸가 G단조 (피아노)',
  'Sonata for Two Pianos in D': '2대의 피아노를 위한 소나타 D장조',
  'Fugue in C minor for 2 pianos': '2대의 피아노를 위한 푸가 C단조',
  'Sonata in B♭ for piano 4-hands': '피아노 4손 연탄을 위한 소나타 B♭장조',
  'Sonata in D for piano 4-hands': '피아노 4손 연탄을 위한 소나타 D장조',
  'Sonata in F for piano 4-hands': '피아노 4손 연탄을 위한 소나타 F장조',
  'Sonata in C for piano 4-hands': '피아노 4손 연탄을 위한 소나타 C장조',

  // Violin sonatas and other chamber works
  'Violin Sonata in A': '바이올린 소나타 A장조',
  'Violin Sonata in C': '바이올린 소나타 C장조',
  'Violin Sonata in F': '바이올린 소나타 F장조',
  'Sonata for bassoon and cello in B♭': '바순과 첼로를 위한 소나타 B♭장조',
  'Bassoon Sonata in B♭': '바순 소나타 B♭장조',

  // Orchestral works
  'Symphony in F': '교향곡 F장조',
  'Symphony in D': '교향곡 D장조',
  'Symphony in C': '교향곡 C장조',
  'Symphony in G': '교향곡 G장조',
  'Symphony Minuet in C': '교향곡 미뉴에트 C장조',
  'Symphony in G (Introduction)': '교향곡 G장조 (서주)',

  // Divertimentos, Serenades, Cassations
  'Cassation in G': '카사치오네 G장조',
  'Cassation in B♭': '카사치오네 B♭장조',
  'Divertimento in E♭': '디베르티멘토 E♭장조',
  'Divertimento for Winds in B♭': '관악을 위한 디베르티멘토 B♭장조',
  'Divertimento in B♭': '디베르티멘토 B♭장조',
  'Divertimento in F': '디베르티멘토 F장조',
  'Divertimento': '디베르티멘토',

  // Marches and dances
  '2 Contradances': '콘트라댄스 2곡',
  '2 German Dances': '독일 무곡 2곡',

  // Rondos and other works
  'Rondo for violin in B♭': '바이올린을 위한 론도 B♭장조',
  'Rondo for violin in C': '바이올린을 위한 론도 C장조',
  'Rondo for horn in E♭': '호른을 위한 론도 E♭장조',
  'Rondo for horn in D': '호른을 위한 론도 D장조',
  'Rondo in D for piano and orchestra': '피아노와 오케스트라를 위한 론도 D장조',
  'Rondo in A for piano and orchestra': '피아노와 오케스트라를 위한 론도 A장조',
  'Adagio in E for violin': '바이올린을 위한 아다지오 E장조',
  'Adagio for Winds in F': '관악을 위한 아다지오 F장조',
  'Adagio in B♭ for 2 clarinets': '2대의 클라리넷을 위한 아다지오 B♭장조',
  'Adagio and Fugue for strings': '현악을 위한 아다지오와 푸가',
  'Andante for violin': '바이올린을 위한 안단테',
  'Allegro for violin sonata': '바이올린 소나타를 위한 알레그로',

  // Masonic and other vocal works
  'Die Maurerfreude (Masonic Cantata)': '프리메이슨의 기쁨 (메이슨 칸타타)',
  'Maurerische Trauermusik': '프리메이슨 장례 음악',

  // Songs (Lieder)
  'Das Veilchen': '가곡 "제비꽃"',
  'Abendempfindung': '가곡 "저녁의 느낌"',
  'An Chloe': '가곡 "클로에에게"',
  'Die Alte': '가곡 "늙은 여인"',
  'Die Verschweigung': '가곡 "침묵"',
  'Das Lied der Trennung': '가곡 "이별의 노래"',
  'Als Luise die Briefe': '가곡 "루이제가 편지를 태울 때"',
  'Das Traumbild': '가곡 "꿈의 이미지"',
  'Die kleine Spinnerin': '가곡 "작은 실 잣는 여인"',
  'Gesellenreise': '가곡 "여행하는 직인"',
  'Der Zauberer': '가곡 "마법사"',
  'Die Zufriedenheit': '가곡 "만족"',
  'Die betrogene Welt': '가곡 "속은 세상"',
  'Beim Auszug in das Feld': '가곡 "전장으로"',
  'Des kleinen Friedrichs Geburtstag': '가곡 "작은 프리드리히의 생일"',
  "Männer suchen stets zu naschen": '가곡 "남자들은 항상 훔쳐먹으려 한다"',
  'Ich möchte wohl der Kaiser sein': '가곡 "나는 황제가 되고 싶다"',
  'Lied der Freiheit': '가곡 "자유의 노래"',
  'Heiterkeit und leichtes Blut': '가곡 "명랑함과 가벼운 마음"',

  // Stage works and arrangements
  'Bastien und Bastienne': '징슈필 "바스티앙과 바스티엔느"',
  "Handel's Messiah (arrangement)": '헨델의 메시아 (모차르트 편곡)',
  'Die Schuldigkeit des ersten Gebots': '종교극 "첫 번째 계명의 의무"',
  'Apollo et Hyacinthus': '라틴 오페라 "아폴로와 히아신투스"',
  'Music for pantomime': '판토마임을 위한 음악',

  // Canons and other vocal music
  'Notturno: Ecco quel fiero istante': '야상곡 "그 무서운 순간이 왔다"',
  "Notturno: Mi lagnerò tacendo": '야상곡 "나는 침묵하며 한탄하리"',
  'Notturno: Se lontan, ben mio': '야상곡 "그대가 멀리 있다면"',
  'Two Notturni': '야상곡 2곡',
  'Canzonetta: Più non si trovano': '칸초네타 "더 이상 찾을 수 없네"',
  'Terzetto: Grazie agl\'inganni tuoi': '3중창 "당신의 속임수에 감사를"',
  'Terzetto: Del gran regno delle Amazzoni': '3중창 "아마존의 대왕국으로부터"',

  // Offertorium and other church music
  'Offertorium: Venite populi': '봉헌송 "민족들이여, 오라"',
  'Offertorium: Benedictus sit Deus': '봉헌송 "하나님을 찬미하라"',
  'Offertorium: Alma Dei creatoris': '봉헌송 "창조주 하나님의 영혼"',
  'Offertorium: Misericordias Domini': '봉헌송 "주님의 자비"',
  'Offertory: Tibi soli': '봉헌송 "오직 당신께"',
  'Offertory: Sub tuum praesidium': '봉헌송 "당신의 보호 아래"',
  'Offertory: Inter natos mulierum': '봉헌송 "여인의 몸에서 태어난 자 중"',
  'Offertory: Cibavit eos': '봉헌송 "그가 그들을 먹이셨다"',
  'Offertory: Quaerite primum': '봉헌송 "먼저 구하라"',
  'Antiphon: Cibavit eos': '안티폰 "그가 그들을 먹이셨다"',
  'Antiphon: Quaerite primum': '안티폰 "먼저 구하라"',
  'Osanna in C': '호산나 C장조',
  'Tantum ergo in B♭': '탄툼 에르고 B♭장조',
  'Tantum ergo in D': '탄툼 에르고 D장조',
  'Sancta Maria, mater Dei': '성모 마리아, 하나님의 어머니',
  'Benedictus sit Deus': '하나님을 찬미하라',
  'Dixit Dominus and Magnificat': '주께서 말씀하시다와 마니피카트',
  'Psalm: De profundis': '시편 "깊은 곳에서"',
  'Miserere in A minor': '미제레레 A단조',

  // Miscellaneous
  'Grabmusik (Passion Cantata)': '무덤의 음악 (수난 칸타타)',
  'Cantata: Grabmusik': '칸타타 "무덤의 음악"',
  'Scande coeli limina (offertory)': '봉헌송 "하늘의 문턱을 오르라"',
  'Quintet in B♭ for strings and horn': '현악과 호른을 위한 5중주 B♭장조',
  '5 Fugues for string quartet': '현악 4중주를 위한 5개의 푸가',
  'Fugues for string trio': '현악 3중주를 위한 푸가들',
  '12 Duets for 2 horns': '2대의 호른을 위한 12개 이중주',
  'Fugue in G for three voices': '3성부를 위한 푸가 G장조',
  'String Trio (incomplete)': '현악 3중주 (미완성)',
  'Two German Church Songs': '독일 교회 가곡 2곡',
  'Chorus: Ihr unsre neuen Leiter': '합창 "우리의 새로운 지도자여"',
  'Dir, Seele des Weltalls (cantata)': '칸타타 "우주의 영혼이시여"',
};

async function main() {
  console.log('🇰🇷 Translating titles to Korean...\n');

  const seedDataPath = path.join(__dirname, '../prisma/seed-data.json');
  const works: Work[] = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

  let translationCount = 0;
  let alreadyKorean = 0;
  let noTranslationAvailable = 0;

  for (const work of works) {
    // Check if title is in English (starts with English letter or equals titleEn)
    const isEnglishTitle = work.title === work.titleEn ||
                          (work.title && /^[A-Za-z]/.test(work.title.charAt(0)));

    if (isEnglishTitle && koreanTitles[work.title]) {
      const oldTitle = work.title;
      work.title = koreanTitles[work.title];
      translationCount++;
      console.log(`✅ ${work.catalogNumber || 'N/A'}: ${oldTitle} → ${work.title}`);
    } else if (!isEnglishTitle) {
      alreadyKorean++;
    } else if (isEnglishTitle) {
      noTranslationAvailable++;
      console.log(`⚠️  ${work.catalogNumber || 'N/A'}: No translation for "${work.title}"`);
    }
  }

  // Write updated data
  fs.writeFileSync(seedDataPath, JSON.stringify(works, null, 2), 'utf-8');

  console.log('\n✨ Translation complete!');
  console.log(`🇰🇷 Newly translated: ${translationCount}`);
  console.log(`✅ Already in Korean: ${alreadyKorean}`);
  console.log(`⚠️  No translation available: ${noTranslationAvailable}`);
  console.log(`📚 Total works: ${works.length}`);
}

main().catch(console.error);
