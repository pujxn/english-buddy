const SCENARIOS = [
  { id: 'free', label: 'Free Talk', icon: '💬' },
  { id: 'interview', label: 'Interview', icon: '💼' },
  { id: 'workplace', label: 'Workplace', icon: '🏢' },
]

/**
 * Lets the student pick a conversation mode before starting.
 */
export function ScenarioSelector({ selected, onSelect }) {
  return (
    <div className="flex gap-2 px-4">
      {SCENARIOS.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`
            flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium
            transition-colors duration-150
            ${selected === id
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }
          `}
        >
          <span className="text-lg">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}
