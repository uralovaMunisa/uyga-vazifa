export const GRADES = [
  // Boshlang'ich maktab (Elementary)
  { id: 'g1', level: 1, label: '1-sinf', labelEn: '1st Grade', category: 'elementary', age: '6–7 yosh', ageEn: 'Ages 6–7', emoji: '🌱', badge: 'Kichik Nihol' },
  { id: 'g2', level: 2, label: '2-sinf', labelEn: '2nd Grade', category: 'elementary', age: '7–8 yosh', ageEn: 'Ages 7–8', emoji: '🌟', badge: 'Yulduzcha' },
  { id: 'g3', level: 3, label: '3-sinf', labelEn: '3rd Grade', category: 'elementary', age: '8–9 yosh', ageEn: 'Ages 8–9', emoji: '🚀', badge: 'Izlanuvchi' },
  { id: 'g4', level: 4, label: '4-sinf', labelEn: '4th Grade', category: 'elementary', age: '9–10 yosh', ageEn: 'Ages 9–10', emoji: '🦁', badge: 'Zukko O‘quvchi' },

  // O'rta maktab (Middle School)
  { id: 'g5', level: 5, label: '5-sinf', labelEn: '5th Grade', category: 'middle', age: '10–11 yosh', ageEn: 'Ages 10–11', emoji: '⚡', badge: 'Tafakkur Ustasi' },
  { id: 'g6', level: 6, label: '6-sinf', labelEn: '6th Grade', category: 'middle', age: '11–12 yosh', ageEn: 'Ages 11–12', emoji: '🧭', badge: 'Yo‘l Boshlovchi' },
  { id: 'g7', level: 7, label: '7-sinf', labelEn: '7th Grade', category: 'middle', age: '12–13 yosh', ageEn: 'Ages 12–13', emoji: '🔮', badge: 'Mantiq Bilimdoni' },
  { id: 'g8', level: 8, label: '8-sinf', labelEn: '8th Grade', category: 'middle', age: '13–14 yosh', ageEn: 'Ages 13–14', emoji: '🧬', badge: 'Fan Qahramoni' },
  { id: 'g9', level: 9, label: '9-sinf', labelEn: '9th Grade', category: 'middle', age: '14–15 yosh', ageEn: 'Ages 14–15', emoji: '🎯', badge: 'Bitiruvchi' },

  // Yuqori sinf & Litsey (High School)
  { id: 'g10', level: 10, label: '10-sinf', labelEn: '10th Grade', category: 'high', age: '15–16 yosh', ageEn: 'Ages 15–16', emoji: '👑', badge: 'Litsey / Akademik' },
  { id: 'g11', level: 11, label: '11-sinf', labelEn: '11th Grade', category: 'high', age: '16–17 yosh', ageEn: 'Ages 16–17', emoji: '🏆', badge: 'Abituriyent Lider' },

  // Kattalar & Talabalar (University & Pro)
  { id: 'dtm', level: 12, label: 'DTM & Imtihon', labelEn: 'Exam Prep (DTM)', category: 'adult', age: 'Abituriyentlar', ageEn: 'Test Prep', emoji: '🎯', badge: 'DTM / Testga tayyorgarlik' },
  { id: 'uni', level: 13, label: 'Universitet / Oliy', labelEn: 'University / College', category: 'adult', age: 'Talabalar & Kattalar', ageEn: 'Higher Ed', emoji: '🏛️', badge: 'Universitet Talabasi' },
  { id: 'pro', level: 14, label: 'IELTS & Mustaqil', labelEn: 'IELTS / Self-Study', category: 'adult', age: 'Barcha yoshdagilar', ageEn: 'All Ages', emoji: '💎', badge: 'Ekspert Izlanuvchi' },
];

