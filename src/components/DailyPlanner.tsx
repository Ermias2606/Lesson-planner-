import React, { useState, useEffect } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Printer, 
  Sparkles, 
  Search, 
  X,
  Calendar,
  Check,
  GraduationCap,
  Bookmark,
  FileText,
  Download
} from 'lucide-react';
import { DailyPlan, Lesson, CurriculumWeek, Language } from '../types';
import { getDailyPlan, saveDailyPlan, getCurriculum, getActiveCourse, getCourses } from '../lib/storage';
import { translations } from '../lib/i18n';
import { cn } from '../lib/utils';
import TextbookGuideModal from './TextbookGuideModal';
import { getIntegratedBook, TEXTBOOK_LIBRARY } from '../data/textbookLibrary';

interface DailyPlannerProps {
  language: Language;
  activeCourseId?: string;
  initialCurriculumWeek?: CurriculumWeek | null;
  onClearInitialWeek?: () => void;
  onOpenPrintView?: () => void;
  onOpenExportModal?: (docType?: 'annual' | 'daily') => void;
}

export default function DailyPlanner({ 
  language, 
  activeCourseId,
  initialCurriculumWeek, 
  onClearInitialWeek,
  onOpenPrintView,
  onOpenExportModal
}: DailyPlannerProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [plan, setPlan] = useState<DailyPlan>(() => getDailyPlan(format(new Date(), 'yyyy-MM-dd'), language, activeCourseId));
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);
  const [textbookModalOpen, setTextbookModalOpen] = useState(false);
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [curriculumSemester, setCurriculumSemester] = useState<'all' | 1 | 2>('all');
  const [curriculum, setCurriculum] = useState<CurriculumWeek[]>(() => getCurriculum(activeCourseId));
  const [activeLessonIdForImport, setActiveLessonIdForImport] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const t = translations[language];
  const dateString = format(currentDate, 'yyyy-MM-dd');

  useEffect(() => {
    setPlan(getDailyPlan(dateString, language, activeCourseId));
    setCurriculum(getCurriculum(activeCourseId));
  }, [dateString, language, activeCourseId]);

  const getActivityTemplate = (topic: string, pages: string, lang: Language) => {
    if (lang === 'am') {
      return `1. መግቢያ (5 ደቂቃ): የዕለቱን አላማ ማስተዋወቅና ቀደምት እውቀትን መከለስ።\n2. አቀራረብ (20 ደቂቃ): ${topic} በሰሌዳ ላይ በተግባር ማሳየትና ማብራራት።\n3. የቡድን ልምምድ (15 ደቂቃ): ተማሪዎች በገጽ ${pages} ላይ ያሉትን መልመጃዎች በቡድን እንዲሰሩ ማድረግ።\n4. ማጠቃለያ (5 ደቂቃ): ዋና ዋና ነጥቦችን ማጠቃለልና የቤት ስራ መስጠት።`;
    }
    if (lang === 'en') {
      return `1. Introduction (5 mins): Announce daily objectives and review prior knowledge.\n2. Presentation (20 mins): Teach ${topic} with worked examples on blackboard.\n3. Group Practice (15 mins): Students solve exercises from page ${pages} in small groups.\n4. Summary (5 mins): Summarize key points and assign homework.`;
    }
    return `1. Seensa (Daqiiqaa 5): Kaayyoo guyyaa beeksisuu fi beekumsa duraa killeessuu.\n2. Dhiyeessa (Daqiiqaa 20): ${topic} barsiisuu fi gabatee irratti fakkeenyaan agarsiisuu.\n3. Shaakala Garee (Daqiiqaa 15): Gilgaala fuula ${pages} hojjechiisuu.\n4. Goolaba (Daqiiqaa 5): Qabxiiwwan ijoo killeessuu fi hojii manaa kennuu.`;
  };

  // Handle incoming selection from Annual Planner
  useEffect(() => {
    if (initialCurriculumWeek) {
      const topic = initialCurriculumWeek.mainTopic[language];
      const newLesson: Lesson = {
        id: crypto.randomUUID(),
        timeStart: '08:30',
        timeEnd: '09:15',
        subject: language === 'am' ? 'ሒሳብ (Mathematics)' : language === 'en' ? 'Mathematics' : 'Herrega (Mathematics)',
        chapter: initialCurriculumWeek.chapter[language],
        mainTopic: topic,
        objectives: initialCurriculumWeek.generalObjectives[language],
        priorKnowledge: initialCurriculumWeek.priorKnowledge[language],
        methodology: initialCurriculumWeek.teachingMethod[language],
        materials: initialCurriculumWeek.teachingAids[language],
        assessment: initialCurriculumWeek.assessment[language],
        activities: getActivityTemplate(topic, initialCurriculumWeek.pages, language),
        studentBookPages: initialCurriculumWeek.studentBookPages || initialCurriculumWeek.pages,
        textbookExercises: initialCurriculumWeek.studentBookExercises?.[language] || (initialCurriculumWeek.pages ? `Exercises on pp. ${initialCurriculumWeek.pages}` : ''),
        teacherGuidePages: initialCurriculumWeek.teacherGuidePages || 'TG',
        teacherGuideSteps: initialCurriculumWeek.teacherGuidePedagogy?.[language],
        completed: false
      };
      
      setPlan(prev => {
        const updated = { ...prev, lessons: [newLesson, ...prev.lessons] };
        saveDailyPlan(updated, activeCourseId);
        return updated;
      });

      if (onClearInitialWeek) onClearInitialWeek();
    }
  }, [initialCurriculumWeek, language, activeCourseId]);

  const updatePlan = (newPlan: DailyPlan) => {
    setPlan(newPlan);
    saveDailyPlan(newPlan, activeCourseId);
  };

  const handlePrevDay = () => setCurrentDate(subDays(currentDate, 1));
  const handleNextDay = () => setCurrentDate(addDays(currentDate, 1));
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCurrentDate(parseISO(e.target.value));
    }
  };

  const addLesson = () => {
    const currentCourse = getActiveCourse();
    const currentSubjectName = currentCourse?.subjectName[language] || (language === 'am' ? 'ሒሳብ' : language === 'en' ? 'Mathematics' : 'Herrega');

    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      timeStart: '08:30',
      timeEnd: '09:15',
      subject: currentSubjectName,
      chapter: '',
      mainTopic: '',
      objectives: '',
      priorKnowledge: '',
      methodology: '',
      materials: '',
      assessment: '',
      studentBookPages: '',
      textbookExercises: '',
      teacherGuidePages: '',
      teacherGuideSteps: '',
      activities: getActivityTemplate('', '', language),
      completed: false
    };
    updatePlan({ ...plan, lessons: [...plan.lessons, newLesson] });
  };

  const updateLesson = (id: string, field: keyof Lesson, value: any) => {
    const newLessons = plan.lessons.map(l => l.id === id ? { ...l, [field]: value } : l);
    updatePlan({ ...plan, lessons: newLessons });
  };

  const deleteLesson = (id: string) => {
    const newLessons = plan.lessons.filter(l => l.id !== id);
    updatePlan({ ...plan, lessons: newLessons });
  };

  const handleAutofillFromGuide = (lessonId: string) => {
    const activeCourse = getActiveCourse();
    const book = getIntegratedBook(activeCourse?.subjectKey || 'math', activeCourse?.grade || '5');
    const lesson = plan.lessons.find(l => l.id === lessonId);
    if (!book || !lesson) return;

    // Pick matching unit or default to first
    const unit = book.units[0];
    const exercise = unit.exercises[0];

    const exerciseSummary = exercise
      ? `${exercise.name[language]} (pp. ${exercise.pages})`
      : `Unit ${unit.unitNumber} Exercises (pp. ${unit.studentPages})`;

    const fivePhaseActivities = language === 'am'
      ? `1. መግቢያና ክለሳ (5 ደ.): የቀደምት ትምህርት ግንኙነትን መፈተሽና የዕለቱን ግብ ማሳወቅ。\n2. አቀራረብ (15 ደ.): ${unit.title.am} - በተማሪ መጽሐፍ ገጽ ${unit.studentPages} ላይ የተሰጡትን ምሳሌዎች በሰሌዳ ላይ በተግባር ማሳየት。\n3. የቡድን ስራ (10 ደ.): ተማሪዎች ${exerciseSummary} በቡድን ሆነው እንዲሰሩ ማበረታታትና ማገዝ。\n4. የግል ስራ (10 ደ.): ተማሪዎች ራሳቸውን ችለው በደብተራቸው እንዲሰሩ ማድረግ。\n5. ማጠቃለያና የቤት ስራ (5 ደ.): ዋና ነጥቦችን ማጠቃለል፤ ከመጽሐፉ የቤት ስራ (${exercise?.homeworkSuggestion.am || 'ጥያቄዎች'}) መስጠት።`
      : language === 'en'
      ? `1. Intro & Hook (5 mins): Activate prior knowledge and present clear learning goal.\n2. Direct Modeling (15 mins): ${unit.title.en} - Model textbook examples from pages ${unit.studentPages} on blackboard.\n3. Guided Group Practice (10 mins): Collaborative problem solving on ${exerciseSummary}.\n4. Independent Student Work (10 mins): Individual completion in exercise books with roaming feedback.\n5. Wrap-up & Homework (5 mins): Check exit understanding and assign textbook homework (${exercise?.homeworkSuggestion.en || 'exercises'}).`
      : `1. Seensa fi Beekumsa Duraa (Daq. 5): Kaayyoo guyyaa beeksisuu fi beekumsa duraa killeessuu.\n2. Dhiyeessa Barsiisaa (Daq. 15): ${unit.title.om} - Fuula ${unit.studentPages} irraa fakkeenya gabatee irratti hojjechuun dhiyeessuu.\n3. Shaakala Garee (Daq. 10): ${exerciseSummary} gareen akka hojjetan hordofuu fi deeggaruu.\n4. Dalagaa Dhuunfaa (Daq. 10): Barattoonni dhuunfaatti dabtara isaaniirratti akka hojjetan gochuu.\n5. Goolaba fi Hojii Manaa (Daq. 5): Qabxiiwwan ijoo killeessuu fi hojii manaa (${exercise?.homeworkSuggestion.om || 'Gilgaala kitaabaa'}) kennuu.`;

    const newLessons = plan.lessons.map(l => {
      if (l.id === lessonId) {
        return {
          ...l,
          chapter: l.chapter || unit.title[language],
          mainTopic: l.mainTopic || unit.title[language],
          studentBookPages: unit.studentPages,
          textbookExercises: exerciseSummary,
          teacherGuidePages: unit.teacherGuidePages,
          teacherGuideSteps: unit.teacherGuideMethod[language],
          objectives: l.objectives || unit.keyCompetencies[language],
          methodology: unit.teacherGuideMethod[language],
          materials: `${book.studentBook.title[language]}, ${t.blackboard || 'Gabatee'}, ${book.teacherGuide.title[language]}`,
          activities: fivePhaseActivities,
          assessment: language === 'am' ? `የክፍል ተሳትፎና የመጽሐፉ መልመጃ (${exerciseSummary})` : language === 'en' ? `Formative checks and textbook exercise submission (${exerciseSummary})` : `Hirmaannaa daree fi gilgaala kitaabaa (${exerciseSummary})`
        };
      }
      return l;
    });

    updatePlan({ ...plan, lessons: newLessons });
    setFeedbackToast(language === 'am' ? 'ከመምህሩ መምሪያና ከመጽሐፉ በቀጥታ ተሞላ!' : language === 'en' ? 'Auto-filled from official Teacher\'s Guide & Textbook!' : 'Qajeelcha Barsiisaa fi Kitaaba Barataarraa guutameera!');
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  const handleSelectFromCurriculum = (week: CurriculumWeek) => {
    const topic = week.mainTopic[language];
    if (activeLessonIdForImport) {
      const newLessons = plan.lessons.map(l => {
        if (l.id === activeLessonIdForImport) {
          return {
            ...l,
            chapter: week.chapter[language],
            mainTopic: topic,
            objectives: week.generalObjectives[language],
            priorKnowledge: week.priorKnowledge[language],
            methodology: week.teachingMethod[language],
            materials: week.teachingAids[language],
            assessment: week.assessment[language],
            studentBookPages: week.studentBookPages || week.pages,
            textbookExercises: week.studentBookExercises?.[language] || (week.pages ? `Exercises on pp. ${week.pages}` : ''),
            teacherGuidePages: week.teacherGuidePages || 'TG',
            teacherGuideSteps: week.teacherGuidePedagogy?.[language],
            activities: getActivityTemplate(topic, week.pages, language)
          };
        }
        return l;
      });
      updatePlan({ ...plan, lessons: newLessons });
    } else {
      const newLesson: Lesson = {
        id: crypto.randomUUID(),
        timeStart: '08:30',
        timeEnd: '09:15',
        subject: language === 'am' ? 'ሒሳብ (Mathematics)' : language === 'en' ? 'Mathematics' : 'Herrega (Mathematics)',
        chapter: week.chapter[language],
        mainTopic: topic,
        objectives: week.generalObjectives[language],
        priorKnowledge: week.priorKnowledge[language],
        methodology: week.teachingMethod[language],
        materials: week.teachingAids[language],
        assessment: week.assessment[language],
        studentBookPages: week.studentBookPages || week.pages,
        textbookExercises: week.studentBookExercises?.[language] || (week.pages ? `Exercises on pp. ${week.pages}` : ''),
        teacherGuidePages: week.teacherGuidePages || 'TG',
        teacherGuideSteps: week.teacherGuidePedagogy?.[language],
        activities: getActivityTemplate(topic, week.pages, language),
        completed: false
      };
      updatePlan({ ...plan, lessons: [...plan.lessons, newLesson] });
    }
    setCurriculumModalOpen(false);
    setActiveLessonIdForImport(null);
  };

  const filteredCurriculum = curriculum.filter(w => {
    if (curriculumSemester !== 'all' && w.semester !== curriculumSemester) return false;
    if (curriculumSearch.trim() !== '') {
      const q = curriculumSearch.toLowerCase();
      return (
        (w.mainTopic[language] || '').toLowerCase().includes(q) ||
        (w.chapter[language] || '').toLowerCase().includes(q) ||
        (w.monthName[language] || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header & Date Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">
              {language === 'am' ? '5ኛ ክፍል - ሒሳብ' : language === 'en' ? 'Grade 5 - Math' : 'Kutaa 5ffaa - Herrega'}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {language === 'am' ? '2016 ዓ.ም' : language === 'en' ? '2016 E.C.' : 'Bara 2016 A.L.I'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
            {t.dailyTitle}
          </h1>
          <p className="text-xs text-gray-600">{t.dailySubtitle}</p>
        </div>
        
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-gray-200 shadow-2xs">
            <button 
              onClick={handlePrevDay}
              className="p-1.5 rounded-md hover:bg-white text-gray-600 transition-colors"
              title={t.prevDay}
            >
              <ChevronLeft size={18} />
            </button>
            
            <input 
              type="date"
              value={dateString}
              onChange={handleDateChange}
              className="border-none text-xs font-semibold text-gray-800 bg-transparent focus:ring-0 cursor-pointer px-2"
            />
            
            <button 
              onClick={handleNextDay}
              className="p-1.5 rounded-md hover:bg-white text-gray-600 transition-colors"
              title={t.nextDay}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            onClick={() => setTextbookModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
            title={t.openTextbookLibrary}
          >
            <BookOpen size={14} className="text-amber-400" />
            <span className="hidden sm:inline">{t.openTextbookLibrary}</span>
            <span className="sm:hidden">{t.textbookRef}</span>
          </button>

          <button
            onClick={() => {
              setActiveLessonIdForImport(null);
              setCurriculumModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">{t.importFromAnnual}</span>
            <span className="sm:hidden">{t.importFromAnnual.slice(0, 10)}...</span>
          </button>

          {/* Export Daily Plan Button */}
          <button
            onClick={() => onOpenExportModal ? onOpenExportModal('daily') : onOpenPrintView ? onOpenPrintView() : window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title={t.exportBtn}
          >
            <Download size={14} />
            <span className="hidden sm:inline">{t.exportBtn}</span>
          </button>

          {/* Print / PDF Daily Plan Button */}
          <button
            onClick={() => onOpenPrintView ? onOpenPrintView() : window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title={t.printPdf}
          >
            <Printer size={14} />
            <span className="hidden sm:inline">{t.printPdf}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Schedule Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {plan.lessons.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-xl border-2 border-dashed border-gray-300 p-6">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-base font-bold text-gray-900">{t.noDailyLessons}</h3>
              <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
                {t.noDailyLessonsDesc}
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setActiveLessonIdForImport(null);
                    setCurriculumModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-semibold"
                >
                  <BookOpen size={15} />
                  {t.importFromAnnual}
                </button>
                <button
                  onClick={addLesson}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-semibold"
                >
                  <Plus size={15} />
                  {t.addLesson}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {plan.lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className={cn(
                    "bg-white rounded-xl shadow-xs border transition-all duration-200 overflow-hidden",
                    lesson.completed ? "border-emerald-300 bg-emerald-50/20" : "border-gray-200"
                  )}
                >
                  {/* Lesson Header */}
                  <div className={cn(
                    "px-4 py-3 border-b flex items-center justify-between",
                    lesson.completed ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-slate-50"
                  )}>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateLesson(lesson.id, 'completed', !lesson.completed)}
                        className={cn(
                          "transition-colors",
                          lesson.completed ? "text-emerald-600" : "text-gray-300 hover:text-indigo-500"
                        )}
                        title={lesson.completed ? t.completed : t.notCompleted}
                      >
                        {lesson.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                      </button>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                        <Clock size={14} className="text-gray-400" />
                        <input
                          type="time"
                          value={lesson.timeStart}
                          onChange={(e) => updateLesson(lesson.id, 'timeStart', e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-xs w-16 font-bold"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="time"
                          value={lesson.timeEnd}
                          onChange={(e) => updateLesson(lesson.id, 'timeEnd', e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-xs w-16 font-bold"
                        />
                        <span className="text-gray-400 text-[11px] ml-1">{t.duration45Min}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setActiveLessonIdForImport(lesson.id);
                          setCurriculumModalOpen(true);
                        }}
                        className="px-2 py-1 text-[11px] font-medium text-indigo-600 hover:bg-indigo-50 rounded flex items-center gap-1 border border-indigo-200"
                      >
                        <BookOpen size={12} />
                        {language === 'am' ? 'ከዕቅድ' : language === 'en' ? 'From Plan' : 'Waggaa Irraa'}
                      </button>
                      <button 
                        onClick={() => deleteLesson(lesson.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title={t.delete}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Integrated Textbook & Teacher's Guide reference bar */}
                  <div className="bg-slate-50 border-b border-indigo-100/80 p-3 px-4 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-950 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                        <BookOpen size={13} className="text-indigo-600" />
                        <span>{t.studentTextbook}:</span>
                        <strong className="text-indigo-700 font-bold">
                          {lesson.studentBookPages ? `${t.pages} ${lesson.studentBookPages}` : 'pp. 1-6'}
                        </strong>
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <GraduationCap size={13} className="text-emerald-700" />
                        <span>{t.teacherGuide}:</span>
                        <strong className="text-emerald-800 font-bold">
                          {lesson.teacherGuidePages || 'TG pp. 8-28'}
                        </strong>
                      </span>

                      {lesson.textbookExercises && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-700 bg-white px-2.5 py-1 rounded-md border border-gray-200 max-w-xs truncate" title={lesson.textbookExercises}>
                          <Bookmark size={12} className="text-amber-500 shrink-0" />
                          <span className="truncate">{lesson.textbookExercises}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAutofillFromGuide(lesson.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs border border-emerald-300"
                        title={t.loadFromGuide}
                      >
                        <Sparkles size={13} className="text-emerald-700" />
                        <span>{t.loadFromGuide}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTextbookModalOpen(true)}
                        className="px-2 py-1 text-[11px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg border border-gray-300 transition-colors"
                        title={t.openTextbookLibrary}
                      >
                        <FileText size={13} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Lesson Body */}
                  <div className="p-4 flex flex-col gap-3 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.subject}</label>
                        <input
                          type="text"
                          value={lesson.subject || ''}
                          onChange={(e) => updateLesson(lesson.id, 'subject', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.chapter}</label>
                        <input
                          type="text"
                          value={lesson.chapter || ''}
                          onChange={(e) => updateLesson(lesson.id, 'chapter', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.period}</label>
                        <input
                          type="text"
                          defaultValue={language === 'am' ? '1ኛ ክፍለ ጊዜ' : language === 'en' ? 'Period 1' : 'Wayitii 1ffaa'}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">{t.mainTopic}</label>
                      <input
                        type="text"
                        value={lesson.mainTopic || ''}
                        onChange={(e) => updateLesson(lesson.id, 'mainTopic', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs font-semibold text-gray-900 bg-indigo-50/30"
                      />
                    </div>

                    {/* Integrated Textbook Pages & Teacher Guide Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-indigo-50/20 p-2.5 rounded-xl border border-indigo-100">
                      <div>
                        <label className="block font-semibold text-indigo-950 mb-1 flex items-center gap-1">
                          <BookOpen size={13} className="text-indigo-600" />
                          {t.studentBookPages}
                        </label>
                        <input
                          type="text"
                          value={lesson.studentBookPages || ''}
                          onChange={(e) => updateLesson(lesson.id, 'studentBookPages', e.target.value)}
                          placeholder="e.g. 1 - 6"
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-indigo-950 mb-1 flex items-center gap-1">
                          <Bookmark size={13} className="text-amber-500" />
                          {t.textbookExercises}
                        </label>
                        <input
                          type="text"
                          value={lesson.textbookExercises || ''}
                          onChange={(e) => updateLesson(lesson.id, 'textbookExercises', e.target.value)}
                          placeholder="e.g. Gilgaala 1.1 (Q1 - 8)"
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-emerald-950 mb-1 flex items-center gap-1">
                          <GraduationCap size={13} className="text-emerald-700" />
                          {t.teacherGuidePages}
                        </label>
                        <input
                          type="text"
                          value={lesson.teacherGuidePages || ''}
                          onChange={(e) => updateLesson(lesson.id, 'teacherGuidePages', e.target.value)}
                          placeholder="e.g. TG 8 - 28"
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.objectives}</label>
                        <textarea
                          value={lesson.objectives || ''}
                          onChange={(e) => updateLesson(lesson.id, 'objectives', e.target.value)}
                          rows={2}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.priorKnowledge}</label>
                        <textarea
                          value={lesson.priorKnowledge || ''}
                          onChange={(e) => updateLesson(lesson.id, 'priorKnowledge', e.target.value)}
                          rows={2}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.teachingMethod}</label>
                        <textarea
                          value={lesson.methodology || ''}
                          onChange={(e) => updateLesson(lesson.id, 'methodology', e.target.value)}
                          rows={2}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">{t.materials}</label>
                        <textarea
                          value={lesson.materials || ''}
                          onChange={(e) => updateLesson(lesson.id, 'materials', e.target.value)}
                          rows={2}
                          className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Step-by-Step Lesson Procedure */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        {t.activities}
                      </label>
                      <textarea
                        value={lesson.activities || ''}
                        onChange={(e) => updateLesson(lesson.id, 'activities', e.target.value)}
                        rows={4}
                        className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs font-mono text-gray-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">{t.assessment}</label>
                      <input
                        type="text"
                        value={lesson.assessment || ''}
                        onChange={(e) => updateLesson(lesson.id, 'assessment', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 py-1.5 px-2.5 text-xs shadow-2xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addLesson}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors font-semibold text-xs"
              >
                <Plus size={16} />
                {t.addLesson}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          
          {/* Quick Curriculum Link Card */}
          <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-100 shadow-xs">
            <h3 className="font-bold text-indigo-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" />
              {language === 'am' ? 'የ2016 ዓመታዊ የሒሳብ ዕቅድ' : language === 'en' ? '2016 Annual Curriculum' : 'Karoora Waggaa 2016'}
            </h3>
            <p className="text-xs text-indigo-950 mb-3">
              {language === 'am'
                ? 'በሳምንት የተዘጋጁትን 42 ርዕሶች በቀጥታ በመምረጥ ወደ ዕለት ዕቅድ ይቅዱ።'
                : language === 'en'
                ? 'Pick from 42 structured weekly topics to auto-fill this daily lesson plan.'
                : 'Mata duree herregaa kutaa 5ffaa torbee torbeen qophaa\'e irraa filachuun battalumatti gara dareetti fidi.'}
            </p>
            <button
              onClick={() => {
                setActiveLessonIdForImport(null);
                setCurriculumModalOpen(true);
              }}
              className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
            >
              <BookOpen size={14} />
              {t.importFromAnnual}
            </button>
          </div>

          {/* Teacher Notes */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/80 shadow-xs">
            <h3 className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              {t.notesTitle}
            </h3>
            <textarea
              value={plan.notes}
              onChange={(e) => updatePlan({ ...plan, notes: e.target.value })}
              placeholder={t.notesPlaceholder}
              rows={10}
              className="block w-full bg-white/70 rounded-lg border border-amber-200 p-2.5 text-xs text-gray-800 placeholder:text-amber-800/40 focus:ring-2 focus:ring-amber-500 focus:bg-white resize-none shadow-2xs"
            />
          </div>

        </div>

      </div>

      {/* Curriculum Picker Modal */}
      {curriculumModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {t.selectWeekModalTitle}
                </h3>
                <p className="text-xs text-gray-500">
                  {t.selectWeekModalDesc}
                </p>
              </div>
              <button 
                onClick={() => setCurriculumModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Filters */}
            <div className="p-3 border-b bg-white flex flex-wrap gap-2 items-center">
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setCurriculumSemester('all')}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-semibold",
                    curriculumSemester === 'all' ? "bg-white text-indigo-700 shadow-2xs" : "text-gray-600"
                  )}
                >
                  {t.semesterAll}
                </button>
                <button
                  onClick={() => setCurriculumSemester(1)}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-semibold",
                    curriculumSemester === 1 ? "bg-white text-indigo-700 shadow-2xs" : "text-gray-600"
                  )}
                >
                  {t.semester1}
                </button>
                <button
                  onClick={() => setCurriculumSemester(2)}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-semibold",
                    curriculumSemester === 2 ? "bg-white text-indigo-700 shadow-2xs" : "text-gray-600"
                  )}
                >
                  {t.semester2}
                </button>
              </div>

              <div className="relative flex-1 min-w-[180px]">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border-gray-300 shadow-2xs"
                />
              </div>
            </div>

            {/* Curriculum List */}
            <div className="p-4 overflow-y-auto flex-1 divide-y divide-gray-100 space-y-2">
              {filteredCurriculum.map((week) => (
                <div 
                  key={week.id}
                  className="pt-2 flex items-start justify-between gap-4 p-3 hover:bg-indigo-50/50 rounded-xl border border-transparent hover:border-indigo-100 transition-colors"
                >
                  <div className="flex-1 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {week.monthName[language]} - {t.week} {week.weekNumber}
                      </span>
                      <span className="font-semibold text-gray-600">
                        {week.chapter[language]}
                      </span>
                      <span className="text-gray-400">
                        {t.pages}: {week.pages}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{week.mainTopic[language]}</h4>
                    <p className="text-gray-600 line-clamp-2 mb-1">{week.generalObjectives[language]}</p>
                    <div className="flex flex-wrap gap-3 text-[11px] text-gray-500">
                      <span><b className="text-gray-700">{t.teachingMethod}:</b> {week.teachingMethod[language]}</span>
                      <span><b className="text-gray-700">{t.materials}:</b> {week.teachingAids[language]}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectFromCurriculum(week)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shrink-0 shadow-2xs flex items-center gap-1 mt-1"
                  >
                    <Check size={14} />
                    {t.selectBtn}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Feedback Toast */}
      {feedbackToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Textbook & Teacher's Guide Library Modal */}
      <TextbookGuideModal
        isOpen={textbookModalOpen}
        onClose={() => setTextbookModalOpen(false)}
        language={language}
        courses={getCourses()}
        activeCourseId={activeCourseId}
        onApplyToDailyLesson={(data) => {
          if (plan.lessons.length > 0) {
            const firstLessonId = plan.lessons[0].id;
            const updated = plan.lessons.map(l => l.id === firstLessonId ? {
              ...l,
              chapter: data.chapter,
              mainTopic: data.mainTopic,
              studentBookPages: data.studentBookPages,
              textbookExercises: data.textbookExercises,
              teacherGuidePages: data.teacherGuidePages,
              activities: data.activities,
              objectives: data.objectives,
              methodology: data.methodology
            } : l);
            updatePlan({ ...plan, lessons: updated });
          } else {
            const newLesson: Lesson = {
              id: crypto.randomUUID(),
              timeStart: '08:30',
              timeEnd: '09:15',
              subject: language === 'am' ? 'ሒሳብ' : language === 'en' ? 'Mathematics' : 'Herrega',
              chapter: data.chapter,
              mainTopic: data.mainTopic,
              studentBookPages: data.studentBookPages,
              textbookExercises: data.textbookExercises,
              teacherGuidePages: data.teacherGuidePages,
              teacherGuideSteps: data.methodology,
              activities: data.activities,
              objectives: data.objectives,
              priorKnowledge: '',
              methodology: data.methodology,
              materials: `${t.studentTextbook}, ${t.blackboard || 'Gabatee'}`,
              assessment: `${t.textbookExercises} (${data.textbookExercises})`,
              completed: false
            };
            updatePlan({ ...plan, lessons: [newLesson] });
          }
          setTextbookModalOpen(false);
          setFeedbackToast(language === 'am' ? 'ከመጽሐፉ ወደ ዕለታዊ ፕላን ተላለፈ!' : language === 'en' ? 'Loaded from textbook into daily plan!' : 'Kitaaba barataarraa galfameera!');
          setTimeout(() => setFeedbackToast(null), 2500);
        }}
      />
    </div>
  );
}
