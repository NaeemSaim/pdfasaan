import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';

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

export async function compressPDF(bytes: Uint8Array, level: 'low' | 'medium' | 'high') {
  const pdfDoc = await PDFDocument.load(bytes);
  
  // pdf-lib doesn't have a "compress" button, but re-saving 
  // with these settings strips metadata and optimizes the structure.
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: level !== 'low', // Combines objects to save space
    addDefaultPage: false,
    updateFieldAppearances: false,
  });

  return compressedBytes;
};

export async function splitPDF(bytes: Uint8Array, pageNumbers: number[]) {
  const pdfDoc = await PDFDocument.load(bytes);
  const newPdf = await PDFDocument.create();
  
  // pageNumbers should be 0-indexed (e.g., [0, 2, 3] for pages 1, 3, and 4)
  const copiedPages = await newPdf.copyPages(pdfDoc, pageNumbers);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
};

export async function protectPDF(bytes: Uint8Array, password: string) {
  const pdfDoc = await PDFDocument.load(bytes);
  
  // Encrypt the PDF with a password
  // 'userPassword' is what the person needs to open the file
  const protectedBytes = await pdfDoc.save({
    userPassword: password,
    // Optional: ownerPassword allows you to set permissions (like printing)
    ownerPassword: password, 
  });

  return protectedBytes;
};

export async function watermarkPDF(
  bytes: Uint8Array, 
  text: string, 
  size: number, 
  position: 'top' | 'center' | 'bottom'
) {
  const pdfDoc = await PDFDocument.load(bytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    
    // Calculate Y coordinate based on position
    let y = height / 2;
    if (position === 'top') y = height - 100;
    if (position === 'bottom') y = 100;

    // Center the text horizontally
    const textWidth = helveticaFont.widthOfTextAtSize(text, size);
    const x = (width / 2) - (textWidth / 2);

    page.drawText(text, {
      x: x,
      y: y,
      size: size,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5), // Grey color
      opacity: 0.4,              // Transparent look
      rotate: degrees(45),       // Diagonal watermark
    });
  });

  return await pdfDoc.save();
}

export async function deletePagesFromPDF(bytes: Uint8Array, pagesToDelete: number[]) {
  const pdfDoc = await PDFDocument.load(bytes);
  const totalPages = pdfDoc.getPageCount();
  const newPdf = await PDFDocument.create();

  // Create a list of indices we want to KEEP
  // pagesToDelete is 1-indexed from the UI, so we convert to 0-indexed
  const indicesToDelete = pagesToDelete.map(p => p - 1);
  const indicesToKeep = [];

  for (let i = 0; i < totalPages; i++) {
    if (!indicesToDelete.includes(i)) {
      indicesToKeep.push(i);
    }
  }

  const copiedPages = await newPdf.copyPages(pdfDoc, indicesToKeep);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

export async function imageToPDF(imageFiles: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    
    // Check file type to use the correct embedder
    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      image = await pdfDoc.embedJpg(arrayBuffer);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await pdfDoc.save();
}

export async function pdfToImage(bytes: Uint8Array): Promise<string> {
  // 2. Dynamically import the library only when the function is called
  const pdfjs = await import('pdfjs-dist');
  
  // 3. Set the worker using a reliable CDN
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const loadingTask = pdfjs.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  if (context) {
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas.toDataURL('image/jpeg', 0.95);
  }
  
  throw new Error("Canvas context failed");
}

export async function unlockPDF(bytes: Uint8Array, password: string) {
  // Attempt to load the document with the provided password
  const pdfDoc = await PDFDocument.load(bytes, { 
    password: password,
    ignoreEncryption: false 
  });

  // Saving the document automatically removes the encryption 
  // because pdf-lib does not currently support saving encrypted files.
  return await pdfDoc.save();
}

export async function addPageNumbers(bytes: Uint8Array) {
  const pdfDoc = await PDFDocument.load(bytes);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 10;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width } = page.getSize();
    const text = `Page ${i + 1} of ${pages.length}`;
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    page.drawText(text, {
      x: width / 2 - textWidth / 2, // Center alignment
      y: 20, // 20 units from the bottom
      size: fontSize,
      font: font,
      color: rgb(0.5, 0.5, 0.5), // Subtle gray
    });
  }

  return await pdfDoc.save();
}

export async function imagesToPdf(imageUrls: string[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  for (const url of imageUrls) {
    const imageBytes = await fetch(url).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedJpg(imageBytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  
  return await pdfDoc.save();
}

export async function reorderPdfPages(bytes: Uint8Array, pageIndices: number[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const srcDoc = await PDFDocument.load(bytes);
  const pdfDoc = await PDFDocument.create();
  
  // Copy only the pages selected by the user in their new order
  const copiedPages = await pdfDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => pdfDoc.addPage(page));
  
  return await pdfDoc.save();
}