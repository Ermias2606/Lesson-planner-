import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  Printer, 
  FileSpreadsheet,
  Grid, 
  Table as TableIcon, 
  ArrowRight, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2,
  Calendar,
  BookOpen,
  Download,
  Clock,
  Layers,
  Sparkles,
  Award,
  Filter,
  CheckSquare,
  TrendingUp,
  GraduationCap,
  Bookmark
} from 'lucide-react';
import { CurriculumWeek, SchoolInfo, Language } from '../types';
import { getCurriculum, saveCurriculum, resetCurriculumToDefault, getSchoolInfo, saveSchoolInfo, getCourses } from '../lib/storage';
import { translations } from '../lib/i18n';
import { exportCurriculumToCSV } from '../lib/exportUtils';
import { cn } from '../lib/utils';
import TextbookGuideModal from './TextbookGuideModal';

interface AnnualPlannerProps {
  language: Language;
  activeCourseId?: string;
  onCourseUpdated?: () => void;
  onSelectWeekForDailyPlan?: (week: CurriculumWeek) => void;
  onOpenPrintView?: () => void;
  onOpenExportModal?: () => void;
}

export default function AnnualPlanner({ 
  language, 
  activeCourseId,
  onCourseUpdated,
  onSelectWeekForDailyPlan, 
  onOpenPrintView,
  onOpenExportModal 
}: AnnualPlannerProps) {
  const [curriculum, setCurriculum] = useState<CurriculumWeek[]>(() => getCurriculum(activeCourseId));
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(() => getSchoolInfo(activeCourseId));
  const [semesterFilter, setSemesterFilter] = useState<'all' | 1 | 2>('all');
  const [activeSummarySemester, setActiveSummarySemester] = useState<1 | 2>(1);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [filterRemainingOnly, setFilterRemainingOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'table' | 'cards'>('table');
  const [textbookModalOpen, setTextbookModalOpen] = useState(false);
  const [editingWeek, setEditingWeek] = useState<CurriculumWeek | null>(null);
  const [editingSchoolInfo, setEditingSchoolInfo] = useState(false);
  const [tempSchoolInfo, setTempSchoolInfo] = useState<SchoolInfo>(schoolInfo);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state when active course changes
  useEffect(() => {
    const freshCurriculum = getCurriculum(activeCourseId);
    const freshSchoolInfo = getSchoolInfo(activeCourseId);
    setCurriculum(freshCurriculum);
    setSchoolInfo(freshSchoolInfo);
    setTempSchoolInfo(freshSchoolInfo);
    setEditingWeek(null);
    setEditingSchoolInfo(false);
  }, [activeCourseId]);

  const t = translations[language];

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleReset = () => {
    if (window.confirm(t.confirmReset)) {
      const resetData = resetCurriculumToDefault(activeCourseId);
      setCurriculum(resetData);
      showNotification(t.resetSuccess);
    }
  };

  const handleSaveWeek = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWeek) return;
    const updated = curriculum.map(w => w.id === editingWeek.id ? editingWeek : w);
    setCurriculum(updated);
    saveCurriculum(updated, activeCourseId);
    setEditingWeek(null);
    showNotification(t.weekUpdateSuccess);
  };

  const handleSaveSchoolInfo = () => {
    setSchoolInfo(tempSchoolInfo);
    saveSchoolInfo(tempSchoolInfo, activeCourseId);
    setEditingSchoolInfo(false);
    onCourseUpdated?.();
    showNotification(t.schoolInfoUpdateSuccess);
  };

  const handleDirectCsvExport = () => {
    exportCurriculumToCSV(curriculum, schoolInfo, language);
  };

  const handleToggleWeekPlanned = (weekId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = curriculum.map(w => {
      if (w.id === weekId) {
        return { ...w, isPlanned: !w.isPlanned };
      }
      return w;
    });
    setCurriculum(updated);
    saveCurriculum(updated, activeCourseId);
    const targetWeek = updated.find(w => w.id === weekId);
    if (targetWeek) {
      showNotification(
        targetWeek.isPlanned
          ? `${t.week} ${targetWeek.weekNumber}: ${t.statusPlanned}`
          : `${t.week} ${targetWeek.weekNumber}: ${t.statusPending}`
      );
    }
  };

  // Current semester resolution for stats summary
  const currentSemesterForStats: 1 | 2 = semesterFilter !== 'all' ? semesterFilter : activeSummarySemester;
  const currentSemesterWeeks = curriculum.filter(w => w.semester === currentSemesterForStats);
  const totalWeeksInSemester = currentSemesterWeeks.length;
  const plannedWeeksInSemester = currentSemesterWeeks.filter(w => w.isPlanned).length;
  const remainingWeeksInSemester = Math.max(0, totalWeeksInSemester - plannedWeeksInSemester);
  const progressPercentage = totalWeeksInSemester > 0 ? Math.round((plannedWeeksInSemester / totalWeeksInSemester) * 100) : 0;
  const periodsPerWeek = parseInt(schoolInfo.weeklyPeriods) || 5;
  const plannedPeriods = plannedWeeksInSemester * periodsPerWeek;
  const totalPeriods = totalWeeksInSemester * periodsPerWeek;
  const examWeeksInSemester = currentSemesterWeeks.filter(w => w.isExamWeek).length;
  const nextUnplannedWeek = currentSemesterWeeks.find(w => !w.isPlanned);

  // Filter items
  const filteredWeeks = curriculum.filter(week => {
    if (semesterFilter !== 'all' && week.semester !== semesterFilter) return false;
    if (selectedMonth !== 'all' && week.monthName[language] !== selectedMonth) return false;
    if (filterRemainingOnly && week.isPlanned) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        (week.mainTopic[language] || '').toLowerCase().includes(q) ||
        (week.chapter[language] || '').toLowerCase().includes(q) ||
        (week.generalObjectives[language] || '').toLowerCase().includes(q) ||
        (week.monthName[language] || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const monthsList = Array.from(new Set(curriculum.map(w => w.monthName[language])));

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Official Document Header */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4 mb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">
              <Calendar size={13} /> {schoolInfo.academicYear[language]}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {schoolInfo.schoolName[language]}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
              {t.annualPlanTitle} - {schoolInfo.subject[language]} ({schoolInfo.gradeAndSection[language]})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTextbookModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-900 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              title={t.openTextbookLibrary}
            >
              <BookOpen size={14} className="text-amber-400" />
              <span>{t.openTextbookLibrary}</span>
            </button>

            <button
              onClick={() => {
                setTempSchoolInfo(schoolInfo);
                setEditingSchoolInfo(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-2xs"
            >
              <Edit3 size={14} />
              {t.schoolInfoEdit}
            </button>
            
            <button
              onClick={onOpenPrintView}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors shadow-2xs"
              title={t.printPdf}
            >
              <Printer size={14} />
              {t.printPdf}
            </button>

            <button
              onClick={handleDirectCsvExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors shadow-2xs"
              title={t.exportCsv}
            >
              <FileSpreadsheet size={14} />
              {t.exportCsv}
            </button>

            {onOpenExportModal && (
              <button
                onClick={onOpenExportModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-2xs"
              >
                <Download size={14} />
                {t.exportBtn}
              </button>
            )}

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors"
              title={t.resetDefault}
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">{t.reset}</span>
            </button>
          </div>
        </div>

        {/* School & Subject Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">{t.gradeAndSection}:</span>
            <span className="font-semibold text-gray-900">{schoolInfo.gradeAndSection[language]}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">{t.subject}:</span>
            <span className="font-semibold text-gray-900">{schoolInfo.subject[language]}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">{t.annualDays}:</span>
            <span className="font-semibold text-gray-900">{schoolInfo.annualDays}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">{t.annualPeriods}:</span>
            <span className="font-semibold text-gray-900">{schoolInfo.annualPeriods}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">{t.weeklyPeriods}:</span>
            <span className="font-semibold text-gray-900">{schoolInfo.weeklyPeriods}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
            <span className="text-gray-500 block">{t.periodDuration}:</span>
            <span className="font-semibold text-gray-900">{schoolInfo.periodDuration[language]}</span>
          </div>
        </div>
      </div>

      {/* Semester Planning Summary Stats Card */}
      <div 
        id="annual-semester-stats-card" 
        className="bg-white rounded-xl shadow-xs border border-gray-200 p-5 sm:p-6 mb-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
              <TrendingUp size={20} className="text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  {t.semesterStatsTitle}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {currentSemesterForStats === 1 ? t.semester1 : t.semester2}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {schoolInfo.academicYear[language]} • {schoolInfo.subject[language]} ({schoolInfo.gradeAndSection[language]})
              </p>
            </div>
          </div>

          {/* Semester Selector Pill Group */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-stretch sm:self-auto justify-center">
            <button
              onClick={() => {
                setActiveSummarySemester(1);
                if (semesterFilter !== 'all') setSemesterFilter(1);
              }}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer",
                currentSemesterForStats === 1 
                  ? "bg-white text-indigo-700 shadow-2xs font-bold" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {t.semester1} (22)
            </button>
            <button
              onClick={() => {
                setActiveSummarySemester(2);
                if (semesterFilter !== 'all') setSemesterFilter(2);
              }}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer",
                currentSemesterForStats === 2 
                  ? "bg-white text-indigo-700 shadow-2xs font-bold" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {t.semester2} (21)
            </button>
          </div>
        </div>

        {/* 4 Primary Stats Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {/* 1. Weeks Planned */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                {t.weeksPlanned}
              </span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {progressPercentage}%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-emerald-950">
                {plannedWeeksInSemester}
              </span>
              <span className="text-xs text-emerald-700 font-medium">
                / {totalWeeksInSemester} {t.totalWeeks.toLowerCase()}
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-2 flex items-center justify-between">
              <span>{plannedPeriods} {t.weeklyPeriods ? 'periods' : ''}</span>
              <span className="font-semibold">{t.statusPlanned}</span>
            </div>
          </div>

          {/* 2. Remaining Weeks */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                <Clock size={15} className="text-amber-600" />
                {t.weeksRemaining}
              </span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                {100 - progressPercentage}%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-amber-950">
                {remainingWeeksInSemester}
              </span>
              <span className="text-xs text-amber-700 font-medium">
                {t.weeksRemaining.toLowerCase()}
              </span>
            </div>
            <div className="text-[11px] text-amber-700 mt-2 flex items-center justify-between">
              <span>{remainingWeeksInSemester * 5} periods</span>
              <span className="font-semibold">{t.statusPending}</span>
            </div>
          </div>

          {/* 3. Total Semester Weeks */}
          <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <Layers size={15} className="text-gray-500" />
                {t.totalWeeks}
              </span>
              <span className="text-[11px] font-medium text-gray-500">
                {examWeeksInSemester} {t.examBadge}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-gray-900">
                {totalWeeksInSemester}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {t.week}s (Term)
              </span>
            </div>
            <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between">
              <span>{totalPeriods} periods total</span>
              <span>180 days total</span>
            </div>
          </div>

          {/* 4. Progress & Pacing Meter */}
          <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                <TrendingUp size={15} className="text-indigo-600" />
                {t.progressRate}
              </span>
              <span className="text-sm font-bold font-mono text-indigo-700">
                {progressPercentage}%
              </span>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="my-2">
              <div className="h-2.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-indigo-700">
              <span>{plannedWeeksInSemester} of {totalWeeksInSemester} {t.plannedRatio}</span>
              <span className="font-semibold">{remainingWeeksInSemester} {t.statusPending}</span>
            </div>
          </div>
        </div>

        {/* Bottom Context Banner: Next Upcoming Week & Fast Filter */}
        <div className="pt-3 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
          {nextUnplannedWeek ? (
            <div className="flex items-center flex-wrap gap-2 text-gray-700">
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <Sparkles size={14} className="text-indigo-600" />
                {t.nextUpcomingWeek}:
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-gray-800">
                {nextUnplannedWeek.monthName[language]} - {t.week} {nextUnplannedWeek.weekNumber}
              </span>
              <span className="text-gray-600 truncate max-w-xs sm:max-w-md font-medium">
                {nextUnplannedWeek.mainTopic[language]}
              </span>
              <button
                onClick={(e) => handleToggleWeekPlanned(nextUnplannedWeek.id, e)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <CheckCircle2 size={12} />
                {t.markPlanned}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Award size={16} />
              <span>{t.allWeeksPlanned}</span>
            </div>
          )}

          {/* Quick Filter Toggle for Remaining Weeks */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => setFilterRemainingOnly(!filterRemainingOnly)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer",
                filterRemainingOnly
                  ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              )}
            >
              <Filter size={13} />
              {filterRemainingOnly ? t.showAllSemesterWeeks : t.filterRemainingOnly}
              <span className={cn(
                "ml-1 px-1.5 py-0.2 rounded-full text-[10px]",
                filterRemainingOnly ? "bg-amber-200 text-amber-950 font-bold" : "bg-gray-100 text-gray-600"
              )}>
                {remainingWeeksInSemester}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & View Controls */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
        
        {/* Semester Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start">
          <button
            onClick={() => setSemesterFilter('all')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
              semesterFilter === 'all' ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
            )}
          >
            {t.semesterAll}
          </button>
          <button
            onClick={() => setSemesterFilter(1)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
              semesterFilter === 1 ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
            )}
          >
            {t.semester1}
          </button>
          <button
            onClick={() => setSemesterFilter(2)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
              semesterFilter === 2 ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
            )}
          >
            {t.semester2}
          </button>
        </div>

        {/* Search, Month Filter & View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-lg border-gray-300 text-xs font-medium text-gray-700 bg-white shadow-2xs py-2 px-3 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          >
            <option value="all">{t.allMonths}</option>
            {monthsList.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border-gray-300 shadow-2xs focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewStyle('table')}
              className={cn(
                "p-1.5 rounded-md text-xs transition-colors",
                viewStyle === 'table' ? "bg-white text-indigo-700 shadow-xs" : "text-gray-500 hover:text-gray-900"
              )}
              title={t.tableView}
            >
              <TableIcon size={16} />
            </button>
            <button
              onClick={() => setViewStyle('cards')}
              className={cn(
                "p-1.5 rounded-md text-xs transition-colors",
                viewStyle === 'cards' ? "bg-white text-indigo-700 shadow-xs" : "text-gray-500 hover:text-gray-900"
              )}
              title={t.cardsView}
            >
              <Grid size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      {filteredWeeks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-base font-bold text-gray-900">{t.noPlanFound}</h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMonth('all');
              setSemesterFilter('all');
            }}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:underline"
          >
            Filtariiwwan Hunda Qulqulleessi
          </button>
        </div>
      ) : viewStyle === 'table' ? (
        
        /* Official Table Layout */
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-gray-700 font-semibold border-b border-gray-200 divide-x divide-gray-200 text-[11px]">
                  <th className="p-2.5 w-16 text-center">{t.month}</th>
                  <th className="p-2.5 w-12 text-center">{t.week}</th>
                  <th className="p-2.5 w-20 text-center">{t.date}</th>
                  <th className="p-2.5 w-14 text-center">{t.pages}</th>
                  <th className="p-2.5 w-20">{t.chapter}</th>
                  <th className="p-2.5 w-48">{t.mainTopic}</th>
                  <th className="p-2.5 w-44">{t.objectives}</th>
                  <th className="p-2.5 w-36">{t.priorKnowledge}</th>
                  <th className="p-2.5 w-36">{t.lessonOutcome}</th>
                  <th className="p-2.5 w-32">{t.teachingMethod}</th>
                  <th className="p-2.5 w-28">{t.materials}</th>
                  <th className="p-2.5 w-32">{t.assessment}</th>
                  <th className="p-2.5 w-24 text-center">{t.statusPlanned}</th>
                  <th className="p-2.5 w-20 text-center">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredWeeks.map((week) => (
                  <tr 
                    key={week.id}
                    className={cn(
                      "hover:bg-indigo-50/40 transition-colors divide-x divide-gray-200",
                      week.isExamWeek ? "bg-amber-50/50 font-medium" : ""
                    )}
                  >
                    <td className="p-2.5 text-center font-bold text-gray-900 bg-slate-50/60">
                      {week.monthName[language]}
                    </td>
                    <td className="p-2.5 text-center font-semibold text-gray-600">
                      {week.weekNumber}
                    </td>
                    <td className="p-2.5 text-center whitespace-nowrap text-gray-600 text-[11px]">
                      {week.dateRange}
                    </td>
                    <td className="p-2.5 text-center font-mono text-gray-600">
                      {week.pages}
                    </td>
                    <td className="p-2.5 font-semibold text-indigo-700">
                      {week.chapter[language]}
                    </td>
                    <td className="p-2.5">
                      {week.isExamWeek && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 mb-1">
                          {t.examBadge}
                        </span>
                      )}
                      <div className="font-bold text-gray-900 leading-snug">
                        {week.mainTopic[language]}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px]">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                          📖 {t.studentBookPages}: {week.studentBookPages || week.pages}
                        </span>
                        {week.teacherGuidePages && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                            📘 {week.teacherGuidePages}
                          </span>
                        )}
                        {week.studentBookExercises && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-gray-700 font-medium border border-gray-200 truncate max-w-[220px]" title={week.studentBookExercises[language]}>
                            ✏️ {week.studentBookExercises[language]}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-2.5 text-gray-700 line-clamp-3">
                      {week.generalObjectives[language]}
                    </td>
                    <td className="p-2.5 text-gray-600">
                      {week.priorKnowledge[language]}
                    </td>
                    <td className="p-2.5 text-gray-700">
                      {week.lessonOutcome[language]}
                    </td>
                    <td className="p-2.5 text-gray-600">
                      {week.teachingMethod[language]}
                    </td>
                    <td className="p-2.5 text-gray-600">
                      {week.teachingAids[language]}
                    </td>
                    <td className="p-2.5 text-gray-700">
                      {week.assessment[language]}
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        type="button"
                        onClick={(e) => handleToggleWeekPlanned(week.id, e)}
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer whitespace-nowrap",
                          week.isPlanned
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                        )}
                        title={week.isPlanned ? t.markUnplanned : t.markPlanned}
                      >
                        {week.isPlanned ? (
                          <>
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span>{t.statusPlanned}</span>
                          </>
                        ) : (
                          <>
                            <Clock size={12} className="text-gray-400" />
                            <span>{t.statusPending}</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <button
                          onClick={() => setEditingWeek(week)}
                          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                          title={t.edit}
                        >
                          <Edit3 size={15} />
                        </button>
                        {onSelectWeekForDailyPlan && (
                          <button
                            onClick={() => onSelectWeekForDailyPlan(week)}
                            className="p-1 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                            title={t.sendToDaily}
                          >
                            <ArrowRight size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      ) : (
        
        /* Modern Cards Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWeeks.map((week) => (
            <div 
              key={week.id}
              className={cn(
                "bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between",
                week.isExamWeek ? "border-amber-300 bg-amber-50/20" : ""
              )}
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {week.monthName[language]} - {t.week} {week.weekNumber}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleWeekPlanned(week.id, e)}
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer",
                        week.isPlanned
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                      title={week.isPlanned ? t.markUnplanned : t.markPlanned}
                    >
                      {week.isPlanned ? (
                        <>
                          <CheckCircle2 size={11} className="text-emerald-600" />
                          <span>{t.statusPlanned}</span>
                        </>
                      ) : (
                        <>
                          <Clock size={11} className="text-gray-400" />
                          <span>{t.statusPending}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-xs font-medium text-gray-500 font-mono shrink-0">
                    {week.dateRange}
                  </span>
                </div>

                <div className="text-xs font-semibold text-gray-500 mb-1">
                  {week.chapter[language]} (Fuula {week.pages})
                </div>

                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  {week.mainTopic[language]}
                </h3>

                {/* Textbook & Teacher Guide Metadata Strip */}
                <div className="my-2 p-2 bg-indigo-50/40 rounded-lg border border-indigo-100/80 flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-indigo-900 flex items-center gap-1">
                      📖 {t.studentTextbook}: pp. {week.studentBookPages || week.pages}
                    </span>
                    <span className="text-emerald-800 font-semibold">
                      📘 {week.teacherGuidePages || 'TG'}
                    </span>
                  </div>
                  {week.studentBookExercises && (
                    <div className="text-gray-600 text-[10px] truncate" title={week.studentBookExercises[language]}>
                      ✏️ {week.studentBookExercises[language]}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs text-gray-600 border-t pt-3 border-gray-100">
                  <div>
                    <span className="font-semibold text-gray-800 block">{t.objectives}:</span>
                    <p className="line-clamp-2">{week.generalObjectives[language]}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block">{t.teachingMethod}:</span>
                    <p className="line-clamp-1">{week.teachingMethod[language]}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block">{t.materials}:</span>
                    <p className="line-clamp-1">{week.teachingAids[language]}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setEditingWeek(week)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Edit3 size={13} /> {t.edit}
                </button>
                {onSelectWeekForDailyPlan && (
                  <button
                    onClick={() => onSelectWeekForDailyPlan(week)}
                    className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>{t.sendToDaily}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      )}

      {/* Official Signatures Section */}
      <div className="mt-8 bg-white rounded-xl shadow-xs border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
          {t.signaturesTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-700">
          <div className="border border-dashed border-gray-300 p-4 rounded-xl">
            <span className="font-bold text-gray-900 block mb-1">{t.teacherName}</span>
            <p className="text-gray-600">{schoolInfo.teacherName[language]}</p>
            <div className="mt-4 border-b border-gray-300 w-3/4"></div>
            <span className="text-[11px] text-gray-400 mt-1 block">{t.signature} & {t.date}</span>
          </div>
          <div className="border border-dashed border-gray-300 p-4 rounded-xl">
            <span className="font-bold text-gray-900 block mb-1">{t.deptHead}</span>
            <p className="text-gray-600">{schoolInfo.departmentHeadName[language]}</p>
            <div className="mt-4 border-b border-gray-300 w-3/4"></div>
            <span className="text-[11px] text-gray-400 mt-1 block">{t.signature} & {t.date}</span>
          </div>
          <div className="border border-dashed border-gray-300 p-4 rounded-xl">
            <span className="font-bold text-gray-900 block mb-1">{t.principal}</span>
            <p className="text-gray-600">{schoolInfo.principalName[language]}</p>
            <div className="mt-4 border-b border-gray-300 w-3/4"></div>
            <span className="text-[11px] text-gray-400 mt-1 block">{t.signature} & {t.date}</span>
          </div>
        </div>
      </div>

      {/* Edit Week Modal */}
      {editingWeek && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-gray-900 text-sm">
                {t.edit}: {editingWeek.monthName[language]} - {t.week} {editingWeek.weekNumber} ({editingWeek.chapter[language]})
              </h3>
              <button 
                onClick={() => setEditingWeek(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveWeek} className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.date}</label>
                  <input
                    type="text"
                    value={editingWeek.dateRange}
                    onChange={(e) => setEditingWeek({ ...editingWeek, dateRange: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.pages}</label>
                  <input
                    type="text"
                    value={editingWeek.pages}
                    onChange={(e) => setEditingWeek({ ...editingWeek, pages: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
              </div>

              {/* Textbook & Teacher Guide Inputs */}
              <div className="grid grid-cols-2 gap-3 bg-indigo-50/30 p-2.5 rounded-xl border border-indigo-100">
                <div>
                  <label className="block font-semibold text-indigo-950 mb-1 flex items-center gap-1">
                    <BookOpen size={13} className="text-indigo-600" />
                    {t.studentBookPages}
                  </label>
                  <input
                    type="text"
                    value={editingWeek.studentBookPages || editingWeek.pages || ''}
                    onChange={(e) => setEditingWeek({ ...editingWeek, studentBookPages: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-emerald-950 mb-1 flex items-center gap-1">
                    <GraduationCap size={13} className="text-emerald-700" />
                    {t.teacherGuidePages}
                  </label>
                  <input
                    type="text"
                    value={editingWeek.teacherGuidePages || ''}
                    onChange={(e) => setEditingWeek({ ...editingWeek, teacherGuidePages: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.mainTopic} ({language.toUpperCase()})</label>
                <input
                  type="text"
                  value={editingWeek.mainTopic[language]}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    mainTopic: { ...editingWeek.mainTopic, [language]: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.objectives} ({language.toUpperCase()})</label>
                <textarea
                  value={editingWeek.generalObjectives[language]}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    generalObjectives: { ...editingWeek.generalObjectives, [language]: e.target.value }
                  })}
                  rows={2}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.priorKnowledge} ({language.toUpperCase()})</label>
                <textarea
                  value={editingWeek.priorKnowledge[language]}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    priorKnowledge: { ...editingWeek.priorKnowledge, [language]: e.target.value }
                  })}
                  rows={2}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.teachingMethod} ({language.toUpperCase()})</label>
                <input
                  type="text"
                  value={editingWeek.teachingMethod[language]}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    teachingMethod: { ...editingWeek.teachingMethod, [language]: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.materials} ({language.toUpperCase()})</label>
                <input
                  type="text"
                  value={editingWeek.teachingAids[language]}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    teachingAids: { ...editingWeek.teachingAids, [language]: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.assessment} ({language.toUpperCase()})</label>
                <input
                  type="text"
                  value={editingWeek.assessment[language]}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    assessment: { ...editingWeek.assessment, [language]: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                />
              </div>

              {/* Status toggle in edit modal */}
              <div className="bg-slate-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-900 block text-xs">{t.statusPlanned}</span>
                  <span className="text-[11px] text-gray-500">
                    {editingWeek.isPlanned ? t.statusPlanned : t.statusPending}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingWeek.isPlanned ?? false}
                    onChange={(e) => setEditingWeek({ ...editingWeek, isPlanned: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingWeek(null)}
                  className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                >
                  <Save size={14} /> {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit School Info Modal */}
      {editingSchoolInfo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-bold text-gray-900 text-sm">
                {t.schoolInfoEdit} ({language.toUpperCase()})
              </h3>
              <button 
                onClick={() => setEditingSchoolInfo(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">{t.schoolName}</label>
                <input
                  type="text"
                  value={tempSchoolInfo.schoolName[language]}
                  onChange={(e) => setTempSchoolInfo({
                    ...tempSchoolInfo,
                    schoolName: { ...tempSchoolInfo.schoolName, [language]: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.subject}</label>
                  <input
                    type="text"
                    value={tempSchoolInfo.subject[language]}
                    onChange={(e) => setTempSchoolInfo({
                      ...tempSchoolInfo,
                      subject: { ...tempSchoolInfo.subject, [language]: e.target.value }
                    })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.gradeAndSection}</label>
                  <input
                    type="text"
                    value={tempSchoolInfo.gradeAndSection[language]}
                    onChange={(e) => setTempSchoolInfo({
                      ...tempSchoolInfo,
                      gradeAndSection: { ...tempSchoolInfo.gradeAndSection, [language]: e.target.value }
                    })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.annualDays}</label>
                  <input
                    type="text"
                    value={tempSchoolInfo.annualDays}
                    onChange={(e) => setTempSchoolInfo({ ...tempSchoolInfo, annualDays: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.annualPeriods}</label>
                  <input
                    type="text"
                    value={tempSchoolInfo.annualPeriods}
                    onChange={(e) => setTempSchoolInfo({ ...tempSchoolInfo, annualPeriods: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">{t.weeklyPeriods}</label>
                  <input
                    type="text"
                    value={tempSchoolInfo.weeklyPeriods}
                    onChange={(e) => setTempSchoolInfo({ ...tempSchoolInfo, weeklyPeriods: e.target.value })}
                    className="w-full rounded-lg border-gray-300 py-1.5 px-2 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <button
                  onClick={() => setEditingSchoolInfo(false)}
                  className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSaveSchoolInfo}
                  className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                >
                  <Save size={14} /> {t.save}
                </button>
              </div>
            </div>
          </div>
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
          setTextbookModalOpen(false);
          if (onSelectWeekForDailyPlan && filteredWeeks.length > 0) {
            onSelectWeekForDailyPlan(filteredWeeks[0]);
          }
        }}
      />
    </div>
  );
}
