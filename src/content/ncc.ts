// Grounded in DGNCC / State Directorate publications, the Special NCC Order on
// certificate examinations, and the CBSE / PSEB NCC (076) syllabi.
// Figures marked "as published" reflect those sources; unit practice can vary.

export type Wing = 'Army' | 'Navy' | 'Air Force'

export type Certificate = {
  id: 'A' | 'B' | 'C'
  name: string
  unit: string
  years: string
  summary: string
  eligibility: string[]
  grading: { grade: string; range: string }[]
}

export const certificates: Certificate[] = [
  {
    id: 'A',
    name: 'Certificate A',
    unit: 'Junior Division / Junior Wing',
    years: 'After two years of training',
    summary:
      'The first certificate, taken at school level. It proves two years of parade, camp and syllabus training and earns 10 bonus marks towards Certificate B.',
    eligibility: [
      'Attended at least 75% of the training periods in the first and second year syllabus.',
      'Break in NCC service before the exam should not exceed 12 months at a time.',
      'Attended at least one Annual Training Camp.',
      'Enrolled cadet of a Junior Division / Junior Wing unit.',
    ],
    grading: [
      { grade: 'A', range: '80% and above' },
      { grade: 'B', range: '65% to below 80%' },
      { grade: 'C', range: '50% to below 65%' },
      { grade: 'Fail', range: 'Below 45% in a paper or below 50% aggregate' },
    ],
  },
  {
    id: 'B',
    name: 'Certificate B',
    unit: 'Senior Division / Senior Wing',
    years: 'After two years of senior training',
    summary:
      'The mid-point certificate for college cadets. It is the gateway to Certificate C and carries weight in paramilitary and state police recruitment.',
    eligibility: [
      'Attended at least 75% of the first and second year senior syllabus periods.',
      'Break in service before the exam should not exceed 18 months at a time.',
      'Attended one ATC, NIC, COC or attachment with a regular Army, Navy or Air Force unit.',
      'Air Wing cadets must complete a minimum of 10 glide launches.',
      'Certificate A holders receive 10 bonus marks.',
    ],
    grading: [
      { grade: 'A', range: '80% and above' },
      { grade: 'B', range: '65% to below 80%' },
      { grade: 'C', range: '50% to below 65%' },
      { grade: 'Fail', range: 'Below 45% in a paper or below 50% aggregate' },
    ],
  },
  {
    id: 'C',
    name: 'Certificate C',
    unit: 'Senior Division / Senior Wing',
    years: 'Third year of senior training',
    summary:
      'The highest NCC certificate. It unlocks the NCC Special Entry Scheme, reserved defence vacancies and bonus marks across central and state recruitment.',
    eligibility: [
      'Must already hold Certificate B, passed at least one year earlier.',
      'Must be in the third year of Senior Division / Senior Wing training.',
      'Attended at least 75% of the third year syllabus periods.',
      'Attended one ATC plus one of: RDC, a centrally organised camp, para training, NIC, DGNCC trek, attachment training, an adventure course, or an approved sailing expedition.',
      'Break in service should not exceed 18 months at a time.',
    ],
    grading: [
      { grade: 'A', range: '80% and above' },
      { grade: 'B', range: '65% to below 80%' },
      { grade: 'C', range: '50% to below 65%' },
      { grade: 'Fail', range: 'Below 45% in a paper or below 50% aggregate' },
    ],
  },
]

export const examNote =
  'Every certificate paper carries 500 marks: 350 common subjects and 150 specialised subjects. A cadet must score 45% in each paper and 50% in aggregate to pass. One retest is allowed for improving a C grading.'

export type MarkRow = { subject: string; written?: number; practical?: number; total: number }
export type Paper = { paper: string; rows: MarkRow[]; total: number }

