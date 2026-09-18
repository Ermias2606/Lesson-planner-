import { CurriculumWeek, SchoolInfo, Language, DailyPlan } from '../types';
import { translations } from './i18n';

/**
 * Universal safe file downloader for browser and iframe environments.
 * Prevents premature URL.revokeObjectURL bugs that cancel downloads in Chrome/Safari.
 */
export function downloadBlob(content: string, fileName: string, contentType: string) {
  try {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Defer revocation so browser has time to initiate the streaming download
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    }, 4000);
  } catch (err) {
    console.error('Blob download failed, attempting data URI fallback:', err);
    try {
      const encodedUri = encodeURI(`data:${contentType},` + content);
      const link = document.createElement('a');
      link.href = encodedUri;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 2000);
    } catch (fallbackErr) {
      console.error('Data URI download failed:', fallbackErr);
    }
  }
}

// -------------------------------------------------------------
// CSV EXPORT (UTF-8 BOM for full Ge'ez & Afaan Oromo compatibility)
// -------------------------------------------------------------

export function exportCurriculumToCSV(
  curriculum: CurriculumWeek[], 
  schoolInfo: SchoolInfo, 
  lang: Language
) {
  const t = translations[lang];

  const rows: string[][] = [
    [schoolInfo.schoolName[lang]],
    [`${t.academicYear}: ${schoolInfo.academicYear[lang]}`, `${t.subject}: ${schoolInfo.subject[lang]}`, `${t.gradeAndSection}: ${schoolInfo.gradeAndSection[lang]}`],
    [`${t.teacherName}: ${schoolInfo.teacherName[lang]}`, `${t.annualDays}: ${schoolInfo.annualDays}`, `${t.annualPeriods}: ${schoolInfo.annualPeriods}`, `${t.weeklyPeriods}: ${schoolInfo.weeklyPeriods}`],
    [],
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

  rows.push([]);
  rows.push([t.signaturesTitle]);
  rows.push([
    `${t.teacherName}: ${schoolInfo.teacherName[lang]} (${t.signature}: _________)`,
    `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]} (${t.signature}: _________)`,
    `${t.principal}: ${schoolInfo.principalName[lang]} (${t.signature}: _________)`
  ]);

  const csvContent = '\uFEFF' + rows.map(row => 
    row.map(cell => `"${(cell || '').toString().replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`).join(',')
  ).join('\r\n');

  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${schoolInfo.subject[lang].replace(/\s+/g, '_')}_${lang.toUpperCase()}.csv`;
  downloadBlob(csvContent, fileName, 'text/csv;charset=utf-8;');
}

export function exportDailyPlanToCSV(
  dailyPlan: DailyPlan,
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  const rows: string[][] = [
    [schoolInfo.schoolName[lang]],
    [`${t.dailyView}: ${dailyPlan.date}`, `${t.academicYear}: ${schoolInfo.academicYear[lang]}`, `${t.gradeAndSection}: ${schoolInfo.gradeAndSection[lang]}`],
    [`${t.teacherName}: ${schoolInfo.teacherName[lang]}`, `${t.subject}: ${schoolInfo.subject[lang]}`],
    [],
    [
      t.period,
      t.time,
      t.chapter,
      t.mainTopic,
      t.pages,
      t.objectives,
      t.priorKnowledge,
      t.fivePhaseLesson,
      t.materials,
      t.assessment
    ]
  ];

  dailyPlan.lessons.forEach((lesson, index) => {
    rows.push([
      `Period ${index + 1}`,
      `${lesson.timeStart} - ${lesson.timeEnd}`,
      lesson.chapter || schoolInfo.subject[lang],
      lesson.mainTopic || '',
      lesson.studentBookPages || '',
      lesson.objectives || '',
      lesson.priorKnowledge || '',
      lesson.activities || lesson.teacherGuideSteps || lesson.methodology || '',
      lesson.materials || '',
      lesson.assessment || ''
    ]);
  });

  if (dailyPlan.notes) {
    rows.push([]);
    rows.push([t.notesTitle, dailyPlan.notes]);
  }

  rows.push([]);
  rows.push([
    `${t.teacherName}: ${schoolInfo.teacherName[lang]} (Date: ${dailyPlan.date})`,
    `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]} (Approved: ______)`
  ]);

  const csvContent = '\uFEFF' + rows.map(row => 
    row.map(cell => `"${(cell || '').toString().replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`).join(',')
  ).join('\r\n');

  const fileName = `Karoora_Guyyaa_${dailyPlan.date}_${lang.toUpperCase()}.csv`;
  downloadBlob(csvContent, fileName, 'text/csv;charset=utf-8;');
}

