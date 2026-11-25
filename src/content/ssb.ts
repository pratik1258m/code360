// Complete NCC Special Entry guide, 5-Day SSB breakdown, 15 Officer Like Qualities
// (OLQs), PPDT practice pictures and NCC-specific interview questions.

export type OLQ = {
  num: number
  factor: 'Factor I: Planning & Organising' | 'Factor II: Social Adjustment' | 'Factor III: Social Effectiveness' | 'Factor IV: Dynamic'
  name: string
  hindiName: string
  description: string
  nccDemonstration: string
}

export type SSBStage = {
  day: string
  title: string
  hindiTitle: string
  tests: { name: string; detail: string; tip: string }[]
}

export type PPDTSample = {
  id: string
  title: string
  visualDescription: string
  characters: { age: number; gender: 'M' | 'F'; mood: '+' | '0' | '-' }[]
  action: string
  sampleStory: string
  officerAngle: string
}

export const olqList: OLQ[] = [
  {
    num: 1,
    factor: 'Factor I: Planning & Organising',
    name: 'Effective Intelligence',
    hindiName: 'प्रभावी बुद्धिमत्ता',
    description: 'Ability to tackle practical everyday problems and produce workable solutions using resources at hand.',
    nccDemonstration: 'Demonstrated in camp logistics, tent pitching, and improvised casualty evacuation using rifles and blankets.',
  },
  {
    num: 2,
    factor: 'Factor I: Planning & Organising',
    name: 'Reasoning Ability',
    hindiName: 'तार्किक क्षमता',
    description: 'Ability to grasp essentials, analyze causes and effects, and reach logical, sound conclusions.',
    nccDemonstration: 'Map reading resection, calculating compass bearings, and evaluating field craft fire control orders.',
  },
  {
    num: 3,
    factor: 'Factor I: Planning & Organising',
    name: 'Organising Ability',
    hindiName: 'आयोजन क्षमता',
    description: 'Ability to arrange resources and people systematically to achieve a given mission or task.',
    nccDemonstration: 'Organizing platoon roll call, camp guard duties, social service rallies, and mess timings.',
  },
  {
    num: 4,
    factor: 'Factor I: Planning & Organising',
    name: 'Power of Expression',
    hindiName: 'अभिव्यक्ति की क्षमता',
    description: 'Ability to put across ideas clearly, concisely, and persuasively in both speech and writing.',
    nccDemonstration: 'Giving clear words of command on parade ground and delivering crisp 3-minute lecturettes.',
  },
  {
    num: 5,
    factor: 'Factor II: Social Adjustment',
    name: 'Social Adaptability',
    hindiName: 'सामाजिक अनुकूलनशीलता',
    description: 'Ability to adjust easily with people of diverse backgrounds, faiths, languages, and ranks.',
    nccDemonstration: 'Living harmoniously in crowded camp tents at National Integration Camps (NIC) with cadets from other states.',
  },
  {
    num: 6,
    factor: 'Factor II: Social Adjustment',
    name: 'Cooperation',
    hindiName: 'सहयोग की भावना',
    description: 'Willingness to participate willingly as a team member, placing collective goal above personal glory.',
    nccDemonstration: 'Carrying collective weight in the Snake Race / Group Obstacle Race and squad drill.',
  },
  {
    num: 7,
    factor: 'Factor II: Social Adjustment',
    name: 'Sense of Responsibility',
    hindiName: 'जिम्मेदारी की भावना',
    description: 'Thorough, self-prompted commitment to duty without needing constant supervision.',
    nccDemonstration: 'Standing guard duty faithfully at night, rifle care, and safeguarding unit equipment.',
  },
  {
    num: 8,
    factor: 'Factor III: Social Effectiveness',
    name: 'Initiative',
    hindiName: 'पहल करने की क्षमता',
    description: 'Ability to originate purposeful action without being told, taking calculated first steps in unfamiliar situations.',
    nccDemonstration: 'Stepping forward to volunteer for unexpected tasks, leading fire rescue in mock disaster drills.',
  },
  {
    num: 9,
    factor: 'Factor III: Social Effectiveness',
    name: 'Self Confidence',
    hindiName: 'आत्मविश्वास',
    description: 'Faith in one’s own capabilities and judgment even under stress, failure, or criticism.',
    nccDemonstration: 'Commanding a platoon of 30 cadets before inspecting officers with clear, unhurried voice.',
  },
  {
    num: 10,
    factor: 'Factor III: Social Effectiveness',
    name: 'Speed of Decision',
    hindiName: 'शीघ्र निर्णय लेने की क्षमता',
    description: 'Ability to arrive at workable decisions quickly in sudden or ambiguous situations.',
    nccDemonstration: 'Selecting alternative routes during navigation march when bridge is marked blown up.',
  },
  {
    num: 11,
    factor: 'Factor III: Social Effectiveness',
    name: 'Ability to Influence the Group',
    hindiName: 'समूह को प्रभावित करने की क्षमता',
    description: 'Inspiring and convincing others to willingly accept and execute a suggested plan of action.',
    nccDemonstration: 'Motivating tired cadets during the final 5 kilometres of an endurance march.',
  },
  {
    num: 12,
    factor: 'Factor III: Social Effectiveness',
    name: 'Liveliness',
    hindiName: 'जिंदादिली और उत्साह',
    description: 'Capacity to remain cheerful, optimistic, and energetic even in adversity, fatigue, and discomfort.',
    nccDemonstration: 'Singing marching songs and leading campfires after 12 hours of rigorous drill and firing.',
  },
  {
    num: 13,
    factor: 'Factor IV: Dynamic',
    name: 'Determination',
    hindiName: 'दृढ़ संकल्प',
    description: 'Sustained effort to achieve an objective in spite of obstacles, setbacks, and exhaustion.',
    nccDemonstration: 'Scaling the 6-foot wall repeatedly until mastered, pushing through blistered feet in camps.',
  },
  {
    num: 14,
    factor: 'Factor IV: Dynamic',
    name: 'Courage',
    hindiName: 'साहस और निर्भीकता',
    description: 'Willingness to take bold calculated risks and face physical danger and moral opposition without panic.',
    nccDemonstration: 'Rappelling down 100-foot rock faces, parasailing, and speaking the truth when unit error occurs.',
  },
  {
    num: 15,
    factor: 'Factor IV: Dynamic',
    name: 'Stamina',
    hindiName: 'सहनशक्ति और शारीरिक क्षमता',
    description: 'Capacity to withstand prolonged physical and mental strain without dropping standards.',
    nccDemonstration: 'Standing at attention for 45 minutes during ceremonial parades under hot sun.',
  },
]