export const examPapers: Record<'A' | 'B' | 'C', Record<'common' | Wing | 'Remount & Veterinary', Paper[]>> = {
  A: {
    common: [
      {
        paper: 'Paper I · Drill',
        rows: [{ subject: 'Foot drill and squad drill', practical: 80, total: 80 }],
        total: 80,
      },
      {
        paper: 'Paper II · Weapon Training',
        rows: [{ subject: 'Weapon handling and firing', written: 35, practical: 30, total: 65 }],
        total: 65,
      },
      {
        paper: 'Paper III · Miscellaneous',
        rows: [
          { subject: 'NCC General', written: 10, total: 10 },
          { subject: 'National Integration and Awareness', written: 20, total: 20 },
          { subject: 'Personality Development', written: 35, total: 35 },
          { subject: 'Leadership', written: 20, total: 20 },
          { subject: 'Social Service and Community Development', written: 40, total: 40 },
          { subject: 'Health and Hygiene', written: 25, total: 25 },
          { subject: 'Disaster Management', written: 15, total: 15 },
          { subject: 'Obstacle Training', written: 5, total: 5 },
          { subject: 'Adventure', written: 20, total: 20 },
          { subject: 'Border and Coastal Areas', written: 15, total: 15 },
        ],
        total: 205,
      },
    ],
    Army: [
      {
        paper: 'Paper IV · Specialised Subjects — Army',
        rows: [
          { subject: 'Armed Forces', written: 25, total: 25 },
          { subject: 'Map Reading', written: 20, practical: 20, total: 40 },
          { subject: 'Field Craft and Battle Craft', written: 25, practical: 20, total: 45 },
          { subject: 'Military History', written: 30, total: 30 },
          { subject: 'Communication', written: 10, total: 10 },
        ],
        total: 150,
      },
    ],
    Navy: [
      {
        paper: 'Paper IV · Specialised Subjects — Navy',
        rows: [
          { subject: 'Naval Orientation', written: 50, total: 50 },
          { subject: 'Seamanship', written: 30, practical: 10, total: 40 },
          { subject: 'Naval Communication', written: 25, practical: 20, total: 45 },
          { subject: 'Navigation', written: 15, total: 15 },
          { subject: 'Ship Modelling', practical: 10, total: 10 },
        ],
        total: 150,
      },
    ],
    'Air Force': [
      {
        paper: 'Paper IV · Specialised Subjects — Air Force',
        rows: [
          { subject: 'General Service Knowledge', written: 20, practical: 5, total: 25 },
          { subject: 'Air Campaigns', written: 20, total: 20 },
          { subject: 'Principles of Flight', written: 25, practical: 10, total: 35 },
          { subject: 'Airfield Layout', written: 25, practical: 10, total: 35 },
          { subject: 'Aeromodelling', written: 20, practical: 15, total: 35 },
          { subject: 'Flying', total: 0 },
        ],
        total: 150,
      },
    ],
    'Remount & Veterinary': [],
  },
  B: {
    common: [
      {
        paper: 'Paper I · Drill',
        rows: [{ subject: 'Drill with and without arms', practical: 80, total: 80 }],
        total: 80,
      },
      {
        paper: 'Paper II · Weapon Training',
        rows: [{ subject: 'Weapon training and firing', written: 30, practical: 30, total: 60 }],
        total: 60,
      },
      {
        paper: 'Paper III · Miscellaneous',
        rows: [
          { subject: 'NCC General', written: 6, total: 6 },
          { subject: 'National Integration and Awareness', written: 20, total: 20 },
          { subject: 'Personality Development', written: 60, total: 60 },
          { subject: 'Leadership', written: 18, total: 18 },
          { subject: 'Disaster Management', written: 18, total: 18 },
          { subject: 'Social Service and Community Development', written: 32, total: 32 },
          { subject: 'Health and Hygiene', written: 26, total: 26 },
          { subject: 'Adventure', written: 16, total: 16 },
          { subject: 'Obstacle Training', written: 6, total: 6 },
          { subject: 'Border and Coastal Areas', written: 8, total: 8 },
        ],
        total: 210,
      },
    ],
    Army: [
      {
        paper: 'Paper IV · Specialised Subjects — Army',
        rows: [
          { subject: 'Armed Forces', written: 20, total: 20 },
          { subject: 'Map Reading', written: 24, practical: 16, total: 40 },
          { subject: 'Field Craft and Battle Craft', written: 24, practical: 16, total: 40 },
          { subject: 'Infantry Weapons and Equipment', written: 16, total: 16 },
          { subject: 'Military History', written: 20, total: 20 },
          { subject: 'Communication', written: 6, practical: 8, total: 14 },
        ],
        total: 150,
      },
    ],
    Navy: [
      {
        paper: 'Paper IV · Specialised Subjects — Navy',
        rows: [
          { subject: 'Naval Orientation', written: 20, total: 20 },
          { subject: 'Naval Communication', written: 10, practical: 4, total: 14 },
          { subject: 'Navigation', written: 14, total: 14 },
          { subject: 'Seamanship', written: 36, practical: 6, total: 42 },
          { subject: 'Ship and Boat Modelling', written: 16, practical: 14, total: 30 },
          { subject: 'Swimming', written: 14, practical: 16, total: 30 },
        ],
        total: 150,
      },
    ],
    'Air Force': [
      {
        paper: 'Paper IV · Specialised Subjects — Air Force',
        rows: [
          { subject: 'General Service Knowledge', written: 20, total: 20 },
          { subject: 'Air Campaigns', written: 10, total: 10 },
          { subject: 'Principles of Flight', written: 10, total: 10 },
          { subject: 'Airmanship', written: 10, total: 10 },
          { subject: 'Navigation and Meteorology', written: 14, total: 14 },
          { subject: 'Aero Engines and Airframes', written: 16, total: 16 },
          { subject: 'Basic Flight Instruments and Radar Theory', written: 10, total: 10 },
          { subject: 'Aeromodelling', written: 8, practical: 12, total: 20 },
          { subject: 'Flying and Standing Orders', written: 12, practical: 24, total: 36 },
          { subject: 'Simulator', practical: 4, total: 4 },
        ],
        total: 150,
      },
    ],
    'Remount & Veterinary': [
      {
        paper: 'Paper IV · Specialised Subjects — Remount & Veterinary',
        rows: [
          { subject: 'Organisation and Functioning of RVC', written: 10, total: 10 },
          { subject: 'Animal Management and Equitation', written: 60, practical: 20, total: 80 },
          { subject: 'Shoeing', written: 20, practical: 10, total: 30 },
          { subject: 'Saddle Fitting', written: 20, practical: 10, total: 30 },
        ],
        total: 150,
      },
    ],
  },
  C: {
    common: [
      {
        paper: 'Paper I · Drill',
        rows: [{ subject: 'Advanced drill and ceremonial drill', practical: 50, total: 50 }],
        total: 50,
      },
      {
        paper: 'Paper II · Weapon Training',
        rows: [{ subject: 'Weapon training and range practice', written: 10, practical: 60, total: 70 }],
        total: 70,
      },
      {
        paper: 'Paper III · Miscellaneous',
        rows: [
          { subject: 'National Integration and Awareness', written: 10, total: 10 },
          { subject: 'Personality Development', written: 70, total: 70 },
          { subject: 'Leadership', written: 20, total: 20 },
          { subject: 'Disaster Management', written: 22, total: 22 },
          { subject: 'Social Service and Community Development', written: 36, total: 36 },
          { subject: 'Health and Hygiene', written: 28, total: 28 },
          { subject: 'Environment Awareness and Conservation', written: 20, total: 20 },
          { subject: 'Obstacle Training', written: 14, total: 14 },
          { subject: 'Border and Coastal Areas', written: 10, total: 10 },
        ],
        total: 230,
      },
    ],
    Army: [
      {
        paper: 'Paper IV · Specialised Subjects — Army',
        rows: [
          { subject: 'Armed Forces', written: 10, total: 10 },
          { subject: 'Map Reading', written: 30, practical: 16, total: 46 },
          { subject: 'Field Craft and Battle Craft', written: 30, practical: 14, total: 44 },
          { subject: 'Infantry Weapons and Equipment', written: 14, total: 14 },
          { subject: 'Military History', written: 20, total: 20 },
          { subject: 'Communication', written: 6, practical: 10, total: 16 },
        ],
        total: 150,
      },
    ],
    Navy: [
      {
        paper: 'Paper IV · Specialised Subjects — Navy',
        rows: [
          { subject: 'Naval Orientation', written: 16, total: 16 },
          { subject: 'Naval Communication', written: 10, total: 10 },
          { subject: 'Seamanship', written: 24, practical: 8, total: 32 },
          { subject: 'Fire Fighting, Flooding and Damage Control', written: 10, total: 10 },
          { subject: 'Ship and Boat Modelling', written: 38, practical: 14, total: 52 },
          { subject: 'Swimming', written: 12, practical: 18, total: 30 },
        ],
        total: 150,
      },
    ],
    'Air Force': [
      {
        paper: 'Paper IV · Specialised Subjects — Air Force',
        rows: [
          { subject: 'General Service Knowledge', written: 16, total: 16 },
          { subject: 'Principles of Flight', written: 14, total: 14 },
          { subject: 'Airmanship', written: 10, total: 10 },
          { subject: 'Navigation and Meteorology', written: 6, total: 6 },
          { subject: 'Aero Engines and Airframes', written: 10, total: 10 },
          { subject: 'Aeromodelling', written: 16, practical: 14, total: 30 },
          { subject: 'Flying and Standing Orders', written: 38, practical: 16, total: 54 },
          { subject: 'Simulator', practical: 10, total: 10 },
        ],
        total: 150,
      },
    ],
    'Remount & Veterinary': [
      {
        paper: 'Paper IV · Specialised Subjects — Remount & Veterinary',
        rows: [
          { subject: 'Animal Management and Equitation', written: 70, practical: 20, total: 90 },
          { subject: 'Shoeing', written: 20, practical: 10, total: 30 },
          { subject: 'Saddle Fitting', written: 20, practical: 10, total: 30 },
        ],
        total: 150,
      },
    ],
  },
}

