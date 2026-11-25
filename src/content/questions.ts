import { questionsA } from './questions-a'
import { questionsB } from './questions-b'
import { questionsC } from './questions-c'
import type { Question } from './types'

export const questions: Question[] = [
  ...questionsA,
  ...questionsB,
  ...questionsC,
]

export const questionById = new Map(questions.map((q) => [q.id, q]))

export function pickExam(subjects: string[], count: number, seed = 0): Question[] {
  const pool = subjects.length
    ? questions.filter((q) => subjects.includes(q.subject))
    : questions
  if (pool.length <= count) return [...pool]
  // Deterministic shuffle so the same seed gives a repeatable paper.
  let state = (seed || 1) >>> 0
  const next = () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return (state >>> 0) / 4294967296
  }
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled.slice(0, count)
}
