// Solved subjective, descriptive, fill in the blanks, true/false and short/long
// questions for NCC Certificates A, B and C examinations in bilingual (Hindi/English).

export type FillInBlank = {
  id: string
  subject: string
  cert: 'A' | 'B' | 'C' | 'All'
  sentenceEn: string
  sentenceHi: string
  answer: string
  answerHi: string
}

export type TrueFalse = {
  id: string
  subject: string
  cert: 'A' | 'B' | 'C' | 'All'
  statementEn: string
  statementHi: string
  isTrue: boolean
  explanation: string
}

export type MilitaryAbbr = {
  abbr: string
  fullForm: string
  hindiMean: string
  category: 'Rank' | 'Appointment' | 'Weapon' | 'Camp' | 'Service'
}

export type ShortQuestion = {
  id: string
  subject: string
  marks: 5
  cert: 'A' | 'B' | 'C' | 'All'
  questionEn: string
  questionHi: string
  answerPointsEn: string[]
  answerPointsHi: string[]
}

export type LongQuestion = {
  id: string
  subject: string
  marks: 10
  cert: 'B' | 'C'
  questionEn: string
  questionHi: string
  sections: { headingEn: string; headingHi: string; bodyEn: string; bodyHi: string }[]
}

export const fillInBlanks: FillInBlank[] = [
  {
    id: 'fib-1',
    subject: 'NCC',
    cert: 'All',
    sentenceEn: 'The motto of NCC is _________.',
    sentenceHi: 'एनसीसी का आदर्श वाक्य (Motto) _________ है।',
    answer: 'Unity and Discipline',
    answerHi: 'एकता और अनुशासन',
  },
  {
    id: 'fib-2',
    subject: 'NCC',
    cert: 'All',
    sentenceEn: 'NCC was formally established on _________ under the NCC Act 1948.',
    sentenceHi: 'एनसीसी की स्थापना वर्ष 1948 में _________ को हुई थी।',
    answer: '16 April 1948 (raised 15 July 1948)',
    answerHi: '16 अप्रैल 1948',
  },
  {
    id: 'fib-3',
    subject: 'Drill',
    cert: 'All',
    sentenceEn: 'In Tez Chal (Quick March), the number of paces taken in one minute is _________.',
    sentenceHi: 'तेज़ चल में एक मिनट में कदमों की संख्या _________ होती है।',
    answer: '120 paces (110 for SW girls)',
    answerHi: '120 कदम (गर्ल्स कैडेट के लिए 110)',
  },
  {
    id: 'fib-4',
    subject: 'Drill',
    cert: 'All',
    sentenceEn: 'The distance between heels in Savdhan position is _________ inches and angle is _________ degrees.',
    sentenceHi: 'सावधान स्थिति में दोनों एड़ियों के बीच की दूरी _________ इंच और कोण _________ डिग्री होता है।',
    answer: '0 inches, 30 degrees',
    answerHi: '0 इंच और 30 डिग्री',
  },
  {
    id: 'fib-5',
    subject: 'Drill',
    cert: 'All',
    sentenceEn: 'In Vishram position, the distance between both feet (heels to heels) is _________ inches.',
    sentenceHi: 'विश्राम की स्थिति में दोनों पैरों की एड़ियों के बीच _________ इंच का फासला होता है।',
    answer: '12 inches',
    answerHi: '12 इंच',
  },
  {
    id: 'fib-6',
    subject: 'Weapon Training',
    cert: 'All',
    sentenceEn: 'The effective range of .22 Deluxe Rifle is _________ yards.',
    sentenceHi: '.22 डीलक्स राइफल की प्रभावी रेंज (कारगर रेंज) _________ गज होती है।',
    answer: '25 yards',
    answerHi: '25 गज',
  },
  {
    id: 'fib-7',
    subject: 'Weapon Training',
    cert: 'All',
    sentenceEn: 'The weight of .22 Deluxe Rifle is _________.',
    sentenceHi: '.22 डीलक्स राइफल का कुल वजन _________ होता है।',
    answer: '6 lbs 2 oz (2.78 kg)',
    answerHi: '6 पौंड 2 औंस (2.78 किग्रा)',
  },
  {
    id: 'fib-8',
    subject: 'Weapon Training',
    cert: 'B',
    sentenceEn: 'The magazine capacity of 7.62 mm SLR is _________ rounds.',
    sentenceHi: '7.62 मिमी एसएलआर की मैगज़ीन क्षमता _________ राउंड होती है।',
    answer: '20 rounds',
    answerHi: '20 राउंड',
  },
  {
    id: 'fib-9',
    subject: 'Weapon Training',
    cert: 'B',
    sentenceEn: 'The effective range of 7.62 mm SLR is _________ yards.',
    sentenceHi: '7.62 मिमी एसएलआर की कारगर रेंज _________ गज होती है।',
    answer: '300 yards (275 metres)',
    answerHi: '300 गज (275 मीटर)',
  },
  {
    id: 'fib-10',
    subject: 'Map Reading',
    cert: 'All',
    sentenceEn: 'A full circle in a prismatic compass is divided into _________ degrees.',
    sentenceHi: 'प्रिज्माटिक कम्पास में पूरा डायल _________ डिग्री में बंटा होता है।',
    answer: '360 degrees',
    answerHi: '360 डिग्री',
  },
  {
    id: 'fib-11',
    subject: 'Map Reading',
    cert: 'All',
    sentenceEn: 'Service Protractor Mark IV is _________ inches long and _________ inches wide.',
    sentenceHi: 'सर्विस प्रोटेक्टर मार्क-IV की लम्बाई _________ इंच और चौड़ाई _________ इंच होती है।',
    answer: '6 inches long, 2 inches wide',
    answerHi: '6 इंच लम्बा, 2 इंच चौड़ा',
  },
  {
    id: 'fib-12',
    subject: 'Map Reading',
    cert: 'B',
    sentenceEn: 'Vertical lines on a survey map running from south to north are called _________ lines.',
    sentenceHi: 'मानचित्र पर दक्षिण से उत्तर की ओर जाने वाली खड़ी रेखाओं को _________ रेखाएं कहते हैं।',
    answer: 'Easting lines (संख्या पूर्व की ओर बढ़ती है)',
    answerHi: 'ईस्टिंग (Easting) रेखाएं',
  },
  {
    id: 'fib-13',
    subject: 'Leadership',
    cert: 'All',
    sentenceEn: 'Leadership has _________ recognized cardinal traits/principles in Indian armed forces.',
    sentenceHi: 'भारतीय सेना में नेतृत्व के प्रमुख _________ गुण (OLQs/Traits) माने जाते हैं।',
    answer: '15 traits (OLQs)',
    answerHi: '15 गुण (OLQs)',
  },
  {
    id: 'fib-14',
    subject: 'First Aid',
    cert: 'All',
    sentenceEn: 'The standard compression to rescue breath ratio in CPR for an adult is _________.',
    sentenceHi: 'वयस्क को सीपीआर (CPR) देते समय छाती दबाने और सांस देने का अनुपात _________ होता है।',
    answer: '30 : 2 (30 compressions, 2 breaths)',
    answerHi: '30 : 2',
  },
  {
    id: 'fib-15',
    subject: 'Armed Forces',
    cert: 'C',
    sentenceEn: 'The Supreme Commander of the Indian Armed Forces is the _________.',
    sentenceHi: 'भारतीय सशस्त्र सेनाओं के सर्वोच्च सेनापति (Supreme Commander) _________ होते हैं।',
    answer: 'President of India',
    answerHi: 'भारत के राष्ट्रपति',
  },
  {
    id: 'fib-16',
    subject: 'Armed Forces',
    cert: 'C',
    sentenceEn: 'The headquarters of Indian Army is located at _________ and commanded by _________.',
    sentenceHi: 'भारतीय थलसेना का मुख्यालय _________ में है और इसके प्रमुख _________ कहलाते हैं।',
    answer: 'New Delhi, Chief of the Army Staff (COAS)',
    answerHi: 'नई दिल्ली, थलसेनाध्यक्ष (COAS)',
  },
]

