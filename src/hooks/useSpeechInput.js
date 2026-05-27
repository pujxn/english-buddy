import { useState, useRef, useCallback } from 'react'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

export function useSpeechInput(onFinalResult) {
  const [isListening, setIsListening] = useState(false)
  const [liveText, setLiveText] = useState('')
  const [error, setError] = useState(null)

  const accumulatedRef  = useRef('')
  const sessionActiveRef = useRef(false) // true while user wants mic open
  const submittedRef    = useRef(false)  // prevents double-submission
  const restartingRef   = useRef(false)  // true while we're killing old session to start a new one
  const recognitionRef  = useRef(null)

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported. Please use Chrome.')
      return
    }

    // If a session is already running, mark as restarting so the old onend is ignored
    if (recognitionRef.current) {
      restartingRef.current = true
      sessionActiveRef.current = false
      recognitionRef.current.stop()
    }

    accumulatedRef.current = ''
    sessionActiveRef.current = true
    submittedRef.current = false
    setLiveText('')
    setError(null)

    const spawn = () => {
      const rec = new SpeechRecognition()
      rec.lang = 'en-US'
      rec.continuous = false
      rec.interimResults = true

      rec.onstart = () => {
        restartingRef.current = false  // new session is live — restart complete
        setIsListening(true)
      }

      rec.onresult = (event) => {
        let interim = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            accumulatedRef.current += event.results[i][0].transcript + ' '
          } else {
            interim = event.results[i][0].transcript
          }
        }
        setLiveText(accumulatedRef.current + interim)
      }

      rec.onerror = (event) => {
        if (event.error === 'no-speech') return
        if (event.error === 'aborted')   return  // programmatic stop — not a real error
        if (restartingRef.current)       return  // transient errors during mic handoff — ignore
        setError(event.error)
        sessionActiveRef.current = false
        setIsListening(false)
      }

      rec.onend = () => {
        // If we're in the middle of a restart, the old instance's onend fires here — ignore it
        if (restartingRef.current) return

        if (sessionActiveRef.current) {
          // Chrome auto-ended on a pause — spawn a fresh instance to keep listening
          const next = spawn()
          recognitionRef.current = next
          next.start()
        } else {
          // User explicitly stopped — submit once
          if (!submittedRef.current) {
            submittedRef.current = true
            setIsListening(false)
            setLiveText('')
            const final = accumulatedRef.current.trim()
            if (final) onFinalResult(final)
          }
        }
      }

      return rec
    }

    const rec = spawn()
    recognitionRef.current = rec
    rec.start()
  }, [onFinalResult])

  const stopListening = useCallback(() => {
    sessionActiveRef.current = false  // must be set before .stop() so onend sees it
    recognitionRef.current?.stop()
  }, [])

  return { isListening, liveText, error, startListening, stopListening }
}
