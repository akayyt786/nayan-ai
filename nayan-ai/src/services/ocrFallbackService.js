import TextRecognition from '@react-native-ml-kit/text-recognition';

export async function fallbackOCR(imageUri) {
  try {
    const result = await TextRecognition.recognize(imageUri);

    const text = result.text.trim();

    if (!text || text.length < 5) {
      return null;
    }

    return text;
  } catch (e) {
    console.log('Fallback OCR failed:', e);
    return null;
  }
}
