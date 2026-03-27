import { NativeModules } from 'react-native';

const { PaddleHindiOCR } = NativeModules;

export async function runHindiOCR(imagePath) {
  try {
    const result = await PaddleHindiOCR.recognize(imagePath);
    return result?.trim() || null;
  } catch (e) {
    console.log('Hindi OCR failed:', e);
    return null;
  }
}
