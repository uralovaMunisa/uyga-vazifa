// Authentic-looking SVG notebook homework presets
const ALGEBRA_SAMPLE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
  <defs>
    <pattern id="gridAlg" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23e2e8f0" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="600" height="420" rx="16" fill="%23fffefb"/>
  <rect width="600" height="420" fill="url(%23gridAlg)"/>
  <line x1="70" y1="0" x2="70" y2="420" stroke="%23f87171" stroke-width="2"/>
  
  <text x="90" y="45" font-family="'Nunito', sans-serif" font-size="14" font-weight="700" fill="%23475569">ALGEBRA VA MATEMATIKA  •  10-SINF / DTM TAYYORGARLIK</text>
  <line x1="90" y1="55" x2="550" y2="55" stroke="%23cbd5e1" stroke-width="1.5"/>

  <!-- Question Box -->
  <rect x="90" y="75" width="460" height="45" rx="8" fill="%23ede9fe" stroke="%238b5cf6" stroke-width="1.5"/>
  <text x="105" y="103" font-family="'Fredoka', sans-serif" font-size="18" font-weight="700" fill="%235b21b6">Mavzu: Kvadrat tenglamani yechish 🧮📐</text>

  <text x="95" y="150" font-family="'Nunito', cursive, sans-serif" font-size="17" fill="%231e293b" font-weight="700">Tenglama:  2x² - 8x + 6 = 0</text>
  <text x="95" y="180" font-family="'Nunito', sans-serif" font-size="15" fill="%230369a1" font-weight="600">a) Keltirilgan koeffitsiyentlarni aniqlang: a=?, b=?, c=?</text>
  <text x="95" y="210" font-family="'Nunito', sans-serif" font-size="15" fill="%230369a1" font-weight="600">b) Diskriminant (D = b² - 4ac) ni hisoblang</text>
  <text x="95" y="240" font-family="'Nunito', sans-serif" font-size="15" fill="%230369a1" font-weight="600">c) Tenglamaning x1 va x2 ildizlarini toping</text>

  <!-- Formula Card -->
  <rect x="95" y="270" width="455" height="115" rx="10" fill="%23f8fafc" stroke="%23cbd5e1"/>
  <text x="110" y="295" font-family="'Fredoka', sans-serif" font-size="14" font-weight="700" fill="%23334155">Eslatma formulalar:</text>
  <text x="110" y="325" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="%237c3aed">D = b² - 4ac</text>
  <text x="110" y="355" font-family="'Courier New', monospace" font-size="15" font-weight="bold" fill="%23059669">x1,2 = (-b ± √D) / (2a)</text>
  <text x="320" y="340" font-family="'Nunito', sans-serif" font-size="13" font-weight="600" fill="%23d97706">D > 0 bo‘lsa, 2 ta haqiqiy ildiz bor!</text>
