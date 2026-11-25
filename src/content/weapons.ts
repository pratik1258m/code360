// Detailed technical data, stripping sequences, stoppages and firing fundamentals
// for weapons used in NCC training: .22 Deluxe Rifle, 7.62mm SLR and 5.56mm INSAS.

export type WeaponSpec = {
  id: string
  name: string
  hindiName: string
  calibre: string
  length: string
  weight: string
  magCapacity: string
  muzzleVelocity: string
  effectiveRange: string
  maxRange: string
  rateOfFire: {
    normal: string
    rapid: string
    burst?: string
  }
  grooves: string
  systemOfOperation: string
  ammunition: string
  keyParts: string[]
  cleaningKit: string[]
  strippingSteps: { step: number; title: string; hindi: string; note: string }[]
  stoppages: { cause: string; hindiCause: string; reason: string; remedy: string }[]
  examPoints: string[]
}

export const nccWeapons: WeaponSpec[] = [
  {
    id: 'point22-deluxe',
    name: '.22 Deluxe Rifle (No. II Mk IV / Deluxe)',
    hindiName: '.22 डीलक्स / मार्क-IV राइफल',
    calibre: '.22 inch (5.56 mm)',
    length: '43 inches (110 cm) [Deluxe] / 45 inches [Mark IV]',
    weight: '6 lbs 2 oz (2.78 kg) [Deluxe] / 8 lbs 10.5 oz (3.93 kg) [Mk IV]',
    magCapacity: '5 rounds [Deluxe] / 10 rounds or single shot [Mk IV]',
    muzzleVelocity: '2700 fps (High Velocity) / 1030 fps (Standard velocity)',
    effectiveRange: '25 yards (22.8 m)',
    maxRange: '1700 yards (at 33° elevation)',
    rateOfFire: {
      normal: '5 rounds per minute',
      rapid: '10 to 15 rounds per minute',
    },
    grooves: '6 grooves, right-hand twist',
    systemOfOperation: 'Bolt action, manually operated, rim-fire',
    ammunition: '.22 rim-fire lead round nose (lead bullet)',
    keyParts: [
      'बट (Butt) and Butt plate',
      'ट्रिगर और ट्रिगर गार्ड (Trigger & Trigger Guard)',
      'बोल्ट और बोल्ट हैंडल (Bolt & Bolt Handle)',
      'बैरल (Barrel)',
      'फोरसाइट और बैकसाइट (Foresight & Backsight)',
      'मैगज़ीन और मैगज़ीन कैच (Magazine & Magazine Catch)',
      'सेफ़्टी कैच (Safety Catch)',
      'स्लिंग कुंदा (Sling Swivel)',
    ],
    cleaningKit: [
      'पुलथ्रू (Pullthrough) with weight & cord',
      'चिंदी (Chindi) — 4" × 1.5" for cleaning barrel, 4" × 0.75" for oiling',
      'वायर गॉज़ (Wire gauze) — 2.5" × 1.5" for removing lead fouling',
      'ऑयल बॉटल (Oil bottle)',
      'सफ़ाई का ब्रश (Cleaning brush / chamber brush)',
    ],
    strippingSteps: [
      {
        step: 1,
        title: 'Safety inspection',
        hindi: 'हथियार की सुरक्षा जांच',
        note: 'Point the muzzle in a safe direction, open the bolt, verify chamber and magazine are completely empty.',
      },
      {
        step: 2,
        title: 'Remove magazine',
        hindi: 'मैगज़ीन को अलग करना',
        note: 'Depress the magazine catch lever behind the magazine housing and withdraw the magazine downward.',
      },
      {
        step: 3,
        title: 'Remove bolt',
        hindi: 'बोल्ट निकालना',
        note: 'Rotate safety catch to fire, pull the bolt back while pressing the bolt stop / trigger backward, slide bolt completely out.',
      },
      {
        step: 4,
        title: 'Strip the bolt',
        hindi: 'बोल्ट के हिस्से अलग करना',
        note: 'Unscrew the cocking piece, take out firing pin and striker spring. (Only done under instructor supervision).',
      },
      {
        step: 5,
        title: 'Assembling sequence',
        hindi: 'जोड़ने का क्रम (रिवर्स ऑर्डर)',
        note: 'Assemble in reverse order: insert firing pin & spring into bolt, slide bolt into body, cock action, fire in safe direction, attach magazine.',
      },
    ],
    stoppages: [
      {
        cause: 'Misfire (मिसफायर)',
        hindiCause: 'कारतूस में आग न लगना',
        reason: 'Defective firing pin, weak striker spring, or dud ammunition.',
        remedy: 'Wait 5 seconds, cock the bolt, eject dud round, feed new round, re-aim and fire.',
      },
      {
        cause: 'Failure to Feed (फीड न होना)',
        hindiCause: 'चैम्बर में राउंड न जाना',
        reason: 'Magazine lips damaged, dirty chamber, or weak magazine spring.',
        remedy: 'Remove magazine, inspect round alignment, tap magazine base, reload and cock bolt firmly.',
      },
      {
        cause: 'Failure to Extract (कारतूस बाहर न निकलना)',
        hindiCause: 'खाली खोखा चैम्बर में फंसना',
        reason: 'Damaged extractor claw, dirty chamber with carbon/lead.',
        remedy: 'Open bolt, use clearing rod if needed, clean extractor claw with brush.',
      },
    ],
    examPoints: [
      '.22 Deluxe rifle ki effective range 25 gaj (yards) hoti hai.',
      'Deluxe rifle ka wazan 6 lbs 2 oz hota hai, jabki Mk IV ka 8 lbs 10.5 oz hota hai.',
      'Safaai ke liye chindi ka size 4" × 1.5" aur tel lagane ke liye 4" × 0.75" hota hai.',
      'Rifle ki katar me 6 grooves daayein taraf (right-hand twist) ghumavdaar hoti hain.',
    ],
  },
  {
    id: 'slr-762',
    name: '7.62 mm SLR (Self Loading Rifle)',
    hindiName: '7.62 मिमी एस.एल.आर (सेल्फ लोडिंग राइफल)',
    calibre: '7.62 mm',
    length: '1139.20 mm (44.85 inches)',
    weight: '4.4 kg (empty) / 5.1 kg (with filled 20-round magazine)',
    magCapacity: '20 rounds',
    muzzleVelocity: '815 m/sec (2700 ft/sec)',
    effectiveRange: '300 yards (275 metres)',
    maxRange: '1000 yards (Sight set up to 600 yds)',
    rateOfFire: {
      normal: '20 rounds per minute',
      rapid: '60 rounds per minute',
    },
    grooves: '6 grooves, right-hand twist',
    systemOfOperation: 'Gas operated, short-stroke piston, tilting breech block',
    ammunition: '7.62 mm × 51 mm NATO',
    keyParts: [
      'बैरल और फ्लैश एलिमिनेटर (Barrel with Flash Eliminator)',
      'गैस प्लग और गैस सिलेंडर (Gas Plug & Cylinder)',
      'पिस्टन और पिस्टन स्प्रिंग (Piston & Piston Spring)',
      'बॉडी कवर और ब्रीच ब्लॉक (Body Cover, Breech Block & Slide)',
      'ट्रिगर और ट्रिगर मैकेनिज्म (Trigger Mechanism & Change Lever)',
      'मैगज़ीन (Magazine 20 rounds)',
      'बट और पिस्टल ग्रिप (Butt & Pistol Grip)',
      'बैकसाइट (Aperture Backsight graduated 200–600 yds)',
    ],
    cleaningKit: [
      'पुलथ्रू (Pullthrough) & wire gauze',
      'चिंदी 4" × 2" (Cleaning) & 4" × 1.5" (Oiling)',
      'कॉम्बिनेशन टूल (Combination tool with gas regulator wrench)',
      'ऑयल बॉटल & चैम्बर क्लीनिंग स्टिक (Chamber stick)',
    ],
    strippingSteps: [
      {
        step: 1,
        title: 'Safety check',
        hindi: 'सुरक्षा जांच',
        note: 'Cock weapon, check change lever on SAFE, drop magazine, cock again and check chamber clear.',
      },
      {
        step: 2,
        title: 'Remove magazine and sling',
        hindi: 'मैगज़ीन और स्लिंग उतारना',
        note: 'Press magazine catch, rock magazine forward and remove. Detach sling swivels.',
      },
      {
        step: 3,
        title: 'Remove gas plug and piston',
        hindi: 'गैस प्लग और पिस्टन निकालना',
        note: 'Depress gas cylinder plunger, rotate gas plug 90° clockwise, withdraw gas plug and piston with spring.',
      },
      {
        step: 4,
        title: 'Open the rifle and remove body cover',
        hindi: 'राइफल खोलना और बॉडी कवर हटाना',
        note: 'Pull holding latch back, hinge upper receiver forward, slide body cover back to disengage.',
      },
      {
        step: 5,
        title: 'Remove breech block & slide',
        hindi: 'ब्रीच ब्लॉक और स्लाइड निकालना',
        note: 'Withdraw breech block carrier and breech block from rear of body; separate block from carrier.',
      },
    ],
    stoppages: [
      {
        cause: 'Failure to extract / Short recoil',
        hindiCause: 'खोखा न निकलना या शॉर्ट रिकॉइल',
        reason: 'Gas regulator setting incorrect (insufficient gas) or fouled gas port.',
        remedy: 'Adjust gas regulator by tightening one or two notches to increase gas flow.',
      },
      {
        cause: 'Failure to fire (मिसफायर)',
        hindiCause: 'राउंड पर चोट लगने पर भी फायर न होना',
        reason: 'Defective round, broken firing pin, or incomplete locking.',
        remedy: 'Cock rifle, inspect ejected round, let bolt fly forward under full spring tension.',
      },
      {
        cause: 'Double feed (दो राउंड एक साथ फंसना)',
        hindiCause: 'डबल फीडिंग',
        reason: 'Damaged magazine lips allowing two cartridges to jump up.',
        remedy: 'Remove magazine, clear jammed rounds with cocking handle, discard damaged magazine.',
      },
    ],
    examPoints: [
      '7.62 mm SLR ka khali wazan 4.4 kg aur bhari hui magazine ke sath 5.1 kg hota hai.',
      'SLR ki magazine capacity 20 rounds aur effective range 300 gaj (275 metre) hoti hai.',
      'SLR gas operation ke siddhant par kaam karti hai.',
      'SLR me teen positions change lever par hoti hain: SAFE (S) aur REPETITION (R).',
    ],
  },
  {
    id: 'insas-556',
    name: '5.56 mm INSAS Rifle',
    hindiName: '5.56 मिमी इनसास राइफल (INSAS)',
    calibre: '5.56 mm',
    length: '960 mm (Fixed Butt) / 750 mm (Folded Butt)',
    weight: '3.6 kg (empty) / 4.1 kg (with full 20-round magazine)',
    magCapacity: '20 rounds (Translucent polycarbonate magazine)',
    muzzleVelocity: '900 m/sec',
    effectiveRange: '400 metres',
    maxRange: '800 metres (sight graduated 200m & 400m)',
    rateOfFire: {
      normal: '60 rounds per minute',
      rapid: '90 rounds per minute',
      burst: 'Three Round Burst (TRB) mode available',
    },
    grooves: '6 grooves, right-hand twist',
    systemOfOperation: 'Gas operated, rotating bolt locking mechanism',
    ammunition: '5.56 mm × 45 mm SS109 / Indian calibre',
    keyParts: [
      'बैरल और मजल ब्रेक / फ्लैश हाइडर (Barrel with Muzzle Brake for grenade launch)',
      'गैस ब्लॉक और टू-पोजीशन गैस प्लग (Low/High Gas Setting)',
      'बॉडी, रिसीवर और टॉप कवर (Receiver & Top Cover with Picatinny rail options)',
      'रोटेटिंग ब्रीच बोल्ट और कैरियर (Rotating Bolt & Carrier with cocking handle)',
      'ट्रांसलूसेंट मैगज़ीन (Translucent polycarbonate magazine — shows rounds count)',
      'चेंज लीवर (Change Lever — Safe, Single, Three Round Burst - TRB)',
      'पिस्टल ग्रिप और बट (Polymer Butt with oil bottle compartment)',
      'बैकसाइट (Aperture Sight set for 200m & 400m)',
    ],
    cleaningKit: [
      'पुलथ्रू विद नायलॉन ब्रिसल ब्रश',
      'क्लीनिंग रॉड (3-piece jointed rod stored in butt)',
      'चिंदी और गन ऑयल (OX-13)',
      'गैस पोर्ट क्लीनिंग नीडल (Gas vent cleaning tool)',
    ],
    strippingSteps: [
      {
        step: 1,
        title: 'Safety check',
        hindi: 'सुरक्षा जांच',
        note: 'Point safe, press magazine catch, remove magazine, pull cocking handle back, check chamber clear, release cocking handle and press trigger.',
      },
      {
        step: 2,
        title: 'Remove top cover',
        hindi: 'कवर निकालना',
        note: 'Depress cover retainer latch at rear of body and lift receiver top cover upward and back.',
      },
      {
        step: 3,
        title: 'Remove recoil spring assembly',
        hindi: 'रिकॉइल स्प्रिंग निकालना',
        note: 'Push recoil spring guide forward slightly, lift rear end up and slide spring assembly out of bolt carrier.',
      },
      {
        step: 4,
        title: 'Remove bolt carrier & rotating bolt',
        hindi: 'बोल्ट कैरियर और बोल्ट निकालना',
        note: 'Slide bolt carrier rearward out of receiver rails. Rotate bolt head to slide bolt out of carrier.',
      },
      {
        step: 5,
        title: 'Remove gas cylinder & handguard',
        hindi: 'गैस सिलेंडर और हैंडगार्ड',
        note: 'Rotate gas plug lock to detach handguard and withdraw gas piston. Assembly in reverse order.',
      },
    ],
    stoppages: [
      {
        cause: 'Short recoil in cold or fouled conditions',
        hindiCause: 'शॉर्ट रिकॉइल या कम गैस का दबाव',
        reason: 'Gas regulator in Low position while weapon or ammunition is cold or dirty.',
        remedy: 'Switch gas regulator from Low (L) to High (H) setting with cartridge rim.',
      },
      {
        cause: 'Failure to lock',
        hindiCause: 'बोल्ट का पूरी तरह लॉक न होना',
        reason: 'Dirt, grit or excessive carbon build-up in locking recess lugs.',
        remedy: 'Open top cover, inspect and clean locking lugs, lubricate bolt carrier rails.',
      },
      {
        cause: 'Failure to extract spent casing',
        hindiCause: 'खाली केस न निकलना',
        reason: 'Broken extractor claw or worn extractor spring.',
        remedy: 'Strip bolt assembly, check extractor claw, clean claw teeth with brush.',
      },
    ],
    examPoints: [
      'INSAS rifle ki effective range 400 metre hoti hai.',
      'INSAS ki magazine transparent (polycarbonate) hoti hai jisse bache hue rounds dikhte hain.',
      'INSAS me TRB (Three Round Burst) ka vishesh feature hota hai.',
      'INSAS ka wazan bina magazine ke sirf 3.6 kg hota hai.',
    ],
  },
]