export const SUBJECTS = [
  {
    id: 'math',
    name: 'Matematika & Algebra',
    nameEn: 'Math & Algebra',
    fullName: 'Matematika, Algebra va Mantiq',
    fullNameEn: 'Mathematics & Logic',
    icon: 'Calculator',
    emoji: '🧮',
    description: 'Tenglamalar, kasrlar, foizlar, kvadrat tenglamalar',
    descriptionEn: 'Equations, fractions, geometry & algebra puzzles',
    bgGradient: 'from-amber-400 via-orange-400 to-amber-500',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-800',
    accentColor: '#f59e0b',
    sampleQuestions: [
      {
        title: 'Kvadrat tenglama yechish (Yuqori sinf / DTM)',
        prompt: '2x² - 8x + 6 = 0 kvadrat tenglamani diskriminant yordamida qadamma-qadam yechib bering.',
        type: 'equation'
      },
      {
        title: 'Kasrlar bo‘yicha pissa masalasi (Boshlang‘ich)',
        prompt: 'Aziz katta pitsaning 2/6 qismini, Malika esa 3/6 qismini yedi. Jami qancha pitsa yeyildi va it Bobik uchun qancha qismi qoldi?',
        type: 'equation'
      },
      {
        title: 'Chiziqli tenglama: 3x + 7 = 22',
        prompt: '3x + 7 = 22 tenglamani noma’lum x uchun qadamma-qadam yechib bering.',
        type: 'equation'
      }
    ]
  },
  {
    id: 'physics',
    name: 'Fizika',
    nameEn: 'Physics',
    fullName: 'Fizika va Mexanika',
    fullNameEn: 'Physics & Mechanics',
    icon: 'Zap',
    emoji: '⚡',
    description: 'Nyuton qonunlari, tezlik, energiya, elektr zanjirlari',
    descriptionEn: 'Newton’s laws, kinetic energy, circuits & optics',
    bgGradient: 'from-blue-500 via-indigo-500 to-cyan-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-800',
    accentColor: '#3b82f6',
    sampleQuestions: [
      {
        title: 'Nyutonning II qonuni (F = ma)',
        prompt: 'Massasi 5 kg bo‘lgan jismga 20 N kuch ta’sir qilganda, uning tezlanishi qanday bo‘ladi? Formulalari bilan tushuntiring.',
        type: 'concept'
      },
      {
        title: 'Kinetik energiya formulasi',
        prompt: 'Avtomobil tezligi 2 marta oshsa, uning kinetik energiyasi necha marta ortadi? Isboti bilan.',
        type: 'concept'
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Kimyo',
    nameEn: 'Chemistry',
    fullName: 'Umumiy va Organik Kimyo',
    fullNameEn: 'General & Organic Chemistry',
    icon: 'TestTube',
    emoji: '🧪',
    description: 'Reaksiyalarni tenglashtirish, moddalar, molyar massa',
    descriptionEn: 'Chemical equations, balancing, periodic table & molar mass',
    bgGradient: 'from-teal-400 via-emerald-500 to-green-600',
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    textColor: 'text-teal-800',
    accentColor: '#14b8a6',
    sampleQuestions: [
      {
        title: 'Kimyoviy reaksiyani tenglashtirish',
        prompt: 'Fe + O2 -> Fe2O3 reaksiyasini koeffitsiyentlar qo‘yib tenglashtiring va har bir qadamni tushuntiring.',
        type: 'equation'
      },
      {
        title: 'Suvning molyar massasi',
        prompt: 'Suv (H2O) ning molyar massasini davriy jadval asosida hisoblang (H=1, O=16).',
        type: 'concept'
      }
    ]
  },
  {
    id: 'science',
    name: 'Biologiya & Tabiat',
    nameEn: 'Biology & Science',
    fullName: 'Biologiya, Tabiat va Tibbiyot',
    fullNameEn: 'Biology & Life Science',
    icon: 'FlaskConical',
    emoji: '🌿',
    description: 'Hujayra, fotosintez, inson anatomiyasi, genetika',
    descriptionEn: 'Cells, photosynthesis, DNA, human anatomy & ecosystems',
    bgGradient: 'from-emerald-400 via-teal-400 to-green-500',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-800',
    accentColor: '#10b981',
    sampleQuestions: [
      {
        title: 'Fotosintez jarayoni',
        prompt: 'Yashil barglar quyosh nuri, suv va karbonat angidridni qanday qilib ozuqa (glyukoza) va kislorodga aylantiradi?',
        type: 'concept'
      },
      {
        title: 'DNK va RNK farqi',
        prompt: 'DNK va RNK molekulalarining asosiy farqlari nimada? Oddiy va tushunarli qilib yozing.',
        type: 'concept'
      }
    ]
  },
  {
    id: 'highermath',
    name: 'Oliy Matematika',
    nameEn: 'Higher Math / Calculus',
    fullName: 'Oliy matematika, Matritsalar va Integral',
    fullNameEn: 'Calculus, Matrices & Derivatives',
    icon: 'Binary',
    emoji: '📐',
    description: 'Hosilalar, integrallar, matritsa determinanti, limitlar',
    descriptionEn: 'Derivatives, integrals, limits & matrix determinants',
    bgGradient: 'from-purple-500 via-indigo-600 to-blue-600',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-800',
    accentColor: '#8b5cf6',
    sampleQuestions: [
      {
        title: 'Funksiya hosilasini topish',
        prompt: 'f(x) = 3x³ - 5x² + 7x - 9 funksiyaning birinchi tartibli hosilasini toping va qoidasini ko‘rsating.',
        type: 'equation'
      },
      {
        title: '2x2 Matritsa determinanti',
        prompt: 'A = [[3, 5], [2, 4]] matritsaning determinantini hisoblab bering.',
        type: 'equation'
      }
    ]
  },
  {
    id: 'english',
    name: 'Ingliz Tili (IELTS / CEFR)',
    nameEn: 'English (IELTS / Grammar)',
    fullName: 'Ingliz tili, Grammatika va Essay',
    fullNameEn: 'English Grammar, IELTS & Writing',
    icon: 'PenTool',
    emoji: '✏️',
    description: 'Grammatika tekshirish, IELTS Writing, Present Perfect, lug‘at',
    descriptionEn: 'Grammar checks, IELTS essays, sentence structures & vocab',
    bgGradient: 'from-sky-400 via-blue-400 to-indigo-500',
    lightBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-800',
    accentColor: '#0ea5e9',
    sampleQuestions: [
      {
        title: 'Xatolarni to‘g‘rilash (Grammar Check)',
        prompt: 'Ushbu gapdagi xatolarni tuzating: "Yesterday the cheerful puppy runned fastly in the park and catch three red ball."',
        type: 'grammar'
      },
      {
        title: 'IELTS Task 2 Essay kirish qismi',
        prompt: 'Mavzu: "Texnologiya bolalar ta’limiga foydalimi yoki zararlimi?" uchun ajoyib introduction va thesis statement yozib bering.',
        type: 'essay'
      },
      {
        title: 'Past Simple vs Present Perfect',
        prompt: 'Past Simple va Present Perfect zamonlari orasidagi farqni aniq misollar bilan o‘zbek tilida tushuntiring.',
        type: 'concept'
      }
    ]
  },
  {
    id: 'history',
    name: 'Tarix & Huquq',
    nameEn: 'History & Law',
    fullName: 'O‘zbekiston va Jahon Tarixi',
    fullNameEn: 'World & Uzbekistan History',
    icon: 'Hourglass',
    emoji: '🏺',
    description: 'Amir Temur davri, qadimgi sivilizatsiyalar, kashfiyotlar',
    descriptionEn: 'Ancient civilizations, Silk Road, great inventors & history',
    bgGradient: 'from-rose-400 via-pink-400 to-rose-500',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-800',
    accentColor: '#f43f5e',
    sampleQuestions: [
      {
        title: 'Amir Temur davlati va Buyuk Ipak Yo‘li',
        prompt: 'Amir Temur davrida Buyuk Ipak yo‘li xavfsizligi va savdo rivojiga qanday e’tibor qaratilgan?',
        type: 'concept'
      },
      {
        title: 'Qadimgi Misr va Nil daryosi',
        prompt: 'Nima sababdan qadimgi Misr sivilizatsiyasi aynan Nil daryosi bo‘yida vujudga kelgan?',
        type: 'concept'
      }
    ]
  },
  {
    id: 'literature',
    name: 'Adabiyot & Ona Tili',
    nameEn: 'Literature & Native Language',
    fullName: 'Ona tili qoidalari va Badiiy tahlil',
    fullNameEn: 'Literature, Essays & Native Grammar',
    icon: 'BookOpen',
    emoji: '📚',
    description: 'Insho yozish, so‘z turkumlari, g‘azallar tahlili',
    descriptionEn: 'Poetry, themes, book analysis & grammar analysis',
    bgGradient: 'from-purple-400 via-violet-400 to-purple-500',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-800',
    accentColor: '#a855f7',
    sampleQuestions: [
      {
        title: 'Alisher Navoiy g‘azali ma’nosi',
        prompt: 'Alisher Navoiyning "El netib topgay tasalli..." g‘azalining asosiy g‘oyasi va badiiy san’atlarini tushuntirib bering.',
        type: 'essay'
      },
      {
        title: 'Ona tili: Fe’l nisbatlari',
        prompt: 'O‘zbek tilida fe’l nisbatlari (aniqlik, majhul, o‘zlik, birgalik, orttirma) qanday yasaladi? Misollar bilan.',
        type: 'concept'
      }
    ]
  },
  {
    id: 'geography',
    name: 'Geografiya',
    nameEn: 'Geography',
    fullName: 'Iqtisodiy va Tabiiy Geografiya',
    fullNameEn: 'Physical & Economic Geography',
    icon: 'Globe',
    emoji: '🌍',
    description: 'Qit’alar, xaritalar, iqlim, O‘zbekiston tabiati',
    descriptionEn: 'Continents, maps, climate zones & global geography',
    bgGradient: 'from-cyan-400 via-teal-400 to-blue-500',
    lightBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    textColor: 'text-cyan-800',
    accentColor: '#06b6d4',
    sampleQuestions: [
      {
        title: 'Orol dengizi va ekologik holat',
        prompt: 'Orol dengizining qurishi sabablari va uning Markaziy Osiyo iqlimiga ta’siri haqida batafsil ma’lumot bering.',
        type: 'concept'
      },
      {
        title: 'Orol va Yarimorol farqi',
        prompt: 'Orol va yarimorolning farqi nimada? 2 tadan mashhur jahon misoli keltiring.',
        type: 'concept'
      }
    ]
  },
  {
    id: 'coding',
    name: 'Dasturlash & IT',
    nameEn: 'Coding & Tech',
    fullName: 'Python, Algoritmlar va Kompyuter savodxonligi',
    fullNameEn: 'Python, Algorithms & Software Engineering',
    icon: 'Code',
    emoji: '💻',
    description: 'Python asoslari, sikllar, funksiyalar, algoritmlar',
    descriptionEn: 'Python logic, loops, algorithms & problem solving',
    bgGradient: 'from-indigo-400 via-blue-500 to-indigo-600',
    lightBg: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    textColor: 'text-indigo-800',
    accentColor: '#6366f1',
    sampleQuestions: [
      {
        title: 'Python: For sikli va Ro‘yxatlar',
        prompt: 'Python tilida 1 dan 10 gacha bo‘lgan sonlarning kvadratlarini hisoblovchi kod yozing va qadamma-qadam tushuntiring.',
        type: 'concept'
      },
      {
        title: 'Algoritm nima?',
        prompt: 'Dasturlashda algoritm va vaqt murakkabligi (Big O) nima ekanligini oddiy hayotiy misol bilan tushuntiring.',
        type: 'concept'
      }
    ]
  }
];

export const EXERCISE_TYPES = [
  { id: 'all', label: 'Barcha vazifalar', labelEn: 'Any Homework', emoji: '✨' },
  { id: 'equation', label: 'Tenglama & Hisob', labelEn: 'Solve Equation', emoji: '🧮' },
  { id: 'concept', label: 'Mavzuni tushuntirish', labelEn: 'Explain Concept', emoji: '💡' },
  { id: 'grammar', label: 'Grammatika tekshirish', labelEn: 'Grammar Check', emoji: '✏️' },
  { id: 'essay', label: 'Insho / Essay Yordamchi', labelEn: 'Essay Helper', emoji: '📝' },
  { id: 'quiz', label: 'Test & Mashq', labelEn: 'Practice Quiz', emoji: '🎯' },
];