</svg>`;

const MATH_SAMPLE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="%23e2e8f0" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="600" height="420" rx="16" fill="%23fffefb"/>
  <rect width="600" height="420" fill="url(%23grid)"/>
  <line x1="70" y1="0" x2="70" y2="420" stroke="%23fca5a5" stroke-width="2"/>
  
  <text x="90" y="45" font-family="'Nunito', sans-serif" font-size="14" font-weight="700" fill="%2364748b">ISMI: Azizbek  •  SINF: 4-sinf  •  SANA: Bugun</text>
  <line x1="90" y1="55" x2="550" y2="55" stroke="%23cbd5e1" stroke-width="1.5"/>

  <rect x="90" y="80" width="460" height="40" rx="8" fill="%23fef3c7" stroke="%23f59e0b" stroke-width="1.5"/>
  <text x="105" y="105" font-family="'Fredoka', sans-serif" font-size="18" font-weight="700" fill="%23b45309">4-Mashq: Pitsa bo‘laklari va Kasrlar 🍕</text>

  <text x="95" y="150" font-family="'Nunito', cursive, sans-serif" font-size="16" fill="%231e293b" font-weight="600">Aziz tushlikda 1 ta katta pitsaning 2/6 qismini yedi.</text>
  <text x="95" y="180" font-family="'Nunito', cursive, sans-serif" font-size="16" fill="%231e293b" font-weight="600">Malika juda och edi va xuddi shu pitsaning 3/6 qismini yedi.</text>
  <text x="95" y="215" font-family="'Nunito', cursive, sans-serif" font-size="16" fill="%230369a1" font-weight="700">a) Ular birgalikda pitsaning qancha qismini yeyishdi?</text>
  <text x="95" y="245" font-family="'Nunito', cursive, sans-serif" font-size="16" fill="%230369a1" font-weight="700">b) It Bobik uchun qutida pitsaning qancha qismi qoldi?</text>

  <g transform="translate(420, 290)">
    <circle cx="0" cy="0" r="65" fill="%23fed7aa" stroke="%23ea580c" stroke-width="3"/>
    <line x1="0" y1="-65" x2="0" y2="65" stroke="%23c2410c" stroke-width="2"/>
    <line x1="-56" y1="-32" x2="56" y2="32" stroke="%23c2410c" stroke-width="2"/>
    <line x1="-56" y1="32" x2="56" y2="-32" stroke="%23c2410c" stroke-width="2"/>
    <circle cx="-25" cy="-20" r="7" fill="%23dc2626"/>
    <circle cx="20" cy="-28" r="7" fill="%23dc2626"/>
    <circle cx="32" cy="15" r="7" fill="%23dc2626"/>
    <circle cx="-15" cy="35" r="7" fill="%23dc2626"/>
    <circle cx="5" cy="5" r="7" fill="%23dc2626"/>
    <text x="-45" y="85" font-family="'Nunito', sans-serif" font-size="12" fill="%237c2d12" font-weight="700">6 ta Teng Bo‘lak!</text>
  </g>

  <text x="95" y="295" font-family="'Fredoka', cursive, sans-serif" font-size="18" fill="%2364748b">Qoralama:</text>
  <rect x="95" y="310" width="220" height="70" rx="8" fill="%23f1f5f9" stroke="%23cbd5e1" stroke-dasharray="4 4"/>
  <text x="110" y="340" font-family="'Fredoka', cursive, sans-serif" font-size="20" fill="%230f172a">2/6 + 3/6 = ?</text>
  <text x="110" y="365" font-family="'Fredoka', cursive, sans-serif" font-size="16" fill="%2364748b">Qolgani: 1 - (?) = ?</text>
</svg>`;

const SCIENCE_SAMPLE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="%23f0fdf4"/>
      <stop offset="100%" stop-color="%23ffffff"/>
    </linearGradient>
  </defs>
  <rect width="600" height="420" rx="16" fill="url(%23skyGrad)" stroke="%2386efac" stroke-width="2"/>
  
  <text x="40" y="45" font-family="'Fredoka', sans-serif" font-size="22" font-weight="700" fill="%23065f46">Biologiya & Tabiat: Fotosintez qanday sodir bo‘ladi? 🌿☀️</text>
  <text x="40" y="75" font-family="'Nunito', sans-serif" font-size="14" fill="%23047857" font-weight="600">3-Mavzu: Tirik organizmlar va O‘simliklar • 5-sinf / 8-sinf</text>
  <line x1="40" y1="85" x2="560" y2="85" stroke="%23a7f3d0" stroke-width="2"/>

  <rect x="40" y="105" width="520" height="70" rx="10" fill="%23ecfdf5" stroke="%2310b981" stroke-width="1.5"/>
  <text x="55" y="132" font-family="'Nunito', sans-serif" font-size="16" font-weight="700" fill="%23064e3b">Savol:</text>
  <text x="55" y="156" font-family="'Nunito', sans-serif" font-size="15" fill="%23065f46">Yashil barglar quyosh nuri, suv va karbonat angidrid (CO₂) dan ozuqa va kislorod hosil qilishini tushuntiring.</text>

  <g transform="translate(140, 270)">
    <circle cx="-50" cy="-40" r="28" fill="%23facc15" stroke="%23eab308" stroke-width="3"/>
    <text x="-65" y="-35" font-size="24">☀️</text>
    <path d="M 0 0 C 40 -60 120 -50 140 0 C 120 50 40 60 0 0 Z" fill="%2322c55e" stroke="%2315803d" stroke-width="3"/>
    <line x1="0" y1="0" x2="140" y2="0" stroke="%23166534" stroke-width="3"/>
    <path d="M 40 0 L 60 -20 M 70 0 L 90 -20 M 50 0 L 70 20 M 80 0 L 100 20" stroke="%23166534" stroke-width="2"/>
    <text x="160" y="-10" font-family="'Fredoka', sans-serif" font-size="14" font-weight="700" fill="%23047857">Kislorod (O₂) 💨</text>
    <text x="160" y="20" font-family="'Fredoka', sans-serif" font-size="14" font-weight="700" fill="%23b45309">Glyukoza (Shakar) 🍬</text>
    <text x="-80" y="45" font-family="'Fredoka', sans-serif" font-size="14" font-weight="700" fill="%230284c7">Suv (H₂O) 💧</text>
    <text x="-80" y="15" font-family="'Fredoka', sans-serif" font-size="14" font-weight="700" fill="%2364748b">CO₂ Gazi ☁️</text>
  </g>

  <rect x="40" y="350" width="520" height="45" rx="8" fill="%23f8fafc" stroke="%23cbd5e1"/>
  <text x="60" y="378" font-family="'Nunito', sans-serif" font-size="14" fill="%23475569" font-style="italic">Asosiy pigment: Quyosh nurini yutuvchi yashil modda qanday ataladi?</text>
