import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Check, 
  Trash2, 
  Edit3, 
  Layers, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  Clock, 
  AlertCircle,
  Copy,
  ChevronRight
} from 'lucide-react';
import { Course, Language, CurriculumWeek, SchoolInfo } from '../types';
import { translations } from '../lib/i18n';
import { 
  STANDARD_SUBJECTS, 
  GRADE_LEVELS, 
  generateCurriculumForClass, 
  SubjectPreset 
} from '../data/curriculumTemplates';
import { cn } from '../lib/utils';
import { getCurriculum } from '../lib/storage';

interface ClassManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  activeCourseId: string;
  language: Language;
  onSelectCourse: (courseId: string) => void;
  onAddCourse: (course: Course, curriculum: CurriculumWeek[]) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

export default function ClassManagerModal({
  isOpen,
  onClose,
  courses,
  activeCourseId,
  language,
  onSelectCourse,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}: ClassManagerModalProps) {
  const [viewState, setViewState] = useState<'list' | 'add' | 'edit'>('list');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states for adding or editing
  const [selectedGrade, setSelectedGrade] = useState<string>('5');
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>('env_science');
  const [customSubjectOm, setCustomSubjectOm] = useState('');
  const [customSubjectAm, setCustomSubjectAm] = useState('');
  const [customSubjectEn, setCustomSubjectEn] = useState('');
  const [section, setSection] = useState('A & B');
  const [weeklyPeriods, setWeeklyPeriods] = useState<number>(4);
  const [teacherName, setTeacherName] = useState('');
  const [creationStrategy, setCreationStrategy] = useState<'full_template' | 'clone' | 'blank'>('full_template');
  const [cloneSourceCourseId, setCloneSourceCourseId] = useState<string>(activeCourseId);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = translations[language];

  // Helper to get active course object
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  const handleOpenAdd = () => {
    // Pre-populate with reasonable defaults based on current school info
    setSelectedGrade('5');
    setSelectedSubjectKey('env_science');
    const defaultPreset = STANDARD_SUBJECTS.find(s => s.key === 'env_science');
    setWeeklyPeriods(defaultPreset?.defaultWeeklyPeriods || 4);
    setSection('A & B');
    setTeacherName(activeCourse?.schoolInfo.teacherName[language] || '');
    setCustomSubjectOm('');
    setCustomSubjectAm('');
    setCustomSubjectEn('');
    setCreationStrategy('full_template');
    setCloneSourceCourseId(activeCourseId);
    setErrorMsg(null);
    setViewState('add');
  };

  const handleOpenEdit = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCourse(course);
    setSelectedGrade(course.grade);
    setSelectedSubjectKey(course.subjectKey);
    setSection(course.section);
    setWeeklyPeriods(parseInt(course.schoolInfo.weeklyPeriods) || 5);
    setTeacherName(course.schoolInfo.teacherName[language] || '');
    setCustomSubjectOm(course.subjectName.om);
    setCustomSubjectAm(course.subjectName.am);
    setCustomSubjectEn(course.subjectName.en);
    setErrorMsg(null);
    setViewState('edit');
  };

  const handleSubjectSelect = (preset: SubjectPreset) => {
    setSelectedSubjectKey(preset.key);
    setWeeklyPeriods(preset.defaultWeeklyPeriods);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const gradeObj = GRADE_LEVELS.find(g => g.id === selectedGrade) || {
      id: selectedGrade,
      name: {
        om: `Kutaa ${selectedGrade}ffaa`,
        am: `${selectedGrade}ኛ ክፍል`,
        en: `Grade ${selectedGrade}`
      }
    };

    let subjectNameObj: { om: string; am: string; en: string };
    let colorToken = 'indigo';

    if (selectedSubjectKey === 'custom') {
      if (!customSubjectOm.trim() && !customSubjectEn.trim() && !customSubjectAm.trim()) {
        setErrorMsg(language === 'om' ? 'Maaloo maqaa gosa barnootaa barreessaa.' : language === 'am' ? 'እባክዎ የትምህርት ዓይነቱን ስም ያስገቡ።' : 'Please enter the subject name.');
        return;
      }
      subjectNameObj = {
        om: customSubjectOm.trim() || customSubjectEn.trim() || 'Barnoota Haaraa',
        am: customSubjectAm.trim() || customSubjectEn.trim() || 'አዲስ ትምህርት',
        en: customSubjectEn.trim() || customSubjectOm.trim() || 'New Subject'
      };
      colorToken = 'slate';
    } else {
      const preset = STANDARD_SUBJECTS.find(s => s.key === selectedSubjectKey);
      if (!preset) return;
      subjectNameObj = preset.name;
      colorToken = preset.color;
    }

    const uniqueId = `course-${selectedGrade}-${selectedSubjectKey}-${Date.now().toString().slice(-4)}`;

    const currentSchool = activeCourse?.schoolInfo;
    const newSchoolInfo: SchoolInfo = {
      schoolName: currentSchool?.schoolName || {
        om: 'Mana Barumsaa Sadarkaa 1ffaa',
        am: 'አንደኛ ደረጃ ትምህርት ቤት',
        en: 'Primary School'
      },
      academicYear: currentSchool?.academicYear || {
        om: '2016 B.A (2023/24)',
        am: '2016 ዓ.ም (2023/24)',
        en: '2016 E.C (2023/24)'
      },
      teacherName: {
        om: teacherName.trim() || currentSchool?.teacherName.om || 'Barsiisaa',
        am: teacherName.trim() || currentSchool?.teacherName.am || 'መምህር',
        en: teacherName.trim() || currentSchool?.teacherName.en || 'Teacher'
      },
      gradeAndSection: {
        om: `${gradeObj.name.om} ${section.trim()}`,
        am: `${gradeObj.name.am} ${section.trim()}`,
        en: `${gradeObj.name.en} ${section.trim()}`
      },
      subject: subjectNameObj,
      annualDays: '180',
      annualPeriods: (weeklyPeriods * 43).toString(),
      weeklyPeriods: weeklyPeriods.toString(),
      periodDuration: currentSchool?.periodDuration || {
        om: 'Daqiiqaa 45',
        am: '45 ደቂቃ',
        en: '45 Minutes'
      },
      departmentHeadName: currentSchool?.departmentHeadName || { om: '---', am: '---', en: '---' },
      principalName: currentSchool?.principalName || { om: '---', am: '---', en: '---' }
    };

    let generatedCurriculum: CurriculumWeek[];

    if (creationStrategy === 'clone') {
      // Clone curriculum from selected course
      const sourceCurriculum = getCurriculum(cloneSourceCourseId);
      generatedCurriculum = sourceCurriculum.map(w => ({
        ...w,
        id: `week-${w.weekNumber}-${w.semester}-${uniqueId.slice(-4)}`,
        isPlanned: false // reset planning status for new class
      }));
    } else {
      // Generate full 43-week curriculum
      generatedCurriculum = generateCurriculumForClass({
        subjectName: subjectNameObj,
        subjectKey: selectedSubjectKey,
        grade: selectedGrade,
        weeklyPeriods
      });
    }

    const newCourse: Course = {
      id: uniqueId,
      grade: selectedGrade,
      gradeName: gradeObj.name,
      section: section.trim() || 'A',
      subjectKey: selectedSubjectKey,
      subjectName: subjectNameObj,
      color: colorToken,
      schoolInfo: newSchoolInfo,
      createdAt: new Date().toISOString()
    };

    onAddCourse(newCourse, generatedCurriculum);
    setViewState('list');
    onClose();
  };

  const handleUpdateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    const gradeLevel = GRADE_LEVELS.find(g => g.id === selectedGrade);
    const gradeNameObj = gradeLevel ? gradeLevel.name : editingCourse.gradeName;
    const currentSubjectName = selectedSubjectKey === 'custom'
      ? {
          om: customSubjectOm.trim() || editingCourse.subjectName.om,
          am: customSubjectAm.trim() || editingCourse.subjectName.am,
          en: customSubjectEn.trim() || editingCourse.subjectName.en,
        }
      : (STANDARD_SUBJECTS.find(s => s.key === selectedSubjectKey)?.name || editingCourse.subjectName);

    const updatedSchoolInfo: SchoolInfo = {
      ...editingCourse.schoolInfo,
      gradeAndSection: {
        om: `${gradeNameObj.om} ${section.trim()}`,
        am: `${gradeNameObj.am} ${section.trim()}`,
        en: `${gradeNameObj.en} ${section.trim()}`
      },
      subject: currentSubjectName,
      weeklyPeriods: weeklyPeriods.toString(),
      annualPeriods: (weeklyPeriods * 43).toString(),
      teacherName: {
        om: teacherName.trim() || editingCourse.schoolInfo.teacherName.om,
        am: teacherName.trim() || editingCourse.schoolInfo.teacherName.am,
        en: teacherName.trim() || editingCourse.schoolInfo.teacherName.en
      }
    };

    const updated: Course = {
      ...editingCourse,
      grade: selectedGrade,
      gradeName: gradeNameObj,
      section: section.trim() || 'A',
      subjectKey: selectedSubjectKey,
      subjectName: currentSubjectName,
      schoolInfo: updatedSchoolInfo
    };

    onUpdateCourse(updated);
    setEditingCourse(null);
    setViewState('list');
  };

  const handleDeleteCourse = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (courses.length <= 1) {
      alert(t.cannotDeleteLast);
      return;
    }
    if (window.confirm(t.deleteClassConfirm)) {
      onDeleteCourse(courseId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                {viewState === 'list' && t.manageClasses}
                {viewState === 'add' && t.addClass}
                {viewState === 'edit' && t.editClass}
              </h2>
              <p className="text-xs text-gray-500">
                {viewState === 'list' && `${courses.length} ${language === 'om' ? 'kutaaleen fi kutaalee barnootaa qophaa\'an' : language === 'am' ? 'ክፍሎችና የትምህርት ዓይነቶች' : 'classes and subjects'}`}
                {viewState === 'add' && (language === 'om' ? 'Kutaa fi gosa barnootaa haaraa karoora guutuu waliin uumi' : language === 'am' ? 'አዲስ ክፍልና የትምህርት ዓይነት ከሙሉ ዓመታዊ ፕላን ጋር ጨምር' : 'Add a new class and subject with full 43-week lesson plans')}
                {viewState === 'edit' && (language === 'om' ? 'Odeeffannoo daree fi barsiisaa sirreessi' : language === 'am' ? 'የክፍሉንና የመምህሩን መረጃ አስተካክል' : 'Update class details and assigned periods')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          
          {/* VIEW STATE 1: CLASSES LIST */}
          {viewState === 'list' && (
            <div className="space-y-4">
              
              {/* Add New Class Button */}
              <button
                onClick={handleOpenAdd}
                className="w-full p-4 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50 text-indigo-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={16} />
                </div>
                <span>{t.addClass}</span>
              </button>

              {/* Existing Classes Cards */}
              <div className="grid grid-cols-1 gap-3">
                {courses.map((course) => {
                  const isActive = course.id === activeCourseId;
                  const courseCurriculum = getCurriculum(course.id);
                  const plannedCount = courseCurriculum.filter(w => w.isPlanned).length;
                  const totalCount = courseCurriculum.length;
                  const percent = totalCount > 0 ? Math.round((plannedCount / totalCount) * 100) : 0;

                  return (
                    <div
                      key={course.id}
                      onClick={() => {
                        onSelectCourse(course.id);
                        onClose();
                      }}
                      className={cn(
                        "p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3",
                        isActive
                          ? "bg-indigo-50/60 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs"
                          : "bg-white border-gray-200 hover:border-indigo-200 hover:bg-slate-50/70 shadow-2xs"
                      )}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm",
                          isActive ? "bg-indigo-600 text-white shadow-xs" : "bg-gray-100 text-gray-700"
                        )}>
                          {course.grade}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-gray-900 truncate">
                              {course.subjectName[language]}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                              {course.gradeName[language]} ({course.section})
                            </span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white flex items-center gap-1">
                                <Check size={10} /> {t.activeClass}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 flex-wrap">
                            <span className="flex items-center gap-1">
                              <GraduationCap size={13} className="text-gray-400" />
                              {course.schoolInfo.teacherName[language]}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={13} className="text-gray-400" />
                              {course.schoolInfo.weeklyPeriods} {t.weeklyPeriods}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={13} className="text-gray-400" />
                              {plannedCount}/{totalCount} {t.statusPlanned.toLowerCase()} ({percent}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons on course item */}
                      <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleOpenEdit(course, e)}
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                          title={t.editClass}
                        >
                          <Edit3 size={15} />
                        </button>

                        {courses.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCourse(course.id, e)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-200"
                            title={t.deleteClass}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}

                        <div className="ml-1 text-gray-400">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* VIEW STATE 2: ADD NEW CLASS FORM */}
          {(viewState === 'add' || viewState === 'edit') && (
            <form onSubmit={viewState === 'add' ? handleCreateCourse : handleUpdateCourseSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Grade Level Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t.gradeLevel} *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {GRADE_LEVELS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGrade(g.id)}
                      className={cn(
                        "py-2 px-1 rounded-lg text-xs font-bold transition-all border text-center cursor-pointer",
                        selectedGrade === g.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      {g.name[language].replace(/Kutaa | ክፍል|Grade /gi, '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Subject Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t.subjectTitle} *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-gray-200">
                  {STANDARD_SUBJECTS.map((sub) => {
                    const isSelected = selectedSubjectKey === sub.key;
                    return (
                      <button
                        key={sub.key}
                        type="button"
                        onClick={() => handleSubjectSelect(sub)}
                        className={cn(
                          "p-2.5 rounded-lg text-left text-xs font-semibold transition-all border cursor-pointer flex flex-col justify-between gap-1",
                          isSelected
                            ? "bg-white border-indigo-500 shadow-2xs ring-1 ring-indigo-500 text-indigo-950 font-bold"
                            : "bg-white/80 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-white"
                        )}
                      >
                        <span className="truncate block">{sub.name[language]}</span>
                        <span className="text-[10px] text-gray-400 block">
                          {sub.defaultWeeklyPeriods} {t.weeklyPeriods}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Subject Name Inputs (if custom selected) */}
              {selectedSubjectKey === 'custom' && (
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                  <span className="text-xs font-bold text-amber-900 block">
                    {language === 'om' ? 'Maqaa Barnootaa Galchaa:' : language === 'am' ? 'የትምህርቱን ስም ያስገቡ፡' : 'Enter Custom Subject Name:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Afaan Oromoo"
                      value={customSubjectOm}
                      onChange={(e) => setCustomSubjectOm(e.target.value)}
                      className="p-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="አማርኛ"
                      value={customSubjectAm}
                      onChange={(e) => setCustomSubjectAm(e.target.value)}
                      className="p-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="English"
                      value={customSubjectEn}
                      onChange={(e) => setCustomSubjectEn(e.target.value)}
                      className="p-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {/* 3. Section and Weekly Periods */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.sectionTitle} *
                  </label>
                  <input
                    type="text"
                    required
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="e.g. A & B, A, B, 1"
                    className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.weeklyPeriods} *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={weeklyPeriods}
                    onChange={(e) => setWeeklyPeriods(parseInt(e.target.value) || 4)}
                    className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.teacherName}
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Teacher name"
                    className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 4. Curriculum Strategy (Only on Add) */}
              {viewState === 'add' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t.curriculumTemplate} *
                  </label>
                  <div className="space-y-2">
                    <label className={cn(
                      "p-3 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition-all",
                      creationStrategy === 'full_template'
                        ? "bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-500/20"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    )}>
                      <input
                        type="radio"
                        name="creationStrategy"
                        checked={creationStrategy === 'full_template'}
                        onChange={() => setCreationStrategy('full_template')}
                        className="mt-0.5 text-indigo-600"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                          <Sparkles size={14} className="text-indigo-600" />
                          {t.fullCurriculumTemplate}
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          {language === 'om'
                            ? 'Torban 43 guutuu (Semisteera 1 fi 2) karoora, boqonnaa, qormaata walakkaa fi xumuraa waliin ofumaan qopheessa.'
                            : language === 'am'
                            ? 'ሙሉ የ43 ሳምንታት (የሁለቱ ወሰነ ትምህርቶች) ትምህርት፣ ምዕራፎች፣ አጋማሽና ማጠቃለያ ፈተናዎችን በቀጥታ ያዋቅራል።'
                            : 'Generates all 43 weeks for Semesters 1 & 2 with chapters, outcomes, methods, midterms and final exams.'
                          }
                        </span>
                      </div>
                    </label>

                    <label className={cn(
                      "p-3 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition-all",
                      creationStrategy === 'clone'
                        ? "bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-500/20"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    )}>
                      <input
                        type="radio"
                        name="creationStrategy"
                        checked={creationStrategy === 'clone'}
                        onChange={() => setCreationStrategy('clone')}
                        className="mt-0.5 text-indigo-600"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                          <Copy size={14} className="text-emerald-600" />
                          {t.cloneExistingClass}
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          {language === 'om'
                            ? 'Qabiyyee fi karoora daree armaan dura qophaa\'erraa waraabuun itti dabalata.'
                            : language === 'am'
                            ? 'ቀደም ሲል ከተዘጋጀ ነባር ክፍል ፕላኑን ቀድተው ማስተካከል ይችላሉ።'
                            : 'Copy topics and weekly timeline from one of your existing class plans.'
                          }
                        </span>
                        {creationStrategy === 'clone' && (
                          <div className="mt-2">
                            <select
                              value={cloneSourceCourseId}
                              onChange={(e) => setCloneSourceCourseId(e.target.value)}
                              className="p-2 text-xs border border-gray-300 rounded-lg bg-white w-full"
                            >
                              {courses.map(c => (
                                <option key={c.id} value={c.id}>
                                  {c.gradeName[language]} - {c.subjectName[language]} ({c.section})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewState('list');
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} />
                  {viewState === 'add' ? t.addClass : t.save}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
