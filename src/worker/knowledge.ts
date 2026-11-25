import { longQuestions, militaryAbbreviations, shortQuestions } from '../content/descriptive'
import { lessonById, lessons } from '../content/lessons'
import { library } from '../content/library'
import { awards, benefits, cadetRanks, camps, certificates, examPapers, glossary, officerRanks, scholarships } from '../content/ncc'
import { standardObstacles } from '../content/obstacles'
import { drillCommands, drillPaceStats, fieldSignals, firstAidSteps } from '../content/practical'
import { olqList, ssb5DaySchedule, ssbInterviewNCCQuestions } from '../content/ssb'
import type { Lesson } from '../content/types'
import { firingFundamentals, nccWeapons } from '../content/weapons'
import type { ChatReply, ChatSource, ChatTurn } from '../shared/types'

// Cadet AI indexes the full NCC syllabus (lessons, weapons, obstacles, SSB,
// practical drill, camps, PYQs, and the 21-book library). When GROQ_API_KEY is
// configured it uses Groq Llama with retrieved RAG context; otherwise (or on
// network failure) it falls back to the deterministic in-app engine.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_GROQ_MODEL = 'qwen/qwen3.8-27b'
const FALLBACK_GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b']

const STOP = new Set(
  `a am an and are as at be been but by can could do does for from go has have he how i if in into is it its me my no not of on or our ok okay should so than that the their them there these they this to up us was we were what when where which who why will with you your give tell explain about please cadet ncc`.split(
    ' ',
  ),
)

const words = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s°%]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 2 && !STOP.has(word))

type Chunk = {
  lesson: Lesson
  heading: string
  text: string
  tokens: Set<string>
  headingTokens?: Set<string>
  bullets?: string[]
  bookId?: string
  bookTitle?: string
  score?: number
}

let index: Chunk[] | undefined

function addChunk(
  chunks: Chunk[],
  lesson: Lesson,
  heading: string,
  text: string,
  bullets?: string[],
  book?: { id: string; title: string },
) {
  chunks.push({
    lesson,
    heading,
    text,
    tokens: new Set(words(`${heading} ${text}`)),
    headingTokens: new Set(words(heading)),
    bullets,
    bookId: book?.id,
    bookTitle: book?.title,
  })
}

