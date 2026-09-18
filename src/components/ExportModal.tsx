import React from 'react';
import { X, FileSpreadsheet, Printer, FileCode, Download, Check } from 'lucide-react';
import { CurriculumWeek, SchoolInfo, Language } from '../types';
import { translations } from '../lib/i18n';
import { exportCurriculumToCSV, exportCurriculumToJSON } from '../lib/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  curriculum: CurriculumWeek[];
  schoolInfo: SchoolInfo;
  language: Language;
  onOpenPrintView: () => void;
}

export default function ExportModal({
  isOpen,
  onClose,
  curriculum,
  schoolInfo,
  language,
  onOpenPrintView
}: ExportModalProps) {
  if (!isOpen) return null;

  const t = translations[language];

  const handlePrintPdf = () => {
    onClose();
    onOpenPrintView();
  };

  const handleExportCsv = () => {
    exportCurriculumToCSV(curriculum, schoolInfo, language);
  };

  const handleExportJson = () => {
    exportCurriculumToJSON(curriculum, schoolInfo);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {t.exportModalTitle}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.exportModalDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Options */}
        <div className="p-6 space-y-3">
          
          {/* PDF Option */}
          <button
            onClick={handlePrintPdf}
            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all flex items-start gap-4 group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Printer size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-indigo-900">
                  {t.exportPdfOption}
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  PDF
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t.exportPdfDesc}
              </p>
            </div>
          </button>

          {/* CSV / Excel Option */}
          <button
            onClick={handleExportCsv}
            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all flex items-start gap-4 group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileSpreadsheet size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-emerald-900">
                  {t.exportCsvOption}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  .CSV
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t.exportCsvDesc}
              </p>
            </div>
          </button>

          {/* JSON Option */}
          <button
            onClick={handleExportJson}
            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex items-start gap-4 group"
          >
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <FileCode size={22} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 group-hover:text-amber-900">
                  {t.exportJsonOption}
                </span>
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  .JSON
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t.exportJsonDesc}
              </p>
            </div>
          </button>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
