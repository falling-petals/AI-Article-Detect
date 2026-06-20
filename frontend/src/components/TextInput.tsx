import { useState } from 'react'
import { FileText, Gauge, ShieldCheck, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

interface TextInputProps {
  language: string
  onDetect: (text: string) => void
  loading: boolean
}

export default function TextInput({ language, onDetect, loading }: TextInputProps) {
  const [text, setText] = useState('')
  const isZh = language === 'zh'
  const maxChars = 10000

  const handleDetect = () => {
    if (!text.trim() || text.length > maxChars) return
    onDetect(text.trim())
  }

  const protocol = [
    { icon: FileText, title: isZh ? '采集文本特征' : 'Capture signals', desc: isZh ? '读取句式、连接词、段落节奏。' : 'Read phrasing, transitions, paragraph rhythm.' },
    { icon: ShieldCheck, title: isZh ? '标注证据片段' : 'Mark evidence', desc: isZh ? '把可疑句段拆成可审阅证据。' : 'Split suspicious passages into reviewable evidence.' },
    { icon: Sparkles, title: isZh ? '按目标改写' : 'Rewrite to target', desc: isZh ? '控制风格与目标 AI 率。' : 'Control style and target AI score.' },
  ]

  return (
    <section className="grid gap-5 pt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-stretch">
      <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-blue-700 uppercase">
              {isZh ? '文本审稿入口' : 'Review Input'}
            </p>
            <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-[-0.06em] text-slate-950 sm:text-5xl" style={{ fontFamily: 'Fira Code, monospace' }}>
              {isZh ? '检测 AI 痕迹，重写成更像人写。' : 'Detect AI traces, rewrite with human texture.'}
            </h1>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-right">
            <p className="text-[10px] font-bold tracking-[0.24em] text-orange-700 uppercase">Max</p>
            <p className="text-xl font-bold text-slate-950" style={{ fontFamily: 'Fira Code, monospace' }}>{maxChars.toLocaleString()}</p>
          </div>
        </div>
        <label htmlFor="text-input" className="sr-only">{isZh ? '输入待检测文本' : 'Input text to analyze'}</label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isZh ? '粘贴论文、报告、公众号文案或英文段落，系统会给出 AI 率、可疑片段和降低 AI 率的改写建议。' : 'Paste an essay, report, article, or paragraph. TextLens will mark AI signals and prepare rewrite options.'}
          className={cn(
            'min-h-[340px] w-full resize-y border-0 bg-transparent px-5 py-6 text-lg leading-8 text-slate-900 transition-colors duration-200 sm:px-6',
            'placeholder:text-slate-400',
            'focus:placeholder:text-slate-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40'
          )}
        />
        <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
            <span className={cn('rounded-full px-3 py-1', text.length > maxChars ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600')}>
              {text.length.toLocaleString()}/{maxChars.toLocaleString()}
            </span>
            <span>{isZh ? '支持中英文检测与改写' : 'Chinese and English supported'}</span>
          </div>
          <button
            onClick={handleDetect}
            disabled={!text.trim() || text.length > maxChars || loading}
            className={cn(
              'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-[0.18em] uppercase transition-all duration-200',
              'bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600',
              'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
            )}
          >
            <Gauge className="h-4 w-4" />
            {loading
              ? (isZh ? '审阅中...' : 'Reviewing...')
              : (isZh ? '开始检测' : 'Run Audit')}
          </button>
        </div>
      </div>

      <aside className="grid gap-4 rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.20)]">
        <div>
          <p className="text-[10px] font-bold tracking-[0.28em] text-blue-300 uppercase">Desk Protocol</p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]" style={{ fontFamily: 'Fira Code, monospace' }}>
            {isZh ? '三步审稿流' : 'Three-step desk flow'}
          </h2>
        </div>
        {protocol.map((item, index) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-3 flex items-center justify-between">
              <item.icon className="h-5 w-5 text-orange-300" />
              <span className="font-bold text-blue-200" style={{ fontFamily: 'Fira Code, monospace' }}>0{index + 1}</span>
            </div>
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{item.desc}</p>
          </div>
        ))}
      </aside>
    </section>
  )
}
