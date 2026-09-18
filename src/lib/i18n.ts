import { Language } from '../types';

export interface TranslationStrings {
  // Navigation & General
  appTitle: string;
  appSubtitle: string;
  dailyView: string;
  annualView: string;
  printView: string;
  exportBtn: string;
  language: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  close: string;
  search: string;
  filter: string;
  all: string;
  reset: string;
  confirmReset: string;
  resetSuccess: string;
  weekUpdateSuccess: string;
  schoolInfoUpdateSuccess: string;
  
  // Annual Planner
  annualPlanTitle: string;
  schoolInfoEdit: string;
  printPdf: string;
  exportCsv: string;
  resetDefault: string;
  semesterAll: string;
  semester1: string;
  semester2: string;
  allMonths: string;
  searchPlaceholder: string;
  tableView: string;
  cardsView: string;
  month: string;
  week: string;
  date: string;
  pages: string;
  chapter: string;
  mainTopic: string;
  objectives: string;
  priorKnowledge: string;
  lessonOutcome: string;
  teachingMethod: string;
  materials: string;
  assessment: string;
  actions: string;
  examBadge: string;
  sendToDaily: string;
  noPlanFound: string;
  
  // Summary Stats Card
  semesterStatsTitle: string;
  totalWeeks: string;
  weeksPlanned: string;
  weeksRemaining: string;
  progressRate: string;
  plannedPeriods: string;
  examWeeksCount: string;
  markPlanned: string;
  markUnplanned: string;
  statusPlanned: string;
  statusPending: string;
  filterRemainingOnly: string;
  showAllSemesterWeeks: string;
  nextUpcomingWeek: string;
  allWeeksPlanned: string;
  currentSemesterBadge: string;
  plannedRatio: string;
  
  // School Info Labels
  schoolName: string;
  academicYear: string;
  gradeAndSection: string;
  subject: string;
  teacherName: string;
  annualDays: string;
  annualPeriods: string;
  weeklyPeriods: string;
  periodDuration: string;
  deptHead: string;
  principal: string;
  signaturesTitle: string;
  signature: string;
  
  // Daily Planner
  dailyTitle: string;
  dailySubtitle: string;
  importFromAnnual: string;
  addLesson: string;
  noDailyLessons: string;
  noDailyLessonsDesc: string;
  prevDay: string;
  nextDay: string;
  period: string;
  activities: string;
  notesTitle: string;
  notesPlaceholder: string;
  completed: string;
  notCompleted: string;
  selectWeekModalTitle: string;
  selectWeekModalDesc: string;
  selectBtn: string;
  duration45Min: string;
  
  // Export Modal
  exportModalTitle: string;
  exportModalDesc: string;
  exportPdfOption: string;
  exportPdfDesc: string;
  exportCsvOption: string;
  exportCsvDesc: string;
  exportJsonOption: string;
  exportJsonDesc: string;

  // Class & Subject Management
  activeClass: string;
  switchClass: string;
  addClass: string;
  manageClasses: string;
  editClass: string;
  deleteClass: string;
  deleteClassConfirm: string;
  cannotDeleteLast: string;
  gradeLevel: string;
  subjectTitle: string;
  sectionTitle: string;
  curriculumTemplate: string;
  fullCurriculumTemplate: string;
  cloneExistingClass: string;
  blankStructure: string;
  classCreatedSuccess: string;
  classSwitchedSuccess: string;
  classUpdatedSuccess: string;
  classDeletedSuccess: string;

  // Real Student Textbook & Teacher's Guide Integration
  studentTextbook: string;
  teacherGuide: string;
  studentBookPages: string;
  teacherGuidePages: string;
  textbookExercises: string;
  teacherGuideStrategy: string;
  openTextbookLibrary: string;
  applyToLesson: string;
  applyToWeek: string;
  fivePhaseLesson: string;
  inclusiveSupport: string;
  commonMisconceptions: string;
  loadFromGuide: string;
  textbookRef: string;
  blackboard: string;
  deployApp: string;
  deployTitle: string;
  printHeaderEveryPage: string;
  printRunningHeaderNotice: string;
  printDocumentAnnual: string;
  printDocumentDaily: string;
  curriculumFrameworkNotice: string;
  pageHeaderTitle: string;
}

