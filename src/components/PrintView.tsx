import React, { useRef, useState } from 'react';
import { 
  Printer, 
  X, 
  FileSpreadsheet, 
  Globe, 
  CalendarDays, 
  CalendarSync, 
  CheckCircle2, 
  Sliders, 
  Layers,
  FileText,
  Copy,
  ExternalLink,
  Check,
  Download
} from 'lucide-react';
import { CurriculumWeek, SchoolInfo, Language, DailyPlan } from '../types';
import { translations } from '../lib/i18n';
import { 
  exportCurriculumToCSV, 
  exportDailyPlanToCSV,
  exportCurriculumToWord,
  exportDailyPlanToWord,
  exportCurriculumToExcel,
  exportDailyPlanToExcel,
  exportCurriculumToPdf,
  exportDailyPlanToPdf,
  openPrintWindow,
  copyTableToClipboard
} from '../lib/exportUtils';
import { getDailyPlan } from '../lib/storage';
import { format } from 'date-fns';

interface PrintViewProps {
  curriculum: CurriculumWeek[];
  schoolInfo: SchoolInfo;
  language: Language;
  initialDocumentType?: 'annual' | 'daily';
  dailyPlan?: DailyPlan;
  activeCourseId?: string;
  onLanguageChange: (lang: Language) => void;
  onClose: () => void;
}