function buildIndex(): Chunk[] {
  if (index) return index
  const chunks: Chunk[] = []
  const fallback = lessonById.get('the-ncc') || lessons[0]!

  // 1. Lessons
  for (const lesson of lessons) {
    addChunk(
      chunks,
      lesson,
      lesson.title,
      `${lesson.summary} ${lesson.keyPoints.join(' ')}`,
      lesson.keyPoints,
    )
    for (const section of lesson.sections) {
      addChunk(
        chunks,
        lesson,
        section.heading,
        `${section.body} ${(section.bullets ?? []).join(' ')}`,
        section.bullets,
      )
    }
  }

  // 2. Weapons training (.22, SLR, INSAS, HAT rules)
  const wtLesson = lessonById.get('weapon-training') || fallback
  for (const weapon of nccWeapons) {
    const text = `${weapon.name} ${weapon.hindiName}. Calibre: ${weapon.calibre}, Length: ${weapon.length}, Weight: ${weapon.weight}, Magazine: ${weapon.magCapacity}, Effective Range: ${weapon.effectiveRange}, Max Range: ${weapon.maxRange}, Muzzle Velocity: ${weapon.muzzleVelocity}, Normal Rate of Fire: ${weapon.rateOfFire.normal}, Rapid: ${weapon.rateOfFire.rapid}. ${weapon.examPoints.join('. ')}`
    addChunk(chunks, wtLesson, `${weapon.name} Technical Specifications`, text, weapon.examPoints)
    addChunk(
      chunks,
      wtLesson,
      `${weapon.name} Stripping & Stoppages`,
      `Stripping: ${weapon.strippingSteps.map((s) => `${s.step}. ${s.title}: ${s.note}`).join(' ')} Stoppages: ${weapon.stoppages.map((s) => `${s.cause} (${s.reason} -> ${s.remedy})`).join(' ')}`,
      weapon.strippingSteps.map((s) => `${s.title}: ${s.note}`),
    )
  }
  addChunk(
    chunks,
    lessonById.get('shooting') || wtLesson,
    'HAT Rule, Firing Positions, Range Safety & Grouping',
    `HAT Rule: ${firingFundamentals.hatRule.map((r) => `${r.letter} (${r.principle}): ${r.detail}`).join('. ')} Positions: ${firingFundamentals.positions.map((p) => `${p.name} - ${p.when}`).join('. ')} Range Safety: ${firingFundamentals.rangeSafetyRules.join(' ')} Range Commands: ${firingFundamentals.rangeCommands.map((c) => `${c.command}: ${c.action}`).join(' ')}`,
    firingFundamentals.rangeSafetyRules,
  )

  // 3. Obstacle course (10 standard obstacles)
  const advLesson = lessonById.get('adventure-training') || fallback
  for (const obs of standardObstacles) {
    const text = `Obstacle ${obs.num}: ${obs.name} (${obs.hindiName}). ${obs.description}. Height: ${obs.dimensions.height ?? ''}, Length: ${obs.dimensions.length ?? ''}, Width: ${obs.dimensions.width ?? ''}. Technique: ${obs.technique.join(' ')}. Safety: ${obs.safetyTip}. Common faults: ${obs.commonFaults.join(' ')}.`
    addChunk(chunks, advLesson, `Obstacle ${obs.num}: ${obs.name}`, text, obs.technique)
  }

  // 4. SSB & OLQs
  const ssbLesson = lessonById.get('ssb-special-entry') || fallback
  addChunk(
    chunks,
    ssbLesson,
    '15 Officer Like Qualities (OLQs)',
    `The 15 OLQs tested in SSB: ${olqList.map((o) => `${o.name} (${o.hindiName}) - ${o.description}`).join('. ')}`,
    olqList.slice(0, 10).map((o) => `${o.name}: ${o.description}`),
  )
  for (const stage of ssb5DaySchedule) {
    addChunk(
      chunks,
      ssbLesson,
      `SSB Schedule: ${stage.day}`,
      `${stage.title} (${stage.hindiTitle}). Tests: ${stage.tests.map((t) => `${t.name}: ${t.detail} (Tip: ${t.tip})`).join('. ')}`,
      stage.tests.map((t) => `${t.name}: ${t.detail}`),
    )
  }
  addChunk(
    chunks,
    ssbLesson,
    'SSB NCC Special Entry Interview Questions',
    ssbInterviewNCCQuestions.map((q) => `${q.question} Strategy: ${q.answerStrategy}`).join(' '),
  )

  // 5. Practical drill, pace stats, field signals & first aid
  const drillLesson = lessonById.get('drill') || fallback
  addChunk(
    chunks,
    drillLesson,
    'Drill Words of Command & Pace Lengths',
    `Commands: ${drillCommands.map((c) => `${c.command} (${c.hindi}): ${c.meaning}`).join(' ')} Pace stats: ${drillPaceStats.map((p) => `${p.item}: ${p.paces}`).join(', ')}.`,
    drillCommands.slice(0, 6).map((c) => `${c.command}: ${c.cautionary} ${c.executive}`),
  )
  addChunk(
    chunks,
    lessonById.get('field-craft') || fallback,
    'Field Craft Silent Signals',
    fieldSignals.map((s) => `${s.signal}: ${s.action}`).join(' '),
    fieldSignals.map((s) => `${s.signal}: ${s.action}`),
  )
  const faLesson = lessonById.get('first-aid') || fallback
  for (const group of firstAidSteps) {
    addChunk(chunks, faLesson, `First Aid: ${group.title}`, group.steps.join(' '), group.steps)
  }

  // 6. Camps, benefits, awards, glossary
  const campLesson = lessonById.get('camp-life') || fallback
  for (const camp of camps) {
    addChunk(
      chunks,
      campLesson,
      `${camp.name} (${camp.short})`,
      `${camp.name} (${camp.short}), duration ${camp.duration}. ${camp.what} Who: ${camp.who}`,
    )
  }
  addChunk(
    chunks,
    fallback,
    'NCC Certificate Benefits, Agniveer Bonus Marks & CWS Scholarships',
    `Benefits: ${benefits.map((b) => `${b.title}: ${b.detail}`).join(' ')} Scholarships: ${scholarships.map((s) => `${s.name}: ${s.detail}`).join(' ')}`,
    benefits.map((b) => `${b.title}: ${b.detail}`),
  )
  addChunk(
    chunks,
    fallback,
    'NCC Awards, Glossary & Abbreviations (ANO, DGNCC, ATC, COC)',
    `Awards: ${awards.map((a) => `${a.name}: ${a.detail}`).join(' ')} Glossary: ${glossary.map((g) => `${g.term}: ${g.detail}`).join(' ')}`,
    glossary.map((g) => `${g.term}: ${g.detail}`),
  )
  addChunk(
    chunks,
    lessonById.get('uniform-insignia') || fallback,
    'Equivalent Cadet & Officer Ranks (Army, Navy, Air Force)',
    `Cadet Ranks: ${cadetRanks.map((r) => `${r.level}: Army ${r.army}, Navy ${r.navy}, Air ${r.air} (${r.insignia})`).join('. ')} Officer Ranks: ${officerRanks.map((r) => `Army ${r.army} = Navy ${r.navy} = Air ${r.air}`).join('. ')}`,
    cadetRanks.slice(0, 5).map((r) => `${r.army} / ${r.navy} / ${r.air}`),
  )

  // 7. Written PYQs & Military Abbreviations
  addChunk(
    chunks,
    fallback,
    'Military Abbreviations & Full Forms',
    militaryAbbreviations.map((m) => `${m.abbr} stands for ${m.fullForm} (${m.hindiMean})`).join('. '),
  )
  for (const q of shortQuestions) {
    addChunk(chunks, fallback, `5-Mark Question: ${q.questionEn}`, `${q.questionEn} ${q.answerPointsEn.join(' ')}`, q.answerPointsEn)
  }
  for (const q of longQuestions) {
    addChunk(
      chunks,
      fallback,
      `10-Mark Question: ${q.questionEn}`,
      `${q.questionEn} ${q.sections.map((s) => `${s.headingEn}: ${s.bodyEn}`).join(' ')}`,
    )
  }

  // 8. 21-Book Reference Library
  for (const doc of library) {
    const body = doc.sections.map((s) => `${s.heading}: ${s.body} ${(s.bullets ?? []).join(' ')}`).join(' ')
    addChunk(
      chunks,
      fallback,
      `Library: ${doc.title}`,
      `${doc.summary} ${body}`,
      doc.useFor,
      { id: doc.id, title: doc.title },
    )
  }

  index = chunks
  return chunks
}