export const translations: Record<Language, TranslationStrings> = {
  om: {
    appTitle: 'Karoora Barnootaa 2016',
    appSubtitle: 'Herrega Kutaa 5ffaa (Mathematics Grade 5)',
    dailyView: 'Sagantaa Guyyaa',
    annualView: 'Karoora Waggaa',
    printView: 'Maxxansi PDF',
    exportBtn: 'Baasi / Export',
    language: 'Afaan',
    save: 'Ol-kaa\'i',
    cancel: 'Dhiisi',
    edit: 'Gulaali',
    delete: 'Haqi',
    close: 'Cufi',
    search: 'Barbaadi...',
    filter: 'Filtarii',
    all: 'Hunda',
    reset: 'Deebisii Jalqabsiisi',
    confirmReset: 'Karoora barnootaa waggaa gara qophii duraatti (2016 Official Curriculum) deebisuu barbaadduu?',
    resetSuccess: 'Karoorri waggaa 2016 gara qophii duraatti deebi\'eera.',
    weekUpdateSuccess: 'Karoorri torbee milkaa\'inaan haaromfameera.',
    schoolInfoUpdateSuccess: 'Odeeffannoon mana barumsaa haaromfameera.',

    annualPlanTitle: 'Karoora Barnootaa Waggaa Guutuu',
    schoolInfoEdit: 'Odeeffannoo Gulaali',
    printPdf: 'Maxxansi / PDF',
    exportCsv: 'Gara CSVtti Baasi',
    resetDefault: 'Deebisii Jalqabsiisi',
    semesterAll: 'Waggaa Guutuu (Torban 42)',
    semester1: 'Semisteera 1ffaa',
    semester2: 'Semisteera 2ffaa',
    allMonths: 'Ji\'oottan Hunda',
    searchPlaceholder: 'Mata duree, boqonnaa barbaadi...',
    tableView: 'Gabatee Guutuu',
    cardsView: 'Kaardiiwwan',
    month: 'Ji\'a',
    week: 'Torbee',
    date: 'Guyyaa',
    pages: 'Fuula',
    chapter: 'Boqonnaa',
    mainTopic: 'Mata Duree Ijoo',
    objectives: 'Kaayyoo Waliigalaa',
    priorKnowledge: 'Beekumsa Duraa',
    lessonOutcome: 'Bu\'aa / Dhiyeessa',
    teachingMethod: 'Mala Barsiisuu',
    materials: 'Meeshaalee Deeggarsaa',
    assessment: 'Madaallii fi Gamaggama',
    actions: 'Tarkaanfii',
    examBadge: 'QORMAATA',
    sendToDaily: 'Guyyaatti Fidi',
    noPlanFound: 'Karoorri barbaaddan hin argamne.',

    semesterStatsTitle: 'Cuunfaa Karoora Semisteera Ammaa',
    totalWeeks: 'Waliigala Torban',
    weeksPlanned: 'Torban Karoorfame',
    weeksRemaining: 'Torban Hafan',
    progressRate: 'Sadarkaa Raawwii',
    plannedPeriods: 'Wayitii Karoorfame',
    examWeeksCount: 'Torban Qormaataa',
    markPlanned: 'Akka Karoorfametti Mallatteessi',
    markUnplanned: 'Karoora Irraa Kaasi',
    statusPlanned: 'Karoorfameera',
    statusPending: 'Hafaa / Hin Karoorfamne',
    filterRemainingOnly: 'Torban Hafan Qofa Agarsiisi',
    showAllSemesterWeeks: 'Torban Hunda Agarsiisi',
    nextUpcomingWeek: 'Torbee Itti Aanu Kan Karoorfamuu Qabu',
    allWeeksPlanned: 'Torban semisteera kanaa hundi karoorfamaniiru!',
    currentSemesterBadge: 'Semisteera Ammaa',
    plannedRatio: 'karoorfameera',

    schoolName: 'Maqaa Mana Barumsaa',
    academicYear: 'Bara Barnootaa',
    gradeAndSection: 'Kutaa fi Saala',
    subject: 'Gosa Barnootaa',
    teacherName: 'Maqaa Barsiisaa/stuu',
    annualDays: 'Guyyoota Waggaa',
    annualPeriods: 'Wayitii Waggaa',
    weeklyPeriods: 'Wayitii Torbee',
    periodDuration: 'Dheerina Wayitii',
    deptHead: 'Itti Gaafatamaa Dippaartimantii',
    principal: 'Hogganaa Mana Barumsaa',
    signaturesTitle: 'Mirkaneessa fi Mallattoo Itti Gaafatamtootaa (Signatures)',
    signature: 'Mallattoo',

    dailyTitle: 'Sagantaa Barnoota Guyyaa',
    dailySubtitle: 'Karoora guyyaa wayitii 45 (Daqiiqaa 45) fi sochiiwwan daree.',
    importFromAnnual: 'Karoora Waggaa Irraa Waraabi',
    addLesson: 'Wayitii Haaraa Dabali',
    noDailyLessons: 'Sagantaan barnootaa hin jiru',
    noDailyLessonsDesc: 'Karoora barnootaa waggaa 2016 irraa battalumatti waraabaa ykn ofumaa haaraa dabalaa.',
    prevDay: 'Guyyaa Duraa',
    nextDay: 'Guyyaa Itti Aanu',
    period: 'Wayitii',
    activities: 'Adeemsa fi Sochiiwwan Barnootaa (Daqiiqaa 45)',
    notesTitle: 'Yaadannoo fi Hubachiisa Guyyaa',
    notesPlaceholder: 'Hirmaannaa barattootaa, hojii manaa, hubannoo daree, kkf...',
    completed: 'Xumurameera',
    notCompleted: 'Hin xumuramne',
    selectWeekModalTitle: 'Karoora Barnootaa Waggaa 2016 Irraa Filadhu',
    selectWeekModalDesc: 'Mata duree barbaaddan filachuun sagantaa guyyaatti waraabaa.',
    selectBtn: 'Filadhu',
    duration45Min: '(Daqiiqaa 45)',

    exportModalTitle: 'Karoora Barnootaa Baasi (Export Options)',
    exportModalDesc: 'Karoora barnootaa bifa PDF, Excel/CSV, ykn JSONtiin gad-fe\'adhaa.',
    exportPdfOption: 'Maxxansa PDF (Official Printable Document)',
    exportPdfDesc: 'Waraqaa seera qabeessa mana barumsaa gabatee fi mallattoo waliin maxxansi.',
    exportCsvOption: 'Excel / CSV File (.csv)',
    exportCsvDesc: 'Karoora waggaa guutuu Microsoft Excel ykn Google Sheets irratti banuuf.',
    exportJsonOption: 'JSON Backup (.json)',
    exportJsonDesc: 'Ragaa guutuu kompiitara keessan irratti kuusuuf ykn booda deebisuuf.',

    activeClass: 'Daree fi Barnoota Hojjatamaa Jiru',
    switchClass: 'Daree / Barnoota Jijjiiri',
    addClass: 'Daree fi Barnoota Dabali',
    manageClasses: 'Kutaalee fi Barnoota Hoggani',
    editClass: 'Odeeffannoo Daree Gulaali',
    deleteClass: 'Karoora Daree Kana Balleessi',
    deleteClassConfirm: 'Karoora daree kanaa fi qabiyyee isaa guutuu balleessuu barbaadduu?',
    cannotDeleteLast: 'Karoora daree isa dhumaa balleessuun hin danda\'amu.',
    gradeLevel: 'Sadarkaa Kutaa',
    subjectTitle: 'Gosa Barnootaa',
    sectionTitle: 'Kutaa / Daree (Section)',
    curriculumTemplate: 'Qophii Karoora Barnootaa',
    fullCurriculumTemplate: 'Karoora Guutuu Torban 43 (Semisteera 1 fi 2) Qopheessi',
    cloneExistingClass: 'Karoora Daree Biraarraa Waraabi',
    blankStructure: 'Kaaleendarii Qullaa (Torban 43)',
    classCreatedSuccess: 'Karoorri daree fi barnoota haaraa milkaa\'inaan uumameera!',
    classSwitchedSuccess: 'Gara kanatti jijjiirameera:',
    classUpdatedSuccess: 'Odeeffannoon daree milkaa\'inaan haaromfameera.',
    classDeletedSuccess: 'Karoorri daree balleeffameera.',

    // Real Student Textbook & Teacher's Guide Integration
    studentTextbook: 'Kitaaba Barataa (Student Textbook)',
    teacherGuide: 'Qajeelcha Barsiisaa (Teacher\'s Guide)',
    studentBookPages: 'Fuula Kitaaba Barataa',
    teacherGuidePages: 'Fuula Qajeelcha Barsiisaa',
    textbookExercises: 'Gilgaalota Kitaaba Barataa',
    teacherGuideStrategy: 'Tooftaa Barsiisuu fi Qoodinsa Yeroo',
    openTextbookLibrary: 'Kitaaba Barataa fi Qajeelcha Barsiisaa',
    applyToLesson: 'Gara Sagantaa Guyyaatti Fidi',
    applyToWeek: 'Gara Torbee Kanaatti Fidi',
    fivePhaseLesson: 'Sadarkaalee Barnootaa Daqiiqaa 45 (5-Phase Model)',
    inclusiveSupport: 'Deeggarsa Barattoota Qophii Addaa Barbaadanii',
    commonMisconceptions: 'Dogoggora Baramaa Barattootaa',
    loadFromGuide: 'Qajeelcha Barsiisaarraa Fidi',
    textbookRef: 'Qajeelcha & Kitaaba',
    blackboard: 'Gabatee Gurraacha',
    deployApp: 'Gadi Dhiisi (Deploy)',
    deployTitle: 'Appilikeeshinii Kana Akkaataa Gadi Dhiisan (Deployment Guide)',
    printHeaderEveryPage: 'Mata Duree Fuula Hundarratti (Header on Every Page)',
    printRunningHeaderNotice: 'Mata dureen mana barumsaa seera qabeessi kun fuula maxxansaa hundarratti ofumaan irra deebi\'ee mul\'ata.',
    printDocumentAnnual: 'Karoora Waggaa (Annual Plan)',
    printDocumentDaily: 'Karoora Guyyaa (Daily Plan)',
    curriculumFrameworkNotice: 'Sirna Barnootaa Itoophiyaa 2016 A.L.I (MoE / BBO Curriculum Standard)',
    pageHeaderTitle: 'Mata Duree Maxxansaa Seera Qabeessa'
  },

  am: {
    appTitle: 'የ2016 የትምህርት ዕቅድ',
    appSubtitle: 'የ5ኛ ክፍል ሒሳብ ትምህርት (Mathematics Grade 5)',
    dailyView: 'የዕለት ዕቅድ',
    annualView: 'ዓመታዊ ዕቅድ',
    printView: 'ማተሚያ PDF',
    exportBtn: 'መላኪያ / Export',
    language: 'ቋንቋ',
    save: 'አስቀምጥ',
    cancel: 'ተመለስ',
    edit: 'አስተካክል',
    delete: 'አጥፋ',
    close: 'ዝጋ',
    search: 'ፈልግ...',
    filter: 'አጣራ',
    all: 'ሁሉም',
    reset: 'ወደ ነበረበት መልስ',
    confirmReset: 'ዓመታዊ የትምህርት ዕቅዱን ወደ 2016 ዓ.ም ትክክለኛ የመጀመሪያ ቅጂ መመለስ ይፈልጋሉ?',
    resetSuccess: 'የትምህርት ዕቅዱ በተሳካ ሁኔታ ወደ ነበረበት ተመልሷል።',
    weekUpdateSuccess: 'የሳምንቱ ዕቅድ በተሳካ ሁኔታ ተሻሽሏል።',
    schoolInfoUpdateSuccess: 'የትምህርት ቤቱ መረጃ በተሳካ ሁኔታ ተሻሽሏል።',

    annualPlanTitle: 'ሳላይሽ ቅድመ አንደኛ፣ 1ኛ ደረጃና መካከለኛ ደረጃ ትምህርት ቤት ዓመታዊ የትምህርት ዕቅድ',
    schoolInfoEdit: 'መረጃውን አስተካክል',
    printPdf: 'አትም / PDF',
    exportCsv: 'ወደ CSV ላክ',
    resetDefault: 'ወደ ነበረበት መልስ',
    semesterAll: 'ሙሉ ዓመት (42 ሳምንታት)',
    semester1: '1ኛ ወሰነ ትምህርት',
    semester2: '2ኛ ወሰነ ትምህርት',
    allMonths: 'ሁሉም ወራት',
    searchPlaceholder: 'የርዕስ ወይም የምዕራፍ ፍለጋ...',
    tableView: 'ሙሉ ሠንጠረዥ',
    cardsView: 'ካርዶች',
    month: 'ወር',
    week: 'ሳምንት',
    date: 'ቀን',
    pages: 'ገጽ',
    chapter: 'ምዕራፍ',
    mainTopic: 'የትምህርቱ ዋና ዋና ርዕስ',
    objectives: 'የትምህርቱ አጠቃላይ አላማዎች',
    priorKnowledge: 'ቀደም ሲል የነበረ እውቀት',
    lessonOutcome: 'የትምህርቱ ፋይዳ / ሂደት',
    teachingMethod: 'የማስተማሪያ ሥነ-ዘዴ',
    materials: 'መርጃ መሳሪያ',
    assessment: 'የምዘናና ግምገማ ክትትል',
    actions: 'ተግባር',
    examBadge: 'ፈተና',
    sendToDaily: 'ወደ ዕለት ውሰድ',
    noPlanFound: 'ምንም ዕቅድ አልተገኘም።',

    semesterStatsTitle: 'የወቅቱ ወሰነ ትምህርት የዕቅድ ማጠቃለያ',
    totalWeeks: 'ጠቅላላ ሳምንታት',
    weeksPlanned: 'የታቀዱ ሳምንታት',
    weeksRemaining: 'የቀሩ ሳምንታት',
    progressRate: 'የዕቅድ አፈጻጸም',
    plannedPeriods: 'የታቀዱ ክፍለ ጊዜያት',
    examWeeksCount: 'የፈተና ሳምንታት',
    markPlanned: 'እንደታቀደ ምልክት አድርግ',
    markUnplanned: 'ዕቅዱን ሰርዝ',
    statusPlanned: 'ታቅዷል',
    statusPending: 'ይቀራል / አልታቀደም',
    filterRemainingOnly: 'የቀሩትን ሳምንታት ብቻ አሳይ',
    showAllSemesterWeeks: 'ሁሉንም ሳምንታት አሳይ',
    nextUpcomingWeek: 'ቀጣይ መታቀድ ያለበት ሳምንት',
    allWeeksPlanned: 'የዚህ ወሰነ ትምህርት ሁሉም ሳምንታት ታቅደው ተጠናቀዋል!',
    currentSemesterBadge: 'የወቅቱ ወሰነ ትምህርት',
    plannedRatio: 'ታቅዷል',

    schoolName: 'የትምህርት ቤቱ ስም',
    academicYear: 'የትምህርት ዘመን',
    gradeAndSection: 'የክፍል ደረጃ እና ሴክሽን',
    subject: 'የትምህርት ዓይነት',
    teacherName: 'የመምህሩ/ቷ ስም',
    annualDays: 'የዓመቱ የትምህርት ቀናት',
    annualPeriods: 'የዓመቱ የክፍለ ጊዜ ብዛት',
    weeklyPeriods: 'የሳምንቱ የክፍለ ጊዜ ብዛት',
    periodDuration: 'የአንድ ክፍለ ጊዜ ርዝማኔ',
    deptHead: 'የዲፓርትመንት ተጠሪ ስም',
    principal: 'የመሪ መምህር ስም',
    signaturesTitle: 'የኃላፊዎች ማረጋገጫና ፊርማ (Signatures)',
    signature: 'ፊርማ',

    dailyTitle: 'የዕለት ትምህርት ዝግጅት ዕቅድ',
    dailySubtitle: 'የ45 ደቂቃ ክፍለ ጊዜ ዕቅድና የክፍል ውስጥ ተግባራት ሂደት።',
    importFromAnnual: 'ከዓመታዊ ዕቅድ ውሰድ',
    addLesson: 'አዲስ ክፍለ ጊዜ ጨምር',
    noDailyLessons: 'የተመዘገበ የትምህርት ዕቅድ የለም',
    noDailyLessonsDesc: 'ከ2016 ዓመታዊ ዕቅድ በቀጥታ ይቅዱ ወይም አዲስ የትምህርት ዝግጅት ያስገቡ።',
    prevDay: 'ያለፈው ቀን',
    nextDay: 'የሚቀጥለው ቀን',
    period: 'ክፍለ ጊዜ',
    activities: 'የትምህርት አሰጣጥ ሂደትና ዝርዝር ተግባራት (45 ደቂቃ)',
    notesTitle: 'የዕለቱ ማስታወሻና ክትትል',
    notesPlaceholder: 'የተማሪዎች ተሳትፎ፣ የቤት ሥራ፣ አስተያየት...',
    completed: 'ተጠናቋል',
    notCompleted: 'አልተጠናቀቀም',
    selectWeekModalTitle: 'ከ2016 ዓመታዊ ዕቅድ ርዕስ ይምረጡ',
    selectWeekModalDesc: 'የሚፈልጉትን ሳምንታዊ ርዕስ በመምረጥ ወደ ዕለት ዕቅድ ይቅዱ።',
    selectBtn: 'ምረጥ',
    duration45Min: '(45 ደቂቃ)',

    exportModalTitle: 'የትምህርት ዕቅዱን ወደ ፋይል ይላኩ (Export)',
    exportModalDesc: 'የትምህርት ዕቅዱን በPDF፣ በExcel/CSV ወይም በJSON ፋይል አውርደው ይጠቀሙ።',
    exportPdfOption: 'የህትመት PDF (Official Document)',
    exportPdfDesc: 'የትምህርት ቤቱ መረጃ፣ ሠንጠረዥና የፊርማ ቦታዎችን የያዘ ማተሚያ ሰነድ።',
    exportCsvOption: 'የExcel / CSV ፋይል (.csv)',
    exportCsvDesc: 'በMicrosoft Excel ወይም በGoogle Sheets ከፍተው ለማስተካከል ወይም ለማተም።',
    exportJsonOption: 'የJSON ምትክ ፋይል (.json)',
    exportJsonDesc: 'ሙሉ መረጃውን በኮምፒተርዎ ላይ ለማስቀመጥና በማንኛውም ጊዜ ለመመለስ።',

    activeClass: 'አሁን የሚሰራበት ክፍልና ትምህርት',
    switchClass: 'ክፍል / ትምህርት ቀይር',
    addClass: 'ክፍልና ትምህርት ጨምር',
    manageClasses: 'ክፍሎችንና ትምህርቶችን አስተዳድር',
    editClass: 'የክፍል መረጃ አርትዕ',
    deleteClass: 'የዚህን ክፍል ፕላን ሰርዝ',
    deleteClassConfirm: 'የዚህን ክፍል የትምህርት ፕላንና ሳምንታዊ ዝግጅቶችን በሙሉ መሰረዝ ይፈልጋሉ?',
    cannotDeleteLast: 'ብቸኛ የቀረውን የክፍል ፕላን መሰረዝ አይቻልም።',
    gradeLevel: 'የክፍል ደረጃ',
    subjectTitle: 'የትምህርት ዓይነት',
    sectionTitle: 'ሴክሽን (Section)',
    curriculumTemplate: 'የትምህርት ፕላን ማዋቀሪያ',
    fullCurriculumTemplate: 'ሙሉ የ43 ሳምንታት ፕላን (ወሰነ ትምህርት 1 እና 2) አዘጋጅ',
    cloneExistingClass: 'ከነባር ክፍል ፕላን ቅዳ',
    blankStructure: 'ባዶ የሳምንታት መዋቅር (43 ሳምንታት)',
    classCreatedSuccess: 'አዲስ ክፍልና የትምህርት ፕላን በተሳካ ሁኔታ ተፈጥሯል!',
    classSwitchedSuccess: 'ተቀይሯል ወደ',
    classUpdatedSuccess: 'የክፍሉ መረጃ በተሳካ ሁኔታ ተስተካክሏል።',
    classDeletedSuccess: 'የክፍሉ ፕላን ተሰርዟል።',

    // Real Student Textbook & Teacher's Guide Integration
    studentTextbook: 'የተማሪ መጽሐፍ (Student Textbook)',
    teacherGuide: 'የመምህሩ መምሪያ (Teacher\'s Guide)',
    studentBookPages: 'የተማሪ መጽሐፍ ገጽ',
    teacherGuidePages: 'የመምህሩ መምሪያ ገጽ',
    textbookExercises: 'የመጽሐፉ መልመጃዎችና ጥያቄዎች',
    teacherGuideStrategy: 'የመምሪያው የማስተማሪያ ዘዴና የጊዜ ክፍፍል',
    openTextbookLibrary: 'የተማሪ መጽሐፍና የመምሪያ ቤተ-መጽሐፍት',
    applyToLesson: 'ወደ ዕለታዊ ፕላን አስገባ',
    applyToWeek: 'ወደዚህ ሳምንት ፕላን አስገባ',
    fivePhaseLesson: 'የ45 ደቂቃ የትምህርት አሰጣጥ ደረጃዎች (5-Phase)',
    inclusiveSupport: 'የተጠቃለለ ትምህርት ድጋፍ (ልዩ ፍላጎት)',
    commonMisconceptions: 'የተማሪዎች የተለመዱ ስህተቶችና ማስተካከያ',
    loadFromGuide: 'ከመምሪያው በቀጥታ ሙላ',
    textbookRef: 'መጽሐፍና መምሪያ',
    blackboard: 'ጥቁር ሰሌዳ',
    deployApp: 'ማሰማራት (Deploy)',
    deployTitle: 'አፕሊኬሽኑን የማሰማራት እና የማስተናገድ መመሪያ (Deployment Guide)',
    printHeaderEveryPage: 'የገጽ ራስጌ በሁሉም ገጾች ላይ (Header on Every Page)',
    printRunningHeaderNotice: 'ይህ ይፋዊ የትምህርት ቤት ራስጌ በሁሉም የታተሙ ገጾች ላይ በቋሚነት ይደገማል።',
    printDocumentAnnual: 'ዓመታዊ ዕቅድ (Annual Plan)',
    printDocumentDaily: 'የዕለት ዕቅድ (Daily Plan)',
    curriculumFrameworkNotice: 'የ2016 ዓ.ም የኢትዮጵያ ሥርዓተ ትምህርት ማዕቀፍ (MoE / OEB Standard)',
    pageHeaderTitle: 'ይፋዊ የህትመት ራስጌ'
  },

  en: {
    appTitle: 'Lesson Planner 2016',
    appSubtitle: 'Grade 5 Mathematics (Ethiopian Curriculum)',
    dailyView: 'Daily Plan',
    annualView: 'Annual Plan',
    printView: 'Print PDF',
    exportBtn: 'Export',
    language: 'Language',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    search: 'Search...',
    filter: 'Filter',
    all: 'All',
    reset: 'Reset to Default',
    confirmReset: 'Are you sure you want to reset the annual plan back to the official 2016 curriculum?',
    resetSuccess: 'Annual plan successfully reset to default 2016 curriculum.',
    weekUpdateSuccess: 'Weekly plan updated successfully.',
    schoolInfoUpdateSuccess: 'School information updated successfully.',

    annualPlanTitle: 'Salayish Primary & Middle School Annual Lesson Plan',
    schoolInfoEdit: 'Edit School Info',
    printPdf: 'Print / PDF',
    exportCsv: 'Export to CSV',
    resetDefault: 'Reset to Default',
    semesterAll: 'Full Year (42 Weeks)',
    semester1: 'Semester 1',
    semester2: 'Semester 2',
    allMonths: 'All Months',
    searchPlaceholder: 'Search topic, chapter...',
    tableView: 'Full Table',
    cardsView: 'Cards View',
    month: 'Month',
    week: 'Week',
    date: 'Date',
    pages: 'Pages',
    chapter: 'Chapter',
    mainTopic: 'Main Topic',
    objectives: 'General Objectives',
    priorKnowledge: 'Prior Knowledge',
    lessonOutcome: 'Lesson Outcome / Process',
    teachingMethod: 'Teaching Methodology',
    materials: 'Teaching Aids & Materials',
    assessment: 'Assessment & Evaluation',
    actions: 'Actions',
    examBadge: 'EXAM',
    sendToDaily: 'Copy to Daily',
    noPlanFound: 'No curriculum plan found matching your search.',

    semesterStatsTitle: 'Current Semester Planning Summary',
    totalWeeks: 'Total Weeks',
    weeksPlanned: 'Weeks Planned',
    weeksRemaining: 'Remaining Weeks',
    progressRate: 'Curriculum Progress',
    plannedPeriods: 'Planned Periods',
    examWeeksCount: 'Exam Weeks',
    markPlanned: 'Mark as Planned',
    markUnplanned: 'Mark as Pending',
    statusPlanned: 'Planned',
    statusPending: 'Remaining',
    filterRemainingOnly: 'Show Remaining Only',
    showAllSemesterWeeks: 'Show All Weeks',
    nextUpcomingWeek: 'Next Week to Plan / Teach',
    allWeeksPlanned: 'All weeks for this semester have been planned!',
    currentSemesterBadge: 'Current Semester',
    plannedRatio: 'planned',

    schoolName: 'School Name',
    academicYear: 'Academic Year',
    gradeAndSection: 'Grade & Section',
    subject: 'Subject',
    teacherName: 'Teacher Name',
    annualDays: 'Annual Days',
    annualPeriods: 'Annual Periods',
    weeklyPeriods: 'Weekly Periods',
    periodDuration: 'Period Duration',
    deptHead: 'Department Head',
    principal: 'School Principal',
    signaturesTitle: 'Verification & Signatures',
    signature: 'Signature',

    dailyTitle: 'Daily Lesson Plan',
    dailySubtitle: '45-minute lesson structure, procedures, and classroom activities.',
    importFromAnnual: 'Import from Annual Plan',
    addLesson: 'Add New Lesson',
    noDailyLessons: 'No lessons scheduled for this day',
    noDailyLessonsDesc: 'Quickly copy a topic from the 2016 Annual Curriculum or create a custom lesson.',
    prevDay: 'Previous Day',
    nextDay: 'Next Day',
    period: 'Period',
    activities: 'Lesson Procedure & Activities (45 Minutes)',
    notesTitle: 'Daily Notes & Observations',
    notesPlaceholder: 'Student participation, homework assignments, observations...',
    completed: 'Completed',
    notCompleted: 'Pending',
    selectWeekModalTitle: 'Select Topic from 2016 Annual Curriculum',
    selectWeekModalDesc: 'Select any week to auto-populate the 45-minute daily lesson plan.',
    selectBtn: 'Select',
    duration45Min: '(45 Mins)',

    exportModalTitle: 'Export Curriculum & Lesson Plans',
    exportModalDesc: 'Download your lesson plan as PDF, Excel/CSV, or JSON backup format.',
    exportPdfOption: 'Print / Save as PDF',
    exportPdfDesc: 'High-resolution official school document with tables and signature blocks.',
    exportCsvOption: 'Excel / CSV Spreadsheet (.csv)',
    exportCsvDesc: 'Spreadsheet compatible with Microsoft Excel, Google Sheets, or Apple Numbers.',
    exportJsonOption: 'JSON Backup Data (.json)',
    exportJsonDesc: 'Complete database export for offline backup or transferring to another device.',

    activeClass: 'Active Class & Subject',
    switchClass: 'Switch Class / Subject',
    addClass: 'Add Class & Subject',
    manageClasses: 'Manage Classes & Subjects',
    editClass: 'Edit Class Details',
    deleteClass: 'Delete Class Plan',
    deleteClassConfirm: 'Are you sure you want to delete this class and its full curriculum and lesson plans?',
    cannotDeleteLast: 'Cannot delete the only remaining class plan.',
    gradeLevel: 'Grade Level',
    subjectTitle: 'Subject',
    sectionTitle: 'Section',
    curriculumTemplate: 'Curriculum Plan Setup',
    fullCurriculumTemplate: 'Generate Full 43-Week Curriculum (Semesters 1 & 2)',
    cloneExistingClass: 'Clone from Existing Class',
    blankStructure: 'Blank Structured Calendar (43 Weeks)',
    classCreatedSuccess: 'New class and lesson plan created successfully!',
    classSwitchedSuccess: 'Switched to',
    classUpdatedSuccess: 'Class details updated successfully.',
    classDeletedSuccess: 'Class plan deleted successfully.',

    // Real Student Textbook & Teacher's Guide Integration
    studentTextbook: 'Student Textbook (STB)',
    teacherGuide: 'Teacher\'s Guide (TG)',
    studentBookPages: 'Student Textbook Pages',
    teacherGuidePages: 'Teacher\'s Guide Pages',
    textbookExercises: 'Textbook Exercises & Problems',
    teacherGuideStrategy: 'Teacher Guide Lesson Strategy & Timing',
    openTextbookLibrary: 'Textbooks & Teacher\'s Guide Library',
    applyToLesson: 'Apply to Daily Lesson Plan',
    applyToWeek: 'Apply to This Week\'s Plan',
    fivePhaseLesson: '45-Minute 5-Phase Lesson Structure',
    inclusiveSupport: 'Inclusive & Differentiated Learning Support',
    commonMisconceptions: 'Common Student Misconceptions & Corrections',
    loadFromGuide: 'Auto-fill from Teacher\'s Guide',
    textbookRef: 'Textbook & Guide',
    blackboard: 'Chalkboard / Whiteboard',
    deployApp: 'Deploy Guide',
    deployTitle: 'How to Deploy & Host this Application',
    printHeaderEveryPage: 'Header on Every Page (Repeating)',
    printRunningHeaderNotice: 'This official institutional header automatically repeats at the top of every printed page.',
    printDocumentAnnual: 'Annual Scheme of Work (40 Weeks)',
    printDocumentDaily: 'Daily Lesson Plan',
    curriculumFrameworkNotice: '2016 Ethiopian Curriculum Framework (MoE / OEB Standard)',
    pageHeaderTitle: 'Official Running Print Header'
  }
};

export function getStoredLanguage(): Language {
  try {
    const lang = localStorage.getItem('app_language') as Language;
    if (lang && (lang === 'om' || lang === 'am' || lang === 'en')) {
      return lang;
    }
  } catch (e) {
    // fallback
  }
  return 'om'; // default to Afaan Oromo as previously requested
}

export function saveStoredLanguage(lang: Language) {
  try {
    localStorage.setItem('app_language', lang);
  } catch (e) {
    // ignore
  }
}
