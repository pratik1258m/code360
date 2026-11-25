export type LessonSection = {
  heading: string
  body: string
  bullets?: string[]
}

export type Lesson = {
  id: string
  title: string
  subject: string
  level: string
  minutes: number
  summary: string
  sections: LessonSection[]
  keyPoints: string[]
  examTip: string
}

export type Question = {
  id: string
  subject: string
  prompt: string
  options: string[]
  answer: number
  why: string
}