export function retrieve(question: string, limit = 4): Chunk[] {
  const query = [...new Set(words(question))]
  if (!query.length) return []
  const lower = question.toLowerCase()

  const scored = buildIndex().map((chunk) => {
    let score = 0
    for (const token of query) {
      if (chunk.tokens.has(token)) score += 3
      else if ([...chunk.tokens].some((t) => t.startsWith(token) || token.startsWith(t)))
        score += 1
      if (chunk.headingTokens?.has(token)) score += 3
    }
    if (chunk.lesson.title.toLowerCase().includes(lower.slice(0, 24))) score += 6
    if (chunk.lesson.subject.toLowerCase() === lower.trim()) score += 6
    if (chunk.heading.toLowerCase().includes(lower.slice(0, 18))) score += 4
    return { chunk, score }
  })

  const best = scored
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit * 4)
    .map((item) => ({ ...item, chunk: { ...item.chunk, score: item.score } }))

  const perSource = new Map<string, Chunk[]>()
  for (const { chunk } of best) {
    const key = chunk.bookId ? `book:${chunk.bookId}` : `lesson:${chunk.lesson.id}`
    const list = perSource.get(key) ?? []
    if (list.length >= 2) continue
    list.push(chunk)
    perSource.set(key, list)
  }
  return [...perSource.values()].slice(0, limit).flat()
}

export function sourcesOf(chunks: Chunk[]): ChatSource[] {
  const seen = new Map<string, ChatSource>()
  for (const chunk of chunks) {
    if (chunk.bookId && chunk.bookTitle) {
      seen.set(`book:${chunk.bookId}`, {
        lessonId: chunk.lesson.id,
        bookId: chunk.bookId,
        title: chunk.bookTitle,
        subject: 'Library',
      })
    } else {
      seen.set(`lesson:${chunk.lesson.id}`, {
        lessonId: chunk.lesson.id,
        title: chunk.lesson.title,
        subject: chunk.lesson.subject,
      })
    }
  }
  return [...seen.values()]
}

const tidy = (text: string) => text.replace(/\s+/g, ' ').trim()
const bearing = (value: number) =>
  String(((value % 360) + 360) % 360).padStart(3, '0')

const sourceFor = (id: string): ChatSource[] => {
  const lesson = lessonById.get(id)
  return lesson
    ? [{ lessonId: lesson.id, title: lesson.title, subject: lesson.subject }]
    : []
}
const sentencesOf = (text: string) =>
  tidy(text)
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)

