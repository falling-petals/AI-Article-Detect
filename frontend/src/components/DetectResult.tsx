import { ArrowRight, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react'
import type { DetectResponse } from '../api/index'
import AiRateGauge from './AiRateGauge'
import { cn } from '../lib/utils'

interface DetectResultProps {
  result: DetectResponse
  language: string
  onRewrite: () => void
  onReset: () => void
  loading: boolean
}

export default function DetectResult({ result, language, onRewrite, onReset, loading }: DetectResultProps) {
  const isZh = language === 'zh'
  const segments = result.segments ?? []
  const aiSegments = segments.filter(s => s.isAi).length
  const humanSegments = segments.length - aiSegments

  return (
    <section className="pt-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur sm:p-6">
        <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-blue-700 uppercase">
              {isZh ? '检测报告' : 'Audit Report'}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-950 sm:text-4xl" style={{ fontFamily: 'Fira Code, monospace' }}>
              {isZh ? '证据已经标注' : 'Evidence is marked'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-[10px] font-bold tracking-[0.24em] text-red-600 uppercase">AI</p>
              <p className="text-2xl font-bold text-slate-950" style={{ fontFamily: 'Fira Code, monospace' }}>{aiSegments}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-[10px] font-bold tracking-[0.24em] text-emerald-700 uppercase">Human</p>
              <p className="text-2xl font-bold text-slate-950" style={{ fontFamily: 'Fira Code, monospace' }}>{humanSegments}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <AiRateGauge rate={result.aiRate} />
            <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-5">
              <p className="text-[10px] font-bold tracking-[0.24em] text-blue-700 uppercase">
                {isZh ? '摘要' : 'Summary'}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="space-y-3">
          {segments.map((seg, i) => (
            <article
              key={i}
              className={cn(
                'rounded-2xl border p-4 transition-colors duration-200',
                seg.isAi
                  ? 'border-red-200 bg-red-50/80 hover:border-red-300'
                  : 'border-emerald-200 bg-emerald-50/70 hover:border-emerald-300'
              )}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {seg.isAi ? <ShieldAlert className="h-4 w-4 text-red-600" /> : <ShieldCheck className="h-4 w-4 text-emerald-700" />}
                  <span className={cn(
                    'text-[10px] font-bold uppercase tracking-[0.22em]',
                    seg.isAi ? 'text-red-700' : 'text-emerald-800'
                  )}>
                    {seg.isAi ? 'AI Risk' : 'Human Signal'}
                  </span>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600">
                  {Math.round(seg.confidence)}% confidence
                </span>
              </div>
              <p className="text-base leading-8 text-slate-900">
                {seg.text}
              </p>
              {seg.reason && (
                <p className="mt-3 border-t border-slate-900/10 pt-3 text-sm leading-6 text-slate-600">{seg.reason}</p>
              )}
            </article>
          ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={onRewrite}
            disabled={loading}
            className={cn(
              'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-[0.18em] uppercase transition-all duration-200',
              'bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700',
              'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            )}
          >
            {isZh ? '进入改写控制台' : 'Open Rewrite Console'}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onReset}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-xs font-bold tracking-[0.18em] text-slate-600 uppercase transition-colors duration-200 hover:border-slate-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <RotateCcw className="h-4 w-4" />
            {isZh ? '重置' : 'Reset'}
          </button>
        </div>
      </div>
    </section>
  )
}
