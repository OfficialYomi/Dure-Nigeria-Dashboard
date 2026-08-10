import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Project } from '../types';

export const generatePdfReport = async (
  project: Project | null,
  elementId: string
): Promise<void> => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fileName = project
    ? `FMOH_DURE_${project.code}_Report_${new Date().toISOString().split('T')[0]}.pdf`
    : `DURE_Nigeria_Command_Center_Portfolio_${new Date().toISOString().split('T')[0]}.pdf`;

  // Try HTML2Canvas visual capture first
  try {
    const targetElement = document.getElementById(elementId) || document.body;
    
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#020617',
      allowTaint: true,
      ignoreElements: (element) => {
        // Skip sticky action bars or interactive modals during screenshot
        return element.classList.contains('no-print');
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    if (scaledHeight <= pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, scaledHeight);
    } else {
      let position = 0;
      let heightLeft = scaledHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position -= pdfHeight;
        }
      }
    }

    pdf.save(fileName);
    return;
  } catch (canvasErr) {
    console.warn('Canvas export failed, generating native vector PDF report fallback...', canvasErr);
  }

  // Programmatic Vector PDF Fallback (guaranteed to succeed and download cleanly)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 15;

  // Header Banner
  doc.setFillColor(2, 6, 23); // Slate 950
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(6, 182, 212); // Cyan 500
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('DURE NIGERIA COMMAND CENTER', 14, yPos);

  yPos += 7;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text(
    project ? `PROJECT EXECUTIVE REPORT: ${project.name.toUpperCase()}` : 'NATIONAL HEALTH PLATFORMS & SURVEILLANCE MATRIX',
    14,
    yPos
  );

  yPos += 6;
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${currentDate} | Status: Official Health Ministry Briefing`, 14, yPos);

  yPos = 48;

  if (project) {
    // Project Metadata Box
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.setDrawColor(51, 65, 85);
    doc.roundedRect(14, yPos, pageWidth - 28, 38, 3, 3, 'FD');

    doc.setTextColor(56, 189, 248); // Sky 400
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`System Code: ${project.code}`, 18, yPos + 8);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Status: ${project.status} (${project.completionPercentage}% Complete)`, 100, yPos + 8);

    doc.setTextColor(226, 232, 240);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Coordinating Body: ${project.leadAgency || 'Federal Ministry of Health'}`, 18, yPos + 16);
    doc.text(`Target Deployment: ${project.targetAudience}`, 18, yPos + 23);
    doc.text(`Live URL: ${project.liveDemoUrl || 'N/A'}`, 18, yPos + 30);

    yPos += 45;

    // Executive Description
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', 14, yPos);

    yPos += 6;
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const splitDesc = doc.splitTextToSize(project.fullDescription, pageWidth - 28);
    doc.text(splitDesc, 14, yPos);

    yPos += splitDesc.length * 5 + 6;

    // Key Performance Indicators
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Performance Metrics', 14, yPos);

    yPos += 6;
    project.keyMetrics.forEach((m) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(14, yPos, pageWidth - 28, 12, 2, 2, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(m.label, 18, yPos + 8);

      doc.setTextColor(16, 185, 129); // Emerald 500
      doc.text(m.value, 110, yPos + 8);

      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text(m.change, 150, yPos + 8);

      yPos += 15;
    });

    yPos += 5;

    // Tech Stack
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Technology Architecture', 14, yPos);

    yPos += 6;
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Stack: ${project.techStack.join(' • ')}`, 14, yPos);

    yPos += 12;

    // Milestones Table
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Implementation Milestones & Roadmap', 14, yPos);

    yPos += 8;

    project.milestones.forEach((ms) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFillColor(15, 23, 42);
      doc.setDrawColor(51, 65, 85);
      doc.roundedRect(14, yPos, pageWidth - 28, 14, 2, 2, 'FD');

      doc.setTextColor(6, 182, 212);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`[${ms.quarter}] ${ms.title}`, 18, yPos + 6);

      doc.setTextColor(ms.status === 'Completed' ? 16 : 245, ms.status === 'Completed' ? 185 : 158, ms.status === 'Completed' ? 129 : 11);
      doc.setFontSize(8);
      doc.text(`${ms.status} ${ms.dateCompleted ? `(${ms.dateCompleted})` : ''}`, pageWidth - 50, yPos + 6);

      doc.setTextColor(203, 213, 225);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      const shortDesc = ms.description.length > 90 ? ms.description.substring(0, 87) + '...' : ms.description;
      doc.text(shortDesc, 18, yPos + 11);

      yPos += 17;
    });

  } else {
    // Portfolio Brief
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('National Health Command Center Overview', 14, yPos);

    yPos += 8;
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('This portfolio report synthesizes real-time status across 4 national health platforms:', 14, yPos);

    yPos += 10;
    const summaryList = [
      '1. NACA Command Center — National HIV & AIDS Data Ecosystem (100% Deployed)',
      '2. FMOH Multi Disease Platform — Nigeria Multi-Disease Situation Room (95% Deployed)',
      '3. CSS Dashboard — Community Systems Strengthening & Patient Experience (92% - Active Sprint)',
      '4. One Impact App — Community TB Monitoring & Stigma Reporting (96% Deployed)'
    ];

    summaryList.forEach((item) => {
      doc.text(item, 18, yPos);
      yPos += 7;
    });
  }

  // Footer Page Numbering
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${pageCount} | DURE Nigeria Health Intelligence Portal`, 14, doc.internal.pageSize.getHeight() - 10);
  }

  doc.save(fileName);
};
