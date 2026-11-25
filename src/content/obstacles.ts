// Specifications, technique, safety rules and dimensions for the 10 standard
// NCC Obstacles in the Obstacle Training (OPT) course.

export type Obstacle = {
  num: number
  id: string
  name: string
  hindiName: string
  dimensions: {
    height?: string
    length?: string
    width?: string
    thickness?: string
  }
  description: string
  technique: string[]
  techniqueHi: string[]
  commonFaults: string[]
  safetyTip: string
  svgShape: string
}

export const standardObstacles: Obstacle[] = [
  {
    num: 1,
    id: 'straight-balance',
    name: 'Straight Balance',
    hindiName: 'सीधा संतुलन (स्ट्रेट बैलेंस)',
    dimensions: {
      height: '1.5 feet (18 inches) above ground',
      length: '12 feet long plank',
      width: '3 inches broad flat top',
    },
    description:
      'A narrow wooden plank supported on upright posts. Tests foot placement, bodily balance and calm nerves under momentum.',
    technique: [
      'Mount the plank smoothly without stuttering or stopping at the ramp.',
      'Keep eyes focused on the far end of the plank, never straight down at your boots.',
      'Arms held loosely sideways for natural gyroscopic balance.',
      'Dismount with both feet landing evenly on the ground, bending knees to absorb impact.',
    ],
    techniqueHi: [
      'तख्ते पर बिना रुके या झिझके एक तालमेल में चढ़ें।',
      'अपनी नज़र तख्ते के अंतिम छोर पर रखें, नीचे पैरों की तरफ न देखें।',
      'संतुलन बनाए रखने के लिए दोनों बाहें हल्की सी बगल में खुली रखें।',
      'उतरते समय दोनों पैरों पर एक साथ कूदें और घुटनों को हल्का मोड़कर झटका रोकें।',
    ],
    commonFaults: ['Looking down at feet causing loss of horizon balance', 'Slowing down before mounting', 'Jerky arm movements'],
    safetyTip: 'Never jump backward if slipping; step off sideways.',
    svgShape: 'M 10 70 L 30 40 L 170 40 L 190 70',
  },
  {
    num: 2,
    id: 'clear-jump',
    name: 'Clear Jump',
    hindiName: 'खुली कूद (क्लियर जंप)',
    dimensions: {
      height: '1.5 feet (18 inches) high beam',
      length: '8 to 10 feet across',
    },
    description:
      'A low horizontal bar supported on two side posts. Cadets must leap over cleanly without touching the bar.',
    technique: [
      'Take 3 to 4 paced build-up stride.',
      'Take off from dominant foot, tucking knees up towards chest.',
      'Clear the beam with at least 6 inches of clearance, arms forward.',
      'Land on balls of feet and immediately transition into the next run.',
    ],
    techniqueHi: [
      '3-4 कदम की गति से दौड़कर आएं।',
      'मजबूत पैर से जमीन को दबाकर ऊपर उछाल लें और घुटनों को सीने की तरफ मोड़ें।',
      'बिना डंडे को छुए हवा में पार करें।',
      'पंजों के बल उतरें और बिना रुके अगली बाधा की ओर बढ़ें।',
    ],
    commonFaults: ['Dragging trailing heel', 'Stuttering steps right before the jump', 'Landing flat-footed'],
    safetyTip: 'Check takeoff pit for stones or slippery mud before competition.',
    svgShape: 'M 30 70 L 30 45 L 170 45 L 170 70',
  },
  {
    num: 3,
    id: 'zigzag-balance',
    name: 'Zig-Zag Balance',
    hindiName: 'टेढ़ा-मेढ़ा संतुलन (ज़िग-ज़ैग बैलेंस)',
    dimensions: {
      height: '1.5 feet above ground',
      length: 'Total length 30 feet (three 10-foot sections joined at angles)',
      width: '3 inches width',
    },
    description:
      'Three wooden planks laid out in a zigzag pattern with sharp angular bends. Tests dynamic direction change and precision footwork.',
    technique: [
      'Enter the beam with controlled speed.',
      'At each corner, pivot on the ball of the leading foot while shifting center of gravity.',
      'Shorten stride length around turns to prevent overshooting the beam.',
      'Keep head up and arms mobile.',
    ],
    techniqueHi: [
      'संतुलित गति से ज़िग-ज़ैग पर कदम रखें।',
      'कोनों पर मुड़ते समय पंजों के बल वजन को मोड़ की दिशा में झुकाएं।',
      'मोड़ के पास कदम छोटे रखें ताकि पैर बाहर न फिसले।',
    ],
    commonFaults: ['Running too fast into turns', 'Overstepping corners causing slip-off', 'Rigid body posture'],
    safetyTip: 'Ensure pivot joints between beams have no protruding nails or splinters.',
    svgShape: 'M 10 65 L 70 30 L 130 65 L 190 30',
  },
  {
    num: 4,
    id: 'high-wall',
    name: 'High Wall (6 Feet Wall)',
    hindiName: 'ऊंची दीवार (6 फीट दीवार)',
    dimensions: {
      height: '6 feet high',
      length: '12 feet wide',
      thickness: '1 foot (brick masonry or timber)',
    },
    description:
      'The signature obstacle of the NCC course. Requires explosive vertical leap, upper-body pulling strength and agile body roll.',
    technique: [
      'Fast approach run of 15-20 metres.',
      'Place dominant foot flat at approximately 3.5 to 4 feet height on the wall surface.',
      'Drive upward powerfully with the planted leg while reaching both hands to grip the top rim.',
      'Pull chest up over the wall rim, throw one leg over the crest, and roll the body across.',
      'Drop down on the other side into the soft landing pit, flexing knees.',
    ],
    techniqueHi: [
      '15-20 मीटर दूर से तेज़ गति से दौड़कर आएं।',
      'मजबूत पैर को दीवार पर लगभग 3.5 फीट की ऊंचाई पर मजबूती से टिकाएं।',
      'पैर से ऊपर की ओर उछाल लें और दोनों हाथों से दीवार के ऊपरी हिस्से को मजबूती से पकड़ें।',
      'सीने को ऊपर खींचें, एक पैर दीवार के ऊपर फेंके और शरीर को दूसरी तरफ रोल करें।',
      'दूसरी तरफ रेत के गड्ढे में दोनों पैरों पर घुटने मोड़कर सुरक्षित उतरें।',
    ],
    commonFaults: [
      'Planting foot too low on the wall',
      'Slowing down right before the wall',
      'Failing to grip the top edge firmly',
      'Landing on stiff legs',
    ],
    safetyTip: 'Landing pit must have soft loose sand at least 1 foot deep to protect ankles.',
    svgShape: 'M 30 75 L 30 20 L 170 20 L 170 75',
  },
  {
    num: 5,
    id: 'ditch-jump',
    name: 'Ditch Jump (6 Feet Ditch)',
    hindiName: 'खाई कूद (6 फीट डिच)',
    dimensions: {
      width: '6 feet open gap',
      height: '3 to 4 feet deep trench',
      length: '8 feet wide channel',
    },
    description:
      'A dry or sand-filled ditch that cadets must clear in a single bound without touching either the trench bed or edges.',
    technique: [
      'Maintain strong sprint speed until the takeoff line.',
      'Take off precisely before the edge marker to avoid foot fault.',
      'Extend leading leg forward and throw arms upward to maximize flight distance.',
      'Land on both feet beyond the far edge and sprint out.',
    ],
    techniqueHi: [
      'टेक-ऑफ रेखा तक पूरी गति से दौड़ें।',
      'खाई के किनारे से ठीक पहले एक पैर से जोरदार उछाल लें।',
      'हवा में दोनों हाथ और अगला पैर आगे की ओर खींचें।',
      'खाई के दूसरी तरफ सुरक्षित पंजों पर उतरकर आगे बढ़ें।',
    ],
    commonFaults: ['Hesitating right at the edge', 'Stepping over the takeoff line (foul)', 'Falling backward on landing'],
    safetyTip: 'Keep takeoff edge firm and clean so shoes do not slip.',
    svgShape: 'M 10 40 L 60 40 L 60 75 L 140 75 L 140 40 L 190 40',
  },
  {
    num: 6,
    id: 'right-hand-vault',
    name: 'Right Hand Vault',
    hindiName: 'दायां हाथ वॉल्ट (राइट हैंड वॉल्ट)',
    dimensions: {
      height: '3.5 feet (42 inches) high horizontal beam',
      length: '8 to 10 feet wide',
    },
    description:
      'A horizontal wooden beam where the cadet places the right hand on the beam and vaults both legs over to the right side.',
    technique: [
      'Approach at a slight angle from the left.',
      'Place open right palm firmly on top of the beam.',
      'Swing both legs together high to the right side of the beam.',
      'Push off with the right hand as hips clear the bar and land facing forward.',
    ],
    techniqueHi: [
      'बाईं दिशा से हल्के कोण पर दौड़कर आएं।',
      'दाएं हाथ की हथेली बीम के ऊपर मजबूती से रखें।',
      'दोनों पैरों को मिलाकर बीम के दाईं ओर से ऊपर हवा में उछालें।',
      'दाएं हाथ से धक्का देकर शरीर को आगे निकालें और संतुलन के साथ उतरें।',
    ],
    commonFaults: ['Touching the beam with legs or boots', 'Weak hand push causing hip strike'],
    safetyTip: 'Ensure wrists are properly warmed up.',
    svgShape: 'M 20 70 L 20 35 L 180 35 L 180 70',
  },
  {
    num: 7,
    id: 'left-hand-vault',
    name: 'Left Hand Vault',
    hindiName: 'बायां हाथ वॉल्ट (लेफ्ट हैंड वॉल्ट)',
    dimensions: {
      height: '3.5 feet (42 inches) high horizontal beam',
      length: '8 to 10 feet wide',
    },
    description:
      'Identical in height to the right vault, but taken with the left hand on the beam and legs clearing over the left side.',
    technique: [
      'Approach at a slight angle from the right.',
      'Place open left palm firmly on top of the beam.',
      'Kick both legs together high over to the left side.',
      'Push body cleanly across and continue forward stride.',
    ],
    techniqueHi: [
      'दाईं ओर से हल्के कोण पर आएं और बायां हाथ बीम पर रखें।',
      'दोनों पैरों को मिलाकर बाईं तरफ से ऊपर उछालें।',
      'बाएं हाथ के सहारे शरीर को पार कर आगे बढ़ें।',
    ],
    commonFaults: ['Hesitation for non-dominant left side', 'Feet splitting apart in mid-air'],
    safetyTip: 'Cadets must practise left-hand grip strength equally.',
    svgShape: 'M 20 70 L 20 35 L 180 35 L 180 70',
  },
  {
    num: 8,
    id: 'gate-vault',
    name: 'Gate Vault',
    hindiName: 'गेट वॉल्ट (दोहरी बीम)',
    dimensions: {
      height: 'Top beam 5 feet, Lower beam 3 feet',
      length: '8 to 10 feet wide frame',
    },
    description:
      'Two horizontal wooden beams arranged like a gate. Cadets step on the lower beam and leap or vault over the upper beam.',
    technique: [
      'Jump and place one foot on the lower 3-foot beam while gripping the top 5-foot beam with both hands.',
      'Straighten the lower leg forcefully to pop the upper body over the top beam.',
      'Roll hips over the upper beam, release hands, and land on both feet.',
    ],
    techniqueHi: [
      'निचले 3 फीट वाले डंडे पर एक पैर रखें और दोनों हाथों से ऊपर वाले 5 फीट डंडे को पकड़ें।',
      'निचले पैर से जोरदार झटका देकर शरीर को ऊपर वाले डंडे के पार निकालें।',
      'हिप्स को ऊपर वाले डंडे के ऊपर रोल करते हुए दूसरी तरफ कूदें।',
    ],
    commonFaults: ['Slipping off the lower wet beam', 'Hitting belly on top beam', 'Poor grip'],
    safetyTip: 'Always check that the lower bar is dry and free of mud.',
    svgShape: 'M 30 75 L 30 15 L 170 15 L 170 75 M 30 45 L 170 45',
  },
  {
    num: 9,
    id: 'ramp-and-jump',
    name: 'Ramp and High Jump',
    hindiName: 'रैंप और ऊंची कूद (रैंप जंप)',
    dimensions: {
      height: 'Ramp rises to 4.5 feet, leading to a 15-foot flat runway and high jump platform',
      length: 'Total structure 25 feet',
    },
    description:
      'An inclined wooden ramp leading to an elevated horizontal platform. Cadets sprint up the ramp and leap down into the sand pit.',
    technique: [
      'Sprint up the inclined ramp with short, rhythmic strides.',
      'Maintain forward momentum across the platform.',
      'At the edge, launch forward and downward into the landing pit.',
      'Absorb landing impact by bending knees and rolling forward if required.',
    ],
    techniqueHi: [
      'रैंप की ढलान पर छोटे और तेज़ कदमों से दौड़कर ऊपर चढ़ें।',
      'ऊपरी समतल तख्ते पर बिना रुके गति बनाए रखें।',
      'अंतिम छोर से आगे की तरफ ऊंची छलांग लगाएं।',
      'रेत में दोनों पंजों पर उतरें और घुटने मोड़कर झटका सहन करें।',
    ],
    commonFaults: ['Stopping at the top of the ramp out of height fear', 'Landing flat on heels causing spine shock'],
    safetyTip: 'Bend knees deeply upon landing; do not land stiff-legged.',
    svgShape: 'M 10 75 L 70 30 L 140 30 L 140 75',
  },
  {
    num: 10,
    id: 'tarzan-swing',
    name: 'Tarzan Swing / Clear Jump II',
    hindiName: 'टार्ज़न स्विंग / क्लियर जंप-II',
    dimensions: {
      height: 'Rope hung from 15-foot crossbeam over 8-foot ditch',
    },
    description:
      'Cadet grabs the suspended manila rope, leaps from a wooden takeoff block, swings across the gap, and dismounts cleanly beyond the marker.',
    technique: [
      'Grip the rope high with hands close together, dominant hand above.',
      'Kick off with full body weight commitment into the swing arc.',
      'Release grip at the highest point of forward swing and land on the far platform.',
    ],
    techniqueHi: [
      'रस्सी को दोनों हाथों से मजबूती से ऊपर पकड़ें।',
      'प्लेटफॉर्म से पूरे शरीर के साथ आगे की ओर झूलें।',
      'जब झूला सबसे आगे पहुंचे, तब दोनों हाथ छोड़कर सुरक्षित प्लेटफॉर्म पर उतरें।',
    ],
    commonFaults: ['Letting go too early or too late', 'Weak grip causing rope burn'],
    safetyTip: 'Use chalk or dry palms before gripping the rope to prevent slipping.',
    svgShape: 'M 100 10 L 100 50 M 85 50 A 15 15 0 1 0 115 50 Z M 20 75 L 60 75 M 140 75 L 180 75',
  },
]