export type SyllabusSubject = {
  code: string
  title: string
  blurb: string
  groups: ('Common' | Wing | 'Remount & Veterinary')[]
  years: string
  lessonIds: string[]
}

export const syllabus: SyllabusSubject[] = [
  {
    code: 'NCC',
    title: 'The NCC',
    blurb:
      'Aims, motto, pledge, flag, song, organisation, cadet ranks and the duties of a cadet.',
    groups: ['Common'],
    years: 'Year 1 · all certificates',
    lessonIds: ['the-ncc'],
  },
  {
    code: 'NIA',
    title: 'National Integration and Awareness',
    blurb:
      'Unity in diversity, threats to national security, the freedom struggle and the role of cadets in nation building.',
    groups: ['Common'],
    years: 'Years 1–3 · all certificates',
    lessonIds: ['national-integration'],
  },
  {
    code: 'PD',
    title: 'Personality Development',
    blurb:
      'Self-awareness, empathy, critical thinking, time management, communication and stress control.',
    groups: ['Common'],
    years: 'Years 1–3 · heaviest paper in C',
    lessonIds: ['personality-development'],
  },
  {
    code: 'LD',
    title: 'Leadership and Discipline',
    blurb:
      'Traits and indicators of leadership, the honour code, motivation, and leading a squad on the drill square.',
    groups: ['Common'],
    years: 'Years 1–3 · all certificates',
    lessonIds: ['leadership'],
  },
  {
    code: 'DR',
    title: 'Drill',
    blurb:
      'Foot drill, squad and platoon drill, arms drill, ceremonial drill, words of command and guard mounting.',
    groups: ['Common'],
    years: 'Every year · practical paper',
    lessonIds: ['drill'],
  },
  {
    code: 'WT',
    title: 'Weapon Training',
    blurb:
      'Characteristics, stripping, assembling, loading, aiming, firing positions and range procedure.',
    groups: ['Common'],
    years: 'Every year · written plus practical',
    lessonIds: ['weapon-training'],
  },
  {
    code: 'MR',
    title: 'Map Reading',
    blurb:
      'Scales, grid references, conventional signs, relief, bearings, prismatic compass, resection and GPS.',
    groups: ['Common', 'Army'],
    years: 'Years 1–3 · up to 46 marks in C (Army)',
    lessonIds: ['map-reading-basics', 'map-reading-bearings'],
  },
  {
    code: 'FCBC',
    title: 'Field Craft and Battle Craft',
    blurb:
      'Judging distance, ground description, camouflage, field signals, section formations and fire control orders.',
    groups: ['Common', 'Army'],
    years: 'Years 1–3 · written plus practical',
    lessonIds: ['field-craft'],
  },
  {
    code: 'FA',
    title: 'Health, Hygiene and First Aid',
    blurb:
      'Personal hygiene, nutrition, sanitation, casualty handling, CPR, fractures, burns and snake bite.',
    groups: ['Common'],
    years: 'Years 1–3 · all certificates',
    lessonIds: ['first-aid'],
  },
  {
    code: 'DM',
    title: 'Disaster Management',
    blurb:
      'Types of disaster, the disaster cycle, relief camp organisation and the role of NCC cadets.',
    groups: ['Common'],
    years: 'Years 1–3 · all certificates',
    lessonIds: ['disaster-management'],
  },
  {
    code: 'SSCD',
    title: 'Social Service and Community Development',
    blurb:
      'Community projects, blood donation, literacy, Swachh Bharat, tree plantation and civic responsibility.',
    groups: ['Common'],
    years: 'Years 1–3 · 36 marks in C',
    lessonIds: ['social-service'],
  },
  {
    code: 'ADV',
    title: 'Adventure and Obstacle Training',
    blurb:
      'Obstacle course, trekking, rock climbing, rappelling, watermanship and adventure safety.',
    groups: ['Common'],
    years: 'Years 1–3 · camp assessed',
    lessonIds: ['adventure-training'],
  },
  {
    code: 'ENV',
    title: 'Environment Awareness and Conservation',
    blurb:
      'Water conservation, rainwater harvesting, waste segregation, energy and the cadet’s role.',
    groups: ['Common'],
    years: 'Years 2–3 · 20 marks in C',
    lessonIds: ['environment'],
  },
  {
    code: 'BCA',
    title: 'Border and Coastal Areas',
    blurb:
      'Land borders, coastline, island territories, border population and the NCC’s role in coastal security.',
    groups: ['Common'],
    years: 'Years 2–3 · all certificates',
    lessonIds: ['border-coastal'],
  },
  {
    code: 'AF',
    title: 'Armed Forces and Careers',
    blurb:
      'Organisation of the Army, Navy and Air Force, badges and ranks, modes of entry and NCC special entry.',
    groups: ['Common', 'Army'],
    years: 'Years 1–3 · Army paper',
    lessonIds: ['armed-forces'],
  },
  {
    code: 'MH',
    title: 'Military History',
    blurb:
      'Battles that shaped the subcontinent, Param Vir Chakra awardees and the 1965, 1971 and Kargil wars.',
    groups: ['Common', 'Army'],
    years: 'Years 1–3 · 20 marks in C',
    lessonIds: ['military-history'],
  },
  {
    code: 'COMN',
    title: 'Communication',
    blurb:
      'Radio telephony, signal procedure, phonetic alphabet, message writing and field communication.',
    groups: ['Common', 'Army'],
    years: 'Years 1–3 · practical plus written',
    lessonIds: ['communication'],
  },
  {
    code: 'NAVY',
    title: 'Naval Orientation and Seamanship',
    blurb:
      'Naval organisation, ship parts, ropes and knots, boat work, swimming and damage control.',
    groups: ['Navy'],
    years: 'Every year · up to 52 marks in C',
    lessonIds: ['navy-wing'],
  },
  {
    code: 'AIR',
    title: 'Air Force Subjects',
    blurb:
      'Principles of flight, airframes and engines, instruments, airfield layout, meteorology and aeromodelling.',
    groups: ['Air Force'],
    years: 'Every year · up to 54 marks in C',
    lessonIds: ['air-wing'],
  },
  {
    code: 'CAMP',
    title: 'Camp Life and Routine',
    blurb:
      'Reporting, the daily programme, cadet appointments, the duty roster and how a camp is graded.',
    groups: ['Common'],
    years: 'Every year · one camp per certificate',
    lessonIds: ['camp-life'],
  },
  {
    code: 'UNIF',
    title: 'Uniform, Badges and Ranks',
    blurb:
      'Orders of dress, where every badge sits, the cadet rank ladder and care of the uniform.',
    groups: ['Common'],
    years: 'Years 1–3 · inspected at every parade',
    lessonIds: ['uniform-insignia'],
  },
  {
    code: 'PT',
    title: 'Physical Training and Fitness',
    blurb:
      'Endurance, strength, mobility and core work, yoga, fitness standards and injury or heat care.',
    groups: ['Common'],
    years: 'Years 1–3 · camp and SSB',
    lessonIds: ['physical-fitness'],
  },
  {
    code: 'HH',
    title: 'Health, Hygiene and Nutrition',
    blurb:
      'Personal hygiene, safe water, a balanced diet, deficiency diseases and infection control.',
    groups: ['Common'],
    years: 'Years 1–3 · all certificates',
    lessonIds: ['health-hygiene'],
  },
  {
    code: 'SSB',
    title: 'SSB and Career Entry',
    blurb:
      'The five-day Services Selection Board, officer-like qualities and the special entries for C certificate holders.',
    groups: ['Common'],
    years: 'Years 2–3 · C certificate',
    lessonIds: ['ssb-special-entry'],
  },
  {
    code: 'LAW',
    title: 'NCC Act and Discipline',
    blurb:
      'The NCC Act and Rules, enrolment, discipline, and what a cadet may and may not be asked to do.',
    groups: ['Common'],
    years: 'Years 1–3 · all certificates',
    lessonIds: ['ncc-law'],
  },
  {
    code: 'SHOOT',
    title: 'Shooting and Marksmanship',
    blurb:
      'Weapons in NCC use, range safety and commands, firing positions and the fundamentals of marksmanship.',
    groups: ['Common'],
    years: 'Years 1–3 · weapon practical',
    lessonIds: ['shooting'],
  },
  {
    code: 'RVC',
    title: 'Remount and Veterinary',
    blurb:
      'Organisation of the RVC, stable management, shoeing, saddle fitting and common animal conditions.',
    groups: ['Remount & Veterinary'],
    years: 'Certificates B and C · optional paper',
    lessonIds: ['remount-veterinary'],
  },
]