export const trueFalseStatements: TrueFalse[] = [
  {
    id: 'tf-1',
    subject: 'Drill',
    cert: 'All',
    statementEn: 'In Peeche Mur (About Turn), the cadet always turns towards the right side through 180°.',
    statementHi: 'पीछे मुड़ में कैडेट हमेशा दाईं ओर से 180 डिग्री घूमता है।',
    isTrue: true,
    explanation: 'Drill manual mandates that About Turn is always executed on the right heel and left toe through the right side.',
  },
  {
    id: 'tf-2',
    subject: 'Drill',
    cert: 'All',
    statementEn: 'Word of command can be given when the squad is on the right foot or left foot without distinction.',
    statementHi: 'वर्ड ऑफ कमान किसी भी पैर पर बिना नियम के दिया जा सकता है।',
    isTrue: false,
    explanation: 'Executive words of command are specified strictly for a particular foot (e.g. "Tham" is given on the left foot).',
  },
  {
    id: 'tf-3',
    subject: 'Weapon Training',
    cert: 'All',
    statementEn: 'Chindi size for oiling .22 Rifle barrel is 4" × 1.5".',
    statementHi: '.22 राइफल में तेल लगाने के लिए चिंदी का माप 4" × 1.5" होता है।',
    isTrue: false,
    explanation: 'Cleaning chindi is 4" × 1.5", while oiling chindi is 4" × 0.75" (आधा साइज).',
  },
  {
    id: 'tf-4',
    subject: 'Weapon Training',
    cert: 'B',
    statementEn: 'The gas regulator of 7.62 mm SLR has multiple settings to regulate gas pressure.',
    statementHi: '7.62 मिमी एसएलआर में गैस के बहाव को नियंत्रित करने के लिए गैस रेगुलेटर होता है।',
    isTrue: true,
    explanation: 'Gas regulator alters the gas escape port size, useful in cold weather or dirty conditions.',
  },
  {
    id: 'tf-5',
    subject: 'Map Reading',
    cert: 'All',
    statementEn: 'Grid North and Magnetic North always point in the exact same direction.',
    statementHi: 'ग्रिड नॉर्थ और मैग्नेटिक नॉर्थ हमेशा एक ही दिशा में होते हैं।',
    isTrue: false,
    explanation: 'There is a magnetic variation / angle between Magnetic North and Grid North which changes yearly.',
  },
  {
    id: 'tf-6',
    subject: 'Health & Hygiene',
    cert: 'All',
    statementEn: 'A tourniquet once tied on a severe limb hemorrhage should never be loosened until hospital arrival.',
    statementHi: 'टर्निकेट बांधने के बाद उसका समय नोट करना चाहिए और प्रशिक्षित निगरानी में ही हटाया जाना चाहिए।',
    isTrue: true,
    explanation: 'Tourniquet application time must always be marked on the casualty forehead or tag (T - HH:MM).',
  },
  {
    id: 'tf-7',
    subject: 'NCC',
    cert: 'C',
    statementEn: 'NCC C Certificate holder with Grade A or B can appear for SSB interview without clearing CDS written exam.',
    statementHi: 'NCC C सर्टिफिकेट ‘A’ या ‘B’ ग्रेड धारक बिना सीडीएस लिखित परीक्षा के सीधे एसएसबी इंटरव्यू में जा सकते हैं।',
    isTrue: true,
    explanation: 'NCC Special Entry Scheme grants direct SSB interview exemption from UPSC written exam for Army (OTA), Navy and Air Force.',
  },
]

