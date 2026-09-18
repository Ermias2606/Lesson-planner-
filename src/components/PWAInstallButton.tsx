import React, { useState } from 'react';
import { Download, Smartphone, X, Check, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';

interface PWAInstallButtonProps {
  language: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed as standalone app, suppress
  if (isInstalled) {
    return null;
  }

  const translations = {
    om: {
      installBtn: 'Appii Fe\'i (Install)',
      iosBtn: 'iPhone / iPad irratti Fe\'i',
      iosTitle: 'iPhone / iPad irratti Fe\'uu',
      step1: '1. Mallattoo "Share" (Qooodi) Safari keessatti tuqaa.',
      step2: '2. Gad bu\'uun "Add to Home Screen" filadhaa.',
      close: 'Cufi'
    },
    am: {
      installBtn: 'አፕሊኬሽኑን ጫን (Install)',
      iosBtn: 'በiPhone / iPad ላይ ጫን',
      iosTitle: 'በiPhone / iPad ላይ መጫኛ',
      step1: '1. በSafari ታችኛ ክፍል ያለውን "Share" (አጋራ) ምልክት ይጫኑ።',
      step2: '2. ወደ ታች ዝቅ ብለው "Add to Home Screen" የሚለውን ይምረጡ።',
      close: 'ዝጋ'
    },
    en: {
      installBtn: 'Install App (Offline)',
      iosBtn: 'Install on iOS',
      iosTitle: 'Install on iPhone / iPad',
      step1: '1. Tap the Share button in the Safari toolbar.',
      step2: '2. Scroll down and select "Add to Home Screen".',
      close: 'Close'
    }
  };

  const t = translations[language];

  // Chrome / Android / Edge desktop & mobile flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
        title={t.installBtn}
      >
        <Download size={14} />
        <span className="hidden sm:inline">{t.installBtn}</span>
        <span className="sm:hidden">Install</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Smartphone size={14} />
          <span className="hidden sm:inline">{t.iosBtn}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Smartphone size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{t.iosTitle}</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-md"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-gray-600">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-gray-100">
                  <Share2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                  <span>{t.step1}</span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-gray-100">
                  <PlusSquare size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                  <span>{t.step2}</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
