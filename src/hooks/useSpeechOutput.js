import { useState, useCallback, useEffect } from 'react'

const ACCENT_LANGS = {
  indian:     ['en-IN'],
  american:   ['en-US'],
  british:    ['en-GB'],
  australian: ['en-AU'],
}

function normalizeText(text) {
  return text
    .replace(/!/g, '.')
    .replace(/[,;:\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getPreferredVoice(accent) {
  const voices = window.speechSynthesis.getVoices()
  const langs = ACCENT_LANGS[accent] || ACCENT_LANGS.american

  for (const lang of langs) {
    const match =
      voices.find(v => v.lang === lang && !v.localService) ||
      voices.find(v => v.lang === lang)
    if (match) return match
  }

  // Fallback: any natural-sounding English voice
  return (
    voices.find(v => v.name === 'Google US English') ||
    voices.find(v => v.lang.startsWith('en') && !v.localService) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null
  )
}

function makeUtterance(text, voice, lang) {
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = 0.95
  u.pitch = 1
  if (voice) u.voice = voice
  return u
}

export function useSpeechOutput(accent = 'american') {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    window.speechSynthesis.getVoices() // trigger async voice load in Chrome
  }, [])

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel()

    const lang = (ACCENT_LANGS[accent] || ['en-US'])[0]
    const voice = getPreferredVoice(accent)
    const u = makeUtterance(normalizeText(text), voice, lang)
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }, [accent])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
