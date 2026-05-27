import { useState, useEffect } from 'react'

const DISMISSED_KEY = 'eb_mac_voice_prompt_dismissed'

function isMacWithNoNetworkVoices() {
  const isMac = /Mac/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent)
  if (!isMac) return false
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return false // not loaded yet — wait for voiceschanged
  return !voices.some(v => !v.localService && v.lang.startsWith('en'))
}

export function MacVoicePrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return

    const check = () => {
      if (isMacWithNoNetworkVoices()) setShow(true)
    }

    check() // voices may already be loaded
    window.speechSynthesis.addEventListener('voiceschanged', check)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', check)
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="bg-slate-800 border border-indigo-800/50 rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-white text-sm font-semibold">🎙️ Better voice available on your Mac</p>
        <button
          onClick={dismiss}
          className="text-slate-500 hover:text-white text-xl leading-none shrink-0 -mt-0.5"
        >
          ×
        </button>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed">
        Your Mac has a free Enhanced voice that makes Maya sound much more natural.
        One-time setup, takes about 2 minutes:
      </p>

      <ol className="text-xs space-y-1.5">
        <li className="text-slate-300">
          1. Open <span className="text-white font-medium">System Settings → Accessibility → Spoken Content</span>
        </li>
        <li className="text-slate-300">
          2. Click <span className="text-white font-medium">System Voice → Manage Voices</span>
        </li>
        <li className="text-slate-300">
          3. Find <span className="text-white font-medium">Fiona Enhanced</span> and download it (or any other English voice with a ⬇️ icon)
        </li>
        <li className="text-slate-300">
          4. Reload this page — Maya will sound noticeably better
        </li>
      </ol>

      <button
        onClick={dismiss}
        className="w-full py-2 bg-slate-700 hover:bg-slate-600 active:scale-95
                   text-white text-xs font-medium rounded-xl transition-all"
      >
        Got it, don't show again
      </button>
    </div>
  )
}
