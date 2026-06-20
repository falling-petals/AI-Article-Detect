import { X, AlertTriangle } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ToastProps {
  message: string | null
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onCloseRef.current(), 4000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (!message) return null

  return (
    <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 animate-slide-down">
      <div className="flex items-center gap-3 rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-3.5 shadow-[0_8px_32px_rgba(239,68,68,0.18)] backdrop-blur">
        <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
        <p className="text-sm font-medium text-red-800">{message}</p>
        <button
          onClick={() => onCloseRef.current()}
          className="ml-2 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
