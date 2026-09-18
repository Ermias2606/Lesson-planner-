import { Language } from '../types';

export interface TextbookExercise {
  id: string;
  name: { om: string; am: string; en: string };
  pages: string;
  recommendedProblems: { om: string; am: string; en: string };
  homeworkSuggestion: { om: string; am: string; en: string };
}

export interface TextbookUnit {
  unitNumber: number;
  title: { om: string; am: string; en: string };
  studentPages: string; // e.g. "1 - 34"
  teacherGuidePages: string; // e.g. "10 - 32"
  keyCompetencies: { om: string; am: string; en: string };
  teacherGuideMethod: { om: string; am: string; en: string };
  commonMisconceptions: { om: string; am: string; en: string };
  inclusiveTips: { om: string; am: string; en: string };
  exercises: TextbookExercise[];
}

export interface IntegratedCourseBook {
  subjectKey: string;
  grade: string;
  studentBook: {
    title: { om: string; am: string; en: string };
    publisher: { om: string; am: string; en: string };
    edition: string;
    coverColor: string;
    totalPages: number;
  };
  teacherGuide: {
    title: { om: string; am: string; en: string };
    edition: string;
    totalPages: number;
    standardPeriodDuration: string;
  };
  units: TextbookUnit[];
}

export const TEXTBOOK_LIBRARY: IntegratedCourseBook[] = [
  // ================= GRADE 5 MATHEMATICS =================
  {
    subjectKey: 'math',
    grade: '5',
    studentBook: {
      title: {
        om: 'Herrega: Kitaaba Barattootaa Kutaa 5 (Biiroo Barnootaa Oromiyaa, 2014/2022)',
        am: 'ሒሳብ፡ የተማሪ መጽሐፍ 5ኛ ክፍል (ኦሮሚያ ትምህርት ቢሮ 2014/2022)',
        en: 'Mathematics Student Textbook Grade 5 (Oromia Education Bureau 2014/2022)'
      },
      publisher: {
        om: 'Biiroo Barnootaa Oromiyaafi Kolleejjii Barnoota Barsiisotaa Asallaatiin',
        am: 'የኦሮሚያ ትምህርት ቢሮ እና የአሰላ መምህራን ትምህርት ኮሌጅ',
        en: 'Oromia Education Bureau & Asella College of Teacher Education'
      },
      edition: 'Bara 2014/2022 A.L.I (2016 Ethiopian Curriculum Framework)',
      coverColor: 'red',
      totalPages: 164
    },
    teacherGuide: {
      title: {
        om: 'Qajeelcha Barsiisaa Herregaa Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል ሒሳብ የመምህሩ መምሪያ',
        en: 'Grade 5 Mathematics Teacher\'s Guide'
      },
      edition: 'Bara 2014/2022 / 2016 E.C. Curriculum',
      totalPages: 164,
      standardPeriodDuration: 'Daqiiqaa 45 (45 minutes)'
    },
    units: [
      {
        unitNumber: 1,
        title: {
          om: 'Boqonnaa 1: Jijjiiramootaan Hojjechuu',
          am: 'ምዕራፍ 1፡ በተለዋዋጮች መሥራት',
          en: 'Unit 1: Working with Variables'
        },
        studentPages: '1 - 17',
        teacherGuidePages: '1 - 18',
        keyCompetencies: {
          om: 'Fayidaa jijjiiramootaa beekuu, tarmootaafi ibsamoota aljebraa salphiisuu, himoota walqixaa sararaawaa bakka buusuun furuu.',
          am: 'የተለዋዋጮችን ጥቅም ማወቅ፣ የአልጀብራ አባባሎችን ማቅለል፣ ቀጥተኛ እኩልታዎችን በምትክ መፍታት።',
          en: 'Identify variables and terms, simplify algebraic expressions, and solve linear equations.'
        },
        teacherGuideMethod: {
          om: '5m Gocha seensaa (Paatarnii lakkoofsaa); 15m Fakkeenya madaala hangaa; 15m Hojii garee; 5m Gilgaala; 5m Xumura.',
          am: '5ደ የመግቢያ ተግባር፤ 15ደ የክብደት ሚዛን ምሳሌዎች፤ 15ደ የቡድን ሥራ፤ 5ደ መልመጃ፤ 5ደ ማጠቃለያ።',
          en: '5m Warmup with number patterns; 15m Balance scale modeling; 15m Group linear equation solving; 5m Practice; 5m Assessment.'
        },
        commonMisconceptions: {
          om: 'Tarmoota walfakkaataniifi hin fakkaanne walitti makuu (fkn 2x + 3 = 5x jechuu).',
          am: 'ተመሳሳይና የተለያዩ አባባሎችን በአንድ ላይ መደመር (ለምሳሌ 2x + 3 = 5x ማለት)።',
          en: 'Adding unlike terms together (e.g. treating 2x + 3 as 5x).'
        },
        inclusiveTips: {
          om: 'Madaala hangaa qabatamaa (balance scale) fi kaartaa fayyadamaa.',
          am: 'ተጨባጭ የሚዛን እቃዎችን እና ካርዶችን ይጠቀሙ።',
          en: 'Use physical balance scales and algebra tiles for visual grounding.'
        },
        exercises: [
          {
            id: 'ex-1-1',
            name: {
              om: 'Gilgaala 1.1: Guddina Paatarnootaa',
              am: 'መልመጃ 1.1፡ የቁጥር ስርዓተ-ንድፍ',
              en: 'Exercise 1.1: Number Patterns'
            },
            pages: '3',
            recommendedProblems: { om: 'Gaaffilee 1 - 2', am: 'ጥያቄ 1 - 2', en: 'Questions 1 - 2' },
            homeworkSuggestion: { om: 'Gaaffii 2', am: 'ጥያቄ 2', en: 'Problem 2' }
          },
          {
            id: 'ex-1-3',
            name: {
              om: 'Gilgaala 1.3: Tarmootaafi Maxxantoota',
              am: 'መልመጃ 1.3፡ አባባሎችና ቅጥያዎች',
              en: 'Exercise 1.3: Terms and Coefficients'
            },
            pages: '7',
            recommendedProblems: { om: 'Gaaffilee 1a - f', am: 'ጥያቄ 1ሀ - ረ', en: 'Questions 1a - f' },
            homeworkSuggestion: { om: 'Gaaffii 2', am: 'ጥያቄ 2', en: 'Question 2' }
          },
          {
            id: 'ex-1-4',
            name: {
              om: 'Gilgaala 1.4: Ibsamoota Aljebraa Salphisuu',
              am: 'መልመጃ 1.4፡ የአልጀብራ አባባሎችን ማቅለል',
              en: 'Exercise 1.4: Simplifying Algebraic Expressions'
            },
            pages: '9',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2a-b', am: 'ጥያቄ 1 እና 2ሀ-ለ', en: 'Questions 1 & 2a-b' },
            homeworkSuggestion: { om: 'Gaaffii 2b', am: 'ጥያቄ 2ለ', en: 'Question 2b' }
          },
          {
            id: 'ex-1-6',
            name: {
              om: 'Gilgaala 1.6: Himoota Walqixaa Furuu',
              am: 'መልመጃ 1.6፡ ቀጥተኛ እኩልታዎችን መፍታት',
              en: 'Exercise 1.6: Solving Linear Equations'
            },
            pages: '13',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 5', am: 'ጥያቄ 1 እስከ 5', en: 'Questions 1 to 5' },
            homeworkSuggestion: { om: 'Gaaffii 4 fi 5', am: 'ጥያቄ 4 እና 5', en: 'Questions 4 & 5' }
          },
          {
            id: 'ex-1-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 1',
              am: 'የምዕራፍ 1 ማጠቃለያ መልመጃ',
              en: 'Chapter 1 Review Exercise'
            },
            pages: '16 - 17',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 6', am: 'ጥያቄ 1 እስከ 6', en: 'Questions 1 to 6' },
            homeworkSuggestion: { om: 'Gaaffii 5 fi 6', am: 'ጥያቄ 5 እና 6', en: 'Questions 5 & 6' }
          }
        ]
      },
      {
        unitNumber: 2,
        title: {
          om: 'Boqonnaa 2: Firaakshinoota',
          am: 'ምዕራፍ 2፡ ክፍልፋዮች',
          en: 'Unit 2: Fractions'
        },
        studentPages: '18 - 38',
        teacherGuidePages: '19 - 42',
        keyCompetencies: {
          om: 'Akaakuu firaakshinootaa (sirrii, sirrii hintaane, makaa), firaakshinoota walgitan, qoyyaboota bu\'uuraa afran (ida\'uu, hir\'isuu, baay\'isuu, hiruu).',
          am: 'የክፍልፋይ አይነቶች (ትክክለኛ፣ ኢ-ትክክለኛ፣ ድብልቅ)፣ አቻ ክፍልፋዮች እና አራቱ መሰረታዊ ስሌቶች።',
          en: 'Classify proper, improper, mixed and equivalent fractions; perform addition, subtraction, multiplication, division.'
        },
        teacherGuideMethod: {
          om: 'Danaa mummuramaa waraqaatti fayyadamuun firaakshinii ibsuu; KLG fayyadamuun waamsisaa walfakkeessuu.',
          am: 'የተቆራረጡ የወረቀት ምስሎችን መጠቀም፤ የጋራ አካፋይ (ታ.ጋ.ብ) በመፈለግ ማባዛትና መደመር።',
          en: 'Concrete paper folding and shading models for fraction operations.'
        },
        commonMisconceptions: {
          om: 'Waamsisaa walitti ida\'uu (fkn 1/4 + 2/4 = 3/8 jechuu).',
          am: 'የክፍልፋዮች ታህትን (denominators) አንድ ላይ መደመር።',
          en: 'Adding denominators together when adding fractions.'
        },
        inclusiveTips: {
          om: 'Danaa 2.1 - 2.18 kitaaba barataarra jiran fayyadamaa.',
          am: 'በመጽሐፉ ውስጥ ያሉትን ምስላዊ መግለጫዎች ይጠቀሙ።',
          en: 'Rely on visual circle and bar models from Figures 2.1 to 2.18.'
        },
        exercises: [
          {
            id: 'ex-2-1',
            name: {
              om: 'Gilgaala 2.1: Akaakuu Firaakshinootaa',
              am: 'መልመጃ 2.1፡ የክፍልፋይ አይነቶች',
              en: 'Exercise 2.1: Types of Fractions'
            },
            pages: '21',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 2 fi 3', am: 'ጥያቄ 2 እና 3', en: 'Questions 2 & 3' }
          },
          {
            id: 'ex-2-2',
            name: {
              om: 'Gilgaala 2.2: Firaakshinoota Walgitan',
              am: 'መልመጃ 2.2፡ አቻ ክፍልፋዮች',
              en: 'Exercise 2.2: Equivalent Fractions'
            },
            pages: '26',
            recommendedProblems: { om: 'Gaaffilee 1 - 4', am: 'ጥያቄ 1 - 4', en: 'Questions 1 - 4' },
            homeworkSuggestion: { om: 'Gaaffii 3', am: 'ጥያቄ 3', en: 'Question 3' }
          },
          {
            id: 'ex-2-3',
            name: {
              om: 'Gilgaala 2.3: Firaakshinoota Ida\'uu',
              am: 'መልመጃ 2.3፡ ክፍልፋዮችን መደመር',
              en: 'Exercise 2.3: Adding Fractions'
            },
            pages: '28',
            recommendedProblems: { om: 'Gaaffilee a hanga h', am: 'ጥያቄዎች ሀ እስከ ሸ', en: 'Questions a to h' },
            homeworkSuggestion: { om: 'Gaaffilee e - h', am: 'ጥያቄዎች ሠ - ሸ', en: 'Questions e - h' }
          },
          {
            id: 'ex-2-4',
            name: {
              om: 'Gilgaala 2.4: Firaakshinoota Hir\'isuu',
              am: 'መልመጃ 2.4፡ ክፍልፋዮችን መቀነስ',
              en: 'Exercise 2.4: Subtracting Fractions'
            },
            pages: '30',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 2c - h', am: 'ጥያቄ 2ሐ - ሸ', en: 'Questions 2c - h' }
          },
          {
            id: 'ex-2-5',
            name: {
              om: 'Gilgaala 2.5: Firaakshinoota Baay\'isuu',
              am: 'መልመጃ 2.5፡ ክፍልፋዮችን ማባዛት',
              en: 'Exercise 2.5: Multiplying Fractions'
            },
            pages: '33',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2', am: 'ጥያቄ 1 እና 2', en: 'Questions 1 & 2' },
            homeworkSuggestion: { om: 'Gaaffii 2e - h', am: 'ጥያቄ 2ሠ - ሸ', en: 'Questions 2e - h' }
          },
          {
            id: 'ex-2-6',
            name: {
              om: 'Gilgaala 2.6: Firaakshinoota Hiruu',
              am: 'መልመጃ 2.6፡ ክፍልፋዮችን ማካፈል',
              en: 'Exercise 2.6: Dividing Fractions'
            },
            pages: '35',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2', am: 'ጥያቄ 1 እና 2', en: 'Questions 1 & 2' },
            homeworkSuggestion: { om: 'Gaaffii 2e - h', am: 'ጥያቄ 2ሠ - ሸ', en: 'Questions 2e - h' }
          },
          {
            id: 'ex-2-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 2',
              am: 'የምዕራፍ 2 ማጠቃለያ መልመጃ',
              en: 'Chapter 2 Review Exercise'
            },
            pages: '37 - 38',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 11', am: 'ጥያቄ 1 እስከ 11', en: 'Questions 1 to 11' },
            homeworkSuggestion: { om: 'Gaaffii 9, 10, 11', am: 'ጥያቄ 9፣ 10፣ 11', en: 'Questions 9, 10, 11' }
          }
        ]
      },
      {
        unitNumber: 3,
        title: {
          om: 'Boqonnaa 3: Deesimaalota',
          am: 'ምዕራፍ 3፡ አስርዮሾች',
          en: 'Unit 3: Decimals'
        },
        studentPages: '39 - 55',
        teacherGuidePages: '43 - 62',
        keyCompetencies: {
          om: 'Kurnaffaafi dhibbaffaa, sarara lakkoofsaa irratti agarsiisuu, ida\'uu, hir\'isuu, baay\'isuu, hiruu fi gara firaakshiniitti jijjiiruu.',
          am: 'የአስረኛና የመቶኛ ቦታ ዋጋ፣ በቁጥር መስመር ማሳየት፣ አራቱ ስሌቶችና ወደ ክፍልፋይ መለወጥ።',
          en: 'Understand tenths and hundredths place value, number line representation, arithmetic operations and conversions.'
        },
        teacherGuideMethod: {
          om: 'Gabatee gatii bakkaa (place value chart) fi qarshii/saantima qabatamaatti fayyadamaa.',
          am: 'የቦታ ዋጋ ሰንጠረዥን እና ገንዘብን (ብር/ሳንቲም) በምሳሌነት መጠቀም።',
          en: 'Use currency (Birr and Santim) and place value charts for decimal operations.'
        },
        commonMisconceptions: {
          om: 'Tuqaa deesimaalii wal-bira qabuu dhiisuu (fkn 1.5 + 0.29 irratti tuqaa sirriitti toora qabsiisuu dhabuu).',
          am: 'የአስርዮሽ ነጥብን በተገቢው ረድፍ ሳያስተካክሉ መደመር።',
          en: 'Misaligning decimal points during vertical addition or subtraction.'
        },
        inclusiveTips: {
          om: 'Waraqaa giraafii 100 qabu fayyadamaa (Danaa 3.1 & 3.2).',
          am: 'የ100 ካሬ ግራፍ ወረቀት በመጠቀም ማሳየት።',
          en: 'Use 100-grid base-ten visual charts for place value support.'
        },
        exercises: [
          {
            id: 'ex-3-1',
            name: {
              om: 'Gilgaala 3.1: Gatii Bakkaa Deesimaalotaa',
              am: 'መልመጃ 3.1፡ የአስርዮሽ ቦታ ዋጋ',
              en: 'Exercise 3.1: Decimal Place Value'
            },
            pages: '42',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 2 fi 3', am: 'ጥያቄ 2 እና 3', en: 'Questions 2 & 3' }
          },
          {
            id: 'ex-3-3',
            name: {
              om: 'Gilgaala 3.3: Deesimaalota Ida\'uu',
              am: 'መልመጃ 3.3፡ አስርዮሾችን መደመር',
              en: 'Exercise 3.3: Adding Decimals'
            },
            pages: '45',
            recommendedProblems: { om: 'Gaaffilee 1a - h', am: 'ጥያቄ 1ሀ - ሸ', en: 'Questions 1a - h' },
            homeworkSuggestion: { om: 'Gaaffii 1e - h', am: 'ጥያቄ 1ሠ - ሸ', en: 'Questions 1e - h' }
          },
          {
            id: 'ex-3-7',
            name: {
              om: 'Gilgaala 3.7: Deesimaalota Baay\'isuu',
              am: 'መልመጃ 3.7፡ አስርዮሾችን ማባዛት',
              en: 'Exercise 3.7: Multiplying Decimals'
            },
            pages: '50',
            recommendedProblems: { om: 'Gaaffilee a hanga h', am: 'ጥያቄዎች ሀ እስከ ሸ', en: 'Questions a to h' },
            homeworkSuggestion: { om: 'Gaaffilee e - h', am: 'ጥያቄዎች ሠ - ሸ', en: 'Questions e - h' }
          },
          {
            id: 'ex-3-8',
            name: {
              om: 'Gilgaala 3.8: Deesimaalota Hiruu',
              am: 'መልመጃ 3.8፡ አስርዮሾችን ማካፈል',
              en: 'Exercise 3.8: Dividing Decimals'
            },
            pages: '51',
            recommendedProblems: { om: 'Gaaffilee a hanga h', am: 'ጥያቄዎች ሀ እስከ ሸ', en: 'Questions a to h' },
            homeworkSuggestion: { om: 'Gaaffilee e - h', am: 'ጥያቄዎች ሠ - ሸ', en: 'Questions e - h' }
          },
          {
            id: 'ex-3-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 3',
              am: 'የምዕራፍ 3 ማጠቃለያ መልመጃ',
              en: 'Chapter 3 Review Exercise'
            },
            pages: '55',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 7', am: 'ጥያቄ 1 እስከ 7', en: 'Questions 1 to 7' },
            homeworkSuggestion: { om: 'Gaaffii 4, 5, 6, 7', am: 'ጥያቄ 4፣ 5፣ 6፣ 7', en: 'Questions 4 - 7' }
          }
        ]
      },
      {
        unitNumber: 4,
        title: {
          om: 'Boqonnaa 4: Dhibbantaa',
          am: 'ምዕራፍ 4፡ ፐርሰንት (መቶኛ)',
          en: 'Unit 4: Percentages'
        },
        studentPages: '56 - 73',
        teacherGuidePages: '63 - 82',
        keyCompetencies: {
          om: 'Yaad-rimee dhibbantaa (%), firaakshinii fi deesimaalii gara dhibbantaatti jijjiiruu, dabalataafi gad-bu\'aa dhibbantaa, dhala baaqqee (I = P × R × T).',
          am: 'የመቶኛ (%) ጽንሰ-ሀሳብ፣ ወደ ክፍልፋይና አስርዮሽ መለወጥ፣ ጭማሪና ቅናሽ፣ ቀላል ወለድ (I = P × R × T)።',
          en: 'Master percentage concept, conversions with fractions and decimals, percentage increase/decrease, simple interest.'
        },
        teacherGuideMethod: {
          om: 'Gabaa fi herrega baankii (taaksii gurgurtaa, dhala baaqqee) fakkeenya jiruuf jireenyaatiin barsiisaa.',
          am: 'የግብይትና የባንክ ምሳሌዎችን (የሽያጭ ታክስ፣ ቀላል ወለድ) በመጠቀም ማስተማር።',
          en: 'Real-world consumer math context (sales tax, simple interest, shop discounts).'
        },
        commonMisconceptions: {
          om: 'Mallattoo % irraanfachuu fi 100tiin baay\'isuu yookiin hiruu wal-jijjiiruu.',
          am: 'የመቶኛ ምልክትን መርሳትና በ100 ማባዛትና ማካፈልን ማምታታት።',
          en: 'Forgetting to divide by 100 when calculating percentage quantities.'
        },
        inclusiveTips: {
          om: 'Danaa 4.1 irratti gabatee 100 fayyadamaa.',
          am: 'በመጽሐፉ ገጽ 57 ያለውን የ100 ካሬ ሰንጠረዥ በምስል ማሳየት።',
          en: 'Use 100-grid percentage visual models from Figure 4.1.'
        },
        exercises: [
          {
            id: 'ex-4-1',
            name: {
              om: 'Gilgaala 4.1: Gartokkee Guutuu akka Dhibbantaatti',
              am: 'መልመጃ 4.1፡ ክፍልፋይን እንደ መቶኛ መግለጽ',
              en: 'Exercise 4.1: Parts of a Whole as Percentages'
            },
            pages: '60 - 61',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 7', am: 'ጥያቄ 1 እስከ 7', en: 'Questions 1 to 7' },
            homeworkSuggestion: { om: 'Gaaffii 3 fi 7', am: 'ጥያቄ 3 እና 7', en: 'Questions 3 & 7' }
          },
          {
            id: 'ex-4-2',
            name: {
              om: 'Gilgaala 4.2: Pirobileemota Dhibbantaa',
              am: 'መልመጃ 4.2፡ የመቶኛ የሂሳብ ችግሮች',
              en: 'Exercise 4.2: Percentage Word Problems'
            },
            pages: '64',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 5', am: 'ጥያቄ 1 እስከ 5', en: 'Questions 1 to 5' },
            homeworkSuggestion: { om: 'Gaaffii 4 fi 5', am: 'ጥያቄ 4 እና 5', en: 'Questions 4 & 5' }
          },
          {
            id: 'ex-4-4',
            name: {
              om: 'Gilgaala 4.4: Dhala Baaqqee fi Hojiirra Oolmaa',
              am: 'መልመጃ 4.4፡ ቀላል ወለድና አተገባበር',
              en: 'Exercise 4.4: Simple Interest & Real Applications'
            },
            pages: '71',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 5', am: 'ጥያቄ 1 እስከ 5', en: 'Questions 1 to 5' },
            homeworkSuggestion: { om: 'Gaaffii 4 fi 5', am: 'ጥያቄ 4 እና 5', en: 'Questions 4 & 5' }
          },
          {
            id: 'ex-4-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 4',
              am: 'የምዕራፍ 4 ማጠቃለያ መልመጃ',
              en: 'Chapter 4 Review Exercise'
            },
            pages: '73',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 6', am: 'ጥያቄ 1 እስከ 6', en: 'Questions 1 to 6' },
            homeworkSuggestion: { om: 'Gaaffii 3, 4, 6', am: 'ጥያቄ 3፣ 4፣ 6', en: 'Questions 3, 4, 6' }
          }
        ]
      },
      {
        unitNumber: 5,
        title: {
          om: 'Boqonnaa 5: Safara Bal\'inaafi Qabee',
          am: 'ምዕራፍ 5፡ የስፋት እና ይዘት (Volume) መለካት',
          en: 'Unit 5: Measurement of Area and Volume'
        },
        studentPages: '74 - 97',
        teacherGuidePages: '83 - 106',
        keyCompetencies: {
          om: 'Bal\'ina dirraa (cm², m², hektaara), qabee wantootaa (cm³, m³, liitira), jijjiirraa yuunitootaa, fi qabee kiyuubiifi piriizimii (V = l × w × h).',
          am: 'የገጽታ ስፋት (ሳ.ሜ²፣ ሜ²፣ ሄክታር)፣ ይዘት (ሳ.ሜ³፣ ሜ³፣ ሊትር)፣ የአሃድ ልውውጥ እና የኩብና ፕሪዝም ይዘት።',
          en: 'Measure surface area (cm², m², ha) and volume (cm³, m³, L); convert units; calculate cube and rectangular prism volume.'
        },
        teacherGuideMethod: {
          om: 'Waraqaa iskuweerii fi kiyuubbota 1cm³ qabatamaatti fayyadamuun qabee safaraa.',
          am: 'የካሬ ወረቀቶችን እና 1ሳ.ሜ³ ኩቦችን በመጠቀም ስፋትና ይዘትን በተግባር ማስላት።',
          en: 'Hands-on unit cube stacking and grid counting.'
        },
        commonMisconceptions: {
          om: 'Yuunitii bal\'inaa (m²) fi yuunitii qabee (m³) walitti makuu.',
          am: 'የስፋት (ሜ²) እና የይዘት (ሜ³) አሃዶችን ማምታታት።',
          en: 'Confusing square units (area) with cubic units (volume).'
        },
        inclusiveTips: {
          om: 'Sanduuqa fi kiyuubbota dhugaa dareetti fiduun akka qaqqabatanii ilaalan gochuu.',
          am: 'ተጨባጭ ሳጥኖችንና ኩቦችን ክፍል ውስጥ በማምጣት ማሳየት።',
          en: 'Bring real boxes and measuring containers into classroom.'
        },
        exercises: [
          {
            id: 'ex-5-1',
            name: {
              om: 'Gilgaala 5.1: Muraa Iskuweeriin Bal\'ina Safaruu',
              am: 'መልመጃ 5.1፡ በካሬ ቁርጥራጭ ስፋት መለካት',
              en: 'Exercise 5.1: Area by Unit Squares'
            },
            pages: '79',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 2 fi 3', am: 'ጥያቄ 2 እና 3', en: 'Questions 2 & 3' }
          },
          {
            id: 'ex-5-2',
            name: {
              om: 'Gilgaala 5.2: Bal\'ina cm², m² fi Hektaaraan',
              am: 'መልመጃ 5.2፡ ስፋት በሳ.ሜ²፣ ሜ² እና ሄክታር',
              en: 'Exercise 5.2: Area in cm², m², and Hectares'
            },
            pages: '82 - 83',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 11', am: 'ጥያቄ 1 እስከ 11', en: 'Questions 1 to 11' },
            homeworkSuggestion: { om: 'Gaaffii 5, 8, 11', am: 'ጥያቄ 5፣ 8፣ 11', en: 'Questions 5, 8, 11' }
          },
          {
            id: 'ex-5-3',
            name: {
              om: 'Gilgaala 5.3: Qabee cm³, m³ fi Liitiriin',
              am: 'መልመጃ 5.3፡ ይዘት በሳ.ሜ³፣ ሜ³ እና ሊትር',
              en: 'Exercise 5.3: Volume in cm³, m³, and Liters'
            },
            pages: '87',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 3', am: 'ጥያቄ 3', en: 'Question 3' }
          },
          {
            id: 'ex-5-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 5',
              am: 'የምዕራፍ 5 ማጠቃለያ መልመጃ',
              en: 'Chapter 5 Review Exercise'
            },
            pages: '97',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 10', am: 'ጥያቄ 1 እስከ 10', en: 'Questions 1 to 10' },
            homeworkSuggestion: { om: 'Gaaffii 5, 8, 9, 10', am: 'ጥያቄ 5፣ 8፣ 9፣ 10', en: 'Questions 5, 8, 9, 10' }
          }
        ]
      },
      {
        unitNumber: 6,
        title: {
          om: 'Boqonnaa 6: Qabannaa Daataa',
          am: 'ምዕራፍ 6፡ የመረጃ አያያዝ (Data Handling)',
          en: 'Unit 6: Data Handling'
        },
        studentPages: '98 - 113',
        teacherGuidePages: '107 - 124',
        keyCompetencies: {
          om: 'Daataa funaanuu, gabatee deddeebi\'iinsaa, giraafota dhaabbataafi sararaa ijaaruufi hiikuu, gatii giddu-galaa (mean), yaalii carraa ta\'umsaa (dinaara fi daayii).',
          am: 'መረጃ መሰብሰብ፣ የድግግሞሽ ሰንጠረዥ፣ የባርና መስመር ግራፍ መስራትና ማንበብ፣ አማካይ ዋጋ፣ የዕድል ሙከራ (ሳንቲምና ዳይስ)።',
          en: 'Collect data, frequency tables, construct/interpret bar and line graphs, calculate mean, simple probability.'
        },
        teacherGuideMethod: {
          om: 'Barattootaan qabxii battallee fi umrii isaaniitiin giraafii ijaarisaa; dinaara darbachuun yaalii hojjedhaa.',
          am: 'የተማሪዎችን ዕድሜና ውጤት በመጠቀም ግራፍ እንዲያዘጋጁ ማድረግ፤ ሳንቲም በመወርወር የዕድል ሙከራ ማሳየት።',
          en: 'Real student class data for graph construction; coin toss and dice roll experiments.'
        },
        commonMisconceptions: {
          om: 'Sarara olee (y-axis) fi dalgee (x-axis) walitti makuu; gatii giddu galaa shallaguuf baay\'ina lakkoofsotaatiin hiruu irraanfachuu.',
          am: 'አግድም እና ቀጥታ ዘንግን ማምታታት፤ አማካይ ሲሰላ ለቁጥሮቹ ብዛት ማካፈልን መርሳት።',
          en: 'Forgetting to divide sum by total count when finding mean.'
        },
        inclusiveTips: {
          om: 'Halluulee garagaraa giraafiidhaaf fayyadamaa.',
          am: 'የተለያዩ ቀለማት ያላቸውን መስመሮች ለግራፍ መጠቀም።',
          en: 'Use color-coded columns and tactile coin manipulative.'
        },
        exercises: [
          {
            id: 'ex-6-1',
            name: {
              om: 'Gilgaala 6.1: Daataa Dheedhii fi Gabatee Deddeebi\'iinsaa',
              am: 'መልመጃ 6.1፡ ያልተዘጋጀ መረጃ እና የድግግሞሽ ሰንጠረዥ',
              en: 'Exercise 6.1: Raw Data & Frequency Tables'
            },
            pages: '100',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2', am: 'ጥያቄ 1 እና 2', en: 'Questions 1 & 2' },
            homeworkSuggestion: { om: 'Gaaffii 2', am: 'ጥያቄ 2', en: 'Question 2' }
          },
          {
            id: 'ex-6-2',
            name: {
              om: 'Gilgaala 6.2: Giraafii Dhaabbataafi Sararaa',
              am: 'መልመጃ 6.2፡ የባር እና የመስመር ግራፍ',
              en: 'Exercise 6.2: Bar and Line Graphs'
            },
            pages: '105',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2', am: 'ጥያቄ 1 እና 2', en: 'Questions 1 & 2' },
            homeworkSuggestion: { om: 'Gaaffii 2', am: 'ጥያቄ 2', en: 'Question 2' }
          },
          {
            id: 'ex-6-3',
            name: {
              om: 'Gilgaala 6.3: Gatii Giddu-galaa (Mean)',
              am: 'መልመጃ 6.3፡ አማካይ ዋጋ (Mean)',
              en: 'Exercise 6.3: Calculating Mean / Average'
            },
            pages: '107 - 108',
            recommendedProblems: { om: 'Gaaffilee 1 - 4', am: 'ጥያቄ 1 - 4', en: 'Questions 1 - 4' },
            homeworkSuggestion: { om: 'Gaaffii 3 fi 4', am: 'ጥያቄ 3 እና 4', en: 'Questions 3 & 4' }
          },
          {
            id: 'ex-6-4',
            name: {
              om: 'Gilgaala 6.4: Yaalii Carraa Ta\'umsaa',
              am: 'መልመጃ 6.4፡ የዕድል (Probability) ሙከራዎች',
              en: 'Exercise 6.4: Simple Chance & Probability'
            },
            pages: '111',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2', am: 'ጥያቄ 1 እና 2', en: 'Questions 1 & 2' },
            homeworkSuggestion: { om: 'Gaaffii 2a - c', am: 'ጥያቄ 2ሀ - ሐ', en: 'Questions 2a - c' }
          },
          {
            id: 'ex-6-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 6',
              am: 'የምዕራፍ 6 ማጠቃለያ መልመጃ',
              en: 'Chapter 6 Review Exercise'
            },
            pages: '112 - 113',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 4', am: 'ጥያቄ 1 እስከ 4', en: 'Questions 1 to 4' },
            homeworkSuggestion: { om: 'Gaaffii 3 fi 4', am: 'ጥያቄ 3 እና 4', en: 'Questions 3 & 4' }
          }
        ]
      },
      {
        unitNumber: 7,
        title: {
          om: 'Boqonnaa 7: Gosootaafi Hiikoo Bocoota Jaboo Beekamoo',
          am: 'ምዕራፍ 7፡ የታወቁ ጠጣር አካላት (Solid Figures) አይነቶችና ትርጉም',
          en: 'Unit 7: Types and Meaning of Common Solid Figures'
        },
        studentPages: '114 - 131',
        teacherGuidePages: '125 - 144',
        keyCompetencies: {
          om: 'Danaalee daayimeenshinii sadee (kiyuubii, piriizimii, piraamidii, siliindarii, koonii, isfiirii); fuulota, qarqaroota, varteeksota; piriizimii sirriifi shaffaaxaa.',
          am: 'ባለ 3-አቅጣጫ ጠጣር ምስሎች (ኩብ፣ ፕሪዝም፣ ፒራሚድ፣ ሲሊንደር፣ ኮን፣ ስፌር)፤ ገጾች፣ ጠርዞች፣ ማዕዘናት፤ ትክክለኛና ያጋደለ ፕሪዝም።',
          en: 'Classify 3D solids (cube, prism, pyramid, cylinder, cone, sphere); identify faces, edges, vertices; right vs oblique prisms.'
        },
        teacherGuideMethod: {
          om: 'Moodeela bocoota jaboo qabatamaa dareetti fiduun barattoonni akka lakkaa\'an gochuu.',
          am: 'ተጨባጭ የሆኑ ጠጣር ምስሎችን በማምጣት ተማሪዎች ገጾችንና ጠርዞችን እንዲቆጥሩ ማድረግ።',
          en: 'Physical 3D manipulatives for hands-on vertex, edge, and face counting.'
        },
        commonMisconceptions: {
          om: 'Piriizimii fi piraamidii walitti makuu (hundee lama vs hundee tokko qabaachuu).',
          am: 'ፕሪዝምን እና ፒራሚድን ማምታታት (ሁለት መሠረት vs አንድ መሠረት)።',
          en: 'Confusing prisms (two congruent parallel bases) with pyramids (single base tapering to apex).'
        },
        inclusiveTips: {
          om: 'Kaartoonii irraa bocoota jaboo hojjechuun barattoota dandeettii harkaa qaban hirmaachisaa.',
          am: 'ከካርቶን የተሰሩ ቅርጾችን በመጠቀም ልዩ ፍላጎት ያላቸውን ተማሪዎች ማሳተፍ።',
          en: 'Paper net foldables for kinesthetic understanding of 3D geometry.'
        },
        exercises: [
          {
            id: 'ex-7-1',
            name: {
              om: 'Gilgaala 7.1: Amaloota Bocoota Jaboo',
              am: 'መልመጃ 7.1፡ የጠጣር ምስሎች ባህሪያት',
              en: 'Exercise 7.1: Properties of 3D Solids'
            },
            pages: '117',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 2 fi 3', am: 'ጥያቄ 2 እና 3', en: 'Questions 2 & 3' }
          },
          {
            id: 'ex-7-2',
            name: {
              om: 'Gilgaala 7.2: Piriizimootaafi Piraamidoota',
              am: 'መልመጃ 7.2፡ ፕሪዝሞችና ፒራሚዶች',
              en: 'Exercise 7.2: Prisms and Pyramids'
            },
            pages: '126',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 2 fi 3', am: 'ጥያቄ 2 እና 3', en: 'Questions 2 & 3' }
          },
          {
            id: 'ex-7-3',
            name: {
              om: 'Gilgaala 7.3: Walmadaalchisa Bocoota Jaboo',
              am: 'መልመጃ 7.3፡ ጠጣር ምስሎችን ማነጻጸር',
              en: 'Exercise 7.3: Comparing Solid Figures'
            },
            pages: '129',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 7', am: 'ጥያቄ 1 እስከ 7', en: 'Questions 1 to 7' },
            homeworkSuggestion: { om: 'Gaaffii 5, 6, 7', am: 'ጥያቄ 5፣ 6፣ 7', en: 'Questions 5, 6, 7' }
          },
          {
            id: 'ex-7-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 7',
              am: 'የምዕራፍ 7 ማጠቃለያ መልመጃ',
              en: 'Chapter 7 Review Exercise'
            },
            pages: '131',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 8', am: 'ጥያቄ 1 እስከ 8', en: 'Questions 1 to 8' },
            homeworkSuggestion: { om: 'Gaaffii 6, 7, 8', am: 'ጥያቄ 6፣ 7፣ 8', en: 'Questions 6, 7, 8' }
          }
        ]
      },
      {
        unitNumber: 8,
        title: {
          om: 'Boqonnaa 8: Sararoota, Kofootaafi Safara Isaanii',
          am: 'ምዕራፍ 8፡ መስመሮች፣ ማዕዘናትና መለኪያቸው',
          en: 'Unit 8: Lines, Angles and Their Measurement'
        },
        studentPages: '132 - 164',
        teacherGuidePages: '145 - 164',
        keyCompetencies: {
          om: 'Sararoota walqaxxaamuraniifi waltarree, sarara walakkeessuu, kofoota (akkiyuutii, sirrii, obtiyuusii, qajeelaa, rifileeksii), pirotiraaktarii, simeetirii sararootaa, naannawaafi bal\'ina.',
          am: 'ተቋራጭና ትይዩ መስመሮች፣ መስመርን ማጋመስ፣ ማዕዘናት (አጣዳፊ፣ ቀኝ፣ ዝርጣ፣ ዝርግ፣ ሪፍሌክስ)፣ ማዕዘን መለኪያ፣ የተመጣጣኝነት መስመር፣ ዙሪያና ስፋት።',
          en: 'Parallel & intersecting lines, bisecting segments, angle classification & measurement, line symmetry, perimeter & area of polygons.'
        },
        teacherGuideMethod: {
          om: 'Kompaasii, sarartuu fi pirotiraaktariin ijaarsa ji\'oomeetirii gochaan agarsiisaa.',
          am: 'ኮምፓስ፣ ማስመሪያና ማዕዘን መለኪያ (protractor) በመጠቀም በክፍል ውስጥ ስዕሎችን ማሰራት።',
          en: 'Hands-on geometric construction with compass, straightedge, and protractor.'
        },
        commonMisconceptions: {
          om: 'Pirotiraaktarii dubbisuurratti iskeelii keessaafi alaa walitti makuu.',
          am: 'ማዕዘን መለኪያ ሲነበብ የውስጥና የውጭ እርከንን ማምታታት።',
          en: 'Reading the wrong protractor scale (inner vs outer degrees).'
        },
        inclusiveTips: {
          om: 'Pirotiraaktarii fi sarartuu gurguddaa qaban fayyadamaa; simeetirii waraqaa dachaasuun agarsiisaa.',
          am: 'ትላልቅ ምልክት ያላቸው መለኪያዎችን መጠቀም፤ ወረቀት በማጠፍ የተመጣጣኝነት መስመርን ማሳየት።',
          en: 'Paper folding activities for tactile exploration of axes of symmetry.'
        },
        exercises: [
          {
            id: 'ex-8-1',
            name: {
              om: 'Gilgaala 8.1: Sararoota Walqaxxaamuraniifi Waltarree',
              am: 'መልመጃ 8.1፡ ተቋራጭና ትይዩ መስመሮች',
              en: 'Exercise 8.1: Intersecting & Parallel Lines'
            },
            pages: '138',
            recommendedProblems: { om: 'Gaaffilee 1 fi 2', am: 'ጥያቄ 1 እና 2', en: 'Questions 1 & 2' },
            homeworkSuggestion: { om: 'Gaaffii 2a - c', am: 'ጥያቄ 2ሀ - ሐ', en: 'Question 2a - c' }
          },
          {
            id: 'ex-8-2',
            name: {
              om: 'Gilgaala 8.2: Sarara Dhaabbataa Walakkeessuu',
              am: 'መልመጃ 8.2፡ መስመርን እኩል ማጋመስ',
              en: 'Exercise 8.2: Bisecting Line Segments'
            },
            pages: '141',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 5', am: 'ጥያቄ 1 እስከ 5', en: 'Questions 1 to 5' },
            homeworkSuggestion: { om: 'Gaaffii 4 fi 5', am: 'ጥያቄ 4 እና 5', en: 'Questions 4 & 5' }
          },
          {
            id: 'ex-8-4',
            name: {
              om: 'Gilgaala 8.4: Kofoota Safaruu fi Ramaddii',
              am: 'መልመጃ 8.4፡ ማዕዘናትን መለካትና መመደብ',
              en: 'Exercise 8.4: Measuring and Classifying Angles'
            },
            pages: '147 - 148',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 5', am: 'ጥያቄ 1 እስከ 5', en: 'Questions 1 to 5' },
            homeworkSuggestion: { om: 'Gaaffii 3 fi 4', am: 'ጥያቄ 3 እና 4', en: 'Questions 3 & 4' }
          },
          {
            id: 'ex-8-6',
            name: {
              om: 'Gilgaala 8.6: Simeetirii Sararootaa',
              am: 'መልመጃ 8.6፡ የተመጣጣኝነት (Symmetry) መስመሮች',
              en: 'Exercise 8.6: Line Symmetry'
            },
            pages: '154',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 5', am: 'ጥያቄ 1 እስከ 5', en: 'Questions 1 to 5' },
            homeworkSuggestion: { om: 'Gaaffii 1 fi 5', am: 'ጥያቄ 1 እና 5', en: 'Questions 1 & 5' }
          },
          {
            id: 'ex-8-7',
            name: {
              om: 'Gilgaala 8.7: Naannawaafi Bal\'ina Iskuweeriifi Rektaangilii',
              am: 'መልመጃ 8.7፡ የካሬና አራት ማዕዘን ዙሪያና ስፋት',
              en: 'Exercise 8.7: Perimeter & Area of Rectangles'
            },
            pages: '157',
            recommendedProblems: { om: 'Gaaffilee 1 - 3', am: 'ጥያቄ 1 - 3', en: 'Questions 1 - 3' },
            homeworkSuggestion: { om: 'Gaaffii 3', am: 'ጥያቄ 3', en: 'Question 3' }
          },
          {
            id: 'ex-8-rev',
            name: {
              om: 'Gilgaala Keessa Deebii Boqonnaa 8',
              am: 'የምዕራፍ 8 ማጠቃለያ መልመጃ',
              en: 'Chapter 8 Review Exercise'
            },
            pages: '164',
            recommendedProblems: { om: 'Gaaffilee 1 hanga 4', am: 'ጥያቄ 1 እስከ 4', en: 'Questions 1 to 4' },
            homeworkSuggestion: { om: 'Gaaffii 2, 3, 4', am: 'ጥያቄ 2፣ 3፣ 4', en: 'Questions 2, 3, 4' }
          }
        ]
      }
    ]
  },

  // ================= GRADE 5 ENVIRONMENTAL SCIENCE =================
  {
    subjectKey: 'env_science',
    grade: '5',
    studentBook: {
      title: {
        om: 'Kitaaba Barataa Saayinsii Naannoo Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል የአካባቢ ሳይንስ የተማሪ መጽሐፍ',
        en: 'Grade 5 Environmental Science Student Textbook'
      },
      publisher: {
        om: 'Ministeera Barnootaa (MoE)',
        am: 'የትምህርት ሚኒስቴር',
        en: 'Ministry of Education'
      },
      edition: '2016 A.L.I Ethiopian National Curriculum',
      coverColor: 'emerald',
      totalPages: 184
    },
    teacherGuide: {
      title: {
        om: 'Qajeelcha Barsiisaa Saayinsii Naannoo Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል የአካባቢ ሳይንስ የመምህሩ መምሪያ',
        en: 'Grade 5 Environmental Science Teacher\'s Guide'
      },
      edition: '2016 A.L.I Guidebook Edition',
      totalPages: 140,
      standardPeriodDuration: '45 daqiiqaa (45 minutes)'
    },
    units: [
      {
        unitNumber: 1,
        title: {
          om: 'Boqonnaa 1: Naannoo Keenya fi Qabeenya Uumamaa',
          am: 'ምዕራፍ 1፡ አካባቢያችን እና የተፈጥሮ ሀብት',
          en: 'Unit 1: Our Environment and Natural Resources'
        },
        studentPages: '1 - 36',
        teacherGuidePages: '6 - 25',
        keyCompetencies: {
          om: 'Qabeenya uumamaa badhaadhaa ta\'an adda baasuu fi kunuunsa isaanii beekuu.',
          am: 'የተፈጥሮ ሀብቶችን መለየትና የአጠባበቅ ዘዴዎችን መረዳት።',
          en: 'Identify terrestrial and aquatic natural resources and conservation methods.'
        },
        teacherGuideMethod: {
          om: 'Mooraa mana barumsaa keessa deemanii ilaaluu (field observation) fi marii garee.',
          am: 'በትምህርት ቤቱ ግቢ ውስጥ በመዘዋወር የመስክ ምልከታና የቡድን ውይይት ማድረግ።',
          en: 'Conduct school compound walkabout and nature inventory in small groups.'
        },
        commonMisconceptions: {
          om: 'Qabeenyi bishaanii fi biyyee hin dhumatu jedhanii yaaduu.',
          am: 'የውሃና የአፈር ሀብት ፈጽሞ አያልቅም ብሎ ማሰብ።',
          en: 'Believing water and topsoil are infinite and immune to erosion.'
        },
        inclusiveTips: {
          om: 'Barattoonni meeshaalee qabatamaa naannoo irraa akka fidan taasisaa.',
          am: 'ተማሪዎች ከአካባቢያቸው የቅጠልና የአፈር ናሙና እንዲያመጡ ማድረግ።',
          en: 'Allow tactile exploration of soil, leaf, and rock samples.'
        },
        exercises: [
          {
            id: 'env-ex-1',
            name: {
              om: 'Gilgaala 1.1: Qabeenya Uumamaa Kunuunsuu',
              am: 'መልመጃ 1.1፡ የተፈጥሮ ሀብት እንክብካቤ',
              en: 'Exercise 1.1: Conserving Natural Resources'
            },
            pages: '12 - 15',
            recommendedProblems: {
              om: 'Gaaffilee 1 - 6 (Daree)',
              am: 'ጥያቄ 1 - 6 (ክፍል)',
              en: 'Questions 1 - 6 (Classroom)'
            },
            homeworkSuggestion: {
              om: 'Gaaffilee 7 - 10 (Hojii Manaa)',
              am: 'ጥያቄ 7 - 10 (ቤት ሥራ)',
              en: 'Questions 7 - 10 (Homework)'
            }
          }
        ]
      }
    ]
  },

  // ================= GRADE 5 AFAAN OROMOO =================
  {
    subjectKey: 'afaan_oromoo',
    grade: '5',
    studentBook: {
      title: {
        om: 'Kitaaba Barataa Afaan Oromoo Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል ኦሮምኛ ቋንቋ የተማሪ መጽሐፍ',
        en: 'Grade 5 Afaan Oromoo Student Textbook'
      },
      publisher: {
        om: 'Biiroo Barnootaa Oromiyaa',
        am: 'የኦሮሚያ ትምህርት ቢሮ',
        en: 'Oromia Education Bureau'
      },
      edition: '2016 A.L.I',
      coverColor: 'amber',
      totalPages: 196
    },
    teacherGuide: {
      title: {
        om: 'Qajeelcha Barsiisaa Afaan Oromoo Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል ኦሮምኛ ቋንቋ የመምህሩ መምሪያ',
        en: 'Grade 5 Afaan Oromoo Teacher\'s Guide'
      },
      edition: '2016 A.L.I',
      totalPages: 152,
      standardPeriodDuration: '45 daqiiqaa'
    },
    units: [
      {
        unitNumber: 1,
        title: {
          om: 'Boqonnaa 1: Aadaa fi Duudhaa Oromoo',
          am: 'ምዕራፍ 1፡ የኦሮሞ ባህልና ወጎች',
          en: 'Unit 1: Oromo Cultural Heritage & Traditions'
        },
        studentPages: '1 - 30',
        teacherGuidePages: '5 - 24',
        keyCompetencies: {
          om: 'Dubbisuu fi hubannoo seenaa aadaa; seer-luga (hima, maqaa, gochima) adda baasuu.',
          am: 'የባህል ታሪኮችን አንብቦ መረዳት፤ ሰዋስው (ስም፣ ግስ) መለየት።',
          en: 'Reading comprehension of cultural folk stories; grammatical parts of speech.'
        },
        teacherGuideMethod: {
          om: 'Dubbisa sagalee olkaasanii dubbisuu, gaaffilee dubbisa boodaa deebisiisuu fi shaakala barreessuu.',
          am: 'ድምፅን ከፍ አድርጎ ማንበብ፣ ከአንብቦ መረዳት በኋላ ጥያቄዎችን መመለስና የመጻፍ ልምምድ።',
          en: 'Shared oral reading, post-reading comprehension questions, and paragraph drafting.'
        },
        commonMisconceptions: {
          om: 'Qubeewwan dachaa fi sagalee dheeraa/gabaabaa addaan baasuu dadhabuu.',
          am: 'የረጅም እና አጭር ድምጾች አጠቃቀም ላይ መዘናጋት።',
          en: 'Confusing long and short vowel double-letter conventions in writing.'
        },
        inclusiveTips: {
          om: 'Barattoota dubbisuuf rakkatan fakkiiwwan kitaaba keessaa akka ibsan godhaa.',
          am: 'ለማንበብ ለሚቸገሩ ተማሪዎች የስዕል መግለጫዎችን እንዲጠቀሙ ማድረግ።',
          en: 'Utilize picture walks and partner reading for struggling readers.'
        },
        exercises: [
          {
            id: 'afo-ex-1',
            name: {
              om: 'Gilgaala 1.1: Hubannoo Dubbisaa',
              am: 'መልመጃ 1.1፡ አንብቦ መረዳት',
              en: 'Exercise 1.1: Reading Comprehension'
            },
            pages: '8 - 11',
            recommendedProblems: {
              om: 'Gaaffilee Hubannoo 1 - 5',
              am: 'የመረዳት ጥያቄዎች 1 - 5',
              en: 'Comprehension Questions 1 - 5'
            },
            homeworkSuggestion: {
              om: 'Seer-luga Hojii Manaa Gaaffii 1 - 6',
              am: 'የሰዋስው የቤት ሥራ ጥያቄ 1 - 6',
              en: 'Grammar Practice Questions 1 - 6'
            }
          }
        ]
      }
    ]
  },

  // ================= GRADE 5 ENGLISH =================
  {
    subjectKey: 'english',
    grade: '5',
    studentBook: {
      title: {
        om: 'Kitaaba Barataa Afaan Ingilizii Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል እንግሊዝኛ የተማሪ መጽሐፍ',
        en: 'Grade 5 English for Ethiopia Student Textbook'
      },
      publisher: {
        om: 'Ministeera Barnootaa (MoE)',
        am: 'የትምህርት ሚኒስቴር',
        en: 'Ministry of Education (MoE)'
      },
      edition: '2016 A.L.I / New Curriculum',
      coverColor: 'violet',
      totalPages: 190
    },
    teacherGuide: {
      title: {
        om: 'Qajeelcha Barsiisaa Afaan Ingilizii Kutaa 5ffaa',
        am: 'የ5ኛ ክፍል እንግሊዝኛ የመምህሩ መምሪያ',
        en: 'Grade 5 English Teacher\'s Guide'
      },
      edition: '2016 A.L.I Official Guide',
      totalPages: 148,
      standardPeriodDuration: '45 minutes'
    },
    units: [
      {
        unitNumber: 1,
        title: {
          om: 'Boqonnaa 1: Holiday Activities & Greetings',
          am: 'ምዕራፍ 1፡ የበዓል እንቅስቃሴዎችና ሰላምታ',
          en: 'Unit 1: Holiday Activities & Greetings'
        },
        studentPages: '1 - 28',
        teacherGuidePages: '6 - 22',
        keyCompetencies: {
          om: 'Simple present and simple past tense usage; talking about holidays and daily routines.',
          am: 'የአሁንና ያለፈ ጊዜ ግሶችን መጠቀም፤ ስለ በዓልና ዕለታዊ እንቅስቃሴዎች መናገር።',
          en: 'Use simple present and past tenses; describe holiday experiences and daily routines.'
        },
        teacherGuideMethod: {
          om: 'Pair dialogues, listening comprehension from teacher read-aloud, vocabulary matching.',
          am: 'የጥንድ ንግግሮች፣ የማዳመጥ ልምምድ፣ የቃላት ትርጉም ማዛመድ።',
          en: 'Interactive pair dialogues, listening comprehension from teacher read-aloud, and guided writing.'
        },
        commonMisconceptions: {
          om: 'Irregular past tense verbs (went vs goed, saw vs seed).',
          am: 'ያልተለመዱ ያለፈ ጊዜ ግሶች አጠቃቀም።',
          en: 'Overgeneralizing "-ed" ending to irregular past verbs (e.g. "goed" instead of "went").'
        },
        inclusiveTips: {
          om: 'Use visual flashcards with actions and English word labels.',
          am: 'የድርጊት ስዕላዊ ካርዶችን ከእንግሊዝኛ ቃላት ጋር ማጣመር።',
          en: 'Use visual action flashcards and gesture prompts.'
        },
        exercises: [
          {
            id: 'eng-ex-1',
            name: {
              om: 'Activity 1.1: Vocabulary & Grammar Practice',
              am: 'መልመጃ 1.1፡ የቃላትና ሰዋስው ልምምድ',
              en: 'Activity 1.1: Vocabulary & Grammar Practice'
            },
            pages: '6 - 9',
            recommendedProblems: {
              om: 'Part A & B (Classwork dialogues)',
              am: 'ክፍል ሀ እና ለ (የክፍል ንግግር)',
              en: 'Part A & B (Classwork dialogues)'
            },
            homeworkSuggestion: {
              om: 'Part C: Write 5 sentences about your holiday',
              am: 'ክፍል ሐ፡ ስለ በዓልዎ 5 አረፍተ ነገሮችን ይጻፉ',
              en: 'Part C: Write 5 sentences about your holiday'
            }
          }
        ]
      }
    ]
  }
];

/**
 * Helper to look up an integrated textbook for a given subject and grade
 */
export function getIntegratedBook(subjectKey: string, grade: string = '5'): IntegratedCourseBook {
  const match = TEXTBOOK_LIBRARY.find(
    b => b.subjectKey === subjectKey && b.grade === grade
  );
  if (match) return match;

  // Fallback to Grade 5 Math
  return TEXTBOOK_LIBRARY[0];
}