export const militaryAbbreviations: MilitaryAbbr[] = [
  { abbr: 'CO', fullForm: 'Commanding Officer', hindiMean: 'कमांडिंग ऑफिसर (बटालियन प्रमुख)', category: 'Appointment' },
  { abbr: 'ANO', fullForm: 'Associate NCC Officer', hindiMean: 'एसोसिएट एनसीसी ऑफिसर (स्कूल/कॉलेज शिक्षक)', category: 'Appointment' },
  { abbr: 'PI Staff', fullForm: 'Permanent Instructional Staff', hindiMean: 'सेना से आए नियमित प्रशिक्षक (सूबेदार/हवलदार)', category: 'Appointment' },
  { abbr: 'SUO', fullForm: 'Senior Under Officer', hindiMean: 'सीनियर अंडर ऑफिसर (कैडेट्स का सर्वोच्च रैंक)', category: 'Rank' },
  { abbr: 'JUO', fullForm: 'Junior Under Officer', hindiMean: 'जूनियर अंडर ऑफिसर', category: 'Rank' },
  { abbr: 'CHM', fullForm: 'Company Havildar Major', hindiMean: 'कंपनी हवलदार मेजर', category: 'Rank' },
  { abbr: 'CQMS', fullForm: 'Company Quarter Master Sergeant', hindiMean: 'कंपनी क्वार्टर मास्टर सार्जेंट (राशन/स्टोर इंचार्ज)', category: 'Rank' },
  { abbr: 'BHM', fullForm: 'Battalion Havildar Major', hindiMean: 'बटालियन हवलदार मेजर (परेड ग्राउंड इंचार्ज)', category: 'Rank' },
  { abbr: 'RDC', fullForm: 'Republic Day Camp', hindiMean: 'गणतंत्र दिवस शिविर (नई दिल्ली)', category: 'Camp' },
  { abbr: 'TSC', fullForm: 'Thal Sainik Camp', hindiMean: 'थल सैनिक शिविर (सेना विंग प्रतियोगिता)', category: 'Camp' },
  { abbr: 'VSC', fullForm: 'Vayu Sainik Camp', hindiMean: 'वायु सैनिक शिविर (एयर विंग प्रतियोगिता)', category: 'Camp' },
  { abbr: 'NSC', fullForm: 'Nau Sainik Camp', hindiMean: 'नौ सैनिक शिविर (नेवल विंग प्रतियोगिता)', category: 'Camp' },
  { abbr: 'CATC', fullForm: 'Combined Annual Training Camp', hindiMean: 'संयुक्त वार्षिक प्रशिक्षण शिविर (10 दिन)', category: 'Camp' },
  { abbr: 'EBSB', fullForm: 'Ek Bharat Shreshtha Bharat', hindiMean: 'एक भारत श्रेष्ठ भारत सांस्कृतिक शिविर', category: 'Camp' },
  { abbr: 'YEP', fullForm: 'Youth Exchange Programme', hindiMean: 'युवा आदान-प्रदान कार्यक्रम (विदेश दौरा)', category: 'Camp' },
  { abbr: 'SLR', fullForm: 'Self Loading Rifle (7.62 mm)', hindiMean: 'सेल्फ लोडिंग राइफल', category: 'Weapon' },
  { abbr: 'INSAS', fullForm: 'Indian Small Arms System (5.56 mm)', hindiMean: 'इंडियन स्मॉल आर्म्स सिस्टम राइफल', category: 'Weapon' },
  { abbr: 'LMG', fullForm: 'Light Machine Gun (7.62 mm)', hindiMean: 'लाइट मशीन गन', category: 'Weapon' },
  { abbr: 'MPI', fullForm: 'Mean Point of Impact', hindiMean: 'औसत प्रभाव बिंदु (फायर किए गए शॉट्स का केंद्र)', category: 'Weapon' },
  { abbr: 'GPS', fullForm: 'Global Positioning System', hindiMean: 'ग्लोबल पोजिशनिंग सिस्टम', category: 'Service' },
  { abbr: 'FC & BC', fullForm: 'Field Craft and Battle Craft', hindiMean: 'फील्ड क्राफ्ट और बैटल क्राफ्ट (युद्ध कौशल)', category: 'Service' },
  { abbr: 'SSB', fullForm: 'Services Selection Board', hindiMean: 'सर्विस सेलेक्शन बोर्ड (अधिकारी चयन बोर्ड)', category: 'Service' },
  { abbr: 'OLQ', fullForm: 'Officer Like Qualities', hindiMean: 'अधिकारी जैसे गुण (कुल 15 गुण)', category: 'Service' },
  { abbr: 'IMA', fullForm: 'Indian Military Academy (Dehradun)', hindiMean: 'भारतीय सैन्य अकादमी, देहरादून', category: 'Service' },
  { abbr: 'OTA', fullForm: 'Officers Training Academy (Chennai / Gaya)', hindiMean: 'अधिकारी प्रशिक्षण अकादमी, चेन्नई', category: 'Service' },
  { abbr: 'NDA', fullForm: 'National Defence Academy (Khadakwasla)', hindiMean: 'राष्ट्रीय रक्षा अकादमी, खड़कवासला', category: 'Service' },
]