export default function PrintView({
  curriculum,
  schoolInfo,
  language,
  initialDocumentType = 'annual',
  dailyPlan: initialDailyPlan,
  activeCourseId,
  onLanguageChange,
  onClose
}: PrintViewProps) {
  const printContentRef = useRef<HTMLDivElement>(null);
  const [docType, setDocType] = useState<'annual' | 'daily'>(initialDocumentType);
  const [headerDensity, setHeaderDensity] = useState<'full' | 'compact'>('full');
  const [copySuccess, setCopySuccess] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const t = translations[language];

  // If dailyPlan not passed directly, load today's plan
  const dailyPlan = initialDailyPlan || getDailyPlan(format(new Date(), 'yyyy-MM-dd'), language, activeCourseId);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenCleanWindow = () => {
    if (printContentRef.current) {
      const docTitle = `${schoolInfo.schoolName[language]} - ${docType === 'annual' ? t.annualPlanTitle : t.printDocumentDaily}`;
      openPrintWindow(printContentRef.current.innerHTML, docTitle);
    } else {
      window.print();
    }
  };

  const handleCopyTable = async () => {
    if (printContentRef.current) {
      const ok = await copyTableToClipboard(printContentRef.current);
      if (ok) {
        setCopySuccess(true);
        showNotice(t.copiedToClipboard);
        setTimeout(() => setCopySuccess(false), 2500);
      }
    }
  };

  const handleExportWord = () => {
    if (docType === 'annual') {
      exportCurriculumToWord(curriculum, schoolInfo, language);
    } else {
      exportDailyPlanToWord(dailyPlan, schoolInfo, language);
    }
    showNotice(t.exportWordOption);
  };

  const handleExportExcel = () => {
    if (docType === 'annual') {
      exportCurriculumToExcel(curriculum, schoolInfo, language);
    } else {
      exportDailyPlanToExcel(dailyPlan, schoolInfo, language);
    }
    showNotice(t.exportExcelOption);
  };

  const handleDownloadPdf = () => {
    if (docType === 'annual') {
      exportCurriculumToPdf(curriculum, schoolInfo, language);
    } else {
      exportDailyPlanToPdf(dailyPlan, schoolInfo, language);
    }
    showNotice(t.exportPdfDownloadOption);
  };

  const handleExportCsv = () => {
    if (docType === 'annual') {
      exportCurriculumToCSV(curriculum, schoolInfo, language);
    } else {
      exportDailyPlanToCSV(dailyPlan, schoolInfo, language);
    }
    showNotice(t.exportCsvOption);
  };

  // Bureau Header Title based on language
  const getBureauTitle = () => {
    if (language === 'am') {
      return 'የኦሮሚያ ክልላዊ መንግሥት · የትምህርት ቢሮ (OEB)';
    }
    if (language === 'en') {
      return 'OROMIA REGIONAL STATE · EDUCATION BUREAU (OEB)';
    }
    return 'MOOTUMMAA NAANNOO OROMIYAA · BIIROO BARNOOTAA OROMIYAA';
  };

  const getCurriculumStandardNotice = () => {
    if (language === 'am') {
      return `የኢትዮጵያ አዲሱ ሥርዓተ ትምህርት ማዕቀፍ (${schoolInfo.academicYear.am}) · ${schoolInfo.gradeAndSection.am} ${schoolInfo.subject.am}`;
    }
    if (language === 'en') {
      return `Ethiopian National Curriculum Framework (${schoolInfo.academicYear.en}) · ${schoolInfo.gradeAndSection.en} ${schoolInfo.subject.en}`;
    }
    return `Sirna Barnootaa Biyyooleessaa Itoophiyaa (${schoolInfo.academicYear.om}) · ${schoolInfo.gradeAndSection.om} ${schoolInfo.subject.om}`;
  };

  return (
    <div 
      id="print-modal-overlay"
      className="print-modal-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-start p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible"
    >
      
      {/* Top action bar (hidden during browser print) */}
      <div className="w-full max-w-7xl bg-white rounded-t-xl p-3 sm:p-4 flex flex-wrap justify-between items-center gap-3 border-b shadow-xl print:hidden sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Printer size={18} className="text-indigo-600" />
              {t.printPdf} — {docType === 'annual' ? t.printDocumentAnnual : t.printDocumentDaily}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-600 font-medium">
                {schoolInfo.schoolName[language]} ({schoolInfo.academicYear[language]})
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 size={12} />
                {t.printHeaderEveryPage}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Format Switchers */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Document Type Switcher: Annual vs Daily */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setDocType('annual')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                docType === 'annual' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarSync size={13} />
              <span>{t.annualView}</span>
            </button>
            <button
              onClick={() => setDocType('daily')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                docType === 'daily' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarDays size={13} />
              <span>{t.dailyView}</span>
            </button>
          </div>

          {/* Header Density Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-gray-200">
            <Sliders size={13} className="text-gray-500 ml-1.5 mr-1" />
            <button
              onClick={() => setHeaderDensity('full')}
              className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${headerDensity === 'full' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-gray-600'}`}
              title="Full institutional metadata grid on every page"
            >
              Full Header
            </button>
            <button
              onClick={() => setHeaderDensity('compact')}
              className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${headerDensity === 'compact' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-gray-600'}`}
              title="Compact 2-line header on every page"
            >
              Compact
            </button>
          </div>

          {/* Quick Language Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-gray-200">
            <Globe size={13} className="text-gray-500 ml-1 mr-1" />
            <button
              onClick={() => onLanguageChange('om')}
              className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${language === 'om' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-gray-600'}`}
            >
              Oromo
            </button>
            <button
              onClick={() => onLanguageChange('am')}
              className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${language === 'am' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-gray-600'}`}
            >
              አማርኛ
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${language === 'en' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-gray-600'}`}
            >
              English
            </button>
          </div>

          {/* Export to Word (.docx) */}
          <button
            onClick={handleExportWord}
            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            title={t.exportWordOption}
          >
            <FileText size={14} />
            <span className="hidden md:inline">Word (.docx)</span>
          </button>

          {/* Export to Excel (.xlsx) */}
          <button
            onClick={handleExportExcel}
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            title={t.exportExcelOption}
          >
            <FileSpreadsheet size={14} />
            <span className="hidden md:inline">Excel (.xlsx)</span>
          </button>

          {/* Direct Download PDF (.pdf) */}
          <button
            onClick={handleDownloadPdf}
            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            title={t.exportPdfDownloadOption}
          >
            <Download size={14} />
            <span className="hidden md:inline">PDF (.pdf)</span>
          </button>

          {/* Copy Table to Clipboard */}
          <button
            onClick={handleCopyTable}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            title={t.copyTableClipboard}
          >
            {copySuccess ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span className="hidden lg:inline">{copySuccess ? t.copiedToClipboard : t.copyTableClipboard}</span>
          </button>

          {/* Clean Window Print (for iframe sandbox bypass) */}
          <button
            onClick={handleOpenCleanWindow}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            title={t.openPrintWindowDesc}
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">{t.openPrintWindow}</span>
          </button>

          {/* Native Print Dialog */}
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Printer size={15} />
            <span>{t.printPdf}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ml-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Screen Helper Info & Feedback Banner */}
      <div className="w-full max-w-7xl bg-indigo-50 border-x border-b border-indigo-100 p-2.5 px-4 text-xs text-indigo-950 flex flex-wrap items-center justify-between gap-2 print:hidden">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-indigo-600 shrink-0" />
          <span>
            <strong>Multi-Page Layout Active:</strong> The institutional school header is placed directly in the table header group (<code>&lt;thead&gt;</code>) so it <strong>repeats at the top of every printed page</strong> automatically.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {actionNotice && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 animate-in fade-in">
              <Check size={12} />
              {actionNotice}
            </span>
          )}
          <span className="text-[11px] text-indigo-700 font-medium bg-white px-2 py-0.5 rounded border border-indigo-200">
            Orientation: A4 Landscape
          </span>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div 
        ref={printContentRef}
        id="printable-content"
        className="print-content-sheet w-full max-w-7xl bg-white p-4 sm:p-8 rounded-b-xl shadow-2xl print:shadow-none print:p-0 text-black font-sans print:w-full print:max-w-none print:static"
      >
        {docType === 'annual' ? (
          /* =========================================================
             ANNUAL SCHEME OF WORK (40 WEEKS) WITH REPEATING HEADER
             ========================================================= */
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full border-collapse border border-black text-[9px] sm:text-[9.5px] leading-tight print:w-full">
              
              {/* 
                CRITICAL PRINT REQUIREMENT:
                thead repeats automatically on EVERY printed page in browser print engines (Chrome, Edge, Safari, Firefox).
                Both the School Institutional Header and the Column Headers sit inside thead.
              */}
              <thead className="print:table-header-group">
                
                {/* 1. RUNNING INSTITUTIONAL DOCUMENT HEADER (REPEATS ON EVERY PRINTED PAGE) */}
                <tr className="border-b-2 border-black bg-white">
                  <th colSpan={12} className="p-2 border border-black text-left font-normal text-black bg-white">
                    <div className="flex justify-between items-start border-b border-black pb-1.5 mb-1.5">
                      <div>
                        <div className="text-[8.5px] uppercase tracking-wider text-gray-700 font-bold">
                          {getBureauTitle()}
                        </div>
                        <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-black leading-none mt-0.5">
                          {schoolInfo.schoolName[language]}
                        </h1>
                        <div className="text-[8.5px] text-gray-600 mt-0.5 italic">
                          {getCurriculumStandardNotice()}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] font-black uppercase text-black leading-tight">
                          {t.annualPlanTitle}
                        </div>
                        <div className="text-[9.5px] font-bold text-gray-800 mt-0.5">
                          {schoolInfo.academicYear[language]} · {schoolInfo.subject[language]} ({schoolInfo.gradeAndSection[language]})
                        </div>
                        <div className="text-[8px] text-gray-500 print:block">
                          {t.pageHeaderTitle}
                        </div>
                      </div>
                    </div>

                    {/* Institutional metadata row */}
                    {headerDensity === 'full' ? (
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 text-[8.5px] leading-snug bg-gray-50/80 p-1.5 rounded border border-gray-300">
                        <div>
                          <span className="font-bold text-black">{t.teacherName}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.teacherName[language]}</span>
                        </div>
                        <div>
                          <span className="font-bold text-black">{t.gradeAndSection}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.gradeAndSection[language]}</span>
                        </div>
                        <div>
                          <span className="font-bold text-black">{t.subject}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.subject[language]}</span>
                        </div>
                        <div>
                          <span className="font-bold text-black">{t.weeklyPeriods}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.weeklyPeriods} ({schoolInfo.periodDuration[language]})</span>
                        </div>
                        <div>
                          <span className="font-bold text-black">{t.annualPeriods}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.annualPeriods} ({schoolInfo.annualDays})</span>
                        </div>
                        <div>
                          <span className="font-bold text-black">{t.deptHead}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.departmentHeadName[language]}</span>
                        </div>
                        <div>
                          <span className="font-bold text-black">{t.principal}: </span>
                          <span className="text-gray-900 font-medium">{schoolInfo.principalName[language]}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center text-[8.5px] bg-gray-50 p-1 border border-gray-300">
                        <span><strong>{t.teacherName}:</strong> {schoolInfo.teacherName[language]}</span>
                        <span><strong>{t.gradeAndSection}:</strong> {schoolInfo.gradeAndSection[language]}</span>
                        <span><strong>{t.subject}:</strong> {schoolInfo.subject[language]}</span>
                        <span><strong>{t.weeklyPeriods}:</strong> {schoolInfo.weeklyPeriods} / wk</span>
                        <span><strong>{t.deptHead}:</strong> {schoolInfo.departmentHeadName[language]}</span>
                      </div>
                    )}
                  </th>
                </tr>

                {/* 2. TABLE COLUMN HEADERS (REPEATS ON EVERY PRINTED PAGE) */}
                <tr className="bg-gray-100 border-b-2 border-black text-center font-bold text-[8.5px] sm:text-[9px] print:bg-gray-200">
                  <th className="border border-black p-1 w-12">{t.month}</th>
                  <th className="border border-black p-1 w-8">{t.week}</th>
                  <th className="border border-black p-1 w-14">{t.date}</th>
                  <th className="border border-black p-1 w-8">{t.pages}</th>
                  <th className="border border-black p-1 w-16">{t.chapter}</th>
                  <th className="border border-black p-1 w-44">{t.mainTopic}</th>
                  <th className="border border-black p-1 w-44">{t.objectives}</th>
                  <th className="border border-black p-1 w-32">{t.priorKnowledge}</th>
                  <th className="border border-black p-1 w-32">{t.lessonOutcome}</th>
                  <th className="border border-black p-1 w-28">{t.teachingMethod}</th>
                  <th className="border border-black p-1 w-24">{t.materials}</th>
                  <th className="border border-black p-1 w-28">{t.assessment}</th>
                </tr>
              </thead>

              {/* TABLE BODY (PAGINATED ACROSS MULTIPLE PAGES) */}
              <tbody>
                {curriculum.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-black break-inside-avoid ${item.isExamWeek ? 'bg-amber-50/40 font-semibold' : ''}`}
                  >
                    <td className="border border-black p-1 text-center font-bold">{item.monthName[language]}</td>
                    <td className="border border-black p-1 text-center font-semibold">{item.weekNumber}</td>
                    <td className="border border-black p-1 text-center whitespace-nowrap">{item.dateRange}</td>
                    <td className="border border-black p-1 text-center font-medium">{item.pages}</td>
                    <td className="border border-black p-1 font-semibold">{item.chapter[language]}</td>
                    <td className="border border-black p-1 font-bold text-gray-900">{item.mainTopic[language]}</td>
                    <td className="border border-black p-1 text-justify">{item.generalObjectives[language]}</td>
                    <td className="border border-black p-1">{item.priorKnowledge[language]}</td>
                    <td className="border border-black p-1">{item.lessonOutcome[language]}</td>
                    <td className="border border-black p-1">{item.teachingMethod[language]}</td>
                    <td className="border border-black p-1">{item.teachingAids[language]}</td>
                    <td className="border border-black p-1">{item.assessment[language]}</td>
                  </tr>
                ))}
              </tbody>

              {/* 
                REPEATING FOOTER ON EVERY PRINTED PAGE
                tfoot repeats automatically at the bottom of every printed page.
              */}
              <tfoot className="print:table-footer-group">
                <tr className="border-t-2 border-black bg-white">
                  <td colSpan={12} className="p-1 border border-black text-[8px] text-gray-700 bg-white">
                    <div className="flex justify-between items-center">
                      <span>
                        <strong>Curriculum Standard:</strong> {getCurriculumStandardNotice()}
                      </span>
                      <span>
                        <strong>School:</strong> {schoolInfo.schoolName[language]} ({schoolInfo.academicYear[language]})
                      </span>
                      <span>
                        <strong>{t.teacherName}:</strong> {schoolInfo.teacherName[language]} | Signature: ________________
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          /* =========================================================
             DAILY LESSON PLAN WITH REPEATING HEADER
             ========================================================= */
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full border-collapse border border-black text-[9.5px] leading-tight print:w-full">
              
              {/* Repeating Header for Daily Lesson Plan */}
              <thead className="print:table-header-group">
                <tr className="border-b-2 border-black bg-white">
                  <th colSpan={6} className="p-2.5 border border-black text-left font-normal text-black bg-white">
                    <div className="flex justify-between items-start border-b border-black pb-2 mb-2">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-gray-700 font-bold">
                          {getBureauTitle()}
                        </div>
                        <h1 className="text-lg font-black uppercase tracking-tight text-black leading-none mt-0.5">
                          {schoolInfo.schoolName[language]}
                        </h1>
                        <div className="text-[9px] text-gray-600 mt-0.5">
                          {getCurriculumStandardNotice()}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black uppercase text-black">
                          {language === 'am' ? 'የዕለት የትምህርት ዕቅድ' : language === 'en' ? 'DAILY LESSON PLAN' : 'KAROORA BARNOOTAA GUYYAA'}
                        </div>
                        <div className="text-[10px] font-bold text-gray-800 mt-0.5">
                          {dailyPlan.date} ({schoolInfo.academicYear[language]})
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 text-[9px] bg-gray-50/80 p-1.5 rounded border border-gray-300">
                      <div>
                        <span className="font-bold">{t.teacherName}: </span>
                        <span>{schoolInfo.teacherName[language]}</span>
                      </div>
                      <div>
                        <span className="font-bold">{t.gradeAndSection}: </span>
                        <span>{schoolInfo.gradeAndSection[language]}</span>
                      </div>
                      <div>
                        <span className="font-bold">{t.subject}: </span>
                        <span>{schoolInfo.subject[language]}</span>
                      </div>
                      <div>
                        <span className="font-bold">{t.period}: </span>
                        <span>{schoolInfo.weeklyPeriods} / wk ({schoolInfo.periodDuration[language]})</span>
                      </div>
                      <div>
                        <span className="font-bold">{t.deptHead}: </span>
                        <span>{schoolInfo.departmentHeadName[language]}</span>
                      </div>
                      <div>
                        <span className="font-bold">{t.date}: </span>
                        <span>{dailyPlan.date}</span>
                      </div>
                    </div>
                  </th>
                </tr>

                {/* Daily Column Headers */}
                <tr className="bg-gray-100 border-b-2 border-black text-center font-bold text-[9px] print:bg-gray-200">
                  <th className="border border-black p-1.5 w-20">{t.period} & {t.date}</th>
                  <th className="border border-black p-1.5 w-48">{t.chapter} & {t.mainTopic}</th>
                  <th className="border border-black p-1.5 w-40">{t.studentTextbook}</th>
                  <th className="border border-black p-1.5 w-56">{t.objectives}</th>
                  <th className="border border-black p-1.5">{t.fivePhaseLesson}</th>
                  <th className="border border-black p-1.5 w-40">{t.materials} & {t.assessment}</th>
                </tr>
              </thead>

              <tbody>
                {dailyPlan.lessons.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">
                      {t.noDailyLessons} — {t.noDailyLessonsDesc}
                    </td>
                  </tr>
                ) : (
                  dailyPlan.lessons.map((lesson, idx) => (
                    <tr key={lesson.id || idx} className="border-b border-black break-inside-avoid">
                      <td className="border border-black p-2 text-center align-top">
                        <div className="font-bold text-xs">Period {idx + 1}</div>
                        <div className="text-[9px] font-semibold text-gray-700 mt-1">
                          {lesson.timeStart} - {lesson.timeEnd}
                        </div>
                        <div className="text-[8.5px] text-gray-500">({t.duration45Min})</div>
                      </td>

                      <td className="border border-black p-2 align-top">
                        <div className="text-[9px] font-semibold text-indigo-900">{lesson.chapter || schoolInfo.subject[language]}</div>
                        <div className="font-bold text-xs text-black mt-0.5">{lesson.mainTopic}</div>
                      </td>

                      <td className="border border-black p-2 align-top">
                        <div className="font-bold text-gray-900">
                          {t.pages}: {lesson.studentBookPages || 'pp. 1-17'}
                        </div>
                        {lesson.textbookExercises && (
                          <div className="text-[8.5px] text-gray-700 mt-1">
                            <strong>{t.textbookExercises}:</strong> {lesson.textbookExercises}
                          </div>
                        )}
                        {lesson.teacherGuidePages && (
                          <div className="text-[8.5px] text-emerald-800 mt-1">
                            <strong>{t.teacherGuide}:</strong> {lesson.teacherGuidePages}
                          </div>
                        )}
                      </td>

                      <td className="border border-black p-2 align-top text-justify">
                        <div className="font-semibold text-gray-900">{lesson.objectives}</div>
                        {lesson.priorKnowledge && (
                          <div className="text-[8.5px] text-gray-600 mt-1.5 pt-1 border-t border-gray-200">
                            <strong>{t.priorKnowledge}:</strong> {lesson.priorKnowledge}
                          </div>
                        )}
                      </td>

                      <td className="border border-black p-2 align-top">
                        <div className="whitespace-pre-line text-[9px] leading-relaxed text-gray-900">
                          {lesson.activities || lesson.teacherGuideSteps || lesson.methodology}
                        </div>
                      </td>

                      <td className="border border-black p-2 align-top">
                        <div>
                          <strong>{t.materials}:</strong>
                          <div className="text-[8.5px] text-gray-800 mt-0.5">{lesson.materials || 'Kitaaba Barataa, Gabatee Gurraacha'}</div>
                        </div>
                        <div className="mt-2 pt-1 border-t border-gray-200">
                          <strong>{t.assessment}:</strong>
                          <div className="text-[8.5px] text-gray-800 mt-0.5">{lesson.assessment || 'Gaaffilee Gilgaalaa fi Hojii Manaa'}</div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}

                {/* Daily Teacher Reflections / Notes */}
                {dailyPlan.notes && (
                  <tr className="border-b border-black break-inside-avoid bg-gray-50/50">
                    <td className="border border-black p-2 font-bold text-center align-top">
                      {t.notesTitle}
                    </td>
                    <td colSpan={5} className="border border-black p-2 text-[9px] leading-relaxed">
                      {dailyPlan.notes}
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot className="print:table-footer-group">
                <tr className="border-t-2 border-black bg-white">
                  <td colSpan={6} className="p-1 border border-black text-[8px] text-gray-700 bg-white">
                    <div className="flex justify-between items-center">
                      <span>
                        <strong>Curriculum Standard:</strong> {getCurriculumStandardNotice()}
                      </span>
                      <span>
                        <strong>School:</strong> {schoolInfo.schoolName[language]}
                      </span>
                      <span>
                        <strong>Approved by Dept Head:</strong> ________________________ (Date: ____/____/{schoolInfo.academicYear[language]})
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* 
          OFFICIAL SIGNATURE APPROVAL BLOCK
          Placed at the end of the document, prevented from breaking awkwardly across pages.
        */}
        <div className="mt-6 grid grid-cols-3 gap-6 text-xs pt-4 border-t-2 border-black break-inside-avoid">
          <div className="border border-gray-300 p-2.5 rounded bg-gray-50/40">
            <p className="font-bold text-black uppercase tracking-wider text-[10px]">{t.teacherName}</p>
            <p className="mt-1 font-semibold text-gray-900">{schoolInfo.teacherName[language]}</p>
            <p className="mt-3 text-[10px]">{t.signature}: _____________________________</p>
            <p className="mt-1.5 text-[10px]">{t.date}: _____ / _____ / {schoolInfo.academicYear[language]}</p>
          </div>

          <div className="border border-gray-300 p-2.5 rounded bg-gray-50/40">
            <p className="font-bold text-black uppercase tracking-wider text-[10px]">{t.deptHead}</p>
            <p className="mt-1 font-semibold text-gray-900">{schoolInfo.departmentHeadName[language]}</p>
            <p className="mt-3 text-[10px]">{t.signature}: _____________________________</p>
            <p className="mt-1.5 text-[10px]">{t.date}: _____ / _____ / {schoolInfo.academicYear[language]}</p>
          </div>

          <div className="border border-gray-300 p-2.5 rounded bg-gray-50/40">
            <p className="font-bold text-black uppercase tracking-wider text-[10px]">{t.principal}</p>
            <p className="mt-1 font-semibold text-gray-900">{schoolInfo.principalName[language]}</p>
            <p className="mt-3 text-[10px]">{t.signature}: _____________________________</p>
            <p className="mt-1.5 text-[10px]">{t.date}: _____ / _____ / {schoolInfo.academicYear[language]}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
