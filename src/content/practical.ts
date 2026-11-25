// Practical, on-the-ground material: what you say, wear, pack and do.
// Written for use on the parade ground and in camp, not just for the exam.

export type Checklist = { id: string; title: string; note: string; items: string[] }

export const packList: Checklist = {
  id: 'camp-pack',
  title: 'Camp packing list',
  note: 'Check with your ANO first — units vary. Everything marked must be name-tagged.',
  items: [
    'NCC uniform: shirt, trousers, beret/cap, belt, black boots, shoulder badges',
    'White PT kit (two sets), white canvas shoes, sports socks',
    'Two pairs of civil clothes for off-duty hours',
    'Toiletries: soap, toothbrush, paste, towel, comb, nail clipper, shaving kit if needed',
    'Bedding: blanket or sleeping bag, bedsheet, pillow cover',
    'Steel plate, mug, spoon and water bottle',
    'Torch with spare batteries, padlock, small sewing kit',
    'First aid basics: plasters, antiseptic, ORS sachets, personal medicines',
    'Identity card, NCC diary, pen, notebook, two passport photographs',
    'Raincoat or poncho, cap, sunscreen, mosquito repellent',
    'Laundry bag, shoe polish and brush, extra laces',
  ],
}

export const uniformCheck: Checklist = {
  id: 'uniform-check',
  title: 'Turnout check before parade',
  note: 'An inspecting officer reads discipline from the uniform before a word is spoken.',
  items: [
    'Beret worn correctly: badge over the left eye, band level, no hair showing at the front',
    'Shirt tucked, collar correct, sleeves as ordered, no loose threads',
    'Belt buckle centred and polished, belt level with the ground',
    'Trousers creased, length just touching the boot, pockets empty of bulges',
    'Boots polished including the welt, laces evenly tied and tucked',
    'Shoulder titles, rank badges and name plate straight and clean',
    'Hair cut short for boys; for girls, hair in a neat bun or plait under the beret',
    'No visible jewellery, no painted nails, no strong perfume',
    'Shave or trim as per unit standard; nails clean and short',
  ],
}

export type DrillCommandItem = {
  command: string
  hindi: string
  cautionary: string
  executive: string
  meaning: string
  foot: 'Left' | 'Right' | 'Halt' | 'Any'
}

export const drillCommands: DrillCommandItem[] = [
  {
    command: 'Savdhan',
    hindi: 'सावधान!',
    cautionary: 'परेड / स्क्वाड...',
    executive: '...सावधान!',
    meaning: 'Attention — heels together touching, feet at 30° angle, body erect, thumbs aligned with trouser seam.',
    foot: 'Left',
  },
  {
    command: 'Vishram',
    hindi: 'विश्राम!',
    cautionary: 'परेड...',
    executive: '...विश्राम!',
    meaning: 'Stand at ease — left foot lifted 6 inches and placed 12 inches to the left, hands clasped behind back (left palm over right).',
    foot: 'Left',
  },
  {
    command: 'Aaram Se',
    hindi: 'आराम से!',
    cautionary: 'परेड...',
    executive: '...आराम से!',
    meaning: 'Stand easy — relax shoulders, body slightly eased, but feet must remain strictly in position.',
    foot: 'Any',
  },
  {
    command: 'Dahine Mur',
    hindi: 'दाहिने मुड़!',
    cautionary: 'स्क्वाड दाहिने...',
    executive: '...मुड़!',
    meaning: 'Turn right through 90° on right heel and left toe; trailing foot brought sharply in.',
    foot: 'Left',
  },
  {
    command: 'Baye Mur',
    hindi: 'बाएं मुड़!',
    cautionary: 'स्क्वाड बाएं...',
    executive: '...मुड़!',
    meaning: 'Turn left through 90° on left heel and right toe; trailing foot snapped in smartly.',
    foot: 'Right',
  },
  {
    command: 'Peeche Mur',
    hindi: 'पीछे मुड़!',
    cautionary: 'स्क्वाड पीछे...',
    executive: '...मुड़!',
    meaning: 'About turn through 180° always turning to the right, on right heel and left toe.',
    foot: 'Left',
  },
  {
    command: 'Tez Chal',
    hindi: 'तेज़ चल!',
    cautionary: 'स्क्वाड आगे बढ़ेगा...',
    executive: '...तेज़ चल!',
    meaning: 'Quick march — step off briskly with left foot, 30 inches stride, 120 paces per minute.',
    foot: 'Left',
  },
  {
    command: 'Dheere Chal',
    hindi: 'धीरे चल!',
    cautionary: 'स्क्वाड...',
    executive: '...धीरे चल!',
    meaning: 'Slow march — ceremonial stride, 70 paces per minute, toes pointing down.',
    foot: 'Left',
  },
  {
    command: 'Tham',
    hindi: 'थम!',
    cautionary: 'स्क्वाड...',
    executive: '...थम!',
    meaning: 'Halt — command given on left foot; take one full check stride with right foot and snap left foot in.',
    foot: 'Left',
  },
  {
    command: 'Khuli Line Chal',
    hindi: 'खुली लाइन चल!',
    cautionary: 'खुली लाइन...',
    executive: '...चल!',
    meaning: 'Open order march for inspection — front rank takes two paces forward, rear rank takes two paces back.',
    foot: 'Left',
  },
  {
    command: 'Nikat Line Chal',
    hindi: 'निकट लाइन चल!',
    cautionary: 'निकट लाइन...',
    executive: '...चल!',
    meaning: 'Close order march after inspection — front rank steps back two paces, rear rank steps forward two paces.',
    foot: 'Left',
  },
  {
    command: 'Sajja',
    hindi: 'सज जा (ड्रेसिंग)!',
    cautionary: 'दाहिने...',
    executive: '...सज!',
    meaning: 'Dress — right marker remains still; others turn heads right, raise right arm to shoulder height to dress rank.',
    foot: 'Right',
  },
  {
    command: 'Visarjan',
    hindi: 'विसर्जन!',
    cautionary: 'परेड...',
    executive: '...विसर्जन!',
    meaning: 'Dismissal — squad turns right, salutes if officer present, breaks off after three paces.',
    foot: 'Any',
  },
  {
    command: 'Salami Shastra',
    hindi: 'सलामी शस्त्र!',
    cautionary: 'राष्ट्रीय वीआईपी के लिए...',
    executive: '...सलामी शस्त्र!',
    meaning: 'General / National salute with rifle for dignitary or National Flag/Anthem.',
    foot: 'Left',
  },
]

