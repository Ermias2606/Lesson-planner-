import React, { useState } from 'react';
import { 
  CalendarDays, 
  CalendarSync, 
  GraduationCap, 
  Printer, 
  Download, 
  Globe,
  Check,
  Layers,
  Rocket,
  BookOpen
} from 'lucide-react';
import { ViewMode, CurriculumWeek, Language, Course } from './types';
import AnnualPlanner from './components/AnnualPlanner';
import DailyPlanner from './components/DailyPlanner';
import PrintView from './components/PrintView';
import ExportModal from './components/ExportModal';
import ClassHeaderSelector from './components/ClassHeaderSelector';
import ClassManagerModal from './components/ClassManagerModal';
import DeployGuideModal from './components/DeployGuideModal';
import UserManualModal from './components/UserManualModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  getCurriculum, 
  getSchoolInfo, 
  getCourses, 
  getActiveCourseId, 
  setActiveCourseId,
  addCourse,
  updateCourse,
  deleteCourse
} from './lib/storage';
import { translations, getStoredLanguage, saveStoredLanguage } from './lib/i18n';
import { cn } from './lib/utils';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('annual');
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const [selectedWeekForDaily, setSelectedWeekForDaily] = useState<CurriculumWeek | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printModalType, setPrintModalType] = useState<'annual' | 'daily'>('annual');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportModalType, setExportModalType] = useState<'annual' | 'daily'>('annual');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);

  const handleOpenPrint = (type?: 'annual' | 'daily') => {
    setPrintModalType(type || (viewMode === 'daily' ? 'daily' : 'annual'));
    setShowPrintModal(true);
  };

  const handleOpenExport = (type?: 'annual' | 'daily') => {
    setExportModalType(type || (viewMode === 'daily' ? 'daily' : 'annual'));
    setShowExportModal(true);
  };

  // Multi-Course and Multi-Class State
  const [courses, setCourses] = useState<Course[]>(() => getCourses());
  const [activeCourseId, setActiveCourseIdState] = useState<string>(() => getActiveCourseId());

  const t = translations[language];

  // Resolve active course
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];
  const curriculum = getCurriculum(activeCourseId);
  const schoolInfo = getSchoolInfo(activeCourseId);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    saveStoredLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleSelectWeekForDaily = (week: CurriculumWeek) => {
    setSelectedWeekForDaily(week);
    setViewMode('daily');
  };

  const handleSelectCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveCourseIdState(courseId);
  };

  const handleAddCourse = (newCourse: Course, newCurriculum: CurriculumWeek[]) => {
    addCourse(newCourse, newCurriculum);
    const updatedCourses = getCourses();
    setCourses(updatedCourses);
    setActiveCourseId(newCourse.id);
    setActiveCourseIdState(newCourse.id);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    updateCourse(updatedCourse);
    setCourses(getCourses());
  };

  const handleDeleteCourse = (courseId: string) => {
    const success = deleteCourse(courseId);
    if (success) {
      const remaining = getCourses();
      setCourses(remaining);
      setActiveCourseIdState(getActiveCourseId());
    }
  };

  const handleCourseUpdated = () => {
    setCourses(getCourses());
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo and App Title */}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900 block leading-tight">
                  {t.appTitle}
                </span>
                <span className="text-[11px] text-gray-500 hidden sm:block font-medium">
                  {activeCourse.subjectName[language]} · {activeCourse.gradeName[language]} ({activeCourse.section})
                </span>
              </div>
            </div>
            
            {/* Navigation & Action Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              
              {/* View Mode Buttons */}
              <button
                onClick={() => setViewMode('annual')}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
                  viewMode === 'annual' 
                    ? "bg-indigo-50 text-indigo-700 shadow-2xs font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <CalendarSync size={16} />
                <span>{t.annualView}</span>
              </button>

              <button
                onClick={() => setViewMode('daily')}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
                  viewMode === 'daily' 
                    ? "bg-indigo-50 text-indigo-700 shadow-2xs font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <CalendarDays size={16} />
                <span>{t.dailyView}</span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="px-2.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={t.language}
                >
                  <Globe size={15} className="text-indigo-600" />
                  <span className="hidden sm:inline font-medium">
                    {language === 'om' ? 'Afaan Oromo' : language === 'am' ? 'አማርኛ' : 'English'}
                  </span>
                  <span className="sm:hidden font-bold uppercase text-[11px]">
                    {language}
                  </span>
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => handleLanguageSelect('om')}
                      className={cn(
                        "w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer",
                        language === 'om' ? "text-indigo-700 bg-indigo-50/50" : "text-gray-700"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>🇪🇹</span> Afaan Oromo
                      </span>
                      {language === 'om' && <Check size={14} />}
                    </button>

                    <button
                      onClick={() => handleLanguageSelect('am')}
                      className={cn(
                        "w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer",
                        language === 'am' ? "text-indigo-700 bg-indigo-50/50" : "text-gray-700"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>🇪🇹</span> አማርኛ (Amharic)
                      </span>
                      {language === 'am' && <Check size={14} />}
                    </button>

                    <button
                      onClick={() => handleLanguageSelect('en')}
                      className={cn(
                        "w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer",
                        language === 'en' ? "text-indigo-700 bg-indigo-50/50" : "text-gray-700"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>🇬🇧</span> English
                      </span>
                      {language === 'en' && <Check size={14} />}
                    </button>
                  </div>
                )}
              </div>

              {/* PDF Print Button */}
              <button
                onClick={() => handleOpenPrint()}
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 border border-indigo-200 cursor-pointer"
                title={t.printPdf}
              >
                <Printer size={15} />
                <span className="hidden md:inline">{t.printView}</span>
              </button>

              {/* Export Button */}
              <button
                onClick={() => handleOpenExport()}
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 border border-emerald-200 cursor-pointer"
                title={t.exportBtn}
              >
                <Download size={15} />
                <span className="hidden md:inline">{t.exportBtn}</span>
              </button>

              {/* In-App PWA Offline Install Button */}
              <PWAInstallButton language={language} />

              {/* User Manual Guide Button */}
              <button
                onClick={() => setShowManualModal(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 border border-indigo-200 cursor-pointer"
                title={t.userManual}
              >
                <BookOpen size={15} />
                <span className="hidden lg:inline">{t.userManual}</span>
              </button>

              {/* Deploy Guide Button */}
              <button
                onClick={() => setShowDeployModal(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 border border-gray-200 cursor-pointer"
                title={t.deployApp}
              >
                <Rocket size={15} className="text-indigo-600" />
                <span className="hidden lg:inline">{t.deployApp}</span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Class & Subject Selector Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1 print:hidden">
        <ClassHeaderSelector
          courses={courses}
          activeCourseId={activeCourseId}
          language={language}
          onSelectCourse={handleSelectCourse}
          onOpenClassManager={() => setIsClassModalOpen(true)}
        />
      </div>

      {/* Main Content */}
      <main className={cn("flex-1 flex flex-col", showPrintModal && "print:hidden")}>
        {viewMode === 'annual' ? (
          <AnnualPlanner 
            language={language}
            activeCourseId={activeCourseId}
            onCourseUpdated={handleCourseUpdated}
            onSelectWeekForDailyPlan={handleSelectWeekForDaily}
            onOpenPrintView={() => handleOpenPrint('annual')}
            onOpenExportModal={() => handleOpenExport('annual')}
          />
        ) : (
          <DailyPlanner 
            language={language}
            activeCourseId={activeCourseId}
            initialCurriculumWeek={selectedWeekForDaily}
            onClearInitialWeek={() => setSelectedWeekForDaily(null)}
            onOpenPrintView={() => handleOpenPrint('daily')}
            onOpenExportModal={() => handleOpenExport('daily')}
          />
        )}
      </main>

      {/* Print View Modal */}
      {showPrintModal && (
        <PrintView
          curriculum={curriculum}
          schoolInfo={schoolInfo}
          language={language}
          initialDocumentType={printModalType}
          activeCourseId={activeCourseId}
          onLanguageChange={(lang) => {
            setLanguage(lang);
            saveStoredLanguage(lang);
          }}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* Export Options Modal */}
      {showExportModal && (
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          curriculum={curriculum}
          schoolInfo={schoolInfo}
          language={language}
          initialDocumentType={exportModalType}
          activeCourseId={activeCourseId}
          onOpenPrintView={(docType) => {
            handleOpenPrint(docType || exportModalType);
          }}
        />
      )}

      {/* Class & Subject Manager Modal */}
      <ClassManagerModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        courses={courses}
        activeCourseId={activeCourseId}
        language={language}
        onSelectCourse={handleSelectCourse}
        onAddCourse={handleAddCourse}
        onUpdateCourse={handleUpdateCourse}
        onDeleteCourse={handleDeleteCourse}
      />

      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator language={language} />

      {/* Deployment and Hosting Guide Modal */}
      <DeployGuideModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        language={language}
      />

      {/* Comprehensive User Manual Modal */}
      <UserManualModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
        language={language}
      />

    </div>
  );
}