export const shortQuestions: ShortQuestion[] = [
  {
    id: 'sq-1',
    subject: 'Drill',
    marks: 5,
    cert: 'All',
    questionEn: 'State the three cardinal principles/aims of Drill.',
    questionHi: 'ड्रिल के तीन बुनियादी सिद्धांत (उद्देश्य) लिखो।',
    answerPointsEn: [
      'Discipline: Inculcates unquestioned discipline and instant obedience to orders.',
      'Teamwork (Esprit de Corps): Creates unity of action and comradeship among cadets.',
      'Smartness & Bearing: Develops smart body posture, self-confidence, and proud turnout.',
    ],
    answerPointsHi: [
      'अनुशासन (Discipline): कैडेट्स में आज्ञाकारिता और अटूट अनुशासन की भावना पैदा करना।',
      'तालमेल (Teamwork): एक साथ मिलकर काम करने और भाईचारे की भावना जगाना।',
      'स्मार्टनेस और आत्मसम्मान (Smart Turnout): कैडेट के चाल-चलन और पहनावे में फुर्ती और गरिमा लाना।',
    ],
  },
  {
    id: 'sq-2',
    subject: 'Drill',
    marks: 5,
    cert: 'All',
    questionEn: 'What are the two parts of a Word of Command? Explain with an example.',
    questionHi: 'वर्ड ऑफ कमान (शब्दे-कमान) के दो भाग कौन से होते हैं? उदाहरण सहित समझाओ।',
    answerPointsEn: [
      '1. Cautionary Word (चेतावनी): Alerts the squad and directs attention (e.g. "परेड..." or "स्क्वाड..."). Spoken in a drawn-out, high pitch.',
      '2. Executive Word (कार्यकारी): Directs immediate physical movement (e.g. "...सावधान!" or "...थम!"). Spoken sharp, short, and loud.',
      'Example: In "परेड सावधान", "परेड" is cautionary and "सावधान" is executive.',
    ],
    answerPointsHi: [
      '1. चेतावनी (Cautionary Word): यह दस्ते को सचेत करता है कि क्या कार्यवाही करनी है (उदा. "परेड..." या "प्लाटून...")। इसे लम्बा खींचकर बोला जाता है।',
      '2. कार्यकारी (Executive Word): यह वह शब्द है जिस पर तुरंत हरकत (एक्शन) की जाती है (उदा. "...सावधान!" या "...थम!")। इसे तेज़ और तीखा बोला जाता है।',
      'उदाहरण: "परेड सावधान" में "परेड" चेतावनी है और "सावधान" कार्यकारी शब्द है।',
    ],
  },
  {
    id: 'sq-3',
    subject: 'Weapon Training',
    marks: 5,
    cert: 'All',
    questionEn: 'Name any five items included in the cleaning kit of .22 Rifle.',
    questionHi: '.22 राइफल की सफ़ाई के सामान (Cleaning Kit) के पांच मुख्य अंगों के नाम लिखो।',
    answerPointsEn: [
      'Pullthrough with cord and brass weight.',
      'Cleaning Chindi (size 4" × 1.5").',
      'Oiling Chindi (size 4" × 0.75").',
      'Wire gauze (2.5" × 1.5") for removing lead fouling.',
      'Oil bottle and cleaning brush.',
    ],
    answerPointsHi: [
      'पुलथ्रू (Pullthrough) — रस्सी और वजनदार पीतल की गोली सहित।',
      'सफ़ाई की चिंदी — माप 4" × 1.5" इंच।',
      'तेल लगाने की चिंदी — माप 4" × 0.75" इंच।',
      'वायर गॉज़ (तार की जाली) — माप 2.5" × 1.5" (सीसा/कार्बन छुड़ाने के लिए)।',
      'ऑयल बॉटल (तेल की कुप्पी) और चैम्बर क्लीनिंग ब्रश।',
    ],
  },
  {
    id: 'sq-4',
    subject: 'Map Reading',
    marks: 5,
    cert: 'B',
    questionEn: 'What is a 6-figure grid reference? How is it calculated?',
    questionHi: 'सिक्स फिगर ग्रिड रेफरेंस (6-Figure Grid Reference) क्या है? इसे कैसे निकाला जाता है?',
    answerPointsEn: [
      'Grid lines divide maps into 1 km × 1 km squares bounded by Eastings and Northings.',
      'First 3 figures represent Easting (2-digit line number + 1-tenth estimate from West to East).',
      'Next 3 figures represent Northing (2-digit line number + 1-tenth estimate from South to North).',
      'Rule to remember: "Read Easting first, then Northing" (In along the corridor, up the stairs).',
    ],
    answerPointsHi: [
      'मानचित्र पर 1 किमी × 1 किमी के चौकोर खानों को ग्रिड कहते हैं। 6-फिगर संदर्भ 100 मीटर की सटीक स्थिति बताता है।',
      'पहले 3 अंक ईस्टिंग (Easting) के होते हैं (2 अंक रेखा संख्या + रेखा से दाईं ओर दसवां हिस्सा)।',
      'अंतिम 3 अंक नॉर्थिंग (Northing) के होते हैं (2 अंक रेखा संख्या + रेखा से ऊपर दसवां हिस्सा)।',
      'याद रखने का नियम: पहले ईस्टिंग पढ़ो, फिर नॉर्थिंग (पहले दालान में जाओ, फिर सीढ़ी चढ़ो)।',
    ],
  },
  {
    id: 'sq-5',
    subject: 'Field Craft',
    marks: 5,
    cert: 'B',
    questionEn: 'Name any five methods of judging distance in Field Craft.',
    questionHi: 'दूरी का अनुमान लगाने (Judging Distance) की कोई पांच विधियां लिखो।',
    answerPointsEn: [
      'Unit of Measure Method (इकाई का तरीका - 100 yards football pitch yardstick).',
      'Appearance Method (दिखाई का तरीका - visibility of facial features, equipment at 100, 200, 300 yds).',
      'Section Average Method (सेक्शन का औसत तरीका).',
      'Key Range Method (की रेंज तरीका - known distance to a prominent object).',
      'Bracketing Method (ब्रैकेटिंग तरीका - maximum & minimum bracket divided by 2).',
    ],
    answerPointsHi: [
      'इकाई का तरीका (Unit of measure method — 100 गज की ज्ञात दूरी से तुलना)।',
      'दिखाई का तरीका (Appearance method — व्यक्ति के कपड़े और चेहरे के अंगों की स्पष्टता से)।',
      'सेक्शन औसत तरीका (Section average method — सेक्शन के सभी जवानों के अनुमान का औसत)।',
      'की-रेंज तरीका (Key range method — पास की किसी पहचानी हुई जगह की दूरी के आधार पर)।',
      'ब्रैकेटिंग तरीका (Bracketing method — अधिकतम और न्यूनतम दूरी का आधा निकालना)।',
    ],
  },
  {
    id: 'sq-6',
    subject: 'Leadership',
    marks: 5,
    cert: 'All',
    questionEn: 'List any 10 Officer Like Qualities (OLQs) essential for an NCC cadet.',
    questionHi: 'एक एनसीसी कैडेट के लिए आवश्यक किन्हीं 10 नेतृत्व गुणों (OLQs) के नाम लिखो।',
    answerPointsEn: [
      'Effective Intelligence (प्रभावी बुद्धिमत्ता)',
      'Sense of Responsibility (जिम्मेदारी की भावना)',
      'Organizing Ability (आयोजन क्षमता)',
      'Initiative (पहल करने की क्षमता)',
      'Self Confidence (आत्मविश्वास)',
      'Speed of Decision (निर्णय लेने की गति)',
      'Ability to Influence the Group (समूह को प्रभावित करने की क्षमता)',
      'Liveliness (जिंदादिली)',
      'Courage & Determination (साहस और दृढ़ संकल्प)',
      'Stamina & Physical Endurance (सहनशक्ति और शारीरिक क्षमता)',
    ],
    answerPointsHi: [
      'प्रभावी बुद्धिमत्ता (Effective Intelligence)',
      'जिम्मेदारी की भावना (Sense of Responsibility)',
      'आयोजन क्षमता (Organizing Ability)',
      'पहल करना (Initiative)',
      'आत्मविश्वास (Self Confidence)',
      'शीघ्र निर्णय लेने की क्षमता (Speed of Decision)',
      'समूह को प्रभावित करना (Ability to Influence the Group)',
      'जिंदादिली (Liveliness)',
      'साहस और सहनशीलता (Courage & Stamina)',
      'सच्चाई और निष्ठा (Integrity & Loyalty)',
    ],
  },
]