function bestSentence(text: string, question: string): string {
  const terms = words(question)
  const sentences = sentencesOf(text)
  if (!sentences.length) return tidy(text)
  let best = sentences[0]!
  let bestScore = -1
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase()
    const score = terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      best = sentence
    }
  }
  return best
}

function directAnswer(question: string): ChatReply | null {
  const lower = question.toLowerCase()
  const numbers = [...lower.matchAll(/\d{1,3}/g)].map((match) => Number(match[0]))

  if (/\bback bearing\b/.test(lower) && numbers.length) {
    const value = numbers[0]! % 360
    return {
      reply: `The back bearing of ${bearing(value)}° is ${bearing(value + 180)}°.\n\nAdd 180° when the bearing is below 180°, subtract 180° when it is above. On the ground, turn about and re-sight: the compass should read the back bearing within a couple of degrees.`,
      sources: sourceFor('map-reading-bearings'),
      mode: 'local',
    }
  }

  if (/\bmagnetic bearing\b/.test(lower) && numbers.length >= 2) {
    const grid = numbers[0]! % 360
    const variation = numbers[1]! % 360
    const west = /\bwest\b/.test(lower)
    const magnetic = west ? grid + variation : grid - variation
    return {
      reply: `Magnetic bearing = grid bearing ${west ? '+' : '−'} variation.\n\n${bearing(grid)}° ${west ? '+' : '−'} ${variation}° = ${bearing(magnetic)}°.\n\nEast variation is subtracted from a grid bearing; west variation is added. Work out which side of grid north the needle lies on before applying the sign.`,
      sources: sourceFor('map-reading-bearings'),
      mode: 'local',
    }
  }

  const certMatch = lower.match(/certificate\s+([abc])\b/)
  if (certMatch) {
    const id = certMatch[1]!.toUpperCase() as 'A' | 'B' | 'C'
    const certificate = certificates.find((item) => item.id === id)
    if (certificate) {
      if (/eligib|requirement|qualify|need|attend/.test(lower))
        return {
          reply: `${certificate.name} — eligibility\n\n${certificate.eligibility
            .map((item) => `- ${item}`)
            .join('\n')}\n\nGrading: A 80% and above, B 65% to below 80%, C 50% to below 65%. Pass needs 45% in each paper and 50% aggregate. ${certificate.years}.`,
          sources: [],
          mode: 'local',
        }
      if (/marks|paper|exam|score|pass/.test(lower)) {
        const papers = examPapers[id].common
        return {
          reply: `${certificate.name} carries 500 marks: 350 common and 150 specialised.\n\n${papers
            .map((paper) => `- ${paper.paper} — ${paper.total} marks`)
            .join('\n')}\n\nPass: 45% in each paper and 50% in aggregate. Grade A is 80% and above, B 65% to below 80%, C 50% to below 65%. One retest is allowed to improve a C certificate grading.`,
          sources: [],
          mode: 'local',
        }
      }
    }
  }

  for (const entry of glossary) {
    const pattern = new RegExp(
      `\\b${entry.term.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\b`,
      'i',
    )
    if (pattern.test(question) && /what|mean|full form|stand/.test(lower))
      return { reply: `${entry.term}\n${entry.detail}`, sources: [], mode: 'local' }
  }

  return null
}

const GREETING = /^(hi|hello|hey|namaste|namaskar|jai\s*hind|pranam|good\s*(morning|afternoon|evening))\b/i
const THANKS = /^(thanks|thank you|thx|shukriya|dhanyawad|ok|okay|cool|jai\s*hind)\b/i

const NON_NCC_PATTERNS = [
  /\b(python|javascript|typescript|react|html|css|java|c\+\+|sql|database|docker|kubernetes|backend|frontend|coding|programming|algorithm)\b/i,
  /\b(crypto|bitcoin|ethereum|stock market|trading|forex|investing)\b/i,
  /\b(recipe|cook|bake|biryani|pizza|burger|cake|ingredient)\b/i,
  /\b(movie|hollywood|bollywood|netflix|actor|actress|cinema|box office|celebrity)\b/i,
  /\b(pubg|free fire|fortnite|minecraft|playstation|xbox|gta|esports)\b/i,
  /\b(dating|girlfriend|boyfriend|love advice|horoscope|astrology)\b/i,
]