export type Camp = {
  name: string
  short: string
  duration: string
  who: string
  what: string
}

export const camps: Camp[] = [
  {
    name: 'Annual Training Camp',
    short: 'ATC / CATC',
    duration: 'About 10 days',
    who: 'All cadets, at least one per certificate',
    what: 'The core camp: drill, firing, field craft, first aid, games and camp routine. Combined ATCs bring several units together.',
  },
  {
    name: 'Republic Day Camp',
    short: 'RDC',
    duration: 'About a month, New Delhi',
    who: 'Selected SD/SW cadets from every directorate',
    what: 'The national camp and Prime Minister’s Rally. Guard of Honour, drill competition, cultural events and the DG NCC review.',
  },
  {
    name: 'Thal Sainik Camp',
    short: 'TSC',
    duration: 'About 12 days, Delhi Cantt',
    who: 'Selected Army Wing cadets',
    what: 'Army Wing competitions in drill, firing, map reading and field craft that decide the Prime Minister’s Banner.',
  },
  {
    name: 'Vayu Sainik Camp',
    short: 'VSC',
    duration: 'About 12 days',
    who: 'Selected Air Wing cadets',
    what: 'Aeromodelling, flying, navigation and air force subjects, with inter-directorate competition.',
  },
  {
    name: 'Nau Sainik Camp',
    short: 'NSC',
    duration: 'About 12 days',
    who: 'Selected Naval Wing cadets',
    what: 'Boat pulling, sailing regatta, seamanship and swimming competitions.',
  },
  {
    name: 'National Integration Camp',
    short: 'NIC / SNIC',
    duration: 'About 10 to 12 days',
    who: 'Cadets from across states, including special NICs at the borders and islands',
    what: 'Culture, language and cuisine exchange across states, plus lectures, competitions and social service.',
  },
  {
    name: 'Advance and Basic Leadership Camps',
    short: 'ALC / BLC',
    duration: 'About 12 days',
    who: 'Selected SD/SW cadets',
    what: 'Leadership tasks, SSB-orientation, group discussions, obstacle courses and interview practice.',
  },
  {
    name: 'Attachment Camps',
    short: 'Attachment',
    duration: 'Usually 10 to 14 days',
    who: 'Selected cadets',
    what: 'Living and training with a regular Army unit, Navy ship or Air Force station, including service routine and equipment exposure.',
  },
  {
    name: 'Adventure Camps',
    short: 'Rock climbing, trekking, mountaineering',
    duration: 'Varies, 10 to 21 days',
    who: 'Selected cadets, by nomination',
    what: 'Rock climbing at Gwalior or Nayyardam, DGNCC treks, mountaineering courses and para training.',
  },
  {
    name: 'Ek Bharat Shreshtha Bharat Camp',
    short: 'EBSB',
    duration: 'About 12 days',
    who: 'Selected cadets',
    what: 'Paired-state cultural exchange, language learning and shared camps between states.',
  },
  {
    name: 'Mavalankar Shooting Championship',
    short: 'Shooting',
    duration: 'Competition window',
    who: 'Selected marksmen and markswomen',
    what: 'All India NCC shooting championship in rifle and pistol events under NRAI rules.',
  },
  {
    name: 'Youth Exchange Programme',
    short: 'YEP',
    duration: 'About 2 weeks abroad',
    who: 'Best all-round cadets, nominated',
    what: 'Overseas exchange with partner countries, representing Indian cadets abroad.',
  },
]

