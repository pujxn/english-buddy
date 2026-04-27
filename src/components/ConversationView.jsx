import { useEffect, useRef } from 'react'
import { LoadingDots } from './LoadingDots'

/**
 * Scrollable chat view. User messages on the right, Claude on the left.
 * liveText shows the real-time transcription while the user is still speaking.
 */
export function ConversationView({ messages, liveText, isThinking }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

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
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.role === 'assistant' && (
            <span className="text-xs text-indigo-400 self-end mb-1 mr-2 shrink-0">Maya</span>
          )}
          <div
            className={`
              max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
              ${msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-sm'
                : 'bg-slate-700 text-slate-100 rounded-bl-sm'
              }
            `}
          >
            {msg.content}
          </div>
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
