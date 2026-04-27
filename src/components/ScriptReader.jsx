export function ScriptReader({ script, isListening }) {
  return (
    <div className="mx-4 mb-2 bg-slate-800/80 border border-indigo-500/30 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-indigo-400 font-medium uppercase tracking-wide">Read aloud</span>
        {isListening && (
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        )}
      </div>
      <p className="text-base leading-relaxed text-slate-300">{script}</p>
    </div>
  )
}
