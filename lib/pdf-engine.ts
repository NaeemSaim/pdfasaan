import { PDFDocument, degrees } from 'pdf-lib';

/**
 * Merges multiple PDFs into one
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
}

/**
 * Rotates a PDF
 */
export const rotatePDF = async (bytes: Uint8Array, angle: number) => {
  const pdfDoc = await PDFDocument.load(bytes);
  const pages = pdfDoc.getPages();
  // The 'degrees' function MUST be imported from 'pdf-lib' above
  pages.forEach((page) => page.setRotation({ angle: angle, type: 'degrees' } as any));
  return await pdfDoc.save();
};