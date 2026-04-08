// lib/pdf-engine.ts
import { PDFDocument, degrees } from 'pdf-lib';

export const mergePDFs = async (files: File[]) => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
};

export const rotatePDF = async (file: File, angle: number) => {
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);
  const pages = pdfDoc.getPages();
  pages.forEach((page) => page.setRotation(degrees(angle)));
  return await pdfDoc.save();
};