export const firingFundamentals = {
  hatRule: [
    {
      letter: 'H',
      principle: 'Holding (मजबूत पकड़)',
      detail:
        'Left hand holds the fore-end firmly, right hand grips pistol grip with index finger light on trigger, butt nestled firmly in shoulder hollow, cheek rested on comb.',
    },
    {
      letter: 'A',
      principle: 'Aiming (दुरुस्त शिस्त)',
      detail:
        'Sight Alignment (दृष्टि संरेखण): Center the foresight tip in the center of the backsight U or aperture. Sight Picture: Align the aligned sights on the bottom center of the bullseye.',
    },
    {
      letter: 'T',
      principle: 'Trigger Operation (दुरुस्त ट्रिगर ऑपरेशन)',
      detail:
        'Squeeze trigger straight backward with the first pad of index finger smoothly, without jerking. Natural respiratory pause (fire after breathing out half-breath).',
    },
  ],
  positions: [
    {
      name: 'Lying Position (लेटकर पोजीशन)',
      when: 'Most stable position, standard for NCC range classification and grouping.',
      points: [
        'Body at 30° to 45° angle to the target line.',
        'Legs splayed wide apart, heels pressed flat onto ground.',
        'Both elbows grounded, forming a solid triangle under the rifle.',
        'Rifle supported primarily by skeletal structure, not muscle tension.',
      ],
    },
    {
      name: 'Kneeling Position (घुटने के बल पोजीशन)',
      when: 'Used behind low cover, bush or wall when standing is unsafe.',
      points: [
        'Sit firmly on right heel with right toe tucked under.',
        'Left elbow rests flat on left knee (bone to flesh contact).',
        'Upper body leaned slightly forward to absorb recoil.',
      ],
    },
    {
      name: 'Standing Position (खड़े होकर पोजीशन)',
      when: 'Quick response or firing over breastworks / trenches.',
      points: [
        'Feet shoulder-width apart, weight balanced evenly on balls of feet.',
        'Left arm tucked under body or resting against ribcage.',
        'Body turned sideways to minimize silhouette.',
      ],
    },
  ],
  groupingAndZeroing: [
    {
      term: 'Grouping Capacity (ग्रुपिंग क्षमता)',
      meaning:
        '5 shots fired at 25 yards on a 1’×1’ target. The diameter of the circle containing all 5 hits defines grouping (e.g., within 2 inches circle for Marksman).',
    },
    {
      term: 'Mean Point of Impact - MPI (औसत प्रभाव बिंदु)',
      meaning:
        'The mathematical center of a group of fired shots. Used to adjust sights if MPI is off center.',
    },
    {
      term: 'Zeroing (जीरोइंग)',
      meaning:
        'Adjusting the sights so that the MPI coincides exactly with the point of aim at a given range.',
    },
  ],
  rangeSafetyRules: [
    'Treat every rifle as loaded until you have personally inspected the chamber and magazine.',
    'Never point the muzzle at anyone — keep it pointed strictly toward the firing butts or safe ground.',
    'Keep your finger off the trigger and outside the trigger guard until ordered to fire.',
    'Obey the Firing Range Officer (FRO) and Safety Officer immediately on Red Flag / whistle.',
    'On "Khali Kar / Unload", remove magazine, pull bolt back twice, inspect chamber, ease springs and stand clear.',
  ],
  rangeCommands: [
    { command: 'Target, Bhar (Load)', action: 'Insert charged magazine, verify safety catch, stay in lying position looking at target.' },
    { command: 'Ready (रेडी)', action: 'Work bolt / cocking handle forward to chamber a round; keep safety catch on until aim.' },
    { command: 'Fire (फायर)', action: 'Release safety catch, apply HAT (Hold, Aim, Trigger), fire allotted rounds calmly.' },
    { command: 'Roko / Cease Fire', action: 'Stop firing immediately, finger off trigger, apply safety catch, await FRO inspection.' },
    { command: 'Khali Kar (Unload)', action: 'Remove magazine, clear chamber, present rifle for instructor inspection before rising.' },
  ],
}
