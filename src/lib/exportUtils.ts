import { CurriculumWeek, SchoolInfo, Language } from '../types';
import { translations } from './i18n';

export function exportCurriculumToCSV(
  curriculum: CurriculumWeek[], 
  schoolInfo: SchoolInfo, 
  lang: Language
) {
  const t = translations[lang];

  // Build CSV rows
  const rows: string[][] = [
    // Header block
    [schoolInfo.schoolName[lang]],
    [`${t.academicYear}: ${schoolInfo.academicYear[lang]}`, `${t.subject}: ${schoolInfo.subject[lang]}`, `${t.gradeAndSection}: ${schoolInfo.gradeAndSection[lang]}`],
    [`${t.teacherName}: ${schoolInfo.teacherName[lang]}`, `${t.annualDays}: ${schoolInfo.annualDays}`, `${t.annualPeriods}: ${schoolInfo.annualPeriods}`, `${t.weeklyPeriods}: ${schoolInfo.weeklyPeriods}`],
    [],
    // Table Columns
    [
      t.month,
      t.week,
      t.date,
      t.pages,
      t.chapter,
      t.mainTopic,
      t.objectives,
      t.priorKnowledge,
      t.lessonOutcome,
      t.teachingMethod,
      t.materials,
      t.assessment
    ]
  ];

  // Data rows
  curriculum.forEach((item) => {
    rows.push([
      item.monthName[lang] || '',
      `W${item.weekNumber}`,
      item.dateRange || '',
      item.pages || '',
      item.chapter[lang] || '',
      item.mainTopic[lang] || '',
      item.generalObjectives[lang] || '',
      item.priorKnowledge[lang] || '',
      item.lessonOutcome[lang] || '',
      item.teachingMethod[lang] || '',
      item.teachingAids[lang] || '',
      item.assessment[lang] || ''
    ]);
  });

  // Footer block for signatures
  rows.push([]);
  rows.push([t.signaturesTitle]);
  rows.push([
    `${t.teacherName}: ${schoolInfo.teacherName[lang]} (${t.signature}: _________)`,
    `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]} (${t.signature}: _________)`,
    `${t.principal}: ${schoolInfo.principalName[lang]} (${t.signature}: _________)`
  ]);

  // Convert to CSV string with proper escaping and UTF-8 BOM
  const csvContent = '\uFEFF' + rows.map(row => 
    row.map(cell => `"${(cell || '').toString().replace(/"/g, '""').replace(/\n/g, ' ')}"`).join(',')
  ).join('\r\n');

  const fileName = `Karoora_Barnootaa_2016_${lang.toUpperCase()}.csv`;
  downloadBlob(csvContent, fileName, 'text/csv;charset=utf-8;');
}

export function exportCurriculumToJSON(curriculum: CurriculumWeek[], schoolInfo: SchoolInfo) {
  const data = {
    exportedAt: new Date().toISOString(),
    version: '2016-v2',
    schoolInfo,
    curriculum
  };
  const jsonContent = JSON.stringify(data, null, 2);
  downloadBlob(jsonContent, 'Karoora_Barnootaa_2016_Backup.json', 'application/json');
}

export function downloadBlob(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
