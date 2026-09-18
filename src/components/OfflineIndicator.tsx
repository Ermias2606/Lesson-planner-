import React from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  const messages = {
    om: {
      title: 'Haala Toora Irraa Ala (Offline)',
      desc: 'Interneetii malee hojjachaa jirtu. Qabiyyeen hundi kuufamee jira.'
    },
    am: {
      title: 'ከመስመር ውጭ (Offline)',
      desc: 'ያለ ኢንተርኔት እየሰሩ ነው። ሁሉም ፕላኖች ተቀምጠዋል፤ በተሟላ ሁኔታ መጠቀም ይችላሉ።'
    },
    en: {
      title: 'Offline Mode Active',
      desc: 'Working without internet. All files and lesson plans are safely cached locally.'
    }
  };

  const text = messages[language];

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 text-white px-3.5 py-2.5 shadow-2xl border border-slate-700/60 backdrop-blur-md animate-in slide-in-from-bottom-2 duration-200 max-w-sm">
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <WifiOff size={16} />
      </div>
      <div className="text-xs">
        <div className="font-bold flex items-center gap-1.5 text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {text.title}
        </div>
        <div className="text-[11px] text-gray-300 leading-tight mt-0.5">
          {text.desc}
        </div>
      </div>
    </div>
  );
};
