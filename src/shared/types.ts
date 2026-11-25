export type Note = {
  id: string
  content: string
  createdAt: number
  updatedAt: number
}

export type UserRole = 'cadet' | 'admin'

export type Session = {
  user: { sub: string; name?: string; email?: string; role?: UserRole } | null
  mode: 'local' | 'cadet' | 'freebuff' | 'setup'
  database: boolean
  ai?: 'groq' | 'local'
}

export type Announcement = {
  id: string
  title: string
  body: string
  tag: string
  author: string
  createdAt: number
}

export type AdminUserSummary = {
  id: string
  username: string
  name: string
  role: UserRole
  createdAt: number
  attendedParades: number
  totalParades: number
  attendancePct: number
  attempts: number
  avgScore: number
  readLessons: number
}

export type Attempt = {
  id: string
  subject: string
  total: number
  correct: number
  seconds: number
  createdAt: number
}

export type Progress = {
  attempts: Attempt[]
  read: string[]
}

export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export type ChatSource = {
  lessonId: string
  title: string
  subject: string
  bookId?: string
}

export type ChatReply = {
  reply: string
  sources: ChatSource[]
  mode?: 'groq' | 'local'
}
