export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  const body = (await response.json().catch(() => {
    throw new Error('Could not reach CadetPath. Check your connection.')
  })) as T & { error?: string }
  if (!response.ok)
    throw new Error(body.error || 'The request failed. Please try again.')
  return body
}

export const post = <T,>(url: string, payload: unknown) =>
  api<T>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

export const percent = (correct: number, total: number) =>
  total ? Math.round((correct / total) * 100) : 0

export const when = (stamp: number) =>
  new Date(stamp).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  })

export const clock = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export const gradeOf = (score: number) =>
  score >= 80 ? 'A' : score >= 65 ? 'B' : score >= 50 ? 'C' : 'Needs work'
