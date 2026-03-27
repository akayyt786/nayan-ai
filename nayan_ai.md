# NayanAI — Complete Agent Build Prompt
# Copy this ENTIRE file and paste it into your AI coding agent (Claude Code / Cursor / Windsurf)

---

## 🤖 AGENT INSTRUCTIONS — READ THIS FIRST

You are a senior React Native developer building **NayanAI** — a mobile app for visually impaired children that reads printed Hindi/Punjabi text aloud using 100% offline AI. This is for HackXtreme 2026.

### Your behaviour rules (follow strictly):

1. **Progress tracking** — Maintain a checklist at the top of every response. Use ✅ for done, 🔄 for in progress, ⬜ for not started. Once something is ✅, NEVER touch or re-run it.

2. **Auto-install** — If any library or tool is missing, install it automatically without asking. Never say "you should install X" — just install it.

3. **Verify before moving on** — After every step, run a verification command or test. Only move to next step if verification passes. If it fails, fix it before continuing.

4. **Tell the user when to manually check** — After any step that requires human eyes (camera working, voice playing, UI looking correct), print this exact message:
   ```
   👀 MANUAL CHECK REQUIRED
   What to do: [exact instruction]
   What you should see/hear: [exact expected result]
   Type "ok" to continue or describe what went wrong.
   ```

5. **Explain what you are doing** — Before every block of code or command, write 1-2 lines explaining WHAT it does and WHY in simple language. This is a learning project.

6. **Never assume** — Check if a file exists before creating it. Check if a package is installed before installing. Use `ls`, `cat package.json`, `npx react-native doctor` to verify state.

7. **One phase at a time** — Complete Phase 1 fully before starting Phase 2. Ask user to confirm before moving to next phase.

---

## 🗂️ MASTER PROGRESS CHECKLIST
(Update this at the start of every response)

### Phase 1 — Environment + Project Setup
- ⬜ P1.1 — Check Node.js version (need 18+)
- ⬜ P1.2 — Check Java version (need 17+)
- ⬜ P1.3 — Check Android Studio + SDK installed
- ⬜ P1.4 — Clone RunAnywhere React Native starter app
- ⬜ P1.5 — Run npm install
- ⬜ P1.6 — Install all NayanAI libraries
- ⬜ P1.7 — Add Android permissions to AndroidManifest.xml
- ⬜ P1.8 — Verify app launches on Android device/emulator

### Phase 2 — Camera Module
- ⬜ P2.1 — Create src/screens/ folder structure
- ⬜ P2.2 — Build CameraScreen.js with permission handling
- ⬜ P2.3 — Add big accessible scan button (min 80px)
- ⬜ P2.4 — Wire camera to App.js
- ⬜ P2.5 — Verify camera opens and photo is captured

### Phase 3 — OCR Module (Text Reading)
- ⬜ P3.1 — Create src/services/ocrService.js
- ⬜ P3.2 — Add image sharpening with react-native-image-resizer
- ⬜ P3.3 — Integrate ML Kit text recognition for Hindi
- ⬜ P3.4 — Display raw extracted text on screen
- ⬜ P3.5 — Verify Hindi text is extracted from a test photo

### Phase 4 — LLM Simplification Module
- ⬜ P4.1 — Create src/services/llmService.js
- ⬜ P4.2 — Connect RunAnywhere SDK and load SmolLM2 model
- ⬜ P4.3 — Write child-friendly simplification prompt in Hindi
- ⬜ P4.4 — Verify simplified text output looks correct

### Phase 5 — TTS Voice Module
- ⬜ P5.1 — Create src/services/ttsService.js
- ⬜ P5.2 — Configure react-native-tts for Hindi (hi-IN)
- ⬜ P5.3 — Set child-friendly rate (0.75) and pitch (1.1)
- ⬜ P5.4 — Add stop/replay controls
- ⬜ P5.5 — Verify voice reads text aloud in Hindi

### Phase 6 — Full Pipeline Integration
- ⬜ P6.1 — Wire all 4 modules in App.js (Camera→OCR→LLM→TTS)
- ⬜ P6.2 — Add status messages for each stage
- ⬜ P6.3 — Add loading indicator during processing
- ⬜ P6.4 — Test full loop: photo → voice output
- ⬜ P6.5 — Verify complete flow works end to end

### Phase 7 — UI Polish (Hackathon Ready)
- ⬜ P7.1 — Apply NayanAI colour scheme (navy + amber + white)
- ⬜ P7.2 — Add NayanAI logo/title header
- ⬜ P7.3 — Add sound wave animation while speaking
- ⬜ P7.4 — Make all buttons accessibility-friendly (large, high contrast)
- ⬜ P7.5 — Add airplane mode indicator (shows offline status)

### Phase 8 — Offline Verification
- ⬜ P8.1 — Enable airplane mode on test phone
- ⬜ P8.2 — Run complete flow in airplane mode
- ⬜ P8.3 — Verify zero network requests made
- ⬜ P8.4 — Check app works after phone restart in airplane mode

