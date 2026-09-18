import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Printer, 
  Download, 
  CalendarDays, 
  CalendarSync, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  Search, 
  FileText, 
  Laptop, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  Copy
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../lib/i18n';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type ManualSection = 
  | 'overview' 
  | 'classes' 
  | 'annual' 
  | 'daily' 
  | 'print' 
  | 'export' 
  | 'offline' 
  | 'faq';

export default function UserManualModal({
  isOpen,
  onClose,
  language
}: UserManualModalProps) {
  const [activeSection, setActiveSection] = useState<ManualSection>('overview');
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:hidden">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manual-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 id="manual-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {t.userManualTitle}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t.userManualDesc} • 2019 A.L.I (2026/27 G.C.)
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Sidebar Navigation + Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Navigation Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
            <button
              onClick={() => setActiveSection('overview')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Sparkles size={16} />
              <span>{language === 'om' ? '1. Waliigala (Overview)' : language === 'am' ? '1. አጠቃላይ እይታ' : '1. Overview & Setup'}</span>
            </button>

            <button
              onClick={() => setActiveSection('classes')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'classes'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Layers size={16} />
              <span>{language === 'om' ? '2. Dareewwan & Barnoota' : language === 'am' ? '2. ክፍሎችና የትምህርት አይነቶች' : '2. Classes & Subjects'}</span>
            </button>

            <button
              onClick={() => setActiveSection('annual')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'annual'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <CalendarSync size={16} />
              <span>{language === 'om' ? '3. Karoora Waggaa' : language === 'am' ? '3. ዓመታዊ ዕቅድ' : '3. Annual Scheme (42 Wks)'}</span>
            </button>

            <button
              onClick={() => setActiveSection('daily')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'daily'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <CalendarDays size={16} />
              <span>{language === 'om' ? '4. Sagantaa Guyyaa (45 min)' : language === 'am' ? '4. የዕለት ዕቅድ (45 ደቂቃ)' : '4. Daily Lesson Plan'}</span>
            </button>

            <button
              onClick={() => setActiveSection('print')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'print'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Printer size={16} />
              <span>{language === 'om' ? '5. Maxxansa Seera Qabeessa' : language === 'am' ? '5. ህትመትና ፊርማ' : '5. Official Multi-Page Print'}</span>
            </button>

            <button
              onClick={() => setActiveSection('export')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'export'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Download size={16} />
              <span>{language === 'om' ? '6. Word, Excel, CSV, JSON' : language === 'am' ? '6. መላኪያ (Word, Excel)' : '6. Universal Export Suite'}</span>
            </button>

            <button
              onClick={() => setActiveSection('offline')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'offline'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Laptop size={16} />
              <span>{language === 'om' ? '7. Offline & PWA' : language === 'am' ? '7. ከመስመር ውጪና PWA' : '7. Offline & PWA App'}</span>
            </button>

            <button
              onClick={() => setActiveSection('faq')}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSection === 'faq'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <HelpCircle size={16} />
              <span>{language === 'om' ? '8. Gaaffii fi Deebii (FAQ)' : language === 'am' ? '8. ጥያቄና መልስ' : '8. Tips & Troubleshooting'}</span>
            </button>
          </div>

          {/* Section Detail Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-white text-slate-800 text-sm leading-relaxed space-y-6">
            
            {/* SECTION 1: OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>🇪🇹</span> 
                    {language === 'om' 
                      ? 'Waliigala Appilikeeshinii Karoora Barnootaa 2019' 
                      : language === 'am' 
                      ? 'የ2019 የትምህርት ዕቅድ አፕሊኬሽን አጠቃላይ መግቢያ' 
                      : 'Overview: Lesson Planner 2019 (2026/27 G.C.)'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    {language === 'om'
                      ? 'Appilikeeshiniin kun barsiisota manneen barnootaa Itoophiyaatiif qophaa\'e. Sirna barnootaa haarawaa 2019 A.L.I (2026/27) guutummaatti hordofa.'
                      : language === 'am'
                      ? 'ይህ አፕሊኬሽን ለኢትዮጵያ መምህራን የተዘጋጀ ሲሆን የ2019 ዓ.ም (2026/27) አዲሱን የትምህርት ማዕቀፍ ደረጃዎች በሙሉ ያሟላል።'
                      : 'Professional, offline-ready curriculum planning and daily preparation platform built specifically for Ethiopian school teachers.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                    <h4 className="font-bold text-indigo-950 flex items-center gap-1.5 mb-1">
                      <GraduationCap size={16} className="text-indigo-600" />
                      {language === 'om' ? 'Bara Barnootaa 2019' : language === 'am' ? 'የትምህርት ዘመን 2019' : '2019 Academic Year'}
                    </h4>
                    <p className="text-xs text-indigo-900/80">
                      Fulbaana 11, 2019 hanga Waxabajjii 30, 2019 A.L.I (September 2026 – July 2027 G.C.).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                    <h4 className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      {language === 'om' ? 'Afaanota Sadii (3)' : language === 'am' ? 'በ3 ቋንቋዎች' : 'Trilingual Support'}
                    </h4>
                    <p className="text-xs text-emerald-900/80">
                      Afaan Oromoo, አማርኛ (Amharic), and English — switch instantly with seamless synchronization.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/50">
                    <h4 className="font-bold text-purple-950 flex items-center gap-1.5 mb-1">
                      <ShieldCheck size={16} className="text-purple-600" />
                      {language === 'om' ? 'Offline & Nageenya' : language === 'am' ? 'ያለ ኢንተርኔት (Offline)' : '100% Offline & Private'}
                    </h4>
                    <p className="text-xs text-purple-900/80">
                      All data stays inside your browser localStorage. No servers required, zero internet needed.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Key Core Capabilities:</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li><strong>42-Week Complete Scheme:</strong> Divided into Semester 1 (Weeks 1–20) and Semester 2 (Weeks 21–42) with midterms & final examination weeks.</li>
                    <li><strong>45-Minute Daily Lessons:</strong> 5-phase standardized lesson delivery structure with textbook pages and activities.</li>
                    <li><strong>Repeating Running Print Headers & Footers:</strong> Formal institutional headers and signature lines printed on every page of A4 landscape sheets.</li>
                    <li><strong>5 Export Formats:</strong> Word (.doc), Excel (.xls), CSV (.csv), Standalone Webpage (.html), and full JSON backup.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* SECTION 2: CLASSES & SUBJECTS */}
            {activeSection === 'classes' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="text-indigo-600" size={22} />
                    {language === 'om' 
                      ? 'Dareewwan fi Gosa Barnootaa Bulchuu' 
                      : language === 'am' 
                      ? 'ክፍሎችንና የትምህርት አይነቶችን ማስተዳደር' 
                      : 'Managing Multiple Classes & Subjects'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Create distinct lesson plans for different grades (Grade 5, Grade 6, Grade 7), sections (A, B, C), or subjects (Math, Science, English).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">1. Switching Between Classes</h4>
                    <p className="text-xs text-slate-600">
                      Use the top pill bar right below the navigation header. Click on any class chip (e.g. <em>"Kutaa 5ffaa - Herrega"</em>) to switch context. The entire annual scheme, daily plans, and school details immediately update.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">2. Creating a New Class</h4>
                    <p className="text-xs text-slate-600 mb-2">
                      Click the <strong>"+ Add Class"</strong> button in the class bar to open the Class Manager. Choose one of three starting templates:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                      <li><strong>Official 2019 Curriculum:</strong> Pre-filled with all 42 weeks of Grade 5 Mathematics aligned with the Ethiopian syllabus.</li>
                      <li><strong>Clone Active Class:</strong> Duplicates your current curriculum structure, dates, and settings for another section.</li>
                      <li><strong>Blank 42-Week Outline:</strong> Blank dates and topic slots ready for a completely custom subject.</li>
                    </ul>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">3. Editing Institutional & Teacher Info</h4>
                    <p className="text-xs text-slate-600">
                      Click the <strong>"Edit Info"</strong> button in the Annual Planner header to customize the School Name, Teacher Name, Department Head, and Principal in all three languages.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: ANNUAL PLANNER */}
            {activeSection === 'annual' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CalendarSync className="text-indigo-600" size={22} />
                    {language === 'om' ? 'Karoora Waggaa (Torban 42)' : language === 'am' ? 'ዓመታዊ የትምህርት ዕቅድ (42 ሳምንታት)' : 'Annual Curriculum Scheme (42 Weeks)'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Structured 42-week academic calendar with Ethiopian months (Fulbaana to Waxabajjii), textbook page citations, and learning competencies.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Searching and Semester Filtering</h4>
                    <p className="text-xs text-slate-600">
                      Filter the table by <strong>All Weeks (1–42)</strong>, <strong>Semester 1 (Weeks 1–20)</strong>, or <strong>Semester 2 (Weeks 21–42)</strong>. Use the search input to locate specific mathematical topics (e.g. <em>"Lakkoofsota Guutuu"</em>, <em>"Herrega Saayinsii"</em>, <em>"Fractions"</em>).
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Editing Any Week</h4>
                    <p className="text-xs text-slate-600">
                      Click the <strong>Edit (Pencil)</strong> icon on any week row to adjust:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-700">
                      <li>Chapter, Main Topic, and Sub-topics</li>
                      <li>Student Textbook Pages & Teacher's Guide references</li>
                      <li>General Objectives & Specific Competencies</li>
                      <li>Prior Knowledge / Prerequisite Concepts</li>
                      <li>Teaching & Learning Methodologies (Active Learning)</li>
                      <li>Instructional Materials & Teaching Aids</li>
                      <li>Assessment Strategies (Classwork, Quizzes, Observation)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Quick-Transfer to Daily Lesson</h4>
                    <p className="text-xs text-slate-600">
                      Click the calendar icon next to any week to immediately copy that week's topic, objectives, and page references directly into today's 45-minute daily lesson plan.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: DAILY PLANNER */}
            {activeSection === 'daily' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CalendarDays className="text-indigo-600" size={22} />
                    {language === 'om' ? 'Sagantaa Barnoota Guyyaa (Daqiiqaa 45)' : language === 'am' ? 'የዕለት ትምህርት ዝግጅት ዕቅድ (45 ደቂቃ)' : 'Standardized 45-Minute Daily Lesson Plan'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Guided 5-phase active learning lesson framework compliant with Ethiopian Ministry of Education pedagogical standards.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-slate-900 text-sm mb-2">The Standard 5-Phase Lesson Breakdown:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <strong className="text-indigo-700">1. Introduction & Review (5 min):</strong>
                        <p className="text-slate-600 mt-0.5">Activate prior knowledge, review previous homework, and state today's lesson objective.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <strong className="text-indigo-700">2. Teacher Demonstration (15 min):</strong>
                        <p className="text-slate-600 mt-0.5">Direct instruction, chalkboard diagrams, and worked examples from textbook.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <strong className="text-indigo-700">3. Guided / Group Practice (15 min):</strong>
                        <p className="text-slate-600 mt-0.5">Students solve textbook problems in pairs or small groups with teacher monitoring.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <strong className="text-indigo-700">4. Independent Assessment (5 min):</strong>
                        <p className="text-slate-600 mt-0.5">Exit ticket, quick check question, or student presentation on chalkboard.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 sm:col-span-2">
                        <strong className="text-indigo-700">5. Summary & Homework Assignment (5 min):</strong>
                        <p className="text-slate-600 mt-0.5">Recap key takeaway rules, assign textbook exercise page, and clarify home study tasks.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                    <h4 className="font-bold text-indigo-950 text-sm mb-1">Import from Annual Plan</h4>
                    <p className="text-xs text-indigo-900/80">
                      Click <strong>"Import from Annual Plan"</strong> to select any of the 42 weeks. The title, specific competencies, textbook exercise numbers, and aids automatically fill in!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: OFFICIAL PRINT */}
            {activeSection === 'print' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Printer className="text-indigo-600" size={22} />
                    {language === 'om' ? 'Maxxansa Seera Qabeessa Fuula Baay\'ee' : language === 'am' ? 'ይፋዊ ባለብዙ ገጽ ህትመት' : 'Official Multi-Page A4 Landscape Printing'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Specialized typography and CSS page-break rules engineered for Ethiopian school inspection standards.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">1. Repeating Running Headers & Footers</h4>
                    <p className="text-xs text-slate-600">
                      Because an annual plan spans across 6 to 10 printed pages, this app uses native CSS <code>display: table-header-group</code> and <code>table-footer-group</code>. When you print, the official school emblem, title, and teacher/principal signature blocks appear at the top and bottom of <strong>every single printed sheet</strong>.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">2. Recommended Browser Print Settings</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                      <li><strong>Destination:</strong> Save as PDF or select your physical printer.</li>
                      <li><strong>Layout:</strong> Landscape (A4).</li>
                      <li><strong>Margins:</strong> Minimum or Default (5mm – 10mm).</li>
                      <li><strong>Options:</strong> Check <em>"Background graphics"</em> so table borders and header colors print cleanly.</li>
                    </ul>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">3. Clean Print Window (Overcoming Iframe Limits)</h4>
                    <p className="text-xs text-slate-600">
                      If your browser restricts printing inside web previews, click <strong>"Clean Print Window"</strong> in the Export menu. It opens a pristine, isolated browser tab that prints directly without any navigation bars or borders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 6: UNIVERSAL EXPORT */}
            {activeSection === 'export' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Download className="text-indigo-600" size={22} />
                    {language === 'om' ? 'Faayiloota Garaagaraatiin Baasuu' : language === 'am' ? 'ወደተለያዩ የፋይል አይነቶች መላክ' : 'Universal Export Suite: Word, Excel, CSV, HTML, JSON'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Export your curriculum into any format required by your school administration or ministry inspectors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40">
                    <h4 className="font-bold text-blue-950 text-sm mb-1 flex items-center gap-1.5">
                      <FileText size={16} className="text-blue-600" />
                      Microsoft Word (.doc)
                    </h4>
                    <p className="text-xs text-blue-900/80">
                      Complete tabular document formatted with institutional headings and signature boxes. Opens directly in Microsoft Word, LibreOffice, or Google Docs for further editing.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40">
                    <h4 className="font-bold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
                      <FileText size={16} className="text-emerald-600" />
                      Microsoft Excel (.xls)
                    </h4>
                    <p className="text-xs text-emerald-900/80">
                      High-fidelity XML spreadsheet with column borders, colored headers, and gridlines ready for mathematical record keeping.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/40">
                    <h4 className="font-bold text-amber-950 text-sm mb-1 flex items-center gap-1.5">
                      <FileText size={16} className="text-amber-600" />
                      CSV Spreadsheet (.csv)
                    </h4>
                    <p className="text-xs text-amber-900/80">
                      Standard comma-separated file format compatible with Google Sheets, database pipelines, and Apple Numbers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40">
                    <h4 className="font-bold text-purple-950 text-sm mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-purple-600" />
                      Full JSON Backup (.json)
                    </h4>
                    <p className="text-xs text-purple-900/80">
                      Backs up your entire 42-week curriculum, daily plans, and school details into a single file to keep your work safe forever.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7: OFFLINE & PWA */}
            {activeSection === 'offline' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Laptop className="text-indigo-600" size={22} />
                    {language === 'om' ? 'Offline fi Appilikeeshinii PWA' : language === 'am' ? 'ከመስመር ውጪ አጠቃቀምና የPWA ጭነት' : 'Offline Access & Progressive Web App (PWA)'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Use the planner in classrooms and rural schools without internet connection.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">1. Installing to Desktop or Phone</h4>
                    <p className="text-xs text-slate-600 mb-2">
                      Look for the <strong>"Install App"</strong> button in the top navigation bar, or open your browser menu (Chrome / Edge / Safari):
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                      <li><strong>Chrome / Edge:</strong> Click the install icon in the address bar or select <em>"Install Lesson Planner"</em>.</li>
                      <li><strong>iPhone / iPad (Safari):</strong> Tap <em>Share → Add to Home Screen</em>.</li>
                      <li><strong>Android (Chrome):</strong> Tap <em>Menu (three dots) → Add to Home screen</em>.</li>
                    </ul>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">2. Zero Internet Requirement</h4>
                    <p className="text-xs text-slate-600">
                      Once opened once, service workers cache all scripts, styles, and templates. You can turn off Wi-Fi or mobile data completely, restart your computer, and the application will still launch instantly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 8: FAQ & TROUBLESHOOTING */}
            {activeSection === 'faq' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="text-indigo-600" size={22} />
                    {language === 'om' ? 'Gaaffii fi Deebii (FAQ) fi Gorsa' : language === 'am' ? 'ተደጋጋሚ ጥያቄዎችና ጠቃሚ ምክሮች' : 'Frequently Asked Questions & Tips'}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Quick solutions to common questions and data management best practices.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h4 className="font-bold text-slate-900 text-sm">Q: How do I reset the curriculum to official standards?</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Click <strong>"Reset to Default"</strong> in the Annual Planner header. This resets the active class back to the official 42-week Grade 5 Mathematics curriculum while retaining your customized teacher name and school title.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h4 className="font-bold text-slate-900 text-sm">Q: What happens if I clear my browser cookies or history?</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Because data is saved in localStorage, clearing browser site data will remove your saved edits. We strongly recommend clicking <strong>Export → JSON Backup (.json)</strong> once a month to save a backup file to your computer or USB drive.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h4 className="font-bold text-slate-900 text-sm">Q: Can I edit the exported Word document?</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Yes! The exported <code>.doc</code> file is a standard Microsoft Word table. You can open it in Microsoft Word, add your school logo, resize columns, or sign electronically.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h4 className="font-bold text-slate-900 text-sm">Q: What is the current official academic year?</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      The academic year is <strong>2019 A.L.I (2026/27 G.C.)</strong>. All week dates, semester schedules, and signature blocks are aligned with this standard.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>
            <span>Salayish School System • 2019 A.L.I</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