const CAPABILITIES = [
  'Certificate A, B and C eligibility, syllabus and grading',
  'Drill commands, cadence (120/70 BPM) and shabd-e-kamaan',
  'Weapons training: .22 Deluxe, 7.62mm SLR, and 5.56mm INSAS specs & stripping',
  'Map reading: 6-figure grid references, bearings, conventional signs, contours',
  '10 Standard Obstacles (OPT): dimensions, technique and safety',
  'Field craft, first aid, disaster management, and social service',
  'SSB direct entry: 15 OLQs, screening (PPDT/OIR), GTO tasks and interview prep',
  'Camps: ATC, CATC, RDC, TSC, VSC, NSC, EBSB, and YEP',
]

function helpReply(): ChatReply {
  return {
    reply: `Jai Hind Cadet! I am Cadet AI. I am strictly and exclusively designed to assist with the National Cadet Corps (NCC) syllabus, cadet training, and examinations.\n\nHere is what you can ask me:\n${CAPABILITIES.map(
      (item) => `- ${item}`,
    ).join('\n')}\n\nAsk about any weapon, drill command, bearing calculation, certificate eligibility, camp, or obstacle technique!`,
    sources: [],
    mode: 'local',
  }
}

function nonNccRefusal(): ChatReply {
  return {
    reply: `Jai Hind! I am Cadet AI, and I strictly answer ONLY queries related to the National Cadet Corps (NCC) — including the syllabus, drill commands, weapon training (.22, SLR, INSAS), map reading, field craft, camps (ATC, RDC, TSC), obstacle courses, and Armed Forces direct entry schemes.\n\nI cannot answer programming, entertainment, or out-of-scope non-NCC questions. Please ask an NCC training or syllabus question! Jai Hind.`,
    sources: [],
    mode: 'local',
  }
}

function retrievalQuery(turns: ChatTurn[]): string {
  const userTurns = turns.filter((turn) => turn.role === 'user')
  const latest = userTurns.at(-1)?.content ?? ''
  if (words(latest).length >= 3 || userTurns.length < 2) return latest
  return `${userTurns.at(-2)?.content ?? ''} ${latest}`.trim()
}

export function answer(turns: ChatTurn[]): ChatReply {
  const question = turns.filter((turn) => turn.role === 'user').at(-1)?.content ?? ''
  const trimmed = question.trim()

  if (GREETING.test(trimmed)) return helpReply()

  if (THANKS.test(trimmed) && trimmed.length < 30) {
    return {
      reply:
        'Jai Hind! Keep practicing your drill and syllabus revision. Ask me whenever you need clarity on any NCC topic.',
      sources: [],
      mode: 'local',
    }
  }

  for (const pattern of NON_NCC_PATTERNS) {
    if (pattern.test(question)) return nonNccRefusal()
  }

  const direct = directAnswer(question)
  if (direct) return direct

  const chunks = retrieve(retrievalQuery(turns), 3)
  if (!chunks.length) {
    return {
      reply: `I am Cadet AI and I strictly answer only National Cadet Corps (NCC) training and syllabus questions.\n\nI could not find that in the NCC syllabus or library. Please ask a topic related to NCC — for example:\n- "What is the effective range of .22 Deluxe Rifle?"\n- "What are the parts of a word of command in drill?"\n- "How to calculate grid to magnetic bearing?"\n- "What are the eligibility requirements for Certificate C?"\n- "What are the 10 standard obstacles in NCC?"\n- "Explain the 15 OLQs in SSB interview."\n\nJai Hind!`,
      sources: [],
      mode: 'local',
    }
  }

  const grouped = new Map<string, Chunk[]>()
  for (const chunk of chunks) {
    const key = chunk.bookId ? `book:${chunk.bookId}` : chunk.lesson.id
    const list = grouped.get(key) ?? []
    list.push(chunk)
    grouped.set(key, list)
  }
  const lessonsInPlay = [...grouped.values()]
  const primary = lessonsInPlay[0]!
  const lead = [...primary].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0]!
  const lesson = lead.lesson

  const leadSentence = bestSentence(lead.text, question)
  const supporting = primary
    .slice(1)
    .map((chunk) => bestSentence(chunk.text, question))
    .find((sentence) => sentence !== leadSentence)

  const blocks: string[] = []
  blocks.push(`${leadSentence}${supporting ? ` ${supporting}` : ''}`)

  const points = lead.bullets?.length
    ? lead.bullets.slice(0, 4)
    : lesson.keyPoints.slice(0, 3)
  if (points.length)
    blocks.push(
      `${lead.bullets?.length ? 'From the lesson' : 'Key points'}\n${points
        .map((point) => `- ${point}`)
        .join('\n')}`,
    )

  if (lesson.examTip && !lead.bookId) blocks.push(`Exam angle\n${tidy(lesson.examTip)}`)

  const others = lessonsInPlay
    .slice(1)
    .map((group) => group[0]!.bookTitle ?? group[0]!.lesson.title)
  if (others.length)
    blocks.push(`Covered further in\n${others.map((title) => `- ${title}`).join('\n')}`)

  return { reply: blocks.join('\n\n'), sources: sourcesOf(chunks), mode: 'local' }
}

