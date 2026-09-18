export type Language = 'om' | 'am' | 'en';

export type ViewMode = 'annual' | 'daily' | 'print';

export interface CurriculumWeek {
  id: string;
  semester: 1 | 2;
  monthIndex: number; // 0 to 9
  weekNumber: number; // 1 to 5
  dateRange: string; // e.g. "07 - 11 (5)"
  pages: string; // e.g. "1 - 6"
  chapterNumber?: number;
  isExamWeek?: boolean;
  isPlanned?: boolean;
  
  // Multilingual text representations
  monthName: { om: string; am: string; en: string };
  chapter: { om: string; am: string; en: string };
  mainTopic: { om: string; am: string; en: string };
  generalObjectives: { om: string; am: string; en: string };
  priorKnowledge: { om: string; am: string; en: string };
  lessonOutcome: { om: string; am: string; en: string };
  teachingMethod: { om: string; am: string; en: string };
  teachingAids: { om: string; am: string; en: string };
  assessment: { om: string; am: string; en: string };
  examTitle?: { om: string; am: string; en: string };

  // Integrated Real Student Textbook & Teacher's Guide references
  studentBookTitle?: { om: string; am: string; en: string };
  studentBookPages?: string; // Specific pages in student textbook, e.g. "1 - 6"
  studentBookExercises?: { om: string; am: string; en: string }; // e.g. "Gilgaala 1.1 Gaaffilee 1 - 8"
  teacherGuideTitle?: { om: string; am: string; en: string };
  teacherGuidePages?: string; // Specific pages in teacher's guide, e.g. "TG 8 - 14"
  teacherGuidePedagogy?: { om: string; am: string; en: string }; // Pedagogical advice & time allocations
  minimumLearningCompetency?: { om: string; am: string; en: string }; // Ministry of Education MLC
  differentiationSupport?: { om: string; am: string; en: string }; // Special needs & remedial hints
}

export interface SchoolInfo {
  schoolName: { om: string; am: string; en: string };
  academicYear: { om: string; am: string; en: string };
  teacherName: { om: string; am: string; en: string };
  gradeAndSection: { om: string; am: string; en: string };
  subject: { om: string; am: string; en: string };
  annualDays: string;
  annualPeriods: string;
  weeklyPeriods: string;
  periodDuration: { om: string; am: string; en: string };
  departmentHeadName: { om: string; am: string; en: string };
  principalName: { om: string; am: string; en: string };
}

export interface Lesson {
  id: string;
  timeStart: string;
  timeEnd: string;
  subject: string;
  chapter: string;
  mainTopic: string;
  objectives: string;
  priorKnowledge: string;
  methodology: string;
  materials: string;
  assessment: string;
  activities?: string;
  completed: boolean;

  // Integrated Real Student Textbook & Teacher Guide fields
  studentBookPages?: string; // e.g. "Fuula 4 - 6" / "pp. 4-6"
  textbookExercises?: string; // e.g. "Gilgaala 1.1 Gaaffii 1 - 6"
  teacherGuidePages?: string; // e.g. "Qajeelcha Fuula 12 - 15" / "TG pp. 12-15"
  teacherGuideSteps?: string; // e.g. "5m Warmup, 15m Modeling, 15m Guided Group, 5m Independent, 5m Wrap-up"
}

export interface DailyPlan {
  date: string; // YYYY-MM-DD
  lessons: Lesson[];
  notes: string;
}

export interface Course {
  id: string;
  grade: string; // e.g. "5", "6", "4", "7", "8"
  gradeName: { om: string; am: string; en: string };
  section: string; // e.g. "A & B", "A", "B", "C"
  subjectKey: string;
  subjectName: { om: string; am: string; en: string };
  color: string; // e.g. "indigo", "emerald", "blue", "violet", "amber", "rose", "teal"
  schoolInfo: SchoolInfo;
  createdAt: string;
}
