import { useEffect, useRef } from 'react'
import { LoadingDots } from './LoadingDots'

/**
 * Scrollable chat view. User messages on the right, Maya on the left.
 * The last Maya message gets a 🔊 Repeat button.
 */
export function ConversationView({ messages, liveText, isThinking, onRepeat }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // Index of the last assistant message — only that one gets the repeat button
  const lastAssistantIdx = messages.reduce(
    (acc, msg, i) => (msg.role === 'assistant' ? i : acc),
    -1
  )

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
      {messages.length === 0 && (
        <p className="text-center text-slate-500 mt-16 text-sm px-8">
          Select a mode above, then tap the mic to start speaking.
        </p>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'flex-col items-start'}`}
        >
          {msg.role === 'assistant' ? (
            <>
              <div className="flex items-end gap-2">
                <span className="text-xs text-indigo-400 mb-1 shrink-0">Maya</span>
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm
                                leading-relaxed bg-slate-700 text-slate-100">
                  {msg.content}
                </div>
              </div>

              {/* Repeat button — only on the last Maya message */}
              {i === lastAssistantIdx && !isThinking && onRepeat && (
                <button
                  onClick={() => onRepeat(msg.content)}
                  className="ml-10 mt-1 text-xs text-slate-500 hover:text-indigo-400
                             transition-colors flex items-center gap-1"
                >
                  🔊 <span>Repeat</span>
                </button>
              )}
            </>
          ) : (
            <div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3 text-sm
                            leading-relaxed bg-indigo-600 text-white">
              {msg.content}
            </div>
          )}
        </div>
      ))}

      {/* Live transcription while user is still speaking */}
      {liveText && (
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-3 text-sm
                          bg-indigo-500/40 text-indigo-200 italic">
            {liveText}
          </div>
        </div>
      )}

      {/* Thinking indicator */}
      {isThinking && (
        <div className="flex justify-start items-end gap-2">
          <span className="text-xs text-indigo-400 mb-1">Maya</span>
          <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-3">
            <LoadingDots />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