export type Benefit = { title: string; detail: string }

export const benefits: Benefit[] = [
  {
    title: 'Army — IMA',
    detail:
      '32 vacancies reserved per course for NCC C certificate holders, 64 a year, through UPSC and SSB.',
  },
  {
    title: 'Army — OTA Chennai',
    detail:
      '100 Short Service Commission (Non-Tech) vacancies a year with exemption from the UPSC written exam; SSB only.',
  },
  {
    title: 'Navy',
    detail:
      'Six vacancies reserved per course for NCC C certificate (Naval Wing) holders, SSB only.',
  },
  {
    title: 'Air Force',
    detail:
      '10% of vacancies reserved for NCC C certificate (Air Wing) holders in all courses, including flying training.',
  },
  {
    title: 'CAPF and paramilitary',
    detail:
      'Up to 5% of maximum marks for Sub-Inspector and Constable posts in CAPF; 2 to 10 bonus marks in paramilitary recruitment.',
  },
  {
    title: 'Agniveer recruitment bonus marks',
    detail:
      'Army Agniveer adds 5 marks (Cert A), 10 marks (Cert B), 20 marks for GD / 15 for Tech-Clerk (Cert C), and up to 25 marks GD with Republic Day Camp participation. Navy & Air Force Agniveer schemes also award weightage.',
  },
  {
    title: 'Cadet Welfare Society (CWS)',
    detail:
      'Merit scholarships for academic & NCC excellence, plus financial/medical relief during authorised NCC camps, firing or adventure training.',
  },
  {
    title: 'State police and others',
    detail:
      'Bonus marks or preference in many state police and home department recruitments; rules vary by state.',
  },
  {
    title: 'Education',
    detail:
      'Bonus marks or certificate weightage in several university admissions, plus NCC as an elective subject in some boards.',
  },
  {
    title: 'What C really buys',
    detail:
      'NCC Special Entry, reserved defence vacancies and the confidence of three years of camp, drill and leadership.',
  },
]

