import { cn } from '../lib/utils'

interface RewritePanelProps {
  language: string
  style: string
  targetRate: number
  onStyleChange: (style: string) => void
  onTargetRateChange: (rate: number) => void
  onRewrite: () => void
  loading: boolean
  disabled?: boolean
}

const styles = [
  { id: 'conversational', zh: '口语', en: 'Casual' },
  { id: 'academic', zh: '学术', en: 'Academic' },
  { id: 'journalistic', zh: '新闻', en: 'Journalistic' },
  { id: 'humorous', zh: '幽默', en: 'Humorous' },
]

export default function RewritePanel({
  language, style, targetRate,
  onStyleChange, onTargetRateChange, onRewrite, loading, disabled
}: RewritePanelProps) {
  const isZh = language === 'zh'

  return (
    <section id="rewrite-panel" className="pt-6">
      <div className={cn(
        'rounded-[2rem] border p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-6 transition-opacity duration-300',
        disabled ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-950'
      )}>
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-orange-300 uppercase">
              {isZh ? '改写控制台' : 'Rewrite Console'}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl" style={{ fontFamily: 'Fira Code, monospace' }}>
              {isZh ? '设定目标，压低 AI 痕迹。' : 'Set target, reduce AI traces.'}
            </h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
            <p className="text-[10px] font-bold tracking-[0.24em] text-blue-200 uppercase">Target</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Fira Code, monospace' }}>{targetRate}%</p>
          </div>
        </div>

        {disabled && (
          <div className="mb-5 rounded-[1.25rem] border border-slate-600/50 bg-slate-800/60 px-5 py-3 text-center">
            <p className="text-sm font-medium text-slate-300">
              {isZh ? '🔒 请先完成上方文本检测，激活改写功能' : '🔒 Complete the text detection above to unlock rewriting'}
            </p>
          </div>
        )}

        <div className={cn('grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]', disabled && 'pointer-events-none opacity-40')}>
          <div>
            <label className="mb-3 block text-[10px] font-bold tracking-[0.24em] text-slate-300 uppercase">
              {isZh ? '改写风格' : 'Rewrite Style'}
            </label>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onStyleChange(s.id)}
                  className={cn(
                    'cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400',
                    style === s.id
                      ? 'border-orange-300 bg-orange-400 text-slate-950 shadow-lg shadow-orange-500/20'
                      : 'border-white/10 bg-white/[0.06] text-slate-200 hover:border-blue-300 hover:bg-blue-500/10'
                  )}
                >
                  <span className="block text-[10px] font-bold tracking-[0.18em] uppercase opacity-70">{s.id}</span>
                  <span className="mt-2 block text-lg font-bold">{isZh ? s.zh : s.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
            <label className="mb-4 block text-[10px] font-bold tracking-[0.24em] text-slate-300 uppercase">
              {isZh ? '目标 AI 率' : 'Target AI Rate'}
            </label>
            <input
              type="range"
              min={5}
              max={60}
              value={targetRate}
              onChange={(e) => onTargetRateChange(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-orange-400"
            />
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>5%</span>
              <span>60%</span>
            </div>
            <button
              onClick={onRewrite}
              disabled={loading || disabled}
              className={cn(
                'mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-full px-6 py-3 text-sm font-bold tracking-[0.18em] uppercase transition-all duration-200',
                'bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600',
                'disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
              )}
            >
              {loading
                ? (isZh ? '改写中...' : 'Rewriting...')
                : (isZh ? '执行改写' : 'Run Rewrite')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