export const ssb5DaySchedule: SSBStage[] = [
  {
    day: 'Day 1: Screening Test (स्क्रीनिंग)',
    title: 'Stage I: Officer Intelligence Rating & PPDT',
    hindiTitle: 'प्रथम चरण: ओ.आई.आर और पी.पी.डी.टी',
    tests: [
      {
        name: 'OIR (Officer Intelligence Rating)',
        detail: 'Two booklets containing Verbal and Non-Verbal reasoning questions (cubes, series, analogy). Standard time: 15-20 min per booklet.',
        tip: 'Speed and accuracy decide your rating (OIR 1 or OIR 2 is ideal for recommendation).',
      },
      {
        name: 'PPDT (Picture Perception & Discussion Test)',
        detail: 'A hazy picture is projected for 30 seconds. In the next 4 minutes, write a story detailing: What led to the scene, what is currently happening, and the final positive outcome. Followed by individual narration (1 min) and Group Discussion.',
        tip: 'Speak crisply in narration without stammering. In the GD, do not fishmarket; make 2 to 3 constructive points.',
      },
    ],
  },
  {
    day: 'Day 2: Psychological Testing (मनोवैज्ञानिक परीक्षण)',
    title: 'Stage II: Written Psychology Battery',
    hindiTitle: 'द्वितीय चरण: टी.ए.टी, डब्ल्यू.ए.टी, एस.आर.टी, एस.डी',
    tests: [
      {
        name: 'TAT (Thematic Apperception Test)',
        detail: '11 clear pictures shown for 30 seconds each, 4 minutes per story + 1 blank slide where you write your own personal hero story.',
        tip: 'Make your hero an ordinary person of action who plans sensibly and helps others without expecting rewards.',
      },
      {
        name: 'WAT (Word Association Test)',
        detail: '60 words flashed on screen for 15 seconds each. Cadets write the first positive, meaningful thought that comes to mind.',
        tip: 'Write spontaneous observational statements rather than pre-memorized moral preachings.',
      },
      {
        name: 'SRT (Situation Reaction Test)',
        detail: '60 realistic everyday crises in a booklet. Time: 30 minutes (30 seconds per situation).',
        tip: 'Write practical action completed to finish (e.g. "Extinguished fire with sand bucket, evacuated injured, reported to authority").',
      },
      {
        name: 'SD (Self Description)',
        detail: 'Write what your Parents, Teachers, Friends, and You yourself think of you, plus qualities you wish to improve.',
        tip: 'Be honest and balanced. Do not project perfection; mention real minor weaknesses you are actively working on.',
      },
    ],
  },
  {
    day: 'Day 3 & 4: GTO Outdoor Tasks (जी.टी.ओ ग्राउंड टेस्ट)',
    title: 'Group Testing Officer Battery (9 Tasks)',
    hindiTitle: 'मैदानी कार्य: 9 सामूहिक और व्यक्तिगत टास्क',
    tests: [
      {
        name: 'GD (Group Discussion) & GPE (Military Planning Exercise)',
        detail: 'Two rounds of GD on current affairs, followed by planning an emergency multi-crisis response on a relief model with scale and speed.',
        tip: 'Prioritize life-saving tasks first, assign team members by number and transport, calculate exact time and distances.',
      },
      {
        name: 'PGT & HGT (Progressive and Half Group Tasks)',
        detail: 'Crossing out-of-bound terrain using helping materials: wooden plank (phatta), balli (pole), and rope.',
        tip: 'Use physics principles: cantilever, tied knots, and stay calm. Never touch red surfaces (out-of-bounds).',
      },
      {
        name: 'IOT (Individual Obstacles) & Snake Race',
        detail: '10 obstacles to clear individually in 3 minutes (total 55 marks) + high-spirited group obstacle race with a heavy canvas snake.',
        tip: 'Cheer your group loudly, carry the load willingly, and clear obstacles with smooth momentum.',
      },
      {
        name: 'Command Task & Lecturette',
        detail: 'You are appointed Commander, choose two subordinates, and solve a complex bridge obstacle + deliver a 3-minute speech on a topic.',
        tip: 'Command with clarity, explain plan to subordinates, and speak on a topic with facts and structure.',
      },
    ],
  },
  {
    day: 'Day 5: Board Conference & Results (कॉन्फ्रेंस)',
    title: 'Final Board Interview & Recommendation',
    hindiTitle: 'अंतिम साक्षात्कार और चयन परिणाम',
    tests: [
      {
        name: 'Conference Room Evaluation',
        detail: 'All assessors (President, Psychologists, GTOs, Interviewing Officers) gather in uniform. Cadet is called in, asked 2-3 questions about stay and suggestions.',
        tip: 'Enter confidently with shoulders back, look at the President, smile, answer honestly, and maintain cheerful composure.',
      },
    ],
  },
]