export type RankRow = {
  level: string
  army: string
  navy: string
  air: string
  insignia: string
}

export const cadetRanks: RankRow[] = [
  { level: '1 (Highest SD/SW)', army: 'Cadet Senior Under Officer (CSUO)', navy: 'Senior Cadet Captain (SCC)', air: 'Cadet Senior Under Officer (CSUO)', insignia: 'Three white/gold bars on shoulder flaps' },
  { level: '2', army: 'Cadet Under Officer (CUO)', navy: 'Cadet Captain (CC)', air: 'Cadet Under Officer (CUO)', insignia: 'Two white/gold bars on shoulder flaps' },
  { level: '3', army: 'Company Sergeant Major (CSM) / CQMS', navy: 'Petty Officer Cadet (PO)', air: 'Cadet Warrant Officer (CWO)', insignia: 'Crown/ashoka or three chevrons + badge' },
  { level: '4', army: 'Sergeant (Sgt)', navy: 'Leading Cadet', air: 'Cadet Sergeant (C/Sgt)', insignia: 'Three chevrons on right sleeve' },
  { level: '5', army: 'Corporal (Cpl)', navy: 'Cadet Class I', air: 'Cadet Corporal (C/Cpl)', insignia: 'Two chevrons on right sleeve' },
  { level: '6', army: 'Lance Corporal (L/Cpl)', navy: 'Cadet Class II', air: 'Leading Flight Cadet (LF/C)', insignia: 'One chevron on right sleeve' },
  { level: '7 (Entry)', army: 'Cadet', navy: 'Cadet', air: 'Flight Cadet / Cadet', insignia: 'Plain uniform with unit shoulder title' },
]

