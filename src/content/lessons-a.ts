import type { Lesson } from './types'

// Common subjects, first half. Content follows DGNCC training material and
// the CBSE / PSEB NCC (076) syllabus wording.
export const lessonsA: Lesson[] = [
  {
    id: 'the-ncc',
    title: 'The NCC: aims, motto and organisation',
    subject: 'NCC',
    level: 'Year 1 · all certificates',
    minutes: 8,
    summary:
      'The NCC was raised on 16 April 1948 to build character, discipline and a trained youth reserve. Every exam paper opens with it.',
    sections: [
      {
        heading: 'The three aims',
        body: 'The National Cadet Corps exists to develop character, courage, comradeship, discipline, leadership, a secular outlook, a spirit of adventure, sportsmanship and the ideal of selfless service. Everything else in the syllabus hangs off these three aims.',
        bullets: [
          'Develop character, courage, discipline and leadership in youth.',
          'Create an organised, trained and motivated human resource for the nation.',
          'Provide an environment that motivates youth towards a career in the armed forces.',
        ],
      },
      {
        heading: 'Motto, flag and song',
        body: 'The motto is “Unity and Discipline”. The NCC flag carries three colours for the three services — red for the Army, dark blue for the Navy and light blue for the Air Force — with the NCC crest at the centre. The NCC song is “Hum Sab Bharatiya Hain”. NCC Day falls on the last Sunday of November.',
      },
      {
        heading: 'How it is organised',
        body: 'A Lieutenant General is the Director General at HQ DGNCC, New Delhi. Seventeen State Directorates administer Group Headquarters, which control the units hosted by schools and colleges.',
        bullets: [
          'Junior Division (boys) and Junior Wing (girls): schools, Certificate A.',
          'Senior Division (boys) and Senior Wing (girls): colleges, Certificates B and C.',
          'A unit is a battalion, company, squadron or flight, led by an Associate NCC Officer (ANO) with permanent instructional staff.',
          'Cadet ranks run from Cadet up through Lance Corporal, Corporal, Sergeant and Under Officer to Senior Under Officer; titles vary slightly by wing.',
        ],
      },
      {
        heading: 'Duties of a cadet',
        body: 'A cadet obeys orders, keeps the uniform and turnout correct, attends parades and camps, protects unit property, takes part in social service and sets an example in conduct both inside and outside the unit.',
      },
    ],
    keyPoints: [
      'Raised 16 April 1948; motto “Unity and Discipline”.',
      'Three aims: character, trained human resource, armed forces motivation.',
      'Seventeen State Directorates under DG NCC, New Delhi.',
      'Certificate A for JD/JW, B and C for SD/SW.',
    ],
    examTip:
      'Questions on the aims are almost always multiple choice. Learn the three aims as three separate phrases, not one long sentence.',
  },
  {
    id: 'national-integration',
    title: 'National integration and awareness',
    subject: 'NIA',
    level: 'Years 1–3 · all certificates',
    minutes: 9,
    summary:
      'Why a country of many languages, faiths and regions holds together, what threatens that, and what cadets actually do about it.',
    sections: [
      {
        heading: 'What national integration means',
        body: 'National integration is the emotional and psychological unity of a people who remain culturally diverse. India’s unity is built on shared citizenship, the Constitution, common symbols and free movement, not on sameness.',
        bullets: [
          'Unity in diversity: many languages, faiths, festivals and cuisines, one nation.',
          'The Constitution guarantees equality, secularism and freedom of religion.',
          'National symbols — the flag, anthem, emblem and the armed forces — are shared reference points.',
        ],
      },
      {
        heading: 'Threats to integration',
        body: 'Communalism, casteism, regionalism, linguism, separatism, poverty and unemployment, and external attempts to exploit these divisions. Misinformation on social media now spreads faster than any older threat.',
      },
      {
        heading: 'The NCC’s role',
        body: 'Cadets meet young people from other states at National Integration Camps, Ek Bharat Shreshtha Bharat camps, treks and RDC. Shared living does more than a lecture: cadets eat, drill and compete together, then carry that experience back to their units.',
        bullets: [
          'NICs and SNICs in border and island locations, plus paired-state EBSB camps.',
          'Cultural programmes, language learning and joint social service projects.',
          'Cadets as messengers of secularism and communal harmony in their own towns.',
        ],
      },
      {
        heading: 'Freedom struggle in brief',
        body: 'The revolt of 1857, the formation of the Congress in 1885, Partition of Bengal in 1905, the Home Rule movement, Jallianwala Bagh in 1919, the Non-Cooperation and Civil Disobedience movements, Quit India in 1942, the INA under Subhas Chandra Bose, and Independence with Partition in 1947. The integration of over 560 princely states followed under Sardar Patel.',
      },
    ],
    keyPoints: [
      'Integration means unity without uniformity, protected by the Constitution.',
      'Main threats: communalism, casteism, regionalism, separatism, misinformation.',
      'NCC’s tool is shared living at NIC, EBSB and national camps.',
    ],
    examTip:
      'A common question asks for three factors that threaten national integration. Give named factors, not a paragraph.',
  },
  {
    id: 'personality-development',
    title: 'Personality development',
    subject: 'PD',
    level: 'Years 1–3 · heaviest paper in C',
    minutes: 10,
    summary:
      'Personality is the pattern of your thinking, feeling and behaviour. This is the largest single block of marks in the C certificate miscellaneous paper.',
    sections: [
      {
        heading: 'What shapes personality',
        body: 'Heredity sets a starting point; environment, family, school, friends and deliberate practice do the rest. Attitude, values, skills and habits are learnable, which is why the syllabus treats personality as trainable.',
        bullets: [
          'Self-awareness: knowing your strengths, triggers and blind spots.',
          'Empathy: reading how another person feels before you respond.',
          'Attitude: the difference between “this is impossible” and “what is step one”.',
        ],
      },
      {
        heading: 'Critical and creative thinking',
        body: 'Critical thinking tests a claim against evidence, source and logic. Creative thinking generates options before judging them. In a group discussion, both are visible: one builds the argument, the other builds the alternative.',
      },
      {
        heading: 'Time management and stress',
        body: 'Plan by priority, not by mood: list tasks, mark the urgent, block time, review at night. Stress is managed by sleep, exercise, breathing, preparation and talking to someone — not by avoidance. Long exhale breathing and a five-minute walk reset the body faster than scrolling.',
      },
      {
        heading: 'Communication, etiquette and civic sense',
        body: 'Listen fully before replying, keep sentences short, make eye contact, and match tone to setting. Civic sense is small and visible: queue, keep public spaces clean, respect traffic rules, help without being asked. An interview panel notices the last one first.',
      },
    ],
    keyPoints: [
      'Personality = heredity plus environment plus deliberate practice.',
      'Four pillars for exams: self-awareness, empathy, attitude, communication.',
      'Stress control: sleep, exercise, preparation, breathing, support.',
      'Civic sense is assessed in camp and in interviews, not only on paper.',
    ],
    examTip:
      'The C paper carries 70 marks on personality development alone. Learn the definitions of attitude, empathy, self-esteem and motivation with one example each.',
  },
  {
    id: 'leadership',
    title: 'Leadership and discipline',
    subject: 'LD',
    level: 'Years 1–3 · all certificates',
    minutes: 9,
    summary:
      'Leadership is influence towards a goal, not rank. Learn the traits, the functions, and the honour code you are expected to live by.',
    sections: [
      {
        heading: 'Traits and indicators',
        body: 'Traits are what a leader is: courage, integrity, initiative, judgement, loyalty, endurance, bearing and unselfishness. Indicators are what a leader does: sets an aim, plans, issues clear orders, supervises, sets personal example, looks after the team and takes responsibility for failure.',
      },
      {
        heading: 'Styles and functions',
        body: 'Autocratic style decides alone and is fast in crisis. Democratic style consults and builds ownership. Laissez-faire steps back and suits experts. A good section commander moves between them with the situation, but never abandons the aim.',
        bullets: [
          'Plan: estimate the task, time, ground and people available.',
          'Brief: task, own troops, ground, time available — clear and short.',
          'Execute: lead from the front, keep control, adapt.',
          'Debrief: what worked, what changes next time.',
        ],
      },
      {
        heading: 'Discipline and the honour code',
        body: 'Discipline is doing the right thing without supervision. The cadet honour code is simple: I will not lie, cheat or steal, and I will not tolerate those who do. Self-discipline starts with punctuality, turnout and keeping your word.',
      },
      {
        heading: 'Motivation and team building',
        body: 'People follow a leader who explains why, shares credit and protects the team. Recognition in public, correction in private, and consistent standards build trust faster than any speech.',
      },
    ],
    keyPoints: [
      'Leadership is influence towards a common aim.',
      'Know the difference between traits (being) and indicators (doing).',
      'Autocratic, democratic, laissez-faire: choose by situation.',
      'Honour code: no lying, cheating or stealing, and no tolerance of it.',
    ],
    examTip:
      'Be ready to name five leadership traits and one example of each from camp or school life.',
  },
  {
    id: 'drill',
    title: 'Drill: words of command and the drill square',
    subject: 'DR',
    level: 'Every year · practical paper',
    minutes: 12,
    summary:
      'Drill builds turnout, alertness and instant obedience. It is 80 practical marks in A and B, and 50 in C.',
    sections: [
      {
        heading: 'A word of command has two parts',
        body: 'The cautionary part warns the squad and the executive part orders the movement, with about four quick steps between them. Command is given from the position of Savdhan, in a loud, clear voice with the right pitch, so the whole squad acts together.',
        bullets: [
          'Savdhan — attention. Vishram — stand at ease. Aaram Se — stand easy.',
          'Dahine Mur — right turn. Baye Mur — left turn. Peeche Mur — about turn.',
          'Tez Chal — quick march. Dheere Chal — slow march. Tham — halt.',
          'Khuli Line Chal / Nikat Line Chal — open or close order march.',
          'Line Ban, Sajja, Visarjan — fall in, dress, dismiss.',
          'Dahine Salute, Baye Salute, Samne Salute; Salami Shastra for a general salute.',
          'Tez Kadam — double march. Kadam Badalna — change step.',
        ],
      },
      {
        heading: 'Foot drill essentials',
        body: 'Stand with heels together and toes apart at about 30 degrees, body erect, arms hanging naturally. On Tez Chal, step out with the left foot, swing the arms straight from the shoulder, keep the body steady and the head up. On Tham, bring the trailing foot in to the position of attention without stamping.',
        bullets: [
          'Common faults: rolling eyes, hopping, dragging feet, clicking heels, looking down.',
          'Dressing keeps the line straight; the right-hand man is the guide.',
          'Marching past is judged on alignment, timing and swing, not speed.',
        ],
      },
      {
        heading: 'Arms drill and ceremonial drill',
        body: 'Arms drill covers Savdhan and Vishram with a rifle, Sajja, Visarjan, salute with the rifle, and guard mounting. Ceremonial drill includes the guard of honour, the general salute and the march past. Weapon handling rules never pause for drill: muzzle up or down range, finger off the trigger, weapon on safe.',
      },
      {
        heading: 'At the exam',
        body: 'The practical is a squad drill test. Listen for the cautionary word, act on the executive, and keep your head and eyes still. One wrong turn is recoverable; a lost bearing and a smile is not.',
      },
    ],
    keyPoints: [
      'Cautionary then executive word, four quick steps apart.',
      'Savdhan, Vishram, Aaram Se, Dahine/Baye/Peeche Mur.',
      'Tez Chal, Dheere Chal, Tham and the line commands.',
      'Drill marks: A 80, B 80, C 50 — all practical.',
    ],
    examTip:
      'Command words are often dictated in the written paper in Hindi or English. Learn both spellings: Savdhan/Sawdhan, Vishram, Tham.',
  },
  {
    id: 'weapon-training',
    title: 'Weapon training and range procedure',
    subject: 'WT',
    level: 'Every year · written plus practical',
    minutes: 11,
    summary:
      'The .22 rifle for juniors, the 7.62 SLR and 5.56 INSAS for seniors: characteristics, stripping, aiming and the range.',
    sections: [
      {
        heading: 'The rifles you will meet',
        body: 'Junior cadets train on the .22 Deluxe rifle — light, low recoil, ideal for learning sight picture. Senior cadets handle the 7.62 mm Self Loading Rifle and the 5.56 mm INSAS. Learn the calibre, magazine capacity, effective range, weight and firing mode for the weapon your unit holds.',
        bullets: [
          '.22 Deluxe: small bore, single shot, used for basic marksmanship.',
          '7.62 mm SLR: gas operated, semi-automatic, magazine-fed.',
          '5.56 mm INSAS: lighter assault rifle, gas operated, selective fire.',
        ],
      },
      {
        heading: 'Stripping, assembling and cleaning',
        body: 'Stripping is done only after unloading and checking the chamber. Remove the magazine, cock the weapon, apply the safety and inspect. Then separate the parts your weapon’s drill specifies, clean the barrel with a pull-through, oil lightly, and reassemble in reverse order. Never force a part.',
      },
      {
        heading: 'Aiming and firing positions',
        body: 'The four essentials of marksmanship are steady position, correct aim, trigger control and breathing. Aim with the foresight centred and level in the backsight, on the bottom centre of the target. Pause breathing naturally, squeeze the trigger, follow through.',
        bullets: [
          'Positions: standing, kneeling, sitting, lying — lying is steadiest.',
          'Group: the pattern of shots; tightening the group is the first goal.',
          'Zeroing aligns the weapon to the firer at a set distance.',
        ],
      },
      {
        heading: 'Range procedure and safety',
        body: 'On the range, commands come from the range officer: “Load”, “Ready”, “Fire”, “Stop”, “Unload”. A red flag means stop. Treat every weapon as loaded, keep the muzzle in a safe direction, keep the finger off the trigger until firing, and never point at anyone.',
      },
    ],
    keyPoints: [
      'Four essentials: position, aim, trigger control, breathing.',
      'Unload and check the chamber before stripping or handing over.',
      'Commands: Load, Ready, Fire, Stop, Unload.',
      'Safety: treat as loaded, muzzle safe, finger off trigger.',
    ],
    examTip:
      'The C paper gives 60 practical marks in weapon training. Know your weapon’s parts and the range commands cold.',
  },
]