### Phase 9 — Demo + Submission Prep
- ⬜ P9.1 — Write README.md with setup instructions
- ⬜ P9.2 — Build release APK
- ⬜ P9.3 — Install APK on demo phone
- ⬜ P9.4 — Final full demo run (airplane mode + real textbook)
- ⬜ P9.5 — Push to GitHub

---

## 📋 PROJECT SPECIFICATION

### App name: NayanAI
### Tagline: "The Blind Child Reading Companion"
### Platform: React Native (Android priority, iOS bonus)
### Hackathon: HackXtreme 2026 — RunAnywhere SDK mandatory

### What the app does (one sentence):
Point phone camera at any printed Hindi or Punjabi textbook page → app reads it aloud in a warm Hindi voice → zero internet, zero cost, works forever.

### Target user:
Visually impaired children aged 6-14 in Indian government schools. Low-tech users. Teacher may help operate.

### Core technical requirement:
EVERYTHING must work in airplane mode. No API calls. No cloud. No backend. All AI runs on the device.

---

## 🛠️ PHASE 1 — ENVIRONMENT + PROJECT SETUP

### What we are doing:
Setting up the development environment and getting the base project running. Think of this as laying the foundation before building the house.

```bash
# STEP P1.1 — Check Node.js (React Native needs v18 or higher)
node --version
# If below 18, install from: https://nodejs.org/en/download

# STEP P1.2 — Check Java (Android build needs Java 17)
java -version
# If not 17, install from: https://adoptium.net

# STEP P1.3 — Check React Native environment
npx react-native doctor
# Fix any issues it reports automatically before continuing

# STEP P1.4 — Clone the RunAnywhere starter app
# (Fork it on GitHub first, then clone your fork)
git clone https://github.com/RunanywhereAI/react-native-starter-app nayan-ai
cd nayan-ai

# STEP P1.5 — Install base dependencies
npm install

# STEP P1.6 — Install ALL NayanAI specific libraries
npm install react-native-vision-camera
npm install @react-native-ml-kit/text-recognition
npm install react-native-image-resizer
npm install react-native-tts
npm install react-native-fs
npm install react-native-vector-icons
npm install react-native-reanimated
npm install react-native-safe-area-context

# Link native modules (React Native 0.71+ does this automatically)
cd android && ./gradlew clean && cd ..
```

### P1.7 — AndroidManifest.xml permissions
File location: `android/app/src/main/AndroidManifest.xml`

Add these lines INSIDE the `<manifest>` tag, BEFORE the `<application>` tag:

```xml
<!-- Camera permission — needed to capture textbook photos -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Storage permissions — needed to save captured photos temporarily -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
    android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="29" />

<!-- Tells the Play Store this app uses a camera -->
<uses-feature android:name="android.hardware.camera" android:required="true" />
```

Also add this inside the `<application>` tag for vector icons:
```xml
<uses-library android:name="org.apache.http.legacy" android:required="false" />
```

### P1.8 — Verification
```bash
# Connect Android phone via USB with Developer Mode enabled
# OR start Android emulator from Android Studio

npx react-native run-android

# Wait 2-3 minutes for first build
```

```
👀 MANUAL CHECK REQUIRED
What to do: Look at your Android phone or emulator screen
What you should see: The RunAnywhere starter app opening with a white screen and some UI elements
Type "ok" to continue or describe the error message you see.
```

---

## 📷 PHASE 2 — CAMERA MODULE

### What we are doing:
Building the camera screen. This is the first thing the child or teacher sees. One big button. Point at textbook. Tap. Done.

### Why react-native-vision-camera:
It gives us direct access to the phone camera hardware — much faster and more accurate than the older react-native-camera library. It supports photo capture which we need for OCR.

### P2.1 — Create folder structure
```bash
# Create the folder structure for organized code
mkdir -p src/screens
mkdir -p src/services
mkdir -p src/components
mkdir -p src/assets

# Verify folders were created
ls src/
```

### P2.2 + P2.3 — Build CameraScreen.js
Create file: `src/screens/CameraScreen.js`