export const officerRanks: RankRow[] = [
  { level: '1 (Highest)', army: 'Field Marshal (5-Star)', navy: 'Admiral of the Fleet', air: 'Marshal of the Air Force', insignia: 'Honorary / ceremonial wartime 5-star' },
  { level: '2', army: 'General (COAS / CDS)', navy: 'Admiral (CNS)', air: 'Air Chief Marshal (CAS)', insignia: 'Four-star service chief' },
  { level: '3', army: 'Lieutenant General (DGNCC)', navy: 'Vice Admiral', air: 'Air Marshal', insignia: 'DGNCC & Army Commanders' },
  { level: '4', army: 'Major General (ADG)', navy: 'Rear Admiral', air: 'Air Vice Marshal', insignia: 'State Directorate ADG rank' },
  { level: '5', army: 'Brigadier (Gp Cdr)', navy: 'Commodore', air: 'Air Commodore', insignia: 'NCC Group Headquarters Commander' },
  { level: '6', army: 'Colonel (CO)', navy: 'Captain', air: 'Group Captain', insignia: 'Commanding Officer of an NCC Battalion/Sqn' },
  { level: '7', army: 'Lieutenant Colonel', navy: 'Commander', air: 'Wing Commander', insignia: 'OC / Battalion 2IC' },
  { level: '8', army: 'Major', navy: 'Lieutenant Commander', air: 'Squadron Leader', insignia: 'Senior ANO / Administrative Officer' },
  { level: '9', army: 'Captain', navy: 'Lieutenant', air: 'Flight Lieutenant', insignia: 'ANO progression rank' },
  { level: '10 (First)', army: 'Lieutenant', navy: 'Sub Lieutenant', air: 'Flying Officer', insignia: 'First commissioned rank & initial ANO rank' },
]

