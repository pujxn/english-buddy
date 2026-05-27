import { useState, useCallback, useEffect, useRef } from 'react'
import { ScenarioSelector } from './components/ScenarioSelector'
import { TopicSelector } from './components/TopicSelector'
import { AccentSelector } from './components/AccentSelector'
import { ConversationView } from './components/ConversationView'
import { FeedbackCard } from './components/FeedbackCard'
import { ScriptReader } from './components/ScriptReader'
import { VoiceButton } from './components/VoiceButton'
import { MicPermissionError } from './components/MicPermissionError'
import { MacVoicePrompt } from './components/MacVoicePrompt'
import { useSpeechInput } from './hooks/useSpeechInput'
import { useSpeechOutput } from './hooks/useSpeechOutput'
import { useConversation } from './hooks/useConversation'
import { TOPICS } from './data/topics'

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function App() {
  const [scenario, setScenario] = useState('free')
  const [topicId, setTopicId] = useState(TOPICS.free[0].id)
  const [accent, setAccent] = useState('american')
  const [started, setStarted] = useState(false)
  const [assistedMode, setAssistedMode] = useState(false)

  // Session timer
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!started) { setElapsed(0); return }
    const id = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [started])

  // Track Maya's last reply so the student can replay it
  const [lastMayaReply, setLastMayaReply] = useState('')

  const { messages, feedback, script, isThinking, error, sendMessage, kickoff } =
    useConversation(scenario)

  const { speak, stop, isSpeaking } = useSpeechOutput(accent)

  const handleUserSpeech = useCallback(async (text) => {
    const reply = await sendMessage(text)
    if (reply) {
      setLastMayaReply(reply)
      speak(reply)
    }
  }, [sendMessage, speak])

  const { isListening, liveText, error: micError, startListening, stopListening } =
    useSpeechInput(handleUserSpeech)

  // Reset topic to first option when mode changes
  const handleScenarioChange = (newScenario) => {
    setScenario(newScenario)
    setTopicId(TOPICS[newScenario][0].id)
  }

  // Kickoff with the selected topic's prompt when session starts
  useEffect(() => {
    if (!started) return
    const topic = TOPICS[scenario].find(t => t.id === topicId)
    kickoff(topic?.prompt).then(reply => {
      if (reply) {
        setLastMayaReply(reply)
        speak(reply)
      }
    })
  }, [started, kickoff])

  // Auto-start mic when Maya finishes speaking
  const wasSpeakingRef = useRef(false)
  useEffect(() => {
    const justFinished = wasSpeakingRef.current && !isSpeaking
    wasSpeakingRef.current = isSpeaking
    if (justFinished && !isThinking) startListening()
  }, [isSpeaking, isThinking, startListening])

  const handleMicButton = () => {
    if (isListening) stopListening()
    else startListening()
  }

  const handleRepeat = useCallback((text) => {
    stop()
    speak(text)
  }, [stop, speak])

  const apiError = error || (micError && micError !== 'not-allowed' ? micError : null)

  // ── Start screen ────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="h-dvh bg-slate-900 flex flex-col max-w-lg mx-auto">
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="text-5xl mb-4">🎙️</div>
            <h1 className="text-white text-2xl font-bold">English Buddy</h1>
            <p className="text-slate-400 text-sm">Your AI speaking coach. Pick a scenario and start practising.</p>
          </div>

          <MacVoicePrompt />
          <ScenarioSelector selected={scenario} onSelect={handleScenarioChange} />
          <TopicSelector mode={scenario} selected={topicId} onSelect={setTopicId} />
          <AccentSelector selected={accent} onSelect={setAccent} />
        </div>

        <div className="px-6 py-5 border-t border-slate-800">
          <button
            onClick={() => setStarted(true)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95
                       text-white font-semibold text-lg rounded-2xl transition-all duration-150 shadow-lg"
          >
            Start Practice
          </button>
        </div>
      </div>
    )
  }

  // ── Conversation screen ─────────────────────────────────────────────────────
  const currentTopic = TOPICS[scenario].find(t => t.id === topicId)

  return (
    <div className="h-dvh bg-slate-900 flex flex-col max-w-lg mx-auto">

      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={() => { stop(); setStarted(false) }}
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← Back
        </button>
        <div className="text-center">
          <p className="text-white font-semibold text-sm">English Buddy 🇮🇳</p>
          <p className="text-slate-400 text-xs">
            {currentTopic?.label}
            {elapsed > 0 && (
              <span className="text-slate-500"> · {formatTime(elapsed)}</span>
            )}
          </p>
        </div>
        <button
          onClick={() => setAssistedMode(m => !m)}
          className={`text-xs px-2 py-1 rounded-lg transition-colors ${
            assistedMode
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📖 Script
        </button>
      </div>

      {/* Mic permission denied — replace the conversation area */}
      {micError === 'not-allowed' ? (
        <MicPermissionError onRetry={() => startListening()} />
      ) : (
        <ConversationView
          messages={messages}
          liveText={liveText}
          isThinking={isThinking}
          onRepeat={handleRepeat}
        />
      )}

      {apiError && (
        <p className="text-center text-red-400 text-xs px-4 pb-2">⚠️ {apiError}</p>
      )}

      {assistedMode && script && (
        <ScriptReader script={script} isListening={isListening} />
      )}

      <FeedbackCard feedback={feedback} />

      {/* Footer — mic button */}
      <div className="py-5 flex flex-col items-center gap-2 border-t border-slate-800">
        <VoiceButton
          isListening={isListening}
          isSpeaking={isSpeaking}
          isThinking={isThinking}
          onClick={handleMicButton}
        />
        <p className="text-slate-500 text-xs h-4">
          {isListening ? 'Listening…' : isSpeaking ? 'Maya is speaking…' : isThinking ? 'Thinking…' : 'Tap to speak'}
        </p>
      </div>
    </div>
  )
}
