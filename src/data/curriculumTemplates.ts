import { CurriculumWeek, Course, SchoolInfo } from '../types';
import { INITIAL_CURRICULUM_2016, initialSchoolInfo } from './curriculum2016';

export interface SubjectPreset {
  key: string;
  name: { om: string; am: string; en: string };
  defaultWeeklyPeriods: number;
  color: string; // Tailwind color token
  recommendedGrades: string[];
}

export const GRADE_LEVELS = [
  { id: '1', name: { om: 'Kutaa 1ffaa', am: '1ኛ ክፍል', en: 'Grade 1' } },
  { id: '2', name: { om: 'Kutaa 2ffaa', am: '2ኛ ክፍል', en: 'Grade 2' } },
  { id: '3', name: { om: 'Kutaa 3ffaa', am: '3ኛ ክፍል', en: 'Grade 3' } },
  { id: '4', name: { om: 'Kutaa 4ffaa', am: '4ኛ ክፍል', en: 'Grade 4' } },
  { id: '5', name: { om: 'Kutaa 5ffaa', am: '5ኛ ክፍል', en: 'Grade 5' } },
  { id: '6', name: { om: 'Kutaa 6ffaa', am: '6ኛ ክፍል', en: 'Grade 6' } },
  { id: '7', name: { om: 'Kutaa 7ffaa', am: '7ኛ ክፍል', en: 'Grade 7' } },
  { id: '8', name: { om: 'Kutaa 8ffaa', am: '8ኛ ክፍል', en: 'Grade 8' } },
];

