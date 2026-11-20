import { PRESET_SOLUTIONS } from '../data/mockHomeworkData';

/**
 * Intelligent kid & adult/pro solver service.
 * Supports Uzbek ('uz') and English ('en')
 * Supports Kid Mode ('kid') and Pro/Student Mode ('pro')
 * Connects to Gemini 1.5 Flash / OpenAI when API key provided
 */

export async function solveHomework({
  inputMode = 'text',
  textPrompt = '',
  imageData = null,
  presetId = null,
  subject = 'math',
  grade = 'g10',
  exerciseType = 'all',
  language = 'uz',
  mode = 'pro',
  apiKeys = {},
  onProgress = () => {}
}) {
  const isUz = language === 'uz';

  // Step 1: Simulate or trigger OCR / Vision progress
  if (inputMode === 'image') {
    onProgress({
      stage: 'scanning',
      percent: 25,
      message: isUz ? 'Vazifa sahifasi AI ko‘zi bilan skanerlanmoqda... 📸' : 'Scanning homework page with AI Vision... 📸'
    });
    await sleep(700);

    onProgress({
      stage: 'ocr',
      percent: 55,
      message: isUz ? 'Daftar yozuvlari va formulalar o‘qib olinmoqda... 🔍' : 'Reading handwriting and math symbols... 🔍'
    });
    await sleep(800);

    onProgress({
      stage: 'solving',
      percent: 85,
      message: isUz ? (mode === 'pro' ? 'Akademik tahlil va isbotlar tuzilmoqda... 💡' : 'Sodda va qiziqarli qadamlar tayyorlanmoqda... 💡') : 'Thinking up clear, easy steps... 💡'
    });
    await sleep(700);
  } else {
    onProgress({
      stage: 'reading',
      percent: 40,
      message: isUz ? 'Savol va shartlar diqqat bilan o‘rganilmoqda... 📖' : 'Reading your question carefully... 📖'
    });
    await sleep(500);

    onProgress({
      stage: 'solving',
      percent: 80,
      message: isUz ? 'Bosqichma-bosqich yechim tuzilmoqda... 🧠' : 'Breaking it down into simple steps... 🧠'
    });
    await sleep(600);
  }

  // Check if user has an active Gemini API key
  if (apiKeys?.geminiApiKey && apiKeys.geminiApiKey.trim() !== '') {
    try {
      const realResult = await callGeminiApi({
        apiKey: apiKeys.geminiApiKey,
        inputMode,
        textPrompt,
        imageData,
        subject,
        grade,
        exerciseType,
        language,
        mode
      });
      if (realResult) {
        onProgress({ stage: 'done', percent: 100, message: isUz ? 'Yechim tayyor! 🎉' : 'Done! 🎉' });
        return realResult;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart simulated solver:', err);
    }
  }

  // Check if user has an active OpenAI API key
  if (apiKeys?.openaiApiKey && apiKeys.openaiApiKey.trim() !== '') {
    try {
      const realResult = await callOpenAiApi({
        apiKey: apiKeys.openaiApiKey,
        inputMode,
        textPrompt,
        imageData,
        subject,
        grade,
        exerciseType,
        language,
        mode
      });
      if (realResult) {
        onProgress({ stage: 'done', percent: 100, message: isUz ? 'Yechim tayyor! 🎉' : 'Done! 🎉' });
        return realResult;
      }
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to smart simulated solver:', err);
    }
  }

  // Preset match for sample notebook images
  if (presetId && PRESET_SOLUTIONS[presetId]) {
    onProgress({ stage: 'done', percent: 100, message: isUz ? 'Qadamma-qadam qo‘llanma tayyor! 🚀' : 'Here is your step-by-step guide! 🚀' });
    return {
      ...PRESET_SOLUTIONS[presetId],
      isAiSimulated: true
    };
  }

  // Generate dynamic smart kid & pro solution in Uzbek or English
  const dynamicResult = generateSmartSolution({
    inputMode,
    textPrompt,
    imageData,
    subject,
    grade,
    exerciseType,
    language,
    mode
  });

  onProgress({ stage: 'done', percent: 100, message: isUz ? 'Siz uchun tayyor! ⭐' : 'Ready for you! ⭐' });
  return dynamicResult;
}

/**
 * Dynamic Multi-Level & Multi-Language Solution Generator
 */
function generateSmartSolution({ textPrompt, subject, grade, exerciseType, language = 'uz', mode = 'pro' }) {
  const isUz = language === 'uz';
  const isPro = mode === 'pro' || grade === 'g10' || grade === 'g11' || grade === 'dtm' || grade === 'uni' || grade === 'pro';
  const prompt = (textPrompt || (isUz ? 'Ushbu masalani qanday yechish mumkin?' : 'How do I solve this problem?')).trim();
  const lower = prompt.toLowerCase();

  // 1. Quadratic Equation (e.g. 2x² - 8x + 6 = 0 or x² - 5x + 6 = 0)
  const quadMatch = prompt.match(/([+\-]?\s*\d*)\s*x\s*[\^²2]+\s*([+\-]\s*\d*)\s*x\s*([+\-]\s*\d+)\s*=\s*0/i);
  if (quadMatch || lower.includes('kvadrat') || lower.includes('x²') || lower.includes('quadratic')) {
    let a = 1, b = -5, c = 6;
    if (quadMatch) {
      const rawA = quadMatch[1].replace(/\s+/g, '');
      a = rawA === '' || rawA === '+' ? 1 : rawA === '-' ? -1 : parseInt(rawA, 10);
      const rawB = quadMatch[2].replace(/\s+/g, '');
      b = rawB === '+' ? 1 : rawB === '-' ? -1 : parseInt(rawB, 10);
      c = parseInt(quadMatch[3].replace(/\s+/g, ''), 10);
    } else if (prompt.includes('2x²')) {
      a = 2; b = -8; c = 6;
    }

    const D = b * b - 4 * a * c;
    const sqrtD = D >= 0 ? Math.sqrt(D) : NaN;
    const x1 = D >= 0 ? ((-b + sqrtD) / (2 * a)) : null;
    const x2 = D >= 0 ? ((-b - sqrtD) / (2 * a)) : null;

    if (isUz) {
      return {
        subject: 'math',
        gradeLevel: isPro ? '10–11 sinf / DTM' : 'Yuqori sinf',
        extractedProblem: prompt,
        cheerTitle: `Kvadrat Tenglama Tahlili (D = ${D})! 🧮⚡`,
        encouragement: isPro 
          ? `Kvadrat tenglamani diskriminant formulasi orqali tahlil qilamiz. Bu usul DTM va oliy ta’lim imtihonlarida xatolikka yo‘l qo‘ymaslikning eng mustahkam usulidir.`
          : `Kvadrat tenglama juda qiziq! Formulalarni o‘z o‘rniga qo‘yib hisoblasak, natija darhol chiqadi!`,
        steps: [
          {
            stepNumber: 1,
            title: 'Koeffitsiyentlarni aniqlash (a, b, c)',
            emoji: '📌',
            explanation: `Kvadrat tenglamaning kanonik ko‘rinishi: ax² + bx + c = 0.\nBizning tenglamada:\na = ${a} (katta had koeffitsiyenti)\nb = ${b} (o‘rta had koeffitsiyenti)\nc = ${c} (ozod had)`,
            audioText: `1-qadam. Koeffitsiyentlarni aniqlaymiz. A barobar ${a}, B barobar ${b}, C barobar ${c}.`,
            formula: `a = ${a}, b = ${b}, c = ${c}`
          },
          {
            stepNumber: 2,
            title: 'Diskriminantni (D) hisoblash',
            emoji: '⚡',
            explanation: `Diskriminant formulasi: D = b² - 4ac\nHisoblash: D = (${b})² - 4 × (${a}) × (${c}) = ${b*b} - ${4*a*c} = ${D}.\n${D > 0 ? `D > 0 bo‘lgani uchun tenglama 2 ta turli haqiqiy ildizga ega! (√D = ${sqrtD})` : D === 0 ? 'D = 0, tenglama bitta karrali ildizga ega!' : 'D < 0, tenglama haqiqiy ildizlarga ega emas!'}`,
            audioText: `2-qadam. Diskriminantni hisoblaymiz. Diskriminant ${D} ga teng.`,
            formula: `D = b² - 4ac = ${D}`
          },
          {
            stepNumber: 3,
            title: 'Ildizlarni aniqlash',
            emoji: '🎯',
            explanation: D >= 0
              ? `Ildizlar formulasi: x₁,₂ = (-b ± √D) / (2a)\nBu yerda -b = ${-b}, √D = ${sqrtD}, 2a = ${2*a}.\n\nx₁ = (${-b} + ${sqrtD}) / ${2*a} = ${x1}\nx₂ = (${-b} - ${sqrtD}) / ${2*a} = ${x2}`
              : `D < 0 bo‘lgani sababli, haqiqiy sonlar sohasida ildiz mavjud emas. Kompleks sonlar sohasida esa mavhum ildizlar hosil bo‘ladi.`,
            audioText: D >= 0 ? `3-qadam. Ildizlar: X bir barobar ${x1}, X ikki barobar ${x2}.` : `Tenglama haqiqiy ildizga ega emas.`,
            formula: D >= 0 ? `x₁ = ${x1},  x₂ = ${x2}` : 'Ildiz yo‘q'
          }
        ],
        finalAnswer: {
          headline: 'Tenglama Ildizlari:',
          bullets: D >= 0 
            ? [`x₁ = ${x1} ⭐`, `x₂ = ${x2} 🎯`, `Diskriminant: D = ${D}`]
            : ['Haqiqiy ildizlar mavjud emas (D < 0)'],
          summary: `Berilgan ${a}x² ${b>=0?'+':''}${b}x ${c>=0?'+':''}${c} = 0 tenglama to‘liq yechildi.`
        },
        practiceChallenge: {
          question: 'x² - 7x + 12 = 0 tenglamaning ildizlarini Viyet teoremasi orqali toping:',
          options: ['x₁ = 3,  x₂ = 4', 'x₁ = -3,  x₂ = -4', 'x₁ = 2,  x₂ = 6', 'x₁ = 1,  x₂ = 12'],
          correctIndex: 0,
          explanation: 'To‘g‘ri! Ildizlar ko‘paytmasi 12 (3 × 4), yig‘indisi esa 7 (3 + 4) ga teng!'
        },
        followUps: [
          {
            q: 'Keltirilgan kvadrat tenglamalarni Viyet bilan qanday tez yechish mumkin?',
            a: 'Agar x² oldidagi koeffitsiyent 1 bo‘lsa, ildizlar ko‘paytmasi ozod had c ga, yig‘indisi esa -b ga teng bo‘ladi. Shunda og‘zaki topish juda osonlashadi!'
          }
        ]
      };
    }
  }

  // 2. Physics: Newton's second law / Velocity / Energy
  if (lower.includes('nyuton') || lower.includes('newton') || lower.includes('tezlanish') || lower.includes('acceleration') || lower.includes('f = ma')) {
    return {
      subject: 'physics',
      gradeLevel: isUz ? (isPro ? 'Litsey / DTM Fizika' : '8-sinf Fizika') : 'Physics',
      extractedProblem: prompt,
      cheerTitle: isUz ? 'Nyutonning II Qonuni Tahlili! ⚡🎯' : 'Newton’s Second Law Solved! ⚡',
      encouragement: isUz 
        ? 'Mexanikaning poydevori bo‘lgan Nyutonning 2-qonuni (F = ma) harakat va kuchlar bog‘liqligini tushuntiradi.' 
        : 'Newton\'s Second Law relates force, mass, and acceleration simply and elegantly.',
      steps: [
        {
          stepNumber: 1,
          title: isUz ? 'Formulani belgilash' : 'State Newton’s 2nd Law Formula',
          emoji: '📐',
          explanation: isUz 
            ? 'Nyutonning ikkinchi qonuni formulasi:\nF = m × a\nBu yerda:\nF — jismga ta’sir qiluvchi kuch (Nyuton, N)\nm — jismning massasi (kilogramm, kg)\na — jism olgan tezlanishi (m/s²)'
            : 'F = m × a, where F is force in Newtons, m is mass in kg, and a is acceleration in m/s².',
          audioText: isUz ? '1-qadam. Kuch barobar massa ko‘paytirilgan tezlanish.' : 'Step 1. Force equals mass times acceleration.',
          formula: 'F = m · a  ➔  a = F / m'
        },
        {
          stepNumber: 2,
          title: isUz ? 'Tezlanishni hisoblash (a = F / m)' : 'Calculate Acceleration',
          emoji: '⚡',
          explanation: isUz
            ? 'Agar kuch F = 20 N va massa m = 5 kg bo‘lsa:\na = F / m = 20 N / 5 kg = 4 m/s²!\nJism har soniyada o‘z tezligini 4 m/s ga oshirib boradi!'
            : 'Given F = 20 N and m = 5 kg: a = 20 / 5 = 4 m/s².',
          audioText: isUz ? '2-qadam. Tezlanish 4 metr taqsim sekund kvadratga teng.' : 'Step 2. The resulting acceleration is 4 meters per second squared.',
          formula: 'a = 20 / 5 = 4 m/s²'
        }
      ],
      finalAnswer: {
        headline: isUz ? 'Fizikaviy Natija:' : 'Physics Result:',
        bullets: isUz 
          ? ['Tezlanish: a = 4 m/s² 🚀', 'Formulasi: a = F / m'] 
          : ['Acceleration: a = 4 m/s²', 'Formula: a = F / m'],
        summary: isUz ? 'Kuch massaga teskari, tezlanishga esa to‘g‘ri mutanosibdir.' : 'Force causes proportional acceleration.'
      },
      practiceChallenge: {
        question: isUz 
          ? 'Agar 10 kg massali aravachaga 50 N kuch berilsa, uning tezlanishi qancha bo‘ladi?' 
          : 'If a 50 N force acts on a 10 kg mass, what is the acceleration?',
        options: ['5 m/s²', '500 m/s²', '0.2 m/s²', '10 m/s²'],
        correctIndex: 0,
        explanation: isUz ? 'Barakalla! a = F / m = 50 / 10 = 5 m/s²!' : 'Correct! a = 50 / 10 = 5 m/s²!'
      },
      followUps: [
        {
          q: isUz ? 'Nima uchun og‘irroq jismni tezlashtirish qiyinroq?' : 'Why is it harder to accelerate heavier objects?',
          a: isUz ? 'Chunki og‘irroq jism ko‘proq inersiyaga ega. Massa qanchalik katta bo‘lsa, uni qo‘zg‘atish uchun shunchalik ko‘p kuch talab etiladi!' : 'Greater mass means greater inertia!'
        }
      ]
    };
  }

  // 3. Higher Math: Derivatives (f(x) = 3x³ - 5x² ...)
  if (lower.includes('hosila') || lower.includes('derivative') || lower.includes('funksiya') || lower.includes('integral')) {
    return {
      subject: 'highermath',
      gradeLevel: isUz ? 'Oliy Matematika / Litsey' : 'Calculus',
      extractedProblem: prompt,
      cheerTitle: isUz ? 'Funksiya Hosilasi Qadamma-Qadam! 📐📈' : 'Derivative Solved Step-by-Step! 📐',
      encouragement: isUz 
        ? 'Darajali funksiyaning hosilasini olish qoidasi (xⁿ)\' = n·xⁿ⁻¹ yordamida har bir hadni alohida hisoblaymiz.'
        : 'Using the power rule d/dx (x^n) = n*x^(n-1), we differentiate term by term.',
      steps: [
        {
          stepNumber: 1,
          title: isUz ? 'Darajali funksiya hosilasi qoidasi' : 'Power Rule Definition',
          emoji: '📌',
          explanation: isUz 
            ? 'Asosiy qoida: (xⁿ)\' = n × xⁿ⁻¹ va o‘zgarmas sonning hosilasi (C)\' = 0 ga teng.'
            : 'Power rule: (x^n)\' = n*x^(n-1), and constant rule: (c)\' = 0.',
          audioText: isUz ? '1-qadam. Daraja oldinga tushadi va daraja birga kamayadi.' : 'Step 1. Bring power to front and reduce power by one.',
          formula: "(c · xⁿ)' = c · n · xⁿ⁻¹"
        },
        {
          stepNumber: 2,
          title: isUz ? 'Har bir haddan hosila olish' : 'Differentiate Each Term',
          emoji: '✏️',
          explanation: isUz 
            ? 'f(x) = 3x³ - 5x² + 7x - 9 funksiya uchun:\n• (3x³)\' = 3 × 3x² = 9x²\n• (-5x²)\' = -5 × 2x = -10x\n• (7x)\' = 7 × 1 = 7\n• (-9)\' = 0'
            : 'For f(x) = 3x³ - 5x² + 7x - 9: 3*(3x²) - 5*(2x) + 7*(1) - 0 = 9x² - 10x + 7.',
          audioText: isUz ? '2-qadam. Hosilalar yig‘indisi: 9x kvadrat minus 10x qo‘shilgan 7.' : 'Step 2. Result is 9x squared minus 10x plus 7.',
          formula: "f'(x) = 9x² - 10x + 7"
        }
      ],
      finalAnswer: {
        headline: isUz ? 'Hosila Natijasi:' : 'Final Derivative:',
        bullets: [
          "f'(x) = 9x² - 10x + 7 ⭐"
        ],
        summary: isUz ? 'Barcha hadlar bo‘yicha hosila to‘liq hisoblab chiqildi.' : 'Successfully calculated derivative.'
      },
      practiceChallenge: {
        question: isUz ? 'f(x) = 5x² - 4x + 3 funksiyaning hosilasi nima bo‘ladi?' : 'What is the derivative of f(x) = 5x² - 4x + 3?',
        options: ['10x - 4', '5x - 4', '10x + 3', '5x² - 4'],
        correctIndex: 0,
        explanation: isUz ? 'Ofarin! (5x²)\' = 10x, (-4x)\' = -4, (3)\' = 0. Natija: 10x - 4!' : 'Correct! 10x - 4!'
      },
      followUps: [
        {
          q: isUz ? 'Hosila geometrik ma’noda nimani bildiradi?' : 'What is the geometric meaning of a derivative?',
          a: isUz ? 'Hosila f\'(x) — bu funksiya grafigiga o‘tkazilgan urinmaning burchak koeffitsiyenti (tangens burchagi) bo‘lib, jarayonning oniy o‘zgarish tezligini ko‘rsatadi!' : 'It is the slope of the tangent line to the curve!'
        }
      ]
    };
  }

  // 4. Linear Equation: 3x + 7 = 22
  const eqMatch = prompt.match(/(\d*)\s*([a-zA-Z])\s*([+\-])\s*(\d+)\s*=\s*(\d+)/);
  if (eqMatch) {
    const coeff = eqMatch[1] ? parseInt(eqMatch[1], 10) : 1;
    const variable = eqMatch[2];
    const sign = eqMatch[3];
    const constNum = parseInt(eqMatch[4], 10);
    const rightNum = parseInt(eqMatch[5], 10);

    const step1Result = sign === '+' ? rightNum - constNum : rightNum + constNum;
    const oppositeSign = sign === '+' ? (isUz ? 'ayiramiz' : 'subtract') : (isUz ? 'qo‘shamiz' : 'add');
    const finalVal = Math.round((step1Result / coeff) * 100) / 100;

    return {
      subject: 'math',
      gradeLevel: isUz ? 'O‘rta maktab / 6-sinf' : 'Grade 6',
      extractedProblem: prompt,
      cheerTitle: isUz ? `Tenglama Yechildi (${variable} = ${finalVal})! 🧮🎉` : `Equation Solved for ${variable}! 🧮🎉`,
      encouragement: isUz 
        ? `Tenglamani tarozining ikki pallasiga qiyoslaymiz: ikkala tomonga bir xil amal bajarsak, muvozanat buzilmaydi!` 
        : `Think of equations like a balance scale in a playground!`,
      steps: [
        {
          stepNumber: 1,
          title: isUz ? `Noma’lumni yolg‘iz qoldirish (${coeff}${variable})` : `Isolate Variable Term (${coeff}${variable})`,
          emoji: '⚖️',
          explanation: isUz 
            ? `Tenglikning ikkala tomonidan ${constNum} sonini ${oppositeSign}:\n${rightNum} ${sign === '+' ? '-' : '+'} ${constNum} = ${step1Result}.\nNatijada: ${coeff}${variable} = ${step1Result} hosil bo‘ldi.` 
            : `Subtract ${constNum} from both sides: ${coeff}${variable} = ${step1Result}.`,
          audioText: isUz ? `1-qadam. Ikkala tomondan ${constNum} ni ayiramiz. ${coeff}${variable} teng ${step1Result}.` : `Step 1. We isolate ${coeff}${variable} equals ${step1Result}.`,
          formula: `${coeff}${variable} = ${step1Result}`
        },
        {
          stepNumber: 2,
          title: isUz ? `Koeffitsiyentga (${coeff}) bo‘lish` : `Divide by Coefficient (${coeff})`,
          emoji: '➗',
          explanation: isUz 
            ? `${variable} ning oldidagi ${coeff} ga ikkala tomonni bo‘lamiz:\n${step1Result} ÷ ${coeff} = ${finalVal}!\nDemak, ${variable} = ${finalVal}!` 
            : `Divide both sides by ${coeff}: ${step1Result} / ${coeff} = ${finalVal}.`,
          audioText: isUz ? `2-qadam. ${step1Result} ni ${coeff} ga bo‘lsak, javob ${finalVal} bo‘ladi.` : `Step 2. ${variable} equals ${finalVal}.`,
          formula: `${variable} = ${finalVal}`
        }
      ],
      finalAnswer: {
        headline: isUz ? 'Tenglamaning Javobi:' : 'Final Answer:',
        bullets: [`${variable} = ${finalVal} ⭐`],
        summary: isUz ? `Qadamma-qadam muvozanatlash orqali ${variable} ning qiymati ${finalVal} ga teng ekani aniqlandi.` : `Equation balanced, ${variable} = ${finalVal}.`
      },
      practiceChallenge: {
        question: isUz ? '2x + 4 = 14 tenglamaning ildizi nechaga teng?' : 'Solve 2x + 4 = 14:',
        options: ['x = 5', 'x = 7', 'x = 9', 'x = 4'],
        correctIndex: 0,
        explanation: isUz ? '14 dan 4 ni ayirsak 10, 2 ga bo‘lsak 5 chiqadi! Barakalla!' : '14 - 4 = 10, 10 / 2 = 5!'
      },
      followUps: [
        {
          q: isUz ? 'Javobni qanday tekshirish mumkin?' : 'How to double check?',
          a: isUz ? `Topilgan ${finalVal} sonini asl tenglamaga qo‘yib ko‘ramiz: ${coeff}(${finalVal}) ${sign} ${constNum} = ${rightNum}. Ikkala tomon teng chiqsa, yechim 100% to‘g‘ri!` : 'Plug the value back into the original formula!'
        }
      ]
    };
  }

  // 5. Default Universal Multi-Subject Solver (Uzbek / English)
  return {
    subject: subject || 'general',
    gradeLevel: isUz ? (isPro ? 'Akademik tahlil' : 'Umumiy dars') : 'General Study',
    extractedProblem: prompt,
    cheerTitle: isUz ? 'Savolingiz Qadamma-Qadam Tahlil Qilindi! 🌟💡' : 'Let\'s Solve This Step-by-Step! 🌟💡',
    encouragement: isUz 
      ? 'Juda qiziqarli va muhim savol! Keling, uni bosqichma-bosqich, eng aniq qoidalar bilan ko‘rib chiqamiz.'
      : 'You asked a fantastic question! Studying this step-by-step makes everything feel clear, friendly, and fun.',
    steps: [
      {
        stepNumber: 1,
        title: isUz ? 'Savolning tub mohiyatini aniqlash' : 'Understand the Core Idea',
        emoji: '🔍',
        explanation: isUz 
          ? `Bizdan so‘ralayotgan asosiy masala: "${prompt}". Birinchi navbatda berilgan shartlar, ma’lumotlar va asosiy qonuniyatlarni ajratib olamiz.`
          : `First, let's understand: "${prompt}". What are we being asked to calculate or explain?`,
        audioText: isUz ? `1-qadam. Savolning asosiy qoidalarini aniqlaymiz.` : `Step 1. Identify key problem facts.`,
        tip: isUz ? 'Asosiy kalit so‘zlarga e’tibor bering: Nega, Qanday, Hisoblang yoki Isbotlang.' : 'Focus on key terms.'
      },
      {
        stepNumber: 2,
        title: isUz ? 'Qoidalar va Formulalarni qo‘llash' : 'Apply Principles & Formulas',
        emoji: '🧩',
        explanation: isUz 
          ? `Mavzuga oid formulalar, nazariy bilimlar va mantiqiy bog‘liqliklarni ketma-ket joylashtiramiz. Har bir qadam asoslangan bo‘lishi lozim.`
          : `Organize the logic and apply the scientific rules to form a clear chain of reasoning.`,
        audioText: isUz ? `2-qadam. Formulalar va mantiqiy bog‘liqliklarni qo‘llaymiz.` : `Step 2. Connect the rules.`
      },
      {
        stepNumber: 3,
        title: isUz ? 'Yakuniy xulosani shakllantirish' : 'Formulate Final Clear Conclusion',
        emoji: '🎯',
        explanation: isUz 
          ? `Barcha qadamlarni birlashtirib, darslik yoki imtihon talablariga mos keladigan to‘liq, aniq javobni yozamiz.`
          : `Synthesize all clues to provide a complete, verified answer.`,
        audioText: isUz ? `3-qadam. To‘liq va aniq xulosa tayyor.` : `Step 3. Formulate the final clear solution.`
      }
    ],
    finalAnswer: {
      headline: isUz ? 'StudyBuddy Xulosasi:' : 'StudyBuddy Key Takeaway:',
      bullets: isUz 
        ? [`Mavzu: "${prompt}" bo‘yicha to‘liq tushuntirish berildi.`, 'Maslahat: Har doim yechimning "Nima uchun?" degan sababini yodda saqlang!']
        : [`Explanation: We unpacked "${prompt}".`, 'Pro-tip: Always remember the reason behind each step!'],
      summary: isUz ? 'Ushbu tushunchani mukammal o‘zlashtirdingiz! Qo‘shimcha savollaringiz bo‘lsa, pastdagi chat orqali so‘rashingiz mumkin.' : 'You mastered this concept!'
    },
    practiceChallenge: {
      question: isUz ? 'Murakkab vazifani yechishda eng samarali usul qaysi?' : 'What is the best strategy when tackling tricky problems?',
      options: [
        isUz ? 'Uni kichik bosqichlarga bo‘lib, qoidalarni ketma-ket qo‘llash' : 'Break it into smaller steps and understand the clues first',
        isUz ? 'O‘ylamasdan birinchi kelgan taxminni belgilash' : 'Guess randomly as fast as possible',
        isUz ? 'Savolni o‘qimasdan tashlab ketish' : 'Skip the question without reading it'
      ],
      correctIndex: 0,
      explanation: isUz ? 'Juda to‘g‘ri! Har qanday katta muammo mayda oson qadamlarga bo‘linganda darhol yechiladi!' : 'Exactly right!'
    },
    followUps: [
      {
        q: isUz ? 'Buni imtihon va darslarda qanday eslab qolish mumkin?' : 'How can I remember this for tests?',
        a: isUz ? 'Eng zo‘r usul — o‘rganganlaringizni do‘stingizga yoki daftaringizga o‘zingiz tushuntirib yozib berishdir. Shunda miya uni umrbod eslab qoladi!' : 'Teaching someone else is the superpower to remembering!'
      }
    ]
  };
}

/**
 * Real Gemini API integration (multilingual Uzbek/English)
 */
async function callGeminiApi({ apiKey, inputMode, textPrompt, imageData, subject, grade, language = 'uz', mode = 'pro' }) {
  const model = 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const isUz = language === 'uz';

  const systemInstruction = `You are StudyBuddy AI, an expert, warm, and highly capable homework tutor for ${grade} studying ${subject}.
Mode: ${mode === 'pro' ? 'Academic / High School & University Exam Level' : 'Friendly, accessible and engaging'}.
LANGUAGE: You MUST output all explanations, titles, and text in ${isUz ? 'UZBEK (O\'zbek tili, Lotin alifbosi)' : 'ENGLISH'}.
Return ONLY valid, parseable JSON matching this schema with NO markdown code fences or backticks:
{
  "subject": "${subject}",
  "gradeLevel": "${grade}",
  "extractedProblem": "string",
  "cheerTitle": "string with emojis",
  "encouragement": "encouragement text",
  "steps": [
    {
      "stepNumber": 1,
      "title": "short step title",
      "emoji": "emoji",
      "explanation": "clear, detailed, accurate explanation",
      "audioText": "sentence for text-to-speech",
      "formula": "optional formula",
      "tip": "optional tip"
    }
  ],
  "finalAnswer": {
    "headline": "string",
    "bullets": ["bullet 1", "bullet 2"],
    "summary": "summary string"
  },
  "practiceChallenge": {
    "question": "test multiple choice question",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "explanation string"
  },
  "followUps": [
    { "q": "question", "a": "answer" }
  ]
}`;

  const contents = [];
  const parts = [{ text: systemInstruction }];

  if (inputMode === 'image' && imageData) {
    if (imageData.startsWith('data:image')) {
      const match = imageData.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        parts.push({
          inline_data: {
            mime_type: match[1],
            data: match[2]
          }
        });
      }
    }
    parts.push({ text: `Please solve this homework image in ${isUz ? 'Uzbek' : 'English'}. Question context: ${textPrompt || 'Solve the homework page shown.'}` });
  } else {
    parts.push({ text: `Solve this homework in ${isUz ? 'Uzbek' : 'English'}: ${textPrompt}` });
  }

  contents.push({ role: 'user', parts });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.3,
        response_mime_type: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) throw new Error('No content from Gemini API');

  const cleanJson = textOutput.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleanJson);
}

