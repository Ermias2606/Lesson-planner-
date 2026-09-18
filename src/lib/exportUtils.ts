import { CurriculumWeek, SchoolInfo, Language, DailyPlan } from '../types';
import { translations } from './i18n';
import * as XLSX from 'xlsx';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  PageOrientation,
  AlignmentType
} from 'docx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Universal safe file downloader for browser and iframe environments.
 * Supports Blobs (binary .docx, .xlsx, .pdf), Uint8Arrays, and text strings.
 * Prevents premature URL.revokeObjectURL bugs that cancel downloads in Chrome/Safari.
 */
export function downloadBlob(
  content: string | Blob | Uint8Array | ArrayBuffer, 
  fileName: string, 
  contentType: string
) {
  try {
    const blob = content instanceof Blob 
      ? content 
      : new Blob([content as any], { type: contentType });
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
    }, 5000);
  } catch (err) {
    console.error('Blob download failed, attempting data URI fallback:', err);
    try {
      if (typeof content === 'string') {
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
      }
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
    [`${t.deptHead}: ${schoolInfo.departmentHeadName[lang]}`, `${t.principal}: ${schoolInfo.principalName[lang]}`],
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
// GENUINE MICROSOFT WORD (.docx) EXPORT
// Native OpenXML binary format - opens cleanly in Word & Google Docs
// with ZERO "feature is not allowed" or Trust Center blocks.
// -------------------------------------------------------------

export async function exportCurriculumToWord(
  curriculum: CurriculumWeek[], 
  schoolInfo: SchoolInfo, 
  lang: Language
) {
  const t = translations[lang];

  const headers = [
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
  ];

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, size: 16 })],
        alignment: AlignmentType.CENTER
      })],
      shading: { fill: 'E2E8F0' }
    }))
  });

  const bodyRows = curriculum.map(item => new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.monthName[lang] || '', bold: true, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `W${item.weekNumber}`, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.dateRange || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.pages || '', bold: true, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.chapter[lang] || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.mainTopic[lang] || '', bold: true, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.generalObjectives[lang] || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.priorKnowledge[lang] || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.lessonOutcome[lang] || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.teachingMethod[lang] || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.teachingAids[lang] || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.assessment[lang] || '', size: 15 })] })] }),
    ]
  }));

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            orientation: PageOrientation.LANDSCAPE
          },
          margin: {
            top: 720,
            right: 720,
            bottom: 720,
            left: 720
          }
        }
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: schoolInfo.schoolName[lang] || 'School Name', bold: true, size: 28 })],
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({
          children: [new TextRun({ text: `${t.annualPlanTitle} · ${schoolInfo.academicYear[lang]} · ${schoolInfo.subject[lang]} (${schoolInfo.gradeAndSection[lang]})`, bold: true, size: 20 })],
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({
          children: [new TextRun({ text: `${t.teacherName}: ${schoolInfo.teacherName[lang]} | ${t.weeklyPeriods}: ${schoolInfo.weeklyPeriods} | ${t.deptHead}: ${schoolInfo.departmentHeadName[lang]} | ${t.principal}: ${schoolInfo.principalName[lang]}`, size: 16 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [headerRow, ...bodyRows]
        }),
        new Paragraph({
          children: [new TextRun({ text: `\n${t.teacherName}: ____________________  |  ${t.deptHead}: ____________________  |  ${t.principal}: ____________________`, bold: true, size: 16 })],
          spacing: { before: 300 }
        })
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${schoolInfo.subject[lang].replace(/\s+/g, '_')}_${lang.toUpperCase()}.docx`;
  downloadBlob(blob, fileName, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
}

export async function exportDailyPlanToWord(
  dailyPlan: DailyPlan,
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  const headers = [
    t.period,
    t.time,
    t.chapter,
    t.mainTopic,
    t.pages,
    t.objectives,
    t.priorKnowledge,
    t.activities,
    t.materials,
    t.assessment
  ];

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, size: 16 })],
        alignment: AlignmentType.CENTER
      })],
      shading: { fill: 'E2E8F0' }
    }))
  });

  const bodyRows = dailyPlan.lessons.map((lesson, idx) => new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `Period ${idx + 1}`, bold: true, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${lesson.timeStart} - ${lesson.timeEnd}`, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.chapter || schoolInfo.subject[lang], size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.mainTopic || '', bold: true, size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.studentBookPages || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.objectives || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.priorKnowledge || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.activities || lesson.teacherGuideSteps || lesson.methodology || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.materials || '', size: 15 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: lesson.assessment || '', size: 15 })] })] })
    ]
  }));

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            orientation: PageOrientation.LANDSCAPE
          },
          margin: {
            top: 720,
            right: 720,
            bottom: 720,
            left: 720
          }
        }
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: schoolInfo.schoolName[lang] || 'School Name', bold: true, size: 28 })],
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({
          children: [new TextRun({ text: `${t.dailyTitle} · ${dailyPlan.date} · ${schoolInfo.subject[lang]} (${schoolInfo.gradeAndSection[lang]})`, bold: true, size: 20 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [headerRow, ...bodyRows]
        }),
        ...(dailyPlan.notes ? [
          new Paragraph({
            children: [
              new TextRun({ text: `\n${t.notesTitle}: `, bold: true, size: 16 }),
              new TextRun({ text: dailyPlan.notes, size: 16 })
            ],
            spacing: { before: 200 }
          })
        ] : []),
        new Paragraph({
          children: [new TextRun({ text: `\n${t.teacherName}: ____________________  |  ${t.deptHead}: ____________________`, bold: true, size: 16 })],
          spacing: { before: 300 }
        })
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `Karoora_Guyyaa_${dailyPlan.date}_${lang.toUpperCase()}.docx`;
  downloadBlob(blob, fileName, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
}

// -------------------------------------------------------------
// GENUINE MICROSOFT EXCEL (.xlsx) EXPORT (SheetJS)
// Native OpenXML binary spreadsheet - opens cleanly in Excel,
// Google Sheets, and LibreOffice with ZERO format mismatch warnings.
// -------------------------------------------------------------

export function exportCurriculumToExcel(
  curriculum: CurriculumWeek[],
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  const data: (string | number)[][] = [
    [schoolInfo.schoolName[lang]],
    [`${t.annualPlanTitle} · ${schoolInfo.academicYear[lang]}`],
    [`${t.subject}: ${schoolInfo.subject[lang]}`, `${t.gradeAndSection}: ${schoolInfo.gradeAndSection[lang]}`],
    [
      `${t.teacherName}: ${schoolInfo.teacherName[lang]}`,
      `${t.weeklyPeriods}: ${schoolInfo.weeklyPeriods} (${schoolInfo.periodDuration[lang]})`,
      `${t.annualPeriods}: ${schoolInfo.annualPeriods} (${schoolInfo.annualDays})`,
      `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]}`,
      `${t.principal}: ${schoolInfo.principalName[lang]}`
    ],
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

  curriculum.forEach(item => {
    data.push([
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

  data.push([]);
  data.push([
    `${t.teacherName}: ${schoolInfo.teacherName[lang]} (Date: ____/____/${schoolInfo.academicYear[lang]})`,
    '',
    `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]} (Approved: ______)`,
    '',
    `${t.principal}: ${schoolInfo.principalName[lang]} (Verified: ______)`
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  worksheet['!cols'] = [
    { wch: 14 },
    { wch: 8 },
    { wch: 16 },
    { wch: 10 },
    { wch: 22 },
    { wch: 32 },
    { wch: 35 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 22 },
    { wch: 25 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Annual Curriculum');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${schoolInfo.subject[lang].replace(/\s+/g, '_')}_${lang.toUpperCase()}.xlsx`;

  downloadBlob(
    new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    fileName,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

export function exportDailyPlanToExcel(
  dailyPlan: DailyPlan,
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  const data: (string | number)[][] = [
    [schoolInfo.schoolName[lang]],
    [`${t.dailyTitle} · ${dailyPlan.date}`],
    [`${t.subject}: ${schoolInfo.subject[lang]}`, `${t.gradeAndSection}: ${schoolInfo.gradeAndSection[lang]}`],
    [`${t.teacherName}: ${schoolInfo.teacherName[lang]}`, `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]}`],
    [],
    [
      t.period,
      t.time,
      t.chapter,
      t.mainTopic,
      t.pages,
      t.objectives,
      t.priorKnowledge,
      t.activities,
      t.materials,
      t.assessment
    ]
  ];

  dailyPlan.lessons.forEach((lesson, index) => {
    data.push([
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
    data.push([]);
    data.push([t.notesTitle, dailyPlan.notes]);
  }

  data.push([]);
  data.push([
    `${t.teacherName}: ${schoolInfo.teacherName[lang]} (Date: ${dailyPlan.date})`,
    '',
    `${t.deptHead}: ${schoolInfo.departmentHeadName[lang]} (Approved: ______)`
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 16 },
    { wch: 20 },
    { wch: 30 },
    { wch: 12 },
    { wch: 30 },
    { wch: 25 },
    { wch: 35 },
    { wch: 25 },
    { wch: 25 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Plan');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileName = `Karoora_Guyyaa_${dailyPlan.date}_${lang.toUpperCase()}.xlsx`;

  downloadBlob(
    new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    fileName,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
}

// -------------------------------------------------------------
// GENUINE ADOBE PDF (.pdf) EXPORT (jsPDF & autoTable)
// Directly downloads authentic binary PDF files readable on all devices.
// -------------------------------------------------------------

export function exportCurriculumToPdf(
  curriculum: CurriculumWeek[],
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(schoolInfo.schoolName[lang] || 'School Name', 30, 30);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${t.annualPlanTitle} · ${schoolInfo.academicYear[lang]} · ${schoolInfo.subject[lang]} (${schoolInfo.gradeAndSection[lang]})`, 30, 45);
  doc.text(`${t.teacherName}: ${schoolInfo.teacherName[lang]}  |  ${t.weeklyPeriods}: ${schoolInfo.weeklyPeriods}  |  ${t.annualPeriods}: ${schoolInfo.annualPeriods}  |  ${t.deptHead}: ${schoolInfo.departmentHeadName[lang]}  |  ${t.principal}: ${schoolInfo.principalName[lang]}`, 30, 60);

  const head = [[
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
  ]];

  const body = curriculum.map(item => [
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

  autoTable(doc, {
    head: head,
    body: body,
    startY: 70,
    styles: {
      fontSize: 7,
      cellPadding: 3,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { top: 70, bottom: 40, left: 30, right: 30 },
    didDrawPage: () => {
      const pageNumber = doc.internal.pages.length - 1;
      doc.setFontSize(7);
      doc.setTextColor(120);
      doc.text(`${schoolInfo.schoolName[lang]} · ${schoolInfo.academicYear[lang]} · Page ${pageNumber}`, 30, 20);
      doc.text(`2019 A.L.I (2026/27) MoE/OEB Standard | Teacher: ${schoolInfo.teacherName[lang]} | Principal: ${schoolInfo.principalName[lang]}`, 30, doc.internal.pageSize.getHeight() - 15);
    }
  });

  const yearTag = (schoolInfo.academicYear[lang] || '2019').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15);
  const fileName = `Karoora_Barnootaa_${yearTag}_${schoolInfo.subject[lang].replace(/\s+/g, '_')}_${lang.toUpperCase()}.pdf`;
  doc.save(fileName);
}

export function exportDailyPlanToPdf(
  dailyPlan: DailyPlan,
  schoolInfo: SchoolInfo,
  lang: Language
) {
  const t = translations[lang];

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(schoolInfo.schoolName[lang] || 'School Name', 30, 30);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${t.dailyTitle} · ${dailyPlan.date} · ${schoolInfo.subject[lang]} (${schoolInfo.gradeAndSection[lang]})`, 30, 45);
  doc.text(`${t.teacherName}: ${schoolInfo.teacherName[lang]}  |  ${t.deptHead}: ${schoolInfo.departmentHeadName[lang]}`, 30, 60);

  const head = [[
    t.period,
    t.time,
    t.chapter,
    t.mainTopic,
    t.pages,
    t.objectives,
    t.priorKnowledge,
    t.activities,
    t.materials,
    t.assessment
  ]];

  const body = dailyPlan.lessons.map((lesson, idx) => [
    `Period ${idx + 1}`,
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

  autoTable(doc, {
    head: head,
    body: body,
    startY: 70,
    styles: {
      fontSize: 7.5,
      cellPadding: 4,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { top: 70, bottom: 40, left: 30, right: 30 },
    didDrawPage: () => {
      doc.setFontSize(7.5);
      doc.setTextColor(120);
      doc.text(`Daily Plan · Date: ${dailyPlan.date} · Teacher: ${schoolInfo.teacherName[lang]} · Dept Head: ${schoolInfo.departmentHeadName[lang]}`, 30, doc.internal.pageSize.getHeight() - 15);
    }
  });

  const fileName = `Karoora_Guyyaa_${dailyPlan.date}_${lang.toUpperCase()}.pdf`;
  doc.save(fileName);
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
    <button onclick="window.print()">Print Document</button>
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
// JSON BACKUP & RESTORE
// -------------------------------------------------------------

export function exportCurriculumToJSON(curriculum: CurriculumWeek[], schoolInfo: SchoolInfo) {
  const data = {
    exportDate: new Date().toISOString(),
    academicYear: schoolInfo.academicYear,
    schoolInfo,
    curriculum
  };
  const content = JSON.stringify(data, null, 2);
  const fileName = `Backup_Karoora_Barnootaa_${schoolInfo.academicYear.om || '2019'}.json`;
  downloadBlob(content, fileName, 'application/json;charset=utf-8;');
}

export function exportDailyPlanToJSON(dailyPlan: DailyPlan, schoolInfo: SchoolInfo) {
  const data = {
    exportDate: new Date().toISOString(),
    schoolInfo,
    dailyPlan
  };
  const content = JSON.stringify(data, null, 2);
  const fileName = `Backup_Karoora_Guyyaa_${dailyPlan.date}.json`;
  downloadBlob(content, fileName, 'application/json;charset=utf-8;');
}

// -------------------------------------------------------------
// CLIPBOARD HELPER
// -------------------------------------------------------------

export async function copyTableToClipboard(tableElement: HTMLElement): Promise<boolean> {
  try {
    const text = tableElement.innerText;
    const html = tableElement.outerHTML;

    if (navigator.clipboard && navigator.clipboard.write) {
      const blobText = new Blob([text], { type: 'text/plain' });
      const blobHtml = new Blob([html], { type: 'text/html' });
      const item = new ClipboardItem({
        'text/plain': blobText,
        'text/html': blobHtml
      });
      await navigator.clipboard.write([item]);
      return true;
    } else {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