```javascript
/**
 * CameraScreen.js
 *
 * WHAT THIS DOES:
 * Shows the camera viewfinder fullscreen.
 * Has one large button at the bottom that the teacher/child taps to scan.
 * Asks for camera permission if not already granted.
 * Returns the photo file path — never uploads it anywhere.
 *
 * WHY THIS WAY:
 * We use useRef for the camera so we can call takePhoto() on demand.
 * useCameraDevice picks the best back camera automatically.
 * The button is large (80px+) so visually impaired users can tap easily.
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function CameraScreen({ onPhotoTaken, isProcessing }) {
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  // If permission not granted, show permission request screen
  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>📷 Camera Access Needed</Text>
        <Text style={styles.permissionText}>
          NayanAI needs your camera to read textbook pages.
          Your photos never leave this device.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
          accessibilityLabel="Allow camera access"
        >
          <Text style={styles.permissionButtonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If no camera device found on this phone
  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>No Camera Found</Text>
        <Text style={styles.permissionText}>
          This device does not have a back camera.
        </Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (isTakingPhoto || isProcessing) return;
    setIsTakingPhoto(true);
    try {
      // takePhoto captures a JPEG and saves to device temp storage
      // flash: 'off' keeps it simple — teacher holds phone steadily
      const photo = await camera.current.takePhoto({
        flash: 'off',
        qualityPrioritization: 'quality',
      });

      // photo.path is a local file path like:
      // /data/user/0/com.nayaai/cache/photo_123.jpg
      // This path is passed UP to App.js for OCR processing
      onPhotoTaken(photo.path);
    } catch (error) {
      Alert.alert('Error', 'Could not take photo. Please try again.');
      console.error('Camera error:', error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Full screen camera preview */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!isProcessing}
        photo={true}
      />

      {/* Dark overlay when processing */}
      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#EF9F27" />
        </View>
      )}

      {/* Scan button — large and accessible */}
      <View style={styles.buttonContainer}>
        <Text style={styles.hint}>
          {isProcessing
            ? 'Reading your text...'
            : 'Point camera at the text and tap'}
        </Text>
        <TouchableOpacity
          style={[
            styles.scanButton,
            (isTakingPhoto || isProcessing) && styles.scanButtonDisabled,
          ]}
          onPress={takePhoto}
          disabled={isTakingPhoto || isProcessing}
          accessibilityLabel="Scan text"
          accessibilityHint="Takes a photo and reads the text aloud"
        >
          <Text style={styles.scanButtonText}>
            {isTakingPhoto ? '...' : '📸'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A3C6B',
    padding: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#EF9F27',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A3C6B',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 48,
    paddingTop: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  hint: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  // Minimum 80px diameter for accessibility
  scanButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1A3C6B',
    borderWidth: 4,
    borderColor: '#EF9F27',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  scanButtonDisabled: {
    opacity: 0.5,
  },
  scanButtonText: {
    fontSize: 36,
  },
});
```

### P2.4 — Wire CameraScreen to App.js temporarily to test
Replace contents of `App.js` with this test version:

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CameraScreen from './src/screens/CameraScreen';