export const drillPaceStats = [
  { item: 'Quick March (तेज़ चल)', paces: '120 paces / min', girls: '110 paces / min (SW)' },
  { item: 'Slow March (धीरे चल)', paces: '70 paces / min', girls: '70 paces / min' },
  { item: 'Double March (दौड़ के चल)', paces: '180 paces / min', girls: '180 paces / min' },
  { item: 'Normal pace length (कदम की लम्बाई)', paces: '30 inches', girls: '30 inches' },
  { item: 'Double march pace length', paces: '33 inches', girls: '33 inches' },
  { item: 'Side step (खुला कदम)', paces: '12 inches', girls: '12 inches' },
  { item: 'Peeche Kadam (Stepping back)', paces: '30 inches', girls: '30 inches' },
]

export const fieldSignals = [
  { signal: 'Enemy seen', action: 'Raise the arm and point, fist closed, then open the hand towards the enemy.' },
  { signal: 'Halt', action: 'Raise the closed fist above the head and hold it still.' },
  { signal: 'Advance', action: 'Sweep the arm forward from the shoulder, palm open.' },
  { signal: 'Deploy', action: 'Both arms extended sideways, palms down, then lowered.' },
  { signal: 'Form line', action: 'Arms extended horizontally, then brought down level.' },
  { signal: 'Retire', action: 'Arm raised and swept backwards over the shoulder.' },
  { signal: 'Rally', action: 'Circular movement of the arm above the head.' },
  { signal: 'Need help / medical', action: 'Arm raised with a white cloth, or both arms crossed overhead.' },
]