export const longQuestions: LongQuestion[] = [
  {
    id: 'lq-1',
    subject: 'National Integration',
    marks: 10,
    cert: 'B',
    questionEn: 'What is National Integration? What are the main obstacles and how does NCC promote it?',
    questionHi: 'राष्ट्रीय एकता क्या है? इसमें आने वाली प्रमुख बाधाएं क्या हैं और एनसीसी इसे कैसे बढ़ावा देती है?',
    sections: [
      {
        headingEn: 'Definition of National Integration',
        headingHi: 'राष्ट्रीय एकता की परिभाषा',
        bodyEn:
          'National integration is the psychological and emotional bond that unites all citizens irrespective of religion, caste, language, creed, or geographical region, fostering a sense of shared nationhood and loyalty to the Constitution of India.',
        bodyHi:
          'राष्ट्रीय एकता का अर्थ है देश के सभी नागरिकों में धर्म, जाति, भाषा, संप्रदाय और क्षेत्र के भेदभाव से ऊपर उठकर एक राष्ट्र के प्रति समर्पण, आपसी प्रेम और भाईचारे की भावनात्मक भावना का होना।',
      },
      {
        headingEn: 'Main Obstacles / Threats to National Integration',
        headingHi: 'राष्ट्रीय एकता में प्रमुख बाधाएं',
        bodyEn:
          '1. Communalism (सांप्रदायिकता)\n2. Casteism (जातिवाद)\n3. Regionalism & Linguism (क्षेत्रवाद और भाषावाद)\n4. Economic disparity & Unemployment\n5. Extremism and social media misinformation.',
        bodyHi:
          '1. सांप्रदायिकता (धर्म के नाम पर भेदभाव)\n2. जातिवाद (उच्च-नीच की भावना)\n3. क्षेत्रवाद और भाषावाद (अपने राज्य या भाषा को श्रेष्ठ मानना)\n4. आर्थिक असमानता और अशिक्षा\n5. भड़काऊ सोशल मीडिया दुष्प्रचार और संकीर्ण सोच।',
      },
      {
        headingEn: 'Role of NCC in Fostering Integration',
        headingHi: 'राष्ट्रीय एकता में एनसीसी का योगदान',
        bodyEn:
          '• National Camps (NIC, SNIC, EBSB, RDC) where cadets from North, South, East, and West live, eat, drill and celebrate together.\n• Common Uniform and Oath creating absolute equality.\n• Cultural exchange programmes and disaster relief services across state borders.',
        bodyHi:
          '• राष्ट्रीय स्तर के शिविर जैसे RDC, NIC और EBSB, जहां कश्मीर से कन्याकुमारी तक के कैडेट्स एक साथ एक मेस में खाते हैं, एक ही तंबू में रहते हैं और परेड करते हैं।\n• समान वर्दी और आदर्श वाक्य "एकता और अनुशासन" जो जाति और धर्म का भेद समाप्त करता है।\n• राष्ट्रीय आपदाओं में बिना किसी भेदभाव के मानवता की सेवा करना।',
      },
    ],
  },
  {
    id: 'lq-2',
    subject: 'Field Craft & Battle Craft',
    marks: 10,
    cert: 'C',
    questionEn: 'Describe the six basic section formations in Field Craft. Explain with uses and diagrams.',
    questionHi: 'फील्ड क्राफ्ट में सेक्शन के छह बुनियादी फॉर्मेशन (Section Formations) कौन से हैं? इनके उपयोग लिखो।',
    sections: [
      {
        headingEn: 'The Six Standard Section Formations',
        headingHi: 'सेक्शन के 6 बुनियादी फॉर्मेशन',
        bodyEn:
          '1. Single File (सिंगल फाइल): Used in thick jungles, narrow mountain tracks or dark night.\n2. File Formation (फाइल फॉर्मेशन): Open tracks or roads with hedge on both sides.\n3. Arrowhead Formation (एरोहैड फॉर्मेशन): Standard formation when crossing open ground, provides good all-round firepower.\n4. Spearhead Formation (स्पीयरहैड फॉर्मेशन): Used when enemy is strictly ahead in front.\n5. Diamond Formation (डायमंड फॉर्मेशन): Open ground with threat from flanks and rear.\n6. Extended Line (एक्सटेंडेड लाइन): The final assault formation when charging enemy positions.',
        bodyHi:
          '1. सिंगल फाइल (Single File): घने जंगलों, संकरी पगडंडियों और रात के अंधेरे में एक के पीछे एक चलना।\n2. फाइल फॉर्मेशन (File Formation): सड़क के दोनों किनारों पर दो कतारों में चलना।\n3. तीर का मुंह / एरोहैड (Arrowhead): खुले मैदान में आगे बढ़ते समय सबसे उपयुक्त, सामने और दोनों तरफ तुरंत फायर देने में सक्षम।\n4. बरछी का मुंह / स्पीयरहैड (Spearhead): जब दुश्मन का खतरा केवल सीधे सामने से हो।\n5. डायमंड फॉर्मेशन (Diamond): खुले इलाके में जब चारों दिशाओं से हमले की आशंका हो।\n6. फैली हुई लाइन / एक्सटेंडेड लाइन (Extended Line): दुश्मन के बंकर पर अंतिम हमला (Assault) बोलते समय सभी जवान एक सीधी पंक्ति में फैल जाते हैं।',
      },
    ],
  },
]
