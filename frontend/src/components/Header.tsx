import { cn } from '../lib/utils'

interface HeaderProps {
  language: string
  onLanguageChange: (lang: string) => void
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:px-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-blue-900/20" style={{ fontFamily: 'Fira Code, monospace' }}>
            TL
          </div>
          <div>
            <p className="text-sm font-bold tracking-[-0.02em] text-slate-950" style={{ fontFamily: 'Fira Code, monospace' }}>
              TextLens
            </p>
            <p className="hidden text-[10px] font-semibold tracking-[0.28em] text-slate-500 uppercase sm:block">
              AI Review Desk
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-blue-700 uppercase md:inline-flex">
            Detect / Rewrite / Compare
          </span>
          <div className="flex rounded-full border border-slate-200 bg-slate-100 p-1">
          {['zh', 'en'].map(code => (
            <button
              key={code}
              onClick={() => onLanguageChange(code)}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                language === code
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              {code}
            </button>
          ))}
          </div>
        </div>
      </div>
    </header>
  )
}
