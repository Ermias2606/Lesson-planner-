import React, { useState } from 'react';
import { X, FileSpreadsheet, Printer, FileCode, Download, Check, FileText, Globe, CalendarSync, CalendarDays } from 'lucide-react';
import { CurriculumWeek, SchoolInfo, Language, DailyPlan } from '../types';
import { translations } from '../lib/i18n';
import { 
  exportCurriculumToCSV, 
  exportCurriculumToJSON, 
  exportCurriculumToWord, 
  exportCurriculumToExcel, 
  exportCurriculumToHtml,
  exportDailyPlanToCSV,
  exportDailyPlanToWord,
  exportDailyPlanToJSON
} from '../lib/exportUtils';
import { getDailyPlan } from '../lib/storage';
import { format } from 'date-fns';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  curriculum: CurriculumWeek[];
  schoolInfo: SchoolInfo;
  language: Language;
  initialDocumentType?: 'annual' | 'daily';
  activeCourseId?: string;
  onOpenPrintView: (docType?: 'annual' | 'daily') => void;
}

export default function ExportModal({
  isOpen,
  onClose,
  curriculum,
  schoolInfo,
  language,
  initialDocumentType = 'annual',
  activeCourseId,
  onOpenPrintView
}: ExportModalProps) {
  const [docType, setDocType] = useState<'annual' | 'daily'>(initialDocumentType);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = translations[language];
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const dailyPlan: DailyPlan = getDailyPlan(todayStr, language, activeCourseId);

  const notifySuccess = (msg: string) => {
    setDownloadSuccess(msg);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  const handlePrintPdf = () => {
    onClose();
    onOpenPrintView(docType);
  };

  const handleExportWord = () => {
    if (docType === 'annual') {
      exportCurriculumToWord(curriculum, schoolInfo, language);
      notifySuccess(t.exportWordOption);
    } else {
      exportDailyPlanToWord(dailyPlan, schoolInfo, language);
      notifySuccess(t.exportWordOption);
    }
  };

  const handleExportExcel = () => {
    if (docType === 'annual') {
      exportCurriculumToExcel(curriculum, schoolInfo, language);
      notifySuccess(t.exportExcelOption);
    } else {
      exportDailyPlanToCSV(dailyPlan, schoolInfo, language);
      notifySuccess(t.exportExcelOption);
    }
  };

  const handleExportCsv = () => {
    if (docType === 'annual') {
      exportCurriculumToCSV(curriculum, schoolInfo, language);
      notifySuccess(t.exportCsvOption);
    } else {
      exportDailyPlanToCSV(dailyPlan, schoolInfo, language);
      notifySuccess(t.exportDailyCsvOption);
    }
  };

  const handleExportHtml = () => {
    exportCurriculumToHtml(curriculum, schoolInfo, language);
    notifySuccess(t.exportHtmlOption);
  };

  const handleExportJson = () => {
    if (docType === 'annual') {
      exportCurriculumToJSON(curriculum, schoolInfo);
      notifySuccess(t.exportJsonOption);
    } else {
      exportDailyPlanToJSON(dailyPlan, schoolInfo);
      notifySuccess(t.exportJsonOption);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Download size={18} className="text-indigo-600" />
              {t.exportModalTitle}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.exportModalDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Document Selection Switcher */}
        <div className="px-6 pt-4 pb-1 flex items-center justify-between gap-3 bg-white border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-700">Document Type:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setDocType('annual')}
              className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                docType === 'annual' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarSync size={13} />
              <span>{t.annualView}</span>
            </button>
            <button
              onClick={() => setDocType('daily')}
              className={`px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                docType === 'daily' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarDays size={13} />
              <span>{t.dailyView}</span>
            </button>
          </div>
        </div>

        {/* Notification Banner on Export Trigger */}
        {downloadSuccess && (
          <div className="mx-6 mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium animate-in fade-in">
            <Check size={16} className="text-emerald-600 shrink-0" />
            <span>{downloadSuccess} — downloaded successfully!</span>
          </div>
        )}

        {/* Modal Options Grid */}
        <div className="p-6 overflow-y-auto space-y-3">
          
          {/* Microsoft Word (.doc) Option */}
          <button
            onClick={handleExportWord}
            className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-blue-900">
                  {t.exportWordOption}
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  DOC / WORD
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.exportWordDesc}
              </p>
            </div>
          </button>

          {/* Excel Spreadsheet (.xls) Option */}
          <button
            onClick={handleExportExcel}
            className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
              <FileSpreadsheet size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-emerald-900">
                  {t.exportExcelOption}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  EXCEL (.XLS)
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.exportExcelDesc}
              </p>
            </div>
          </button>

          {/* CSV File Option */}
          <button
            onClick={handleExportCsv}
            className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50/40 transition-all flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
              <FileSpreadsheet size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-teal-900">
                  {t.exportCsvOption}
                </span>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  .CSV (UTF-8)
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.exportCsvDesc}
              </p>
            </div>
          </button>

          {/* PDF & Print View Option */}
          <button
            onClick={handlePrintPdf}
            className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
              <Printer size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-indigo-900">
                  {t.exportPdfOption}
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  PRINT / PDF
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.exportPdfDesc}
              </p>
            </div>
          </button>

          {/* Standalone HTML File (Offline Webpage) */}
          <button
            onClick={handleExportHtml}
            className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-violet-500 hover:bg-violet-50/40 transition-all flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors shrink-0">
              <Globe size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-violet-900">
                  {t.exportHtmlOption}
                </span>
                <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                  HTML OFFLINE
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.exportHtmlDesc}
              </p>
            </div>
          </button>

          {/* JSON Backup Option */}
          <button
            onClick={handleExportJson}
            className="w-full text-left p-3.5 rounded-xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/40 transition-all flex items-start gap-3.5 group cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
              <FileCode size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-amber-900">
                  {t.exportJsonOption}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  JSON BACKUP
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.exportJsonDesc}
              </p>
            </div>
          </button>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            {docType === 'annual' ? `${curriculum.length} weeks loaded` : `${dailyPlan.lessons.length} periods loaded`}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
