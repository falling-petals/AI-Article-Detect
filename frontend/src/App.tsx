import { useState } from 'react'
import type { DetectResponse, RewriteResponse } from './api/index'
import { detectAi, rewriteAi } from './api/index'
import Header from './components/Header'
import TextInput from './components/TextInput'
import DetectResult from './components/DetectResult'
import RewritePanel from './components/RewritePanel'
import RewriteResult from './components/RewriteResult'
import Toast from './components/Toast'

export default function App() {
  const [language, setLanguage] = useState('zh')
  const [detectLoading, setDetectLoading] = useState(false)
  const [rewriteLoading, setRewriteLoading] = useState(false)
  const [detectResult, setDetectResult] = useState<DetectResponse | null>(null)
  const [rewriteResult, setRewriteResult] = useState<RewriteResponse | null>(null)
  const [rewriteStyle, setRewriteStyle] = useState('conversational')
  const [targetRate, setTargetRate] = useState(30)
  const [error, setError] = useState<string | null>(null)

  const [savedText, setSavedText] = useState('')

  const handleDetect = async (text: string) => {
    setDetectLoading(true)
    setSavedText(text)
    setError(null)
    try {
      const res = await detectAi(text, language)
      setDetectResult(res.data)
    } catch {
      setError(language === 'zh' ? '检测服务异常，请稍后重试' : 'Detection service unavailable, please try again')
    } finally {
      setDetectLoading(false)
    }
  }

  const handleRewrite = async () => {
    if (!detectResult) return
    setRewriteLoading(true)
    setError(null)
    try {
      const res = await rewriteAi(savedText, language, rewriteStyle, targetRate)
      setRewriteResult(res.data)
    } catch {
      setError(language === 'zh' ? '改写服务异常，请稍后重试' : 'Rewrite service unavailable, please try again')
    } finally {
      setRewriteLoading(false)
    }
  }

  const handleScrollToRewrite = () => {
    requestAnimationFrame(() => {
      document.getElementById('rewrite-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleReset = () => {
    setDetectResult(null)
    setRewriteResult(null)
    setRewriteStyle('conversational')
    setTargetRate(30)
  }

  return (
    <div className="min-h-screen overflow-x-hidden pb-20">
      <Header language={language} onLanguageChange={setLanguage} />

      <Toast message={error} onClose={() => setError(null)} />

      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <TextInput language={language} onDetect={handleDetect} loading={detectLoading} />

        {detectResult && (
          <DetectResult
            result={detectResult}
            language={language}
            onRewrite={handleScrollToRewrite}
            onReset={handleReset}
            loading={rewriteLoading}
          />
        )}

        <RewritePanel
          language={language}
          style={rewriteStyle}
          targetRate={targetRate}
          onStyleChange={setRewriteStyle}
          onTargetRateChange={setTargetRate}
          onRewrite={handleRewrite}
          loading={rewriteLoading}
          disabled={!detectResult}
        />

        {rewriteResult && (
          <>
            <RewriteResult result={rewriteResult} originalText={savedText} language={language} />
            <div className="pt-5">
              <button
                onClick={handleReset}
                className="cursor-pointer rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-slate-600 uppercase shadow-sm transition-colors duration-200 hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {language === 'zh' ? '重新开始审阅' : 'Start New Review'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