export const ppdtSamples: PPDTSample[] = [
  {
    id: 'ppdt-1',
    title: 'Village Disaster / Embankment Breach',
    visualDescription: 'Two young people in rain gear standing near a flooded waterway with villagers in the background.',
    characters: [{ age: 21, gender: 'M', mood: '+' }],
    action: 'Organizing village flood barrier and evacuating livestock.',
    sampleStory:
      'Aman, a 21-year-old college NCC cadet visiting his village, noticed the river embankment leaking due to continuous rainfall. Realizing the danger to low-lying farms, he immediately alerted the village Sarpanch and gathered local youth. Using sandbags and wooden poles from the cooperative store, Aman organized a chain of volunteers to reinforce the breach. He ensured elderly citizens and livestock were safely relocated to the primary school on high ground. The timely reinforcement held until the district irrigation team arrived with heavy earthmovers. Aman’s initiative saved the village harvest.',
    officerAngle:
      'Shows Initiative, Organizing Ability, Sense of Responsibility and Courage without needing superhero fiction.',
  },
  {
    id: 'ppdt-2',
    title: 'Highway Accident First Aid',
    visualDescription: 'A person kneeling beside a fallen cyclist on a road while two bystanders look on.',
    characters: [
      { age: 20, gender: 'F', mood: '+' },
      { age: 35, gender: 'M', mood: '-' },
    ],
    action: 'Controlling bleeding, managing traffic and coordinating ambulance evacuation.',
    sampleStory:
      'Priya, a 20-year-old NCC Senior Wing cadet returning from college parade, saw a cyclist injured in a skid near a highway bend. She asked one bystander to wave down oncoming traffic 50 metres ahead to prevent a pile-up and called the 108 ambulance service. Checking the cyclist’s airway and noticing bleeding on the forearm, she applied firm direct pressure with a clean handkerchief from her kit and reassured the casualty. When the ambulance arrived, she handed over clear details of the incident and injury before informing the cyclist’s family.',
    officerAngle:
      'Demonstrates Speed of Decision, Effective Intelligence, Cooperation and practical First Aid training under pressure.',
  },
  {
    id: 'ppdt-3',
    title: 'Rural Literacy & Digital Awareness Camp',
    visualDescription: 'A group of seated villagers listening to a standing youth pointing towards a board.',
    characters: [{ age: 22, gender: 'M', mood: '+' }],
    action: 'Conducting an evening community awareness and camp registration drive.',
    sampleStory:
      'Rohan, a 22-year-old undergraduate and NCC Under Officer, led a 10-cadet social service team during an Annual Training Camp adoption drive in a nearby village. Noticing low awareness of government scholarships and cyber-fraud safety among elders, he coordinated with the school headmaster to host an evening session at the panchayat courtyard. Dividing his team into small desks, Rohan explained basic UPI safety, assisted residents in filling digital forms, and encouraged school students to join NCC Junior Division. Over 80 families benefited and the unit set up a monthly follow-up clinic.',
    officerAngle:
      'Highlights Organising Ability, Power of Expression, Social Adaptability and Ability to Influence the Group.',
  },
]

