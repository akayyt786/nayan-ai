<div align="center">
  <img src="nayan%20ai%20logo.png" alt="NayanAI Logo" width="150" height="auto" />
  <h1>👁️ NayanAI — The Eye for Learning</h1>

  <p>
    <strong>A 100% Offline, Agentic AI Reading Assistant for Visually Impaired Children</strong>
  </p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React Native](https://img.shields.io/badge/React_Native-0.83.1-61DAFB?logo=react)](https://reactnative.dev/)
  [![Offline Strategy](https://img.shields.io/badge/Architecture-100%25_Offline-blue)](#)
</div>

---

## 📖 Overview

**NayanAI** is a groundbreaking assistive educational mobile application designed to bridge the accessibility gap for visually impaired children in developing regions. It transforms standard printed Hindi and English textbooks into human-sounding, highly simplified audio—**entirely offline**. 

Operating fluidly without an internet connection, NayanAI utilizes edge-AI algorithms to guarantee privacy, eliminate latency, and make learning universally accessible regardless of geographic or financial constraints.

---

## ✨ Core Features

### 🚀 100% Offline AI Pipeline
- **Zero Internet Requirement**: Completely functional in airplane mode on day one.
- **On-Device OCR**: Ultra-fast document scanning extracting complex Devanagari blocks instantly.
- **Edge LLM Inference**: Simplifies dense academic text into easy-to-understand concepts locally using quantized LLMs.

### 🎥 Live Cinematic Mode
- **Hands-Free Auto-Scanning**: Point the camera at any book; NayanAI automatically detects the page, reads it, and prevents overlapping audio streams intelligently.
- **Premium Glassmorphism UI**: High-end "Apple Vision" style interface with atmospheric glowing gradients and cinematic video splash screens.

### 🧑‍🏫 Teacher-Like Intelligence
- **Text Simplification**: The built-in AI doesn't just read; it explains. Hard words are broken down to a child's comprehension level.
- **Native Custom Voice**: Tuned for maximum clarity, generating a patient, deep, and steady educational tone.

---

## 🛠️ Technology Stack & Dependencies

NayanAI sits at the bleeding edge of on-device AI integration within mobile ecosystems.

### **Core Framework:**
- **React Native (v0.83.1)**: The foundation of the cross-platform application.

### **Optical Character Recognition (OCR):**
- **`@react-native-ml-kit/text-recognition` (v2)**: Leverages Google's on-device ML Kit directly via native bindings for rapid, highly-accurate text extraction (specifically hardened for Hindi).
- **`react-native-image-resizer`**: Dynamically adjusts camera contrast and scales down megapixels prior to OCR inference for processing speed optimizations on budget Android phones.

### **Large Language Model (LLM) — Text Simplification:**
- **`@runanywhere/llamacpp` (v0.18.1)**: The core engine powering offline text comprehension.
- **Model Used**: **SmolLM2-135M** (Quantized). A highly efficient, locally-run Small Language Model that rewrites dense textbook paragraphs into conversational, child-friendly explanations. 

### **Text-to-Speech (TTS):**
- **Custom Local ONNX VITS Pipeline**: NayanAI relies on a native Kotlin bridge connecting to `onnxruntime-react-native`. It runs specialized Hindi acoustic models (`model.onnx` / `config.json`) natively without requiring the standard Android TTS.

### **Hardware & UI:**
- **`react-native-vision-camera` (v4.7.3)**: High-performance camera architecture utilizing Frame Processors.
- **`react-native-video`**: Powers the 1080p offline cinematic splash intro execution.
- **`react-native-linear-gradient`**: Multi-stop atmospheric rendering.

---

## 📦 Getting Started / Installation Guide

Follow these steps to build and run NayanAI on your local machine.

### **1. System Requirements**
Ensure your development environment is fully prepared for React Native:

- **Node.js**: v18 or higher (`node -v`)
- **Java Development Kit (JDK)**: Version 17 is strictly required for React Native 0.83+
- **Android Studio**: Install the **Android SDK (API 34)**, **Android NDK**, and **CMake**.
- *(macOS Only)* **Watchman**: `brew install watchman`
- *(macOS Only)* **Ruby**: Required for macOS environments.

### **2. Verify Environment Health**
Before proceeding, use the official "doctor" command to verify your React Native environment is correctly configured:
```bash
npx react-native doctor
```
*Fix any missing Android SDK dependencies or path variables (like `ANDROID_HOME`) flagged by the doctor before continuing.*

### **3. Clone the Repository**
```bash
git clone https://github.com/akayyt786/nayan-ai.git
cd nayan-ai/nayan-ai
```

### **4. Install Core Packages & Dependencies**
This project relies on heavy native modules (ML Kit, VisionCamera, ONNX). Clean install all Node packages:
```bash
npm install
```

### **5. Inject Offline AI Weights (Critical)**
Because NayanAI operates 100% offline, the raw AI model weights **must** be manually placed in the Android assets folder before compiling.

1. **TTS Model**:
   Download your preferred VITS ONNX weights and place them here:
   `android/app/src/main/assets/tts_model/model.onnx`
   `android/app/src/main/assets/tts_model/config.json`

2. **LLM Model (Text Simplification)**:
   The application uses **SmolLM2-135M** (Quantized `.gguf` format) via `@runanywhere/llamacpp`.
   *(Download the SmolLM2 `.gguf` file to your local device/emulator storage so the app can access it locally without internet.)*

### **6. Build and Run the Application**
Compile the Native C++ AI libraries and launch the app:

**Terminal 1:** Start the Metro Bundler
```bash
npm run start
```
*(Optionally, press `a` in this terminal to launch Android directly)*

**Terminal 2:** Build and install the Android App
```bash
npm run android
```
*(Note: Initial Gradle builds will take 5-10 minutes due to the massive compilation of the on-device C++ LLM and ONNX runtimes. Be patient!)*

---

## 🧠 System Architecture Flow

```text
📸 Vision Camera (Captures Frame)
       ↓
🖼️ Image Resizer (Compress & Enhance Edge Contrast)
       ↓
🔍 ML Kit OCR (Extracts raw Hindi/English text blocks)
       ↓
🤖 SmolLM2 LLM via Llama.cpp (Translates & Simplifies text into child logic)
       ↓
🔊 Local ONNX TTS Engine (Synthesizes deep, natural, offline audio)
```

---

## 🤝 Project Origin & Mission
*Built and engineered to eradicate educational borders. NayanAI believes that vision impairments and lack of internet infrastructure should never be a wall to a child's fundamental right to learn and explore literature.*

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