export const scholarships = [
  { name: 'CWS Merit Scholarship', detail: 'Awarded annually by Cadet Welfare Society to JD/JW/SD/SW cadets excelling in academics and NCC training.' },
  { name: 'Sahara / Best Cadet Scholarships', detail: 'Financial grants for selected Best Cadets at Directorate and National RDC level across Army, Navy and Air wings.' },
  { name: 'Raksha Mantri Padak & Commendation', detail: 'Highest gallantry/meritorious awards for NCC cadets displaying exceptional courage, rescue work, or national service.' },
]

export type Award = { name: string; detail: string }

export const awards: Award[] = [
  { name: 'Prime Minister’s Banner', detail: 'Awarded at RDC to the best directorate, decided across TSC, VSC, NSC and RDC competitions.' },
  { name: 'Best Cadet', detail: 'Directorate and national-level recognition at RDC for all-round performance.' },
  { name: 'NCC C certificate with A grade', detail: 'The highest grading, needed for the strongest special entry claims.' },
  { name: 'DG NCC Commendation', detail: 'Given for exceptional service, adventure achievement or camp performance.' },
  { name: 'Republic Day Camp appointments', detail: 'Guard of Honour, PM Rally and camp appointments are the most visible honours for a cadet.' },
]

export const glossary = [
  { term: 'DGNCC', detail: 'Directorate General of National Cadet Corps, headquartered in New Delhi, commanded by a Lieutenant General.' },
  { term: 'State Directorate', detail: 'The 17 directorates that administer NCC units in states and union territories.' },
  { term: 'Unit', detail: 'A battalion, company, squadron or flight hosted by a school or college.' },
  { term: 'ANO', detail: 'Associate NCC Officer, the teacher or lecturer commissioned to lead a unit.' },
  { term: 'SD / SW / JD / JW', detail: 'Senior Division (college boys), Senior Wing (college girls), Junior Division (school boys), Junior Wing (school girls).' },
  { term: 'ATC', detail: 'Annual Training Camp, the basic camp every cadet must attend.' },
  { term: 'COC', detail: 'Centrally Organised Camp, planned by DGNCC, such as RDC, TSC or NIC.' },
  { term: 'PI staff', detail: 'Permanent Instructional staff, the service instructors who train cadets.' },
]

export const wingMeta: Record<Wing, { accent: string; label: string; note: string }> = {
  Army: { accent: 'olive', label: 'Army Wing', note: 'Drill, weapons, map reading, field craft and military history.' },
  Navy: { accent: 'navy', label: 'Naval Wing', note: 'Seamanship, boat work, navigation and naval communication.' },
  'Air Force': { accent: 'sky', label: 'Air Wing', note: 'Flight principles, engines, instruments and aeromodelling.' },
}
