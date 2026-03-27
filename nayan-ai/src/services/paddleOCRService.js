import { NativeModules } from 'react-native';

const { PaddleOCR } = NativeModules;

export async function runPaddleOCR(imagePath) {
  try {
    const text = await PaddleOCR.recognize(imagePath);
    return text?.trim() || null;
  } catch (e) {
    console.log('PaddleOCR failed:', e);
    return null;
  }
}
