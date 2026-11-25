import type { Lesson } from './types'

// Environment, security studies, services knowledge and wing-specific subjects.
export const lessonsC: Lesson[] = [
  {
    id: 'environment',
    title: 'Environment awareness and conservation',
    subject: 'ENV',
    level: 'Years 2–3 · 20 marks in C',
    minutes: 9,
    summary:
      'Water, waste, energy and land: what the syllabus asks, and what a unit can actually do.',
    sections: [
      {
        heading: 'The pressures',
        body: 'India supports about 18% of the world’s people on roughly 2.4% of its land and 4% of its fresh water. Groundwater is falling in many districts, air quality is poor in cities, and waste volumes are rising faster than treatment capacity.',
        bullets: [
          'Water: over-extraction, pollution of rivers, leakage in supply.',
          'Air: vehicle and industrial emissions, crop burning, dust.',
          'Waste: mixed waste, plastic in drains and water bodies.',
          'Land: deforestation, erosion, loss of topsoil.',
        ],
      },
      {
        heading: 'Water conservation',
        body: 'Rainwater harvesting collects roof runoff into a tank or recharge pit instead of letting it run into the drain. Drip irrigation, check dams, watershed treatment and repairing leaking taps all add up. A single dripping tap can waste more than 15 litres a day.',
      },
      {
        heading: 'Waste and the three Rs',
        body: 'Reduce first, reuse second, recycle third. Segregate at source into wet, dry and hazardous waste. Compost kitchen waste, return e-waste to authorised collectors, and refuse single-use plastic where an alternative exists.',
      },
      {
        heading: 'Energy and the cadet’s role',
        body: 'Switch off unused lights and fans, use LED lighting, service vehicles, and prefer walking, cycling and public transport. Plant native trees and water them through the first two summers — a planted sapling that dies is not a plantation.',
        bullets: [
          'Run a unit cleanliness and plantation drive each term.',
          'Audit your own school or college for leaking taps and open lights.',
          'Teach one class of juniors what segregation means in practice.',
        ],
      },
      {
        heading: 'Legal and policy frame',
        body: 'Key references: the Environment (Protection) Act 1986, the Water Act 1974, the Air Act 1981, the Forest Conservation Act 1980, and the Sustainable Development Goals. NCC environment activities map to Swachh Bharat and to the SDGs on water, climate and life on land.',
      },
    ],
    keyPoints: [
      'Reduce, reuse, recycle — in that order.',
      'Segregate waste into wet, dry and hazardous.',
      'Rainwater harvesting recharges groundwater instead of losing runoff.',
      'Plant native species and maintain them.',
    ],
    examTip:
      'The C paper carries 20 marks on environment. Learn one act, one scheme and three practical actions you can describe.',
  },
  {
    id: 'border-coastal',
    title: 'Border and coastal areas',
    subject: 'BCA',
    level: 'Years 2–3 · all certificates',
    minutes: 9,
    summary:
      'India’s land borders, coastline and islands — and why border populations and coastal communities are part of security.',
    sections: [
      {
        heading: 'India’s land borders',
        body: 'India shares over 15,000 km of land border with seven neighbours: Pakistan, Afghanistan (via Pakistan-administered territory), China, Nepal, Bhutan, Bangladesh and Myanmar. The longest is with Bangladesh, followed by China and Pakistan.',
        bullets: [
          'Line of Control with Pakistan in Jammu and Kashmir.',
          'Line of Actual Control with China, largely undemarcated.',
          'Radcliffe Line with Bangladesh; McMahon Line in the east.',
          'Open borders with Nepal and Bhutan, managed by treaty.',
        ],
      },
      {
        heading: 'Coastline and islands',
        body: 'The mainland coastline runs about 7,500 km across nine coastal states and four union territories, plus the island groups of Andaman and Nicobar and Lakshadweep. The Exclusive Economic Zone extends 200 nautical miles and carries fisheries, oil, gas and mineral resources.',
        bullets: [
          'Nine coastal states: Gujarat, Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Odisha and West Bengal.',
          'Coastal security involves the Navy, Coast Guard, marine police and customs.',
          'The 26/11 attack exposed the need for coastal radar and community vigilance.',
        ],
      },
      {
        heading: 'Border population and the NCC',
        body: 'People living near the border are the first observers of unusual movement. The NCC runs border-area camps and awareness programmes, and cadets learn to report suspicious activity to the nearest police or army post rather than investigate it.',
      },
      {
        heading: 'Why geography matters',
        body: 'Terrain decides strategy: the Himalayan passes, the Thar desert, the Sundarbans creeks and the island chains each demand different forces and equipment. A cadet should be able to place the major borders and the forces that guard them.',
      },
    ],
    keyPoints: [
      'Seven land neighbours; longest border with Bangladesh.',
      'Line of Control (Pakistan), Line of Actual Control (China).',
      'About 7,500 km mainland coastline plus two island groups.',
      'EEZ extends 200 nautical miles.',
    ],
    examTip:
      'Learn the border names and the neighbours in order. Map-based questions are common and reward accuracy over detail.',
  },
  {
    id: 'armed-forces',
    title: 'The armed forces and NCC special entry',
    subject: 'AF',
    level: 'Years 1–3 · Army paper',
    minutes: 11,
    summary:
      'How the Army, Navy and Air Force are organised, what the ranks and badges mean, and the routes a C certificate opens.',
    sections: [
      {
        heading: 'The three services',
        body: 'The President is the Supreme Commander. The Ministry of Defence is headed by the Defence Minister, with the Chief of Defence Staff as principal military adviser. Each service has its own Chief: Chief of the Army Staff, Chief of the Naval Staff and Chief of the Air Staff.',
        bullets: [
          'Army: commanded by a General; organised into commands, corps, divisions, brigades, battalions and companies.',
          'Navy: commanded by an Admiral; fleets, commands, ships and shore establishments.',
          'Air Force: commanded by an Air Chief Marshal; commands, air bases, squadrons and flights.',
        ],
      },
      {
        heading: 'Ranks you should know',
        body: 'Army officers rise from Lieutenant to General; JCOs from Naib Subedar to Subedar Major; other ranks from Sepoy to Havildar. Navy equivalents run Sub Lieutenant to Admiral, with Leading Seaman, Petty Officer and Chief Petty Officer in the ranks. Air Force runs Flying Officer to Air Chief Marshal, with Leading Aircraftman, Corporal, Sergeant and Warrant Officer below.',
      },
      {
        heading: 'NCC special entry',
        body: 'A C certificate with the right wing gives reserved vacancies: 32 per course at IMA, 100 Short Service Commission (Non-Tech) vacancies at OTA Chennai without the UPSC written exam, six per course in the Navy, and 10% of Air Force vacancies. Selection still requires the SSB and medicals.',
        bullets: [
          'IMA: 32 vacancies per course, 64 a year, through UPSC and SSB.',
          'OTA Chennai: 100 SSC (Non-Tech) vacancies a year, SSB only.',
          'Navy: six vacancies per course for C (Naval Wing).',
          'Air Force: 10% of vacancies for C (Air Wing).',
        ],
      },
      {
        heading: 'Other routes into uniform',
        body: 'NDA after Class XII, CDS after graduation, AFCAT for the Air Force, TES for engineers, and the Agniveer scheme for other ranks. Paramilitary forces — CAPF, BSF, CRPF, ITBP, SSB, CISF — recruit separately, and NCC gives bonus marks in several of them.',
      },
      {
        heading: 'SSB in one paragraph',
        body: 'The Services Selection Board assesses officer potential over five days through psychological tests, group tasks, a personal interview and a conference. It looks for effective intelligence, reasoning, organising ability, social adaptability, cooperation, sense of responsibility, initiative, self-confidence, speed of decision, ability to influence, liveliness and determination.',
      },
    ],
    keyPoints: [
      'Three services, each with its own Chief and command structure.',
      'C certificate: IMA 32 per course, OTA 100 a year, Navy 6, Air Force 10%.',
      'SSB has five days: psychology, GTO tasks, interview, conference.',
      'Other entries: NDA, CDS, AFCAT, TES, Agniveer.',
    ],
    examTip:
      'Rank and badge questions are common. Learn the officer ranks of all three services in order, and the equivalent of a Colonel in the Navy and Air Force.',
  },
  {
    id: 'military-history',
    title: 'Military history: battles and bravery',
    subject: 'MH',
    level: 'Years 1–3 · 20 marks in C',
    minutes: 10,
    summary:
      'Campaigns that shaped modern India, from the 1947–48 Kashmir operations to Kargil, and the awardees behind the names.',
    sections: [
      {
        heading: 'Early campaigns',
        body: 'The 1947–48 Kashmir operations saved Srinagar and led to the ceasefire line that became the Line of Control. The 1961 liberation of Goa was a short, decisive operation. The 1962 Sino-Indian war ended in a costly reverse that reshaped India’s defence planning and led to the modernisation drive of the 1960s.',
      },
      {
        heading: '1965 and 1971',
        body: 'The 1965 war saw armoured battles at Asal Uttar and the capture of Haji Pir, ending in the Tashkent Declaration. The 1971 war lasted 13 days, ended with the surrender of 93,000 Pakistani troops in Dhaka, and created Bangladesh. It remains the clearest example of joint planning between the three services.',
        bullets: [
          '1971: the Eastern Command’s thrust to Dhaka decided the war before the UN could act.',
          'The Navy’s missile attacks on Karachi and the Air Force’s airfield strikes shaped the outcome.',
          'The Simla Agreement of 1972 converted the ceasefire line into the Line of Control.',
        ],
      },
      {
        heading: 'Kargil and after',
        body: 'In 1999, intrusions on the heights above Kargil were cleared in Operation Vijay, with the Air Force in Operation Safed Sagar. The war was fought at extreme altitude and led to the Kargil Review Committee and a reorganisation of intelligence and border management.',
      },
      {
        heading: 'Param Vir Chakra',
        body: 'The Param Vir Chakra is India’s highest wartime gallantry award. Learn a handful of citations: Major Somnath Sharma (1947, Srinagar), Company Havildar Major Piru Singh (1947–48), Captain Vikram Batra and Rifleman Sanjay Kumar (1999), and Flying Officer Nirmal Jit Singh Sekhon (1971).',
      },
      {
        heading: 'Peacetime and peacekeeping',
        body: 'The Army’s role is not only war: aid to civil authority in floods and earthquakes, counter-insurgency, and UN peacekeeping, where India has been one of the largest troop contributors since the 1950s.',
      },
    ],
    keyPoints: [
      '1947–48 Kashmir operations created the ceasefire line.',
      '1971: 13 days, 93,000 prisoners, Bangladesh created.',
      '1999 Kargil: Operation Vijay; the Air Force flew Operation Safed Sagar.',
      'Param Vir Chakra is the highest wartime gallantry award.',
    ],
    examTip:
      'Dates and operation names are marked exactly. Build a one-line card for each: 1947–48, 1961, 1962, 1965, 1971, 1999.',
  },
  {
    id: 'communication',
    title: 'Communication and signal procedure',
    subject: 'COMN',
    level: 'Years 1–3 · practical plus written',
    minutes: 9,
    summary:
      'Radio telephony, the phonetic alphabet, message writing and the discipline of keeping a net clear.',
    sections: [
      {
        heading: 'Means of communication',
        body: 'Communication runs by radio, line, messenger, visual signal, and now data networks. Each has trade-offs: radio is fast but interceptable, line is secure but fragile, and a runner is slow but silent.',
      },
      {
        heading: 'Phonetic alphabet and figures',
        body: 'Letters are spoken as Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu. Numbers are spoken digit by digit; nine is often “niner” to avoid confusion with five.',
      },
      {
        heading: 'Radio telephony procedure',
        body: 'A call opens with the called station, then the calling station, then “over”. The reply reverses the order. “Over” means the speaker has finished and expects a reply; “out” means the conversation ends. Never use both together.',
        bullets: [
          'Proword “Roger” — message received and understood.',
          'Proword “Wilco” — will comply.',
          'Proword “Say again” — repeat your last transmission.',
          'Proword “Wait out” — I will call you back.',
          '“Read back” — repeat my message to confirm it.',
          '“Silence” — stop transmitting; the net is closed.',
        ],
      },
      {
        heading: 'Message writing',
        body: 'A service message is short, structured and unambiguous: precedence (flash, immediate, priority, routine), date-time group, addressee, sender, text, and signature. The text avoids abbreviations the receiver will not know.',
      },
      {
        heading: 'Security discipline',
        body: 'Assume every unencrypted transmission is heard by the enemy. Never send locations, unit names or strengths in clear, never break radio silence without authority, and never pass a message you have not read back correctly.',
      },
    ],
    keyPoints: [
      'Phonetic alphabet and “niner” for nine.',
      'Over, out, roger, wilco, say again, wait out, read back.',
      'Precedence: flash, immediate, priority, routine.',
      'Assume the net is intercepted; keep it short and secure.',
    ],
    examTip:
      'Practical signals tests ask you to send a short message and read it back. Speak slowly, use prowords, and never say “over and out”.',
  },
  {
    id: 'navy-wing',
    title: 'Naval orientation, seamanship and damage control',
    subject: 'NAVY',
    level: 'Every year · up to 52 marks in C',
    minutes: 11,
    summary:
      'Ship organisation, parts of a ship, ropes and knots, boat work, swimming and the drills that keep a ship afloat.',
    sections: [
      {
        heading: 'The Indian Navy',
        body: 'The Navy guards India’s maritime interests across the Arabian Sea, Bay of Bengal and Indian Ocean. It is organised into commands — Western, Eastern, Southern, and the Andaman and Nicobar Command — with fleets, flotillas and shore establishments. Its roles are military, diplomatic, constabulary and benign.',
        bullets: [
          'Ships are named with prefixes INS; submarines INS too, conventionally without the prefix in speech.',
          'A destroyer, frigate, corvette, submarine and aircraft carrier are the main combat types.',
          'The Coast Guard handles coastal policing and search and rescue.',
        ],
      },
      {
        heading: 'Parts of a ship',
        body: 'Bow is the front, stern the back, port the left when facing forward, starboard the right. The keel is the backbone, the beam the width, the draught the depth below water. Decks are numbered, bulkheads divide compartments, and watertight doors are always kept closed at sea unless working through them.',
        bullets: [
          'Forward and aft, inboard and outboard.',
          'Bridge is where the ship is conned; the quarterdeck is the ceremonial deck.',
          'Gangway is the walkway; the brow is the shore connection.',
        ],
      },
      {
        heading: 'Ropes and knots',
        body: 'Learn the bowline (a fixed loop that will not slip), reef knot (joining two ropes of equal size), clove hitch (fastening to a spar), sheet bend (joining ropes of unequal size), round turn and two half hitches (mooring), and the figure-of-eight (a stopper knot).',
      },
      {
        heading: 'Boat work and seamanship',
        body: 'Boat pulling is commanded by a coxswain with orders for oars: “Oars”, “Toss oars”, “Boat oars”, “Give way together”, “Hold water”, “Back water”. Keep stroke together, watch the coxswain, and never stand in a boat unless ordered.',
      },
      {
        heading: 'Fire fighting, flooding and damage control',
        body: 'Fire needs heat, fuel and oxygen: remove one and it dies. Damage control parties close watertight doors, shore up bulkheads, plug holes with damage control plugs and mattresses, and pump out flooding. Every cadet must know the alarm, the muster station and the nearest extinguisher.',
        bullets: [
          'Fire classes: A solids, B liquids, C gases, D metals, E electrical.',
          'Use the right extinguisher — water on electrical fire is dangerous.',
          'Abandon ship: life jacket, muster, head count, leave in order.',
        ],
      },
    ],
    keyPoints: [
      'Port is left, starboard right, bow front, stern back.',
      'Bowline makes a fixed loop; reef knot joins equal ropes.',
      'Boat orders come from the coxswain; keep stroke together.',
      'Fire triangle: heat, fuel, oxygen. Remove one.',
    ],
    examTip:
      'The C Naval paper carries 32 marks in seamanship and 10 in damage control. Learn rope names with a picture in your head, and one use for each.',
  },
  {
    id: 'air-wing',
    title: 'Air Force subjects: flight, engines and airfields',
    subject: 'AIR',
    level: 'Every year · up to 54 marks in C',
    minutes: 12,
    summary:
      'How an aircraft flies, what makes it turn, how an engine works, what the instruments say, and how an airfield is laid out.',
    sections: [
      {
        heading: 'The four forces and Bernoulli',
        body: 'An aircraft in steady flight balances lift, weight, thrust and drag. The wing generates lift because air moves faster over the curved upper surface, lowering pressure, and because the wing deflects air downward. Increase angle of attack and lift rises until the wing stalls.',
        bullets: [
          'Lift acts perpendicular to the relative airflow.',
          'Thrust opposes drag; excess thrust gives climb or acceleration.',
          'Induced drag rises with lift; parasite drag rises with the square of speed.',
        ],
      },
      {
        heading: 'Controls and axes',
        body: 'An aircraft moves about three axes: roll about the longitudinal axis by ailerons, pitch about the lateral axis by the elevator, and yaw about the vertical axis by the rudder. The throttle controls thrust. Flaps increase lift and drag for slow flight and landing.',
        bullets: [
          'Ailerons: roll. Elevator: pitch. Rudder: yaw.',
          'Dihedral gives lateral stability; the fin gives directional stability.',
          'Adverse yaw is corrected with coordinated rudder.',
        ],
      },
      {
        heading: 'Engines and airframes',
        body: 'Piston engines drive a propeller; jet engines accelerate air rearward. A turbojet, turboprop and turbofan differ in how much air bypasses the core. The airframe is the structure — fuselage, wings, empennage, landing gear — built for strength with minimum weight.',
      },
      {
        heading: 'Instruments and meteorology',
        body: 'The six basic flight instruments: airspeed indicator, altimeter, vertical speed indicator, attitude indicator, heading indicator and turn coordinator. Meteorology matters: learn cloud types, visibility, wind shear, icing and the difference between a forecast and a warning.',
        bullets: [
          'Altimeter setting must match local pressure, or height readings drift.',
          'Cumulonimbus means turbulence, icing and lightning — avoid.',
          'Wind shear on approach is a leading cause of accidents.',
        ],
      },
      {
        heading: 'Airfield layout and aeromodelling',
        body: 'An airfield has a runway aligned with the prevailing wind, taxiways, aprons, a control tower, hangars and dispersal areas. Runway numbers give the magnetic heading in tens of degrees: runway 27 points roughly 270°. Aeromodelling teaches stability, centre of gravity and control response cheaply.',
        bullets: [
          'Runway 09/27 means one direction 090°, the reciprocal 270°.',
          'Windsock shows wind direction and approximate strength.',
          'Model centre of gravity too far aft makes an aircraft uncontrollable.',
        ],
      },
    ],
    keyPoints: [
      'Four forces: lift, weight, thrust, drag.',
      'Ailerons roll, elevator pitches, rudder yaws.',
      'Runway number is magnetic heading divided by ten.',
      'Cumulonimbus: turbulence, icing, lightning — avoid.',
    ],
    examTip:
      'Air wing papers reward precise vocabulary. Learn the three axes with their controls and the six basic instruments.',
  },
]
