interface AiRateGaugeProps {
  rate: number
}

export default function AiRateGauge({ rate }: AiRateGaugeProps) {
  const normalizedRate = Math.min(Math.max(rate, 0), 100)
  const color = normalizedRate < 30 ? '#059669' : normalizedRate < 60 ? '#F97316' : '#DC2626'
  const label = normalizedRate < 30 ? 'LOW' : normalizedRate < 60 ? 'WATCH' : 'HIGH'

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.28em] text-slate-500 uppercase">AI Signal</span>
        <span className="rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white uppercase" style={{ backgroundColor: color }}>
          {label}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-7xl font-bold tracking-[-0.08em] text-slate-950" style={{ fontFamily: 'Fira Code, monospace' }}>
          {Math.round(normalizedRate)}
        </span>
        <span className="pb-3 text-sm font-bold" style={{ color }}>/100</span>
      </div>
      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${normalizedRate}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
