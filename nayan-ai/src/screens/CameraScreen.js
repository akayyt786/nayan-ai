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

      {/* Visual guidance for visually impaired users */}
      {!isProcessing && (
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceText}>📸 Move closer</Text>
          <Text style={styles.guidanceText}>📍 Hold steady</Text>
          <Text style={styles.guidanceText}>💡 Good lighting</Text>
          {autoScanEnabled && (
            <Text style={[styles.guidanceText, styles.liveBadge]}>● LIVE MODE</Text>
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
    top: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(26,60,107,0.7)',
    padding: 12,
    borderRadius: 12,
  },
  guidanceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  liveBadge: {
    color: '#00ff00',
    marginTop: 8,
    fontSize: 14,
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
