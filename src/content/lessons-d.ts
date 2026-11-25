import type { Lesson } from './types'

// The rest of a cadet's life beyond the classroom: camp routine, uniform and
// ranks, the SSB, fitness, hygiene, the Act that governs the Corps, range work
// and the Remount & Veterinary paper.
export const lessonsD: Lesson[] = [
  {
    id: 'camp-life',
    title: 'Camp life: routine, kit, duties and discipline',
    subject: 'CAMP',
    level: 'Every year · one camp per certificate',
    minutes: 10,
    summary:
      'What actually happens from the moment you report to a camp to the moment you hand in your bedding — and how camps are assessed.',
    sections: [
      {
        heading: 'Reporting and the first hour',
        body: 'Report at the time on the camp instructions, not when it suits you. Carry the camp kit list, your NCC identity card, the medical and indemnity forms your unit gives you, and the joining instructions. On arrival you draw bedding and a camp appointment, are shown your lines and your bed number, and are given the camp programme.',
        bullets: [
          'Name-tag every item before you leave home; camp property is shared and easily lost.',
          'Note the camp commandant, adjutant, orderly officer and your own platoon commander.',
          'Learn the camp programme, the location of the first aid post, water point and latrines.',
          'Hand over your phone only if the camp orders require it — most camps restrict its use.',
        ],
      },
      {
        heading: 'The daily routine',
        body: 'A training camp runs on a fixed day. Reveille is early, usually around 0530, followed by PT or a run, breakfast, two or three training periods, lunch, rest, games or specialist training, dinner, cultural activity and lights out. Roll call is taken at each stage, and a cadet missing at roll call without leave creates a serious problem.',
        bullets: [
          '0530 reveille, wash, PT or drill, breakfast.',
          'Morning periods: drill, weapon training, map reading, field craft, first aid.',
          'Afternoon: games, adventure activity, specialist wing training, competitions.',
          'Evening: cultural programme, campfire, practice for the camp competition.',
          '2200 lights out; night duty and fire picquet as detailed.',
        ],
      },
      {
        heading: 'Camp appointments and duties',
        body: 'Camps are run by cadets. The camp senior, camp adjutant and camp quartermaster are senior cadets, supported by orderly officers drawn from each unit in rotation. Platoon and section commanders take muster, inspect turnout and report to the duty officer. Mess duty, water duty, cleaning of lines and the camp fire picquet are shared.',
      },
      {
        heading: 'How you are judged',
        body: 'Camp grading looks at turnout, drill, weapon handling, map reading, field craft, cooperation, leadership and general bearing. Best cadet selection is rarely won by the best shot alone: it goes to the cadet who is first on parade, last to leave a task, and steady when the programme changes.',
        bullets: [
          'Turnout is inspected daily; a missing beret badge costs marks every day.',
          'Answer questions in the viva with a clear, short sentence — confidence counts.',
          'Volunteer for duties; assessors notice who is absent when work needs doing.',
        ],
      },
      {
        heading: 'Conduct that ends a camp early',
        body: 'Absence without leave, alcohol or drugs, ragging, fighting, theft, misuse of a weapon and leaving camp without permission can end in discharge from the camp and a report to your unit. Ragging is a criminal offence, not a camp prank.',
      },
    ],
    keyPoints: [
      'Report on time with the kit list, ID card and medical forms; name-tag everything.',
      'Camp routine is fixed: reveille, PT, periods, games, cultural, lights out.',
      'Cadets run the camp through appointments and shared duties.',
      'Camp grading rewards turnout, steadiness and volunteering, not only marksmanship.',
    ],
    examTip:
      'Questions on camps usually ask the duration of a named camp, who attends it, or what is assessed. Learn ATC (about 10 days) separately from RDC (about a month).',
  },
  {
    id: 'uniform-insignia',
    title: 'Uniform, badges and cadet ranks',
    subject: 'UNIF',
    level: 'Every year · inspected at every parade',
    minutes: 9,
    summary:
      'What the uniform consists of, where every badge sits, what the rank chevrons mean, and the orders of dress a unit uses.',
    sections: [
      {
        heading: 'The uniform',
        body: 'The NCC uniform follows the service it belongs to. Army Wing cadets wear the olive green pattern, Naval Wing the naval pattern, and Air Wing the air force pattern, each with the NCC shoulder title. Every cadet is issued shirt, trousers, belt, headgear, boots and the badges for the wing, and is responsible for keeping the whole set serviceable.',
        bullets: [
          'Headgear: beret for Army and Air Wing, naval cap for the Naval Wing, worn level with the badge over the left eye.',
          'Shoulder titles: “NCC” on both shoulders, straight and clean.',
          'Name plate above the right pocket, rank badge on the sleeve or shoulder as the wing orders.',
          'Black leather boots polished including the welt; laces even and tucked in.',
        ],
      },
      {
        heading: 'Badges a cadet can earn',
        body: 'Beyond the wing badge, a cadet may wear badges for a certificate, a national camp, a shooting classification, an adventure course or an appointment. Each is worn only while it is current and only in the position the dress regulations allow; a badge in the wrong place is a turnout fault, not extra credit.',
        bullets: [
          'Certificate badges: worn after the certificate is formally awarded.',
          'Camp badges: RDC, TSC, VSC, NSC and NIC badges are worn on the right sleeve in most units.',
          'Adventure badges: rock climbing, mountaineering and trekking courses.',
          'Shooting classification: marksman and first-class shot badges after range qualification.',
        ],
      },
      {
        heading: 'Cadet ranks',
        body: 'The Army Wing rank ladder runs Cadet, Lance Corporal, Corporal, Sergeant, Under Officer and Senior Under Officer. Naval and Air Wing units use their own service equivalents, commonly Leading Cadet and Petty Officer Cadet in the Naval Wing and Flight Sergeant and Junior Under Officer in the Air Wing, with the senior appointment being a Senior Under Officer. Rank is an appointment to carry orders and set an example, not a licence to shout.',
        bullets: [
          'Section commander: a Corporal or Sergeant, responsible for turnout and muster of the section.',
          'Platoon commander: an Under Officer, responsible for drill and discipline of a platoon.',
          'Unit senior: the Senior Under Officer, the senior cadet appointment in the unit.',
        ],
      },
      {
        heading: 'Orders of dress',
        body: 'A unit orders one of several dress states for a parade: working dress for training, review order for ceremonial parades, walking out dress for off-duty movement and PT kit for physical training. The order is given in the parade instructions and changed by the adjutant, never by guesswork.',
      },
      {
        heading: 'Care of the uniform',
        body: 'Wash and press the shirt and trousers, brush the boots rather than only polishing the toe, replace missing buttons and badges before the next parade, and keep the beret shaped and free of lint. A uniform stored folded with badges in place saves ten minutes on a parade morning.',
      },
    ],
    keyPoints: [
      'Army, Navy and Air Wing wear their own service pattern with the NCC shoulder title.',
      'Beret badge sits over the left eye; the band is level.',
      'Army ranks: Cadet, Lance Corporal, Corporal, Sergeant, Under Officer, Senior Under Officer.',
      'The order of dress comes from the parade instructions, not from habit.',
    ],
    examTip:
      'Practical boards inspect the beret, belt, boots and badges. In the written paper, learn the rank ladder in order — questions often ask what comes next.',
  },
  {
    id: 'ssb-special-entry',
    title: 'The SSB and NCC special entry',
    subject: 'SSB',
    level: 'Years 2–3 · C certificate',
    minutes: 11,
    summary:
      'The five-day Services Selection Board, the officer-like qualities it measures, and the routes a C certificate holder can take into the forces.',
    sections: [
      {
        heading: 'The five days',
        body: 'The SSB is a five-day assessment at a selection centre. Day one is screening: an Officers Intelligence Rating test and a picture perception and discussion test. Candidates who clear screening stay; the rest are returned the same day. Days two and three are psychological tests and group testing, day four is the personal interview, and day five is the conference where results are announced.',
        bullets: [
          'Screening: OIR (verbal and non-verbal reasoning) and PPDT (write about a picture, then discuss it in a group).',
          'Psychology: Thematic Apperception Test, Word Association Test, Situation Reaction Test and Self-Description.',
          'GTO tasks: group discussion, group planning exercise, progressive group task, half group task, individual obstacles, command task, lecturette and final group task.',
          'Interview: personal history, academics, family, hobbies, NCC service and awareness of the service you want to join.',
        ],
      },
      {
        heading: 'What is being assessed',
        body: 'Assessors score officer-like qualities: effective intelligence, reasoning ability, organising ability, power of expression, social adaptability, cooperation, sense of responsibility, initiative, self-confidence, speed of decision, ability to influence a group, liveliness, determination and courage. There is no written pass mark for a “type”; the board looks for a consistent person across all three assessments.',
      },
      {
        heading: 'Psychology tests, honestly',
        body: 'The TAT asks for a story about a picture in about four minutes; write what a sensible person would actually do, not a film plot. The WAT gives 60 words at 15 seconds each — write the first complete sentence that comes. The SRT gives 60 situations in 30 minutes; answer practically, in one line. The Self-Description asks what your parents, teachers and friends think of you, and what you would like to become.',
      },
      {
        heading: 'NCC special entry',
        body: 'A C certificate holder gets reserved routes into the forces. For the Army, 32 vacancies per course at the Indian Military Academy are reserved for NCC C certificate holders — 64 a year — filled through the UPSC written examination and the SSB. For the Army’s Officers Training Academy, 100 Short Service Commission (Non-Technical) vacancies a year are filled through the SSB without the UPSC written paper.',
        bullets: [
          'Navy: 6 vacancies per course reserved for C certificate holders of the Naval Wing.',
          'Air Force: 10% of vacancies reserved for C certificate holders of the Air Wing.',
          'CAPF and paramilitary: bonus marks or preference in recruitment, up to 5% of maximum marks for SI and constable posts.',
          'State police and universities: bonus marks under state rules, which vary.',
        ],
      },
      {
        heading: 'Preparing in the last month',
        body: 'Run 2.4 km three times a week, practise 20 push-ups and 30 sit-ups in sets, and learn to speak for three minutes without notes. Read one newspaper daily and keep a note of two security issues with dates. Rehearse your personal history: why the NCC, what you did in camp, why the service, what you will do if not selected.',
      },
    ],
    keyPoints: [
      'SSB runs five days: screening, psychology, GTO, interview, conference.',
      'Screening includes OIR and the picture perception and discussion test.',
      'NCC special entry: 32 IMA vacancies per course, 100 OTA SSC (Non-Tech) a year.',
      'OLQs are judged across all three assessments and must agree with each other.',
    ],
    examTip:
      'Learn the two Army figures exactly — 32 per course at IMA and 100 a year at OTA Chennai — and the day-wise SSB sequence.',
  },
  {
    id: 'physical-fitness',
    title: 'Physical training, yoga and injury care',
    subject: 'PT',
    level: 'Every year · camp and SSB',
    minutes: 9,
    summary:
      'A training plan a cadet can actually follow, the standards worth aiming at, and what to do about blisters, sprains and heat.',
    sections: [
      {
        heading: 'The four components',
        body: 'Fitness is not one quality. Cardio-respiratory endurance lets you run and recover; muscular strength and endurance let you carry and hold; flexibility keeps joints safe; and a strong core protects the back in drill, load carrying and sport. Train all four every week, not one to exhaustion.',
        bullets: [
          'Endurance: 20–30 minutes of running, cycling or swimming, three times a week.',
          'Strength: push-ups, sit-ups, squats, lunges and pull-ups in sets, two or three times a week.',
          'Flexibility: ten minutes of stretching after every session, never before a cold start.',
          'Core: plank, side plank, bird-dog and leg raises, three times a week.',
        ],
      },
      {
        heading: 'A week that works',
        body: 'Monday intervals, Tuesday strength, Wednesday easy run and stretching, Thursday strength and games, Friday a timed 2.4 km, Saturday a long walk or trek, Sunday rest. Build volume by about a tenth a week, and take a lighter week every fourth week. Progress comes from consistency, not from one heroic session.',
      },
      {
        heading: 'Standards worth aiming at',
        body: 'A fit cadet should manage a 2.4 km run in about 10 to 12 minutes, 30 to 40 push-ups and 40 to 50 sit-ups in a minute, and at least six pull-ups. Service selection also checks height, weight and vision against the notified standards for the entry, so check the current notification rather than an old chart.',
      },
      {
        heading: 'Yoga and mobility',
        body: 'Surya Namaskar as a warm-up, followed by tadasana, vrikshasana, bhujangasana, vajrasana, paschimottanasana and shavasana, builds mobility and balance. Anulom-vilom and bhramari breathing calm the body before a board or an exam. Ten minutes daily is enough; yoga supplements training, it does not replace it.',
      },
      {
        heading: 'Injuries and heat',
        body: 'For a sprain or strain, use RICE: rest, ice for 15 to 20 minutes, compression and elevation, and get it examined if you cannot bear weight. Do not run through a stress fracture. For heat exhaustion, move to shade, loosen clothing, cool with water and give ORS if the casualty is fully conscious; heat stroke with confusion is an emergency, cool and evacuate.',
        bullets: [
          'Blisters: do not burst them; pad and keep the area dry. Change socks daily in camp.',
          'Cramps: stretch the muscle, hydrate with salt and water, and warm up properly next time.',
          'Hydration: drink before you are thirsty; in camp, treat all water as suspect unless it is from the unit point.',
        ],
      },
    ],
    keyPoints: [
      'Train endurance, strength, flexibility and core every week.',
      'Target a 2.4 km run near 10–12 minutes and 30+ push-ups.',
      'RICE: rest, ice, compression, elevation for sprains and strains.',
      'Heat stroke with confusion is a medical emergency — cool and evacuate.',
    ],
    examTip:
      'The first aid paper asks RICE and heat exhaustion. Learn the four letters and the difference between heat exhaustion and heat stroke.',
  },
  {
    id: 'health-hygiene',
    title: 'Health, hygiene, nutrition and sanitation',
    subject: 'HH',
    level: 'Years 1–3 · all certificates',
    minutes: 10,
    summary:
      'Staying well in camp and in the field: personal hygiene, safe water, a balanced diet, deficiency diseases and infection control.',
    sections: [
      {
        heading: 'Personal hygiene',
        body: 'Bathe daily, brush twice a day, cut nails short, keep hair within the regulation cut, wash socks and underclothes daily, and dry feet thoroughly. In camp, shared washing lines and latrines spread infection quickly: use your own towel, mug and soap, and never share a razor.',
        bullets: [
          'Feet: dry between the toes, change socks, treat athlete’s foot early.',
          'Oral hygiene: brush after dinner, not only in the morning.',
          'Hands: wash with soap before eating and after using the latrine — the single most effective habit in camp.',
        ],
      },
      {
        heading: 'Safe water and food',
        body: 'Untreated water carries cholera, typhoid, hepatitis A and diarrhoea. Boil for one minute, use chlorine tablets or a filter, and store in a covered container with a ladle, never a shared cup. Eat freshly cooked hot food, wash fruit in treated water, and avoid cut fruit and ice from roadside stalls in camp season.',
        bullets: [
          'ORS for dehydration: one sachet in a litre of safe water; homemade is a litre of water with six level teaspoons of sugar and half a teaspoon of salt.',
          'Do not drink from streams or taps of unknown quality, however clear the water looks.',
        ],
      },
      {
        heading: 'A balanced diet',
        body: 'A cadet’s plate needs carbohydrates for energy, protein for repair, fat in moderation, vitamins and minerals, fibre and water. Cereals, pulses, milk, eggs, vegetables, fruit and nuts cover it; expensive supplements do not. Iron and calcium matter especially for adolescent girls and for anyone training hard.',
        bullets: [
          'Carbohydrate: rice, wheat, bajra, potato — the fuel for drill and running.',
          'Protein: dal, rajma, chana, paneer, milk, egg, fish, chicken.',
          'Iron: green leafy vegetables, jaggery, dates, liver; take with vitamin C for absorption.',
          'Calcium: milk, curd, ragi, sesame; vitamin D from sunlight.',
        ],
      },
      {
        heading: 'Deficiency diseases',
        body: 'Night blindness from vitamin A deficiency; beri-beri from vitamin B1; scurvy from vitamin C; rickets from vitamin D; anaemia from iron; goitre from iodine. These are exam favourites: learn the vitamin, the disease and one food source for each.',
      },
      {
        heading: 'Preventing communicable disease',
        body: 'Tuberculosis spreads by droplets — cover a cough, ventilate rooms, complete the full treatment. Malaria spreads by the female Anopheles mosquito: use a net, repellent and long sleeves at dusk, and remove standing water. Dengue spreads by the Aedes mosquito, which bites in daylight and breeds in clean stagnant water — empty pots, tyres and tanks weekly.',
        bullets: [
          'Isolate a cadet with fever and rash and report to the medical officer.',
          'Do not share water bottles, towels or razors in camp.',
          'Keep the latrine area dry and disinfected; report a broken tap immediately.',
        ],
      },
    ],
    keyPoints: [
      'Boil, chlorinate or filter all drinking water; store it covered.',
      'ORS: one sachet per litre of safe water for dehydration.',
      'Deficiencies: A → night blindness, B1 → beri-beri, C → scurvy, D → rickets, iron → anaemia, iodine → goitre.',
      'Malaria is mosquito-borne at dusk; dengue is a day-biting Aedes mosquito in clean stagnant water.',
    ],
    examTip:
      'The deficiency table is the most repeated question in this paper. Write it out from memory once a week.',
  },
  {
    id: 'ncc-law',
    title: 'The NCC Act, discipline and a cadet’s obligations',
    subject: 'LAW',
    level: 'Years 1–3 · all certificates',
    minutes: 8,
    summary:
      'The legal basis of the Corps, what enrolment commits you to, how discipline works, and the limits of a cadet’s duty.',
    sections: [
      {
        heading: 'Why there is an Act',
        body: 'The National Cadet Corps was constituted by the NCC Act, 1948 — Act XXXI of 1948 — with Rules framed under it. That is what makes enrolment, uniform, camp orders and discipline more than school rules. The Act empowers the Central Government to raise the Corps, enrol cadets, frame rules and prescribe the uniform and discipline.',
      },
      {
        heading: 'Enrolment',
        body: 'A cadet is enrolled by the unit with the consent of the institution and, where the cadet is a minor, of the guardian. Enrolment carries the obligation to attend training, wear the uniform correctly, obey lawful orders and protect unit property. It is not a contract of employment and it does not make a cadet a member of the armed forces.',
      },
      {
        heading: 'Discipline',
        body: 'The Rules provide for discipline and for dealing with misconduct. Minor matters are handled by the ANO and the unit; serious matters go up the chain to higher authority, and can lead to discharge. The NCC Act is not the Army Act: a cadet is not tried by court martial, but a cadet is still answerable for absence without leave, misuse of a weapon, theft, ragging or conduct that disgraces the uniform.',
      },
      {
        heading: 'What a cadet may and may not be asked to do',
        body: 'A cadet trains, attends camps, takes part in social service and ceremonial duty, and assists the civil administration during emergencies when lawfully called out. A cadet is not deployed in active operations, is not used for private work, and cannot be punished corporally. Any order that is unlawful, degrading or unsafe should be reported to the ANO or the next higher authority.',
      },
      {
        heading: 'Discharge and records',
        body: 'Enrolment ends on completing training, leaving the institution, medical grounds, or discharge for indiscipline. Certificates, camp reports and the NCC diary are the record of service; keep the certificate safe, because a duplicate is slow and sometimes impossible to obtain years later.',
      },
    ],
    keyPoints: [
      'The NCC Act, 1948 (Act XXXI of 1948) and the Rules under it govern the Corps.',
      'Enrolment needs institutional and, for minors, guardian consent.',
      'Discipline is under the NCC Act and Rules, not the Army Act.',
      'Cadets train and assist in emergencies; they are not deployed in operations.',
    ],
    examTip:
      'Know the year 1948 and the phrase “Act XXXI of 1948”. A frequent question asks whether cadets are subject to military law — they are not.',
  },
  {
    id: 'shooting',
    title: 'Shooting and marksmanship',
    subject: 'SHOOT',
    level: 'Years 1–3 · weapon practical',
    minutes: 10,
    summary:
      'The weapons a cadet actually fires, range safety, the firing positions and the four things that decide a grouping.',
    sections: [
      {
        heading: 'Weapons in NCC use',
        body: 'The .22 Deluxe rifle is the first weapon most cadets fire: bolt action, small calibre, almost no recoil, ideal for learning sight picture. The 7.62 mm Self Loading Rifle and the 5.56 mm INSAS are the service rifles used for weapon training, and the 7.62 mm Light Machine Gun is demonstrated for automatic fire. Characteristics, stripping and loading are examined; the weapon is never handled without an instructor present.',
        bullets: [
          '.22 rifle: bolt action, magazine-fed, used for 25 m grouping and 50 m classification.',
          '7.62 mm SLR: gas-operated, 20-round magazine, effective to about 300–400 m.',
          '5.56 mm INSAS: gas-operated, 30-round magazine, lighter recoil, effective to about 400 m.',
          '7.62 mm LMG: belt or magazine fed, bipod, suppressive fire to about 800 m.',
        ],
      },
      {
        heading: 'Range safety',
        body: 'Every range runs on the range officer’s words of command. The weapon is kept unloaded until the order to load, the muzzle stays pointing down the range, the finger stays off the trigger until firing, and on “stop” you stop, keep the weapon pointing down the range and wait. Ear protection is worn, and no one moves forward until the range is declared clear.',
        bullets: [
          'Treat every weapon as loaded until you have personally checked it.',
          'Never point a weapon at anything you do not intend to shoot.',
          'On “unload”, remove the magazine, work the bolt or cocking handle and show the chamber clear.',
          'Report a misfire and keep the weapon pointed down the range for the prescribed period.',
        ],
      },
      {
        heading: 'The firing positions',
        body: 'The four positions are standing, kneeling, sitting and lying. Lying is the steadiest and is used for grouping and zeroing. In kneeling and sitting, the elbow rests on the knee or the support, the sling takes the weight and the body is square to the target. Standing is the least steady and needs breath control.',
      },
      {
        heading: 'The four fundamentals',
        body: 'Marksmanship comes down to sight alignment, sight picture, breathing and trigger control. Align the foresight centrally in the backsight with the tip level; place that alignment on the target; fire in the natural pause after breathing out; and squeeze the trigger steadily without jerking. Follow through — hold the aim for a moment after the shot.',
        bullets: [
          'Sight alignment error grows with distance: a millimetre at the eye is centimetres at the target.',
          'Zero the weapon at 25 m before moving to classification at longer ranges.',
          'A group that is tight but off centre means the sights need adjusting; a wide group means a technique fault.',
        ],
      },
      {
        heading: 'Range procedure and scoring',
        body: 'A classification shoot runs in details: a detail fires while the rest await their turn. Scores are recorded on the target and signed; the grouping is measured between the two furthest shots. The commands a cadet must recognise are load, ready, fire, stop, unload, show clear and stand easy. Safety breaches end the shoot for the whole detail, not only for the cadet who caused them.',
      },
    ],
    keyPoints: [
      '.22 rifle for first firing; 7.62 SLR and 5.56 INSAS for service weapon training; 7.62 LMG demonstrated.',
      'Weapon unloaded until ordered; muzzle down the range; finger off the trigger.',
      'Fundamentals: sight alignment, sight picture, breathing, trigger control, follow-through.',
      'Zero at 25 m before a classification shoot.',
    ],
    examTip:
      'List the four fundamentals in order and the range commands in sequence. Practical marks come from handling, not from the score alone.',
  },
  {
    id: 'remount-veterinary',
    title: 'Remount and Veterinary Corps',
    subject: 'RVC',
    level: 'Certificate B and C · optional paper',
    minutes: 8,
    summary:
      'The Army corps that manages animals and equitation — its organisation, stable routine, shoeing and saddle fitting, and the paper offered at selected units.',
    sections: [
      {
        heading: 'What the RVC does',
        body: 'The Remount and Veterinary Corps provides veterinary care to military animals, manages remounts and equitation, and runs the Army’s veterinary hospitals and farms. Animals still serve in mountain and high-altitude areas where vehicles cannot go: mules carry loads on mule tracks, ponies and horses are used for ceremonial duty, and dogs serve in mine detection and guard roles.',
        bullets: [
          'Veterinary care for horses, mules, ponies, camels and dogs.',
          'Remount depots that buy, break and train animals.',
          'Equitation training for officers and cadets at RVC centres.',
          'Ceremonial roles, including the President’s Bodyguard.',
        ],
      },
      {
        heading: 'The examination paper',
        body: 'Certificate B and C offer a Remount and Veterinary specialised paper of 150 marks, taken only where the unit is authorised. It carries organisation and functioning of the RVC, animal management and equitation, shoeing, and saddle fitting, with written and practical components in each.',
        bullets: [
          'B: RVC organisation 10, animal management and equitation 80, shoeing 30, saddle fitting 30.',
          'C: animal management and equitation 90, shoeing 30, saddle fitting 30.',
          'Practicals are conducted at an RVC centre or by a veterinary officer.',
        ],
      },
      {
        heading: 'Stable management',
        body: 'A stable day begins with grooming — curry comb, brush, mane and tail, and picking out the feet — followed by watering and feeding. Feed is weighed, not guessed: hay or chaff with gram, bran and concentrates, and water offered several times a day. Bedding is kept clean and dry, the stable ventilated, and exercise given daily.',
        bullets: [
          'Groom before and after work; check the back and girth area for rubs.',
          'Never water a hot animal heavily; cool it out first.',
          'Muck out daily and disinfect periodically; damp bedding causes foot problems.',
          'Report lameness, colic, heat in the foot or a wound to the veterinary assistant at once.',
        ],
      },
      {
        heading: 'Shoeing and saddle fitting',
        body: 'A working animal is shod roughly every four to six weeks. The farrier removes the shoe, trims and balances the hoof, and nails a shoe sized to the foot; a lost shoe means a rest day and a farrier visit. Saddle fitting checks that the saddle sits clear of the withers and spine, that the panels are even, and that the girth is tight enough to hold without pinching — a bad fit causes sores within a day.',
      },
      {
        heading: 'Common conditions',
        body: 'Colic is abdominal pain, often from a sudden feed change or watering after hard work; it is an emergency. Laminitis is inflammation of the hoof, often after rich feed. Strangles is a bacterial infection with fever and nasal discharge, and is contagious. Mange and ticks are treated with the prescribed dips and repellents. Foot-and-mouth disease affects cloven-hoofed animals and is notifiable.',
      },
    ],
    keyPoints: [
      'RVC provides veterinary care, remounts and equitation to the Army.',
      'Paper IV is 150 marks and only at authorised units.',
      'Shoeing cycle is about four to six weeks.',
      'Colic and laminitis are emergencies; strangles is contagious.',
    ],
    examTip:
      'Learn the marks split for your certificate and the four practical areas: grooming, feeding, shoeing and saddle fitting.',
  },
]
