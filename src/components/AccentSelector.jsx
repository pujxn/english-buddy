const ACCENTS = [
  { id: 'indian',     label: 'Indian',     flag: '🇮🇳' },
  { id: 'american',   label: 'American',   flag: '🇺🇸' },
  { id: 'british',    label: 'British',    flag: '🇬🇧' },
  { id: 'australian', label: 'Australian', flag: '🇦🇺' },
]

export function AccentSelector({ selected, onSelect }) {
  return (
    <div className="w-full space-y-2">
      <p className="text-slate-400 text-xs text-center uppercase tracking-wide">Coach accent</p>
      <div className="flex gap-2">
        {ACCENTS.map(({ id, label, flag }) => (
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
            <span className="text-lg">{flag}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
