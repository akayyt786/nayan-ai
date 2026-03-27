# 👁️ NayanAI — The Eye for Learning

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Production](https://img.shields.io/badge/Status-Production-success.svg)](#)
[![Offline: 100%](https://img.shields.io/badge/Offline-100%25-blue.svg)](#)

**NayanAI** is a groundbreaking assistive technology application designed for visually impaired children. It transforms printed textbooks into simplified, natural-sounding speech—entirely **offline**. Built to bridge the educational gap, NayanAI empowers children to learn independently without needing an internet connection.

---

## ✨ Key Features

### 🚀 100% Offline Pipeline
- **Zero Internet Requirement**: Works in airplane mode on day one.
- **On-Device OCR**: Uses high-speed ML Kit technology for local text extraction.
- **Native VITS TTS**: Features a custom, high-quality natural voice engine (via ONNX Runtime).

### 📖 Live Mode (Auto-Reading)
- **Hands-Free Experience**: Point the camera at a book, and the app automatically detects and reads the text every 4 seconds.
- **Smart Deduplication**: The app remembers what it just read and won't repeat itself unless the page changes.

### 🧑‍🏫 Child-Friendly Intelligence
- **Text Simplification**: Automatically simplifies complex textbook language into easy-to-understand sentences for children.
- **Deep Male Voice**: Tuned for maximum clarity with a deep, steady pitch (0.8) to aid concentration.

### ♿ Accessibility First
- **High-Contrast UI**: Designed for low-vision users and teachers.
- **Haptic Feedback**: High-response vibration for successful captures.
- **Audio Guidance**: Voice prompts guide the user through every stage (Scanning, Reading, Explaining).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React Native (0.83+) |
| **OCR Engine** | Google ML Kit (Native Android) |
| **Inference Engine** | ONNX Runtime (Native Kotlin Bridge) |
| **TTS Model** | Custom VITS / Coqui (TTS Model) |
| **Simplification** | Rule-based Local NLP Engine |
| **Camera** | Vision Camera v4 |

---

## 📦 Prerequisites

- **Android Device**: Android 8.0+ (Oreo) or higher.
- **TTS Model Files**: 
  - Place `model.onnx` and `config.json` in: `android/app/src/main/assets/tts_model/`

---

## 🛠️ Performance Highlights
- **OCR Latency**: <500ms on budget devices.
- **Audio Caching**: Instant playback for repeated text using hash-based caching.
- **Optimized Image Processing**: Resizes images for maximum speed without losing accuracy.

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Project Origin
*Built for the visual empowerment of children in underprivileged regions where internet access is limited but learning is a priority.*
