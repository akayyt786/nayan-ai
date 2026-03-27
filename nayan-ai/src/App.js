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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CameraScreen from './screens/CameraScreen';
import SoundWave from './components/StatusIndicator';
import { extractTextFromImage } from './services/ocrService';
import { simplifyText } from './services/simplifyService';
import { speak, stopSpeaking } from './services/localTTS';

// App stages — controls what the user sees
const STAGES = {
  BOOTING:   'booting',   // App loading, voice initializing
  READY:     'ready',     // Camera visible, waiting for scan
  SCANNING:  'scanning',  // OCR reading the photo
  SPEAKING:  'speaking',  // TTS reading aloud
  ERROR:     'error',     // Something went wrong
};

export default function App() {
  const [stage, setStage] = useState(STAGES.BOOTING);
  const [statusMessage, setStatusMessage] = useState('Starting NayanAI...');
  const [resultText, setResultText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState('');
  const [autoScanEnabled, setAutoScanEnabled] = useState(true); // Default to Live Mode
  const [triggerScan, setTriggerScan] = useState(0);

  // Initialize all AI services on app launch
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
          console.log('[App] Permissions granted:', granted);
        } catch (err) {
          console.warn('[App] Permission request error:', err);
        }
      }
    }

    async function initialize() {
      try {
        await requestPermissions();

        setStatusMessage('Setting up custom voice...');
        // LocalTTS doesn't need initTTS call as it loads lazily or via assets
        
        setStage(STAGES.READY);
        setStatusMessage('');

        // Welcome message in Hindi
        speak('नमस्ते! मैं NayanAI हूँ। किताब के पास कैमरा रखें और बटन दबाएं।');
      } catch (error) {
        console.error('Init error:', error);
        setStage(STAGES.ERROR);
        setStatusMessage('Startup failed. Please restart app.');
      }
    }
    initialize();
  }, []);

  /**
   * LIVE MODE TIMER
   * Automatically triggers a scan every 4 seconds if in READY stage
   */
  useEffect(() => {
    let timer;
    if (autoScanEnabled && stage === STAGES.READY && !isSpeaking) {
      timer = setTimeout(() => {
        console.log('[Live] Auto-triggering scan...');
        setTriggerScan(Date.now()); // Signal to CameraScreen to take photo
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [autoScanEnabled, stage, isSpeaking]);

  const handlePhotoTaken = useCallback(async (imagePath) => {
    stopSpeaking();
    setResultText('');
    
    // Audio Feedback for capture
    speak('फोटो लिया गया');

    try {
      // STAGE 1: OCR
      setStage(STAGES.SCANNING);
      setStatusMessage('📖 पढ़ रहे हैं...');
      speak('पाठ पढ़ रहे हैं'); // Audio Feedback before OCR
      
      const rawText = await extractTextFromImage(imagePath);

      if (!rawText) {
        setStage(STAGES.ERROR);
        setStatusMessage('Text not found. Please try with better lighting.');
        speak('माफ करना, पाठ नहीं मिला। अच्छी रोशनी में फिर कोशिश करें।');
        setTimeout(() => setStage(STAGES.READY), 3000);
        return;
      }

      // STAGE 2: Simplification (Local)
      setStatusMessage('🧑‍🏫 समझा रहे हैं...');
      speak('समझा रहे हैं'); // Audio Feedback before simplification
      
      const cleanText = simplifyText(rawText);
      
      // DEDUPLICATION: Don't read if it's the same as what we just read
      // We check if the first 30 chars are similar to avoid noise issues
      if (cleanText.slice(0, 30) === lastSpokenText.slice(0, 30)) {
        console.log('[Live] Same text detected, skipping speech.');
        setStage(STAGES.READY);
        return;
      }

      setResultText(cleanText);
      setLastSpokenText(cleanText);

      // STAGE 3: TTS
      setStage(STAGES.SPEAKING);
      setStatusMessage('🔊 सुनो...');
      setIsSpeaking(true);
      speak(
        cleanText,
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
      speak(resultText, null, () => setIsSpeaking(false));
    }
  };

  const isProcessing = [STAGES.SCANNING].includes(stage);

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

        {/* Camera (shown when ready or scanning) */}
        {[STAGES.READY, STAGES.SCANNING, STAGES.SPEAKING].includes(stage) && (
          <CameraScreen
            onPhotoTaken={handlePhotoTaken}
            isProcessing={isProcessing}
            triggerScan={triggerScan}
            autoScanEnabled={autoScanEnabled}
          />
        )}

        {/* Result text panel */}
        {resultText ? (
          <View style={styles.resultPanel}>
            <SoundWave isActive={isSpeaking} />
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
