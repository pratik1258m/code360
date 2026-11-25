import { lessonsA } from './lessons-a'
import { lessonsB } from './lessons-b'
import { lessonsC } from './lessons-c'
import { lessonsD } from './lessons-d'
import type { Lesson } from './types'

export const lessons: Lesson[] = [
  ...lessonsA,
  ...lessonsB,
  ...lessonsC,
  ...lessonsD,
]

export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]))

export function lessonsFor(ids: string[]): Lesson[] {
  return ids
    .map((id) => lessonById.get(id))
    .filter((lesson): lesson is Lesson => Boolean(lesson))
}

export const lessonMinutes = lessons.reduce(
  (total, lesson) => total + lesson.minutes,
  0,
)
