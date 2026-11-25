// Cadet personal dossier, 75% parade attendance tracker, firing logbook
// and camp history records stored with local persistence.

export type CadetProfile = {
  cadetName: string
  regtNo: string
  unit: string
  directorate: string
  wing: 'Army' | 'Navy' | 'Air Force'
  division: 'SD' | 'SW' | 'JD' | 'JW'
  rank: string
  targetCert: 'A' | 'B' | 'C'
  year: 1 | 2 | 3
}

export type ParadeRecord = {
  id: string
  date: string
  topic: string
  type: 'Regular' | 'Ceremonial' | 'Firing' | 'Camp'
  attended: boolean
}

export type FiringLog = {
  id: string
  date: string
  weapon: '.22 Deluxe' | '7.62mm SLR' | '5.56mm INSAS'
  distance: string
  roundsFired: number
  groupingInches: number
  scoreOutOf50: number
  remarks: string
}

export type CampAttended = {
  id: string
  campName: string
  location: string
  year: string
  durationDays: number
  appointmentHeld: string
  achievement: string
}

export type DossierData = {
  profile: CadetProfile
  parades: ParadeRecord[]
  firing: FiringLog[]
  camps: CampAttended[]
}

export const defaultDossier: DossierData = {
  profile: {
    cadetName: 'Cadet Priyanshi Mishra',
    regtNo: 'DL22SWA104921',
    unit: '3 Delhi Girls Battalion NCC',
    directorate: 'Delhi Directorate',
    wing: 'Army',
    division: 'SW',
    rank: 'Sergeant (Sgt)',
    targetCert: 'C',
    year: 3,
  },
  parades: [
    { id: 'p-1', date: '2026-08-05', topic: 'Foot drill & Squad dressing', type: 'Regular', attended: true },
    { id: 'p-2', date: '2026-08-12', topic: 'Weapon handling & safety inspection', type: 'Regular', attended: true },
    { id: 'p-3', date: '2026-08-19', topic: 'Map reading: bearings & conventional signs', type: 'Regular', attended: true },
    { id: 'p-4', date: '2026-08-26', topic: 'Independence Day ceremonial rehearsal', type: 'Ceremonial', attended: true },
    { id: 'p-5', date: '2026-09-02', topic: 'Field craft & section formations', type: 'Regular', attended: false },
    { id: 'p-6', date: '2026-09-09', topic: 'Range classification .22 firing', type: 'Firing', attended: true },
    { id: 'p-7', date: '2026-09-16', topic: 'First aid, CPR and fracture drills', type: 'Regular', attended: true },
    { id: 'p-8', date: '2026-09-23', topic: 'Leadership traits & lecturette', type: 'Regular', attended: true },
    { id: 'p-9', date: '2026-09-30', topic: 'Disaster relief camp exercise', type: 'Regular', attended: true },
    { id: 'p-10', date: '2026-10-07', topic: 'Arms drill with rifle', type: 'Regular', attended: true },
    { id: 'p-11', date: '2026-10-14', topic: '6-figure grid reference field exercise', type: 'Regular', attended: true },
    { id: 'p-12', date: '2026-10-21', topic: 'Social service Swachhata rally', type: 'Regular', attended: true },
  ],
  firing: [
    {
      id: 'f-1',
      date: '2026-09-09',
      weapon: '.22 Deluxe',
      distance: '25 yards',
      roundsFired: 5,
      groupingInches: 1.8,
      scoreOutOf50: 42,
      remarks: 'Qualified 1st Class Marksman grouping under 2 inches.',
    },
    {
      id: 'f-2',
      date: '2026-10-28',
      weapon: '.22 Deluxe',
      distance: '25 yards',
      roundsFired: 5,
      groupingInches: 1.4,
      scoreOutOf50: 46,
      remarks: 'Excellent tight grouping. Trigger squeeze smooth.',
    },
  ],
  camps: [
    {
      id: 'c-1',
      campName: 'Combined Annual Training Camp (CATC-104)',
      location: 'Delhi Cantt Parade Ground',
      year: '2025',
      durationDays: 10,
      appointmentHeld: 'Guard Commander (गार्ड कमांडर)',
      achievement: 'Best In Drill (Gold Medal) and 100% camp attendance.',
    },
    {
      id: 'c-2',
      campName: 'Ek Bharat Shreshtha Bharat (EBSB Camp)',
      location: 'Sikkim Directorate',
      year: '2026',
      durationDays: 12,
      appointmentHeld: 'Platoon Sergeant',
      achievement: 'State Cultural Presentation lead.',
    },
  ],
}

export const blankDossier: DossierData = {
  profile: {
    cadetName: 'NCC Cadet',
    regtNo: 'Enter Regimental No.',
    unit: 'Your Battalion / Squadron / Unit',
    directorate: 'State Directorate',
    wing: 'Army',
    division: 'SD',
    rank: 'Cadet',
    targetCert: 'B',
    year: 1,
  },
  parades: [],
  firing: [],
  camps: [],
}

const STORAGE_KEY = 'cadetpath.dossier.v1'

const keyFor = (ownerSub?: string) =>
  !ownerSub || ownerSub === 'local-preview' ? STORAGE_KEY : `${STORAGE_KEY}.${ownerSub}`

export function hasLocalDossier(ownerSub?: string): boolean {
  try {
    return Boolean(localStorage.getItem(keyFor(ownerSub)))
  } catch {
    return false
  }
}

export function loadDossier(ownerSub?: string, fallbackName?: string): DossierData {
  try {
    const raw = localStorage.getItem(keyFor(ownerSub))
    if (raw) return JSON.parse(raw) as DossierData
  } catch {
    // Ignore storage errors in private browsing
  }
  if (ownerSub && ownerSub !== 'local-preview' && ownerSub !== 'cadet:priyanshi') {
    return {
      ...blankDossier,
      profile: {
        ...blankDossier.profile,
        cadetName: fallbackName || blankDossier.profile.cadetName,
      },
    }
  }
  return defaultDossier
}

export function saveDossier(data: DossierData, ownerSub?: string): void {
  try {
    localStorage.setItem(keyFor(ownerSub), JSON.stringify(data))
  } catch {
    // Ignore
  }
}

export function calculateAttendance(parades: ParadeRecord[]): {
  total: number
  attended: number
  percentage: number
  isEligible: boolean
  paradesNeededFor75: number
} {
  const total = parades.length
  if (total === 0) return { total: 0, attended: 0, percentage: 0, isEligible: false, paradesNeededFor75: 0 }
  const attended = parades.filter((p) => p.attended).length
  const percentage = Math.round((attended / total) * 100)
  const isEligible = percentage >= 75

  // How many more consecutive parades needed if below 75%
  // (attended + x) / (total + x) >= 0.75 => x >= (0.75 * total - attended) / 0.25
  const needed = Math.max(0, Math.ceil((0.75 * total - attended) / 0.25))

  return {
    total,
    attended,
    percentage,
    isEligible,
    paradesNeededFor75: needed,
  }
}
