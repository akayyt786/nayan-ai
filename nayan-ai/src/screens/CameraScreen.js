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
  Vibration,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function CameraScreen({ onPhotoTaken, isProcessing, triggerScan, autoScanEnabled }) {
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  // Respond to Auto-Scan triggers from App.js
  React.useEffect(() => {
    if (triggerScan > 0 && !isTakingPhoto && !isProcessing) {
      takePhoto();
    }
  }, [triggerScan]);

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
      Vibration.vibrate(100);
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

      {/* Premium Guidance Overlays - Glass style */}
      {!isProcessing && (
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceText}>📸 Move closer to text</Text>
          <Text style={styles.guidanceText}>📍 Hold phone steady</Text>
          <Text style={styles.guidanceText}>💡 Good lighting required</Text>
          {autoScanEnabled && (
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE MONITORING</Text>
            </View>
          )}
        </View>
      )}

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
  guidanceContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Glassmorphism
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  guidanceText: {
    color: '#1A3C6B',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff00',
    marginRight: 6,
  },
  liveText: {
    color: '#006400',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  hint: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  scanButton: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15, // Glowing effect
  },
  scanButtonDisabled: {
    opacity: 0.3,
  },
  scanButtonText: {
    fontSize: 32,
  },
});
