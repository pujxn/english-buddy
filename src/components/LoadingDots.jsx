/**
 * Animated "..." indicator shown while Claude is thinking.
 * Three dots that fade in/out in sequence — less jarring than a spinner.
 */
export function LoadingDots() {
  return (
    <div className="flex items-center gap-1 px-1" aria-label="Loading">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}
