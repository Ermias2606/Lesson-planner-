import { CurriculumWeek, SchoolInfo } from '../types';

export const initialSchoolInfo: SchoolInfo = {
  schoolName: {
    om: 'Mana Barumsaa Sadarkaa 1ffaa fi Giddu-galeessaa Salaayish',
    am: 'ሳላይሽ ቅድመ አንደኛ፣ 1ኛ ደረጃና መካከለኛ ደረጃ ትምህርት ቤት',
    en: 'Salayish Pre-primary, Primary and Middle School'
  },
  academicYear: {
    om: '2019 A.L.I (2026/27)',
    am: '2019 ዓ.ም (2026/27)',
    en: '2019 E.C. (2026/2027 G.C.)'
  },
  teacherName: {
    om: 'Barsiisaa / Barsiistuu Herregaa',
    am: 'የሒሳብ መምህር/ት',
    en: 'Mathematics Teacher'
  },
  gradeAndSection: {
    om: 'Kutaa 5ffaa',
    am: '5ኛ ክፍል',
    en: 'Grade 5'
  },
  subject: {
    om: 'Herrega (Mathematics)',
    am: 'ሒሳብ (Mathematics)',
    en: 'Mathematics'
  },
  annualDays: '180',
  annualPeriods: '190',
  weeklyPeriods: '5',
  periodDuration: {
    om: 'Daqiiqaa 45',
    am: '45 ደቂቃ',
    en: '45 Minutes'
  },
  departmentHeadName: {
    om: 'Itti Gaafatamaa Dippaartimantii',
    am: 'የዲፓርትመንት ተጠሪ',
    en: 'Department Head'
  },
  principalName: {
    om: 'Hogganaa Mana Barumsaa',
    am: 'የመሪ መምህር / ርዕሰ መምህር',
    en: 'School Principal'
  }
};