export const STANDARD_SUBJECTS: SubjectPreset[] = [
  {
    key: 'math',
    name: { om: 'Herrega (Mathematics)', am: 'ሒሳብ (Mathematics)', en: 'Mathematics' },
    defaultWeeklyPeriods: 5,
    color: 'indigo',
    recommendedGrades: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  {
    key: 'env_science',
    name: { om: 'Saayinsii Naannoo', am: 'የአካባቢ ሳይንስ (Environmental Science)', en: 'Environmental Science' },
    defaultWeeklyPeriods: 4,
    color: 'emerald',
    recommendedGrades: ['1', '2', '3', '4', '5']
  },
  {
    key: 'general_science',
    name: { om: 'Saayinsii Waliigalaa', am: 'አጠቃላይ ሳይንስ (General Science)', en: 'General Science' },
    defaultWeeklyPeriods: 5,
    color: 'blue',
    recommendedGrades: ['6', '7', '8']
  },
  {
    key: 'afaan_oromoo',
    name: { om: 'Afaan Oromoo', am: 'ኦሮምኛ (Afan Oromo)', en: 'Afan Oromo Language' },
    defaultWeeklyPeriods: 5,
    color: 'amber',
    recommendedGrades: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  {
    key: 'english',
    name: { om: 'Afaan Ingilizii (English)', am: 'እንግሊዝኛ (English)', en: 'English Language' },
    defaultWeeklyPeriods: 5,
    color: 'violet',
    recommendedGrades: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  {
    key: 'social_studies',
    name: { om: 'Saayinsii Hawaasaa', am: 'ሕብረተሰብ ሳይንስ (Social Studies)', en: 'Social Studies' },
    defaultWeeklyPeriods: 4,
    color: 'rose',
    recommendedGrades: ['5', '6', '7', '8']
  },
  {
    key: 'citizenship',
    name: { om: 'Barnoota Lammummaa', am: 'የዜግነት ትምህርት (Citizenship)', en: 'Citizenship Education' },
    defaultWeeklyPeriods: 3,
    color: 'teal',
    recommendedGrades: ['5', '6', '7', '8']
  },
  {
    key: 'it',
    name: { om: 'Teeknooloojii Odeeffannoo (IT)', am: 'የመረጃ ቴክኖሎጂ (ICT)', en: 'Information Technology' },
    defaultWeeklyPeriods: 3,
    color: 'cyan',
    recommendedGrades: ['5', '6', '7', '8']
  },
  {
    key: 'hpe',
    name: { om: 'Fayyaa fi Dandeettii Qaamaa (HPE)', am: 'የሰውነት ማጎልመሻ', en: 'Health & Physical Education' },
    defaultWeeklyPeriods: 2,
    color: 'orange',
    recommendedGrades: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  {
    key: 'arts',
    name: { om: 'Aartii fi Ogummaa (PVA)', am: 'ስነ-ጥበብ (Arts)', en: 'Visual & Performing Arts' },
    defaultWeeklyPeriods: 2,
    color: 'pink',
    recommendedGrades: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  {
    key: 'amharic',
    name: { om: 'Afaan Amaaraa', am: 'አማርኛ ቋንቋ', en: 'Amharic Language' },
    defaultWeeklyPeriods: 3,
    color: 'purple',
    recommendedGrades: ['3', '4', '5', '6', '7', '8']
  },
  {
    key: 'custom',
    name: { om: 'Barnoota Biraa (Custom)', am: 'ሌላ የትምህርት ዓይነት', en: 'Custom Subject' },
    defaultWeeklyPeriods: 4,
    color: 'slate',
    recommendedGrades: ['1', '2', '3', '4', '5', '6', '7', '8']
  }
];

// Standard Ethiopian Academic Calendar Month and Date mapping for 43 Weeks
export const ACADEMIC_CALENDAR_WEEKS = [
  // Semester 1 (22 weeks)
  // Fulbaana (Weeks 1 to 4)
  { week: 1, semester: 1 as const, monthIndex: 0, month: { om: 'Fulbaana', am: 'መስከረም', en: 'September' }, dateRange: '01 - 05 (5)' },
  { week: 2, semester: 1 as const, monthIndex: 0, month: { om: 'Fulbaana', am: 'መስከረም', en: 'September' }, dateRange: '08 - 12 (5)' },
  { week: 3, semester: 1 as const, monthIndex: 0, month: { om: 'Fulbaana', am: 'መስከረም', en: 'September' }, dateRange: '15 - 19 (5)' },
  { week: 4, semester: 1 as const, monthIndex: 0, month: { om: 'Fulbaana', am: 'መስከረም', en: 'September' }, dateRange: '22 - 26 (5)' },
  // Onkololeessa (Weeks 5 to 8)
  { week: 5, semester: 1 as const, monthIndex: 1, month: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'October' }, dateRange: '29/01 - 03 (5)' },
  { week: 6, semester: 1 as const, monthIndex: 1, month: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'October' }, dateRange: '06 - 10 (5)' },
  { week: 7, semester: 1 as const, monthIndex: 1, month: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'October' }, dateRange: '13 - 17 (5)' },
  { week: 8, semester: 1 as const, monthIndex: 1, month: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'October' }, dateRange: '20 - 24 (5)' },
  // Sadaasa (Weeks 9 to 13)
  { week: 9, semester: 1 as const, monthIndex: 2, month: { om: 'Sadaasa', am: 'ኅዳር', en: 'November' }, dateRange: '27/02 - 01 (5)', isExam: true, examType: 'midterm1' },
  { week: 10, semester: 1 as const, monthIndex: 2, month: { om: 'Sadaasa', am: 'ኅዳር', en: 'November' }, dateRange: '04 - 08 (5)' },
  { week: 11, semester: 1 as const, monthIndex: 2, month: { om: 'Sadaasa', am: 'ኅዳር', en: 'November' }, dateRange: '11 - 15 (5)' },
  { week: 12, semester: 1 as const, monthIndex: 2, month: { om: 'Sadaasa', am: 'ኅዳር', en: 'November' }, dateRange: '18 - 22 (5)' },
  { week: 13, semester: 1 as const, monthIndex: 2, month: { om: 'Sadaasa', am: 'ኅዳር', en: 'November' }, dateRange: '25 - 29 (5)' },
  // Muddee (Weeks 14 to 17)
  { week: 14, semester: 1 as const, monthIndex: 3, month: { om: 'Muddee', am: 'ታኅሣሥ', en: 'December' }, dateRange: '03 - 07 (5)' },
  { week: 15, semester: 1 as const, monthIndex: 3, month: { om: 'Muddee', am: 'ታኅሣሥ', en: 'December' }, dateRange: '10 - 14 (5)' },
  { week: 16, semester: 1 as const, monthIndex: 3, month: { om: 'Muddee', am: 'ታኅሣሥ', en: 'December' }, dateRange: '17 - 21 (5)' },
  { week: 17, semester: 1 as const, monthIndex: 3, month: { om: 'Muddee', am: 'ታኅሣሥ', en: 'December' }, dateRange: '24 - 28 (5)' },
  // Amajjii (Weeks 18 to 22)
  { week: 18, semester: 1 as const, monthIndex: 4, month: { om: 'Amajjii', am: 'ጥር', en: 'January' }, dateRange: '01 - 05 (5)' },
  { week: 19, semester: 1 as const, monthIndex: 4, month: { om: 'Amajjii', am: 'ጥር', en: 'January' }, dateRange: '08 - 12 (5)' },
  { week: 20, semester: 1 as const, monthIndex: 4, month: { om: 'Amajjii', am: 'ጥር', en: 'January' }, dateRange: '15 - 19 (5)' },
  { week: 21, semester: 1 as const, monthIndex: 4, month: { om: 'Amajjii', am: 'ጥር', en: 'January' }, dateRange: '22 - 26 (5)', isExam: true, examType: 'final1' },
  { week: 22, semester: 1 as const, monthIndex: 4, month: { om: 'Amajjii', am: 'ጥር', en: 'January' }, dateRange: '29 - 30 (2)', isExam: true, examType: 'break1' },

  // Semester 2 (21 weeks)
  // Guraandhala (Weeks 23 to 26)
  { week: 23, semester: 2 as const, monthIndex: 5, month: { om: 'Guraandhala', am: 'የካቲት', en: 'February' }, dateRange: '01 - 05 (5)' },
  { week: 24, semester: 2 as const, monthIndex: 5, month: { om: 'Guraandhala', am: 'የካቲት', en: 'February' }, dateRange: '08 - 12 (5)' },
  { week: 25, semester: 2 as const, monthIndex: 5, month: { om: 'Guraandhala', am: 'የካቲት', en: 'February' }, dateRange: '15 - 19 (5)' },
  { week: 26, semester: 2 as const, monthIndex: 5, month: { om: 'Guraandhala', am: 'የካቲት', en: 'February' }, dateRange: '22 - 26 (5)' },
  // Bitooteessa (Weeks 27 to 30)
  { week: 27, semester: 2 as const, monthIndex: 6, month: { om: 'Bitooteessa', am: 'መጋቢት', en: 'March' }, dateRange: '29/06 - 04 (5)' },
  { week: 28, semester: 2 as const, monthIndex: 6, month: { om: 'Bitooteessa', am: 'መጋቢት', en: 'March' }, dateRange: '07 - 11 (5)' },
  { week: 29, semester: 2 as const, monthIndex: 6, month: { om: 'Bitooteessa', am: 'መጋቢት', en: 'March' }, dateRange: '14 - 18 (5)' },
  { week: 30, semester: 2 as const, monthIndex: 6, month: { om: 'Bitooteessa', am: 'መጋቢት', en: 'March' }, dateRange: '21 - 25 (5)' },
  // Ebla (Weeks 31 to 35)
  { week: 31, semester: 2 as const, monthIndex: 7, month: { om: 'Ebla', am: 'ሚያዝያ', en: 'April' }, dateRange: '28/07 - 02 (5)' },
  { week: 32, semester: 2 as const, monthIndex: 7, month: { om: 'Ebla', am: 'ሚያዝያ', en: 'April' }, dateRange: '05 - 09 (5)', isExam: true, examType: 'midterm2' },
  { week: 33, semester: 2 as const, monthIndex: 7, month: { om: 'Ebla', am: 'ሚያዝያ', en: 'April' }, dateRange: '12 - 16 (5)' },
  { week: 34, semester: 2 as const, monthIndex: 7, month: { om: 'Ebla', am: 'ሚያዝያ', en: 'April' }, dateRange: '19 - 23 (5)' },
  { week: 35, semester: 2 as const, monthIndex: 7, month: { om: 'Ebla', am: 'ሚያዝያ', en: 'April' }, dateRange: '26 - 30 (5)' },
  // Caamsaa (Weeks 36 to 39)
  { week: 36, semester: 2 as const, monthIndex: 8, month: { om: 'Caamsaa', am: 'ግንቦት', en: 'May' }, dateRange: '03 - 07 (5)' },
  { week: 37, semester: 2 as const, monthIndex: 8, month: { om: 'Caamsaa', am: 'ግንቦት', en: 'May' }, dateRange: '10 - 14 (5)' },
  { week: 38, semester: 2 as const, monthIndex: 8, month: { om: 'Caamsaa', am: 'ግንቦት', en: 'May' }, dateRange: '17 - 21 (5)' },
  { week: 39, semester: 2 as const, monthIndex: 8, month: { om: 'Caamsaa', am: 'ግንቦት', en: 'May' }, dateRange: '24 - 28 (5)' },
  // Waxabajjii (Weeks 40 to 43)
  { week: 40, semester: 2 as const, monthIndex: 9, month: { om: 'Waxabajjii', am: 'ሰኔ', en: 'June' }, dateRange: '01 - 05 (5)' },
  { week: 41, semester: 2 as const, monthIndex: 9, month: { om: 'Waxabajjii', am: 'ሰኔ', en: 'June' }, dateRange: '08 - 12 (5)' },
  { week: 42, semester: 2 as const, monthIndex: 9, month: { om: 'Waxabajjii', am: 'ሰኔ', en: 'June' }, dateRange: '15 - 19 (5)', isExam: true, examType: 'final2' },
  { week: 43, semester: 2 as const, monthIndex: 9, month: { om: 'Waxabajjii', am: 'ሰኔ', en: 'June' }, dateRange: '22 - 26 (5)', isExam: true, examType: 'closing' },
];

// Curricular Outline Definitions for Popular Subjects
export interface SubjectChapterOutline {
  chapterNumber: number;
  chapter: { om: string; am: string; en: string };
  topics: Array<{
    title: { om: string; am: string; en: string };
    objectives: { om: string; am: string; en: string };
    priorKnowledge: { om: string; am: string; en: string };
    outcome: { om: string; am: string; en: string };
    method: { om: string; am: string; en: string };
    aids: { om: string; am: string; en: string };
    assessment: { om: string; am: string; en: string };
    pageRange: string;
  }>;
}

// Grade 5 Environmental Science (Saayinsii Naannoo Kutaa 5ffaa)
export const G5_ENV_SCIENCE_OUTLINE: SubjectChapterOutline[] = [
  {
    chapterNumber: 1,
    chapter: { om: 'Boqonnaa 1: Lubbu-qabeeyyii fi Sirna Naannoo', am: 'ምዕራፍ 1፡ ሕያዋን ፍጥረታትና ሥነ-ምህዳር', en: 'Unit 1: Living Things and Ecosystems' },
    topics: [
      {
        title: { om: '1.1 Akaakuu Lubbu-qabeeyyii fi Amaloota Isaanii', am: '1.1 የሕያዋን ፍጥረታት ዓይነቶችና ባሕርያት', en: '1.1 Types and Characteristics of Living Organisms' },
        objectives: { om: 'Amaloota waliigalaa lubbu-qabeeyyii adda baasuu fi ibsuu.', am: 'የሕያዋን ፍጥረታትን ጠቅላላ ባሕርያት መለየትና ማብራራት።', en: 'Identify and describe core characteristics of living organisms.' },
        priorKnowledge: { om: 'Beekumsa saayinsii naannoo kutaa 4ffaa irraa qaban.', am: 'ከ4ኛ ክፍል የአካባቢ ሳይንስ የተገኘ መሰረታዊ እውቀት።', en: 'Prior understanding from Grade 4 Environmental Science.' },
        outcome: { om: 'Lubbu-qabeeyyii fi lubbu-dhabeeyyii addaan baafatu.', am: 'ሕያዋንና ግዑዛን ፍጥረታትን ይለያሉ።', en: 'Differentiate between living and non-living things.' },
        method: { om: 'Ibsa barsiisaa, marii daree, daawwannaa naannoo.', am: 'የመምህር ገለፃ፣ የክፍል ውይይት፣ የመስክ ምልከታ።', en: 'Teacher explanation, class discussion, outdoor observation.' },
        aids: { om: 'Fakkii biqiltootaa fi bineensotaa, naannoo mana barumsaa.', am: 'የተክሎችና የእንስሳት ሥዕሎች፣ የትምህርት ቤት ግቢ።', en: 'Pictures of plants and animals, school compound.' },
        assessment: { om: 'Gaaffii afaanii, gilgaala daree, daawwannaa.', am: 'የቃል ጥያቄዎች፣ የክፍል ሥራ፣ ምልከታ።', en: 'Oral questions, classwork, observation.' },
        pageRange: '1 - 10'
      },
      {
        title: { om: '1.2 Biqiltoota fi Qaamolee Isaanii', am: '1.2 ተክሎችና ክፍሎቻቸው', en: '1.2 Plants and Their Main Parts' },
        objectives: { om: 'Qaamolee biqiltootaa fi gahee hojii isaanii ibsuu.', am: 'የተክሎችን ክፍሎችና ተግባራቸውን መግለጽ።', en: 'Describe parts of a flowering plant and their functions.' },
        priorKnowledge: { om: 'Biqiltoota naannootti argaman beeku.', am: 'በአካባቢ የሚገኙ የተክሎች ዓይነቶችን ያውቃሉ።', en: 'Familiarity with common local plants.' },
        outcome: { om: 'Qaamolee biqiltootaa fakkii kaasuun agarsiisu.', am: 'የተክሎች ክፍሎችን በሥዕል ይለያሉ።', en: 'Sketch and label parts of plants correctly.' },
        method: { om: 'Marii garee, fakkii fayyadamuun ibsuu.', am: 'የቡድን ውይይት፣ ሥዕላዊ ማብራሪያ።', en: 'Group discussion, chart demonstration.' },
        aids: { om: 'Biqilaa dhugaa, chaartii qaama biqiltootaa.', am: 'እውነተኛ ተክል፣ የተክሎች ክፍሎች ቻርት።', en: 'Real plant specimen, biological chart.' },
        assessment: { om: 'Fakkii kaasuu, hojii manaa, qormaata gabaabaa.', am: 'ሥዕል መሳል፣ የቤት ሥራ፣ አጭር ፈተና።', en: 'Diagram drawing, homework, short quiz.' },
        pageRange: '11 - 22'
      },
      {
        title: { om: '1.3 Bineensota fi Wal-qunnamtii Nyaataa (Food Chain)', am: '1.3 እንስሳትና የምግብ ሰንሰለት', en: '1.3 Animals and the Food Chain' },
        objectives: { om: 'Harkaa fi fuula wal-nyaatinsa bineensotaa (food chain) hubachuu.', am: 'በእንስሳት መካከል ያለውን የምግብ ሰንሰለት ግንኙነት መረዳት።', en: 'Understand relationships in a simple food chain.' },
        priorKnowledge: { om: 'Nyaata bineensonni sooratan beeku.', am: 'እንስሳት የሚመገቡትን የምግብ ዓይነት ያውቃሉ።', en: 'Knowledge of animal diets.' },
        outcome: { om: 'Sarara soorataa naannoo isaanii ijaaruu danda\'u.', am: 'ቀላል የምግብ ሰንሰለትን ያሳያሉ።', en: 'Construct a simple local food chain.' },
        method: { om: 'Gilgaala garee, fakkii xiyyoo agarsiisuu.', am: 'የቡድን ልምምድ፣ የቀስት ሥዕላዊ መግለጫ።', en: 'Group exercise, flow diagramming.' },
        aids: { om: 'Waraqaa fakkii soorataa qabu, gabatee gurraacha.', am: 'የምግብ ዑደት ሥዕላዊ መግለጫ፣ ሰሌዳ።', en: 'Food web cards, blackboard illustrations.' },
        assessment: { om: 'Hojii garee, gabaasa dhiyeessuu.', am: 'የቡድን ሥራ፣ ሪፖርት ማቅረብ።', en: 'Group work, student presentation.' },
        pageRange: '23 - 35'
      }
    ]
  },
  {
    chapterNumber: 2,
    chapter: { om: 'Boqonnaa 2: Qaama Namaa, Nyaata fi Fayyaa', am: 'ምዕራፍ 2፡ የሰውነት ክፍሎች፣ ምግብና ጤና', en: 'Unit 2: Human Body, Nutrition and Health' },
    topics: [
      {
        title: { om: '2.1 Qaamolee Miiraa fi Qulqullina Isaanii', am: '2.1 የስሜት ሕዋሳትና ንጽሕናቸው', en: '2.1 Sense Organs and Personal Hygiene' },
        objectives: { om: 'Qaamolee miiraa shanan fi kunuunsa isaanii beekuu.', am: 'አምስቱን የስሜት ሕዋሳትና ክብካቤያቸውን ማወቅ።', en: 'Identify the five sense organs and how to protect them.' },
        priorKnowledge: { om: 'Ija, gurra, funyaan, arraba fi gogaa beeku.', am: 'ዓይን፣ ጆሮ፣ አፍንጫ፣ ምላስና ቆዳን ያውቃሉ።', en: 'Basic recognition of external body parts.' },
        outcome: { om: 'Akkaataa qulqullina qaamolee miiraa eegan shaakalu.', am: 'የስሜት ሕዋሳትን ንጽሕና አጠባበቅ ይለማመዳሉ።', en: 'Practice proper cleaning and safety of sense organs.' },
        method: { om: 'Agarsiisa qabatamaa, gaaffii fi deebii.', am: 'ተግባራዊ ማሳያ፣ ጥያቄና መልስ።', en: 'Demonstration, Q&A session.' },
        aids: { om: 'Saamunaa, bishaan qulqulluu, fuula daawwitii, chaartii.', am: 'ሳሙና፣ ንጹሕ ውኃ፣ መስተዋት፣ ቻርት።', en: 'Soap, clean water, mirror, anatomy chart.' },
        assessment: { om: 'Shaakala qulqullinaa hordofuu, gaaffii afaanii.', am: 'የንጽሕና ልማድን መገምገም፣ የቃል ጥያቄ።', en: 'Hygiene inspection, oral quiz.' },
        pageRange: '36 - 48'
      },
      {
        title: { om: '2.2 Nyaata Madaalawaa fi Gareewwan Soorataa', am: '2.2 የተመጣጠነ ምግብና የምግብ ምድቦች', en: '2.2 Balanced Diet and Food Groups' },
        objectives: { om: 'Gareewwan soorataa fi faayidaa nyaata madaalawaa ibsuu.', am: 'የምግብ ምድቦችንና የተመጣጠነ ምግብ ጥቅምን መግለጽ።', en: 'Explain the 3 main food groups and balanced diet.' },
        priorKnowledge: { om: 'Akaakuu nyaata gosa adda addaa beeku.', am: 'የተለያዩ ምግቦችን ያውቃሉ።', en: 'Everyday foods eaten at home.' },
        outcome: { om: 'Gabatee nyaata madaalawaa qopheeffachuu danda\'u.', am: 'የተመጣጠነ ምግብ ሰንጠረዥ ያዘጋጃሉ።', en: 'Plan a balanced daily meal menu.' },
        method: { om: 'Marii garee, faayidaa soorataa ibsuu.', am: 'የቡድን ውይይት፣ የምግብ ንጥረ ነገሮችን ማብራራት።', en: 'Group work, nutritional breakdown.' },
        aids: { om: 'Fakkii midhaanii, muduraa, fuduraa fi aannanii.', am: 'የእህል፣ የአትክልትና ፍራፍሬ፣ የወተት ሥዕሎች።', en: 'Food group pyramid flashcards.' },
        assessment: { om: 'Hojii daree, qormaata gabaabaa.', am: 'የክፍል ሥራ፣ አጭር ፈተና።', en: 'Classwork, homework exercises.' },
        pageRange: '49 - 62'
      }
    ]
  },
  {
    chapterNumber: 3,
    chapter: { om: 'Boqonnaa 3: Qabeenya Uumamaa fi Naannoo', am: 'ምዕራፍ 3፡ የተፈጥሮ ሀብትና አካባቢ ጥበቃ', en: 'Unit 3: Natural Resources and Conservation' },
    topics: [
      {
        title: { om: '3.1 Biyyee, Bishaan fi Bosona Naannoo Keenyaa', am: '3.1 የአካባቢያችን አፈር፣ ውኃና ደን', en: '3.1 Soil, Water and Forest Resources' },
        objectives: { om: 'Qabeenya uumamaa naannoo Oromiyaa fi Itoophiyaa adda baasuu.', am: 'የአካባቢ የተፈጥሮ ሀብቶችን መለየትና ጥቅማቸውን ማወቅ።', en: 'Identify key natural resources in Oromia & Ethiopia.' },
        priorKnowledge: { om: 'Mukkeen, laggeen fi biyyee naannoo beeku.', am: 'ወንዞች፣ ዛፎችና አፈርን ያውቃሉ።', en: 'Basic local geography.' },
        outcome: { om: 'Faayidaa fi eegumsa qabeenya uumamaa ibsu.', am: 'የተፈጥሮ ሀብት አጠባበቅን ያብራራሉ።', en: 'Explain conservation methods for soil and trees.' },
        method: { om: 'Marii daree, muuxannoo qooduu.', am: 'የክፍል ውይይት፣ ልምድ መለዋወጥ።', en: 'Interactive discussion, experience sharing.' },
        aids: { om: 'Kaartaa qabeenya uumamaa, fakkeenya biyyee.', am: 'የተፈጥሮ ሀብት ካርታ፣ የአፈር ናሙና።', en: 'Local natural resource map, soil samples.' },
        assessment: { om: 'Gaaffii fi deebii, gabaasa barreessuu.', am: 'ጥያቄና መልስ፣ አጭር ጽሑፍ ማቅረብ።', en: 'Q&A, reflection summary.' },
        pageRange: '63 - 78'
      },
      {
        title: { om: '3.2 Sababoota Xuraa\'uu Naannoo fi Furmaata Isaanii', am: '3.2 የአካባቢ ብክለት መንስኤዎችና መፍትሔዎች', en: '3.2 Causes and Solutions of Environmental Pollution' },
        objectives: { om: 'Sababoota xuraa\'ina qilleensaa fi bishaanii beekuu.', am: 'የአየርና የውኃ ብክለት ምክንያቶችን ማወቅ።', en: 'Recognize major types and causes of environmental pollution.' },
        priorKnowledge: { om: 'Balfa naannootti gatamu argu.', am: 'የቆሻሻ አወጋገድ ችግሮችን ያውቃሉ።', en: 'Awareness of plastic waste and littering.' },
        outcome: { om: 'Kunuunsa qulqullina naannoo irratti hirmaatu.', am: 'በአካባቢ ጽዳት ላይ በንቃት ይሳተፋሉ።', en: 'Participate actively in school/home cleanliness.' },
        method: { om: 'Hojii qabatamaa naannoo qulqulleessuu.', am: 'ተግባራዊ የጽዳት ዘመቻ፣ ገለፃ።', en: 'School cleanup campaign, case examples.' },
        aids: { om: 'Qodaa balfaa, meeshaalee qulqullinaa.', am: 'የቆሻሻ መጣያ፣ የጽዳት ዕቃዎች።', en: 'Trash bins, cleaning implements, photos.' },
        assessment: { om: 'Hirmaannaa shaakalaa, qormaata barreeffamaa.', am: 'የተግባር ተሳትፎ፣ የጽሑፍ ፈተና።', en: 'Practical participation, written test.' },
        pageRange: '79 - 95'
      }
    ]
  },
  {
    chapterNumber: 4,
    chapter: { om: 'Boqonnaa 4: Qilleensa, Haala Qilleensaa fi Wantoota Fizikaalaa', am: 'ምዕራፍ 4፡ አየር፣ የአየር ንብረትና ቁሶች', en: 'Unit 4: Weather, Climate and Matter' },
    topics: [
      {
        title: { om: '4.1 Amaloota Qilleensaa fi Safara Isaanii', am: '4.1 የአየር ባሕርያትና መለኪያዎቻቸው', en: '4.1 Properties of Air and Weather Measuring Instruments' },
        objectives: { om: 'Meeshaalee safara haala qilleensaa (Termoomeetira kkf) beekuu.', am: 'የአየር ሁኔታ መለኪያ መሣሪያዎችን ማወቅ።', en: 'Identify weather instruments like thermometer, rain gauge.' },
        priorKnowledge: { om: 'Ho\'a, qorra fi rooba beeku.', am: 'ሙቀት፣ ቅዝቃዜና ዝናብን ያውቃሉ።', en: 'Familiarity with hot, cold, and rainy days.' },
        outcome: { om: 'Gulaallii haala qilleensaa galmeessuu danda\'u.', am: 'የዕለቱን የአየር ሁኔታ ይመዘግባሉ።', en: 'Record daily weather observations.' },
        method: { om: 'Yaalii salphaa hojjechuu, agarsiisa.', am: 'ቀላል ሙከራ መሥራት፣ ማሳያ።', en: 'Simple classroom experiment, demonstration.' },
        aids: { om: 'Termoomeetira, buufata roobaa salphaa.', am: 'ቴርሞሜትር፣ ቀላል የዝናብ መለኪያ።', en: 'Thermometer, model rain gauge.' },
        assessment: { om: 'Galmee haala qilleensaa madaaluu, gaaffii daree.', am: 'የአየር ሁኔታ ምዝገባን መገምገም፣ የክፍል ጥያቄ።', en: 'Weather chart evaluation, classroom quiz.' },
        pageRange: '96 - 110'
      },
      {
        title: { om: '4.2 Sadarkaa Wantaa (Jajjaboo, Dhangala\'oo, Gaasii)', am: '4.2 የቁስ አካል ሁኔታዎች (ጠጣር፣ ፈሳሽ፣ ጋዝ)', en: '4.2 States of Matter (Solids, Liquids, Gases)' },
        objectives: { om: 'Amaloota jajjaboo, dhangala\'oo fi gaasii adda baafachuu.', am: 'የጠጣር፣ ፈሳሽና ጋዝ ባሕርያትን መለየት።', en: 'Distinguish properties of solids, liquids, and gases.' },
        priorKnowledge: { om: 'Bishaan, dhagaa fi qilleensa beeku.', am: 'ውኃ፣ ድንጋይና አየርን ያውቃሉ።', en: 'Observations of ice, water, and steam.' },
        outcome: { om: 'Fakkeenya jajjaboo, dhangala\'oo fi gaasii kennu.', am: 'የሶስቱን የቁስ ዓይነቶች ምሳሌ ይሰጣሉ።', en: 'Classify common substances by state of matter.' },
        method: { om: 'Yaalii dhangala\'oo fi jajjaboo gabateetti agarsiisuu.', am: 'ተግባራዊ ሙከራ፣ ሰሌዳ ላይ ማብራራት።', en: 'Hands-on water/ice experiment, illustration.' },
        aids: { om: 'Bishaan, qodaa adda addaa, kubbaa qilleensaa.', am: 'ውኃ፣ የተለያዩ ዕቃዎች፣ ፊኛ።', en: 'Containers of different shapes, balloons, ice.' },
        assessment: { om: 'Hojii manaa, qormaata boqonnaa.', am: 'የቤት ሥራ፣ የምዕራፍ ፈተና።', en: 'Homework, chapter review test.' },
        pageRange: '111 - 128'
      }
    ]
  }
];

// Grade 6 Mathematics (Herrega Kutaa 6ffaa) Outline
export const G6_MATH_OUTLINE: SubjectChapterOutline[] = [
  {
    chapterNumber: 1,
    chapter: { om: 'Boqonnaa 1: Lakkoofsota Uumamaa fi Lakkoofsota Guutuu', am: 'ምዕራፍ 1፡ መደበኛና ሙሉ ቁጥሮች', en: 'Unit 1: Natural Numbers and Integers' },
    topics: [
      {
        title: { om: '1.1 Lakkoofsota Posatiivii fi Neegaatiivii Sarara Lakkoofsaa Irratti', am: '1.1 አዎንታዊና አሉታዊ ቁጥሮች በቁጥር መስመር ላይ', en: '1.1 Positive and Negative Integers on Number Line' },
        objectives: { om: 'Lakkoofsota guutuu sarara lakkoofsaa irratti agarsiisuu fi dorgomsiisuu.', am: 'ሙሉ ቁጥሮችን በቁጥር መስመር ላይ ማሳየትና ማወዳደር።', en: 'Represent and compare positive and negative integers on a number line.' },
        priorKnowledge: { om: 'Lakkoofsota uumamaa kutaa 5ffaa beeku.', am: 'ከ5ኛ ክፍል የቁጥሮች እውቀት አላቸው።', en: 'Familiarity with whole numbers from Grade 5.' },
        outcome: { om: 'Mallattoo (> , < , =) fayyadamuun lakkoofsota guutuu wal-bira qabu.', am: 'ሙሉ ቁጥሮችን ያወዳድራሉ።', en: 'Order and compare integers correctly.' },
        method: { om: 'Sarara lakkoofsaa gabatee irratti kaasuun agarsiisuu.', am: 'በሰሌዳ ላይ የቁጥር መስመር በመሳል ማሳየት።', en: 'Blackboard demonstration with number line.' },
        aids: { om: 'Sarartuu, kaardii lakkoofsotaa.', am: 'ማስመሪያ፣ የቁጥር ካርዶች።', en: 'Rulers, integer number cards.' },
        assessment: { om: 'Gilgaala daree, hojii manaa.', am: 'የክፍል ልምምድ፣ የቤት ሥራ።', en: 'Class exercises, homework assignment.' },
        pageRange: '1 - 14'
      },
      {
        title: { om: '1.2 Ida\'uu fi Hir\'isuu Lakkoofsota Guutuu', am: '1.2 ሙሉ ቁጥሮችን መደመርና መቀነስ', en: '1.2 Addition and Subtraction of Integers' },
        objectives: { om: 'Seera ida\'uu fi hir\'isuu lakkoofsota guutuu shaakaluu.', am: 'የሙሉ ቁጥሮች መደመርና መቀነስ ሕጎችን ማወቅ።', en: 'Apply signs rules for integer addition and subtraction.' },
        priorKnowledge: { om: 'Sarara lakkoofsaa irratti gara mirgaa fi bitaatti socho\'uu.', am: 'በቁጥር መስመር ላይ ወደቀኝና ግራ መጓዝ።', en: 'Number line direction movements.' },
        outcome: { om: 'Hisaabota ida\'uu fi hir\'isuu lakkoofsa neegaatiivii qaban sirriitti shallagu.', am: 'የሙሉ ቁጥሮችን ድምርና ልዩነት በትክክል ያሰላሉ።', en: 'Calculate sums and differences of integers accurately.' },
        method: { om: 'Fakkeenya hedduu shallaganii agarsiisuu, hojii garee.', am: 'በርካታ ምሳሌዎችን ማሳየት፣ የቡድን ልምምድ።', en: 'Worked mathematical examples, paired drills.' },
        aids: { om: 'Gabatee gurraacha, waraqaa shaakalaa.', am: 'ሰሌዳ፣ የተግባር ወረቀት።', en: 'Blackboard, practice worksheets.' },
        assessment: { om: 'Qormaata gabaabaa, hojii daree.', am: 'አጭር ፈተና፣ የክፍል ሥራ።', en: 'Spot quiz, classwork problems.' },
        pageRange: '15 - 28'
      }
    ]
  },
  {
    chapterNumber: 2,
    chapter: { om: 'Boqonnaa 2: Hirmaata fi Lakkoofsota Daseemaalii', am: 'ምዕራፍ 2፡ ክፍልፋዮችና አስርዮሽ ቁጥሮች', en: 'Unit 2: Fractions and Decimals' },
    topics: [
      {
        title: { om: '2.1 Baay\'isuu fi Hiruu Hirmaataa', am: '2.1 ክፍልፋዮችን ማባዛትና ማካፈል', en: '2.1 Multiplication and Division of Fractions' },
        objectives: { om: 'Hirmaata wal-makaa fi sirrii baay\'isuu fi hiruu danda\'uu.', am: 'ክፍልፋዮችን ማባዛትና ማካፈል መቻል።', en: 'Multiply and divide proper, improper, and mixed fractions.' },
        priorKnowledge: { om: 'Ida\'uu fi hir\'isuu hirmaataa beeku.', am: 'ክፍልፋዮችን መደመርና መቀነስ ያውቃሉ።', en: 'Fraction addition and common denominators.' },
        outcome: { om: 'Gaaffilee jechaa hirmaata of keessaa qaban furu.', am: 'ክፍልፋዮችን ያካተቱ የቃል ፕሮብሌሞችን ይፈታሉ።', en: 'Solve real-life word problems involving fractions.' },
        method: { om: 'Ibsa tartiibaa, gaaffii fi deebii.', am: 'ደረጃ በደረጃ ማብራራት፣ ጥያቄና መልስ።', en: 'Step-by-step algorithms, blackboard problem solving.' },
        aids: { om: 'Fakkii geengoo fi rog-afurii hiramanii.', am: 'ክፍልፋይ የተደረጉ የክብና አራት ማዕዘን ቅርጾች።', en: 'Fraction circles, rectangular fraction bars.' },
        assessment: { om: 'Hojii manaa, hojii daree.', am: 'የቤት ሥራ፣ የክፍል ሥራ።', en: 'Classwork, textbook problems.' },
        pageRange: '29 - 46'
      },
      {
        title: { om: '2.2 Lakkoofsota Daseemaalii fi Dhibbeentaa', am: '2.2 አስርዮሽ ቁጥሮችና ፐርሰንት', en: '2.2 Decimals and Percentages' },
        objectives: { om: 'Hirmaata gara daseemaalii fi dhibbeentaatti jijjiiruu.', am: 'ክፍልፋዮችን ወደ አስርዮሽና ፐርሰንት መቀየር።', en: 'Convert between fractions, decimals, and percentages.' },
        priorKnowledge: { om: 'Kurnaaffaa fi dhibbaaffaa daseemaalii beeku.', am: 'የአስርዮሽ ቤት ዋጋዎችን ያውቃሉ።', en: 'Decimal place values.' },
        outcome: { om: 'Dhibbeentaa shallaguun gabaa fi jireenya guyyuu keessatti itti fayyadamu.', am: 'ፐርሰንትን በዕለት ተዕለት ሕይወት ይጠቀማሉ።', en: 'Calculate percentages for sales, discounts, and tests.' },
        method: { om: 'Marii garee, fakkeenya jireenya qabatamaa.', am: 'የቡድን ውይይት፣ የገበያ ምሳሌዎች።', en: 'Practical shopping scenarios, math drills.' },
        aids: { om: 'Gabatee dhibbaa (100-grid), qalama bifa qabu.', am: 'የመቶ ፍርግርግ ሰንጠረዥ፣ ደረሰኝ ናሙናዎች።', en: '100-square grid, sample market receipts.' },
        assessment: { om: 'Qormaata boqonnaa, hojii manaa.', am: 'የምዕራፍ ፈተና፣ የቤት ሥራ።', en: 'Chapter quiz, homework problem set.' },
        pageRange: '47 - 65'
      }
    ]
  },
  {
    chapterNumber: 3,
    chapter: { om: 'Boqonnaa 3: Seensa Aljebraa fi Himoota Qixxee', am: 'ምዕራፍ 3፡ የአልጀብራ መግቢያና እኩልታዎች', en: 'Unit 3: Introduction to Algebra and Linear Equations' },
    topics: [
      {
        title: { om: '3.1 Qubee fi Ibsamoota Aljebraa', am: '3.1 ተለዋዋጮችና የአልጀብራ አገላለጾች', en: '3.1 Variables and Algebraic Expressions' },
        objectives: { om: 'Qubee bakka lakkoofsaa buusuun hima aljebraa barreessuu.', am: 'ተለዋዋጭ ፊደላትን በመጠቀም የአልጀብራ አገላለጾችን መጻፍ።', en: 'Formulate algebraic expressions using variables (x, y, a).' },
        priorKnowledge: { om: 'Mallattoolee herregaa fi shallaggii bu\'uuraa beeku.', am: 'መሰረታዊ የሂሳብ ስሌቶችን ያውቃሉ።', en: 'Arithmetic operations.' },
        outcome: { om: 'Gatii qubee kennamerraatti ibsama aljebraa shallagu.', am: 'የአልጀብራ አገላለጾችን ዋጋ ያሰላሉ።', en: 'Evaluate algebraic expressions for given variable values.' },
        method: { om: 'Ibsa gabatee irratti kennuu, shaakala dhuunfaa.', am: 'በሰሌዳ ላይ ማብራራት፣ የግል ልምምድ።', en: 'Step-by-step exposition, guided practice.' },
        aids: { om: 'Gabatee gurraacha, kaardii ibsamootaa.', am: 'ሰሌዳ፣ የአልጀብራ ካርዶች።', en: 'Algebra expression cards.' },
        assessment: { om: 'Gilgaala daree, gaaffii afaanii.', am: 'የክፍል መልመጃ፣ የቃል ጥያቄ።', en: 'Classroom exercise, student presentations.' },
        pageRange: '66 - 82'
      },
      {
        title: { om: '3.2 Himoota Qixxee Salphaa Furuu', am: '3.2 ቀላል የአንድ ተለዋዋጭ እኩልታዎችን መፍታት', en: '3.2 Solving Simple Linear Equations' },
        objectives: { om: 'Himoota qixxee bifa x + a = b fi ax = b jiran furuu.', am: 'x + a = b እና ax = b ዓይነት እኩልታዎችን መፍታት።', en: 'Solve one-step linear equations of type x + a = b and ax = b.' },
        priorKnowledge: { om: 'Madaallii madaala qixa ta\'uu beeku.', am: 'የሚዛን እኩልነት ጽንሰ-ሀሳብን ያውቃሉ።', en: 'Balance scale concept.' },
        outcome: { om: 'Gatii x argachuun hima qixxee mirkaneeffatu.', am: 'ያገኙትን ውጤት አረጋግጠው ያሳያሉ።', en: 'Find unknowns and check solutions by substitution.' },
        method: { om: 'Fakkeenya madaalaatiin barsiisuu.', am: 'በሚዛን ምሳሌ ማስተማር።', en: 'Balance beam analogy, algebraic steps.' },
        aids: { om: 'Fakkii madaalaa, meeshaalee shallaggii.', am: 'የሚዛን ሥዕል፣ ሰሌዳ።', en: 'Balance scales model, worksheet.' },
        assessment: { om: 'Qormaata barreeffamaa, hojii manaa.', am: 'የጽሑፍ ፈተና፣ የቤት ሥራ።', en: 'Written quiz, graded problem set.' },
        pageRange: '83 - 102'
      }
    ]
  },
  {
    chapterNumber: 4,
    chapter: { om: 'Boqonnaa 4: Ji\'oomeetirii fi Safara Kofootaa', am: 'ምዕራፍ 4፡ ጂኦሜትሪና የማዕዘናት መለኪያ', en: 'Unit 4: Geometry, Angles and Plane Figures' },
    topics: [
      {
        title: { om: '4.1 Akaakuu Kofootaa fi Pirootiraaktariin Safaruu', am: '4.1 የማዕዘናት ዓይነቶችና በፕሮትራክተር መለካት', en: '4.1 Types of Angles and Measuring with Protractor' },
        objectives: { om: 'Kofa qajeelaa, dhiphaa, bal\'aa fi diriiraa pirootiraaktariin safaruu.', am: 'ቀጤ፣ አጣብቂኝ፣ ዝርጋታና ጠፍጣፋ ማዕዘናትን በፕሮትራክተር መለካት።', en: 'Measure and construct acute, right, obtuse, and straight angles using a protractor.' },
        priorKnowledge: { om: 'Sarara qajeelaa fi kofoota bu\'uuraa beeku.', am: 'ቀጥታ መስመሮችና ማዕዘናትን ያውቃሉ።', en: 'Basic line segments and corner angles.' },
        outcome: { om: 'Kofoota digrii barbaadameen sirriitti killeessu.', am: 'ማዕዘናትን በትክክል ይለካሉ፣ ይስላሉም።', en: 'Draw and measure precise angles in degrees.' },
        method: { om: 'Agarsiisa pirootiraaktara guddaa gabatee irratti.', am: 'በትልቅ ፕሮትራክተር በሰሌዳ ላይ ማሳየት።', en: 'Demonstration using blackboard protractor and geometry instruments.' },
        aids: { om: 'Pirootiraaktara, sarartuu, kampaasii.', am: 'ፕሮትራክተር፣ ማስመሪያ፣ ኮምፓስ።', en: 'Protractors, rulers, compasses.' },
        assessment: { om: 'Kofoota safaruu fi fakkii kaasuu.', am: 'ማዕዘናትን መለካትና መሳል፣ የክፍል ሥራ።', en: 'Practical angle measurement test, class exercise.' },
        pageRange: '103 - 120'
      }
    ]
  }
];

// Helper to generate a full 43-week curriculum for any subject and grade
export function generateCurriculumForClass(params: {
  subjectName: { om: string; am: string; en: string };
  subjectKey: string;
  grade: string;
  weeklyPeriods: number;
}): CurriculumWeek[] {
  const { subjectName, subjectKey, grade } = params;

  // If Grade 5 Math, return standard pre-seeded curriculum
  if (grade === '5' && (subjectKey === 'math' || subjectKey === 'herrega')) {
    return INITIAL_CURRICULUM_2016;
  }

  // Select appropriate outline or generic framework
  let outlines: SubjectChapterOutline[];
  if (subjectKey === 'env_science' || subjectKey.includes('env')) {
    outlines = G5_ENV_SCIENCE_OUTLINE;
  } else if (grade === '6' && subjectKey === 'math') {
    outlines = G6_MATH_OUTLINE;
  } else {
    // Standard modular 4-chapter curriculum aligned with curriculum standards
    outlines = [
      {
        chapterNumber: 1,
        chapter: {
          om: `Boqonnaa 1: Bu'uuraalee Barnoota ${subjectName.om}`,
          am: `ምዕራፍ 1፡ የ${subjectName.am} መሰረታዊ ትምህርቶች`,
          en: `Unit 1: Fundamentals of ${subjectName.en}`
        },
        topics: [
          {
            title: {
              om: `1.1 Seensa fi Qabiyyee Ijoo Barnoota ${subjectName.om}`,
              am: `1.1 የ${subjectName.am} መግቢያና ዋና ዋና ይዘቶች`,
              en: `1.1 Introduction and Core Concepts of ${subjectName.en}`
            },
            objectives: {
              om: `Kaayyoo fi bu\'uuraalee barnoota ${subjectName.om} hubachuu.`,
              am: `የ${subjectName.am} ዋና ዓላማዎችንና መርሆችን መረዳት።`,
              en: `Understand basic principles and objectives of ${subjectName.en}.`
            },
            priorKnowledge: {
              om: `Barnoota bara darbee kutaa ${parseInt(grade) > 1 ? parseInt(grade) - 1 : 1}ffaa irraa beekumsa qaban.`,
              am: `ካለፈው የክፍል ደረጃ የተገኘ ቅድመ-እውቀት።`,
              en: `Prior foundational knowledge from previous grade level.`
            },
            outcome: {
              om: `Qabxiilee bu\'uuraa daree keessatti ibsuu fi shaakaluu danda\'u.`,
              am: `መሰረታዊ ነጥቦችን በክፍል ውስጥ ማብራራትና መለማመድ ይችላሉ።`,
              en: `Students can articulate and apply foundational concepts in class.`
            },
            method: {
              om: 'Ibsa barsiisaa, marii daree, gaaffii fi deebii.',
              am: 'የመምህር ገለጻ፣ የክፍል ውይይት፣ ጥያቄና መልስ።',
              en: 'Teacher explanation, class discussions, inquiry and Q&A.'
            },
            aids: {
              om: 'Kitaaba barataa, gabatee gurraacha, chaartii.',
              am: 'የተማሪ መጽሐፍ፣ ሰሌዳ፣ የማስተማሪያ ቻርት።',
              en: 'Student textbook, blackboard, wall charts and illustrations.'
            },
            assessment: {
              om: 'Gaaffii afaanii, gilgaala daree, hojii manaa.',
              am: 'የቃል ጥያቄ፣ የክፍል ሥራ፣ የቤት ሥራ።',
              en: 'Oral questions, in-class practice, homework.'
            },
            pageRange: '1 - 18'
          },
          {
            title: {
              om: `1.2 Shaakala fi Hojii Qabatamaa ${subjectName.om}`,
              am: `1.2 የ${subjectName.am} ተግባራዊ ልምምዶች`,
              en: `1.2 Practical Applications and Exercises in ${subjectName.en}`
            },
            objectives: {
              om: 'Dandeettii qabatamaa gilgaaloota kitaabaa hojjechuu gabbifachuu.',
              am: 'የመማሪያ መጽሐፉን ተግባራዊ መልመጃዎች የመሥራት ክህሎትን ማዳበር።',
              en: 'Develop problem-solving and analytical skills through guided activities.'
            },
            priorKnowledge: {
              om: 'Qabiyyee barnoota torban darbee hubatanii jiru.',
              am: 'ያለፈውን ሳምንት ትምህርት ተረድተዋል።',
              en: 'Comprehension of the previous week\'s instruction.'
            },
            outcome: {
              om: 'Gilgaalota kitaabaa of danda\'anii sirriitti hojjetu.',
              am: 'የመልመጃ ጥያቄዎችን በራሳቸው በትክክል ይሠራሉ።',
              en: 'Independently complete exercises and practical tasks correctly.'
            },
            method: {
              om: 'Shaakala dhuunfaa fi garee, agarsiisa barsiisaa.',
              am: 'የግልና የቡድን ልምምድ፣ የመምህር ማሳያ።',
              en: 'Individual drills, cooperative learning, board modeling.'
            },
            aids: {
              om: 'Kitaaba barataa, dabtara, meeshaalee deeggarsa baruu-barsiisuu.',
              am: 'የተማሪ መጽሐፍ፣ ደብተር፣ የማስተማሪያ መርጃ መሣሪያዎች።',
              en: 'Textbooks, student workbooks, manipulatives and aids.'
            },
            assessment: {
              om: 'Hojii garee, daawwannaa daree, qormaata gabaabaa.',
              am: 'የቡድን ሥራ፣ የክፍል ምልከታ፣ አጭር ፈተና።',
              en: 'Group presentations, formative check, short quiz.'
            },
            pageRange: '19 - 35'
          }
        ]
      },
      {
        chapterNumber: 2,
        chapter: {
          om: `Boqonnaa 2: Dhimmoota Ijoo fi Madaallii ${subjectName.om}`,
          am: `ምዕራፍ 2፡ የ${subjectName.am} ዋና ዋና ርዕሰ ጉዳዮች`,
          en: `Unit 2: Core Topics and Practical Competencies in ${subjectName.en}`
        },
        topics: [
          {
            title: {
              om: `2.1 Qorannoo fi Ibsa Qabiyyee Boqonnaa 2`,
              am: `2.1 የምዕራፍ 2 ይዘቶች ዝርዝር ማብራሪያ`,
              en: `2.1 Detailed Exploration of Unit 2 Concepts`
            },
            objectives: {
              om: 'Hubannoo fi dandeettii yaada furuu cimsachuu.',
              am: 'የማሰብና የትንታኔ ችሎታን ማዳበር።',
              en: 'Enhance cognitive and analytical competence in subject matter.'
            },
            priorKnowledge: {
              om: 'Barnoota Boqonnaa 1ffaa xumuraniiru.',
              am: 'ምዕራፍ 1ን አጠናቀዋል።',
              en: 'Mastery of Unit 1 foundation.'
            },
            outcome: {
              om: 'Ibsa fi shallaggii qabiyyichaa sirriitti raawwatu.',
              am: 'የይዘቱን ማብራሪያ በትክክል ያቀርባሉ።',
              en: 'Demonstrate clear understanding through written and spoken work.'
            },
            method: {
              om: 'Ibsa, marii garee, gaaffii fi deebii.',
              am: 'ገለፃ፣ የቡድን ውይይት፣ ጥያቄና መልስ።',
              en: 'Guided lecture, peer collaboration, question-driven review.'
            },
            aids: {
              om: 'Kitaaba barataa, fakkiiwwan fi chaartii.',
              am: 'የተማሪ መጽሐፍ፣ ሥዕሎችና ቻርቶች።',
              en: 'Diagrams, posters, reference textbook pages.'
            },
            assessment: {
              om: 'Gilgaala daree, hojii manaa.',
              am: 'የክፍል መልመጃ፣ የቤት ሥራ።',
              en: 'In-class evaluation, homework assignments.'
            },
            pageRange: '36 - 60'
          }
        ]
      },
      {
        chapterNumber: 3,
        chapter: {
          om: `Boqonnaa 3: Shaakala Bal\'aa fi Hirmaannaa Barattootaa`,
          am: `ምዕራፍ 3፡ ሰፊ ተግባራዊ ልምምድና የተማሪዎች ተሳትፎ`,
          en: `Unit 3: In-Depth Practice and Student Project Work`
        },
        topics: [
          {
            title: {
              om: `3.1 Dandeettii fi Ogummaa Guyyuutti Fayyadamuu`,
              am: `3.1 ትምህርቱን በዕለት ተዕለት ሕይወት መጠቀም`,
              en: `3.1 Real-World Applications and Critical Thinking`
            },
            objectives: {
              om: 'Barnoota daree jireenya guyyuu waliin wal-qabsiisuu.',
              am: 'ትምህርቱን ከዕለት ተዕለት ሕይወት ጋር ማስተሳሰር።',
              en: 'Connect curricular lessons with daily community context.'
            },
            priorKnowledge: {
              om: 'Beekumsa naannoo fi muuxannoo guyyuu.',
              am: 'የአካባቢና የዕለት ተዕለት ተሞክሮ።',
              en: 'Real-world observation and community experience.'
            },
            outcome: {
              om: 'Hubannoo argatan hojii qabatamaa irratti agarsiisu.',
              am: 'ያገኙትን እውቀት በተግባር ያሳያሉ።',
              en: 'Apply knowledge effectively to solve authentic tasks.'
            },
            method: {
              om: 'Hojii piroojeektii salphaa, marii garee.',
              am: 'ቀላል የፕሮጀክት ሥራ፣ የቡድን ውይይት።',
              en: 'Project-based inquiry, small group presentations.'
            },
            aids: {
              om: 'Meeshaalee naannootti argaman, kitaaba.',
              am: 'በአካባቢ የሚገኙ ቁሳቁሶች፣ መጽሐፍ።',
              en: 'Locally available materials, textbooks, activity sheets.'
            },
            assessment: {
              om: 'Madaallii piroojeektii, gabaasa dhiyeessuu.',
              am: 'የፕሮጀክት ምዘና፣ ሪፖርት ማቅረብ።',
              en: 'Project evaluation, rubric assessment.'
            },
            pageRange: '61 - 95'
          }
        ]
      },
      {
        chapterNumber: 4,
        chapter: {
          om: `Boqonnaa 4: Qabiyyee Xumuraa fi Qormaataaf Qophaa\'uu`,
          am: `ምዕራፍ 4፡ የማጠቃለያ ይዘቶችና ለፈተና ዝግጅት`,
          en: `Unit 4: Advanced Competencies and Exam Preparation`
        },
        topics: [
          {
            title: {
              om: `4.1 Irra-deebii fi Qormaataaf Qophii Gochuu`,
              am: `4.1 ክለሳና ለፈተና ዝግጅት ማድረግ`,
              en: `4.1 Comprehensive Review and Cumulative Assessment`
            },
            objectives: {
              om: 'Qabiyyee barnoota semisteeraa guutummaatti killeessuu.',
              am: 'የወሰነ ትምህርቱን ይዘቶች ሙሉ በሙሉ መከለስ።',
              en: 'Review all core learning competencies and test readiness.'
            },
            priorKnowledge: {
              om: 'Boqonnaalee darban hunda barumsa qaban.',
              am: 'ያለፉትን ምዕራፎች ሁሉ ተምረዋል።',
              en: 'All chapters covered throughout the semester.'
            },
            outcome: {
              om: 'Qormaata xumuraa irratti bu\'aa olaanaa galmeessisuu.',
              am: 'በማጠቃለያ ፈተና ላይ ከፍተኛ ውጤት ያስመዘግባሉ።',
              en: 'Demonstrate exam mastery with high academic achievement.'
            },
            method: {
              om: 'Gaaffilee qormaata duraanii shaakaluu, ibsa dabalataa.',
              am: 'ያለፉ የፈተና ጥያቄዎችን መለማመድ፣ ተጨማሪ ማብራሪያ።',
              en: 'Mock exam practice, targeted remedial instruction.'
            },
            aids: {
              om: 'Waraqaa gaaffilee irra-deebii, gabatee.',
              am: 'የክለሳ ጥያቄዎች ወረቀት፣ ሰሌዳ።',
              en: 'Model exam sheets, review question banks.'
            },
            assessment: {
              om: 'Qormaata qophii, gabaasa madaallii.',
              am: 'የልምምድ ፈተና፣ የምዘና ሪፖርት።',
              en: 'Model exam grading, cumulative assessment.'
            },
            pageRange: '96 - 130'
          }
        ]
      }
    ];
  }

  // Generate the full 43 weeks
  let currentChapterIdx = 0;
  let currentTopicIdx = 0;

  return ACADEMIC_CALENDAR_WEEKS.map((calWeek, idx) => {
    const isExam = !!calWeek.isExam;
    const examType = calWeek.examType;

    if (isExam) {
      let examTitle = {
        om: 'Qormaata Walakkaa Semisteera 1ffaa',
        am: 'የወሰነ ትምህርት 1 አጋማሽ ፈተና',
        en: 'Semester 1 Midterm Examination'
      };
      let mainTopic = {
        om: 'Qormaata Walakkaa Semisteera 1ffaa fi Qabxii Galmeessuu',
        am: 'የወሰነ ትምህርት 1 አጋማሽ ፈተና መስጠትና ውጤት መመዝገብ',
        en: 'Semester 1 Midterm Examination & Score Recording'
      };

      if (examType === 'final1') {
        examTitle = {
          om: 'Qormaata Xumura Semisteera 1ffaa',
          am: 'የወሰነ ትምህርት 1 ማጠቃለያ ፈተና',
          en: 'Semester 1 Final Examination'
        };
        mainTopic = {
          om: 'Qormaata Xumura Semisteera 1ffaa fi Irra-deebii Boqonnaalee',
          am: 'የወሰነ ትምህርት 1 ማጠቃለያ ፈተናና የምዕራፎች ክለሳ',
          en: 'Semester 1 Final Examination & Course Review'
        };
      } else if (examType === 'break1') {
        examTitle = {
          om: 'Qulqulleessa Qabxii fi Boqonnaa Semisteera 1ffaa',
          am: 'የውጤት ማጠናቀሪያና የወሰነ ትምህርት 1 እረፍት',
          en: 'Semester 1 Grade Submission & Term Break'
        };
        mainTopic = {
          om: 'Qabxii Qormaata Semisteera 1ffaa Qindeessuu fi Barattootaaf Beellamuu',
          am: 'የወሰነ ትምህርት 1 ውጤት ማጠናቀርና ለተማሪዎች ማሳወቅ',
          en: 'Score Compilation, Remedial Feedback & Term 1 Wrap-up'
        };
      } else if (examType === 'midterm2') {
        examTitle = {
          om: 'Qormaata Walakkaa Semisteera 2ffaa',
          am: 'የወሰነ ትምህርት 2 አጋማሽ ፈተና',
          en: 'Semester 2 Midterm Examination'
        };
        mainTopic = {
          om: 'Qormaata Walakkaa Semisteera 2ffaa fi Madaallii Barattootaa',
          am: 'የወሰነ ትምህርት 2 አጋማሽ ፈተና መስጠት',
          en: 'Semester 2 Midterm Examination & Student Assessment'
        };
      } else if (examType === 'final2') {
        examTitle = {
          om: 'Qormaata Xumura Semisteera 2ffaa fi Bara Barnootaa',
          am: 'የወሰነ ትምህርት 2 እና የዓመቱ ማጠቃለያ ፈተና',
          en: 'Semester 2 & Annual Final Examination'
        };
        mainTopic = {
          om: 'Qormaata Xumura Semisteera 2ffaa fi Qormaata Moodeelaa',
          am: 'የወሰነ ትምህርት 2 ማጠቃለያ ፈተናና የሞዴል ፈተና',
          en: 'Semester 2 Final Comprehensive Examination'
        };
      } else if (examType === 'closing') {
        examTitle = {
          om: 'Qulqulleessa Qabxii, Ragaa Kennuu fi Cufiinsa Bara Barnootaa',
          am: 'የውጤት ማጠቃለያ፣ ካርድ ማደልና የትምህርት ዘመን ማጠቃለያ',
          en: 'Grade Compilation, Report Card Distribution & Year Closing'
        };
        mainTopic = {
          om: 'Qulqulleessa Qabxii Waggaa, Kaardii Raabsuu fi Sirna Cufiinsaa',
          am: 'የዓመቱ ውጤት ማጠናቀር፣ ካርድ ማደልና የትምህርት ዘመን መዝጊያ ሥነ-ሥርዓት',
          en: 'Final Grade Tabulation, Report Card Day & Academic Year Closing'
        };
      }

      return {
        id: `week-${calWeek.week}-${calWeek.semester}`,
        semester: calWeek.semester,
        monthIndex: calWeek.monthIndex,
        weekNumber: ((calWeek.week - 1) % 4) + 1,
        dateRange: calWeek.dateRange,
        pages: 'Exam / Evaluation',
        chapterNumber: 0,
        isExamWeek: true,
        isPlanned: calWeek.week <= 4, // Default first 4 weeks planned
        examTitle,
        monthName: calWeek.month,
        chapter: {
          om: examTitle.om,
          am: examTitle.am,
          en: examTitle.en
        },
        mainTopic,
        generalObjectives: {
          om: 'Madaallii barattootaa gaggeessuu fi hubannoo isaanii mirkaneeffachuu.',
          am: 'የተማሪዎችን እውቀትና ክህሎት መመዘን።',
          en: 'Assess student learning mastery, competencies, and curriculum outcomes.'
        },
        priorKnowledge: {
          om: 'Barnoota torbanneen darban keessatti baratame hunda.',
          am: 'በሳምንታቱ የተማሩት ትምህርት በሙሉ።',
          en: 'All syllabus topics taught leading up to this examination milestone.'
        },
        lessonOutcome: {
          om: 'Barattoonni bu\'aa qormaataa fi sadarkaa isaanii beeku.',
          am: 'ተማሪዎች የፈተና ውጤታቸውንና ደረጃቸውን ያውቃሉ።',
          en: 'Evaluate performance analytics and identify areas for reinforcement.'
        },
        teachingMethod: {
          om: 'Qormaata qopheessuu, qoruu fi qabxii sirreessuu.',
          am: 'ፈተና ማዘጋጀት፣ መፈተንና ውጤት ማረም።',
          en: 'Exam administration, invigilation, scoring, and standardized evaluation.'
        },
        teachingAids: {
          om: 'Waraqaa qormaataa, foomii galmee qabxii.',
          am: 'የፈተና ወረቀት፣ የውጤት መመዝገቢያ ፎርም።',
          en: 'Standardized exam papers, rubric evaluation sheets, score sheets.'
        },
        assessment: {
          om: 'Qabxii qormaataa fi madaallii walitti fufaa.',
          am: 'የፈተና ውጤትና ተከታታይ ምዘና።',
          en: 'Summative exam scoring, grade tabulation.'
        }
      };
    }

    // Regular instruction week
    const currentOutline = outlines[currentChapterIdx % outlines.length];
    const currentTopic = currentOutline.topics[currentTopicIdx % currentOutline.topics.length];

    // Increment topic/chapter progression
    currentTopicIdx++;
    if (currentTopicIdx >= currentOutline.topics.length) {
      currentTopicIdx = 0;
      currentChapterIdx++;
    }

    return {
      id: `week-${calWeek.week}-${calWeek.semester}`,
      semester: calWeek.semester,
      monthIndex: calWeek.monthIndex,
      weekNumber: ((calWeek.week - 1) % 4) + 1,
      dateRange: calWeek.dateRange,
      pages: currentTopic.pageRange,
      studentBookPages: currentTopic.pageRange,
      studentBookTitle: {
        om: `Kitaaba Barataa Fuula ${currentTopic.pageRange}`,
        am: `የተማሪ መጽሐፍ ገጽ ${currentTopic.pageRange}`,
        en: `Student Textbook pp. ${currentTopic.pageRange}`
      },
      studentBookExercises: {
        om: `Gilgaala Boqonnaa ${currentOutline.chapterNumber} (Fuula ${currentTopic.pageRange})`,
        am: `ምዕራፍ ${currentOutline.chapterNumber} መልመጃዎች (ገጽ ${currentTopic.pageRange})`,
        en: `Unit ${currentOutline.chapterNumber} Exercises (pp. ${currentTopic.pageRange})`
      },
      teacherGuidePages: `TG ${Math.max(1, currentOutline.chapterNumber * 12 - 6)} - ${currentOutline.chapterNumber * 12 + 8}`,
      teacherGuidePedagogy: {
        om: 'Sadarkaa 5ffaa MoE: 1) Seensa (Daq. 5); 2) Ibsa Barsiisaa (Daq. 15); 3) Shaakala Garee (Daq. 10); 4) Dalagaa Dhuunfaa (Daq. 10); 5) Xumura fi Hojii Manaa (Daq. 5).',
        am: 'የኢ.ፌ.ዲ.ሪ 5 ደረጃዎች፡ 1) መግቢያ (5 ደ.)፤ 2) ገለፃ (15 ደ.)፤ 3) የቡድን ልምምድ (10 ደ.)፤ 4) የግል ሥራ (10 ደ.)፤ 5) ማጠቃለያና የቤት ሥራ (5 ደ.)።',
        en: 'MoE 5-Phase Model: 1) Activation (5m); 2) Direct Instruction (15m); 3) Guided Practice (10m); 4) Independent Work (10m); 5) Wrap-up & Homework (5m).'
      },
      minimumLearningCompetency: currentTopic.objectives,
      differentiationSupport: {
        om: 'Barattoota deeggarsa dabalataa barbaadaniif fakkii fi meeshaalee qabatamaa fayyadamaa.',
        am: 'ተጨማሪ ድጋፍ ለሚሹ ተማሪዎች ተጨባጭ ቁሳቁሶችን በማቅረብ በቡድን እንዲሰሩ ያግዙ።',
        en: 'Provide concrete visual aids and peer tutoring for diverse learners.'
      },
      chapterNumber: currentOutline.chapterNumber,
      isExamWeek: false,
      isPlanned: calWeek.week <= 4, // Default first 4 weeks planned
      monthName: calWeek.month,
      chapter: currentOutline.chapter,
      mainTopic: currentTopic.title,
      generalObjectives: currentTopic.objectives,
      priorKnowledge: currentTopic.priorKnowledge,
      lessonOutcome: currentTopic.outcome,
      teachingMethod: currentTopic.method,
      teachingAids: currentTopic.aids,
      assessment: currentTopic.assessment
    };
  });
}

// Initial Pre-Seeded Default Courses
export const DEFAULT_INITIAL_COURSES: Course[] = [
  {
    id: 'g5-math',
    grade: '5',
    gradeName: { om: 'Kutaa 5ffaa', am: '5ኛ ክፍል', en: 'Grade 5' },
    section: 'A & B',
    subjectKey: 'math',
    subjectName: { om: 'Herrega (Mathematics)', am: 'ሒሳብ (Mathematics)', en: 'Mathematics' },
    color: 'indigo',
    schoolInfo: initialSchoolInfo,
    createdAt: '2024-09-01T00:00:00.000Z'
  },
  {
    id: 'g5-env-sci',
    grade: '5',
    gradeName: { om: 'Kutaa 5ffaa', am: '5ኛ ክፍል', en: 'Grade 5' },
    section: 'A & B',
    subjectKey: 'env_science',
    subjectName: { om: 'Saayinsii Naannoo', am: 'የአካባቢ ሳይንስ (Environmental Science)', en: 'Environmental Science' },
    color: 'emerald',
    schoolInfo: {
      ...initialSchoolInfo,
      subject: { om: 'Saayinsii Naannoo', am: 'የአካባቢ ሳይንስ (Environmental Science)', en: 'Environmental Science' },
      weeklyPeriods: '4',
      annualPeriods: '172'
    },
    createdAt: '2024-09-01T00:00:00.000Z'
  },
  {
    id: 'g6-math',
    grade: '6',
    gradeName: { om: 'Kutaa 6ffaa', am: '6ኛ ክፍል', en: 'Grade 6' },
    section: 'A & B',
    subjectKey: 'math',
    subjectName: { om: 'Herrega (Mathematics)', am: 'ሒሳብ (Mathematics)', en: 'Mathematics' },
    color: 'blue',
    schoolInfo: {
      ...initialSchoolInfo,
      gradeAndSection: { om: 'Kutaa 6ffaa A & B', am: '6ኛ ክፍል ሀ እና ለ', en: 'Grade 6 A & B' },
      weeklyPeriods: '5',
      annualPeriods: '215'
    },
    createdAt: '2024-09-01T00:00:00.000Z'
  }
];
