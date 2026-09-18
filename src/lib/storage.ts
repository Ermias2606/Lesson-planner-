import { CurriculumWeek, DailyPlan, SchoolInfo, Language, Course } from '../types';
import { INITIAL_CURRICULUM_2016, initialSchoolInfo } from '../data/curriculum2016';
import { DEFAULT_INITIAL_COURSES, generateCurriculumForClass } from '../data/curriculumTemplates';

const COURSES_STORAGE_KEY = 'teacher_courses_v1';
const ACTIVE_COURSE_KEY = 'active_course_id_v1';

// ------------------- COURSES MANAGEMENT -------------------

export function getCourses(): Course[] {
  try {
    const data = localStorage.getItem(COURSES_STORAGE_KEY);
    if (!data) {
      saveCourses(DEFAULT_INITIAL_COURSES);
      return DEFAULT_INITIAL_COURSES;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveCourses(DEFAULT_INITIAL_COURSES);
    return DEFAULT_INITIAL_COURSES;
  } catch (e) {
    console.error('Failed to parse courses list', e);
    return DEFAULT_INITIAL_COURSES;
  }
}

export function saveCourses(courses: Course[]) {
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
}

export function getActiveCourseId(): string {
  try {
    const id = localStorage.getItem(ACTIVE_COURSE_KEY);
    if (id) {
      const courses = getCourses();
      if (courses.some(c => c.id === id)) {
        return id;
      }
    }
    return 'g5-math';
  } catch (e) {
    return 'g5-math';
  }
}

export function setActiveCourseId(courseId: string) {
  localStorage.setItem(ACTIVE_COURSE_KEY, courseId);
}

export function getActiveCourse(): Course {
  const courses = getCourses();
  const activeId = getActiveCourseId();
  const found = courses.find(c => c.id === activeId);
  return found || courses[0] || DEFAULT_INITIAL_COURSES[0];
}

export function addCourse(course: Course, curriculum: CurriculumWeek[]) {
  const courses = getCourses();
  const updatedCourses = [...courses, course];
  saveCourses(updatedCourses);
  saveCurriculum(curriculum, course.id);
  saveSchoolInfo(course.schoolInfo, course.id);
  setActiveCourseId(course.id);
}

export function updateCourse(updatedCourse: Course) {
  const courses = getCourses();
  const updated = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
  saveCourses(updated);
  saveSchoolInfo(updatedCourse.schoolInfo, updatedCourse.id);
}

export function deleteCourse(courseId: string): boolean {
  const courses = getCourses();
  if (courses.length <= 1) {
    return false; // Prevent deleting the last remaining course
  }
  const updated = courses.filter(c => c.id !== courseId);
  saveCourses(updated);
  
  // Clean up localStorage for this course
  localStorage.removeItem(`curriculum_${courseId}`);
  localStorage.removeItem(`school_info_${courseId}`);

  // If deleted active course, switch to first available
  if (getActiveCourseId() === courseId) {
    setActiveCourseId(updated[0].id);
  }
  return true;
}

// ------------------- CURRICULUM MANAGEMENT -------------------

export function getCurriculum(courseId?: string): CurriculumWeek[] {
  const targetId = courseId || getActiveCourseId();

  try {
    // 1. If it's the primary default course (g5-math), check original legacy key first
    if (targetId === 'g5-math') {
      const legacyData = localStorage.getItem('curriculum_2016_v2');
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0].monthName === 'object') {
          return parsed.map((item: any, idx: number) => ({
            ...item,
            isPlanned: typeof item.isPlanned === 'boolean' 
              ? item.isPlanned 
              : (item.semester === 1 && idx < 4)
          }));
        }
      }
    }

    // 2. Check course-specific storage
    const courseData = localStorage.getItem(`curriculum_${targetId}`);
    if (courseData) {
      const parsed = JSON.parse(courseData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // 3. Fallback: Generate curriculum for this course
    const courses = getCourses();
    const course = courses.find(c => c.id === targetId);
    let newCurriculum: CurriculumWeek[];

    if (course) {
      newCurriculum = generateCurriculumForClass({
        subjectName: course.subjectName,
        subjectKey: course.subjectKey,
        grade: course.grade,
        weeklyPeriods: parseInt(course.schoolInfo.weeklyPeriods) || 5
      });
    } else if (targetId === 'g5-math') {
      newCurriculum = INITIAL_CURRICULUM_2016;
    } else {
      newCurriculum = generateCurriculumForClass({
        subjectName: { om: 'Barnoota', am: 'ትምህርት', en: 'Subject' },
        subjectKey: 'custom',
        grade: '5',
        weeklyPeriods: 5
      });
    }

    // Save and return
    saveCurriculum(newCurriculum, targetId);
    return newCurriculum;
  } catch (e) {
    console.error(`Failed to parse curriculum for course ${targetId}`, e);
    return INITIAL_CURRICULUM_2016;
  }
}