export const ssbInterviewNCCQuestions = [
  {
    question: 'You have done NCC. Why did you not join the Armed Forces through NDA/CDS earlier?',
    answerStrategy:
      'Acknowledge factually: state your actual progression (e.g. focused on graduation / earlier attempt shortcomings). Highlight how NCC Senior Division gave you maturity, leadership experience in camps, and confirmed your passion for military service.',
  },
  {
    question: 'What is the difference between an ordinary graduate and an NCC C Certificate cadet?',
    answerStrategy:
      'Explain that while both have degree knowledge, an NCC cadet has 3 years of habituated discipline, parade ground bearing, exposure to weapons and map reading, living in diverse camps, and commanding subordinates.',
  },
  {
    question: 'Tell me about the toughest camp you attended and what it taught you.',
    answerStrategy:
      'Name an actual camp (e.g., CATC or Thal Sainik Camp). Describe a genuine hardship (heat, night guard duties, difficult obstacle training) and how you overcame it with your team comradeship.',
  },
  {
    question: 'If you are rejected in this NCC Special Entry, what is your backup plan?',
    answerStrategy:
      'State your parallel career plan (e.g. post-graduation or corporate/civil exams) while clearly confirming that you will prepare thoroughly and re-attempt remaining SSB entries till eligible.',
  },
]
