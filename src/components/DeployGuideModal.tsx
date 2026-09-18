import React, { useState } from 'react';
import { 
  X, 
  Rocket, 
  Terminal, 
  Cloud, 
  Globe, 
  Smartphone, 
  Check, 
  Copy, 
  Download, 
  Layers, 
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../lib/i18n';
import { cn } from '../lib/utils';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function DeployGuideModal({
  isOpen,
  onClose,
  language
}: DeployGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'vercel' | 'cloudrun' | 'static' | 'pwa'>('vercel');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const t = translations[language];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Rocket size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {t.deployTitle}
              </h2>
              <p className="text-xs text-slate-300">
                {language === 'am' 
                  ? 'የኢትዮጵያ 2016 ስርዓተ-ትምህርት ፕላነር መተግበሪያን በነፃ ድረ-ገጾች እና ክላውድ ላይ የማሰማራት አማራጮች' 
                  : language === 'en'
                  ? 'Production deployment options for Ethiopian 2016 Curriculum Lesson Planner'
                  : 'Filannoowwan gadi dhiisa appilikeeshinii karoora barsiisotaa kana'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 p-2 border-b border-gray-200 flex flex-wrap gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('vercel')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer",
              activeTab === 'vercel'
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            )}
          >
            <Globe size={15} className="text-indigo-600" />
            <span>Vercel & Netlify (Free Hosting)</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer",
              activeTab === 'pwa'
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            )}
          >
            <Smartphone size={15} className="text-emerald-600" />
            <span>Offline PWA (School Tablets & Phones)</span>
          </button>

          <button
            onClick={() => setActiveTab('cloudrun')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer",
              activeTab === 'cloudrun'
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            )}
          >
            <Cloud size={15} className="text-blue-600" />
            <span>Google Cloud Run / AI Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('static')}
            className={cn(
              "px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer",
              activeTab === 'static'
                ? "bg-white text-indigo-700 shadow-xs font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            )}
          >
            <Terminal size={15} className="text-gray-700" />
            <span>Static Build (GitHub Pages / ZIP)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700">
          
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-xl">
                <h3 className="font-bold text-sm text-indigo-950 mb-1 flex items-center gap-2">
                  <Zap size={16} className="text-indigo-600" />
                  {language === 'am' ? 'በ Vercel ወይም Netlify ላይ በነፃ ማስተናገድ (ምርጥ አማራጭ)' : language === 'en' ? 'Fastest & Recommended: 1-Click Free Hosting on Vercel / Netlify' : 'Filannoo Salphaa fi Bilisaa: Vercel ykn Netlify irratti Gadi Dhiisuu'}
                </h3>
                <p className="text-indigo-900 text-xs leading-relaxed">
                  {language === 'am' 
                    ? 'አፕሊኬሽኑ በንጹህ Vite + React የተገነባ በመሆኑ ያለምንም ወጪ በVercel ወይም Netlify ላይ በቀጥታ ይሰራል፤ HTTPS እና ቋሚ ዶሜይን በነፃ ይሰጣል።'
                    : language === 'en'
                    ? 'Since this is a lightning-fast Vite + React SPA with Service Worker offline caching, it compiles to pure static HTML/JS/CSS assets ready for immediate zero-config hosting with free custom domains and HTTPS.'
                    : 'Appilikeeshiniin kun Vite + React waan ta\'eef, kaffaltii tokko malee Vercel ykn Netlify irratti daqiiqaa muraasa keessatti banamuu danda\'a.'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                  {language === 'am' ? 'ደረጃዎች' : language === 'en' ? 'Step-by-Step Instructions' : 'Tarkaanfiiwwan'}
                </h4>

                <div className="border border-gray-200 rounded-xl p-3.5 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">1. Build the production package locally or in GitHub</span>
                    <button
                      onClick={() => handleCopy('npm run build', 1)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-white px-2 py-1 rounded border border-gray-200"
                    >
                      {copiedIndex === 1 ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedIndex === 1 ? 'Copied' : 'Copy command'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                    npm run build
                  </pre>
                  <p className="text-gray-500 text-[11px]">
                    This outputs optimized static assets directly into the <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">dist/</code> directory.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-3.5 bg-white space-y-2">
                  <span className="font-bold text-gray-900 block">2. Configure Vercel / Netlify Project Settings:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 block font-medium">Build Command:</span>
                      <strong className="font-mono text-indigo-700 font-bold">npm run build</strong>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-gray-200">
                      <span className="text-gray-500 block font-medium">Output Directory:</span>
                      <strong className="font-mono text-emerald-700 font-bold">dist</strong>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-3.5 bg-white space-y-2">
                  <span className="font-bold text-gray-900 block">3. Deploy via Vercel CLI (Optional):</span>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Run in your terminal:</span>
                    <button
                      onClick={() => handleCopy('npx vercel --prod', 2)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-slate-50 px-2 py-1 rounded border border-gray-200"
                    >
                      {copiedIndex === 2 ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copiedIndex === 2 ? 'Copied' : 'Copy command'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                    npx vercel --prod
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl">
                <h3 className="font-bold text-sm text-emerald-950 mb-1 flex items-center gap-2">
                  <Smartphone size={16} className="text-emerald-700" />
                  {language === 'am' ? 'ከመስመር ውጭ (Offline) በትምህርት ቤት ታብሌቶችና ስልኮች ላይ መጫን' : language === 'en' ? 'Zero-Internet Offline Installation (PWAs for Remote Schools)' : 'Intarneetii Malee (Offline) Moobaayilii fi Taableetii Barsiisotaarratti Fe\'uu'}
                </h3>
                <p className="text-emerald-900 text-xs leading-relaxed">
                  {language === 'am'
                    ? 'አፕሊኬሽኑ ሙሉ የService Worker እና PWA ድጋፍ አለው። አንዴ በስልክ ወይም በኮምፒውተር ከከፈቱት በኋላ የኢንተርኔት ግንኙነት ባይኖርም እንኳን ሳምንታዊና ዕለታዊ ፕላን ማዘጋጀት፣ ማረም እና ማስቀመጥ ይችላሉ።'
                    : language === 'en'
                    ? 'This app includes an offline Service Worker and web app manifest. Teachers in remote areas without stable internet connection can install it as a standalone app on Android, iOS, Windows, or Mac and plan lessons completely offline.'
                    : 'Appilikeeshiniin kun Service Worker fi PWA of keessaa waan qabuuf, barsiisonni iddoo intarneetiin hin jirreettillee utuu intarneetii hin fayyadamin guutummaatti itti fayyadamuu danda\'u.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
                  <span className="font-bold text-gray-900 block flex items-center gap-1.5 text-xs">
                    <ShieldCheck size={15} className="text-emerald-600" />
                    How Teachers Install It:
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-gray-600">
                    <li>Open the deployed URL in Chrome, Edge, Safari, or Samsung Internet.</li>
                    <li>Click the <strong>"📲 Install / Fe'i"</strong> button in the top navigation bar.</li>
                    <li>Or tap your browser's menu (⋮) and select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.</li>
                    <li>The app icon will be added to your device home screen and works 100% offline!</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
                  <span className="font-bold text-gray-900 block flex items-center gap-1.5 text-xs">
                    <Zap size={15} className="text-indigo-600" />
                    Offline Data Safety:
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-gray-600">
                    <li>All annual and daily plans are saved locally in browser storage (<code className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">localStorage</code>).</li>
                    <li>Curriculum datasets and textbook catalogs are precached in CacheStorage.</li>
                    <li>Teachers can export CSV backups anytime using the <strong>"Export"</strong> button.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cloudrun' && (
            <div className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl">
                <h3 className="font-bold text-sm text-blue-950 mb-1 flex items-center gap-2">
                  <Cloud size={16} className="text-blue-600" />
                  {language === 'am' ? 'በ Google Cloud Run ላይ ማሰማራት' : language === 'en' ? 'Deploy to Google Cloud Run Container' : 'Google Cloud Run irratti Gadi Dhiisuu'}
                </h3>
                <p className="text-blue-900 text-xs leading-relaxed">
                  In Google AI Studio Build, you can directly click the <strong>Deploy to Cloud Run</strong> button in the top right menu to containerize and publish your application on Google Cloud.
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-3.5 bg-slate-50 space-y-2">
                <span className="font-bold text-gray-900 block">Deploy via Google Cloud CLI (gcloud):</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Deploy command:</span>
                  <button
                    onClick={() => handleCopy('gcloud run deploy ethiopian-curriculum-planner --source . --port 3000 --allow-unauthenticated', 3)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-white px-2 py-1 rounded border border-gray-200"
                  >
                    {copiedIndex === 3 ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedIndex === 3 ? 'Copied' : 'Copy command'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                  gcloud run deploy ethiopian-curriculum-planner --source . --port 3000 --allow-unauthenticated
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'static' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-gray-200 p-4 rounded-xl">
                <h3 className="font-bold text-sm text-gray-950 mb-1 flex items-center gap-2">
                  <Terminal size={16} className="text-gray-700" />
                  {language === 'am' ? 'የኮድ ኤክስፖርት (Export to ZIP / GitHub)' : language === 'en' ? 'GitHub Pages or Download as ZIP' : 'Koodii Buusuu (ZIP / GitHub)'}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  You can export the entire repository from Google AI Studio settings by clicking <strong>Export to GitHub</strong> or <strong>Download ZIP</strong>.
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-3.5 bg-white space-y-3">
                <span className="font-bold text-gray-900 block">Hosting on GitHub Pages:</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Deploy using gh-pages:</span>
                  <button
                    onClick={() => handleCopy('npm run build && npx gh-pages -d dist', 4)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-slate-50 px-2 py-1 rounded border border-gray-200"
                  >
                    {copiedIndex === 4 ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedIndex === 4 ? 'Copied' : 'Copy command'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                  npm run build && npx gh-pages -d dist
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Production Ready · Offline PWA Supported · 2016 Curriculum</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-2xs"
          >
            {t.cancel}
          </button>
        </div>

      </div>
    </div>
  );
}