export type GroqOptions = {
  apiKey?: string
  model?: string
  fetcher?: typeof fetch
}

export async function answerWithGroq(
  turns: ChatTurn[],
  options: GroqOptions = {},
): Promise<ChatReply> {
  const question = turns.filter((turn) => turn.role === 'user').at(-1)?.content ?? ''
  const trimmed = question.trim()

  if (GREETING.test(trimmed)) return helpReply()
  if (THANKS.test(trimmed) && trimmed.length < 30) {
    return {
      reply:
        'Jai Hind! Keep practicing your drill and syllabus revision. Ask me whenever you need clarity on any NCC topic.',
      sources: [],
      mode: 'local',
    }
  }
  for (const pattern of NON_NCC_PATTERNS) {
    if (pattern.test(question)) return nonNccRefusal()
  }

  const apiKey = options.apiKey?.trim()
  if (!apiKey) return answer(turns)

  const direct = directAnswer(question)
  const chunks = retrieve(retrievalQuery(turns), 5)
  const contextBlocks = [
    ...(direct ? [`Verified calculation/fact:\n${direct.reply}`] : []),
    ...chunks.map(
      (chunk, i) =>
        `[${i + 1}] ${chunk.bookTitle ?? chunk.lesson.title} — ${chunk.heading}\n${tidy(chunk.text).slice(0, 1400)}`,
    ),
  ]

  const systemPrompt = [
    'You are Cadet AI, the official study assistant for CadetPath 360 (National Cadet Corps — India).',
    'Rules:',
    '1. Answer ONLY questions related to NCC (syllabus, Certificates A/B/C, drill, weapons .22/SLR/INSAS, map reading, field craft, 10 obstacles, camps, first aid, disaster management, NCC Act, SSB Special Entry & Armed Forces).',
    '2. If a question is clearly unrelated to NCC or defence cadet training (e.g. coding, crypto, movies, cooking, dating), politely refuse in 2 sentences and invite an NCC question.',
    '3. Match the language of the cadet (English, Hindi, or Hinglish). Be crisp, structured with short bullet points, and highlight an "Exam angle" tip when relevant.',
    '4. Rely strictly on the verified NCC reference context below when citing figures, marks, dimensions, or dates. Never invent unit parade dates, camp allotments, or exam results — tell the cadet to verify those with their ANO or State Directorate.',
    contextBlocks.length
      ? `\nReference syllabus context:\n${contextBlocks.join('\n\n')}`
      : '\nNo specific passage matched in the local index; answer from official DGNCC syllabus knowledge only if NCC-related, otherwise decline.',
  ].join('\n')

  const fetchFn = options.fetcher ?? fetch
  const primary = options.model?.trim() || DEFAULT_GROQ_MODEL
  const candidates = [primary, ...FALLBACK_GROQ_MODELS.filter((m) => m !== primary)]

  for (const model of candidates) {
    try {
      const response = await fetchFn(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          max_tokens: 1200,
          messages: [
            { role: 'system', content: systemPrompt },
            ...turns.map((t) => ({ role: t.role, content: t.content })),
          ],
        }),
        signal: AbortSignal.timeout(15_000),
      })

      if (!response.ok) {
        if (response.status === 404) continue
        return answer(turns)
      }
      const data = (await response.json().catch(() => null)) as {
        choices?: { message?: { content?: string } }[]
      } | null
      const reply = data?.choices?.[0]?.message?.content?.trim()
      if (!reply) continue

      const sources = sourcesOf(chunks)
      return {
        reply,
        sources: sources.length ? sources : (direct?.sources ?? []),
        mode: 'groq',
      }
    } catch {
      return answer(turns)
    }
  }
  return answer(turns)
}
