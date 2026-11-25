import type { Lesson } from './types'

// Specialised and common subjects, second half. Content follows DGNCC training
// material, the CBSE NCC (076) syllabus and standard military map reading.
export const lessonsB: Lesson[] = [
  {
    id: 'map-reading-basics',
    title: 'Map reading: scale, grid and conventional signs',
    subject: 'MR',
    level: 'Years 1–3 · up to 46 marks in C (Army)',
    minutes: 12,
    summary:
      'A map is a scaled, simplified plan of the ground seen from above. Everything else — bearings, relief, resection — sits on top of these three ideas.',
    sections: [
      {
        heading: 'Scale',
        body: 'Scale is the ratio between a distance on the map and the same distance on the ground. A representative fraction of 1:50,000 means one unit on the map is 50,000 of the same units on the ground — so 1 cm is 500 m, and 2 cm is 1 km.',
        bullets: [
          'Large scale (1:25,000 or 1:50,000): more detail, smaller area. Used for tactical work.',
          'Small scale (1:250,000 or 1:1,000,000): less detail, larger area. Used for planning moves.',
          'Convert with the scale bar first, then with the representative fraction as a check.',
          '1:50,000 — 2 cm = 1 km. 1:25,000 — 4 cm = 1 km. Memorise these two.',
        ],
      },
      {
        heading: 'Grid references',
        body: 'A military map is covered by a grid of squares, each divided into tenths. A four-figure reference locates a 1 km square; a six-figure reference locates a point inside it to 100 m. Always read eastings (along the bottom) before northings (up the side) — “along the corridor, then up the stairs”.',
        bullets: [
          'Four figures: 34 / 78 means easting 34, northing 78 — a whole square.',
          'Six figures: 345 / 782 means 500 m east of grid line 34 and 200 m north of line 78.',
          'Eight figures add 10 m precision; rarely needed for cadet exams.',
          'The grid square is named by its lower-left corner, never its centre.',
        ],
      },
      {
        heading: 'Conventional signs',
        body: 'Maps use standard symbols so that every soldier reads the same ground. Learn the families: relief (contours, spot heights), water (rivers, tanks, wells), vegetation (forest, orchard, scrub), communications (metalled road, track, railway), buildings (village, hut, temple, mosque, church) and military (bridge class, ferry, airfield).',
        bullets: [
          'A metalled road is drawn as two firm parallel lines; a track is a broken single line.',
          'Contours are thin brown lines joining points of equal height.',
          'Blue is water, green is vegetation, black is man-made, brown is relief.',
        ],
      },
      {
        heading: 'Setting a map',
        body: 'To set a map, turn it until the grid north lines point to grid north on the ground, using a compass or two distant features. A set map matches the ground in front of you; everything you then read can be transferred straight to the terrain.',
      },
    ],
    keyPoints: [
      'Scale 1:50,000 — 2 cm equals 1 km; 1:25,000 — 4 cm equals 1 km.',
      'Read eastings before northings: along the corridor, then up the stairs.',
      'Six figures give 100 m accuracy inside a 1 km square.',
      'Blue water, green vegetation, brown relief, black man-made.',
    ],
    examTip:
      'Practical map reading almost always starts with “give a six-figure grid reference of …”. Practise reading to the nearest tenth of a square, then writing three digits per axis.',
  },
  {
    id: 'map-reading-bearings',
    title: 'Bearings, relief, resection and GPS',
    subject: 'MR',
    level: 'Years 1–3 · practical paper',
    minutes: 12,
    summary:
      'From a grid square to a direction on the ground: prismatic compass bearings, back bearings, contour reading and finding your own position.',
    sections: [
      {
        heading: 'Three norths',
        body: 'True north is the geographic pole. Magnetic north is where the compass needle points, and it moves slightly each year. Grid north is the direction of the vertical grid lines. The angle between grid north and magnetic north is magnetic variation; on Indian maps it is printed in the margin, with the year it was measured.',
        bullets: [
          'Grid bearing: measured clockwise from grid north on the map, 0° to 360°.',
          'Magnetic bearing: measured with the prismatic compass on the ground.',
          'Convert: magnetic bearing = grid bearing − magnetic variation (east variation).',
          'Back bearing: add 180° if below 180°, subtract 180° if above.',
        ],
      },
      {
        heading: 'The prismatic compass',
        body: 'Hold the compass level and steady, bring the hairline onto the object, and read the bearing against the prism. The prismatic compass reads magnetic bearings directly and is used for quick direction finding; the lensatic compass works on the same principle with a different sighting arrangement.',
        bullets: [
          'Keep metal, rifles and vehicles away — they deflect the needle.',
          'Take two or three readings and average them.',
          'A bearing is always written in three figures: 045°, 180°, 327°.',
        ],
      },
      {
        heading: 'Reading relief from contours',
        body: 'Contours join points of equal height, at a fixed vertical interval printed in the margin. Closely spaced contours mean a steep slope; widely spaced means gentle ground. V-shaped contours pointing upstream mark a valley; U-shapes mark a spur. Ring contours with hachures or a depression symbol mark a hollow.',
        bullets: [
          'Contour interval: the height difference between adjacent contours.',
          'Index contours are thicker and labelled with their height.',
          'A ridge line runs along the tops; a valley line runs along the bottoms.',
          'Spot heights are marked with a dot and a number.',
        ],
      },
      {
        heading: 'Resection and setting by back bearings',
        body: 'Resection finds your own position from two or three known features. Take a magnetic bearing to each feature, convert to a grid bearing, add 180° for the back bearing, and draw the line from the feature on the map. Where the lines cross is your position.',
        bullets: [
          'Two features give a fix; three give a check triangle.',
          'Choose features at roughly 60° to each other for the sharpest cut.',
          'GPS gives a position directly, but it is a tool, not a substitute — batteries fail and terrain blocks the sky.',
        ],
      },
      {
        heading: 'Pacing and judging distance',
        body: 'Count paces over a measured 100 m to find your personal pace length, then use it to check distances on the ground. Average adult quick march is about 120 paces per 100 m; on rough ground or uphill it shortens.',
      },
    ],
    keyPoints: [
      'Three norths: true, magnetic, grid. Variation is printed on the map margin.',
      'Back bearing: ±180°; bearings are written in three figures.',
      'Contours close together mean steep; V points upstream into a valley.',
      'Resection: bearings to two known features, back bearings drawn from them.',
    ],
    examTip:
      'Conversion questions are common: “A grid bearing is 120°, variation is 2° east. What is the magnetic bearing?” Answer: 118°. Learn the direction of the sign.',
  },
  {
    id: 'field-craft',
    title: 'Field craft and battle craft',
    subject: 'FCBC',
    level: 'Years 1–3 · written plus practical',
    minutes: 11,
    summary:
      'Judging distance, describing ground, camouflage, field signals, section formations and fire control orders — the practical core of the Army wing.',
    sections: [
      {
        heading: 'Judging distance',
        body: 'Distance can be judged by the appearance of objects, by the unit method (mentally laying a 100 m strip on the ground), by section averaging, or by halving and pacing. At 100 m a man’s face is clear; at 300 m features blur; at 500 m the head is a blob and the body a dark shape.',
        bullets: [
          'Objects look closer in clear light, over water and snow, and when looking uphill.',
          'Objects look farther in haze, rain, low light, and when looking downhill.',
          'Always cross-check one method against another before reporting.',
        ],
      },
      {
        heading: 'Describing ground',
        body: 'A ground description follows a fixed order so nothing is missed: foreground, then the ground beyond, then the flanks. Note cover, obstacles, fields of fire, dead ground and likely enemy approaches. Report in plain words a commander can act on.',
      },
      {
        heading: 'Camouflage and concealment',
        body: 'Camouflage breaks up shape, shadow, shine, silhouette, surface and spacing — the six S’s. Use natural vegetation, keep still, avoid skylining, and match your camouflage to the ground you are on. Concealment hides you from view; camouflage also hides you from detection.',
        bullets: [
          'Shape: break the human outline with foliage or netting.',
          'Shadow: stay out of it, or use it deliberately.',
          'Shine: dull skin, metal, glasses and watch faces.',
          'Silhouette: never stand against the skyline.',
          'Spacing: do not bunch; a group is easier to spot than a person.',
        ],
      },
      {
        heading: 'Field signals and formations',
        body: 'Field signals are silent hand and arm signals: enemy seen, halt, advance, deploy, form line, retire. Section formations are single file, file, arrowhead, line and extended line — chosen by ground, visibility and the threat.',
        bullets: [
          'Single file: narrow tracks, poor visibility, mine risk.',
          'Arrowhead: moving into the unknown, all-round observation.',
          'Line: assaulting a position, maximum fire to the front.',
          'Extended line: sweeping open ground with wide spacing.',
        ],
      },
      {
        heading: 'Fire control orders',
        body: 'A fire control order has five parts: group (who fires), range, indication of target, type of fire and command to fire. “Section — 300 — enemy behind the low wall — rapid — fire.” Short, in that order, and always confirmed.',
      },
    ],
    keyPoints: [
      'Six S’s of camouflage: shape, shadow, shine, silhouette, surface, spacing.',
      'At 300 m faces blur; at 500 m the body is a dark shape.',
      'Section formations: single file, file, arrowhead, line, extended line.',
      'Fire control order: group, range, indication, type of fire, fire.',
    ],
    examTip:
      'Field craft practicals score on the orders you give, not only the answer. Practise the five-part fire control order aloud until it is automatic.',
  },
  {
    id: 'first-aid',
    title: 'Health, hygiene and first aid',
    subject: 'FA',
    level: 'Years 1–3 · all certificates',
    minutes: 12,
    summary:
      'Personal hygiene, camp sanitation, and the casualty drills that matter: bleeding, fractures, burns, shock, snake bite and CPR.',
    sections: [
      {
        heading: 'Personal hygiene and camp sanitation',
        body: 'Bathe daily, change socks, keep nails short, brush twice, and treat any cut early. In camp, use the latrine pits, boil or treat drinking water, keep food covered, and report illness to the camp medical officer instead of hiding it.',
        bullets: [
          'Prevent athlete’s foot: dry feet, clean socks, air footwear.',
          'Prevent heat illness: water before thirst, salt in food, rest in shade.',
          'Prevent malaria and dengue: no standing water, nets and repellent at night.',
        ],
      },
      {
        heading: 'The first aid priority order',
        body: 'Danger, response, airway, breathing, circulation. Make the scene safe, check if the casualty responds, open the airway, check breathing, then control severe bleeding. Call for medical help early — a first aider is not a replacement for a doctor.',
        bullets: [
          'Triage: treat the quiet, pale casualty before the one shouting.',
          'Never move a suspected spinal injury unless there is immediate danger.',
          'Record time of tourniquet, time of collapse and what you did.',
        ],
      },
      {
        heading: 'Bleeding, fractures and burns',
        body: 'For bleeding, press directly on the wound with a clean dressing and elevate if possible; use a tourniquet only for life-threatening limb bleeding. For a fracture, immobilise the joint above and below, check circulation beyond the injury, and support before moving. For burns, cool with clean running water for at least 20 minutes, cover loosely, and never apply oil, toothpaste or ice.',
        bullets: [
          'Do not remove an object impaled in a wound — pad around it.',
          'Do not push a protruding bone back in; cover and immobilise.',
          'Do not burst blisters from a burn.',
        ],
      },
      {
        heading: 'Shock, snake bite and CPR',
        body: 'Shock signs: pale cold clammy skin, rapid weak pulse, thirst, restlessness. Lay the casualty down, keep them warm, raise the legs if no fracture, and do not give food or drink. For a snake bite, keep the person still and the limb below heart level, remove rings, and get antivenom fast; do not cut, suck or apply a tight bandage.',
        bullets: [
          'CPR: 30 compressions to 2 breaths, centre of the chest, about 5–6 cm deep, 100–120 per minute.',
          'Use an AED as soon as one arrives; it will not shock a normal rhythm.',
          'Continue until the casualty breathes, help arrives, or you are exhausted.',
        ],
      },
      {
        heading: 'Heat and cold casualties',
        body: 'Heat exhaustion: heavy sweating, dizziness, cramps — move to shade, loosen clothing, give oral rehydration salts. Heat stroke is an emergency: hot dry skin, confusion — cool rapidly and evacuate. Hypothermia: shivering, slurred speech — insulate, warm slowly, no alcohol.',
      },
    ],
    keyPoints: [
      'DRABC: danger, response, airway, breathing, circulation.',
      'Direct pressure for bleeding; tourniquet only for life-threatening limb bleeds.',
      'Burns: 20 minutes of cool running water, no oil or ice.',
      'CPR 30:2, 100–120 per minute, 5–6 cm deep.',
      'Snake bite: immobilise, keep low, evacuate. Never cut or suck.',
    ],
    examTip:
      'Written papers often ask for three signs of shock or the CPR ratio. Learn the numbers — 30:2, 100–120, 5–6 cm, 20 minutes — they are marked exactly.',
  },
  {
    id: 'disaster-management',
    title: 'Disaster management',
    subject: 'DM',
    level: 'Years 1–3 · all certificates',
    minutes: 10,
    summary:
      'Types of disaster, the disaster cycle, and the specific jobs NCC cadets do in a relief camp.',
    sections: [
      {
        heading: 'Types of disaster',
        body: 'Natural disasters include floods, cyclones, earthquakes, landslides, drought, tsunami, forest fire and epidemics. Man-made disasters include fires, industrial accidents, chemical and nuclear leaks, transport accidents, riots and war. India’s coastline, Himalayan belt and monsoon make floods, cyclones and earthquakes the recurring threats.',
      },
      {
        heading: 'The disaster cycle',
        body: 'Every disaster passes through mitigation, preparedness, response and recovery. Mitigation reduces risk before it happens: building codes, embankments, plantation. Preparedness is training, drills, stockpiles and warning systems. Response is rescue and relief. Recovery is rebuilding lives and livelihoods.',
        bullets: [
          'Mitigation: reduce the hazard or the exposure.',
          'Preparedness: plan, train, stock, warn.',
          'Response: save lives first, then property.',
          'Recovery: shelter, health, livelihood, reconstruction.',
        ],
      },
      {
        heading: 'NCC’s role in relief',
        body: 'Cadets assist the district administration under the ANO and local authorities. Typical tasks: filling and stacking sandbags, evacuating families, running a relief camp, crowd control, first aid, distributing food and water, and helping reunite missing people.',
        bullets: [
          'Always work under an authorised official; never self-deploy into a hazard zone.',
          'Know the camp layout: registration, medical, food, sanitation, children’s area.',
          'Keep an inventory and a simple log of what was distributed to whom.',
        ],
      },
      {
        heading: 'Relief camp organisation',
        body: 'A good camp separates functions: a registration desk, sleeping areas by family, a kitchen and storage, drinking water points, latrines away from water sources, a medical post and a safe space for children. Announce information at fixed times so rumours do not fill the gap.',
      },
      {
        heading: 'Personal safety in a disaster',
        body: 'Flood: move to high ground, never walk or drive through moving water. Earthquake: drop, cover, hold; stay away from windows. Cyclone: stay indoors after the eye passes. Fire: stay low, use stairs, never re-enter a burning building.',
      },
    ],
    keyPoints: [
      'Disaster cycle: mitigation, preparedness, response, recovery.',
      'Cadets assist, never self-deploy.',
      'Camp layout: registration, shelter, food, water, sanitation, medical.',
      'Earthquake drill: drop, cover, hold.',
    ],
    examTip:
      'A frequent question asks for the four phases of the disaster cycle. Write them in order and add one example each.',
  },
  {
    id: 'social-service',
    title: 'Social service and community development',
    subject: 'SSCD',
    level: 'Years 1–3 · 36 marks in C',
    minutes: 9,
    summary:
      'The NCC’s civic side: what counts as social service, how to plan a project, and the campaigns cadets actually run.',
    sections: [
      {
        heading: 'Why social service is in the syllabus',
        body: 'The NCC aims at selfless service. Social service turns training into visible public good and builds the habit of citizenship. It is assessed on participation and organisation, not only on written answers.',
        bullets: [
          'Blood donation drives and donor registration.',
          'Swachh Bharat cleanliness drives in schools, markets and heritage sites.',
          'Tree plantation and maintenance of what was planted.',
          'Adult literacy and coaching for younger students.',
          'Road safety, anti-drug and anti-tobacco awareness rallies.',
          'Help at government hospitals, old age homes and shelters.',
        ],
      },
      {
        heading: 'Planning a project',
        body: 'Identify a real local need, not an imported idea. Set one measurable aim, agree it with the ANO and local authority, decide who does what and when, arrange permission and materials, then execute, record and publicise honestly.',
        bullets: [
          'Need → aim → plan → permission → execution → record → review.',
          'One clear aim beats five vague ones.',
          'Photograph and log the activity for the unit diary.',
        ],
      },
      {
        heading: 'Community development',
        body: 'Development work is longer-term than a one-day drive: literacy classes, health camps, water and sanitation awareness, skill help for youth. The test of a project is whether it continues after the cadets leave.',
      },
      {
        heading: 'Blood donation and health camps',
        body: 'Cadets can organise donation camps with a licensed blood bank, arrange donor counselling, manage queues and refreshments, and follow up with donors. Never collect or store blood without a licensed bank.',
      },
    ],
    keyPoints: [
      'Social service is assessed on participation, not only theory.',
      'Project order: need, aim, plan, permission, execution, record, review.',
      'C 2 certificate carries 36 marks for social service.',
      'Work with licensed agencies for blood donation and health camps.',
    ],
    examTip:
      'Be ready to describe one social service project you took part in: the need, your role, the result and what you would change.',
  },
  {
    id: 'adventure-training',
    title: 'Adventure and obstacle training',
    subject: 'ADV',
    level: 'Years 1–3 · camp assessed',
    minutes: 9,
    summary:
      'The obstacle course, trekking, rock climbing, rappelling and watermanship — plus the safety rules that make adventure training survivable.',
    sections: [
      {
        heading: 'The obstacle course',
        body: 'A standard NCC obstacle course includes the long jump, high jump, tunnel, screen jump, balance beam, ramp, straight balance, zig-zag balance, river crossing and the confidence jump. The aim is courage, agility and teamwork, not speed alone.',
        bullets: [
          'Warm up before every attempt; one spotter per obstacle.',
          'Two cadets at a time on most obstacles; never rush the queue.',
          'Report an injury immediately — hiding it makes it worse.',
        ],
      },
      {
        heading: 'Trekking and navigation',
        body: 'A trek is planned with a route card: start, checkpoints, timings, water points, escape routes and a return time. Carry water, salt, a torch, a first aid kit, a whistle and a map. Walk at the pace of the slowest, rest briefly and often, and never split the group.',
        bullets: [
          'Tell someone the route and expected return time before leaving.',
          'Turn back on schedule even if the summit is close.',
          'Treat blisters early; change socks at the mid-point.',
        ],
      },
      {
        heading: 'Rock climbing and rappelling',
        body: 'Climbing uses three-point contact: two hands and a foot, or two feet and a hand, always in contact with the rock. Rappelling is a controlled descent on a rope with a belay. Both require an instructor, inspected equipment and a helmet.',
        bullets: [
          'Check the harness, karabiner, rope and anchor before every descent.',
          'Hair tied, no loose clothing near the rope, gloves as instructed.',
          'One person on the rope at a time; the belay never leaves the anchor.',
        ],
      },
      {
        heading: 'Watermanship and swimming',
        body: 'Naval wing training includes swimming, boat pulling and sailing. The rule is simple: never enter water alone, always with a buddy and a lifeguard, and wear a life jacket in any boat. Learn to float before you learn to swim distance.',
      },
      {
        heading: 'Adventure safety',
        body: 'Adventure training is risk-managed, not risk-free. Weather, equipment, supervision and fitness decide whether an activity runs. Any instructor can cancel an activity; no cadet can overrule a cancellation.',
      },
    ],
    keyPoints: [
      'Three-point contact when climbing.',
      'A trek needs a route card, a return time and a buddy system.',
      'Rappelling needs instructor, helmet, inspected harness and a belay.',
      'Any instructor can cancel an activity for safety.',
    ],
    examTip:
      'Adventure questions are often about safety rules rather than technique. Learn three rules for each activity.',
  },
]