export function saveCurriculum(curriculum: CurriculumWeek[], courseId?: string) {
  const targetId = courseId || getActiveCourseId();
  localStorage.setItem(`curriculum_${targetId}`, JSON.stringify(curriculum));

  // If saving g5-math, keep legacy key in sync for backwards compatibility
  if (targetId === 'g5-math') {
    localStorage.setItem('curriculum_2016_v2', JSON.stringify(curriculum));
  }
}

export function resetCurriculumToDefault(courseId?: string): CurriculumWeek[] {
  const targetId = courseId || getActiveCourseId();
  const courses = getCourses();
  const course = courses.find(c => c.id === targetId);

  let freshCurriculum: CurriculumWeek[];
  if (course) {
    freshCurriculum = generateCurriculumForClass({
      subjectName: course.subjectName,
      subjectKey: course.subjectKey,
      grade: course.grade,
      weeklyPeriods: parseInt(course.schoolInfo.weeklyPeriods) || 5
    });
  } else {
    freshCurriculum = INITIAL_CURRICULUM_2016;
  }

  saveCurriculum(freshCurriculum, targetId);
  return freshCurriculum;
}

// ------------------- SCHOOL INFO MANAGEMENT -------------------

export function getSchoolInfo(courseId?: string): SchoolInfo {
  const targetId = courseId || getActiveCourseId();

  try {
    // Check legacy for g5-math
    if (targetId === 'g5-math') {
      const legacyData = localStorage.getItem('school_info_2016_v2');
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        if (parsed && typeof parsed.schoolName === 'object') {
          return { ...initialSchoolInfo, ...parsed };
        }
      }
    }

    const courseData = localStorage.getItem(`school_info_${targetId}`);
    if (courseData) {
      const parsed = JSON.parse(courseData);
      if (parsed && typeof parsed.schoolName === 'object') {
        return { ...initialSchoolInfo, ...parsed };
      }
    }

    // Default to the course's school info from courses registry
    const courses = getCourses();
    const course = courses.find(c => c.id === targetId);
    if (course && course.schoolInfo) {
      return course.schoolInfo;
    }

    return initialSchoolInfo;
  } catch (e) {
    console.error(`Failed to parse school info for course ${targetId}`, e);
    return initialSchoolInfo;
  }
}

export function saveSchoolInfo(info: SchoolInfo, courseId?: string) {
  const targetId = courseId || getActiveCourseId();
  localStorage.setItem(`school_info_${targetId}`, JSON.stringify(info));

  if (targetId === 'g5-math') {
    localStorage.setItem('school_info_2016_v2', JSON.stringify(info));
  }

  // Also update in courses list
  const courses = getCourses();
  const updated = courses.map(c => {
    if (c.id === targetId) {
      return {
        ...c,
        gradeAndSection: info.gradeAndSection,
        subjectName: info.subject,
        schoolInfo: info
      };
    }
    return c;
  });
  saveCourses(updated);
}

// ------------------- DAILY PLANS MANAGEMENT -------------------