// -------------------------------------------------------------
// MICROSOFT WORD (.doc / HTML XML) EXPORT
// -------------------------------------------------------------

export function exportCurriculumToWord(
  curriculum: CurriculumWeek[], 
  schoolInfo: SchoolInfo, 
  lang: Language
) {
  const t = translations[lang];

  const bureauTitle = lang === 'am' 
    ? 'የኦሮሚያ ክልላዊ መንግሥት · የትምህርት ቢሮ (OEB)'
    : lang === 'en'
    ? 'OROMIA REGIONAL STATE · EDUCATION BUREAU (OEB)'
    : 'MOOTUMMAA NAANNOO OROMIYAA · BIIROO BARNOOTAA OROMIYAA';

  let tableRows = '';
  curriculum.forEach((item) => {
    const bgStyle = item.isExamWeek ? 'background-color: #fef3c7; font-weight: bold;' : '';
    tableRows += `
      <tr style="${bgStyle}">
        <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${escapeHtml(item.monthName[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${item.weekNumber}</td>
        <td style="border: 1pt solid #000; padding: 4pt; text-align: center; white-space: nowrap;">${escapeHtml(item.dateRange)}</td>
        <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${escapeHtml(item.pages)}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.chapter[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt; font-weight: bold;">${escapeHtml(item.mainTopic[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.generalObjectives[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.priorKnowledge[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.lessonOutcome[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.teachingMethod[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.teachingAids[lang])}</td>
        <td style="border: 1pt solid #000; padding: 4pt;">${escapeHtml(item.assessment[lang])}</td>
      </tr>
    `;
  });

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${escapeHtml(schoolInfo.schoolName[lang])} - ${escapeHtml(t.annualPlanTitle)}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page Section1 {
          size: 841.9pt 595.3pt; /* A4 Landscape in points */
          mso-page-orientation: landscape;
          margin: 28.35pt 28.35pt 28.35pt 28.35pt;
        }
        div.Section1 { page: Section1; }
        body { font-family: 'Calibri', 'Arial', 'Nyala', sans-serif; font-size: 9pt; color: #000000; }
        table { border-collapse: collapse; width: 100%; }
        th { border: 1pt solid #000; background-color: #f1f5f9; padding: 5pt; font-weight: bold; font-size: 8.5pt; text-align: center; }
        td { font-size: 8.5pt; }
        .inst-header { width: 100%; margin-bottom: 10pt; border-bottom: 2pt solid #000; padding-bottom: 6pt; }
        .meta-box { background-color: #f8fafc; border: 1pt solid #cbd5e1; padding: 6pt; margin-top: 6pt; }
        .signatures { margin-top: 18pt; width: 100%; }
      </style>
    </head>
    <body>
      <div class="Section1">
        <div class="inst-header">
          <table style="border: none; width: 100%;">
            <tr>
              <td style="border: none; vertical-align: top;">
                <div style="font-size: 9pt; font-weight: bold; color: #475569; text-transform: uppercase;">${escapeHtml(bureauTitle)}</div>
                <h1 style="font-size: 16pt; margin: 2pt 0; text-transform: uppercase; font-weight: 900;">${escapeHtml(schoolInfo.schoolName[lang])}</h1>
                <div style="font-size: 8.5pt; color: #64748b; font-style: italic;">${escapeHtml(t.curriculumFrameworkNotice)}</div>
              </td>
              <td style="border: none; vertical-align: top; text-align: right;">
                <div style="font-size: 13pt; font-weight: 900; text-transform: uppercase;">${escapeHtml(t.annualPlanTitle)}</div>
                <div style="font-size: 10pt; font-weight: bold; margin-top: 2pt;">${escapeHtml(schoolInfo.academicYear[lang])} · ${escapeHtml(schoolInfo.subject[lang])} (${escapeHtml(schoolInfo.gradeAndSection[lang])})</div>
              </td>
            </tr>
          </table>

          <div class="meta-box">
            <table style="border: none; width: 100%; font-size: 8.5pt;">
              <tr>
                <td style="border: none;"><strong>${escapeHtml(t.teacherName)}:</strong> ${escapeHtml(schoolInfo.teacherName[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.gradeAndSection)}:</strong> ${escapeHtml(schoolInfo.gradeAndSection[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.subject)}:</strong> ${escapeHtml(schoolInfo.subject[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.weeklyPeriods)}:</strong> ${escapeHtml(schoolInfo.weeklyPeriods)} (${escapeHtml(schoolInfo.periodDuration[lang])})</td>
              </tr>
              <tr>
                <td style="border: none;"><strong>${escapeHtml(t.annualPeriods)}:</strong> ${escapeHtml(schoolInfo.annualPeriods)} (${escapeHtml(schoolInfo.annualDays)})</td>
                <td style="border: none;"><strong>${escapeHtml(t.deptHead)}:</strong> ${escapeHtml(schoolInfo.departmentHeadName[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.principal)}:</strong> ${escapeHtml(schoolInfo.principalName[lang])}</td>
                <td style="border: none;"></td>
              </tr>
            </table>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 45pt;">${escapeHtml(t.month)}</th>
              <th style="width: 25pt;">${escapeHtml(t.week)}</th>
              <th style="width: 50pt;">${escapeHtml(t.date)}</th>
              <th style="width: 30pt;">${escapeHtml(t.pages)}</th>
              <th style="width: 60pt;">${escapeHtml(t.chapter)}</th>
              <th style="width: 110pt;">${escapeHtml(t.mainTopic)}</th>
              <th style="width: 120pt;">${escapeHtml(t.objectives)}</th>
              <th style="width: 90pt;">${escapeHtml(t.priorKnowledge)}</th>
              <th style="width: 90pt;">${escapeHtml(t.lessonOutcome)}</th>
              <th style="width: 80pt;">${escapeHtml(t.teachingMethod)}</th>
              <th style="width: 70pt;">${escapeHtml(t.materials)}</th>
              <th style="width: 80pt;">${escapeHtml(t.assessment)}</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <div class="signatures">
          <table style="border: none; width: 100%; border-top: 2pt solid #000; padding-top: 8pt;">
            <tr>
              <td style="border: 1pt solid #cbd5e1; padding: 6pt; width: 32%; background-color: #f8fafc;">
                <strong>${escapeHtml(t.teacherName).toUpperCase()}</strong><br/>
                ${escapeHtml(schoolInfo.teacherName[lang])}<br/><br/>
                ${escapeHtml(t.signature)}: ________________________<br/>
                ${escapeHtml(t.date)}: ____ / ____ / ${escapeHtml(schoolInfo.academicYear[lang])}
              </td>
              <td style="border: 1pt solid #cbd5e1; padding: 6pt; width: 32%; background-color: #f8fafc;">
                <strong>${escapeHtml(t.deptHead).toUpperCase()}</strong><br/>
                ${escapeHtml(schoolInfo.departmentHeadName[lang])}<br/><br/>
                ${escapeHtml(t.signature)}: ________________________<br/>
                ${escapeHtml(t.date)}: ____ / ____ / ${escapeHtml(schoolInfo.academicYear[lang])}
              </td>
              <td style="border: 1pt solid #cbd5e1; padding: 6pt; width: 32%; background-color: #f8fafc;">
                <strong>${escapeHtml(t.principal).toUpperCase()}</strong><br/>
                ${escapeHtml(schoolInfo.principalName[lang])}<br/><br/>
                ${escapeHtml(t.signature)}: ________________________<br/>
                ${escapeHtml(t.date)}: ____ / ____ / ${escapeHtml(schoolInfo.academicYear[lang])}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;

  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${schoolInfo.subject[lang].replace(/\s+/g, '_')}_${lang.toUpperCase()}.doc`;
  downloadBlob(wordHtml, fileName, 'application/msword;charset=utf-8;');
}

export function exportDailyPlanToWord(
  dailyPlan: DailyPlan,
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  let lessonRows = '';
  dailyPlan.lessons.forEach((lesson, idx) => {
    lessonRows += `
      <tr>
        <td style="border: 1pt solid #000; padding: 6pt; text-align: center; vertical-align: top; width: 60pt;">
          <strong>Period ${idx + 1}</strong><br/>
          <span style="font-size: 8pt; color: #475569;">${lesson.timeStart} - ${lesson.timeEnd}</span><br/>
          <span style="font-size: 7.5pt; color: #64748b;">(${escapeHtml(t.duration45Min)})</span>
        </td>
        <td style="border: 1pt solid #000; padding: 6pt; vertical-align: top; width: 100pt;">
          <div style="font-size: 8pt; color: #3730a3; font-weight: bold;">${escapeHtml(lesson.chapter || schoolInfo.subject[lang])}</div>
          <div style="font-size: 9pt; font-weight: bold; margin-top: 2pt;">${escapeHtml(lesson.mainTopic)}</div>
          <div style="font-size: 8pt; color: #1e293b; margin-top: 4pt;"><strong>${escapeHtml(t.pages)}:</strong> ${escapeHtml(lesson.studentBookPages || '')}</div>
          ${lesson.textbookExercises ? `<div style="font-size: 7.5pt; color: #475569;"><strong>${escapeHtml(t.textbookExercises)}:</strong> ${escapeHtml(lesson.textbookExercises)}</div>` : ''}
          ${lesson.teacherGuidePages ? `<div style="font-size: 7.5pt; color: #065f46;"><strong>${escapeHtml(t.teacherGuide)}:</strong> ${escapeHtml(lesson.teacherGuidePages)}</div>` : ''}
        </td>
        <td style="border: 1pt solid #000; padding: 6pt; vertical-align: top; width: 110pt;">
          <div>${escapeHtml(lesson.objectives)}</div>
          ${lesson.priorKnowledge ? `<div style="font-size: 8pt; color: #475569; margin-top: 4pt; border-top: 0.5pt solid #cbd5e1; padding-top: 2pt;"><strong>${escapeHtml(t.priorKnowledge)}:</strong> ${escapeHtml(lesson.priorKnowledge)}</div>` : ''}
        </td>
        <td style="border: 1pt solid #000; padding: 6pt; vertical-align: top;">
          <div style="white-space: pre-line; line-height: 1.4;">${escapeHtml(lesson.activities || lesson.teacherGuideSteps || lesson.methodology || '')}</div>
        </td>
        <td style="border: 1pt solid #000; padding: 6pt; vertical-align: top; width: 90pt;">
          <div><strong>${escapeHtml(t.materials)}:</strong><br/>${escapeHtml(lesson.materials || '')}</div>
          <div style="margin-top: 6pt; border-top: 0.5pt solid #cbd5e1; padding-top: 3pt;"><strong>${escapeHtml(t.assessment)}:</strong><br/>${escapeHtml(lesson.assessment || '')}</div>
        </td>
      </tr>
    `;
  });

  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${escapeHtml(t.dailyView)} - ${dailyPlan.date}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page Section1 {
          size: 595.3pt 841.9pt; /* A4 Portrait */
          margin: 28.35pt 28.35pt 28.35pt 28.35pt;
        }
        div.Section1 { page: Section1; }
        body { font-family: 'Calibri', 'Arial', 'Nyala', sans-serif; font-size: 9pt; color: #000000; }
        table { border-collapse: collapse; width: 100%; }
        th { border: 1pt solid #000; background-color: #f1f5f9; padding: 5pt; font-weight: bold; font-size: 8.5pt; text-align: center; }
        td { font-size: 8.5pt; }
      </style>
    </head>
    <body>
      <div class="Section1">
        <div style="border-bottom: 2pt solid #000; padding-bottom: 6pt; margin-bottom: 10pt;">
          <table style="border: none; width: 100%;">
            <tr>
              <td style="border: none;">
                <h1 style="font-size: 14pt; margin: 0; text-transform: uppercase;">${escapeHtml(schoolInfo.schoolName[lang])}</h1>
                <div style="font-size: 9pt; color: #475569;">${escapeHtml(t.curriculumFrameworkNotice)}</div>
              </td>
              <td style="border: none; text-align: right;">
                <div style="font-size: 12pt; font-weight: 900; text-transform: uppercase;">${escapeHtml(t.printDocumentDaily)}</div>
                <div style="font-size: 9pt; font-weight: bold;">${dailyPlan.date} (${escapeHtml(schoolInfo.academicYear[lang])})</div>
              </td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border: 1pt solid #cbd5e1; padding: 6pt; margin-top: 6pt;">
            <table style="border: none; width: 100%; font-size: 8.5pt;">
              <tr>
                <td style="border: none;"><strong>${escapeHtml(t.teacherName)}:</strong> ${escapeHtml(schoolInfo.teacherName[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.gradeAndSection)}:</strong> ${escapeHtml(schoolInfo.gradeAndSection[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.subject)}:</strong> ${escapeHtml(schoolInfo.subject[lang])}</td>
                <td style="border: none;"><strong>${escapeHtml(t.deptHead)}:</strong> ${escapeHtml(schoolInfo.departmentHeadName[lang])}</td>
              </tr>
            </table>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>${escapeHtml(t.period)}</th>
              <th>${escapeHtml(t.chapter)} & ${escapeHtml(t.mainTopic)}</th>
              <th>${escapeHtml(t.objectives)}</th>
              <th>${escapeHtml(t.fivePhaseLesson)}</th>
              <th>${escapeHtml(t.materials)} & ${escapeHtml(t.assessment)}</th>
            </tr>
          </thead>
          <tbody>
            ${lessonRows}
            ${dailyPlan.notes ? `
              <tr>
                <td style="border: 1pt solid #000; padding: 6pt; font-weight: bold; background-color: #f8fafc;">${escapeHtml(t.notesTitle)}</td>
                <td colspan="4" style="border: 1pt solid #000; padding: 6pt;">${escapeHtml(dailyPlan.notes)}</td>
              </tr>
            ` : ''}
          </tbody>
        </table>

        <div style="margin-top: 20pt; border-top: 1.5pt solid #000; padding-top: 8pt;">
          <table style="border: none; width: 100%;">
            <tr>
              <td style="border: none; width: 50%;">
                <strong>${escapeHtml(t.teacherName)}:</strong> ${escapeHtml(schoolInfo.teacherName[lang])}<br/><br/>
                ${escapeHtml(t.signature)}: ___________________________ (Date: ${dailyPlan.date})
              </td>
              <td style="border: none; width: 50%;">
                <strong>${escapeHtml(t.deptHead)}:</strong> ${escapeHtml(schoolInfo.departmentHeadName[lang])}<br/><br/>
                Approval Signature: ___________________________ (Date: ____/____/${escapeHtml(schoolInfo.academicYear[lang])})
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;

  const fileName = `Karoora_Guyyaa_${dailyPlan.date}_${lang.toUpperCase()}.doc`;
  downloadBlob(wordHtml, fileName, 'application/msword;charset=utf-8;');
}

// -------------------------------------------------------------
// EXCEL (.xls XML HTML) EXPORT
// -------------------------------------------------------------

export function exportCurriculumToExcel(
  curriculum: CurriculumWeek[],
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  let rowsHtml = '';
  curriculum.forEach(item => {
    rowsHtml += `
      <tr>
        <td style="border: 0.5pt solid #000; text-align: center; font-weight: bold;">${escapeHtml(item.monthName[lang])}</td>
        <td style="border: 0.5pt solid #000; text-align: center;">W${item.weekNumber}</td>
        <td style="border: 0.5pt solid #000; text-align: center;">${escapeHtml(item.dateRange)}</td>
        <td style="border: 0.5pt solid #000; text-align: center;">${escapeHtml(item.pages)}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.chapter[lang])}</td>
        <td style="border: 0.5pt solid #000; font-weight: bold;">${escapeHtml(item.mainTopic[lang])}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.generalObjectives[lang])}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.priorKnowledge[lang])}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.lessonOutcome[lang])}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.teachingMethod[lang])}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.teachingAids[lang])}</td>
        <td style="border: 0.5pt solid #000;">${escapeHtml(item.assessment[lang])}</td>
      </tr>
    `;
  });

  const excelHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>AnnualPlan</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        table { border-collapse: collapse; }
        th { background-color: #e2e8f0; font-weight: bold; border: 0.5pt solid #000000; padding: 4pt; }
        td { border: 0.5pt solid #000000; padding: 3pt; font-family: Arial, sans-serif; font-size: 9pt; }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <th colspan="12" style="font-size: 14pt; background-color: #ffffff; text-align: left;">${escapeHtml(schoolInfo.schoolName[lang])} - ${escapeHtml(t.annualPlanTitle)} (${escapeHtml(schoolInfo.academicYear[lang])})</th>
        </tr>
        <tr>
          <td colspan="4"><strong>${escapeHtml(t.teacherName)}:</strong> ${escapeHtml(schoolInfo.teacherName[lang])}</td>
          <td colspan="4"><strong>${escapeHtml(t.gradeAndSection)}:</strong> ${escapeHtml(schoolInfo.gradeAndSection[lang])}</td>
          <td colspan="4"><strong>${escapeHtml(t.subject)}:</strong> ${escapeHtml(schoolInfo.subject[lang])}</td>
        </tr>
        <tr>
          <th style="width: 60pt;">${escapeHtml(t.month)}</th>
          <th style="width: 35pt;">${escapeHtml(t.week)}</th>
          <th style="width: 60pt;">${escapeHtml(t.date)}</th>
          <th style="width: 40pt;">${escapeHtml(t.pages)}</th>
          <th style="width: 80pt;">${escapeHtml(t.chapter)}</th>
          <th style="width: 140pt;">${escapeHtml(t.mainTopic)}</th>
          <th style="width: 150pt;">${escapeHtml(t.objectives)}</th>
          <th style="width: 110pt;">${escapeHtml(t.priorKnowledge)}</th>
          <th style="width: 110pt;">${escapeHtml(t.lessonOutcome)}</th>
          <th style="width: 100pt;">${escapeHtml(t.teachingMethod)}</th>
          <th style="width: 90pt;">${escapeHtml(t.materials)}</th>
          <th style="width: 100pt;">${escapeHtml(t.assessment)}</th>
        </tr>
        ${rowsHtml}
      </table>
    </body>
    </html>
  `;

  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${schoolInfo.subject[lang].replace(/\s+/g, '_')}_${lang.toUpperCase()}.xls`;
  downloadBlob(excelHtml, fileName, 'application/vnd.ms-excel;charset=utf-8;');
}

// -------------------------------------------------------------
// STANDALONE OFFLINE HTML DOCUMENT EXPORT
// -------------------------------------------------------------

export function exportCurriculumToHtml(
  curriculum: CurriculumWeek[],
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  let rowsHtml = '';
  curriculum.forEach(item => {
    rowsHtml += `
      <tr class="${item.isExamWeek ? 'exam-row' : ''}">
        <td class="text-center font-bold">${escapeHtml(item.monthName[lang])}</td>
        <td class="text-center">${item.weekNumber}</td>
        <td class="text-center whitespace-nowrap">${escapeHtml(item.dateRange)}</td>
        <td class="text-center font-bold">${escapeHtml(item.pages)}</td>
        <td>${escapeHtml(item.chapter[lang])}</td>
        <td class="font-bold">${escapeHtml(item.mainTopic[lang])}</td>
        <td>${escapeHtml(item.generalObjectives[lang])}</td>
        <td>${escapeHtml(item.priorKnowledge[lang])}</td>
        <td>${escapeHtml(item.lessonOutcome[lang])}</td>
        <td>${escapeHtml(item.teachingMethod[lang])}</td>
        <td>${escapeHtml(item.teachingAids[lang])}</td>
        <td>${escapeHtml(item.assessment[lang])}</td>
      </tr>
    `;
  });

  const fullHtml = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(schoolInfo.schoolName[lang])} - ${escapeHtml(t.annualPlanTitle)}</title>
  <style>
    @page { size: A4 landscape; margin: 8mm 6mm; }
    body { font-family: system-ui, -apple-system, sans-serif; font-size: 9pt; color: #000; margin: 0; padding: 12px; background: #fff; }
    .no-print { margin-bottom: 12px; display: flex; gap: 8px; justify-content: flex-end; }
    button { background: #4f46e5; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; }
    table { border-collapse: collapse; width: 100%; font-size: 8.5pt; }
    th, td { border: 1px solid #000; padding: 4px; vertical-align: top; }
    th { background: #f1f5f9; font-weight: bold; text-align: center; }
    .exam-row { background: #fef3c7; }
    .text-center { text-align: center; }
    .font-bold { font-weight: bold; }
    .whitespace-nowrap { white-space: nowrap; }
    thead { display: table-header-group; }
    tfoot { display: table-footer-group; }
    tr { page-break-inside: avoid; }
    @media print { .no-print { display: none !important; } }
  </style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.print()">🖨️ ${escapeHtml(t.printPdf)}</button>
  </div>
  <table>
    <thead>
      <tr>
        <th colspan="12" style="text-align: left; background: #fff; border: 1px solid #000; padding: 8px;">
          <div style="font-size: 14pt; font-weight: 900; text-transform: uppercase;">${escapeHtml(schoolInfo.schoolName[lang])}</div>
          <div style="font-size: 10pt; font-weight: bold; margin-top: 2px;">${escapeHtml(t.annualPlanTitle)} · ${escapeHtml(schoolInfo.academicYear[lang])} · ${escapeHtml(schoolInfo.subject[lang])} (${escapeHtml(schoolInfo.gradeAndSection[lang])})</div>
          <div style="margin-top: 4px; font-size: 8pt; display: flex; gap: 16px; background: #f8fafc; padding: 4px; border: 1px solid #e2e8f0;">
            <span><strong>${escapeHtml(t.teacherName)}:</strong> ${escapeHtml(schoolInfo.teacherName[lang])}</span>
            <span><strong>${escapeHtml(t.weeklyPeriods)}:</strong> ${escapeHtml(schoolInfo.weeklyPeriods)} (${escapeHtml(schoolInfo.periodDuration[lang])})</span>
            <span><strong>${escapeHtml(t.annualPeriods)}:</strong> ${escapeHtml(schoolInfo.annualPeriods)}</span>
            <span><strong>${escapeHtml(t.deptHead)}:</strong> ${escapeHtml(schoolInfo.departmentHeadName[lang])}</span>
          </div>
        </th>
      </tr>
      <tr>
        <th>${escapeHtml(t.month)}</th>
        <th>${escapeHtml(t.week)}</th>
        <th>${escapeHtml(t.date)}</th>
        <th>${escapeHtml(t.pages)}</th>
        <th>${escapeHtml(t.chapter)}</th>
        <th>${escapeHtml(t.mainTopic)}</th>
        <th>${escapeHtml(t.objectives)}</th>
        <th>${escapeHtml(t.priorKnowledge)}</th>
        <th>${escapeHtml(t.lessonOutcome)}</th>
        <th>${escapeHtml(t.teachingMethod)}</th>
        <th>${escapeHtml(t.materials)}</th>
        <th>${escapeHtml(t.assessment)}</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="12" style="padding: 4px; font-size: 8pt; background: #fff;">
          <strong>Curriculum Standard:</strong> ${escapeHtml(t.curriculumFrameworkNotice)} | <strong>Teacher Signature:</strong> ___________________ | <strong>Date:</strong> ____/____/${escapeHtml(schoolInfo.academicYear[lang])}
        </td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`;

  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${lang.toUpperCase()}.html`;
  downloadBlob(fullHtml, fileName, 'text/html;charset=utf-8;');
}

// -------------------------------------------------------------
// CLEAN ISOLATED PRINT WINDOW (Solves iframe restriction issues)
// -------------------------------------------------------------

export function openPrintWindow(printableElementHtml: string, title: string) {
  try {
    const printWindow = window.open('', '_blank', 'width=1100,height=800,menubar=no,toolbar=no,location=no');
    if (!printWindow) {
      // If popup was blocked by browser
      window.print();
      return false;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(title)}</title>
        <style>
          @page { size: A4 landscape; margin: 8mm 6mm; }
          body { font-family: system-ui, -apple-system, sans-serif; font-size: 9pt; color: #000; margin: 0; padding: 10px; background: #fff; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #000; padding: 4px; }
          thead { display: table-header-group !important; }
          tfoot { display: table-footer-group !important; }
          tr { page-break-inside: avoid !important; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .print\\:hidden, .no-print { display: none !important; }
        </style>
      </head>
      <body>
        ${printableElementHtml}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.focus();
              window.print();
            }, 300);
          };
        <\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
    return true;
  } catch (err) {
    console.error('Failed to open print window, falling back to window.print():', err);
    window.print();
    return false;
  }
}

// -------------------------------------------------------------
// CLIPBOARD COPY HELPER
// -------------------------------------------------------------

export async function copyTableToClipboard(tableElement: HTMLElement): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.write) {
      const blobHtml = new Blob([tableElement.outerHTML], { type: 'text/html' });
      const blobPlain = new Blob([tableElement.innerText], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobPlain
      });
      await navigator.clipboard.write([item]);
      return true;
    } else {
      // Fallback
      await navigator.clipboard.writeText(tableElement.innerText);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write failed, using fallback copyText:', err);
    try {
      const textarea = document.createElement('textarea');
      textarea.value = tableElement.innerText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackErr) {
      console.error('All clipboard operations failed:', fallbackErr);
      return false;
    }
  }
}

export function exportCurriculumToJSON(curriculum: CurriculumWeek[], schoolInfo: SchoolInfo) {
  const data = {
    exportedAt: new Date().toISOString(),
    version: '2019-v1',
    schoolInfo,
    curriculum
  };
  const jsonContent = JSON.stringify(data, null, 2);
  const yearTag = (schoolInfo.academicYear.om || '2019').slice(0, 4);
  downloadBlob(jsonContent, `Karoora_Barnootaa_${yearTag}_Backup.json`, 'application/json');
}

export function exportDailyPlanToJSON(dailyPlan: DailyPlan, schoolInfo: SchoolInfo) {
  const data = {
    exportedAt: new Date().toISOString(),
    schoolInfo,
    dailyPlan
  };
  const jsonContent = JSON.stringify(data, null, 2);
  downloadBlob(jsonContent, `Karoora_Guyyaa_${dailyPlan.date}_Backup.json`, 'application/json');
}

function escapeHtml(str: string = ''): string {
  return (str || '')
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
