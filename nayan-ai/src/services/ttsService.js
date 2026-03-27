import Tts from 'react-native-tts';

let selectedVoiceId = null;
let currentListeners = [];

async function hasHindiVoice() {
  const voices = await Tts.voices();
  return voices.some(v => v.language?.startsWith('hi'));
}

export async function initTTS() {
  try {
    await Tts.getInitStatus();

    const voices = await Tts.voices();

    // Filter Hindi voices
    const hindiVoices = voices.filter(v =>
      v.language === 'hi-IN' || v.language.startsWith('hi')
    );

    console.log('[TTS] Hindi voices:', hindiVoices);

    // 🟢 Try to find male voice
    let voice =
      hindiVoices.find(v => v.name?.toLowerCase().includes('male')) ||
      // 🟡 fallback: any Hindi voice
      hindiVoices[0] ||
      // 🔴 fallback: any voice
      voices[0];

    if (voice) {
      selectedVoiceId = voice.id;
      Tts.setDefaultVoice(voice.id);
      console.log('[TTS] Using voice:', voice.name);
    }

    const hasHindi = await hasHindiVoice();

    if (!hasHindi) {
      console.log('[TTS] No Hindi voice found');
      Tts.setDefaultLanguage('en-IN'); // fallback
    } else {
      // 🔥 Important tuning
      Tts.setDefaultLanguage('hi-IN');
      Tts.setDefaultPitch(0.6);   // deeper voice
      Tts.setDefaultRate(0.5);    // slower
    }

  } catch (e) {
    console.log('[TTS INIT ERROR]', e);
  }
}

function humanizeText(text) {
  if (!text) return '';

  let t = text;
  // Add teaching tone
  t = "अच्छा सुनो... " + t;
  // Add pauses
  t = t.replace(/।/g, '। ... ');
  t = t.replace(/\n/g, ' ... ');
  return t;
}

export async function speak(text, onStart, onFinish) {
  if (!text) return;

  // Clear previous listeners to avoid overlapping events
  currentListeners.forEach(listener => listener.remove());
  currentListeners = [];

  if (onStart) {
    currentListeners.push(Tts.addEventListener('tts-start', () => onStart()));
  }

  if (onFinish) {
    // Only resolve the finish or cancel to unlock the state
    const finishHandler = () => {
      onFinish();
      currentListeners.forEach(l => l.remove());
      currentListeners = [];
    };
    currentListeners.push(Tts.addEventListener('tts-finish', finishHandler));
    currentListeners.push(Tts.addEventListener('tts-cancel', finishHandler));
    currentListeners.push(Tts.addEventListener('tts-error', finishHandler));
  }

  const processedText = humanizeText(text);

  console.log('[TTS] Speaking:', text.slice(0, 50));

  try {
    // Stop any previous speech
    Tts.stop();
    Tts.speak(processedText);
  } catch (error) {
    console.log('[TTS ERROR]', error);
    // 🔴 FALLBACK — basic speak
    try {
      Tts.speak(text);
    } catch (e) {
      console.log('[TTS FALLBACK FAILED]', e);
      if (onFinish) onFinish();
    }
  }
}

export function stopSpeaking() {
  console.log('[TTS] Stop requested');
  Tts.stop();
}

export function speakInChunks(text) {
  if (!text) return;
  const parts = text.split('।');
  parts.forEach((part, index) => {
    setTimeout(() => {
      if (part.trim()) {
        Tts.speak(part.trim());
      }
    }, index * 1500);
  });
}
