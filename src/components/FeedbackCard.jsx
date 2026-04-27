/**
 * Shows per-turn feedback after each student response.
 * Displays: fluency score, grammar fix, vocabulary suggestion, filler words, overall tip.
 */
export function FeedbackCard({ feedback }) {
  if (!feedback) return null

  const { grammar, vocabulary, fillerWords, fluencyScore, overall } = feedback

  const scoreColor =
    fluencyScore >= 8 ? 'text-emerald-400' :
    fluencyScore >= 5 ? 'text-amber-400' :
    'text-red-400'

  return (
    <div className="mx-4 mb-2 bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3 text-sm">

      {/* Fluency score bar */}
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-xs w-14 shrink-0">Fluency</span>
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${(fluencyScore / 10) * 100}%` }}
          />
        </div>
        <span className={`text-base font-bold w-8 text-right ${scoreColor}`}>
          {fluencyScore}
        </span>
      </div>

      {/* Grammar fix */}
      {grammar && (
        <div className="space-y-1">
          <p className="text-red-400 text-xs font-medium uppercase tracking-wide">Grammar</p>
          <p className="text-slate-300">
            <span className="line-through text-slate-500">{grammar.issue}</span>
            {grammar.correction && (
              <> → <span className="text-emerald-400">{grammar.correction}</span></>
            )}
          </p>
          {grammar.tip && <p className="text-slate-400 text-xs">{grammar.tip}</p>}
        </div>
      )}

      {/* Vocabulary suggestion */}
      {vocabulary && (
        <div className="space-y-1">
          <p className="text-blue-400 text-xs font-medium uppercase tracking-wide">Better Word</p>
          <p className="text-slate-300">{vocabulary.suggestion}</p>
          {vocabulary.example && (
            <p className="text-slate-400 text-xs italic">e.g. "{vocabulary.example}"</p>
          )}
        </div>
      )}

      {/* Filler words */}
      {fillerWords.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-amber-400 text-xs font-medium uppercase tracking-wide">Filler words:</span>
          {fillerWords.map(w => (
            <span key={w} className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full">
              {w}
            </span>
          ))}
        </div>
      )}

      {/* Overall */}
      {overall && (
        <p className="text-slate-300 border-t border-slate-700 pt-3 leading-snug">
          {overall}
        </p>
      )}
    </div>
  )
}
