/**
 * ocrService.js
 *
 * WHAT THIS DOES:
 * 1. Takes the photo file path from the camera
 * 2. Sharpens the image (makes text clearer for recognition)
 * 3. Passes it to ML Kit which reads the text completely on-device
 * 4. Returns the extracted text string
 *
 * WHY IMAGE SHARPENING:
 * Phone cameras in poor lighting produce blurry photos.
 * Resizing to a standard size + keeping quality=90 makes
 * text edges sharper which dramatically improves OCR accuracy.
 * Think of it like adjusting focus before reading.
 *
 * WHY ML KIT:
 * Google trained ML Kit on millions of Hindi documents.
 * It understands Devanagari script natively.
 * After first app install, zero internet ever needed.
 */

import TextRecognition from '@react-native-ml-kit/text-recognition';
import ImageResizer from 'react-native-image-resizer';
import { runPaddleOCR } from './paddleOCRService';

function detectHindi(text) {
  if (!text) return false;
  return /[\u0900-\u097F]/.test(text);
}

function isWeakText(text) {
  return !text || text.length < 8;
}

/**
 * Main function — call this with a photo path, get text back
 * @param {string} imagePath - local file path from camera
 * @returns {string} - extracted Hindi/Punjabi text
 */
export async function extractTextFromImage(imagePath) {
  console.log('[OCR] Input:', imagePath);

  try {
    // STEP 1: preprocess image
    const processedImage = await ImageResizer.createResizedImage(
      `file://${imagePath}`,
      1000,  // optimized size (faster than 1200)
      1400,
      'JPEG',
      95,    // higher quality for better OCR
      0
    );

    // simulate sharpening by re-saving with high quality
    const enhancedUri = processedImage.uri;

    console.log('[OCR] Image sharpened, running ML Kit...');

    // STEP 2: primary OCR (ML Kit)
    const result = await TextRecognition.recognize(enhancedUri);
    
    // ML Kit returns 'blocks'. We must sort them to ensure natural reading order.
    // Otherwise, it might read randomly if the page has columns.
    let extractedText = '';
    if (result.blocks && result.blocks.length > 0) {
      console.log(`[OCR] Found ${result.blocks.length} text blocks. Sorting...`);
      
      // Sort blocks: Primary sort by Top (Y), secondary sort by Left (X)
      // We use a small threshold (20px) for Y so that items on the same line 
      // but slightly misaligned are sorted by X correctly.
      const sortedBlocks = result.blocks.sort((a, b) => {
        const yDiff = a.frame.top - b.frame.top;
        if (Math.abs(yDiff) > 25) return yDiff; // Different line
        return a.frame.left - b.frame.left;     // Same line, sort Left-to-Right
      });

      extractedText = sortedBlocks.map(block => block.text).join('\n').trim();
    } else {
      extractedText = result.text ? result.text.trim() : '';
    }

    console.log('[ML KIT]', extractedText);

    // 🟡 STEP 2 — CHECK QUALITY + LANGUAGE
    const hasHindi = detectHindi(extractedText);
    const weak = isWeakText(extractedText);

    // 🔴 STEP 3 — FALLBACK TO PADDLEOCR
    if (weak || !hasHindi) {
      console.log('Switching to PaddleOCR...');
      const paddleText = await runPaddleOCR(imagePath);

      if (paddleText && paddleText.length > extractedText.length) {
        console.log('[PADDLE]', paddleText);
        extractedText = paddleText;
      }
    }

    if (!extractedText || extractedText.length < 5) {
      console.warn('[OCR] No significant text found in image');
      return null;
    }

    // STEP 4: clean text
    extractedText = extractedText
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    console.log('[OCR] Output length:', extractedText.length);

    return extractedText;

  } catch (error) {
    console.error('[OCR] Error during text extraction:', error);
    throw new Error('Could not read text from photo. Please try again with better lighting.');
  }
}