/**
 * Real OpenAI API integration (multilingual Uzbek/English)
 */
async function callOpenAiApi({ apiKey, inputMode, textPrompt, imageData, subject, grade, language = 'uz' }) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const isUz = language === 'uz';

  const systemPrompt = `You are StudyBuddy AI, an expert homework tutor for ${grade} studying ${subject}.
LANGUAGE: You MUST output all text in ${isUz ? 'UZBEK (O\'zbek tili, Lotin alifbosi)' : 'ENGLISH'}.
Return ONLY valid JSON matching this schema:
{
  "subject": "${subject}",
  "gradeLevel": "${grade}",
  "extractedProblem": "string",
  "cheerTitle": "string with emojis",
  "encouragement": "encouragement string",
  "steps": [
    {
      "stepNumber": 1,
      "title": "string",
      "emoji": "emoji",
      "explanation": "string",
      "audioText": "string",
      "formula": "string",
      "tip": "string"
    }
  ],
  "finalAnswer": {
    "headline": "string",
    "bullets": ["string"],
    "summary": "string"
  },
  "practiceChallenge": {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "string"
  },
  "followUps": [
    { "q": "string", "a": "string" }
  ]
}`;

  const messages = [{ role: 'system', content: systemPrompt }];

  if (inputMode === 'image' && imageData) {
    messages.push({
      role: 'user',
      content: [
        { type: 'text', text: `Solve this homework in ${isUz ? 'Uzbek' : 'English'}: ${textPrompt || ''}` },
        { type: 'image_url', image_url: { url: imageData } }
      ]
    });
  } else {
    messages.push({
      role: 'user',
      content: `Solve this homework in ${isUz ? 'Uzbek' : 'English'}: ${textPrompt}`
    });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  return JSON.parse(content);
}

