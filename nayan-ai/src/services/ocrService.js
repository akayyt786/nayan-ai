import TextRecognition from '@react-native-ml-kit/text-recognition';
import { runHindiOCR } from './paddleHindiOCR';

function containsHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

export async function extractTextFromImage(imagePath) {
  try {
    const uri = `file://${imagePath}`;

    // 🔵 STEP 1 — ML KIT
    console.log('[OCR] Using ML Kit');
    const result = await TextRecognition.recognize(uri);
    let text = result.text.trim();

    console.log('[ML KIT]', text);

    // 🟡 STEP 2 — CHECK HINDI
    const hasHindi = containsHindi(text);

    // 🔴 STEP 3 — IF NO HINDI → USE PADDLE
    if (!hasHindi || text.length < 5) {
      console.log('[OCR] Switching to Paddle Hindi OCR');
      console.log('[OCR] Using Paddle Hindi OCR');

      const hindiText = await runHindiOCR(imagePath);

      if (hindiText && hindiText.length > 3) {
        console.log('[PADDLE]', hindiText);
        return hindiText;
      }
    }

    return text || null;

  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('OCR failed');
  }
}
