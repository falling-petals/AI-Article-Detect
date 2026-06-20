import { ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { RewriteResponse } from '../api/index'

interface RewriteResultProps {
  result: RewriteResponse
  originalText: string
  language: string
}

const styleNames: Record<string, { zh: string; en: string }> = {
  conversational: { zh: '口语化', en: 'Casual' },
  academic: { zh: '学术严谨', en: 'Academic' },
  journalistic: { zh: '新闻风格', en: 'Journalistic' },
  humorous: { zh: '幽默', en: 'Humorous' },
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      style={{ fontFamily: 'Fira Code, monospace' }}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          {label}
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          {label}
        </>
      )}
    </button>
  )
}

export default function RewriteResult({ result, originalText, language }: RewriteResultProps) {
  const isZh = language === 'zh'
  const styleInfo = styleNames[result.rewriteStyle] || { zh: '口语化', en: 'Casual' }

  return (
    <section className="pt-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-6">
        <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-blue-700 uppercase">
              {isZh ? '改写结果' : 'Rewrite Result'}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-950 sm:text-4xl" style={{ fontFamily: 'Fira Code, monospace' }}>
              {isZh ? '对照稿已经生成' : 'Comparison draft ready'}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-2xl font-bold text-slate-950" style={{ fontFamily: 'Fira Code, monospace' }}>{Math.round(result.originalAiRate)}</span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
            <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Fira Code, monospace' }}>{Math.round(result.rewrittenAiRate)}</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-blue-700 uppercase">
              {isZh ? styleInfo.zh : styleInfo.en}
            </span>
          </div>
        </div>

        <div className="mb-6 grid gap-5 lg:grid-cols-2">
          <div className="relative rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center">
              <h3 className="text-[10px] font-bold tracking-[0.24em] text-slate-500 uppercase">
                {isZh ? '原文' : 'Original'}
              </h3>
              <CopyButton text={originalText} label={isZh ? '复制' : 'Copy'} />
            </div>
            <p className="max-h-[420px] overflow-auto whitespace-pre-wrap text-base leading-8 text-slate-700">
              {originalText}
            </p>
          </div>
          <div className="relative rounded-[1.5rem] border border-orange-200 bg-orange-50 p-5">
            <div className="mb-4 flex items-center">
              <h3 className="text-[10px] font-bold tracking-[0.24em] text-orange-700 uppercase">
                {isZh ? '改写后' : 'Rewritten'}
              </h3>
              <CopyButton text={result.rewrittenText} label={isZh ? '复制' : 'Copy'} />
            </div>
            <p className="max-h-[420px] overflow-auto whitespace-pre-wrap text-base leading-8 text-slate-950">
              {result.rewrittenText}
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[10px] font-bold tracking-[0.24em] text-slate-500 uppercase">
            {isZh ? '审稿批注' : 'Review Notes'}
          </h3>
          <div className="grid gap-4">
            {(result.changes ?? []).map((change, i) => (
              <article key={i} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 grid items-start gap-3 lg:grid-cols-[1fr_auto_1fr]">
                  <div className="rounded-2xl bg-slate-100 px-4 py-3">
                    <span className="text-sm leading-6 text-slate-500 line-through">{change.original}</span>
                  </div>
                  <div className="hidden justify-center pt-3 lg:flex">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="rounded-2xl bg-blue-50 px-4 py-3">
                    <span className="text-sm leading-6 text-slate-900">{change.rewritten}</span>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-600">{change.reason}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
