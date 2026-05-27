import { useState, useRef, useCallback } from 'react'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

export function useSpeechInput(onFinalResult) {
  const [isListening, setIsListening] = useState(false)
  const [liveText, setLiveText] = useState('')
  const [error, setError] = useState(null)

  const accumulatedRef = useRef('')
  const sessionActiveRef = useRef(false) // true while user wants mic open
  const submittedRef = useRef(false)     // prevents double-submission on race
  const recognitionRef = useRef(null)

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported. Please use Chrome.')
      return
    }

    // Stop any existing session first
    sessionActiveRef.current = false
    recognitionRef.current?.stop()

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

      rec.onstart = () => setIsListening(true)

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
        if (event.error === 'aborted') return  // fired when .stop() is called programmatically — not a real error
        setError(event.error)
        sessionActiveRef.current = false
        setIsListening(false)
      }

      rec.onend = () => {
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
