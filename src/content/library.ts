// The in-app library. Each entry is a study digest written for CadetPath from
// the published NCC, board and Ministry of Defence material, so a cadet can
// read the substance here instead of hunting for a PDF.

export type LibrarySection = {
  heading: string
  body: string
  bullets?: string[]
}

export type LibraryResource = {
  label: string
  url: string
  kind: 'PDF' | 'Page'
  note?: string
}

export type LibraryDoc = {
  id: string
  title: string
  publisher: string
  kind: 'Official' | 'Board' | 'Training' | 'Question bank'
  scope: string
  minutes: number
  summary: string
  sections: LibrarySection[]
  useFor: string[]
  edition: string
  /** Public copies of the original publication, where one is published. */
  resources?: LibraryResource[]
}

export const library: LibraryDoc[] = [
  {
    id: 'ncc-act',
    title: 'The NCC Act and Rules, 1948',
    publisher: 'Government of India',
    kind: 'Official',
    scope: 'All certificates',
    minutes: 6,
    summary:
      'The statute that gives the NCC its legal footing: who may be enrolled, what a cadet is liable for, and how units are raised and administered.',
    sections: [
      {
        heading: 'Why an Act matters to a cadet',
        body: 'The NCC is not a school club. It was constituted by an Act of Parliament in 1948, with rules framed under it. That is why enrolment, discipline, uniform and camp duty carry legal weight, and why a cadet can be punished for misconduct under the NCC Act rather than only under school rules.',
        bullets: [
          'The Act creates the Corps and empowers the Central Government to make rules.',
          'The Rules set out enrolment, discharge, discipline, uniforms and the role of the ANO.',
          'State Directorates and units derive their authority from this framework.',
        ],
      },
      {
        heading: 'Enrolment and discharge',
        body: 'A cadet is enrolled by the unit with the consent of the institution and, for minors, the guardian. Enrolment can end on completion of training, on leaving the institution, on medical grounds, or by discharge for indiscipline. A cadet may also withdraw with the prescribed notice.',
      },
      {
        heading: 'Discipline',
        body: 'Minor offences are dealt with by the unit and the ANO; serious matters can go to higher authority under the Rules. In practice, the fastest route to trouble is absence without leave from camp, misuse of a weapon, or conduct that brings the uniform into disrepute.',
      },
    ],
    useFor: [
      'Understanding why camp orders are lawful orders',
      'Answering “what is the legal basis of the NCC?”',
      'Knowing your rights and obligations on enrolment',
    ],
    edition: 'Act No. XXXI of 1948, with subsequent amendments',
    resources: [
      {
        label: 'The NCC Act and Rules, 1948 — full text',
        url: 'https://ncc.du.ac.in/downloads/NCC%20ACT%20and%20Rules%20%20Dec%201948.pdf',
        kind: 'PDF',
        note: 'PDF hosted by Delhi University NCC',
      },
      {
        label: 'India Code record for Act 31 of 1948',
        url: 'https://indiacode.gov.in/items/530f800d-deb0-47eb-8df7-47cdc4739b36',
        kind: 'Page',
        note: 'Government of India statute repository',
      },
    ],
  },
  {
    id: 'dgncc',
    title: 'How the NCC is organised',
    publisher: 'Directorate General of National Cadet Corps',
    kind: 'Official',
    scope: 'All certificates',
    minutes: 7,
    summary:
      'The chain from HQ DGNCC down to your own unit, what each level does, and where the syllabus, camps and notifications actually come from.',
    sections: [
      {
        heading: 'The chain of command',
        body: 'The Director General, a Lieutenant General, heads HQ DGNCC at New Delhi. Seventeen State Directorates cover the states and union territories, each led by an officer of the rank of Brigadier or equivalent. Group Headquarters sit under the directorates, and units are hosted by schools and colleges.',
        bullets: [
          'DGNCC: policy, syllabus, national camps, inter-directorate competitions.',
          'State Directorate: allotment of cadets to camps, examinations, unit inspection.',
          'Group HQ: coordination across units in a region.',
          'Unit: parades, training, enrolment, camp nominations, led by the ANO.',
        ],
      },
      {
        heading: 'The four divisions',
        body: 'Junior Division (boys) and Junior Wing (girls) are school units working towards Certificate A. Senior Division (boys) and Senior Wing (girls) are college units working towards Certificates B and C. A unit may be a battalion, company, squadron, flight or a smaller sub-unit depending on strength and wing.',
      },
      {
        heading: 'Where the paperwork lives',
        body: 'Syllabus circulars, training calendars, camp instructions and examination notifications are issued through the directorate chain. Your ANO holds the current copies; the DGNCC and directorate publications are the authority when a local instruction looks out of date.',
      },
      {
        heading: 'What this means for study',
        body: 'The syllabus you are examined on is the one issued for your training year. If a question bank and a circular disagree, the circular wins. The lessons in CadetPath follow the published syllabus; local additions should come from your ANO in writing.',
      },
    ],
    useFor: [
      'Answering organisation questions in Paper III',
      'Knowing whom to approach for a camp or exam problem',
      'Checking whether a local instruction is current',
    ],
    edition: 'Current directorate structure',
  },
  {
    id: 'certification',
    title: 'Certificate programme: A, B and C',
    publisher: 'State Directorates / DGNCC',
    kind: 'Official',
    scope: 'Certificates A, B, C',
    minutes: 8,
    summary:
      'The eligibility, camp and service conditions behind each certificate, plus grading and the one retest allowed for C.',
    sections: [
      {
        heading: 'Certificate A',
        body: 'Taken by Junior Division and Junior Wing cadets after two years of training. The cadet needs 75% attendance in the first and second year syllabus, at least one Annual Training Camp, and no break in service beyond the permitted period.',
        bullets: [
          'Two years of training in a JD/JW unit.',
          '75% of training periods attended.',
          'At least one ATC.',
          'Break in service within the prescribed limit.',
        ],
      },
      {
        heading: 'Certificate B',
        body: 'Taken by Senior Division and Senior Wing cadets after two years of senior training. It requires 75% attendance, one ATC or an equivalent centrally organised camp or attachment, and for Air Wing a minimum number of glide launches. Certificate A holders get bonus marks.',
        bullets: [
          'One ATC, NIC, COC or unit attachment.',
          '10 bonus marks for Certificate A holders.',
          'Air Wing: minimum glide launches as prescribed.',
          'Break in service within the prescribed limit.',
        ],
      },
      {
        heading: 'Certificate C',
        body: 'The third-year senior certificate. The cadet must already hold B, passed at least a year earlier, be in the third year of training, have 75% attendance, and have attended an ATC plus a second national-level activity such as RDC, a centrally organised camp, para training, a DGNCC trek, attachment or an approved adventure course.',
      },
      {
        heading: 'Grading and retest',
        body: 'Every paper is out of 500: 350 common and 150 specialised. A cadet must score 45% in each paper and 50% in aggregate. Grades are A at 80% and above, B from 65% to below 80%, and C from 50% to below 65%. One retest is allowed to improve a C certificate grading.',
        bullets: [
          'Fail below 45% in any paper, or below 50% aggregate.',
          'Grade A is the target for special entry claims.',
          'Retest is for improving a C grading, not for a fresh attempt at B.',
        ],
      },
    ],
    useFor: [
      'Checking whether you are eligible before applying',
      'Explaining grading in an interview',
      'Planning camps across three years',
    ],
    edition: 'Current certificate regulations',
  },
  {
    id: 'special-order',
    title: 'Special NCC Order on certificate examinations',
    publisher: 'DGNCC',
    kind: 'Official',
    scope: 'Certificates A, B, C',
    minutes: 6,
    summary:
      'The consolidated instruction on how certificate exams are conducted: who is eligible, how marks are allotted, bonus marks, and what counts as malpractice.',
    sections: [
      {
        heading: 'What the order consolidates',
        body: 'It brings the scattered instructions on certificate examinations into one directive: eligibility, the papers and their marks, the conduct of practicals, the grading table, bonus marks and retest. When a unit or a guide quotes a rule, this is the document to check it against.',
      },
      {
        heading: 'Conduct of the examination',
        body: 'Written papers are held at centres notified by the directorate; practicals are conducted by a board that includes service instructors. Practical marks for drill, weapon training, map reading and field craft are awarded on the day, so turnout and confidence carry real marks.',
        bullets: [
          'Written and practical components are marked separately, then aggregated.',
          'Practical boards assess command, technique and safety, not only the final result.',
          'A cadet who misses a practical component cannot make it up in the written paper.',
        ],
      },
      {
        heading: 'Bonus marks and retest',
        body: 'Certificate A carries 10 bonus marks towards B. A C certificate holder may be allowed one retest to improve the grading. Bonus marks and retest are administrative concessions with conditions — they are not a substitute for the pass mark in each paper.',
      },
      {
        heading: 'Malpractice',
        body: 'Carrying material into the hall, exchanging answers or impersonation ends the candidature and can bar future attempts. The risk is not worth it: one re-attempt costs a year, disqualification can cost the certificate.',
      },
    ],
    useFor: [
      'Settling a dispute about eligibility or marks',
      'Understanding how practicals are marked',
      'Knowing the retest rule precisely',
    ],
    edition: 'Consolidated directive on certificate examinations',
  },
  {
    id: 'cbse-syllabus',
    title: 'CBSE NCC (076) senior secondary syllabus',
    publisher: 'Central Board of Secondary Education',
    kind: 'Board',
    scope: 'Class XI and XII',
    minutes: 9,
    summary:
      'The school-board version of the NCC syllabus: subject periods, the common and specialised split, and how theory and practical marks are divided.',
    sections: [
      {
        heading: 'Structure',
        body: 'The syllabus runs across Class XI and XII as an elective. Each year carries common subjects for every cadet and specialised subjects for the wing. The examination weight is split between theory and practical, with drill and weapon training carrying substantial practical marks.',
        bullets: [
          'Common subjects: NCC general, national integration, personality development, leadership, social service, health and hygiene, disaster management, adventure, border areas.',
          'Specialised subjects: Army, Navy or Air Force, chosen by the cadet’s wing.',
          'Practicals: drill, weapon handling, map reading and field craft where applicable.',
        ],
      },
      {
        heading: 'Why the periods matter',
        body: 'The syllabus allots teaching periods to each subject. Those periods are the best guide to how much a topic is worth in the paper: a subject with 40 periods will produce more questions than one with 5. Use the period counts to decide where to spend revision time.',
      },
      {
        heading: 'How CadetPath maps to it',
        body: 'Every lesson here is tagged to a syllabus subject, and the marks tables in the Learn room reproduce the allotment for each certificate and wing. Where the board syllabus and the certificate syllabus differ slightly in emphasis, both are covered.',
      },
    ],
    useFor: [
      'School cadets taking NCC as a board subject',
      'Deciding revision time by period weight',
      'Cross-checking the official subject list',
    ],
    edition: 'Senior secondary curriculum, current session',
    resources: [
      {
        label: 'CBSE NCC (076) senior secondary syllabus',
        url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/NCC_SrSec_2024-25.pdf',
        kind: 'PDF',
        note: 'official CBSE Academic PDF',
      },
    ],
  },
  {
    id: 'cbse-sample',
    title: 'Board sample paper and marking scheme',
    publisher: 'Central Board of Secondary Education',
    kind: 'Board',
    scope: 'Class XI and XII',
    minutes: 5,
    summary:
      'The question pattern examiners actually use: section structure, marks per question, and how a marker awards or withholds marks.',
    sections: [
      {
        heading: 'The pattern',
        body: 'The paper is divided into sections by question type, with objective questions carrying one mark each and longer answers carrying three to five. Practical subjects are assessed separately by the school and the external examiner.',
        bullets: [
          'Objective questions reward recall of names, dates, marks and definitions.',
          'Short answers need one point per mark, written as separate sentences.',
          'Long answers need a structure: definition, explanation, example, conclusion.',
        ],
      },
      {
        heading: 'How answers are marked',
        body: 'Markers work from a scheme with key points. A correct idea in the wrong place still earns; a correct heading with no content does not. Write the point first, then explain it in one sentence, then give an example — the scheme looks for the point and the example.',
      },
      {
        heading: 'Using it well',
        body: 'Attempt a sample paper cold, mark it strictly against the scheme, then re-attempt only the questions you lost marks on. Re-reading the model answer without writing your own first gives a false sense of preparation.',
      },
    ],
    useFor: [
      'Practising the exact paper pattern',
      'Learning how marks are awarded',
      'Diagnosing where answers lose marks',
    ],
    edition: 'Sample question paper and marking scheme, current session',
    resources: [
      {
        label: 'CBSE Class XII NCC sample question paper, 2026-27',
        url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2026_27/NCC-SQP.pdf',
        kind: 'PDF',
      },
      {
        label: 'CBSE Class XII NCC marking scheme, 2026-27',
        url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2026_27/NCC-MS.pdf',
        kind: 'PDF',
      },
    ],
  },
  {
    id: 'bc-guide',
    title: 'B and C certificate examination guide',
    publisher: 'University NCC cell / training directorate',
    kind: 'Question bank',
    scope: 'Certificates B and C',
    minutes: 8,
    summary:
      'A paper-by-paper allotment of marks with a large solved question bank, widely used by senior division cadets for revision.',
    sections: [
      {
        heading: 'The allotment of marks',
        body: 'The guide sets out the marks for each paper: drill, weapon training, the miscellaneous paper, and the specialised paper for each wing. The totals confirm the structure — 350 common and 150 specialised, 500 in all — and show which subjects carry enough marks to justify heavy revision.',
        bullets: [
          'Drill is entirely practical: 80 in A and B, 50 in C.',
          'Weapon training mixes written and practical, with the practical share rising in C.',
          'The miscellaneous paper grows from 205 in A to 230 in C.',
        ],
      },
      {
        heading: 'How to use a solved bank',
        body: 'Do not read it like a novel. Pick a subject, read the lesson, then answer the bank’s questions without looking. Mark yourself, then read only the answers you missed. Repeat the missed set after three days; that interval is what makes it stick.',
      },
      {
        heading: 'Where banks go stale',
        body: 'Question banks age: a camp name, a rank or a scheme can change. Where a bank and the current syllabus circular disagree, follow the circular. CadetPath lessons are written against the current published figures.',
      },
    ],
    useFor: [
      'Senior division revision by paper',
      'Checking the marks behind a subject',
      'Building a question practice routine',
    ],
    edition: 'Compiled B and C examination guide',
  },
  {
    id: 'manuu-bank',
    title: 'NCC question bank for common subjects',
    publisher: 'Maulana Azad National Urdu University NCC',
    kind: 'Question bank',
    scope: 'All certificates',
    minutes: 6,
    summary:
      'Directorate-style questions with answers across the common subjects — useful for the wording exams actually use.',
    sections: [
      {
        heading: 'What it covers',
        body: 'The bank runs through NCC general, national integration, personality development, leadership, social service, health and hygiene, disaster management, adventure and border areas, with short answered questions in each.',
        bullets: [
          'Definitions: leadership, national integration, personality, discipline.',
          'Lists: aims of the NCC, phases of disaster management, types of camps.',
          'Numbers: marks per paper, attendance requirement, camp durations.',
        ],
      },
      {
        heading: 'The wording advantage',
        body: 'Reading questions in exam language trains you to recognise what is being asked. “State three aims” wants three short phrases; “discuss” wants a paragraph with an example. Practise identifying the command word before you write.',
      },
      {
        heading: 'A three-pass method',
        body: 'First pass: answer everything you know without help. Second: read only the answers you missed. Third, after three days: re-answer the missed questions from memory. If you can do the third pass, the topic is exam-ready.',
      },
    ],
    useFor: [
      'Practising exam wording',
      'Quick revision of common subjects',
      'Building a three-pass revision habit',
    ],
    edition: 'Directorate-style common subject bank',
  },
  {
    id: 'mod-report',
    title: 'Ministry of Defence annual report — NCC chapter',
    publisher: 'Ministry of Defence',
    kind: 'Official',
    scope: 'All certificates',
    minutes: 5,
    summary:
      'The government’s own account of the NCC year: cadet strength, camps conducted, budget and the activities that were actually run.',
    sections: [
      {
        heading: 'What the chapter reports',
        body: 'Each year the annual report summarises the NCC: total cadet strength across the four divisions, the number of camps and courses conducted, adventure activities, social service and the youth exchange programme. It is the best source for scale figures.',
        bullets: [
          'Cadet strength and the male-female split.',
          'Number of units, directorates and training establishments.',
          'Camps conducted and cadets trained.',
          'Social service, adventure and international exchanges.',
        ],
      },
      {
        heading: 'Why it is useful in an interview',
        body: 'Quoting a real figure — the size of the Corps, the number of cadets at a national camp — shows you understand the organisation you want to join. It also gives you a question to ask: how the unit’s training maps to the national plan.',
      },
      {
        heading: 'Reading it quickly',
        body: 'Skip to the NCC chapter, read the summary paragraph, then the tables. You need three numbers you can defend, not the whole document.',
      },
    ],
    useFor: [
      'SSB and interview preparation',
      'Understanding the scale of the Corps',
      'Answering “what does the NCC actually do?”',
    ],
    edition: 'Latest annual report',
  },
  {
    id: 'drill-handbook',
    title: 'Drill and technical skills handbook',
    publisher: 'Directorate of NCC training',
    kind: 'Training',
    scope: 'Senior Division / Senior Wing',
    minutes: 10,
    summary:
      'The practical drill reference: words of command, foot drill, arms drill, ceremonial drill and the technical skills expected of senior cadets.',
    sections: [
      {
        heading: 'Foot drill',
        body: 'Every movement starts from Savdhan. The handbook sets out the position of attention, stand at ease, turning, marching, halting, saluting and forming up, with the exact words of command and the faults examiners look for.',
        bullets: [
          'Attention: heels together, toes at about 30 degrees, body erect, arms hanging.',
          'Tez Chal: step out with the left foot, arms swinging straight from the shoulder.',
          'Tham: bring the trailing foot in without stamping or hopping.',
          'Dressing: align on the right-hand man, head and eyes still.',
        ],
      },
      {
        heading: 'Arms drill',
        body: 'With a rifle, the drill adds the positions of attention and ease, ordering and shouldering arms, presenting, saluting and guard mounting. Safety is part of the drill: the weapon is unloaded and checked before every drill period.',
      },
      {
        heading: 'Ceremonial drill',
        body: 'Guard of honour, the general salute, the march past and the colours are ceremonial drill. Timing and alignment matter more than speed; one cadet out of step is visible from the saluting dais.',
      },
      {
        heading: 'Technical skills',
        body: 'Senior cadets are expected to handle map reading equipment, field signals, section formations and basic weapon handling. The handbook pairs each skill with the practical test used at camp.',
      },
    ],
    useFor: [
      'Rehearsing words of command',
      'Preparing for the drill practical',
      'Teaching juniors the standard movements',
    ],
    edition: 'Current training handbook',
  },
  {
    id: 'training-manual',
    title: 'Training manual and syllabus circular',
    publisher: 'DGNCC training directorate',
    kind: 'Training',
    scope: 'All certificates and wings',
    minutes: 8,
    summary:
      'The training side of the Corps: how periods are allotted, what a training year looks like from the unit to the national camp, and how the syllabus circular is read.',
    sections: [
      {
        heading: 'How a training year is built',
        body: 'The directorate issues a training calendar each year. A unit turns it into a parade programme: a fixed number of training periods per year, split across common subjects, wing subjects, drill and camp preparation. Attendance is counted against those periods, which is why the 75% rule is measured in periods and not in days.',
        bullets: [
          'Common subjects for every cadet, then wing subjects for the specialised paper.',
          'Periods carry practicals — drill, weapon handling, map reading, field craft.',
          'Camp training counts towards the same syllabus, not as an extra.',
        ],
      },
      {
        heading: 'Reading the syllabus circular',
        body: 'The circular lists subject, periods, marks and the year in which each topic is taught. When a local handout adds a topic, check whether the circular carries it. If a topic is in the circular but not in this library, it is still examinable — tell your ANO and study it from the unit copy.',
      },
      {
        heading: 'The instructor’s method',
        body: 'NCC training follows a simple pattern: explain, demonstrate, practise, correct, test. A drill period is not a lecture, and a map reading period is not a reading hour. Cadets learn by doing, so arrive ready to move.',
      },
    ],
    useFor: [
      'Planning your own training year',
      'Checking whether a local handout is examinable',
      'Understanding the 75% attendance rule',
    ],
    edition: 'Current training year circular',
  },
  {
    id: 'map-manual',
    title: 'Map reading manual: drills and field exercises',
    publisher: 'Directorate of NCC training',
    kind: 'Training',
    scope: 'All certificates, Army paper',
    minutes: 9,
    summary:
      'The practical map reading sequence as it is taught and tested: setting the map, grid references, bearings, resection and the night march.',
    sections: [
      {
        heading: 'Setting a map',
        body: 'Lay the map flat, identify two features you can also see on the ground, and rotate the map until the line between them matches the ground. With a compass, place it on the grid lines and turn the map until the grid north line points to grid north.',
        bullets: [
          'By inspection: two identified features and a straight edge.',
          'By compass: align the grid lines with the compass north, allowing for magnetic variation.',
        ],
      },
      {
        heading: 'The drills examiners use',
        body: 'A candidate is given a feature and asked for its six-figure grid reference; or a grid reference and asked to describe the ground there. The next drill reverses the compass bearing to a back bearing, then converts grid to magnetic. A resection — fixing your own position from two or three known points — is the standard final test.',
        bullets: [
          'Grid reference: easting first, then northing, six figures in all.',
          'Back bearing: add or subtract 180 degrees.',
          'Magnetic bearing: grid bearing plus easterly variation, or minus westerly.',
          'Resection: take bearings to two features, draw the back bearings, and your position is where they cross.',
        ],
      },
      {
        heading: 'Night and field work',
        body: 'On a night march the map is read under a red torch to protect night vision, pacing and timing replace visible features, and a box of matches, compass and pencil are carried on the person. Silhouettes, sounds and stars supplement the map; a cadet who trusts the map alone walks into a nullah.',
      },
    ],
    useFor: [
      'Rehearsing the practical map reading test',
      'Running a night navigation exercise',
      'Checking the bearing arithmetic',
    ],
    edition: 'Current training manual, map reading chapter',
  },
  {
    id: 'weapon-manual',
    title: 'Weapon training manual: characteristics and firing',
    publisher: 'Directorate of NCC training',
    kind: 'Training',
    scope: 'All certificates',
    minutes: 8,
    summary:
      'The weapons a cadet handles, their characteristics, stripping and assembly, and the range procedure that governs every shot fired.',
    sections: [
      {
        heading: 'The weapons',
        body: 'The .22 Deluxe rifle introduces sight picture and trigger control at 25 and 50 metres. The 7.62 mm SLR and the 5.56 mm INSAS are the service rifles studied for characteristics, stripping, loading and firing. The 7.62 mm LMG is shown as a light automatic weapon, and the 9 mm pistol and carbine appear in familiarisation only.',
        bullets: [
          '.22 rifle: bolt action, magazine fed, negligible recoil, 25 m grouping and 50 m classification.',
          '7.62 mm SLR: gas-operated, 20-round magazine, about 300–400 m effective range.',
          '5.56 mm INSAS: gas-operated, 30-round magazine, lighter recoil, about 400 m effective range.',
          '7.62 mm LMG: bipod, automatic fire, about 800 m effective range.',
        ],
      },
      {
        heading: 'Stripping and assembly',
        body: 'Stripping is taught in a fixed order under supervision: remove the magazine, check the chamber, then take off the parts the weapon allows — bolt or bolt carrier group, return spring, and on the SLR the gas plug. Reassembly is the reverse, finished by a function check. Nothing is forced; if a part will not seat, it is in the wrong place.',
      },
      {
        heading: 'Range procedure',
        body: 'A range runs by the range officer’s words of command: load, ready, fire, stop, unload, show clear. A misfire is kept pointing down the range for the prescribed wait before the weapon is opened. Scores are recorded, signed and the grouping measured between the two furthest shots.',
      },
      {
        heading: 'Cleaning and care',
        body: 'A weapon is cleaned after every firing and inspected before it is returned to the armoury. The bore is cleaned from the breech where possible, oiled lightly, and the exterior wiped. A dirty weapon fails, and a weapon returned dirty is a charge against the cadet who signed for it.',
      },
    ],
    useFor: [
      'Learning characteristics for the written paper',
      'Rehearsing stripping and assembly',
      'Knowing the range commands in order',
    ],
    edition: 'Current weapon training pamphlet',
  },
  {
    id: 'ssb-guide',
    title: 'SSB and NCC special entry guide',
    publisher: 'CadetPath, from published selection-centre material',
    kind: 'Question bank',
    scope: 'Certificates B and C',
    minutes: 9,
    summary:
      'The five-day board, the tests in each, the officer-like qualities assessed, and the reserved entries open to a C certificate holder.',
    sections: [
      {
        heading: 'The five days',
        body: 'Day one screens with the OIR test and the picture perception and discussion test. Days two and three combine the psychological battery with group testing by a group testing officer. Day four is the personal interview, and day five is the conference and result.',
        bullets: [
          'Psychological: TAT, WAT, SRT and Self-Description.',
          'Group: discussion, group planning, progressive and half group tasks, individual obstacles, command task, lecturette, final group task.',
          'Interview: personal history, education, NCC service, awareness of the service.',
        ],
      },
      {
        heading: 'The qualities assessed',
        body: 'The board scores officer-like qualities: effective intelligence, reasoning, organising ability, power of expression, social adaptability, cooperation, responsibility, initiative, self-confidence, speed of decision, ability to influence, liveliness, determination and courage. A candidate is not required to be extroverted; consistency and genuine effort matter more than performance.',
      },
      {
        heading: 'Preparing without coaching tricks',
        body: 'Practise speaking for three minutes, run and do strength work, read a newspaper daily, and keep a factual record of your NCC service — camps, appointments, courses and what you actually did. Rehearse your own story rather than a borrowed one; assessors detect a script quickly.',
      },
      {
        heading: 'Entries after the C certificate',
        body: 'The reserved routes are 32 IMA vacancies per course and 100 OTA Chennai SSC (Non-Technical) vacancies a year for the Army, six Naval vacancies per course for the Naval Wing, and 10% of Air Force vacancies for the Air Wing. CAPF, state police and universities add bonus marks under their own rules.',
      },
    ],
    useFor: [
      'Understanding the five-day sequence',
      'Preparing for the interview and lecturette',
      'Choosing which entry to apply for',
    ],
    edition: 'Compiled from current selection-centre material',
    resources: [
      {
        label: 'Indian Army official recruitment portal',
        url: 'https://www.joinindianarmy.nic.in/',
        kind: 'Page',
        note: 'notifications, entries and SSB information',
      },
    ],
  },
  {
    id: 'first-aid-manual',
    title: 'First aid manual: casualty care',
    publisher: 'St John Ambulance / Indian Red Cross material, digested',
    kind: 'Training',
    scope: 'All certificates',
    minutes: 8,
    summary:
      'The casualty care a cadet is expected to know: the primary survey, CPR, bleeding, fractures, burns, poisoning and transport.',
    sections: [
      {
        heading: 'The primary survey',
        body: 'Danger, response, airway, breathing, circulation. Make the scene safe, check response, open the airway, look for normal breathing, and control catastrophic bleeding before anything else. Call for emergency help early — a cadet is not expected to do everything alone.',
        bullets: [
          'Danger: traffic, fire, electricity, falling debris.',
          'Response: speak, then tap the shoulders.',
          'Airway: head tilt, chin lift; remove visible obstructions only.',
          'Breathing: look, listen and feel for up to ten seconds.',
        ],
      },
      {
        heading: 'CPR',
        body: 'For an adult who is unresponsive and not breathing normally, start chest compressions: heel of the hand on the centre of the chest, 30 compressions at 100–120 a minute, depth about 5–6 cm, then two rescue breaths if trained. Use an AED as soon as it arrives and continue until help takes over.',
      },
      {
        heading: 'Bleeding, fractures and burns',
        body: 'Press firmly on a bleeding wound with a clean dressing and add layers rather than removing a soaked dressing. Immobilise a suspected fracture above and below the break and check circulation beyond it. Cool a burn with running water for at least 20 minutes and cover it loosely; never apply ice, oil or toothpaste.',
      },
      {
        heading: 'Poisoning, bites and transport',
        body: 'For poisoning, do not induce vomiting; keep the container and get medical help. For a snake bite, immobilise the limb, keep the casualty calm, remove rings and tight items, and evacuate — do not cut, suck or apply a tourniquet. Move a casualty only if the scene is unsafe, and use a stretcher with the head and breathing monitored on the way.',
      },
    ],
    useFor: [
      'Revising the first aid practical',
      'Running a casualty drill at camp',
      'Knowing what not to do',
    ],
    edition: 'Standard first aid practice, digested for cadets',
  },
  {
    id: 'ndma',
    title: 'Disaster management guidelines',
    publisher: 'National Disaster Management Authority',
    kind: 'Official',
    scope: 'All certificates',
    minutes: 7,
    summary:
      'India’s disaster framework and the cadet’s place in it: the phases, the authorities, and what a unit actually does when a district is hit.',
    sections: [
      {
        heading: 'The framework',
        body: 'The Disaster Management Act, 2005 created the NDMA at the centre, state disaster management authorities in the states, and district authorities. The National Disaster Response Force is the specialist response force; the armed forces and the NCC assist when requisitioned by the civil administration.',
      },
      {
        heading: 'The disaster cycle',
        body: 'Mitigation and prevention, preparedness, response and recovery. Mitigation reduces risk before an event; preparedness plans the response; response saves lives in the first hours; recovery restores services and livelihoods. Reconstruction with better standards closes the cycle back into mitigation.',
      },
      {
        heading: 'The cadet’s role',
        body: 'Cadets are used for crowd management, relief distribution, first aid, shelter management, helpline support and awareness campaigns — under the direction of the district administration. A cadet is not a rescue specialist and should never enter a collapsed structure or flood water without trained supervision.',
        bullets: [
          'Report to the unit, not directly to the incident site.',
          'Carry identity, water, torch and a basic first aid kit.',
          'Record what you distribute; relief without records creates disputes.',
        ],
      },
    ],
    useFor: [
      'Answering disaster management questions',
      'Knowing the legal framework and the phases',
      'Understanding what cadets may be asked to do',
    ],
    edition: 'DM Act 2005 and current NDMA guidelines',
    resources: [
      {
        label: 'NDMA guidelines library',
        url: 'https://ndma.gov.in/en/ndma-guidelines',
        kind: 'Page',
        note: 'every national guideline, free to download',
      },
    ],
  },
  {
    id: 'fitness-manual',
    title: 'Physical training and sports manual',
    publisher: 'Directorate of NCC training',
    kind: 'Training',
    scope: 'All certificates',
    minutes: 7,
    summary:
      'The PT syllabus, the standards worth training for, and the injury and heat rules every camp repeats.',
    sections: [
      {
        heading: 'The PT syllabus',
        body: 'Physical training in the NCC covers freehand exercises, running, obstacle work, games, yoga and swimming where available. The aim is a cadet who can complete a route march, carry a load and recover quickly — not a specialist athlete.',
      },
      {
        heading: 'Standards',
        body: 'Aim for a 2.4 km run near 10–12 minutes, 30–40 push-ups and 40–50 sit-ups a minute, and six or more pull-ups. Service selection also checks height, weight and vision against the current notification for that entry.',
      },
      {
        heading: 'Injury and heat',
        body: 'RICE for sprains and strains; do not run through a stress fracture. Heat exhaustion is treated by shade, cooling and ORS if fully conscious; heat stroke with confusion is an emergency. Blisters are padded, not burst, and wet socks are changed at once.',
      },
    ],
    useFor: [
      'Building a weekly training plan',
      'Preparing for the camp PT test',
      'Revising injury and heat rules',
    ],
    edition: 'Current PT and sports syllabus',
  },
  {
    id: 'adventure-manual',
    title: 'Adventure training manual',
    publisher: 'DGNCC adventure wing',
    kind: 'Training',
    scope: 'All certificates',
    minutes: 7,
    summary:
      'Rock climbing, rappelling, trekking and watermanship as they are taught: equipment, knots, safety and the camp routine.',
    sections: [
      {
        heading: 'What adventure training covers',
        body: 'The adventure syllabus runs from the unit obstacle course to national courses in rock climbing, mountaineering, trekking, para training and sailing. Each activity has a progression: ground training, supervised practice, then assessment. Nobody is taken onto a rock face or into a boat without the earlier stage signed off.',
      },
      {
        heading: 'Equipment and knots',
        body: 'A climbing helmet, harness, rope, karabiner, sling and descender are inspected before use and retired after a fall or damage. Cadets learn the bowline, figure-of-eight, clove hitch, round turn and two half hitches, and the tape knot. The bowline makes a fixed loop that will not slip; the figure-of-eight is the standard tie-in knot; the clove hitch is used to attach a rope to a post.',
      },
      {
        heading: 'Safety rules that are never relaxed',
        body: 'One person is in charge, and that person checks every harness and knot before a climb. The belay is always live, the helmet stays on, and a route is reconnoitred before a group walks it. In watermanship, a life jacket is worn before boarding, and the boat is never overloaded.',
      },
    ],
    useFor: [
      'Preparing for an adventure camp',
      'Learning the basic knots for a practical test',
      'Understanding the safety chain',
    ],
    edition: 'Current adventure training instructions',
  },
  {
    id: 'naval-handbook',
    title: 'Naval wing handbook: seamanship and navigation',
    publisher: 'Directorate of NCC training, Naval Wing',
    kind: 'Training',
    scope: 'Naval Wing',
    minutes: 8,
    summary:
      'Ship organisation, ropes and knots, boat work, buoyage and the navigation a naval cadet is examined on.',
    sections: [
      {
        heading: 'The ship',
        body: 'A ship has a bow, stern, port and starboard side, a keel, deck and superstructure, with compartments split by bulkheads. Naval cadets learn the parts of a ship, the meaning of displacement and draught, and the broad organisation of a warship: operations, engineering, logistics and the executive branch that drives the ship.',
        bullets: [
          'Port is left facing forward, starboard right; ahead and astern are directions.',
          'Draught is the depth of water a ship needs; displacement is the weight of water it displaces.',
          'Bulkheads divide the hull so damage can be contained.',
        ],
      },
      {
        heading: 'Seamanship',
        body: 'Seamanship covers ropes, knots, splices, anchoring, mooring and boat work. A naval cadet should be able to name the parts of a rope, tie the bowline, reef knot, clove hitch and sheet bend, coil and stow a line, and handle a boat under oars or sail with a crew.',
        bullets: [
          'Reef knot joins two ropes of equal thickness; a sheet bend joins unequal ropes.',
          'A bowline makes a loop that will not slip under load.',
          'Buoyage: port-hand marks and starboard-hand marks guide a vessel into harbour.',
        ],
      },
      {
        heading: 'Navigation and communication',
        body: 'Navigation at cadet level is coastal: compass bearings, chart symbols, tides, and the rule that a vessel must keep a proper lookout. Naval communication covers flags, semaphore, morse and radio telephony, each with its own procedure and phonetic alphabet.',
      },
    ],
    useFor: [
      'Revising the Naval Wing specialised paper',
      'Preparing for boat work at camp',
      'Learning the knots and buoyage',
    ],
    edition: 'Current Naval Wing training notes',
  },
  {
    id: 'air-handbook',
    title: 'Air wing handbook: flight and airfield practice',
    publisher: 'Directorate of NCC training, Air Wing',
    kind: 'Training',
    scope: 'Air Wing',
    minutes: 8,
    summary:
      'How an aircraft flies, what its parts and instruments do, how an airfield runs, and what a cadet is expected to know before a launch.',
    sections: [
      {
        heading: 'Principles of flight',
        body: 'Four forces act on an aircraft: lift, weight, thrust and drag. Lift is produced as air flows over the wing, faster over the curved upper surface, creating lower pressure. Angle of attack increases lift until the wing stalls, at which point the airflow separates and lift collapses. Control surfaces are the ailerons for roll, the elevator for pitch and the rudder for yaw.',
        bullets: [
          'Lift opposes weight; thrust opposes drag.',
          'Stall is caused by excessive angle of attack, not by low speed alone.',
          'Ailerons roll, elevator pitches, rudder yaws.',
        ],
      },
      {
        heading: 'Airframes, engines and instruments',
        body: 'An airframe is the structure: fuselage, wings, tail unit and landing gear. Engines are piston or jet; a piston engine drives a propeller, a jet engine produces thrust by accelerating air. Basic instruments are the airspeed indicator, altimeter, vertical speed indicator, artificial horizon, heading indicator and turn coordinator.',
      },
      {
        heading: 'Airfield layout and safety',
        body: 'A runway is numbered by its magnetic heading in tens of degrees, so runway 27 points about 270 degrees. Taxiways link the apron to the runway, the windsock shows wind direction, and the circuit keeps aircraft separated. A cadet on the airfield follows the duty officer, stays clear of the propeller arc and never walks onto a runway without clearance.',
      },
      {
        heading: 'Aeromodelling and gliding',
        body: 'Aeromodelling teaches the same forces at small scale: balance, trim, centre of gravity and control surfaces. Air Wing cadets also fly gliders and complete the prescribed number of launches, learning to read the air and to use the controls smoothly.',
      },
    ],
    useFor: [
      'Revising the Air Wing specialised paper',
      'Understanding the instruments and runway markings',
      'Preparation for a flying or aeromodelling camp',
    ],
    edition: 'Current Air Wing training notes',
  },
  {
    id: 'dress-regulations',
    title: 'Dress regulations and insignia',
    publisher: 'DGNCC',
    kind: 'Official',
    scope: 'All certificates',
    minutes: 5,
    summary:
      'Orders of dress for every occasion and the exact placement of badges, ranks and shoulder titles.',
    sections: [
      {
        heading: 'Orders of dress',
        body: 'The regulations set out working dress, review order, walking out dress and physical training kit, with the headgear, belt and footwear for each. The order for a parade is published in the parade instructions and may be changed by the adjutant; a cadet wears what is ordered, not what is comfortable.',
      },
      {
        heading: 'Badges and their places',
        body: 'Shoulder titles sit on both shoulders, the name plate above the right pocket, rank badges on the sleeve or shoulder as the wing directs, and camp and course badges on the right sleeve. A certificate badge is worn only after the certificate is awarded.',
        bullets: [
          'Beret: badge above the left eye, band level, hair clear of the face.',
          'Boots: polished including the welt, laces even and tucked.',
          'No jewellery, no visible piercings, nails short and clean.',
        ],
      },
      {
        heading: 'Why turnout is marked',
        body: 'Turnout is the first thing an inspecting officer sees and the easiest mark to lose. A missing button, an unpolished boot or a badge in the wrong place reads as indiscipline before a cadet has said a word. Fix the uniform the night before, not in the queue.',
      },
    ],
    useFor: [
      'Checking a parade order of dress',
      'Placing a new badge correctly',
      'Preparing for inspection',
    ],
    edition: 'Current dress regulations',
  },
]
