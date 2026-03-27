package ai.runanywhere.starter

import android.media.MediaPlayer
import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.*
import java.io.File
import java.util.*
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class LocalTTSModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), TextToSpeech.OnInitListener {

    private val executorService: ExecutorService = Executors.newSingleThreadExecutor()
    private var systemTTS: TextToSpeech? = null
    private var isSystemTTSReady = false

    init {
        systemTTS = TextToSpeech(reactContext, this)
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val locale = Locale("hi", "IN")
            systemTTS?.language = locale
            
            // Try to find a Male voice
            try {
                val voices = systemTTS?.voices
                val maleVoice = voices?.find { 
                    it.locale == locale && it.name.lowercase().contains("male") 
                }
                if (maleVoice != null) {
                    systemTTS?.voice = maleVoice
                }
            } catch (e: Exception) {
                // Ignore voice selection errors
            }

            systemTTS?.setPitch(0.8f)      // Deeper voice
            systemTTS?.setSpeechRate(0.85f) // Slightly slower/clearer
            isSystemTTSReady = true
        }
    }

    override fun getName() = "LocalTTS"

    @ReactMethod
    fun speak(text: String, promise: Promise) {
        // Run inference and playback in a background thread to avoid blocking the UI
        executorService.execute {
            try {
                // Step 1: Check cache or generate audio file from text
                val audioPath = getOrGenerateAudio(text)
                val audioFile = File(audioPath)

                if (!audioFile.exists()) {
                    // FALLBACK: Use Android System TTS if custom model is missing
                    if (isSystemTTSReady) {
                        systemTTS?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "local_tts_id")
                        promise.resolve("played_system_fallback")
                    } else {
                        promise.reject("TTS_ERROR", "System TTS not ready and custom model missing")
                    }
                    return@execute
                }

                // Step 2: Play audio using MediaPlayer
                val player = MediaPlayer()
                try {
                    player.setDataSource(audioPath)
                    player.prepare()
                    player.setOnCompletionListener {
                        it.release()
                        promise.resolve("played")
                    }
                    player.start()
                } catch (playError: Exception) {
                    player.release()
                    promise.reject("PLAYBACK_ERROR", playError.localizedMessage)
                }
            } catch (e: Exception) {
                promise.reject("TTS_ERROR", e.localizedMessage, e)
            }
        }
    }

    private fun getOrGenerateAudio(text: String): String {
        // Use hash of text for simple caching
        val fileName = "${text.hashCode()}.wav"
        val cacheFile = File(reactApplicationContext.cacheDir, fileName)

        // If file exists, reuse it (Caching)
        if (cacheFile.exists()) {
            return cacheFile.absolutePath
        }

        // TODO: Replace this placeholder with real ONNX inference
        // 1. Load ONNX model from assets/tts_model/model.onnx
        // 2. Tokenize Hindi text
        // 3. Run ONNX Session
        // 4. Save PCM output to cacheFile as WAV
        
        // Return placeholder for now (User must implement the ONNX core)
        return cacheFile.absolutePath
    }
}