const RAW_CURRICULUM_2016: CurriculumWeek[] = [
  // ================= SEMESTER 1: FULBAANA / MESKEREM / SEPTEMBER =================
  {
    id: 'sem1-m1-w1',
    semester: 1,
    monthIndex: 0,
    weekNumber: 1,
    dateRange: '02 - 04 (3)',
    pages: '1 - 2',
    chapterNumber: 1,
    monthName: { om: 'Fulbaana', am: 'መስከረም', en: 'Meskerem (Sep)' },
    chapter: { om: 'Boqonnaa 1', am: 'ምዕራፍ 1', en: 'Chapter 1' },
    mainTopic: {
      om: '1.0 Qophii, Seensa fi Qajeelfama Barnoota Herregaa Kutaa 5ffaa',
      am: '1.0 የ5ኛ ክፍል ሒሳብ ትምህርት መግቢያ፣ ቅድመ ዝግጅትና መመሪያ',
      en: '1.0 Introduction, Preparation & Orientation for Grade 5 Math'
    },
    generalObjectives: {
      om: 'Silabasii fi heera barnoota herregaa kutaa 5ffaa hubatanii qophii gochuu.',
      am: 'የ5ኛ ክፍል ሒሳብ ትምህርት ሥርዓተ-ትምህርትንና ደንቦችን ተረድተው መዘጋጀት።',
      en: 'Understand Grade 5 syllabus, class rules and prepare materials.'
    },
    priorKnowledge: {
      om: 'Barnoota herregaa kutaa 4ffaa irraa beekumsa bu\'uuraa qabu.',
      am: 'ከ4ኛ ክፍል የሒሳብ ትምህርት መሠረታዊ እውቀት አላቸው።',
      en: 'Foundational knowledge from Grade 4 mathematics.'
    },
    lessonOutcome: {
      om: 'Barattoonni meeshaalee barnootaa qopheeffatanii seera daree baru.',
      am: 'ተማሪዎች የመማሪያ ቁሳቁሶችን አዘጋጅተው የክፍል ደንቦችን ይገነዘባሉ።',
      en: 'Students organize learning materials and master classroom expectations.'
    },
    teachingMethod: {
      om: 'Ibsa kennuu, marii daree, gaaffii fi deebii.',
      am: 'ገለፃ፣ የክፍል ውይይት፣ ጥያቄና መልስ።',
      en: 'Explanation, classroom discussion, question & answer.'
    },
    teachingAids: {
      om: 'Kitaaba barataa, silabasii, gabatee gurraacha.',
      am: 'የተማሪው መጽሐፍ፣ ሲላበስ፣ ጥቁር ሰሌዳ።',
      en: 'Student textbook, syllabus guide, blackboard.'
    },
    assessment: {
      om: 'Hirmaannaa daree, hubannoo seera daree.',
      am: 'የክፍል ተሳትፎ፣ የደንብ ግንዛቤ።',
      en: 'Class participation and understanding of classroom norms.'
    }
  },
  {
    id: 'sem1-m1-w2',
    semester: 1,
    monthIndex: 0,
    weekNumber: 2,
    dateRange: '07 - 11 (5)',
    pages: '1 - 6',
    chapterNumber: 1,
    monthName: { om: 'Fulbaana', am: 'መስከረም', en: 'Meskerem (Sep)' },
    chapter: { om: 'Boqonnaa 1', am: 'ምዕራፍ 1', en: 'Chapter 1' },
    mainTopic: {
      om: '1.1 Bal\'ina dirra kaaree fi rog-afurii waraqaa fayyadamuun safaruu',
      am: '1.1 የካሬና አራት ማዕዘን ስፋትን በካሬና አራት ማዕዘን ወረቀቶችን በመጠቀም ስፋትን መለካት',
      en: '1.1 Measuring Area of Squares and Rectangles Using Grid Papers'
    },
    generalObjectives: {
      om: 'Bal\'ina dirra kaaree fi rog-afurii waraqaa kaaree fi rog-afuriitti fayyadamuun safaruu ni beeku.',
      am: 'የካሬና አራት ማዕዘን ስፋትን በካሬና አራት ማዕዘን ወረቀቶችን በመጠቀም ስፋትን መለካት ያውቃሉ።',
      en: 'Learn how to measure surface area of squares and rectangles with grid papers.'
    },
    priorKnowledge: {
      om: 'Barnoota herregaa kutaa 4ffaa irraa beekumsa safara bal\'inaa qabu.',
      am: 'ከ4ኛ ክፍል የሒሳብ ትምህርት መጠነኛ እውቀት አላቸው።',
      en: 'Prior understanding of basic measurements from Grade 4.'
    },
    lessonOutcome: {
      om: 'Bal\'ina kaaree fi rog-afurii waraqaa kaaree fi rog-afuriitti fayyadamuun safaruu ni danda\'u.',
      am: 'የካሬና አራት ማዕዘን ስፋትን በካሬና አራት ማዕዘን ወረቀቶችን በመጠቀም ስፋትን መለካት ይችላሉ።',
      en: 'Students can measure areas of rectangles and squares accurately.'
    },
    teachingMethod: {
      om: 'Ibsa kennuu, marii garee, gaaffii fi deebii, gabatee irratti agarsiisuu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
      en: 'Explanation, group discussion, Q&A, demonstration on board.'
    },
    teachingAids: {
      om: 'Waraqaa kaaree fi rog-afurii, sarartuu, qalama.',
      am: 'ማስመሪያ እና ሜትር፣ ካሬ ወረቀት።',
      en: 'Ruler, grid papers, square sheets, pencils.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Hojii pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Classwork, homework, group assignment, project work.'
    }
  },
  {
    id: 'sem1-m1-w3',
    semester: 1,
    monthIndex: 0,
    weekNumber: 3,
    dateRange: '14 - 18 (3)',
    pages: '6 - 9',
    chapterNumber: 1,
    monthName: { om: 'Fulbaana', am: 'መስከረም', en: 'Meskerem (Sep)' },
    chapter: { om: 'Boqonnaa 1', am: 'ምዕራፍ 1', en: 'Chapter 1' },
    mainTopic: {
      om: '1.2 Bal\'ina dirraa sm², m² fi hektaaraan safaruu',
      am: '1.2 የወለል ስፋትን በሳ.ሜ²፣ ሜ² እና በሄክታር መለካት',
      en: '1.2 Measuring Surface Area in cm², m², and Hectares'
    },
    generalObjectives: {
      om: 'Bal\'ina dirraa sm², m² fi hektaaraan shallaganii safaruu ni beeku.',
      am: 'የወለል ስፋትን በሳ.ሜ²፣ ሜ² እና በሄክታር መለካት ያውቃሉ።',
      en: 'Understand how to calculate surface areas in cm², m², and hectares.'
    },
    priorKnowledge: {
      om: 'Safartuuwwan dheerinaa fi bal\'inaa kutaa 4ffaa irraa beeku.',
      am: 'የርዝመት መለኪያዎችን ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Length units and basic measurements from Grade 4.'
    },
    lessonOutcome: {
      om: 'Bal\'ina dirraa safartuulee sm², m² fi hektaaraan safaruu ni danda\'u.',
      am: 'የወለል ስፋትን በሳ.ሜ²፣ ሜ² እና በሄክታር መለካት ይችላሉ።',
      en: 'Students calculate and represent areas in standard metric units.'
    },
    teachingMethod: {
      om: 'Ibsa dhiyeessuu, marii garee, gaaffii fi deebii, gabatee irratti.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
      en: 'Lecture, group interaction, practical problem solving.'
    },
    teachingAids: {
      om: 'Sarartuu, meetira, gabatee gurraacha.',
      am: 'ማስመሪያ እና ሜትር።',
      en: 'Ruler, measuring tape, board.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የሙከራ ፈተና።',
      en: 'Class exercise, homework, quizzes.'
    }
  },
  {
    id: 'sem1-m1-w4',
    semester: 1,
    monthIndex: 0,
    weekNumber: 4,
    dateRange: '21 - 25 (5)',
    pages: '9 - 13',
    chapterNumber: 1,
    monthName: { om: 'Fulbaana', am: 'መስከረም', en: 'Meskerem (Sep)' },
    chapter: { om: 'Boqonnaa 1', am: 'ምዕራፍ 1', en: 'Chapter 1' },
    mainTopic: {
      om: '1.3 Qabiyyee baattuu mm³, cm³ fi liitiraan safaruu',
      am: '1.3 ይዘትን በሳ.ሜ³፣ ሜ³ እና በሊትር መለካት',
      en: '1.3 Measuring Volume and Capacity in mm³, cm³, and Liters'
    },
    generalObjectives: {
      om: 'Qabiyyee baattuu mm³, cm³ fi liitiraan shallaguu fi safaruu ni beeku.',
      am: 'ይዘትን በሳ.ሜ³፣ ሜ³ እና በሊትር መለካት ያውቃሉ።',
      en: 'Master volume calculations using cubic centimeters and liters.'
    },
    priorKnowledge: {
      om: 'Bishaan fi dhangala\'aa safaruu irratti naannoo irraa beekumsa qabu.',
      am: 'ስለ ፈሳሽ መለኪያዎች ከዕለት ተዕለት ኑሮ እውቀት አላቸው።',
      en: 'Familiarity with liquid measurements from daily life.'
    },
    lessonOutcome: {
      om: 'Qabiyyee baattuu mm³, cm³ fi liitiraan shallaguu ni baru.',
      am: 'ይዘትን በሳ.ሜ³፣ ሜ³ እና በሊትር መለካት ይማራሉ።',
      en: 'Students can determine capacity and volume in metric units.'
    },
    teachingMethod: {
      om: 'Ibsa kennuu, marii, gaaffii fi deebii, gabatee irratti hojjechuu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
      en: 'Demonstration, guided exercises, interactive questions.'
    },
    teachingAids: {
      om: 'Mi\'a liitiraa, meetira, ujummoo safaraa.',
      am: 'ሊትር እና ሜትር፣ የውሃ መያዣ እቃዎች።',
      en: 'Liter containers, measuring cups, measuring tape.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Practical exercises, homework, group project.'
    }
  },
  {
    id: 'sem1-m1-w5',
    semester: 1,
    monthIndex: 0,
    weekNumber: 5,
    dateRange: '28 - 02 (5)',
    pages: '13 - 18',
    chapterNumber: 1,
    monthName: { om: 'Fulbaana', am: 'መስከረም', en: 'Meskerem (Sep)' },
    chapter: { om: 'Boqonnaa 1', am: 'ምዕራፍ 1', en: 'Chapter 1' },
    mainTopic: {
      om: '1.4 Safartuulee bal\'inaa fi qabiyyee gara tokko gara biraatti jijjiiruu',
      am: '1.4 የስፋትና የይዘት መለኪያ ምድቦችን ወደተለያዩ ምድብ መቀየር',
      en: '1.4 Unit Conversion for Area and Volume Measurements'
    },
    generalObjectives: {
      om: 'Safartuulee bal\'inaa fi qabiyyee jijjiiruu ni beeku (mm²<->cm²<->m²<->km², mm³<->cm³<->liitira).',
      am: 'የስፋትና የይዘት መለኪያ ምድቦችን ወደተለያዩ ምድብ መቀየር ያውቃሉ።',
      en: 'Convert between area and volume units smoothly.'
    },
    priorKnowledge: {
      om: 'Baay\'isuu fi hiruu herrega kutaa 4ffaa irraa beeku.',
      am: 'ማባዛትና ማካፈል ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Multiplication and division skills from Grade 4.'
    },
    lessonOutcome: {
      om: 'Safartuulee bal\'inaa fi qabiyyee gara kutaa barbaadamutti ni jijjiiru.',
      am: 'የስፋትና የይዘት መለኪያዎችን ወደሚፈለገው ምድብ ይቀይራሉ።',
      en: 'Students accurately convert measurement units.'
    },
    teachingMethod: {
      om: 'Ibsa, marii, gaaffii fi deebii, shaakala dhuunfaa.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በግል ልምምድ።',
      en: 'Direct instruction, conversion charts, drill exercises.'
    },
    teachingAids: {
      om: 'Chaartii jijjiirraa safartuulee, meetira, sarartuu.',
      am: 'የመለኪያ ምድቦች መቀየሪያ ቻርት፣ ሜትር።',
      en: 'Metric conversion chart, ruler, formula tables.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Hojii pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Classwork, homework, individual tests.'
    }
  },

  // ================= SEMESTER 1: ONKOLOLEESSA / TIKIMT / OCTOBER =================
  {
    id: 'sem1-m2-w1',
    semester: 1,
    monthIndex: 1,
    weekNumber: 1,
    dateRange: '05 - 09 (5)',
    pages: '18 - 25',
    chapterNumber: 1,
    monthName: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'Tikimt (Oct)' },
    chapter: { om: 'Boqonnaa 1', am: 'ምዕራፍ 1', en: 'Chapter 1' },
    mainTopic: {
      om: '1.5 Gilgaalota bal\'inaa fi qabiyyee irratti hundaa\'an hojjechuu',
      am: '1.5 ስፋትና ይዘትን መሰረት ያደረጉ መልመጃዎችን መሥራት',
      en: '1.5 Practical Exercises & Problem Solving in Area and Volume'
    },
    generalObjectives: {
      om: 'Gilgaalota bal\'inaa fi qabiyyee irratti hundaa\'an adda baasanii hojjechuu ni beeku.',
      am: 'ስፋትና ይዘትን መሰረት ያደረጉ መልመጃዎችን መሥራት ያውቃሉ።',
      en: 'Solve word problems involving area and volume in real-life contexts.'
    },
    priorKnowledge: {
      om: 'Barnoota bal\'inaa fi qabiyyee torbanoota darban barataniiru.',
      am: 'ባለፉት ሳምንታት የተማሩትን የስፋትና ይዘት እውቀት።',
      en: 'Concepts covered in previous weeks.'
    },
    lessonOutcome: {
      om: 'Gilgaalota bal\'inaa fi qabiyyee jireenya guyyaa guyyaa keessatti hojiirra oolchuu danda\'u.',
      am: 'ስፋትና ይዘትን መሰረት ያደረጉ መልመጃዎችን መሥራት ይችላሉ።',
      en: 'Apply calculations to solve daily life physical scenarios.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee irratti.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
      en: 'Interactive problem solving, peer discussion, board exercises.'
    },
    teachingAids: {
      om: 'Meetira, liitira, bocoota jajjaboo.',
      am: 'ሜትር እና ሊትር፣ ጠጣር ቅርጾች።',
      en: 'Measuring tape, liter jars, 3D geometric shapes.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Class problems, group quiz, home assignment.'
    }
  },
  {
    id: 'sem1-m2-w2',
    semester: 1,
    monthIndex: 1,
    weekNumber: 2,
    dateRange: '12 - 16 (5)',
    pages: '26 - 33',
    chapterNumber: 2,
    monthName: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'Tikimt (Oct)' },
    chapter: { om: 'Boqonnaa 2', am: 'ምዕራፍ 2', en: 'Chapter 2' },
    mainTopic: {
      om: '2.1 Gosoota hirmaannaa (Hirmaannaa sirrii, miti-sirrii fi makaa)',
      am: '2.1 የክፍልፋይ አይነቶች (ትክክለኛ፣ ኢ-ትክክለኛ እና ድብልቅ ክፍልፋዮች)',
      en: '2.1 Types of Fractions (Proper, Improper, and Mixed Fractions)'
    },
    generalObjectives: {
      om: 'Gosoota hirmaannaa adda baasanii beeku.',
      am: 'የክፍልፋይ አይነቶችን ለይተው ያውቃሉ።',
      en: 'Classify fractions into proper, improper, and mixed fractions.'
    },
    priorKnowledge: {
      om: 'Maatii fi naannoo isaanii irraa wantoota hiraman qooduu irratti beekumsa qabu.',
      am: 'ከቤተሰብና ከአካባቢያቸው ሊካፈሉ ከሚችሉ ነገሮች መጠነኛ እውቀት አላቸው።',
      en: 'Concept of sharing and portions from daily life.'
    },
    lessonOutcome: {
      om: 'Gosoota hirmaannaa fakkii fi lakkoofsaan ibsuu ni danda\'u.',
      am: 'የክፍልፋይ አይነቶችን በምስልና በቁጥር መግለጽ ይችላሉ።',
      en: 'Students identify and sketch visual representations of fractions.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, hojii fakkii.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በምስል ስራ።',
      en: 'Demonstration with fraction strips, discussion, diagrams.'
    },
    teachingAids: {
      om: 'Chaartii hirmaannaa, fakkiiwwan qoodaman, waraqaa.',
      am: 'በቻርት የተከፋፈሉ ምስሎች፣ የክፍልፋይ ቁራጮች።',
      en: 'Fraction circles, fraction wall chart, cutouts.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Hojii dhuunfaa.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የግል ሥራ።',
      en: 'Fraction classification sheets, class activity.'
    }
  },
  {
    id: 'sem1-m2-w3',
    semester: 1,
    monthIndex: 1,
    weekNumber: 3,
    dateRange: '19 - 23 (5)',
    pages: '33 - 45',
    chapterNumber: 2,
    monthName: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'Tikimt (Oct)' },
    chapter: { om: 'Boqonnaa 2', am: 'ምዕራፍ 2', en: 'Chapter 2' },
    mainTopic: {
      om: '2.2 Hirmaannaa fi heera shallaggii arfanii (Ida\'uu, Hir\'isuu, Baay\'isuu, Hiruu)',
      am: '2.2 ክፍልፋዮችና አራቱ መሰረታዊ ስሌቶች (መደመር፣ መቀነስ፣ ማባዛት፣ ማካፈል)',
      en: '2.2 Fractions and the Four Basic Operations (+, -, ×, ÷)'
    },
    generalObjectives: {
      om: 'Hirmaannaawwan heera shallaggii arfaniin shallaguu ni beeku.',
      am: 'ክፍልፋዮችን በአራቱ መሠረታዊ ስሌቶች ማስላት ያውቃሉ።',
      en: 'Perform addition, subtraction, multiplication, and division of fractions.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa ida\'uu fi hir\'isuu hirmaannaa beeku.',
      am: 'ክፍልፋዮችን መደመርና መቀነስ ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Adding fractions with like denominators from Grade 4.'
    },
    lessonOutcome: {
      om: 'Hirmaannaawwan heera shallaggii arfaniin shallaganii bu\'aa argatu.',
      am: 'ክፍልፋዮችን በአራቱ ስሌቶች አሰልተው ትክክለኛ መልስ ያገኛሉ።',
      en: 'Students accurately compute fraction operations.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee irratti shaakaluu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ልምምድ።',
      en: 'Step-by-step method presentation, worked examples, group practice.'
    },
    teachingAids: {
      om: 'Chaartii fakkiiwwan lakkoofsaa, bocoota.',
      am: 'የቁጥርና የክፍልፋይ ቻርቶች፣ ሰሌዳ።',
      en: 'Fraction calculation chart, multiplication table, worksheets.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የሙከራ ፈተና።',
      en: 'Computational quizzes, homework exercises.'
    }
  },
  {
    id: 'sem1-m2-w4',
    semester: 1,
    monthIndex: 1,
    weekNumber: 4,
    dateRange: '26 - 30 (5)',
    pages: '46 - 49',
    chapterNumber: 3,
    monthName: { om: 'Onkololeessa', am: 'ጥቅምት', en: 'Tikimt (Oct)' },
    chapter: { om: 'Boqonnaa 3', am: 'ምዕራፍ 3', en: 'Chapter 3' },
    mainTopic: {
      om: '3.1 Desimaalota (Kurnyee fi dhibbyee) deebisanii killeessuu',
      am: '3.1 አንድ አሰርታኛና አንድ መቶኛን መከለስ (የአስርዮሽ ቁጥሮች)',
      en: '3.1 Review of Tenths and Hundredths (Decimal Numbers)'
    },
    generalObjectives: {
      om: 'Desimaalota kurnyee (0.1) fi dhibbyee (0.01) hubachuu fi dubbisuu ni beeku.',
      am: 'የተለያዩ አንድ አሰርታኛና አንድ መቶኛን የተሰጡ ቁጥሮችን ይገነዘባሉ።',
      en: 'Understand place values for tenths (0.1) and hundredths (0.01).'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa waa\'ee kurnyee fi dhibbyee beekumsa qabu.',
      am: 'ስለ አስርዮሾች ከ4ኛ ክፍል መጠነኛ እውቀት አላቸው።',
      en: 'Decimal basics from Grade 4 curriculum.'
    },
    lessonOutcome: {
      om: 'Desimaalota kurnyee fi dhibbyee adda baasuu fi bakka qoodaa isaanii baru.',
      am: 'አንድ አሰርታኛና አንድ መቶኛን መለየት ይችላሉ።',
      en: 'Students read, write, and compare decimals to two decimal places.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee irratti.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Place value grid display, teacher demonstration, exercises.'
    },
    teachingAids: {
      om: 'Chaartii desimaalotaa, saantimoota.',
      am: 'የአስርዮሽ ቻርት፣ የሳንቲም ቁሳቁሶች።',
      en: 'Decimal place value chart, play money, base-10 blocks.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Place value quizzes, reading decimals exercises.'
    }
  },

  // ================= SEMESTER 1: SADAASA / HIDAR / NOVEMBER =================
  {
    id: 'sem1-m3-w1',
    semester: 1,
    monthIndex: 2,
    weekNumber: 1,
    dateRange: '03 - 07 (5)',
    pages: '49 - 52',
    chapterNumber: 3,
    monthName: { om: 'Sadaasa', am: 'ኅዳር', en: 'Hidar (Nov)' },
    chapter: { om: 'Boqonnaa 3', am: 'ምዕራፍ 3', en: 'Chapter 3' },
    mainTopic: {
      om: '3.2 Desimaalota sarara lakkoofsaa irratti agarsiisuu',
      am: '3.2 አስርዮሾችን በቁጥር መስመር ላይ ማመልከት',
      en: '3.2 Plotting and Representing Decimals on a Number Line'
    },
    generalObjectives: {
      om: 'Lakkoofsota desimaalaa sarara lakkoofsaa irratti qubsiisanii agarsiisuu ni beeku.',
      am: 'አስርዮሾችን በቁጥር መስመር ላይ ማመልከት ያውቃሉ።',
      en: 'Accurately plot and locate decimal values on the number line.'
    },
    priorKnowledge: {
      om: 'Sarara lakkoofsaa fi lakkoofsa guutuu kutaa darbe irraa beeku.',
      am: 'የቁጥር መስመርን ከቀደመው ክፍል ያውቃሉ።',
      en: 'Number line representation of whole numbers.'
    },
    lessonOutcome: {
      om: 'Desimaalota sarara lakkoofsaa irratti sirriitti agarsiisuu ni danda\'u.',
      am: 'አስርዮሾችን በቁጥር መስመር ላይ ማመልከት ይችላሉ።',
      en: 'Students locate decimal points on numbered intervals.'
    },
    teachingMethod: {
      om: 'Ibsa dhiyeessuu, marii, gaaffii fi deebii, gabatee irratti sararuu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
      en: 'Interactive plotting on board, student sketching on rulers.'
    },
    teachingAids: {
      om: 'Chaartii sarara lakkoofsaa, sarartuu.',
      am: 'የቁጥር መስመር ቻርት፣ ማስመሪያ።',
      en: 'Enlarged number line banner, meter sticks.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Individual line plotting tasks, notebook checks.'
    }
  },
  {
    id: 'sem1-m3-w2',
    semester: 1,
    monthIndex: 2,
    weekNumber: 2,
    dateRange: '10 - 14 (5)',
    pages: '52 - 56',
    chapterNumber: 3,
    monthName: { om: 'Sadaasa', am: 'ኅዳር', en: 'Hidar (Nov)' },
    chapter: { om: 'Boqonnaa 3', am: 'ምዕራፍ 3', en: 'Chapter 3' },
    mainTopic: {
      om: '3.3 Desimaalota ida\'uu fi hir\'isuu (fi Qormaata Walakkaa Semisteera 1ffaa)',
      am: '3.3 አስርዮሽ ቁጥሮችን መደመርና መቀነስ (የ1ኛ መንፈቀ ዓመት አጋማሽ ፈተና)',
      en: '3.3 Adding & Subtracting Decimals (& Semester 1 Midterm Exam)'
    },
    generalObjectives: {
      om: 'Desimaalota ida\'uu fi hir\'isuu ni beeku; qormaata walakkaa semisteeraa qajeeltoon qoramu.',
      am: 'አስርዮሽ ቁጥሮችን መደመርና መቀነስ ያውቃሉ፤ አጋማሽ ፈተና ይፈተናሉ።',
      en: 'Add and subtract decimals aligning decimal points; sit for Midterm Exam.'
    },
    priorKnowledge: {
      om: 'Ida\'uu fi hir\'isuu lakkoofsota guutuu beeku.',
      am: 'መደመርና መቀነስን ያውቃሉ።',
      en: 'Addition and subtraction algorithms.'
    },
    lessonOutcome: {
      om: 'Desimaalota tuqaa wal-qixxeessuun ida\'uu fi hir\'isuu danda\'u.',
      am: 'አስርዮሽ ቁጥሮችን መደመርና መቀነስ ውጤት ያገኛሉ።',
      en: 'Students align decimal points correctly and complete Midterm examination.'
    },
    teachingMethod: {
      om: 'Ibsa, marii, gaaffii fi deebii, qormaata qajeelfama kennuu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ፈተና በመስጠት።',
      en: 'Instruction, examination protocol, evaluation.'
    },
    teachingAids: {
      om: 'Chaartii lakkoofsota desimaalaa, waraqaa qormaataa.',
      am: 'የአስርዮሽ ሰንጠረዥ፣ የፈተና ወረቀት።',
      en: 'Decimal alignment chart, Midterm exam papers.'
    },
    assessment: {
      om: 'Qormaata Walakkaa Semisteera 1ffaa, Hojii daree, Hojii manaa.',
      am: 'የ1ኛ መንፈቀ ዓመት አጋማሽ ፈተና፣ የክፍልና የቤት ሥራ።',
      en: 'Midterm Examination 1, class evaluation.'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Qormaata Walakkaa Semisteera 1ffaa (12 - 14)',
      am: 'የ1ኛ መንፈቀ ዓመት አጋማሽ ፈተና (12 - 14)',
      en: 'Semester 1 Midterm Exam (Dates 12 - 14)'
    }
  },
  {
    id: 'sem1-m3-w3',
    semester: 1,
    monthIndex: 2,
    weekNumber: 3,
    dateRange: '17 - 21 (5)',
    pages: '56 - 63',
    chapterNumber: 3,
    monthName: { om: 'Sadaasa', am: 'ኅዳር', en: 'Hidar (Nov)' },
    chapter: { om: 'Boqonnaa 3', am: 'ምዕራፍ 3', en: 'Chapter 3' },
    mainTopic: {
      om: '3.4 Desimaalota baay\'isuu fi hiruu',
      am: '3.4 አስርዮሽ ቁጥሮችን ማባዛትና ማካፈል',
      en: '3.4 Multiplying and Dividing Decimals'
    },
    generalObjectives: {
      om: 'Desimaalota lakkoofsa guutuun fi desimaala biraan baay\'isuu fi hiruu ni hubatu.',
      am: 'አስርዮሽ ቁጥሮችን ማባዛትና ማካፈል ይገነዘባሉ።',
      en: 'Multiply and divide decimals by whole numbers and decimal values.'
    },
    priorKnowledge: {
      om: 'Baay\'isuu fi hiruu lakkoofsota guutuu beeku.',
      am: 'የሙሉ ቁጥሮች ማባዛትና ማካፈል እውቀት።',
      en: 'Multiplication and division of integers.'
    },
    lessonOutcome: {
      om: 'Desimaalota baay\'isuu fi hiruun bu\'aa sirrii argachuu danda\'u.',
      am: 'አስርዮሽ ቁጥሮችን ማባዛትና በማካፈል ማስላት ይችላሉ።',
      en: 'Students determine products and quotients with proper decimal placement.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee irratti shaakaluu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Board demonstration, step-by-step algorithms, practice sheets.'
    },
    teachingAids: {
      om: 'Chaartii sarara lakkoofsaa, gabatee shallaggii.',
      am: 'የሂሳብ ስሌት ሰሌዳና ቻርት።',
      en: 'Calculation charts, board, worksheets.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የሙከራ ፈተና።',
      en: 'Drill exercises, homework problems, short test.'
    }
  },
  {
    id: 'sem1-m3-w4',
    semester: 1,
    monthIndex: 2,
    weekNumber: 4,
    dateRange: '24 - 28 (5)',
    pages: '63 - 71',
    chapterNumber: 3,
    monthName: { om: 'Sadaasa', am: 'ኅዳር', en: 'Hidar (Nov)' },
    chapter: { om: 'Boqonnaa 3', am: 'ምዕራፍ 3', en: 'Chapter 3' },
    mainTopic: {
      om: '3.5 Hirmaannaa fi desimaalota walbira qabuu fi jijjiiruu',
      am: '3.5 ክፍልፋዮችን ከአስርዮሾች ጋር ማዛመድና መቀየር',
      en: '3.5 Converting and Relating Fractions to Decimals'
    },
    generalObjectives: {
      om: 'Hirmaannaa gara desimaalaatti fi desimaala gara hirmaannaatti jijjiiruu ni beeku.',
      am: 'ክፍልፋዮችን ከአስርዮሾች ጋር ማዛመድ ያውቃሉ።',
      en: 'Understand equivalence between fractions and decimals.'
    },
    priorKnowledge: {
      om: 'Hirmaannaa fi desimaala adda addatti barataniiru.',
      am: 'ክፍልፋዮችንና አስርዮሾችን ለይተው ተምረዋል።',
      en: 'Prior mastery of fractions and decimal fundamentals.'
    },
    lessonOutcome: {
      om: 'Hirmaannaa fi desimaalota walbira qabanii jijjiiruu fi waldorgomsiisuu danda\'u.',
      am: 'ክፍልፋዮችንና አስርዮሾችን ማወዳደርና መቀየር ይችላሉ።',
      en: 'Students seamlessly convert and order fractions and decimals.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
      en: 'Equivalence tables, pair comparisons, board exercises.'
    },
    teachingAids: {
      om: 'Chaartii hirmaannaa fi desimaalaa, bocoota.',
      am: 'የክፍልፋይና አስርዮሽ ማዛመጃ ቻርት።',
      en: 'Fraction-decimal conversion chart, flash cards.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Matching exercises, class quiz, homework.'
    }
  },

  // ================= SEMESTER 1: MUDDEE / TAHSAS / DECEMBER =================
  {
    id: 'sem1-m4-w1',
    semester: 1,
    monthIndex: 3,
    weekNumber: 1,
    dateRange: '01 - 05 (5)',
    pages: '72 - 78',
    chapterNumber: 4,
    monthName: { om: 'Muddee', am: 'ታኅሣሥ', en: 'Tahsas (Dec)' },
    chapter: { om: 'Boqonnaa 4', am: 'ምዕራፍ 4', en: 'Chapter 4' },
    mainTopic: {
      om: '4.1 Qooda wanta tokkoo dhibbantaadhaan (%) ibsuu',
      am: '4.1 ከሙሉ ነገር ያለውን ክፍል በመቶኛ (%) መግለጽ',
      en: '4.1 Expressing Parts of a Whole as a Percentage (%)'
    },
    generalObjectives: {
      om: 'Wanta guutuu tokko keessaa qooda jiru dhibbantaadhaan (%) ibsuu ni beeku.',
      am: 'ሙሉ ነገርን በመቶኛ መግለጽ ያውቃሉ።',
      en: 'Define and represent percentages as fractions out of 100.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa dhibbantaa irratti beekumsa bu\'uuraa qabu.',
      am: 'ስለ መቶኛ መጠነኛ ግንዛቤ አላቸው።',
      en: 'Basics of parts of 100 from prior lessons.'
    },
    lessonOutcome: {
      om: 'Dhibbantaa hirmaannaa dhibbaffaa waliin wal-qabsiisuun ibsuu danda\'u.',
      am: 'መቶኛን ከክፍልፋይና ከአስርዮሽ ጋር ማዛመድ ይችላሉ።',
      en: 'Students describe portions and proportions as percentages.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Visual 100-grid charts, interactive questions, exercises.'
    },
    teachingAids: {
      om: 'Saantima birrii, noottii, chaartii dhibbantaa.',
      am: 'የብር ሳንቲምና ባንክኖት፣ የመቶኛ ቻርት።',
      en: 'Currency coins, 100-square grids, visual percentages.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: '100-grid shading, percentage conversion sheets.'
    }
  },
  {
    id: 'sem1-m4-w2',
    semester: 1,
    monthIndex: 3,
    weekNumber: 2,
    dateRange: '08 - 12 (5)',
    pages: '79 - 81',
    chapterNumber: 4,
    monthName: { om: 'Muddee', am: 'ታኅሣሥ', en: 'Tahsas (Dec)' },
    chapter: { om: 'Boqonnaa 4', am: 'ምዕራፍ 4', en: 'Chapter 4' },
    mainTopic: {
      om: '4.2 Hammamtaa wanti tokko wanta biraa wajjin qabu dhibbantaan ibsuu',
      am: '4.2 አንድ ነገር ከሌላ ነገር ጋር ያለውን መጠን በመቶኛ መግለጽ',
      en: '4.2 Comparing Relative Quantities Using Percentages'
    },
    generalObjectives: {
      om: 'Hammamtaa wanti tokko wanta biraa wajjin qabu dhibbantaan ibsuu ni hubatu.',
      am: 'አንድ ነገር ከሌላ ነገር ጋር ያለውን መጠን በመቶኛ መግለጽ ይገነዘባሉ።',
      en: 'Calculate relative ratio of one quantity to another as a percentage.'
    },
    priorKnowledge: {
      om: 'Reeshoo fi walbira qabdii bu\'uuraa beeku.',
      am: 'የንጽጽርና የሬሾ እውቀት።',
      en: 'Ratios and comparative fractions.'
    },
    lessonOutcome: {
      om: 'Hammamtaa wantootaa dhibbantaan shallaganii ibsuu ni baru.',
      am: 'የተለያዩ ነገሮችን መጠን በመቶኛ መግለጽ ይማራሉ።',
      en: 'Students calculate percentages of comparison accurately.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Classroom word problem analysis, guided practice.'
    },
    teachingAids: {
      om: 'Saantima, noottii baankii, meeshaalee lakkaawwii.',
      am: 'ሳንቲም፣ የባንክ ኖት፣ የመቁጠሪያ እቃዎች።',
      en: 'Counting items, real-life shopping scenarios, cards.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የሙከራ ፈተና።',
      en: 'Real-world comparison word problems.'
    }
  },
  {
    id: 'sem1-m4-w3',
    semester: 1,
    monthIndex: 3,
    weekNumber: 3,
    dateRange: '15 - 19 (5)',
    pages: '82 - 86',
    chapterNumber: 4,
    monthName: { om: 'Muddee', am: 'ታኅሣሥ', en: 'Tahsas (Dec)' },
    chapter: { om: 'Boqonnaa 4', am: 'ምዕራፍ 4', en: 'Chapter 4' },
    mainTopic: {
      om: '4.3 Hirmaannaa, desimaala fi dhibbantaa walbira qabuu',
      am: '4.3 ክፍልፋዮችንና መቶኛዎችን ከአስርዮሽ ጋር ማዛመድ',
      en: '4.3 Tri-Way Relationship: Fractions, Decimals, and Percentages'
    },
    generalObjectives: {
      om: 'Hirmaannaa, desimaala fi dhibbantaa gidduu hariiroo jiru adda baasanii walbira qabuu ni beeku.',
      am: 'ክፍልፋዮችንና መቶኛዎችን ማዛመድ ያውቃሉ።',
      en: 'Equate and convert between fraction, decimal, and percentage representations.'
    },
    priorKnowledge: {
      om: 'Hirmaannaa, desimaala fi dhibbantaa adda addatti barataniiru.',
      am: 'ክፍልፋይ፣ አስርዮሽና መቶኛን ተምረዋል።',
      en: 'Separate knowledge of all three representations.'
    },
    lessonOutcome: {
      om: 'Hirmaannaa fi dhibbantaa akka walbira qaban gochuu danda\'u.',
      am: 'ክፍልፋዮችን፣ አስርዮሾችንና መቶኛዎችን ማዛመድ ይችላሉ።',
      en: 'Students fluidly convert any value between all three representations.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Triple conversion table exercises, group games.'
    },
    teachingAids: {
      om: 'Chaartii lakkoofsotaa fi dhibbantaa, gabatee walbira qabinsaa.',
      am: 'የቁጥሮች፣ አስርዮሾችና መቶኛ ቻርት።',
      en: 'Conversion wheel chart, student comparison boards.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Tri-conversion worksheet, pop test.'
    }
  },
  {
    id: 'sem1-m4-w4',
    semester: 1,
    monthIndex: 3,
    weekNumber: 4,
    dateRange: '22 - 26 (5)',
    pages: '86 - 91',
    chapterNumber: 4,
    monthName: { om: 'Muddee', am: 'ታኅሣሥ', en: 'Tahsas (Dec)' },
    chapter: { om: 'Boqonnaa 4', am: 'ምዕራፍ 4', en: 'Chapter 4' },
    mainTopic: {
      om: '4.4 Dhibbantaan gilgaalota jireenya qabatamaa keessatti hojiirra oolchuu',
      am: '4.4 በመቶኛ ተግባራዊ የሚሆኑ የዕለት ተዕለት መልመጃዎችን መፍታት',
      en: '4.4 Applied Percentage Problem Solving in Real Life'
    },
    generalObjectives: {
      om: 'Dhibbantaa gabaa, daldalaa fi jireenya qabatamaa keessatti itti gargaaramuun gilgaalota furuu ni beeku.',
      am: 'በመቶኛ ተግባራዊ የሚሆኑ መልመጃዎችን መፍታት ያውቃሉ።',
      en: 'Solve percentage problems relating to discounts, profits, and test scores.'
    },
    priorKnowledge: {
      om: 'Daldala fi gabaa naannoo isaanii irraa beekumsa qabu.',
      am: 'ከአካባቢ ንግድና ገበያ መጠነኛ እውቀት አላቸው።',
      en: 'Basic commerce and market awareness.'
    },
    lessonOutcome: {
      om: 'Gilgaalota dhibbantaa jireenya qabatamaa garaagaraa furuu danda\'u.',
      am: 'በዕለት ተዕለት ኑሮ የሚያጋጥሙ የመቶኛ ጥያቄዎችን መፍታት ይችላሉ።',
      en: 'Students apply percentage formulas to real financial and social contexts.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Simulated market transactions, group problem-solving.'
    },
    teachingAids: {
      om: 'Chaartii lakkoofsotaa, ragaalee gabaa fi gatii meeshaa.',
      am: 'የገበያ ዋጋ ሰንጠረዥ፣ የቁጥር ቻርት።',
      en: 'Store receipts, price lists, discount cards.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Practical math projects, student case studies.'
    }
  },

  // ================= SEMESTER 1: AMAJJII / TIR / JANUARY =================
  {
    id: 'sem1-m5-w1',
    semester: 1,
    monthIndex: 4,
    weekNumber: 1,
    dateRange: '29 - 03 (5)',
    pages: '92 - 99',
    chapterNumber: 5,
    monthName: { om: 'Amajjii', am: 'ጥር', en: 'Tir (Jan)' },
    chapter: { om: 'Boqonnaa 5', am: 'ምዕራፍ 5', en: 'Chapter 5' },
    mainTopic: {
      om: '5.1 Haala guddina daldalaa ilaaluun foormulaa irratti gahuu',
      am: '5.1 የንግድ እድገት ሁኔታዎችን በማየት ቀመር ላይ መድረስ',
      en: '5.1 Deriving Business Patterns and Algebraic Formulas'
    },
    generalObjectives: {
      om: 'Haala guddina daldalaa fi shallaggii bu\'aa-baasii ilaaluun foormulaa herregaa uumuu ni hubatu.',
      am: 'የንግድ እድገት ሁኔታዎችን በማየት ቀመር ላይ መድረስ ይገነዘባሉ።',
      en: 'Observe growth patterns in business and formulate equations.'
    },
    priorKnowledge: {
      om: 'Maatii fi naannoo irraa daldalaa fi shallaggii maallaqaa beeku.',
      am: 'ከቤተሰብና ከአካባቢ የንግድ ልምድ አላቸው።',
      en: 'Familiarity with sales and income patterns.'
    },
    lessonOutcome: {
      om: 'Foormulaa daldalaa fi bu\'aa-baasii adda baasanii shallaguu ni danda\'u.',
      am: 'የንግድ ቀመሮችን ለይተው ማወቅና ማስላት ይችላሉ።',
      en: 'Students formulate algebraic relationships from tables of data.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, hirmaannaa daree.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በክፍል ተሳትፎ።',
      en: 'Pattern observation, table analysis, guided deduction.'
    },
    teachingAids: {
      om: 'Chaartii fakkii daldalaa, taabula herregaa.',
      am: 'የንግድ ገበታ ቻርት፣ የቁጥር ሰንጠረዥ።',
      en: 'Business growth pattern tables, board.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ የሙከራ ፈተና።',
      en: 'Formulating rules from tables, exercises.'
    }
  },
  {
    id: 'sem1-m5-w2',
    semester: 1,
    monthIndex: 4,
    weekNumber: 2,
    dateRange: '06 - 10 (5)',
    pages: '100 - 111',
    chapterNumber: 5,
    monthName: { om: 'Amajjii', am: 'ጥር', en: 'Tir (Jan)' },
    chapter: { om: 'Boqonnaa 5', am: 'ምዕራፍ 5', en: 'Chapter 5' },
    mainTopic: {
      om: '5.2 Jechoota aljebraa fi ibsoota aljebraa',
      am: '5.2 አልጀብራዊ ቃላት እና መግለጫዎች',
      en: '5.2 Algebraic Terms and Expressions (Variables & Constants)'
    },
    generalObjectives: {
      om: 'Jechoota aljebraa (jijjiiramaa, dhaabbataa) fi ibsoota aljebraa ni hubatu.',
      am: 'አልጀብራዊ ቃላትና መግለጫዎችን ይገነዘባሉ።',
      en: 'Recognize variables, constants, terms, and algebraic expressions.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa mallattoolee herregaa beeku.',
      am: 'የሂሳብ ምልክቶችን ያውቃሉ።',
      en: 'Mathematical operations and symbols.'
    },
    lessonOutcome: {
      om: 'Jechoota aljebraa fi ibsoota aljebraa gargaaramanii hima herregaa ijaaruu danda\'u.',
      am: 'አልጀብራዊ ቃላትና መግለጫዎችን በመጠቀም ሂሳባዊ ዓ.ነገሮችን መገንባት ይችላሉ።',
      en: 'Students build and evaluate simple algebraic expressions.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, hirmaannaa daree.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በክፍል ተሳትፎ።',
      en: 'Explanation of algebraic terms, symbolic representation practice.'
    },
    teachingAids: {
      om: 'Chaartii aljebraa, gabatee gurraacha.',
      am: 'የአልጀብራ መግለጫ ቻርት፣ ሰሌዳ።',
      en: 'Algebra expression cards, board.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Pirojektii, Hojii garee.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ የፕሮጀክት ሥራ፣ የቡድን ሥራ።',
      en: 'Expression translation tasks, textbook practice.'
    }
  },
  {
    id: 'sem1-m5-w3',
    semester: 1,
    monthIndex: 4,
    weekNumber: 3,
    dateRange: '13 - 15 (3)',
    pages: '1 - 111',
    monthName: { om: 'Amajjii', am: 'ጥር', en: 'Tir (Jan)' },
    chapter: { om: 'Killeessa', am: 'ክለሳ', en: 'Revision' },
    mainTopic: {
      om: 'Torbee Kleessaa Qormaata Xumura Semisteera 1ffaa',
      am: 'የመጀመሪያ መንፈቀ ዓመት ማጠቃለያ ፈተና የክለሳ ሳምንት',
      en: 'Semester 1 Comprehensive Final Exam Revision Week'
    },
    generalObjectives: {
      om: 'Barnoota Boqonnaa 1 hanga Boqonnaa 5tti barataman killeessuu fi qophii xumuraa gochuu.',
      am: 'ከምዕራፍ 1 እስከ ምዕራፍ 5 የተማሩትን በመከለስ ለማጠቃለያ ፈተና መዘጋጀት።',
      en: 'Review all core learning from Chapters 1 to 5 to prepare for semester finals.'
    },
    priorKnowledge: {
      om: 'Qabiyyeewwan Semisteera 1ffaa guutuu.',
      am: 'የሙሉ 1ኛ ወሰነ ትምህርት ይዘት።',
      en: 'All topics covered across Semester 1.'
    },
    lessonOutcome: {
      om: 'Barattoonni qormaata xumura semisteeraatiif of qopheessu.',
      am: 'ተማሪዎች ለመንፈቀ ዓመቱ ማጠቃለያ ፈተና ዝግጁ ይሆናሉ።',
      en: 'Students demonstrate readiness for semester finals.'
    },
    teachingMethod: {
      om: 'Killeessa, gaaffii fi deebii, shaakala qormaataa.',
      am: 'ክለሳ፣ ጥያቄና መልስ፣ የፈተና ልምምድ።',
      en: 'Question bank review, practice tests, peer study.'
    },
    teachingAids: {
      om: 'Qormaatawwan fakkeenyaa, gabatee.',
      am: 'የናሙና ፈተናዎች፣ ሰሌዳ።',
      en: 'Model exam papers, summary cheat-sheets.'
    },
    assessment: {
      om: 'Shaakala daree, deebii qormaata fakkeenyaa.',
      am: 'የክፍል ልምምድ፣ የናሙና ፈተና ምላሾች።',
      en: 'Mock exam evaluation, diagnostic quizzes.'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Torbee Killeessa Qormaataa',
      am: 'የክለሳ ሳምንት',
      en: 'Final Exam Revision Week'
    }
  },
  {
    id: 'sem1-m5-w4',
    semester: 1,
    monthIndex: 4,
    weekNumber: 4,
    dateRange: '16 - 22 (5)',
    pages: '1 - 111',
    monthName: { om: 'Amajjii', am: 'ጥር', en: 'Tir (Jan)' },
    chapter: { om: 'Qormaata', am: 'ፈተና', en: 'Exam' },
    mainTopic: {
      om: 'Torbee Qormaata Xumura Semisteera 1ffaa (Final Exam)',
      am: 'የመጀመሪያ መንፈቀ ዓመት ማጠቃለያ ፈተና ሳምንት',
      en: 'Semester 1 Final Examination Week'
    },
    generalObjectives: {
      om: 'Qormaata xumura semisteera 1ffaa qajeeltoon qoramanii dandeettii isaanii madaaluu.',
      am: 'የ1ኛ መንፈቀ ዓመት ማጠቃለያ ፈተና ተፈትነው ችሎታቸውን መመዘን።',
      en: 'Administer official Semester 1 final examinations.'
    },
    priorKnowledge: {
      om: 'Barnoota semisteera 1ffaa guutuu.',
      am: 'የ1ኛ መንፈቀ ዓመት ሙሉ ትምህርት።',
      en: 'Full Semester 1 curriculum.'
    },
    lessonOutcome: {
      om: 'Madaalliin semisteera 1ffaa xumuramee qabxiin barattootaa ni galmaa\'a.',
      am: 'የ1ኛ መንፈቀ ዓመት ምዘና ተጠናቆ የተማሪዎች ውጤት ይመዘገባል።',
      en: 'Semester 1 assessments completed and student scores recorded.'
    },
    teachingMethod: {
      om: 'Qormaata kennuu fi qoruu.',
      am: 'ፈተና መስጠትና ማረም።',
      en: 'Formal standardized test administration.'
    },
    teachingAids: {
      om: 'Waraqaa qormaataa, qalama.',
      am: 'የፈተና ወረቀት፣ እስክሪብቶ።',
      en: 'Printed exam booklets.'
    },
    assessment: {
      om: 'Qormaata Xumura Semisteera 1ffaa (Final Exam).',
      am: 'የ1ኛ መንፈቀ ዓመት ማጠቃለያ ፈተና።',
      en: 'Official Semester 1 Final Exam (100%).'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Qormaata Xumura Semisteera 1ffaa',
      am: 'የመጀመሪያ መንፈቀ ዓመት ማጠቃለያ ፈተና',
      en: 'Semester 1 Final Exam'
    }
  },
  {
    id: 'sem1-m5-w5',
    semester: 1,
    monthIndex: 4,
    weekNumber: 5,
    dateRange: '23 - 29 (5)',
    pages: '-',
    monthName: { om: 'Amajjii', am: 'ጥር', en: 'Tir (Jan)' },
    chapter: { om: 'Boqonnaa', am: 'ዕረፍት', en: 'Break' },
    mainTopic: {
      om: 'Torbee Boqonnaa Semisteera 1ffaa (Semester Break)',
      am: 'የመጀመሪያ መንፈቀ ዓመት የዕረፍት ሳምንት',
      en: 'Semester 1 Mid-Year Vacation & Break'
    },
    generalObjectives: {
      om: 'Boqonnaa semisteera 1ffaa fudhachuu fi qophii semisteera 2ffaatiif of qopheessuu.',
      am: 'የመንፈቀ ዓመት ዕረፍት ማድረግና ለ2ኛ መንፈቀ ዓመት መዘጋጀት።',
      en: 'Rest, semester transition, and preparation for Semester 2.'
    },
    priorKnowledge: { om: '-', am: '-', en: '-' },
    lessonOutcome: {
      om: 'Barattoonni fi barsiisonni boqonnaa fudhatu.',
      am: 'ተማሪዎችና መምህራን እረፍት ያደርጋሉ።',
      en: 'Students and teachers take scheduled recess.'
    },
    teachingMethod: { om: '-', am: '-', en: '-' },
    teachingAids: { om: '-', am: '-', en: '-' },
    assessment: { om: '-', am: '-', en: '-' },
    isExamWeek: true,
    examTitle: {
      om: 'Boqonnaa Semisteera 1ffaa',
      am: 'የመጀመሪያ መንፈቀ ዓመት ዕረፍት',
      en: 'Semester Break'
    }
  },

  // ================= SEMESTER 2: GURAANDHALA / YEKATIT / FEBRUARY =================
  {
    id: 'sem2-m6-w1',
    semester: 2,
    monthIndex: 5,
    weekNumber: 1,
    dateRange: '30 - 08 (7)',
    pages: '111 - 118',
    chapterNumber: 5,
    monthName: { om: 'Guraandhala', am: 'የካቲት', en: 'Yekatit (Feb)' },
    chapter: { om: 'Boqonnaa 5', am: 'ምዕራፍ 5', en: 'Chapter 5' },
    mainTopic: {
      om: '5.3 Hiriira lakkoofsaa fi himoota walqixxummaa bakka buusuun furuu',
      am: '5.3 መስመራዊ የእኩልነት ዓ.ነገሮችን በመተካት መፍታት',
      en: '5.3 Solving Linear Equations by Substitution'
    },
    generalObjectives: {
      om: 'Himoota walqixxummaa bakka buusuu fi furuu ni hubatu.',
      am: 'የእኩልነት ዓ.ነገሮችን በመተካት መፍታት ይገነዘባሉ።',
      en: 'Understand how to solve linear equations by substituting values.'
    },
    priorKnowledge: {
      om: 'Naannoo isaanii irraa wantoota wal-qixa ta\'an irratti beekumsa qabu.',
      am: 'ስለ እኩልነትና ሚዛናዊነት ከአካባቢ እውቀት አላቸው።',
      en: 'Concept of balance and equality.'
    },
    lessonOutcome: {
      om: 'Himoota walqixxummaa bakka buusuun furuu danda\'u.',
      am: 'የእኩልነት ዓ.ነገሮችን በመተካት መፍታት ይችላሉ።',
      en: 'Students solve single-variable equations by testing replacement values.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Balance scale model, substitution technique, board practice.'
    },
    teachingAids: {
      om: 'Chaartii mallattoolee walqixxummaa, mi\'a safaraa madaallii.',
      am: 'የእኩልነት ምልክቶች ቻርት፣ የሚዛን ማሳያ።',
      en: 'Equality sign chart, balance scales.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ፣ የሙከራ ፈተና።',
      en: 'Equation solving drills, classroom participation.'
    }
  },
  {
    id: 'sem2-m6-w2',
    semester: 2,
    monthIndex: 5,
    weekNumber: 2,
    dateRange: '11 - 15 (5)',
    pages: '118 - 122',
    chapterNumber: 5,
    monthName: { om: 'Guraandhala', am: 'የካቲት', en: 'Yekatit (Feb)' },
    chapter: { om: 'Boqonnaa 5', am: 'ምዕራፍ 5', en: 'Chapter 5' },
    mainTopic: {
      om: '5.4 Himoota walqixxummaa tarkaanfii tokkoon hojjetaman furuu',
      am: '5.4 በአንድ ስሌት ሂደት የሚሰሩ የእኩልነት ዓ.ነገሮችን መፍታት',
      en: '5.4 Solving One-Step Linear Equations (+ & - Operations)'
    },
    generalObjectives: {
      om: 'Himoota walqixxummaa shallaggii tarkaanfii tokkoon (Ida\'uu ykn Hir\'isuun) furuu ni beeku.',
      am: 'በአንድ ስሌት ሂደት የሚሰሩ የእኩልነት ዓ.ነገሮችን መፍታት ያውቃሉ።',
      en: 'Isolate variables using inverse operations in single step.'
    },
    priorKnowledge: {
      om: 'Aljebraa fi walqixxummaa beekumsa qabu.',
      am: 'ስለ አልጀብራና እኩልነት እውቀት አላቸው።',
      en: 'Prior substitution experience from previous week.'
    },
    lessonOutcome: {
      om: 'Himoota walqixxummaa tarkaanfii tokkoon furuu danda\'u.',
      am: 'በአንድ ስሌት ሂደት የእኩልነት ዓ.ነገሮችን መፍታት ይችላሉ።',
      en: 'Students find exact solutions to one-step linear equations.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Inverse operations demonstration, student board problems.'
    },
    teachingAids: {
      om: 'Chaartii fi fakkiiwwan shallaggii aljebraa.',
      am: 'የአልጀብራ ስሌት ቻርት፣ ሰሌዳ።',
      en: 'Equation balancing diagrams, workbook.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የሙከራ ፈተና።',
      en: 'Class problems, homework assignment.'
    }
  },
  {
    id: 'sem2-m6-w3',
    semester: 2,
    monthIndex: 5,
    weekNumber: 3,
    dateRange: '18 - 22 (5)',
    pages: '122 - 127',
    chapterNumber: 5,
    monthName: { om: 'Guraandhala', am: 'የካቲት', en: 'Yekatit (Feb)' },
    chapter: { om: 'Boqonnaa 5', am: 'ምዕራፍ 5', en: 'Chapter 5' },
    mainTopic: {
      om: '5.5 Himoota wal-caalmaa (hiriiraa) hojiirra oolchuu',
      am: '5.5 በተለዋዋጮች ዓ.ነገሮችን መተግበርና አለመመጣጠን (<, >, ≤, ≥)',
      en: '5.5 Linear Inequalities and Applications (<, >, ≤, ≥)'
    },
    generalObjectives: {
      om: 'Mallattoolee wal-caalmaa (<, >, ≤, ≥) fayyadamuun himoota wal-caalmaa furuu ni beeku.',
      am: 'የአለመመጣጠን ምልክቶችን በመጠቀም አለመመጣጠኖችን መፍታት ያውቃሉ።',
      en: 'Interpret inequality symbols and graph solution sets.'
    },
    priorKnowledge: {
      om: 'Waldorgomsiisa lakkoofsotaa duraan beeku.',
      am: 'ቁጥሮችን ማወዳደርን ያውቃሉ።',
      en: 'Greater than / less than comparative rules.'
    },
    lessonOutcome: {
      om: 'Himoota wal-caalmaa adda baasuu fi furuu baru.',
      am: 'የአለመመጣጠን ዓ.ነገሮችን መፍታት ይችላሉ።',
      en: 'Students solve and graph basic linear inequalities on a line.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Number line ray demonstration, student exercises.'
    },
    teachingAids: {
      om: 'Chaartii mallattoolee wal-caalmaa, sarara lakkoofsaa.',
      am: 'የአለመመጣጠን ምልክቶች ቻርት፣ የቁጥር መስመር።',
      en: 'Inequality signs chart (<, >, ≤, ≥), number line board.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Inequality graphing worksheets, quizzes.'
    }
  },
  {
    id: 'sem2-m6-w4',
    semester: 2,
    monthIndex: 5,
    weekNumber: 4,
    dateRange: '25 - 29 (5)',
    pages: '128 - 131',
    chapterNumber: 6,
    monthName: { om: 'Guraandhala', am: 'የካቲት', en: 'Yekatit (Feb)' },
    chapter: { om: 'Boqonnaa 6', am: 'ምዕራፍ 6', en: 'Chapter 6' },
    mainTopic: {
      om: '6.1 Odeeffannoo walitti qabuu fi qindeessuu',
      am: '6.1 መረጃዎችን መሰብሰብና ማደራጀት',
      en: '6.1 Data Collection, Organization and Frequency Tables'
    },
    generalObjectives: {
      om: 'Mala odeeffannoo (ragaa) walitti qabuu fi gabatee ragaatiin qindeessuu ni beeku.',
      am: 'መረጃዎችን የመሰብሰብና የማደራጀት ዘዴን ያውቃሉ።',
      en: 'Gather data using tallies and organize it in frequency tables.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa taabula ragaa beeku.',
      am: 'የመረጃ ሰንጠረዥን ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Tally marks and counting tables from Grade 4.'
    },
    lessonOutcome: {
      om: 'Odeeffannoowwan naannoo isaanii garaagaraa walitti qabanii qindeessu.',
      am: 'የተለያዩ መረጃዎችን በአግባቡ አደራጅተው ያቀርባሉ።',
      en: 'Students conduct simple classroom surveys and tabulate findings.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Hands-on class survey, frequency counting, tabulation.'
    },
    teachingAids: {
      om: 'Chaartii fi taabula odeeffannoo, ragaalee daree.',
      am: 'የመረጃ ሰንጠረዥ ቻርት፣ የክፍል መረጃዎች።',
      en: 'Tally charts, survey sheets, board.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Student survey project, frequency table exercises.'
    }
  },

  // ================= SEMESTER 2: BITOOTESSA / MEGABIT / MARCH =================
  {
    id: 'sem2-m7-w1',
    semester: 2,
    monthIndex: 6,
    weekNumber: 1,
    dateRange: '02 - 06 (5)',
    pages: '131 - 137',
    chapterNumber: 6,
    monthName: { om: 'Bitootessa', am: 'መጋቢት', en: 'Megabit (Mar)' },
    chapter: { om: 'Boqonnaa 6', am: 'ምዕራፍ 6', en: 'Chapter 6' },
    mainTopic: {
      om: '6.2 Giraafii sararaa fi giraafii baarii dubbisuu fi hojjechuu',
      am: '6.2 ባር ግራፍና መስመራዊ ግራፍን መስራትና መተርጎም',
      en: '6.2 Constructing and Interpreting Bar Graphs and Line Graphs'
    },
    generalObjectives: {
      om: 'Giraafii baarii fi sararaa dubbisuu, hiikuu fi ragaa irraa giraafii hojjechuu ni beeku.',
      am: 'ባር ግራፍና መስመራዊ ግራፍን መስራትና መተግበር ያውቃሉ።',
      en: 'Construct bar charts and line plots; interpret data trends.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa giraafii baarii beeku.',
      am: 'ስለ ባር ግራፍ ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Basic bar graphs from Grade 4.'
    },
    lessonOutcome: {
      om: 'Gosoota giraafota garaagaraa dubbisuu fi adda baasuu danda\'u.',
      am: 'የተለያዩ የግራፍ አይነቶችን ማንበብና መለየት ይችላሉ።',
      en: 'Students draw scaled bar and line graphs and explain patterns.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Drawing demonstration on graph paper, interpretation Q&A.'
    },
    teachingAids: {
      om: 'Chaartii giraafotaa, waraqaa giraafii, sarartuu.',
      am: 'የግራፍ ቻርት፣ የግራፍ ወረቀት፣ ማስመሪያ።',
      en: 'Grid paper, rulers, bar chart diagrams.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ፣ የሙከራ ፈተና።',
      en: 'Graph drawing projects, data interpretation questions.'
    }
  },
  {
    id: 'sem2-m7-w2',
    semester: 2,
    monthIndex: 6,
    weekNumber: 2,
    dateRange: '09 - 13 (5)',
    pages: '137 - 141',
    chapterNumber: 6,
    monthName: { om: 'Bitootessa', am: 'መጋቢት', en: 'Megabit (Mar)' },
    chapter: { om: 'Boqonnaa 6', am: 'ምዕራፍ 6', en: 'Chapter 6' },
    mainTopic: {
      om: '6.3 Giddu-galeessa lakkoofsotaa (Mean) shallaguu',
      am: '6.3 የቁጥሮችን አማካይ (Mean) መፈለግና ማስላት',
      en: '6.3 Calculating the Arithmetic Mean (Average)'
    },
    generalObjectives: {
      om: 'Giddu-galeessa lakkoofsotaa akkamitti akka argatan beekuun shallaguu ni danda\'u.',
      am: 'የቁጥሮችን አማካይ እንዴት እንደሚገኝ አውቀው ያሰላሉ።',
      en: 'Calculate the arithmetic mean by summing values and dividing by count.'
    },
    priorKnowledge: {
      om: 'Ida\'uu fi hiruu lakkoofsotaa duraan beeku.',
      am: 'መደመርና ማካፈልን ያውቃሉ።',
      en: 'Addition and multi-digit division.'
    },
    lessonOutcome: {
      om: 'Mala giddu-galeessa lakkoofsotaa itti argatan baruun ragaalee daree shallagu.',
      am: 'የቁጥሮችን አማካይ በማስላት የተማሪዎችን አማካይ ውጤት ያሰላሉ።',
      en: 'Students find averages for test scores, temperatures, and heights.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Formula presentation (Sum/N), worked examples, practice.'
    },
    teachingAids: {
      om: 'Chaartii fi ragaalee lakkoofsaa, gabatee.',
      am: 'የአማካይ ቀመር ቻርት፣ የክፍል መረጃዎች።',
      en: 'Score tables, calculator/board, data sheets.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Mean calculation worksheets, word problems.'
    }
  },
  {
    id: 'sem2-m7-w3',
    semester: 2,
    monthIndex: 6,
    weekNumber: 3,
    dateRange: '16 - 20 (5)',
    pages: '141 - 150',
    chapterNumber: 6,
    monthName: { om: 'Bitootessa', am: 'መጋቢት', en: 'Megabit (Mar)' },
    chapter: { om: 'Boqonnaa 6', am: 'ምዕራፍ 6', en: 'Chapter 6' },
    mainTopic: {
      om: '6.4 Carraa ta\'uu fi ta\'uu dhabuu wantootaa tilmaamuu',
      am: '6.4 በቀላል ሙከራዎች የመሆን እድልን በመቶኛ፣ ሳንቲምና ባለ 6 ገጽ ዳይስ በመጠቀም መገመት',
      en: '6.4 Introduction to Probability (Coin Toss & 6-Sided Dice)'
    },
    generalObjectives: {
      om: 'Carraa ta\'uu fi ta\'uu dhabuu wantootaa saantima fi daayisii fuula 6 fayyadamuun shallaguu ni beeku.',
      am: 'የመሆን እድልን በሳንቲምና ዳይስ ሙከራዎች መገመት ያውቃሉ።',
      en: 'Estimate likelihood of simple outcomes using coin flips and 6-sided dice.'
    },
    priorKnowledge: {
      om: 'Naannoo irraa taphoota carraa qaban beeku.',
      am: 'የእድል ጨዋታዎችን ያውቃሉ።',
      en: 'Games of chance from daily activities.'
    },
    lessonOutcome: {
      om: 'Carraa wantootaa tilmaamuun dandeettii herregaa isaanii gabbifatu.',
      am: 'የዕድል ሙከራዎችን በማድረግ መደምደሚያ ላይ ይደርሳሉ።',
      en: 'Students record outcomes and express probabilities as fractions.'
    },
    teachingMethod: {
      om: 'Ibsa, shaakala qabatamaa, marii garee, gaaffii fi deebii.',
      am: 'በገለፃ፣ በተግባራዊ ሙከራ፣ በውይይት፣ በጥያቄና መልስ።',
      en: 'Classroom probability experiments, tallying trial frequencies.'
    },
    teachingAids: {
      om: 'Saantima, daayisii fuula jahaa (kubii).',
      am: 'የብር ሳንቲም፣ ባለ 6 ገጽ ዳይስ/ኩብ።',
      en: 'Coins, six-sided dice, probability spinners.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Experiment reporting sheet, probability quiz.'
    }
  },
  {
    id: 'sem2-m7-w4',
    semester: 2,
    monthIndex: 6,
    weekNumber: 4,
    dateRange: '23 - 27 (5)',
    pages: '150 - 155',
    chapterNumber: 7,
    monthName: { om: 'Bitootessa', am: 'መጋቢት', en: 'Megabit (Mar)' },
    chapter: { om: 'Boqonnaa 7', am: 'ምዕራፍ 7', en: 'Chapter 7' },
    mainTopic: {
      om: '7.1 Dheerina, bal\'ina fi dalga boca ji\'oomeetirii safaruu fi ramaduu',
      am: '7.1 እርዝመት፣ ወርድ እና ቁመት በመጠቀም በባህሪያቸው መመደብ',
      en: '7.1 Categorizing Geometric Shapes by Length, Width & Height'
    },
    generalObjectives: {
      om: 'Dheerina, bal\'ina fi dalga bocoota ji\'oomeetirii fayyadamuun amala isaaniitiin ramaduu ni beeku.',
      am: 'እርዝመት፣ ወርድ እና ቁመት በመጠቀም ቅርጾችን በባህሪያቸው መመደብ ያውቃሉ።',
      en: 'Identify 2D and 3D geometric shapes by their dimensional attributes.'
    },
    priorKnowledge: {
      om: 'Bocoota bu\'uuraa kutaa 4ffaa irraa beeku.',
      am: 'መሠረታዊ ቅርጾችን ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Basic 2D shapes (rectangles, triangles).'
    },
    lessonOutcome: {
      om: 'Bocoota amala isaaniin adda baasanii ramaduu danda\'u.',
      am: 'ቅርጾችን በባህሪያቸው መመደብ ይችላሉ።',
      en: 'Students classify solids based on dimensions and planar faces.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Physical solid observation, measurements, attribute listing.'
    },
    teachingAids: {
      om: 'Meetira, sarartuu, bocoota jajjaboo.',
      am: 'ሜትር፣ ማስመሪያ፣ ጠጣር ቅርጾች።',
      en: 'Rulers, measuring tape, 3D geometric block set.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Dimension measurement tasks, shape sorting assignment.'
    }
  },

  // ================= SEMESTER 2: EBLA / MIYAZYA / APRIL =================
  {
    id: 'sem2-m8-w1',
    semester: 2,
    monthIndex: 7,
    weekNumber: 1,
    dateRange: '30 - 04 (4)',
    pages: '155 - 160',
    chapterNumber: 7,
    monthName: { om: 'Ebla', am: 'ሚያዝያ', en: 'Miyazya (Apr)' },
    chapter: { om: 'Boqonnaa 7', am: 'ምዕራፍ 7', en: 'Chapter 7' },
    mainTopic: {
      om: '7.2 Bocoota ji\'oomeetirii gosa isaaniitiin ramaduu (Piriizimii, Piraamidii, Siilindarii, Kiroo)',
      am: '7.2 ቅርጾችን ትርጉማቸውን መሰረት በማድረግ ፕሪዝም፣ ፒራሚድ፣ ሲሊንደር እና ኮን በማለት መመደብ',
      en: '7.2 Classifying Solids: Prisms, Pyramids, Cylinders, and Cones'
    },
    generalObjectives: {
      om: 'Bocoota ji\'oomeetirii ilaaluun piriizimii, piraamidii, siilindarii fi koonii jedhanii ramaduu ni beeku.',
      am: 'ፕሪዝም፣ ፒራሚድ፣ ሲሊንደር እና ኮን ቅርጾችን መመደብ ያውቃሉ።',
      en: 'Identify and describe polyhedra and curved solids: prisms, pyramids, cylinders, cones.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa bocoota ji\'oomeetirii beeku.',
      am: 'ስለ ቅርጾች ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Prior shape exposure.'
    },
    lessonOutcome: {
      om: 'Bocoota jajjaboo garaagaraa maqaa fi amala isaaniin adda baasuu danda\'u.',
      am: 'ጠጣር ቅርጾችን በስም እና በባህሪያቸው መለየት ይችላሉ።',
      en: 'Students accurately name and classify 3D geometric shapes.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, hirmaannaa daree.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በክፍል ተሳትፎ።',
      en: 'Handling tangible models, net folding demonstrations.'
    },
    teachingAids: {
      om: 'Bocoota jajjaboo (chaartii fi moodeelota qabatamaa).',
      am: 'ጠጣር ምስሎች፣ ፕሪዝም፣ ፒራሚድ፣ ሲሊንደር እና ኮን ሞዴሎች።',
      en: 'Prisms, pyramids, cylinders, cones, unfolding nets.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Hojii dhuunfaa.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የግል ሥራ።',
      en: 'Identification quizzes, 3D shape sorting worksheets.'
    }
  },
  {
    id: 'sem2-m8-w2',
    semester: 2,
    monthIndex: 7,
    weekNumber: 2,
    dateRange: '07 - 11 (5)',
    pages: '160 - 164',
    chapterNumber: 7,
    monthName: { om: 'Ebla', am: 'ሚያዝያ', en: 'Miyazya (Apr)' },
    chapter: { om: 'Boqonnaa 7', am: 'ምዕራፍ 7', en: 'Chapter 7' },
    mainTopic: {
      om: '7.3 Amala bocoota jajjaboo walbira qabuu (fi Qormaata Walakkaa Semisteera 2ffaa)',
      am: '7.3 ጠጣር ምስሎችን በባህሪያቸው ማወዳደር (የ2ኛ መንፈቀ ዓመት አጋማሽ ፈተና)',
      en: '7.3 Comparing Properties of Solids (& Semester 2 Midterm Exam)'
    },
    generalObjectives: {
      om: 'Amala bocoota jajjaboo (fuula, roga, qoochoo) walbira qabuu ni hubatu; qormaata walakkaa semisteera 2ffaa qajeeltoon qoramu.',
      am: 'ጠጣር ምስሎችን ማወዳደር ያውቃሉ፤ አጋማሽ ፈተና ይፈተናሉ።',
      en: 'Compare faces, edges, and vertices (Euler’s characteristic); sit for Midterm 2.'
    },
    priorKnowledge: {
      om: 'Bocoota ji\'oomeetirii torban darbe barataniiru.',
      am: 'ባለፈው ሳምንት የተማሩት የቅርጾች እውቀት።',
      en: '3D solid identification.'
    },
    lessonOutcome: {
      om: 'Bocoota jajjaboo amala isaaniin walbira qabu; qormaata walakkaa qoramu.',
      am: 'ጠጣር ምስሎችን በባህሪያቸው ያወዳድራሉ፤ ፈተናውን ይወስዳሉ።',
      en: 'Students tabulate faces, vertices, and edges; complete Midterm 2.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, qormaata kennuu.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ፈተና በመስጠት።',
      en: 'Comparative analysis, Midterm examination administration.'
    },
    teachingAids: {
      om: 'Moodeelota bocootaa, waraqaa qormaataa.',
      am: 'የቅርጽ ሞዴሎች፣ የፈተና ወረቀት።',
      en: 'Geometric solid kits, printed midterm exam sheets.'
    },
    assessment: {
      om: 'Qormaata Walakkaa Semisteera 2ffaa, Hojii daree, Hojii manaa.',
      am: 'የ2ኛ መንፈቀ ዓመት አጋማሽ ፈተና፣ የክፍልና የቤት ሥራ።',
      en: 'Semester 2 Midterm Exam, homework check.'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Qormaata Walakkaa Semisteera 2ffaa (07 - 09)',
      am: 'የ2ኛ መንፈቀ ዓመት አጋማሽ ፈተና (07 - 09)',
      en: 'Semester 2 Midterm Exam (Dates 07 - 09)'
    }
  },
  {
    id: 'sem2-m8-w3',
    semester: 2,
    monthIndex: 7,
    weekNumber: 3,
    dateRange: '14 - 18 (5)',
    pages: '166 - 169',
    chapterNumber: 8,
    monthName: { om: 'Ebla', am: 'ሚያዝያ', en: 'Miyazya (Apr)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.1 Sararoota: Sarara qajeelaa, wal-qaxxaamuraa fi wal-diraa',
      am: '8.1 መስመሮች - ትይዩና ተቋራጭ መስመሮች',
      en: '8.1 Lines: Straight, Intersecting, and Parallel Lines'
    },
    generalObjectives: {
      om: 'Gosoota sararootaa: sarara wal-diraa (parallel), wal-qaxxaamuraa fi kofla-qajeelaa uumu adda baasuu ni beeku.',
      am: 'ትይዩና ተቋራጭ መስመሮችን መለየት ያውቃሉ።',
      en: 'Distinguish between parallel, perpendicular, and intersecting lines.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa sarara qajeelaa beeku.',
      am: 'ቀጥታ መስመሮችን ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Straight lines and segments.'
    },
    lessonOutcome: {
      om: 'Gosoota sararaa adda baasuu fi sararuu danda\'u.',
      am: 'የትይዩና ተቋራጭ መስመሮችን ለይተው መሳል ይችላሉ።',
      en: 'Students accurately draw and identify parallel and intersecting lines.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Ruler and set-square demonstration on board, drawing drills.'
    },
    teachingAids: {
      om: 'Sarartuu, erbiisaa, qalama, gabatee.',
      am: 'ማስመሪያ፣ እስክሪብቶ፣ እርሳስ፣ ሰሌዳ።',
      en: 'Set squares, long wooden rulers, chalkboard compass.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Drawing exercises, notebook line checks.'
    }
  },
  {
    id: 'sem2-m8-w4',
    semester: 2,
    monthIndex: 7,
    weekNumber: 4,
    dateRange: '21 - 25 (3)',
    pages: '170 - 175',
    chapterNumber: 8,
    monthName: { om: 'Ebla', am: 'ሚያዝያ', en: 'Miyazya (Apr)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.1.2 Sararoota sirrii fi wal-qaxxaamuroota safaruu',
      am: '8.1.2 ውስን ቀጥታ መስመሮችን መገመትና መለካት',
      en: '8.1.2 Estimating and Measuring Line Segments Precisely'
    },
    generalObjectives: {
      om: 'Sararoota murtaa\'oo safaruu fi fageenya gidduu isaanii tilmaamuu ni beeku.',
      am: 'ውስን ቀጥታ መስመሮችን መገመትና መለካት ያውቃሉ።',
      en: 'Estimate and measure segment lengths in millimeters and centimeters.'
    },
    priorKnowledge: {
      om: 'Sarartuudhaan safaruu duraan beeku.',
      am: 'በማስመሪያ መለካትን ያውቃሉ።',
      en: 'Using standard rulers.'
    },
    lessonOutcome: {
      om: 'Gosoota sararaa safaruu fi safara isaanii galmeessuu danda\'u.',
      am: 'መስመሮችን ለክተው ትክክለኛ ልካቸውን መመዝገብ ይችላሉ።',
      en: 'Students develop high precision in estimating and measuring segments.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, gabatee.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በሰሌዳ ላይ።',
      en: 'Pair measuring activities, estimation games, board checks.'
    },
    teachingAids: {
      om: 'Sarartuu fi qalama.',
      am: 'ማስመሪያና እርሳስ።',
      en: 'Graduated rulers, calipers, printed segment worksheets.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Precision measurement drills, homework.'
    }
  },
  {
    id: 'sem2-m8-w5',
    semester: 2,
    monthIndex: 7,
    weekNumber: 5,
    dateRange: '28 - 02 (5)',
    pages: '175 - 178',
    chapterNumber: 8,
    monthName: { om: 'Ebla', am: 'ሚያዝያ', en: 'Miyazya (Apr)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.2 Koflaa fi safartuu koflaa (Digirii)',
      am: '8.2 አንግሎችንና ልካቸውን ማወቅ (ዲግሪ)',
      en: '8.2 Understanding Angles and Degree Units (°)'
    },
    generalObjectives: {
      om: 'Koflaa fi safartuu koflaa (digirii) pirootiraaktariin safaruu ni beeku.',
      am: 'አንግሎችንና ልካቸውን በፕሮትራክተር መለካት ያውቃሉ።',
      en: 'Define angles as rotations and measure them in degrees using protractors.'
    },
    priorKnowledge: {
      om: 'Kutaa 4ffaa irraa kofla beeku.',
      am: 'ስለ አንግል ከ4ኛ ክፍል ያውቃሉ።',
      en: 'Basic angle awareness.'
    },
    lessonOutcome: {
      om: 'Gosoota koflaa fi safartuu isaanii pirootiraaktariin adda baasuu danda\'u.',
      am: 'አንግሎችን በፕሮትራክተር ለክተው ማወቅ ይችላሉ።',
      en: 'Students align protractor centers and read acute/obtuse degree scales.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, hirmaannaa daree.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በክፍል ተሳትፎ።',
      en: 'Protractor demonstration on board, individual student practice.'
    },
    teachingAids: {
      om: 'Pirootiraaktarii fi sarartuu.',
      am: 'ፕሮትራክተርና ማስመሪያ።',
      en: 'Protractors, angle wheels, geometrical board tool.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Angle measurement test, drawing specified angles.'
    }
  },

  // ================= SEMESTER 2: CAAMSAA / GINBOT / MAY =================
  {
    id: 'sem2-m9-w1',
    semester: 2,
    monthIndex: 8,
    weekNumber: 1,
    dateRange: '05 - 09 (5)',
    pages: '178 - 188',
    chapterNumber: 8,
    monthName: { om: 'Caamsaa', am: 'ግንቦት', en: 'Ginbot (May)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.2.2 Gosoota koflaa (Kofla qajeelaa, saraa, qara) fi safartuu isaanii',
      am: '8.2.2 የአንግል አይነቶች (ቀጥተኛ፣ ዝርግ፣ አጣዳፊ) እና ልካቸው',
      en: '8.2.2 Types of Angles: Acute, Right, Obtuse, Straight and Reflex'
    },
    generalObjectives: {
      om: 'Gosoota koflaa: Kofla qara (<90°), Kofla qajeelaa (=90°), Kofla saraa (>90°) adda baasuu ni beeku.',
      am: 'የአንግል አይነቶችንና ልካቸውን ለይተው ያውቃሉ።',
      en: 'Classify angles by measure: Acute (<90°), Right (90°), Obtuse (90°-180°).'
    },
    priorKnowledge: {
      om: 'Kofla pirootiraaktariin safaruu torban darbe barataniiru.',
      am: 'አንግሎችን በፕሮትራክተር መለካትን ተምረዋል።',
      en: 'Using protractors from the prior week.'
    },
    lessonOutcome: {
      om: 'Gosoota koflaa fi safartuu isaanii sirriitti adda baasuu danda\'u.',
      am: 'የአንግል አይነቶችን ለይተው መሳልና መለካት ይችላሉ።',
      en: 'Students identify and construct acute, right, and obtuse angles.'
    },
    teachingMethod: {
      om: 'Ibsa, marii garee, gaaffii fi deebii, hirmaannaa daree.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በክፍል ተሳትፎ።',
      en: 'Angle identification flashcards, drawing prompts on board.'
    },
    teachingAids: {
      om: 'Pirootiraaktarii, sarartuu, bocoota rog-sadii.',
      am: 'ፕሮትራክተር፣ ማስመሪያ፣ ሶስት ማዕዘን ቅርጾች።',
      en: 'Set squares, geometric models, protractors.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Pirojektii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የፕሮጀክት ሥራ።',
      en: 'Angle classification sheets, notebook drawings.'
    }
  },
  {
    id: 'sem2-m9-w2',
    semester: 2,
    monthIndex: 8,
    weekNumber: 2,
    dateRange: '12 - 16 (5)',
    pages: '188 - 193',
    chapterNumber: 8,
    monthName: { om: 'Caamsaa', am: 'ግንቦት', en: 'Ginbot (May)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.3 Sararoota simmeetirii (sararoota qoodaa)',
      am: '8.3 የምጥጥን (የተመጣጣኝነት) መስመሮች',
      en: '8.3 Lines of Symmetry in 2D Polygons'
    },
    generalObjectives: {
      om: 'Sararoota simmeetirii (boca tokko wal-qixatti bakka lamatti qoodu) hojjechuu ni beeku.',
      am: 'የምጥጥን መስመሮችን ማወቅና መስራት ያውቃሉ።',
      en: 'Identify and construct lines of reflective symmetry in polygons.'
    },
    priorKnowledge: {
      om: 'Naannoo irraa wantoota wal-qixa qoodaman beeku.',
      am: 'ከተፈጥሮና ከአካባቢ የተመጣጣኝ ነገሮች እውቀት።',
      en: 'Bilateral symmetry in nature and leaves.'
    },
    lessonOutcome: {
      om: 'Sararoota simmeetirii bocoota garaagaraa irratti sararuu danda\'u.',
      am: 'የምጥጥን መስመሮችን በተለያዩ ቅርጾች ላይ መሳል ይችላሉ።',
      en: 'Students fold and draw multiple symmetry axes for various regular shapes.'
    },
    teachingMethod: {
      om: 'Ibsa, shaakala waraqaa dachaasuu, marii garee, gaaffii fi deebii.',
      am: 'በገለፃ፣ በወረቀት እጥፋት ተግባር፣ በውይይት፣ በጥያቄና መልስ።',
      en: 'Paper folding and reflection exercises, mirror reflections.'
    },
    teachingAids: {
      om: 'Sarartuu, waraqaalee garaagaraa, haamtuu.',
      am: 'ማስመሪያ፣ ወረቀቶች፣ መቀስ፣ መስተዋት።',
      en: 'Cutout polygons, small safety mirrors, scissors.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Qorumsa yaalii.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የሙከራ ፈተና።',
      en: 'Symmetry drawing sheets, cut-and-fold evaluation.'
    }
  },
  {
    id: 'sem2-m9-w3',
    semester: 2,
    monthIndex: 8,
    weekNumber: 3,
    dateRange: '19 - 23 (4)',
    pages: '193 - 199',
    chapterNumber: 8,
    monthName: { om: 'Caamsaa', am: 'ግንቦት', en: 'Ginbot (May)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.4 Qabxii fi Kallattii (Safara fi kallattii)',
      am: '8.4 ነጥብ፣ አቅጣጫ እና ልኬት',
      en: '8.4 Points, Cardinal Directions (N, S, E, W) and Bearings'
    },
    generalObjectives: {
      om: 'Hiika safaraa fi kallattii (Kaaba, Kibba, Baha, Dhiha) herrega keessatti hubatu.',
      am: 'የአቅጣጫና የልኬት ትርጉም ይገነዘባሉ።',
      en: 'Locate points using coordinate grids and cardinal directions.'
    },
    priorKnowledge: {
      om: 'Saayinsii hawaasaa irraa kallattiiwwan beeku.',
      am: 'ከህብረተሰብ ሳይንስ አቅጣጫዎችን ያውቃሉ።',
      en: 'Cardinal compass directions from social studies.'
    },
    lessonOutcome: {
      om: 'Safara kallattii fi qabxiiwwan adda baasuu danda\'u.',
      am: 'አቅጣጫንና ልኬትን መለየት ይችላሉ።',
      en: 'Students plot paths and describe movement using compass bearings and scale.'
    },
    teachingMethod: {
      om: 'Ibsa, marii daree, gaaffii fi deebii, hirmaannaa daree.',
      am: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ በክፍል ተሳትፎ።',
      en: 'Classroom map traversal, compass rose demonstration.'
    },
    teachingAids: {
      om: 'Sarartuu, meetira, koompaasii kallattii.',
      am: 'ማስመሪያ፣ ሜትር፣ ኮምፓስ።',
      en: 'Compass rose, school ground map, meter sticks.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Hojii dhuunfaa.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የግል ሥራ።',
      en: 'Map reading exercises, direction quizzes.'
    }
  },
  {
    id: 'sem2-m9-w4',
    semester: 2,
    monthIndex: 8,
    weekNumber: 4,
    dateRange: '26 - 30 (5)',
    pages: '199 - 206',
    chapterNumber: 8,
    monthName: { om: 'Caamsaa', am: 'ግንቦት', en: 'Ginbot (May)' },
    chapter: { om: 'Boqonnaa 8', am: 'ምዕራፍ 8', en: 'Chapter 8' },
    mainTopic: {
      om: '8.5 Hojiiwwan shaakalaa sarara, koflaa fi safaraa',
      am: '8.5 የመስመሮች፣ የአንግሎች እና የልኬቶች የተግባር ስራ',
      en: '8.5 Practical Synthesis: Lines, Angles and Measurement'
    },
    generalObjectives: {
      om: 'Hojiiwwan sararaa, koflaa fi safaraa qabatamaan hojjechuu fi madaallii xumuruu ni beeku.',
      am: 'የመስመሮች፣ አንግሎችና ልኬቶች የተግባር ስራዎችን ያውቃሉ።',
      en: 'Synthesize geometry concepts into integrated physical projects.'
    },
    priorKnowledge: {
      om: 'Boqonnaa 8 guutuu barataniiru.',
      am: 'የምዕራፍ 8 ሙሉ ትምህርቶች።',
      en: 'All topics from Chapter 8.'
    },
    lessonOutcome: {
      om: 'Qabatamaan sarara, kofla fi safara hojjetanii dandeettii ji\'oomeetirii cimsatu.',
      am: 'የጂኦሜትሪ ተግባራዊ ክህሎታቸውን ያዳብራሉ።',
      en: 'Students build composite geometric figures accurately.'
    },
    teachingMethod: {
      om: 'Ibsa, shaakala daree, marii garee, gaaffii fi deebii.',
      am: 'በገለፃ፣ በክፍል የተግባር ልምምድ፣ በቡድን ውይይት።',
      en: 'Studio project work, group presentation.'
    },
    teachingAids: {
      om: 'Sarartuu, meetira, pirootiraaktarii.',
      am: 'ማስመሪያ፣ ሜትር፣ ፕሮትራክተር።',
      en: 'Protractors, geometric construction kits, large paper.'
    },
    assessment: {
      om: 'Hojii daree, Hojii manaa, Hojii garee, Hojii dhuunfaa.',
      am: 'የክፍል ሥራ፣ የቤት ሥራ፣ አጠቃላይ/የቡድን ሥራ፣ የግል ሥራ።',
      en: 'Geometric portfolio evaluation, practical test.'
    }
  },

  // ================= SEMESTER 2: WAXABAJJII / SENE / JUNE =================
  {
    id: 'sem2-m10-w1',
    semester: 2,
    monthIndex: 9,
    weekNumber: 1,
    dateRange: '03 - 07 (5)',
    pages: '111 - 206',
    monthName: { om: 'Waxabajjii', am: 'ሰኔ', en: 'Sene (Jun)' },
    chapter: { om: 'Killeessa', am: 'ክለሳ', en: 'Revision' },
    mainTopic: {
      om: 'Torbee Kleessaa Qormaata Xumura Semisteera 2ffaa',
      am: 'የሁለተኛ መንፈቀ ዓመት ማጠቃለያ ፈተና የክለሳ ሳምንት',
      en: 'Semester 2 Comprehensive Final Exam Revision Week'
    },
    generalObjectives: {
      om: 'Barnoota Semisteera 2ffaa (Boqonnaa 5 - 8) killeessuu fi qophii qormaata xumuraa gochuu.',
      am: 'የ2ኛ መንፈቀ ዓመት ትምህርቶችን በመከለስ ለማጠቃለያ ፈተና መዘጋጀት።',
      en: 'Review all Semester 2 curriculum (Chapters 5 through 8).'
    },
    priorKnowledge: {
      om: 'Barnoota semisteera 2ffaa guutuu.',
      am: 'የ2ኛ መንፈቀ ዓመት ሙሉ ይዘት።',
      en: 'Full Semester 2 learning objectives.'
    },
    lessonOutcome: {
      om: 'Barattoonni qormaata xumura waggaatiif qophaa\'u.',
      am: 'ተማሪዎች ለዓመቱ ማጠቃለያ ፈተና በሚገባ ይዘጋጃሉ።',
      en: 'Students demonstrate complete readiness for final year-end exams.'
    },
    teachingMethod: {
      om: 'Killeessa, gaaffii fi deebii, shaakala qormaataa.',
      am: 'ክለሳ፣ ጥያቄና መልስ፣ የፈተና ልምምድ።',
      en: 'Problem-solving marathons, past exam reviews.'
    },
    teachingAids: {
      om: 'Qormaatawwan fakkeenyaa, gabatee.',
      am: 'የናሙና ፈተናዎች፣ ሰሌዳ።',
      en: 'Model exam sheets, review formula charts.'
    },
    assessment: {
      om: 'Hirmaannaa killeessaa, qormaata yaalii.',
      am: 'የክለሳ ተሳትፎ፣ የሙከራ ፈተናዎች።',
      en: 'Revision questions and readiness diagnostics.'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Torbee Killeessa Qormaataa',
      am: 'የክለሳ ሳምንት',
      en: 'Final Revision Week'
    }
  },
  {
    id: 'sem2-m10-w2',
    semester: 2,
    monthIndex: 9,
    weekNumber: 2,
    dateRange: '11 - 17 (5)',
    pages: '111 - 206',
    monthName: { om: 'Waxabajjii', am: 'ሰኔ', en: 'Sene (Jun)' },
    chapter: { om: 'Qormaata', am: 'ፈተና', en: 'Finals' },
    mainTopic: {
      om: 'Torbee Qormaata Xumura Semisteera 2ffaa (Year-End Final Exam)',
      am: 'የሁለተኛ መንፈቀ ዓመት ማጠቃለያ ፈተና ሳምንት',
      en: 'Semester 2 & Annual Final Examination Week'
    },
    generalObjectives: {
      om: 'Qormaata xumura semisteera 2ffaa fi xumura waggaa qajeeltoon qoramu.',
      am: 'የ2ኛ መንፈቀ ዓመትና የዓመቱ ማጠቃለያ ፈተና መፈተን።',
      en: 'Administer final year-end promotion examinations.'
    },
    priorKnowledge: {
      om: 'Barnoota waggaa guutuu.',
      am: 'የዓመቱ ሙሉ ትምህርት።',
      en: 'Full academic year math curriculum.'
    },
    lessonOutcome: {
      om: 'Madaalliin xumura waggaa xumuramee qabxiin barattootaa ni murtaa\'a.',
      am: 'የዓመቱ ምዘና ተጠናቆ የተማሪዎች ዓመታዊ ውጤት ይወሰናል።',
      en: 'Official assessment finalized and stored in grade rosters.'
    },
    teachingMethod: {
      om: 'Qormaata qajeeltoon kennuu fi qoruu.',
      am: 'ፈተና መስጠትና ማረም።',
      en: 'Standardized institutional testing.'
    },
    teachingAids: {
      om: 'Waraqaa qormaataa, qalama.',
      am: 'የፈተና ወረቀት፣ እስክሪብቶ።',
      en: 'Official examination papers.'
    },
    assessment: {
      om: 'Qormaata Xumura Semisteera 2ffaa.',
      am: 'የ2ኛ መንፈቀ ዓመት ማጠቃለያ ፈተና።',
      en: 'Final Comprehensive Exam (100%).'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Qormaata Xumura Semisteera 2ffaa',
      am: 'የሁለተኛ መንፈቀ ዓመት ማጠቃለያ ፈተና',
      en: 'Annual Final Exam'
    }
  },
  {
    id: 'sem2-m10-w3',
    semester: 2,
    monthIndex: 9,
    weekNumber: 3,
    dateRange: '18 - 21 (4)',
    pages: '-',
    monthName: { om: 'Waxabajjii', am: 'ሰኔ', en: 'Sene (Jun)' },
    chapter: { om: 'Qulqullina', am: 'ውጤት ማጠናቀቅ', en: 'Roster' },
    mainTopic: {
      om: 'Torbee Qulqullina Bu\'aa Barattootaa fi Rosterii Guutuu',
      am: 'የተማሪዎች ውጤት የሚጠናቀቅበትና ሮስተር የሚዘጋጅበት ሳምንት',
      en: 'Score Compilation, Verification and Roster Finalization'
    },
    generalObjectives: {
      om: 'Qabxiiwwan madaallii barattootaa walitti fiduun rosterii fi ripportii qopheessuu.',
      am: 'የተማሪዎችን ውጤቶች በማቀናጀት ሮስተርና ሪፖርት ማዘጋጀት።',
      en: 'Aggregate continuous assessments and final exam scores into official rosters.'
    },
    priorKnowledge: {
      om: 'Bu\'aa qormaatawwan fi hojiiwwan madaallii.',
      am: 'የፈተናዎችና የሥራዎች ውጤት።',
      en: 'All term evaluation data.'
    },
    lessonOutcome: {
      om: 'Rosteriin qabxii qophaa\'ee hayyama qulqullinaa argata.',
      am: 'የተማሪዎች ሮስተር ተዘጋጅቶ ፀድቆ ይዘጋጃል።',
      en: 'Approved student grade rosters ready for school leadership sign-off.'
    },
    teachingMethod: {
      om: 'Qindeessuu fi madaallii xumuruu.',
      am: 'ማደራጀትና ማረጋገጥ።',
      en: 'Grading committee deliberation and audit.'
    },
    teachingAids: {
      om: 'Rosterii, ripportii, kompiitara/galmee.',
      am: 'ሮስተር፣ የውጤት መዝገብ፣ ኮምፒተር።',
      en: 'Grade books, official school roster sheets.'
    },
    assessment: {
      om: 'Qulqullina qabxii barattootaa.',
      am: 'የተማሪዎች ውጤት ትክክለኛነት።',
      en: 'Grade roster verification.'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Torbee Qulqullina Bu\'aa',
      am: 'የውጤት ማጠናቀቂያ ሳምንት',
      en: 'Grade Compilation Week'
    }
  },
  {
    id: 'sem2-m10-w4',
    semester: 2,
    monthIndex: 9,
    weekNumber: 4,
    dateRange: '24 - 30 (Waxabajjii 30/2019)',
    pages: '-',
    monthName: { om: 'Waxabajjii', am: 'ሰኔ', en: 'Sene (Jun)' },
    chapter: { om: 'Ripportii', am: 'ሪፖርት ካርድ', en: 'Report' },
    mainTopic: {
      om: 'Guyyaa Kaardii fi Ripportii Barattootaaf Itti Kennamu (Waxabajjii 30)',
      am: 'ሪፖርት ካርድ ለተማሪ ወላጆች የሚሰጥበት ቀን (ሰኔ 30/2019 ዓ.ም)',
      en: 'Annual Report Card Distribution Day (Sene 30 / June 30)'
    },
    generalObjectives: {
      om: 'Walgahii maatii waliin taasisanii kaardii bu\'aa waggaa barattootaaf kennuu.',
      am: 'ከወላጆች ጋር በመወያየት የተማሪዎችን ዓመታዊ ሪፖርት ካርድ መስጠት።',
      en: 'Conduct parent-teacher meetings and distribute annual report cards.'
    },
    priorKnowledge: { om: '-', am: '-', en: '-' },
    lessonOutcome: {
      om: 'Barattoonni fi maatiin kaardii bu\'aa waggaa fudhatu; sagantaan bara 2019 ni xumurama.',
      am: 'ተማሪዎችና ወላጆች የዓመቱን ሪፖርት ካርድ ተቀብለው የትምህርት ዘመኑ ይጠናቀቃል።',
      en: 'Annual school year formally closes; student promotion determined.'
    },
    teachingMethod: {
      om: 'Walgahii maatii, ibsa bu\'aa kennuu.',
      am: 'የወላጆች ስብሰባ፣ የውጤት ገለፃ።',
      en: 'Parent assembly, certificate ceremony.'
    },
    teachingAids: {
      om: 'Kaardii barattootaa, galmee mallattoo.',
      am: 'የተማሪዎች ሪፖርት ካርድ፣ የመረካከቢያ ፊርማ መዝገብ።',
      en: 'Report cards, certificates, signing registry.'
    },
    assessment: {
      om: 'Ripportii Xumura Waggaa.',
      am: 'የዓመቱ ማጠቃለያ ሪፖርት።',
      en: 'Final Report Cards.'
    },
    isExamWeek: true,
    examTitle: {
      om: 'Guyyaa Kaardii (Waxabajjii 30)',
      am: 'የሪፖርት ካርድ ቀን (ሰኔ 30)',
      en: 'Report Card Day (Sene 30)'
    }
  }
];