export const firstAidSteps = [
  {
    title: 'Unresponsive casualty',
    steps: [
      'Shout for help and make the area safe.',
      'Tap the shoulders and ask loudly if they are all right.',
      'If no response, open the airway by tilting the head and lifting the chin.',
      'Look, listen and feel for normal breathing for up to 10 seconds.',
      'If not breathing normally, call emergency services and start CPR: 30 compressions, 2 breaths.',
      'Send for an AED and use it as soon as it arrives.',
    ],
  },
  {
    title: 'Severe bleeding',
    steps: [
      'Put on gloves if available; otherwise use a clean barrier.',
      'Press firmly on the wound with a clean dressing.',
      'Raise the limb if no fracture is suspected.',
      'Add dressings on top if it soaks through — do not remove the first one.',
      'Use a tourniquet only for life-threatening limb bleeding, and note the time.',
      'Keep the casualty warm and treat for shock.',
    ],
  },
  {
    title: 'Suspected fracture',
    steps: [
      'Do not move the casualty unless there is immediate danger.',
      'Support the limb above and below the injury.',
      'Immobilise the joint above and below the break.',
      'Check pulse, colour and sensation beyond the injury.',
      'Cover an open wound with a sterile dressing; do not push bone back in.',
      'Evacuate to a hospital for imaging and treatment.',
    ],
  },
  {
    title: 'Burns',
    steps: [
      'Remove the casualty from the source and stop the burning.',
      'Cool with clean running water for at least 20 minutes.',
      'Remove rings and tight items before swelling begins.',
      'Cover loosely with cling film or a clean non-fluffy cloth.',
      'Do not apply ice, oil, toothpaste or butter; do not burst blisters.',
      'Seek medical help for large, deep, facial, hand or electrical burns.',
    ],
  },
  {
    title: 'Heat stroke',
    steps: [
      'Move the casualty to shade and loosen clothing.',
      'Cool rapidly: water, wet cloths, fanning, ice packs at neck, armpits and groin.',
      'Do not give fluids if the person is confused or unconscious.',
      'Call for an ambulance — heat stroke is a medical emergency.',
      'Monitor breathing and be ready to start CPR.',
      'Continue cooling until help arrives.',
    ],
  },
]

export const examDayPlan = [
  { when: 'Two weeks out', what: 'Write one timed paper under exam conditions. Mark it honestly; list the three subjects costing you the most marks.' },
  { when: 'Ten days out', what: 'Work only those three subjects, using the notes and the question bank. Re-test after four days.' },
  { when: 'One week out', what: 'Revise mark tables, ranks, dates and command words. Practicals: drill and map reading daily for 30 minutes.' },
  { when: 'Two days out', what: 'Light revision only. Check uniform, admit card, ID, pens and the reporting time and place.' },
  { when: 'The night before', what: 'Sleep eight hours. Do not learn anything new; read your own summary sheet once.' },
  { when: 'Exam morning', what: 'Eat, arrive early, carry water. In the paper, answer what you know first, then return to the rest.' },
]

export const interviewQuestions = [
  { q: 'Why did you join the NCC?', tip: 'Answer with something you did, not a slogan. Name the camp, the drill or the person who changed your mind.' },
  { q: 'What does the C certificate mean to you?', tip: 'Link it to responsibility, not only to vacancies. Then mention the entry schemes factually.' },
  { q: 'Tell us about a time you led a team.', tip: 'Situation, task, action, result — in under 90 seconds. Say what you would do differently.' },
  { q: 'What is your greatest weakness?', tip: 'Give a real one and the specific system you use to manage it. Avoid “I work too hard”.' },
  { q: 'Why do you want to join the armed forces?', tip: 'Show you understand the life: service, discipline, separation from family, physical demand. Be specific about the entry.' },
  { q: 'What did you learn from a failure?', tip: 'Pick a failure that cost you something, own it fully, then describe the change you made.' },
  { q: 'What is happening in the news that affects national security?', tip: 'Read one newspaper daily. Know two current issues with dates and places.' },
  { q: 'Any questions for us?', tip: 'Ask about training, unit life or the next stage of the process — never about leave or perks.' },
]

export const studyPlan = [
  { week: 'Week 1–2', focus: 'The NCC, National Integration, Drill', detail: 'Read the lessons, then take a 10-question drill on each. Start daily drill practice.' },
  { week: 'Week 3–4', focus: 'Weapon Training, Map Reading', detail: 'Learn weapon parts and range commands. Do 20 six-figure grid references a day.' },
  { week: 'Week 5', focus: 'Field Craft, First Aid', detail: 'Practise field signals aloud. Run one first aid scenario with a partner.' },
  { week: 'Week 6', focus: 'Personality Development, Leadership', detail: 'Prepare six STAR stories from camp and school. Record yourself answering interview questions.' },
  { week: 'Week 7', focus: 'Disaster Management, Social Service, Environment', detail: 'Learn the cycles and lists. Write one paragraph on a project you actually did.' },
  { week: 'Week 8', focus: 'Wing subjects and mock papers', detail: 'Two full timed papers this week. Revisit only the weak areas they expose.' },
]