</svg>`;

export const SAMPLE_HOMEWORK_IMAGES = [
  {
    id: 'algebra-quadratic',
    title: 'Algebra: Kvadrat tenglama',
    titleEn: 'Algebra: Quadratic Equation',
    subject: 'math',
    grade: 'g10',
    badge: '10-sinf & DTM 📐',
    badgeEn: '10th Grade & DTM',
    thumbnail: ALGEBRA_SAMPLE_SVG,
    ocrText: '2x² - 8x + 6 = 0 kvadrat tenglamani diskriminant yordamida qadamma-qadam yeching va x1, x2 ildizlarini toping.',
    description: 'Kvadrat tenglama, diskriminant D=b²-4ac va ildizlar tahlili'
  },
  {
    id: 'math-pizza',
    title: 'Matematika: Pitsa kasrlari',
    titleEn: 'Math: Pizza Fractions',
    subject: 'math',
    grade: 'g4',
    badge: '4-sinf Matematika 🍕',
    badgeEn: '4th Grade Math',
    thumbnail: MATH_SAMPLE_SVG,
    ocrText: 'Aziz tushlikda 1 ta pitsaning 2/6 qismini yedi. Malika esa 3/6 qismini yedi. a) Ular jami pitsaning qancha qismini yeyishdi? b) Bobik uchun qancha qism qoldi?',
    description: 'Bir xil maxrajli kasrlarni qo‘shish va butundan ayirish'
  },
  {
    id: 'science-leaves',
    title: 'Biologiya: Fotosintez',
    titleEn: 'Science: Photosynthesis',
    subject: 'science',
    grade: 'g5',
    badge: '5-8 sinf Biologiya 🌿',
    badgeEn: '5th Grade Biology',
    thumbnail: SCIENCE_SAMPLE_SVG,
    ocrText: 'Yashil barglar quyosh nuri, suv va karbonat angidrid (CO₂) dan ozuqa va kislorod hosil qilishini tushuntiring. Xlorofill nima?',
    description: 'Fotosintez bosqichlari, xlorofill va kislorod ajralishi'
  }
];

export const PRESET_SOLUTIONS = {
  'algebra-quadratic': {
    subject: 'math',
    gradeLevel: '10-sinf / DTM',
    extractedProblem: '2x² - 8x + 6 = 0 kvadrat tenglamani diskriminant orqali yeching va ildizlarini toping.',
    cheerTitle: 'Kvadrat Tenglama Mukammal Yechildi! 🧮✨',
    encouragement: 'Kvadrat tenglamalar litsey, maktab bitiruv imtihonlari va DTM testlarining asosiy poydevori hisoblanadi. Formulani to‘g‘ri qo‘llash orqali buni soniyalar ichida yechish mumkin!',
    steps: [
      {
        stepNumber: 1,
        title: 'Koeffitsiyentlarni aniqlash (a, b, c)',
        emoji: '📌',
        explanation: 'Kvadrat tenglamaning umumiy ko‘rinishi: ax² + bx + c = 0.\nBizning tenglamamizda:\na = 2 (x² oldidagi koeffitsiyent)\nb = -8 (x oldidagi koeffitsiyent)\nc = 6 (ozod had)',
        audioText: '1-qadam. Koeffitsiyentlarni aniqlaymiz. A barobar 2, B barobar minus 8, C barobar 6.',
        formula: 'a = 2, b = -8, c = 6'
      },
      {
        stepNumber: 2,
        title: 'Diskriminantni (D) hisoblash',
        emoji: '⚡',
        explanation: 'Diskriminant formulasi: D = b² - 4ac\nQiymatlarni joyiga qo‘yamiz:\nD = (-8)² - 4 × 2 × 6\nD = 64 - 48 = 16!\n16 noldan katta (D > 0), demak tenglama 2 ta turli haqiqiy ildizga ega! √D = √16 = 4.',
        audioText: '2-qadam. Diskriminantni hisoblaymiz. Minus sakkizning kvadrati 64, ayiramiz 4 ko‘paytirilgan 2 ko‘paytirilgan 6. Natija 16 ga teng.',
        formula: 'D = (-8)² - 4(2)(6) = 64 - 48 = 16'
      },
      {
        stepNumber: 3,
        title: 'Ildizlarni (x1 va x2) topish',
        emoji: '🎯',
        explanation: 'Ildizlar formulasi: x = (-b ± √D) / (2a)\nBu yerda -b = -(-8) = 8, √D = 4, 2a = 2 × 2 = 4.\n\nBirinchi ildiz (x1):\nx1 = (8 + 4) / 4 = 12 / 4 = 3\n\nIkkinchi ildiz (x2):\nx2 = (8 - 4) / 4 = 4 / 4 = 1',
        audioText: '3-qadam. Ildizlarni topamiz. X bir barobar 3 ga, X ikki barobar 1 ga teng.',
        formula: 'x1 = 3,  x2 = 1'
      },
      {
        stepNumber: 4,
        title: 'Viyet teoremasi bilan tekshirish (Tezkor usul)',
        emoji: '💡',
        explanation: 'Ildizlar yig‘indisi: x1 + x2 = 3 + 1 = 4. (-b/a = -(-8)/2 = 4) ✓\nIldizlar ko‘paytmasi: x1 × x2 = 3 × 1 = 3. (c/a = 6/2 = 3) ✓\nTekshiruv 100% to‘g‘ri chiqdi!',
        audioText: '4-qadam. Viyet teoremasi bo‘yicha tekshirdik. Natija to‘liq tasdiqlandi.',
        tip: 'DTM maslahati: Tenglamaning har ikki tomonini 2 ga bo‘lib, x² - 4x + 3 = 0 ko‘rinishida Viyet bilan og‘zaki ham yechish mumkin edi!'
      }
    ],
    finalAnswer: {
      headline: 'Tenglamaning Ildizlari:',
      bullets: [
        'Diskriminant: D = 16 (D > 0, 2 ta ildiz) ⚡',
        'Ildizlar: x₁ = 3  va  x₂ = 1 🏆'
      ],
      summary: 'Kvadrat tenglama diskriminant va Viyet teoremasi yordamida muvaffaqiyatli yechildi.'
    },
    practiceChallenge: {
      question: 'x² - 5x + 6 = 0 kvadrat tenglamaning ildizlari qaysi javobda to‘g‘ri ko‘rsatilgan?',
      options: ['x₁ = 2,  x₂ = 3', 'x₁ = -2,  x₂ = -3', 'x₁ = 1,  x₂ = 6', 'x₁ = -1,  x₂ = 5'],
      correctIndex: 0,
      explanation: 'Ofarin! Diskriminant D = 25 - 24 = 1. x = (5 ± 1) / 2 bo‘lib, ildizlar 2 va 3 bo‘ladi!'
    },
    followUps: [
      {
        q: 'Agar diskriminant noldan kichik (D < 0) bo‘lsa nima bo‘ladi?',
        a: 'Agar D < 0 bo‘lsa, manfiy sondan kvadrat ildiz chiqarib bo‘lmaydi (haqiqiy sonlar to‘plamida). Shuning uchun tenglama haqiqiy ildizga ega emas deyiladi.'
      },
      {
        q: 'Viyet teoremasidan qachon foydalanish qulayroq?',
        a: 'Agar x² oldidagi koeffitsiyent a=1 bo‘lsa, Viyet teoremasi bo‘yicha ildizlarni ko‘paytmasi (c) va yig‘indisi (-b) dan foydalanib og‘zaki topish juda tez bo‘ladi!'
      }
    ]
  },

  'math-pizza': {
    subject: 'math',
    gradeLevel: '4-sinf',
    extractedProblem: 'Aziz 1 ta pitsaning 2/6 qismini, Malika esa 3/6 qismini yedi. \n(a) Ular birgalikda qancha pitsa yeyishdi?\n(b) It Bobik uchun qancha qism qoldi?',
    cheerTitle: 'Kasrlar Masalasi Muvaffaqiyatli Yechildi! 🍕✨',
    encouragement: 'Kasrlar — bu shunchaki butun pitsaning bo‘laklaridir! Har ikkala kasrning maxraji bir xil (6) bo‘lgani uchun, ularni qo‘shish juda oddiy!',
    steps: [
      {
        stepNumber: 1,
        title: 'Maxrajlarni tekshirish (Pitsa bo‘laklari soni)',
        emoji: '🔍',
        explanation: 'Har ikkala kasrning pastki soni (maxraji) 6 ga teng: 2/6 va 3/6. Demak, butun pitsa 6 ta teng bo‘lakka bo‘lingan. Maxrajlarni o‘zgartirish shart emas!',
        audioText: '1-qadam. Maxrajlarni tekshiramiz. Ikkala kasrning pastki soni 6 ga teng.',
        tip: 'Qoida: Maxrajlar bir xil bo‘lsa, pastki son o‘zgarishsiz qoladi!'
      },
      {
        stepNumber: 2,
        title: 'Aziz va Malika yegan bo‘laklarni qo‘shish',
        emoji: '🍕',
        explanation: 'Aziz 2 bo‘lak, Malika esa 3 bo‘lak yedi. Suratlarni (tepadagi sonlarni) qo‘shamiz:\n2 + 3 = 5 bo‘lak.\nDemak, birgalikda ular pitsaning 5/6 qismini yeyishdi!',
        audioText: '2-qadam. Tepadagi sonlarni qo‘shamiz. 2 ga 3 ni qo‘shsak 5 bo‘ladi. Jami 5 ta bo‘lak yeyildi.',
        formula: '2/6 + 3/6 = (2 + 3) / 6 = 5/6'
      },
      {
        stepNumber: 3,
        title: 'Bobik uchun qolgan qismni hisoblash',
        emoji: '🐶',
        explanation: 'Butun pitsa — bu 6/6 qism (barcha 6 bo‘lak). Agar 5/6 qismi yeyilgan bo‘lsa, ayiramiz:\n6/6 - 5/6 = (6 - 5) / 6 = 1/6.\nBobik uchun 1 ta mazali bo‘lak qoldi!',
        audioText: '3-qadam. Butun pitsadan yeyilgan qismini ayiramiz. Bobik uchun 1 ta bo‘lak qoladi.',
        formula: '6/6 - 5/6 = 1/6'
      }
    ],
    finalAnswer: {
      headline: 'Pitsa Masalasi Javoblari:',
      bullets: [
        'Jami yeyilgan pitsa: 5/6 qism 🍕',
        'Bobik uchun qolgani: 1/6 qism 🐶'
      ],
      summary: 'Ular 6 ta bo‘lakdan 5 tasini birgalikda yeyishdi va 1 ta bo‘lak Bobik uchun qoldi!'
    },
    practiceChallenge: {
      question: 'Agar yangi pitsa 8 bo‘lakka bo‘lingan bo‘lsa va Akmal 3/8, uning ukasi 2/8 qismini yesa, jami qancha yeyildi?',
      options: ['5/8 qism', '5/16 qism', '1/8 qism', '6/8 qism'],
      correctIndex: 0,
      explanation: 'Ofarin! 3/8 + 2/8 = 5/8 chunki maxraj bir xil bo‘lib, suratlar qo‘shiladi (3+2=5)!'
    },
    followUps: [
      {
        q: 'Nima uchun pastdagi 6 sonlarini qo‘shmadik (6 + 6)?',
        a: 'Juda to‘g‘ri savol! Maxraj bo‘laklarning qanday kattalikda ekanligini ko‘rsatadi. 2 ta pitsa bo‘lagiga 3 ta pitsa bo‘lagini qo‘shsak, 5 ta pitsa bo‘lagi bo‘ladi, o‘n ikkitalik bo‘lak emas!'
      }
    ]
  },

  'science-leaves': {
    subject: 'science',
    gradeLevel: '5-8 sinf',
    extractedProblem: 'Yashil barglar quyosh nuri, suv va karbonat angidrid (CO₂) dan qanday qilib ozuqa va kislorod hosil qiladi? Xlorofill nima?',
    cheerTitle: 'Yashil Tabiat Mo‘jizasi: Fotosintez! 🌿☀️',
    encouragement: 'O‘simliklar Yer yuzidagi eng ajoyib quyosh oshpazlaridir! Ular quyosh nuri va havodan foydalanib butun sayyora uchun ozuqa va toza kislorod pishiradi!',
    steps: [
      {
        stepNumber: 1,
        title: 'Xlorofill: Yashil quyosh panellari',
        emoji: '🎨',
        explanation: 'O‘simlik barglari nega yashil? Chunki ularning ichida Xlorofill (chlorophyll) nomli yashil pigment mavjud. U xuddi quyosh batareyalari kabi quyosh nurini tutib oladi!',
        audioText: '1-qadam. Xlorofill bu quyosh nurini yutuvchi maxsus yashil moddadir.',
        tip: 'Eslab qoling: Xlorofill o‘simlikka yashil rang beradi va energiyani to‘playdi!'
      },
      {
        stepNumber: 2,
        title: 'Kerakli 3 ta asosiy moddani yig‘ish',
        emoji: '🥣',
        explanation: 'Fotosintez uchun 3 ta narsa kerak:\n1. ☀️ Quyosh nuri (xlorofill orqali)\n2. 💧 Suv va minerallar (ildizlar orqali yerdan so‘riladi)\n3. ☁️ Karbonat angidrid (CO₂ - bargdagi og‘izchalar orqali havodan olinadi)',
        audioText: '2-qadam. O‘simlik uchta narsani to‘playdi: quyosh nuri, suv va karbonat angidrid.',
        formula: 'Quyosh nuri + Suv (H₂O) + Karbonat angidrid (CO₂)'
      },
      {
        stepNumber: 3,
        title: 'Glyukoza va Toza Kislorod hosil bo‘lishi',
        emoji: '🧪',
        explanation: 'Quyosh energiyasi ta’sirida kimyoviy reaksiya sodir bo‘ladi: suv va CO₂ dan shirin Glyukoza (o‘simlik ozuqasi) hosil bo‘ladi va havoga biz nafas oladigan Kislorod (O₂) ajralib chiqadi!',
        audioText: '3-qadam. Natijada glyukoza shakar ozuqasi va toza kislorod hosil bo‘ladi.',
        formula: 'Yorug‘lik energiyasi ➔ Glyukoza (Ozuqa) + Kislorod (O₂)'
      }
    ],
    finalAnswer: {
      headline: 'Fotosintez Xulosasi:',
      bullets: [
        'Yashil pigment: Xlorofill 🍃',
        'Zarur moddalar: Quyosh nuri + Suv + CO₂ ☀️💧☁️',
        'Natija: Glyukoza (o‘simlik ozuqasi) va Kislorod (O₂) 🍬💨'
      ],
      summary: 'Fotosintez tufayli yer yuzida barcha jonzotlar toza havo bilan nafas oladi!'
    },
    practiceChallenge: {
      question: 'Bargning pastki qismida joylashgan va havoni yutib-chiqaruvchi mayda teshikchalar nima deb ataladi?',
      options: ['Og‘izchalar (Stomata)', 'Mitoxondriya', 'Sitoplazma', 'Ildiz tukchalari'],
      correctIndex: 0,
      explanation: 'Ajoyib! Og‘izchalar (stomata) bargdagi mikroskopik teshiklar bo‘lib, CO₂ ni yutib, kislorodni chiqaradi!'
    },
    followUps: [
      {
        q: 'O‘simliklar tunda ham fotosintez qiladimi?',
        a: 'Yo‘q, chunki fotosintez uchun quyosh nuri zarur. Tunda o‘simliklar xuddi insonlar kabi faqat nafas oladi.'
      }
    ]
  }
};