export const INITIAL_CURRICULUM_2016: CurriculumWeek[] = RAW_CURRICULUM_2016.map((w, idx) => {
  const chapNum = w.chapterNumber || Math.floor(idx / 7) + 1;
  const tgStart = Math.max(1, (chapNum - 1) * 26 + 8);
  const tgEnd = tgStart + 18;
  return {
    ...w,
    studentBookPages: w.studentBookPages || w.pages,
    studentBookTitle: w.studentBookTitle || {
      om: `Kitaaba Barataa Herregaa K. 5ffaa (Fuula ${w.pages})`,
      am: `የ5ኛ ክፍል ሒሳብ የተማሪ መጽሐፍ (ገጽ ${w.pages})`,
      en: `Grade 5 Math Student Textbook (pp. ${w.pages})`
    },
    studentBookExercises: w.studentBookExercises || {
      om: `Gilgaala Boqonnaa ${chapNum} (Fuula ${w.pages})`,
      am: `ምዕራፍ ${chapNum} መልመጃ (ገጽ ${w.pages})`,
      en: `Unit ${chapNum} Exercises (pp. ${w.pages})`
    },
    teacherGuidePages: w.teacherGuidePages || `TG ${tgStart} - ${tgEnd}`,
    teacherGuidePedagogy: w.teacherGuidePedagogy || {
      om: 'Sadarkaa 5ffaa MoE: 1) Seensa (Daq. 5); 2) Ibsa Barsiisaa (Daq. 15); 3) Shaakala Garee (Daq. 10); 4) Dalagaa Dhuunfaa (Daq. 10); 5) Xumura fi Hojii Manaa (Daq. 5).',
      am: 'የኢ.ፌ.ዲ.ሪ 5 ደረጃዎች፡ 1) መግቢያ (5 ደ.)፤ 2) ገለፃና ምሳሌ (15 ደ.)፤ 3) የቡድን ልምምድ (10 ደ.)፤ 4) የግል ሥራ (10 ደ.)፤ 5) ማጠቃለያና የቤት ሥራ (5 ደ.)።',
      en: 'MoE 5-Phase Model: 1) Activation (5m); 2) Direct Instruction (15m); 3) Guided Practice (10m); 4) Independent Work (10m); 5) Wrap-up & Homework (5m).'
    },
    minimumLearningCompetency: w.minimumLearningCompetency || w.generalObjectives,
    differentiationSupport: w.differentiationSupport || {
      om: 'Barattoota deeggarsa dabalataa barbaadaniif waraqaa giraafii fi kaardii lakkoofsaa fayyadamaa.',
      am: 'ተጨማሪ ድጋፍ ለሚሹ ተማሪዎች የግራፍ ወረቀትና ተጨባጭ ቁሳቁሶችን በማቅረብ በቡድን እንዲሰሩ ያግዙ።',
      en: 'Provide grid paper manipulatives and peer tutoring for diverse learners.'
    }
  };
});

