/**
 * The main mic button. Large for easy tapping on mobile.
 * Pulses when listening, shows stop icon when active.
 */
export function VoiceButton({ isListening, isSpeaking, isThinking, onClick }) {
  const disabled = isSpeaking || isThinking

  let label = 'Tap to speak'
  if (isListening) label = 'Listening... tap to stop'
  if (isSpeaking) label = 'Claude is speaking...'
  if (isThinking) label = 'Thinking...'

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl
          transition-all duration-200 shadow-lg
          ${isListening
            ? 'bg-red-500 animate-pulse scale-110'
            : disabled
              ? 'bg-slate-600 opacity-50 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-400 active:scale-95'
          }
        `}
        aria-label={label}
      >
        {isListening ? '⏹' : '🎙'}
      </button>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  )
}