export default function App() {
  const [lastPhoto, setLastPhoto] = useState(null);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <CameraScreen
          onPhotoTaken={(path) => {
            setLastPhoto(path);
            console.log('Photo taken at:', path);
          }}
          isProcessing={false}
        />
        {/* Debug: show photo path when taken */}
        {lastPhoto && (
          <View style={styles.debug}>
            <Text style={styles.debugText}>
              ✅ Photo captured! Path: {lastPhoto.slice(-40)}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  debug: {
    position: 'absolute',
    top: 40,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 8,
    borderRadius: 8,
  },
  debugText: { color: '#4ade80', fontSize: 12 },
});
```

### P2.5 — Verification
```bash
npx react-native run-android
```

```
👀 MANUAL CHECK REQUIRED
What to do: 
  1. Open the app on your phone
  2. Allow camera permission when asked
  3. You should see the camera viewfinder fullscreen
  4. Tap the big blue circular button
What you should see: 
  - Camera opens fullscreen ✅
  - Tapping the button shows a photo path at the top of screen ✅
  - No crash ✅
Type "ok" to continue or describe what went wrong.
```

---

## 📖 PHASE 3 — OCR MODULE (TEXT READING)

### What we are doing:
Teaching the app to READ text from a photo. This is like giving eyes to the app. We use Google's ML Kit — it runs completely on the device, supports Hindi (Devanagari script) and works with no internet.

### Why ML Kit over Tesseract:
ML Kit is maintained by Google, has better Hindi accuracy, and integrates with React Native in 3 lines of code. It also handles rotated/angled text better which matters for real-world photos.

### P3.1 + P3.2 + P3.3 — Create ocrService.js
Create file: `src/services/ocrService.js`

```javascript
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
      1200,                    // target width in pixels
      1600,                    // target height in pixels
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
    // ML Kit's model file is bundled inside the app — no download needed
    const result = await TextRecognition.recognize(sharpenedImage.uri);

    const extractedText = result.text.trim();
    console.log('[OCR] Extraction complete. Characters found:', extractedText.length);

    if (!extractedText || extractedText.length < 3) {
      // If very little text found, likely a bad photo
      return null;
    }

    return extractedText;

  } catch (error) {
    console.error('[OCR] Error during text extraction:', error);
    throw new Error('Could not read text from photo. Please try again with better lighting.');
  }
}
```

### P3.4 — Add OCR display to App.js for testing
Update `App.js` to show extracted text:

```javascript
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, ActivityIndicator
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CameraScreen from './src/screens/CameraScreen';
import { extractTextFromImage } from './src/services/ocrService';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');

  const handlePhoto = async (imagePath) => {
    setIsProcessing(true);
    setError('');
    try {
      const text = await extractTextFromImage(imagePath);
      if (text) {
        setExtractedText(text);
        console.log('Extracted text:', text);
      } else {
        setError('No text found. Try better lighting.');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <CameraScreen
          onPhotoTaken={handlePhoto}
          isProcessing={isProcessing}
        />
        {/* Debug panel */}
        {(extractedText || error) && (
          <View style={styles.debugPanel}>
            {error ? (
              <Text style={styles.errorText}>❌ {error}</Text>
            ) : (
              <>
                <Text style={styles.debugLabel}>📖 Extracted text:</Text>
                <ScrollView style={{ maxHeight: 120 }}>
                  <Text style={styles.debugText}>{extractedText}</Text>
                </ScrollView>
              </>
            )}
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  debugPanel: {
    position: 'absolute',
    top: 40,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 12,
    borderRadius: 10,
  },
  debugLabel: { color: '#EF9F27', fontWeight: 'bold', marginBottom: 4 },
  debugText: { color: '#fff', fontSize: 13, lineHeight: 20 },
  errorText: { color: '#f87171', fontSize: 13 },
});
```

### P3.5 — Verification
```bash
npx react-native run-android
```

```
👀 MANUAL CHECK REQUIRED
What to do:
  1. Open the app
  2. Point camera at ANY printed Hindi text
     (Hindi newspaper, textbook, or even a printed page works)
  3. Tap the scan button
  4. Wait 2-3 seconds
What you should see:
  - A dark panel appears at the top showing the extracted Hindi text ✅
  - The text should be readable (may not be 100% perfect) ✅
  - No crash ✅
  TIP: Try in good lighting first. Natural daylight works best.
Type "ok" to continue or describe what you see.
```

---

## 🧠 PHASE 4 — LLM SIMPLIFICATION MODULE

### What we are doing:
The OCR gives us raw textbook text — but some of it may be complex for a child. We pass it through a small AI model (SmolLM2) that rewrites it in simple, friendly Hindi. This model runs inside the app, on the device's processor, with zero internet.

### Why SmolLM2-360M:
It is the smallest capable language model available. 360M parameters means it fits in ~500MB RAM — any phone with 3GB+ RAM (which is every Android phone sold after 2019) can run it. The RunAnywhere SDK handles all the technical complexity of running it.

### P4.1 + P4.2 + P4.3 — Create llmService.js
Create file: `src/services/llmService.js`

```javascript
/**
 * llmService.js
 *
 * WHAT THIS DOES:
 * Takes complex extracted text → returns simple child-friendly explanation in Hindi
 *
 * HOW IT WORKS:
 * SmolLM2 (360 million parameter model) runs via the RunAnywhere SDK.
 * The SDK uses Android's NNAPI (Neural Networks API) to accelerate
 * inference using the phone's built-in AI chip or GPU.
 * The model file is downloaded ONCE on first app run, then stored
 * permanently in the app's private storage.
 *
 * ABOUT THE PROMPT:
 * The prompt is carefully written to produce short, simple Hindi.
 * We tell the model exactly who it is (a kind teacher) and who
 * it is speaking to (a 10-year-old child). This dramatically
 * improves the quality of the output.
 */

import { RunAnywhere } from '@runanywhere/react-native-sdk';

// Model stored at module level — load once, reuse forever
// This avoids reloading the 500MB model on every scan
let model = null;
let isLoading = false;

/**
 * Load the SmolLM2 model into memory
 * Call this once when app starts — keeps model warm for fast inference
 */
export async function loadLLM(onProgress) {
  if (model) {
    console.log('[LLM] Model already loaded, skipping');
    return;
  }

  if (isLoading) {
    console.log('[LLM] Model is already loading, waiting...');
    // Wait until loading completes
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    return;
  }

  isLoading = true;
  try {
    console.log('[LLM] Loading SmolLM2-360M model...');
    if (onProgress) onProgress('Loading AI model (first time only)...');

    // RunAnywhere SDK loads model from:
    // 1. App bundle (if pre-bundled) OR
    // 2. Downloaded once to app storage, used offline forever after
    model = await RunAnywhere.loadModel('smollm2-360m', {
      onDownloadProgress: (progress) => {
        if (onProgress) onProgress(`Downloading model: ${Math.round(progress * 100)}%`);
      }
    });

    console.log('[LLM] Model loaded successfully');
    if (onProgress) onProgress(null); // Clear loading message
  } catch (error) {
    console.error('[LLM] Failed to load model:', error);
    throw new Error('Could not load AI model. Please check storage space.');
  } finally {
    isLoading = false;
  }
}

/**
 * Simplify complex text for a child
 * @param {string} rawText - text extracted by OCR
 * @returns {string} - simplified Hindi explanation
 */
export async function simplifyForChild(rawText) {
  // Make sure model is loaded
  if (!model) {
    await loadLLM();
  }

  // Clean up the raw text first
  // OCR sometimes produces extra spaces or newlines
  const cleanText = rawText.replace(/\s+/g, ' ').trim();

  // This prompt is the most important part.
  // It tells the model EXACTLY what to do and HOW to speak.
  // In Hindi prompting, being explicit about tone and audience
  // dramatically improves output quality.
  const prompt = `तुम एक प्यारे और दयालु अध्यापक हो जो 10 साल के बच्चे को पढ़ा रहे हो।
नीचे दिया गया पाठ पढ़ो और उसे बहुत आसान हिंदी में समझाओ।
छोटे-छोटे वाक्य बनाओ। मुश्किल शब्द मत उपयोग करो।

पाठ: ${cleanText}

आसान भाषा में समझाओ:`;

  console.log('[LLM] Generating simplified explanation...');

  try {
    const result = await model.generate(prompt, {
      maxTokens: 200,         // Short output — child doesn't need a long essay
      temperature: 0.4,       // Lower temperature = more focused, less random
      stopSequences: ['\n\n'] // Stop at double newline — keeps it concise
    });

    const simplified = result.text.trim();
    console.log('[LLM] Simplification complete:', simplified.slice(0, 80) + '...');
    return simplified;

  } catch (error) {
    console.error('[LLM] Generation error:', error);
    // Fallback: if LLM fails, return the original text
    // So the app still works — just without simplification
    console.warn('[LLM] Falling back to original text');
    return cleanText;
  }
}
```

### P4.4 — Add LLM to App.js for testing
Update the `handlePhoto` function in `App.js`:

```javascript
// Add this import at the top of App.js
import { loadLLM, simplifyForChild } from './src/services/llmService';

// Add this in useEffect
useEffect(() => {
  loadLLM((msg) => setStatus(msg || ''));
}, []);

// Update handlePhoto to include LLM step
const handlePhoto = async (imagePath) => {
  setIsProcessing(true);
  try {
    setStatus('📖 Reading text from photo...');
    const rawText = await extractTextFromImage(imagePath);

    if (!rawText) {
      setError('No text found. Try better lighting.');
      return;
    }

    setStatus('🧠 Making it simple for you...');
    const simpleText = await simplifyForChild(rawText);

    setExtractedText(simpleText);
    setStatus('✅ Done');
  } catch (e) {
    setError(e.message);
  } finally {
    setIsProcessing(false);
  }
};
```

```
👀 MANUAL CHECK REQUIRED
What to do:
  1. Run the app
  2. Wait for "Loading AI model" message (first time = 1-2 min download)
  3. Scan a Hindi textbook page
  4. Wait for processing (10-15 seconds on first run)
What you should see:
  - The text panel shows SIMPLIFIED Hindi — shorter, simpler words ✅
  - Should feel like a teacher explaining, not raw book text ✅
  - Status messages change: Reading → Making simple → Done ✅
Type "ok" to continue.
```

---

## 🔊 PHASE 5 — TTS VOICE MODULE

### What we are doing:
This is the most important phase for the child. All the text work means nothing until they can HEAR it. We use Android's built-in Hindi voice — it is already on every Android phone, requires zero download, and works in complete airplane mode.

### Why built-in TTS:
Android's TTS engine (called Pico TTS or Google TTS depending on the phone) has a Hindi (hi-IN) voice pre-installed on all Android phones sold in India since 2018. Using it means: zero extra download, zero extra storage, works immediately, sounds natural.

### P5.1 + P5.2 + P5.3 + P5.4 — Create ttsService.js
Create file: `src/services/ttsService.js`

```javascript
/**
 * ttsService.js
 *
 * WHAT THIS DOES:
 * Converts the simplified Hindi text to speech using Android's built-in voice.
 * The voice plays through the phone speaker — exactly like a human teacher reading.
 *
 * HOW ANDROID TTS WORKS:
 * Android has a Text-to-Speech engine built into every phone.
 * We configure it to use Hindi (hi-IN) language.
 * We slow it down slightly (rate: 0.75) so children can follow along.
 * We raise pitch slightly (1.1) so it sounds warm and friendly.
 *
 * COMPLETELY OFFLINE:
 * The Hindi voice model is stored IN the Android operating system itself.
 * It never makes a network call. It works with no SIM card inserted.
 */

import Tts from 'react-native-tts';

let isTTSReady = false;

/**
 * Initialize TTS — call once when app starts
 * Sets up Hindi voice with child-friendly settings
 */
export async function initTTS() {
  try {
    // Wait for TTS engine to be ready
    await Tts.getInitStatus();

    // Set Hindi as the language
    // 'hi-IN' = Hindi, India locale
    const languageResult = await Tts.setDefaultLanguage('hi-IN');
    console.log('[TTS] Language set to Hindi:', languageResult);

    // Rate: 1.0 is normal speech speed
    // 0.75 = 25% slower — children can follow along more easily
    Tts.setDefaultRate(0.75);

    // Pitch: 1.0 is normal
    // 1.1 = slightly higher — sounds warmer and more friendly
    Tts.setDefaultPitch(1.1);

    isTTSReady = true;
    console.log('[TTS] Ready — Hindi voice initialized offline');

  } catch (error) {
    console.error('[TTS] Init error:', error);
    // TTS failing is not fatal — app still shows text visually
    // We just won't have voice output
  }
}

/**
 * Speak the given text aloud
 * @param {string} text - Hindi text to speak
 * @param {function} onStart - called when speech begins
 * @param {function} onFinish - called when speech ends
 */
export function speakText(text, onStart, onFinish) {
  if (!isTTSReady) {
    console.warn('[TTS] Not ready yet');
    return;
  }

  // Stop any currently playing speech first
  Tts.stop();

  // Set up event listeners
  if (onStart) {
    Tts.addEventListener('tts-start', onStart);
  }
  if (onFinish) {
    Tts.addEventListener('tts-finish', () => {
      onFinish();
      // Remove listeners after use
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
    });
  }

  // SPEAK — this is the single line that makes the magic happen
  Tts.speak(text);
  console.log('[TTS] Speaking text, length:', text.length, 'characters');
}

/**
 * Stop speaking immediately
 */
export function stopSpeaking() {
  Tts.stop();
  console.log('[TTS] Stopped');
}

/**
 * Check if a Hindi voice is available on this device
 * Returns true if the device supports Hindi TTS
 */
export async function checkHindiVoiceAvailable() {
  try {
    const voices = await Tts.voices();
    const hindiVoice = voices.find(v =>
      v.language === 'hi-IN' || v.language === 'hi'
    );
    console.log('[TTS] Hindi voice found:', hindiVoice?.name || 'None');
    return !!hindiVoice;
  } catch {
    return false;
  }
}
```

### P5.5 — Verification
```
👀 MANUAL CHECK REQUIRED
What to do:
  1. Add these two lines temporarily to App.js useEffect:
     import { initTTS, speakText } from './src/services/ttsService';
     // In useEffect: initTTS().then(() => speakText('नमस्ते, मैं NayanAI हूँ'))
  2. Run the app
  3. Turn volume up on your phone
What you should see/hear:
  - Phone speaks "Namaste, main NayanAI hoon" in Hindi ✅
  - Voice is clear and understandable ✅
  - No internet indicator on phone (WiFi/4G) should not flash ✅
Type "ok" to continue.
```

---

## 🔌 PHASE 6 — FULL PIPELINE INTEGRATION

### What we are doing:
Connecting all 4 modules into one seamless flow. Camera → OCR → LLM → TTS. This is when NayanAI becomes a real product.

### P6.1 through P6.5 — Final App.js
Replace `App.js` completely with this final integrated version:

```javascript
/**
 * App.js — NayanAI Main Application
 *
 * THE FULL PIPELINE:
 * 1. Camera captures photo of textbook
 * 2. OCR (ML Kit) extracts Hindi/Punjabi text from photo
 * 3. LLM (SmolLM2) simplifies text for a child
 * 4. TTS (Android built-in) reads it aloud in Hindi
 *
 * ALL OFFLINE. ZERO INTERNET. WORKS IN AIRPLANE MODE.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CameraScreen from './src/screens/CameraScreen';
import { extractTextFromImage } from './src/services/ocrService';
import { loadLLM, simplifyForChild } from './src/services/llmService';
import { initTTS, speakText, stopSpeaking } from './src/services/ttsService';

// App stages — controls what the user sees
const STAGES = {
  BOOTING:   'booting',   // App loading, models initializing
  READY:     'ready',     // Camera visible, waiting for scan
  SCANNING:  'scanning',  // OCR reading the photo
  THINKING:  'thinking',  // LLM simplifying text
  SPEAKING:  'speaking',  // TTS reading aloud
  ERROR:     'error',     // Something went wrong
};

export default function App() {
  const [stage, setStage] = useState(STAGES.BOOTING);
  const [statusMessage, setStatusMessage] = useState('Starting NayanAI...');
  const [resultText, setResultText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize all AI services on app launch
  useEffect(() => {
    async function initialize() {
      try {
        setStatusMessage('Setting up voice...');
        await initTTS();

        setStatusMessage('Loading AI model (first time takes a minute)...');
        await loadLLM((msg) => {
          if (msg) setStatusMessage(msg);
        });

        setStage(STAGES.READY);
        setStatusMessage('');

        // Welcome message in Hindi
        speakText('नमस्ते! मैं NayanAI हूँ। किताब के पास कैमरा रखें और बटन दबाएं।');
      } catch (error) {
        console.error('Init error:', error);
        setStage(STAGES.ERROR);
        setStatusMessage('Startup failed. Please restart app.');
      }
    }
    initialize();
  }, []);

  const handlePhotoTaken = useCallback(async (imagePath) => {
    stopSpeaking();
    setResultText('');

    try {
      // STAGE 1: OCR
      setStage(STAGES.SCANNING);
      setStatusMessage('📖 पढ़ रहे हैं...');
      const rawText = await extractTextFromImage(imagePath);

      if (!rawText) {
        setStage(STAGES.ERROR);
        setStatusMessage('Text not found. Please try with better lighting.');
        speakText('माफ करना, पाठ नहीं मिला। अच्छी रोशनी में फिर कोशिश करें।');
        setTimeout(() => setStage(STAGES.READY), 3000);
        return;
      }

      // STAGE 2: LLM Simplification
      setStage(STAGES.THINKING);
      setStatusMessage('🧠 समझा रहे हैं...');
      const simpleText = await simplifyForChild(rawText);
      setResultText(simpleText);

      // STAGE 3: TTS
      setStage(STAGES.SPEAKING);
      setStatusMessage('🔊 सुनो...');
      setIsSpeaking(true);
      speakText(
        simpleText,
        () => setIsSpeaking(true),   // onStart
        () => {                       // onFinish
          setIsSpeaking(false);
          setStage(STAGES.READY);
          setStatusMessage('');
        }
      );

    } catch (error) {
      console.error('Pipeline error:', error);
      setStage(STAGES.ERROR);
      setStatusMessage(error.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStage(STAGES.READY), 4000);
    }
  }, []);

  const handleReplay = () => {
    if (resultText) {
      setIsSpeaking(true);
      speakText(resultText, null, () => setIsSpeaking(false));
    }
  };

  const isProcessing = [STAGES.SCANNING, STAGES.THINKING].includes(stage);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1A3C6B" />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>👁️ NayanAI</Text>
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineBadgeText}>✈️ Offline</Text>
          </View>
        </View>

        {/* Status bar */}
        {(statusMessage || stage === STAGES.BOOTING) && (
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>
              {statusMessage || 'Starting...'}
            </Text>
          </View>
        )}

        {/* Camera (shown when ready or speaking) */}
        {[STAGES.READY, STAGES.SCANNING,
          STAGES.THINKING, STAGES.SPEAKING].includes(stage) && (
          <CameraScreen
            onPhotoTaken={handlePhotoTaken}
            isProcessing={isProcessing}
          />
        )}

        {/* Result text panel */}
        {resultText ? (
          <View style={styles.resultPanel}>
            <ScrollView style={styles.resultScroll}>
              <Text style={styles.resultText}>{resultText}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.replayButton}
              onPress={handleReplay}
              disabled={isSpeaking}
            >
              <Text style={styles.replayButtonText}>
                {isSpeaking ? '🔊 Speaking...' : '🔁 Play Again'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A3C6B',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  offlineBadge: {
    backgroundColor: '#EF9F27',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineBadgeText: { color: '#1A3C6B', fontWeight: 'bold', fontSize: 12 },
  statusBar: {
    backgroundColor: 'rgba(26,60,107,0.9)',
    padding: 10,
    alignItems: 'center',
  },
  statusText: { color: '#EF9F27', fontSize: 14, textAlign: 'center' },
  resultPanel: {
    position: 'absolute',
    bottom: 130,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(26,60,107,0.95)',
    borderRadius: 16,
    padding: 16,
    maxHeight: 200,
  },
  resultScroll: { maxHeight: 130 },
  resultText: { color: '#fff', fontSize: 17, lineHeight: 28 },
  replayButton: {
    marginTop: 12,
    backgroundColor: '#EF9F27',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  replayButtonText: { color: '#1A3C6B', fontWeight: 'bold', fontSize: 15 },
});
```

### P6.4 + P6.5 — Full pipeline verification
```bash
npx react-native run-android
```

```
👀 MANUAL CHECK REQUIRED — MOST IMPORTANT TEST
What to do:
  1. Open app — hear welcome message in Hindi ✅
  2. Wait for "✈️ Offline" badge to appear ✅
  3. Point camera at a printed Hindi text
  4. Tap the scan button
  5. Watch status: Reading → Understanding → Listen
  6. HEAR the voice read a simplified explanation ✅

Full success means ALL of this works:
  ✅ Camera opens
  ✅ Photo taken silently
  ✅ Hindi text extracted
  ✅ Simplified by AI
  ✅ Read aloud in Hindi voice
  ✅ "Play Again" button works

Type "ok" to continue to UI polish.
```

---

## 🎨 PHASE 7 — UI POLISH (HACKATHON READY)

### What we are doing:
Making the app look professional enough to win. Judges form their first impression in 10 seconds. The UI must be clean, accessible, and instantly communicate what NayanAI does.

### P7.1 through P7.5 — Create StatusIndicator component
Create `src/components/StatusIndicator.js`:

```javascript
/**
 * StatusIndicator.js
 * Animated wave that shows when TTS is speaking.
 * Visually shows the child that the app is talking.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function SoundWave({ isActive }) {
  const bars = [useRef(new Animated.Value(0.3)).current,
                useRef(new Animated.Value(0.5)).current,
                useRef(new Animated.Value(0.8)).current,
                useRef(new Animated.Value(0.5)).current,
                useRef(new Animated.Value(0.3)).current];

  useEffect(() => {
    if (isActive) {
      bars.forEach((bar, i) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bar, {
              toValue: 1, duration: 300 + i * 80,
              useNativeDriver: true
            }),
            Animated.timing(bar, {
              toValue: 0.2, duration: 300 + i * 80,
              useNativeDriver: true
            }),
          ])
        ).start();
      });
    } else {
      bars.forEach(bar => {
        bar.stopAnimation();
        Animated.timing(bar, {
          toValue: 0.3, duration: 200, useNativeDriver: true
        }).start();
      });
    }
  }, [isActive]);

  return (
    <View style={styles.waveContainer}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[styles.bar, { transform: [{ scaleY: bar }] }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    gap: 4,
  },
  bar: {
    width: 6,
    height: 32,
    borderRadius: 3,
    backgroundColor: '#EF9F27',
  },
});
```

Add `<SoundWave isActive={isSpeaking} />` inside the result panel in App.js.

---

## ✈️ PHASE 8 — OFFLINE VERIFICATION

### This is your hackathon proof moment.

```
👀 MANUAL CHECK REQUIRED — THE DEMO TEST
Do this EXACTLY as you will do on stage:

1. Turn on AIRPLANE MODE on your Android phone
2. Open NayanAI
3. Wait for it to fully load (model loads from device storage)
4. Point camera at a printed Hindi textbook page
5. Tap scan button
6. Wait for voice output

ALL of this must work with zero internet.

Verify:
✅ App loads in airplane mode
✅ Camera works
✅ Text is extracted (ML Kit — on device)
✅ Text is simplified (SmolLM2 — on device)
✅ Voice speaks in Hindi (Android TTS — built into OS)
✅ "Play Again" works
✅ If you open Chrome and search something — it fails (proves no internet)
✅ NayanAI still works (proves it's truly offline)

This is your demo. Practice this 10 times before the hackathon.
Type "ok" when everything passes.
```

---

## 📦 PHASE 9 — DEMO PREP + SUBMISSION

### P9.1 — Generate README.md
Create `README.md`:

```markdown
# 👁️ NayanAI — The Blind Child Reading Companion
### HackXtreme 2026 | Built with RunAnywhere SDK

## What it does
NayanAI reads printed Hindi and Punjabi textbook pages aloud for visually
impaired children. Point the camera. Tap once. Hear the text explained simply.

**Zero internet. Zero cost. Works on any Android phone. Forever.**

## Demo
1. Enable Airplane Mode ✈️
2. Open NayanAI
3. Point camera at printed Hindi text
4. Tap the scan button
5. Hear the text read aloud in Hindi

## Tech Stack
| Layer | Technology | Why |
|---|---|---|
| Camera | react-native-vision-camera | Direct hardware access |
| OCR | Google ML Kit (on-device) | Best Hindi/Punjabi accuracy |
| LLM | SmolLM2 via RunAnywhere SDK | Simplifies text for children |
| TTS | Android built-in (hi-IN) | Zero download, works offline |

## Setup
```bash
git clone https://github.com/YOUR_TEAM/nayan-ai
cd nayan-ai
npm install
npx react-native run-android
```

## Why this wins
- Uses ALL RunAnywhere SDK capabilities
- Solves a real problem for 5 million visually impaired children
- Works completely offline — airplane mode demo on stage
- One-button UI works for low-tech users
- Zero cost to deploy to any school in India
```

### P9.2 — Build release APK
```bash
# Clean build first
cd android && ./gradlew clean

# Build release APK
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk

cd ..
```

### P9.3 — Install on demo phone
```bash
# Install via ADB (phone connected via USB)
adb install android/app/build/outputs/apk/release/app-release.apk

# Verify installation
adb shell pm list packages | grep nayan
```

### P9.4 + P9.5 — Final push
```bash
# Add all files
git add .
git commit -m "NayanAI v1.0 — HackXtreme 2026 submission

Complete offline AI pipeline:
- react-native-vision-camera for camera
- ML Kit for Hindi/Punjabi OCR (on-device)
- SmolLM2 via RunAnywhere SDK for text simplification
- Android built-in TTS for Hindi voice output
- Works 100% in airplane mode"

git push origin main
```

```
👀 FINAL MANUAL CHECK
1. Open the APK on your demo phone (not development phone)
2. Run the full demo in airplane mode
3. All 5 steps work: Camera → OCR → Simplify → Speak → Replay
4. GitHub repo is public and has README
5. APK file is ready to show judges

🏆 NayanAI is complete. You are ready for HackXtreme 2026.
```

---

## 🚨 TROUBLESHOOTING — IF ANYTHING BREAKS

| Problem | Fix |
|---|---|
| Camera black screen | Check camera permission in phone Settings > Apps > NayanAI |
| No Hindi TTS voice | Go to phone Settings > Text-to-Speech > Install Hindi voice pack |
| ML Kit not finding text | Try in brighter light. Hold phone steady. Text must be printed (not handwritten) |
| Model download stuck | Check WiFi for first download only. After that — permanent offline |
| Build fails | Run `cd android && ./gradlew clean && cd .. && npx react-native run-android` |
| App crashes on launch | Run `npx react-native log-android` and paste error to agent |

---

## 📚 ALL RESOURCES

| Resource | Link |
|---|---|
| RunAnywhere React Native starter | github.com/RunanywhereAI/react-native-starter-app |
| RunAnywhere docs | docs.runanywhere.ai |
| RunAnywhere Discord | discord.com/invite/N359FBbDVd |
| Vision Camera docs | react-native-vision-camera.com/docs/guides |
| ML Kit text recognition | developers.google.com/ml-kit/vision/text-recognition |
| react-native-tts | github.com/ak1394/react-native-tts |

---

*NayanAI — HackXtreme 2026 | See the world through sound. 👁️*