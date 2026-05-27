export function MicPermissionError({ onRetry }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-6">
      <div className="text-6xl">🎙️</div>
      <div className="space-y-2">
        <h2 className="text-white text-xl font-bold">Microphone access blocked</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          English Buddy needs your mic to hear you speak.
          You've blocked it — here's how to fix it.
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-5 text-left w-full space-y-3">
        <p className="text-slate-300 text-sm font-semibold">On Chrome Android:</p>
        <ol className="text-slate-400 text-sm space-y-2">
          <li>1. Tap the 🔒 lock icon in the address bar</li>
          <li>2. Tap <span className="text-white font-medium">Permissions</span></li>
          <li>3. Set <span className="text-white font-medium">Microphone</span> to Allow</li>
          <li>4. Reload the page and try again</li>
        </ol>
      </div>

      <button
        onClick={onRetry}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95
                   text-white font-semibold rounded-2xl transition-all duration-150"
      >
        Try again
      </button>
    </div>
  )
}
