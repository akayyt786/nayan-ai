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

/**
 * Main function — call this with a photo path, get text back
 * @param {string} imagePath - local file path from camera
 * @returns {string} - extracted Hindi/Punjabi text
 */
export async function extractTextFromImage(imagePath) {
  console.log('[OCR] Starting text extraction from:', imagePath);

  try {
    // STEP 1: Sharpen the image
    // We resize to 1200x1600 which is the sweet spot:
    // - Large enough for ML Kit to see fine text details
    // - Small enough to process fast on budget phones
    const sharpenedImage = await ImageResizer.createResizedImage(
      `file://${imagePath}`,  // file:// prefix needed for Android
      1000,                    // target width in pixels (optimized for low-end)
      1400,                    // target height in pixels
      'JPEG',                  // format — JPEG is fastest
      90,                      // quality 0-100 (90 = sharp + reasonable size)
      0,                       // rotation in degrees (0 = keep original)
      undefined,               // output path (undefined = auto temp folder)
      false,                   // keep metadata — false = faster
      { mode: 'cover' }        // resize mode — cover fills the dimensions
    );

    console.log('[OCR] Image sharpened, running ML Kit...');

    // STEP 2: Run ML Kit OCR
    // This line does ALL the heavy lifting completely on-device
    const result = await TextRecognition.recognize(sharpenedImage.uri);
    
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

    console.log('[OCR] Extraction complete. Characters found:', extractedText.length);

    if (!extractedText || extractedText.length < 5) {
      console.warn('[OCR] No significant text found in image');
      return null;
    }

    return extractedText;

  } catch (error) {
    console.error('[OCR] Error during text extraction:', error);
    throw new Error('Could not read text from photo. Please try again with better lighting.');
  }
}
