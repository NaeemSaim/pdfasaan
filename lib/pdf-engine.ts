// lib/pdf-engine.ts
import { PDFDocument, degrees } from 'pdf-lib'; 

export async function rotatePDF(bytes: Uint8Array, angle: number) {
  const pdfDoc = await PDFDocument.load(bytes);
  const pages = pdfDoc.getPages();
  
  // 2. Use the 'degrees' helper correctly
  pages.forEach((page) => {
    page.setRotation(degrees(angle));
  });

  return await pdfDoc.save();
};

export const rotatePDF = async (file: File, angle: number) => {
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);
  const pages = pdfDoc.getPages();
  pages.forEach((page) => page.setRotation(degrees(angle)));
  return await pdfDoc.save();
};