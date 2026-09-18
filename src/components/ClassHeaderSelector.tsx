import React from 'react';
import { Layers, ChevronDown, Plus, GraduationCap, Clock } from 'lucide-react';
import { Course, Language } from '../types';
import { translations } from '../lib/i18n';
import { cn } from '../lib/utils';

interface ClassHeaderSelectorProps {
  courses: Course[];
  activeCourseId: string;
  language: Language;
  onSelectCourse: (courseId: string) => void;
  onOpenClassManager: () => void;
}

export default function ClassHeaderSelector({
  courses,
  activeCourseId,
  language,
  onSelectCourse,
  onOpenClassManager
}: ClassHeaderSelectorProps) {
  const t = translations[language];
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      
      {/* Active Course Indicator and Switcher Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-indigo-50/80 text-indigo-700 text-xs font-bold shrink-0">
          <Layers size={14} />
          <span className="hidden md:inline">{t.activeClass}:</span>
        </div>

        {/* List of class pills for quick 1-click switching */}
        <div className="flex items-center gap-1.5 shrink-0">
          {courses.map((course) => {
            const isActive = course.id === activeCourseId;
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelectCourse(course.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border",
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : "bg-slate-50 hover:bg-slate-100 text-gray-700 border-gray-200 hover:border-gray-300"
                )}
                title={`${course.gradeName[language]} - ${course.subjectName[language]} (${course.section})`}
              >
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  isActive ? "bg-white" : "bg-indigo-400"
                )} />
                <span>{course.gradeName[language].replace(/Kutaa | ክፍል|Grade /gi, 'G')}</span>
                <span className="opacity-60">·</span>
                <span className="truncate max-w-[120px] sm:max-w-[160px]">{course.subjectName[language]}</span>
                <span className="text-[10px] font-normal opacity-80">({course.section})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons: Manage / Add */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={onOpenClassManager}
          className="px-3 py-1.5 rounded-lg border border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50 text-gray-700 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <Layers size={14} className="text-indigo-600" />
          <span>{t.manageClasses}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-gray-100 text-[10px] font-mono text-gray-600">
            {courses.length}
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenClassManager}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <Plus size={14} />
          <span>{t.addClass}</span>
        </button>
      </div>

    </div>
  );
}