/**
 * Handle Follow-up chat questions with the student in Uzbek & English
 */
export async function answerFollowUpQuestion({ question, currentSolution, chatHistory = [], apiKeys = {}, language = 'uz' }) {
  const isUz = language === 'uz';
  const qLower = question.toLowerCase();

  // If Gemini API is available
  if (apiKeys?.geminiApiKey && apiKeys.geminiApiKey.trim() !== '') {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.geminiApiKey}`;
      const prompt = `You are StudyBuddy AI, a friendly academic tutor replying to a student.
LANGUAGE: Write your response in ${isUz ? 'UZBEK (O\'zbek tili, Lotin yozuvi)' : 'ENGLISH'}.
Problem: ${currentSolution?.extractedProblem || ''}
Solution: ${currentSolution?.finalAnswer?.summary || ''}
Student's question: "${question}"

Provide a warm, highly clear 2-4 sentence explanation. Include 1 or 2 relevant emojis!`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch {
      // Fallback
    }
  }

  await sleep(500);

  if (isUz) {
    if (qLower.includes('sodda') || qLower.includes('oson') || qLower.includes('tushunmadim')) {
      return `Albatta! 🧸 Tasavvur qiling: sizda 1 quti shirinlik bor. Uni do‘stlaringiz bilan teng bo‘lishish uchun shunchaki donalab hisoblab chiqasiz. Bu yerda ham xuddi shunday: katta masalani mayda oson bo‘laklarga ajratdik! Hammasi oddiy! 🍬✨`;
    }
    if (qLower.includes('nega') || qLower.includes('2') || qLower.includes('bosqich')) {
      return `Juda o‘rinli savol! 💡 Ushbu bosqichni bajarganimiz sababi — tenglamani keraksiz sonlardan tozalab, faqat asosiy noma’lumni ko‘rish edi. Xuddi bug‘langan oynani artib, ko‘zguda o‘zingizni ko‘rgandek! 🪞🧼`;
    }
    if (qLower.includes('misol') || qLower.includes('amaliyot') || qLower.includes('yana')) {
      return `Izlanuvchanligingiz tahsinga sazovor! 🌟 Yuqoridagi "O‘xshash mashqni bajarib ko‘rish" tugmasini bosib ko‘ring yoki kundalik hayotdagi do‘kondan xarid qilish misolida o‘ylab ko‘ring! 🎯🛒`;
    }
    if (qLower.includes('tez') || qLower.includes('sir') || qLower.includes('usul')) {
      return `Ha, maxsus tezkor usuli bor! ⚡ Bir necha bor mashq qilganingizdan so‘ng, qoralama yozmasdan, formulani ko‘rishingiz bilan miyangizda 3 soniyada javob hosil bo‘ladi! Ammo imtihonlarda har bir qadamni yozish to‘liq ball keltiradi! 📝🏆`;
    }
    return `Ajoyib fikr! 🌟 Dars qilishda har qanday xato — bu miyangizning yanada kuchliroq bo‘lib rivojlanayotganidan dalolat beradi! Yana qaysi qadamni birgalikda ko‘rib chiqaylik? 🦉💪`;
  }

  // English heuristic
  if (qLower.includes('simpler') || qLower.includes('easier')) {
    return `You got it! 🧸 Imagine you have a box of cookies and share them equally one by one. That's all we did here: taking bite-sized steps so nothing gets confusing! 🍪✨`;
  }
  return `That's a fantastic thought! 🌟 Breaking it into steps makes any problem conquerable. Which part would you like us to dive into next? 🦉💪`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