export function getDailyPlan(date: string, lang: Language = 'om', courseId?: string): DailyPlan {
  const targetId = courseId || getActiveCourseId();
  const courseSpecificKey = `dailyPlan_${targetId}_${date}`;

  try {
    const data = localStorage.getItem(courseSpecificKey);
    if (data) {
      return JSON.parse(data);
    }
    // Fallback to legacy key if default course
    if (targetId === 'g5-math') {
      const legacy = localStorage.getItem(`dailyPlan_${date}`);
      if (legacy) {
        return JSON.parse(legacy);
      }
    }
  } catch (e) {
    console.error(`Failed to parse daily plan for ${date}`, e);
  }

  const course = getActiveCourse();
  const subjectDisplay = course.subjectName[lang];

  // Language sensitive default lesson
  const defaultLesson = lang === 'am' ? {
    id: crypto.randomUUID(),
    timeStart: '08:30',
    timeEnd: '09:15',
    subject: subjectDisplay,
    chapter: 'ምዕራፍ 1',
    mainTopic: `1.1 የ${subjectDisplay} የመጀመሪያ ትምህርት መግቢያና ማብራሪያ`,
    objectives: `ተማሪዎች በዕለቱ የ${subjectDisplay} ትምህርት ዋና ዓላማዎችን ይገነዘባሉ።`,
    priorKnowledge: 'ካለፈው የክፍል ደረጃ የተገኘ ቅድመ-እውቀት አላቸው።',
    methodology: 'በገለፃ፣ በውይይት፣ በጥያቄና መልስ፣ ሰሌዳ በማሳየት።',
    materials: 'የተማሪ መጽሐፍ፣ ደብተር፣ ሰሌዳና ኖራ።',
    assessment: 'የክፍል ሥራ፣ የቤት ሥራ፣ የቡድን ሥራ።',
    activities: '1. መግቢያ (5 ደቂቃ): የዕለቱን አላማ ማስተዋወቅና ቀደምት እውቀትን መከለስ።\n2. አቀራረብ (20 ደቂቃ): ዋናውን ርዕስ በሰሌዳ ላይ በተግባር ማሳየትና ማብራራት።\n3. የቡድን ልምምድ (15 ደቂቃ): ተማሪዎች በቡድን ሆነው መልመጃዎችን እንዲሰሩ ማድረግ።\n4. ማጠቃለያ (5 ደቂቃ): ዋና ዋና ነጥቦችን ማጠቃለልና የቤት ስራ መስጠት።',
    completed: false
  } : lang === 'en' ? {
    id: crypto.randomUUID(),
    timeStart: '08:30',
    timeEnd: '09:15',
    subject: subjectDisplay,
    chapter: 'Unit 1',
    mainTopic: `1.1 Introduction and Core Concepts of ${subjectDisplay}`,
    objectives: `Understand foundational principles and objectives of ${subjectDisplay}.`,
    priorKnowledge: 'Prior knowledge acquired from previous grade level.',
    methodology: 'Teacher explanation, active discussion, board demonstration, Q&A.',
    materials: 'Textbook, student notebooks, chalkboard, learning charts.',
    assessment: 'In-class practice, homework questions, observation.',
    activities: '1. Introduction (5 mins): Announce daily objectives and review prior knowledge.\n2. Presentation (20 mins): Deliver core concepts with blackboard examples.\n3. Group Practice (15 mins): Students work on textbook exercises in pairs.\n4. Summary (5 mins): Key takeaways and homework assignment.',
    completed: false
  } : {
    id: crypto.randomUUID(),
    timeStart: '08:30',
    timeEnd: '09:15',
    subject: subjectDisplay,
    chapter: 'Boqonnaa 1',
    mainTopic: `1.1 Seensa fi Qabiyyee Ijoo Barnoota ${subjectDisplay}`,
    objectives: `Kaayyoo fi bu\'uuraalee barnoota ${subjectDisplay} sirriitti hubatu.`,
    priorKnowledge: 'Beekumsa fi muuxannoo barnoota kutaa darbee irraa qaban.',
    methodology: 'Ibsa kennuu, marii garee, gaaffii fi deebii, gabatee irratti agarsiisuu.',
    materials: 'Kitaaba barataa, dabtara, gabatee gurraacha, chaartii.',
    assessment: 'Hojii daree, Hojii manaa, Hirmaannaa barattootaa.',
    activities: '1. Seensa (Daqiiqaa 5): Kaayyoo guyyaa beeksisuu fi beekumsa duraa killeessuu.\n2. Dhiyeessa (Daqiiqaa 20): Qabiyyee ijoo gabatee irratti fakkeenyaan ibsuu.\n3. Shaakala Garee (Daqiiqaa 15): Barattoonni gareen gilgaalota akka shaakalan gochuu.\n4. Goolaba (Daqiiqaa 5): Qabxiiwwan ijoo killeessuu fi hojii manaa kennuu.',
    completed: false
  };

  return {
    date,
    lessons: [defaultLesson],
    notes: lang === 'am' 
      ? 'የተማሪዎች የክፍል ተሳትፎ፣ የቤት ስራ አፈጻጸምና ክትትል።'
      : lang === 'en'
      ? 'Classroom observations, student participation, homework tracking.'
      : 'Hirmaannaa barattootaa, hojii manaa, hubannoo daree, kkf...'
  };
}

export function saveDailyPlan(plan: DailyPlan, courseId?: string) {
  const targetId = courseId || getActiveCourseId();
  localStorage.setItem(`dailyPlan_${targetId}_${plan.date}`, JSON.stringify(plan));
  if (targetId === 'g5-math') {
    localStorage.setItem(`dailyPlan_${plan.date}`, JSON.stringify(plan));
  }
}
