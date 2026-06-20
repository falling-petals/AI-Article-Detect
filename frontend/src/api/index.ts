import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.response.use(
  (res) => {
    const body = res.data
    if (body && typeof body === 'object' && 'code' in body && 'data' in body) {
      res.data = body.data
    }
    return res
  },
  (err) => Promise.reject(err)
)

export interface DetectRequest {
  text: string
  language: string
}

export interface Segment {
  text: string
  isAi: boolean
  confidence: number
  reason: string
}

export interface DetectResponse {
  aiRate: number
  segments: Segment[]
  summary: string
}

export interface RewriteRequest {
  text: string
  language: string
  style?: string
  targetAiRate?: number
}

export interface Change {
  original: string
  rewritten: string
  reason: string
}

export interface RewriteResponse {
  originalAiRate: number
  rewrittenText: string
  rewrittenAiRate: number
  rewriteStyle: string
  changes: Change[]
}

export interface LanguageOption {
  code: string
  name: string
}

export function detectAi(text: string, language: string) {
  return api.post<DetectResponse>('/detect', { text, language })
}

export function rewriteAi(text: string, language: string, style: string, targetAiRate: number) {
  return api.post<RewriteResponse>('/rewrite', { text, language, style, targetAiRate })
}

export function getLanguages() {
  return api.get<LanguageOption[]>('/languages')
}
