import { TOPICS } from '../data/topics'

export function TopicSelector({ mode, selected, onSelect }) {
  const topics = TOPICS[mode] || []

  return (
    <div className="w-full space-y-2">
      <p className="text-slate-400 text-xs text-center uppercase tracking-wide">Choose a scenario</p>
      <div className="grid grid-cols-2 gap-2">
        {topics.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`
              py-3 px-3 rounded-xl text-sm font-medium text-left transition-colors duration-150
              ${selected === id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
