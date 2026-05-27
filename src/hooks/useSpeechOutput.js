import { useState, useCallback, useEffect, useRef } from 'react'

const ACCENT_LANGS = {
  indian:     ['en-IN', 'en-GB', 'en-US'],
  american:   ['en-US'],
  british:    ['en-GB'],
  australian: ['en-AU', 'en-GB', 'en-US'],
}

// Ordered preference list of known high-quality voice names per accent.
// Chrome (desktop/Android) has Google voices; iOS has Apple voices.
const PREFERRED_NAMES = {
  american:   ['Google US English', 'Samantha', 'Karen'],
  british:    ['Google UK English Female', 'Google UK English Male', 'Daniel', 'Martha'],
  australian: ['Google Australian English', 'Karen'],
  indian:     ['Google UK English Female', 'Samantha'],   // en-IN is robotic — use a better fallback
}

function getPreferredVoice(accent) {
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  // 1. Try exact name matches first (best quality, platform-specific)
  const preferred = PREFERRED_NAMES[accent] || PREFERRED_NAMES.american
  for (const name of preferred) {
    const v = voices.find(v => v.name === name)
    if (v) return v
  }

  // 2. Try matching lang + non-local (Google/Apple network voices)
  const langs = ACCENT_LANGS[accent] || ['en-US']
  for (const lang of langs) {
    const v = voices.find(v => v.lang === lang && !v.localService)
    if (v) return v
  }

  // 3. Try matching lang (any voice for that locale)
  for (const lang of langs) {
    const v = voices.find(v => v.lang === lang)
    if (v) return v
  }

  // 4. Any English non-local voice
  return (
    voices.find(v => v.lang.startsWith('en') && !v.localService) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null
  )
}

function normalizeText(text) {
  return text
    .replace(/!/g, '.')
    .replace(/[,;:\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function makeUtterance(text, voice, lang) {
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = 0.92
  u.pitch = 1
  if (voice) u.voice = voice
  return u
}

export function useSpeechOutput(accent = 'american') {
  const [isSpeaking, setIsSpeaking] = useState(false)
  // Track whether voices have loaded so speak() always gets a fresh list
  const voicesReadyRef = useRef(false)

  useEffect(() => {
    const load = () => { voicesReadyRef.current = true }
    // Voices may already be available (Firefox, some Chrome versions)
    if (window.speechSynthesis.getVoices().length) {
      voicesReadyRef.current = true
    }
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel()

    const lang = (ACCENT_LANGS[accent] || ['en-US'])[0]
    const voice = getPreferredVoice(accent)
    const u = makeUtterance(normalizeText(text), voice, lang)
    u.onstart = () => setIsSpeaking(true)
    u.onend   = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(u)
  }, [accent])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}
