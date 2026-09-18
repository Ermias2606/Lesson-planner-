import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Bookmark, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  ExternalLink,
  ChevronRight,
  Send,
  FileText
} from 'lucide-react';
import { Language, Course, Lesson } from '../types';
import { TEXTBOOK_LIBRARY, IntegratedCourseBook, TextbookUnit, TextbookExercise } from '../data/textbookLibrary';
import { translations } from '../lib/i18n';
import { cn } from '../lib/utils';

interface TextbookGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  courses: Course[];
  activeCourseId?: string;
  onApplyToDailyLesson?: (data: {
    chapter: string;
    mainTopic: string;
    studentBookPages: string;
    textbookExercises: string;
    teacherGuidePages: string;
    activities: string;
    objectives: string;
    methodology: string;
  }) => void;
}

export default function TextbookGuideModal({
  isOpen,
  onClose,
  language,
  courses,
  activeCourseId,
  onApplyToDailyLesson
}: TextbookGuideModalProps) {
  const t = translations[language];

  // Active course resolution
  const currentCourse = courses.find(c => c.id === activeCourseId) || courses[0];
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(currentCourse?.subjectKey || 'math');
  const [selectedGrade, setSelectedGrade] = useState<string>(currentCourse?.grade || '5');
  const [activeTab, setActiveTab] = useState<'studentBook' | 'teacherGuide'>('studentBook');
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  // Resolve matching textbook
  const bookData: IntegratedCourseBook = TEXTBOOK_LIBRARY.find(
    b => b.subjectKey === selectedSubjectKey && b.grade === selectedGrade
  ) || TEXTBOOK_LIBRARY.find(b => b.subjectKey === selectedSubjectKey) || TEXTBOOK_LIBRARY[0];

  const activeUnit: TextbookUnit = bookData.units[selectedUnitIndex] || bookData.units[0];

  const handleApplyUnitToDaily = (unit: TextbookUnit, exercise?: TextbookExercise) => {
    if (!onApplyToDailyLesson) return;

    const exerciseText = exercise 
      ? `${exercise.name[language]} (${t.pages}: ${exercise.pages}) - ${exercise.recommendedProblems[language]} | ${t.materials}: ${exercise.homeworkSuggestion[language]}`
      : unit.exercises.map(e => `${e.name[language]} (pp. ${e.pages})`).join('; ');

    const fivePhaseSteps = language === 'am' 
      ? `1. መግቢያ (5 ደ.): የቀደምት ትምህርት ክለሳና የዕለቱ አላማ。\n2. አቀራረብ (15 ደ.): ${unit.title.am} - በመጽሐፉ ገጽ ${unit.studentPages} ላይ ያሉ ምሳሌዎችን በሰሌዳ ላይ በተግባር ማሳየት。\n3. የቡድን ልምምድ (10 ደ.): ${exercise?.name.am || 'መልመጃዎች'} በቡድን እንዲሰሩ ማድረግ።\n4. የግል ሥራ (10 ደ.): ተማሪዎች ራሳቸውን ችለው በደብተራቸው እንዲሰሩ ማድረግ።\n5. ማጠቃለያ (5 ደ.): ማጠቃለልና የቤት ሥራ (${exercise?.homeworkSuggestion.am || 'ከመጽሐፉ ጥያቄዎች'}) መስጠት።`
      : language === 'en'
      ? `1. Activation & Introduction (5 mins): Review prior concepts and present daily learning goal.\n2. Direct Instruction (15 mins): Model worked problems from student textbook pages ${unit.studentPages}.\n3. Guided Group Practice (10 mins): Collaborative problem solving (${exercise?.name.en || 'Textbook Exercises'}).\n4. Independent Student Work (10 mins): Students work individually in exercise notebooks.\n5. Assessment & Wrap-up (5 mins): Formative check, summarize key takeaways, assign homework.`
      : `1. Seensa fi Qophii (Daq. 5): Beekumsa duraa killeessuu fi kaayyoo ifa gochuu.\n2. Ibsa Barsiisaa (Daq. 15): Fuula ${unit.studentPages} irraa fakkeenya gabatee irratti hojjechuun dhiyeessuu.\n3. Shaakala Garee (Daq. 10): ${exercise?.name.om || 'Gilgaala'} gareen akka hojjetan gochuu.\n4. Dalagaa Dhuunfaa (Daq. 10): Barattoonni dhuunfaatti dabtara isaaniirratti akka hojjetan taasisuu.\n5. Xumura fi Madaallii (Daq. 5): Goolaba gochuu fi hojii manaa (${exercise?.homeworkSuggestion.om || 'Gaaffilee kitaabaa'}) kennuu.`;

    onApplyToDailyLesson({
      chapter: unit.title[language],
      mainTopic: unit.title[language],
      studentBookPages: unit.studentPages,
      textbookExercises: exerciseText,
      teacherGuidePages: unit.teacherGuidePages,
      activities: fivePhaseSteps,
      objectives: unit.keyCompetencies[language],
      methodology: unit.teacherGuideMethod[language]
    });

    setCopiedNotification(language === 'am' ? 'ወደ ዕለታዊ ፕላን በተሳካ ሁኔታ ተላልፏል!' : language === 'en' ? 'Loaded directly into daily lesson plan!' : 'Gara sagantaa guyyaatti ergameera!');
    setTimeout(() => {
      setCopiedNotification(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/90 text-white flex items-center justify-center shadow-inner">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {t.openTextbookLibrary}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
                  2016 MoE Official
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">
                {bookData.studentBook.title[language]} • {bookData.studentBook.edition}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Course & Grade Selector Strip */}
        <div className="px-5 py-2.5 bg-slate-100 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">{t.subjectTitle}:</span>
            <div className="flex gap-1.5 overflow-x-auto">
              {TEXTBOOK_LIBRARY.map((bk) => (
                <button
                  key={bk.subjectKey}
                  onClick={() => {
                    setSelectedSubjectKey(bk.subjectKey);
                    setSelectedGrade(bk.grade);
                    setSelectedUnitIndex(0);
                  }}
                  className={cn(
                    "px-3 py-1 rounded-lg font-semibold transition-all text-xs whitespace-nowrap",
                    selectedSubjectKey === bk.subjectKey
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {bk.studentBook.title[language].split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Book Metadata Pills */}
          <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <span className="bg-white px-2 py-0.5 rounded-md border border-gray-200">
              {bookData.studentBook.publisher[language]}
            </span>
            <span className="bg-white px-2 py-0.5 rounded-md border border-gray-200">
              {bookData.studentBook.totalPages} {t.pages}
            </span>
          </div>
        </div>

        {/* Tab Switcher: Student Textbook vs Teacher's Guide */}
        <div className="px-5 pt-3 pb-0 bg-white border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('studentBook')}
              className={cn(
                "pb-2.5 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all",
                activeTab === 'studentBook'
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              )}
            >
              <BookOpen size={16} />
              <span>{t.studentTextbook}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                STB
              </span>
            </button>

            <button
              onClick={() => setActiveTab('teacherGuide')}
              className={cn(
                "pb-2.5 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all",
                activeTab === 'teacherGuide'
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              )}
            >
              <GraduationCap size={16} />
              <span>{t.teacherGuide}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded-full font-bold">
                TG 45m Model
              </span>
            </button>
          </div>

          {copiedNotification && (
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-pulse">
              <CheckCircle2 size={14} />
              {copiedNotification}
            </div>
          )}
        </div>

        {/* Modal Main Content: Left Unit Selector + Right Unit Details */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Chapters / Units List */}
          <div className="md:col-span-4 border-r border-gray-200 bg-slate-50/70 p-3 overflow-y-auto max-h-[60vh] md:max-h-[64vh] flex flex-col gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-2 pt-1 pb-1">
              {language === 'am' ? 'የመጽሐፉ ምዕራፎች' : language === 'en' ? 'Curriculum Units' : 'Boqonnaalee Kitaabaa'}
            </div>

            {bookData.units.map((unit, idx) => {
              const isSelected = idx === selectedUnitIndex;
              return (
                <button
                  key={unit.unitNumber}
                  onClick={() => setSelectedUnitIndex(idx)}
                  className={cn(
                    "text-left p-3 rounded-xl transition-all border text-xs flex flex-col gap-1.5",
                    isSelected
                      ? "bg-white border-indigo-500 shadow-xs ring-1 ring-indigo-500/20"
                      : "bg-white/80 border-gray-200 hover:bg-white text-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-bold text-[11px] px-1.5 py-0.5 rounded",
                      isSelected ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
                    )}>
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500">
                      STB: pp. {unit.studentPages}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-900 leading-snug line-clamp-2">
                    {unit.title[language]}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                    <span>TG: pp. {unit.teacherGuidePages}</span>
                    <span className="text-indigo-600 font-medium">
                      {unit.exercises.length} {language === 'am' ? 'መልመጃዎች' : language === 'en' ? 'exercises' : 'gilgaalota'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Unit Information & Tools */}
          <div className="md:col-span-8 p-4 sm:p-6 overflow-y-auto max-h-[60vh] md:max-h-[64vh] flex flex-col gap-5 bg-white">
            
            {/* Unit Title Banner */}
            <div className="border-b pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  {activeUnit.title[language].split(':')[0]}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-gray-600 bg-slate-100 px-2 py-0.5 rounded border border-gray-200">
                    📖 {t.studentBookPages}: <strong className="text-gray-900">{activeUnit.studentPages}</strong>
                  </span>
                  <span className="text-gray-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-emerald-800">
                    📘 {t.teacherGuidePages}: <strong className="text-emerald-950">{activeUnit.teacherGuidePages}</strong>
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {activeUnit.title[language]}
              </h3>
            </div>

            {/* TAB 1: Student Textbook Content */}
            {activeTab === 'studentBook' && (
              <div className="flex flex-col gap-4 text-xs">
                
                {/* Minimum Learning Competencies from Book */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5">
                    <GraduationCap size={15} className="text-indigo-600" />
                    {language === 'am' ? 'ዝቅተኛ የመማር ብቃት (Minimum Learning Competency)' : language === 'en' ? 'Minimum Learning Competency (MoE)' : 'Dandeettiiwwan Bu\'uuraa (MLC)'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {activeUnit.keyCompetencies[language]}
                  </p>
                </div>

                {/* Real Textbook Exercises List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                      <Bookmark size={15} className="text-indigo-600" />
                      {t.textbookExercises} ({activeUnit.exercises.length})
                    </h4>
                    <span className="text-[11px] text-gray-500">
                      {language === 'am' ? 'የክፍልና የቤት ሥራዎች' : language === 'en' ? 'Classwork & Homework sets' : 'Hojii daree fi manaa'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {activeUnit.exercises.map((exercise) => (
                      <div 
                        key={exercise.id}
                        className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-3.5 flex flex-col gap-2 hover:border-indigo-300 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-indigo-900 text-xs">
                            {exercise.name[language]}
                          </span>
                          <span className="text-[11px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                            {t.pages}: {exercise.pages}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 mt-1">
                          <div className="bg-white p-2 rounded-lg border border-gray-200">
                            <span className="font-bold text-gray-900 block mb-0.5 text-[11px]">
                              📝 {language === 'am' ? 'የክፍል ሥራ ጥያቄዎች' : language === 'en' ? 'Classwork Questions' : 'Gaaffilee Daree'}:
                            </span>
                            <span>{exercise.recommendedProblems[language]}</span>
                          </div>

                          <div className="bg-white p-2 rounded-lg border border-gray-200">
                            <span className="font-bold text-gray-900 block mb-0.5 text-[11px]">
                              🏠 {language === 'am' ? 'የቤት ሥራ ጥያቄዎች' : language === 'en' ? 'Homework Problems' : 'Hojii Manaa'}:
                            </span>
                            <span>{exercise.homeworkSuggestion[language]}</span>
                          </div>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleApplyUnitToDaily(activeUnit, exercise)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                          >
                            <Send size={13} />
                            {t.applyToLesson}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-2">
                  <button
                    onClick={() => handleApplyUnitToDaily(activeUnit)}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Send size={14} />
                    {t.applyToLesson} ({language === 'am' ? 'ከሙሉ ምዕራፉ ጋር' : language === 'en' ? 'With Unit Overview' : 'Qabiyyee Waliigalaa Wajjin'})
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Teacher's Guide Pedagogical Instructions */}
            {activeTab === 'teacherGuide' && (
              <div className="flex flex-col gap-4 text-xs">
                
                {/* 5-Phase Lesson Plan Recommendation */}
                <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                      <Clock size={16} className="text-emerald-700" />
                      {t.fivePhaseLesson}
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      45 Minutes Total
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] mt-1">
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block">1. Intro (5m)</span>
                      <p className="text-gray-600 mt-1">Recap & hook prior knowledge.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block">2. Model (15m)</span>
                      <p className="text-gray-600 mt-1">Teacher demonstration on board.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block">3. Groups (10m)</span>
                      <p className="text-gray-600 mt-1">Guided pair/table exercise.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block">4. Solo (10m)</span>
                      <p className="text-gray-600 mt-1">Independent notebook work.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block">5. Wrap (5m)</span>
                      <p className="text-gray-600 mt-1">Exit check & assign homework.</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs text-emerald-950 mt-1">
                    <strong>{t.teacherGuideStrategy}:</strong> {activeUnit.teacherGuideMethod[language]}
                  </div>
                </div>

                {/* Common Misconceptions */}
                <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5 text-xs mb-1">
                    <HelpCircle size={15} className="text-amber-700" />
                    {t.commonMisconceptions}
                  </h4>
                  <p className="text-amber-950 leading-relaxed text-xs">
                    {activeUnit.commonMisconceptions[language]}
                  </p>
                </div>

                {/* Inclusive & Differentiated Support */}
                <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-xl">
                  <h4 className="font-bold text-blue-900 flex items-center gap-1.5 text-xs mb-1">
                    <Users size={15} className="text-blue-700" />
                    {t.inclusiveSupport}
                  </h4>
                  <p className="text-blue-950 leading-relaxed text-xs">
                    {activeUnit.inclusiveTips[language]}
                  </p>
                </div>

                {/* Apply Teacher Guide to Lesson Plan */}
                <div className="pt-2">
                  <button
                    onClick={() => handleApplyUnitToDaily(activeUnit)}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Send size={14} />
                    {t.applyToLesson} ({language === 'am' ? 'ከ45 ደቂቃ መዋቅር ጋር' : language === 'en' ? 'With 45-Min Guide Flow' : 'Tooftaa Barsiisuu Wajjin'})
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500 text-[11px]">
            {language === 'am' 
              ? 'በኢትዮጵያ 2016 አዲስ ሥርዓተ-ትምህርት መሠረት የተዘጋጀ የተማሪ መጽሐፍና የመምህሩ መምሪያ'
              : language === 'en'
              ? 'Based on the 2016 Ethiopian National Curriculum Framework Textbooks & Teacher\'s Guides'
              : 'Akkaadaamii Barnoota Biyyooleessaa 2016 A.L.I irratti hundaa\'ee qophaa\'e'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition-colors"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
