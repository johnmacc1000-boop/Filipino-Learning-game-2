console.log('script.js loaded');
const words = ['mahal', 'ganda', 'talo', 'araw', 'gabi'];
const MAX_SCORE = 100;
const TEACHER_PASSWORD = 'teacher123';
const STUDENT_LIST_KEY = 'filipino_student_list';

const assessmentQuestions = {
  level1: [
    {
      question: "Si Ana ay nagbasa ng aklat sa silid-aklatan bago magtanghali.\n\n1. Saan nagbasa si Ana?",
      options: {
        A: "Bahay",
        B: "Silid-aklatan",
        C: "Paaralan",
        D: "Parke"
      },
      correct: "B"
    },
    {
      question: "Ang mga ibon ay lumilipad sa himpapawid tuwing umaga.\n\n2. Ano ang ginagawa ng mga ibon?",
      options: {
        A: "Kumakain",
        B: "Lumilipad",
        C: "Natutulog",
        D: "Lumalangoy"
      },
      correct: "B"
    },
    {
      question: "Si Mang Pedro ay naglalakad sa bukid upang tingnan ang kanyang mga tanim.\n\n3. Ano ang ginagawa ni Mang Pedro?",
      options: {
        A: "Nagluluto",
        B: "Naglalakad",
        C: "Natutulog",
        D: "Nagtuturo"
      },
      correct: "B"
    },
    {
      question: "Tuwing Sabado, nagluluto si Aling Nena ng adobo sa kanyang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong. Pinupunasan niya ang mga istante at inaayos ang mga produkto bago magbukas ang tindahan. Pagkatapos ay naghahanda rin siya ng pagkain para sa kanyang pamilya.\n\n4. Ano ang niluluto ni Aling Nena?",
      options: {
        A: "Sinigang",
        B: "Adobo",
        C: "Tinola",
        D: "Pancit"
      },
      correct: "B"
    },
    {
      question: "Tuwing Sabado, nagluluto si Aling Nena ng adobo sa kanyang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong. Pinupunasan niya ang mga istante at inaayos ang mga produkto bago magbukas ang tindahan. Pagkatapos ay naghahanda rin siya ng pagkain para sa kanyang pamilya.\n\n5. Sino ang natututo habang nagluluto siya?",
      options: {
        A: "Mga bata",
        B: "Mga kaibigan",
        C: "Mga kapitbahay",
        D: "Mga guro"
      },
      correct: "A"
    },
    {
      question: "Tuwing Sabado, nagluluto si Aling Nena ng adobo sa kanyang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong. Pinupunasan niya ang mga istante at inaayos ang mga produkto bago magbukas ang tindahan. Pagkatapos ay naghahanda rin siya ng pagkain para sa kanyang pamilya.\n\n6. Ano ang ginagawa niya sa tindahan bago magbukas?",
      options: {
        A: "Nagluluto",
        B: "Pinupunasan at inaayos ang produkto",
        C: "Naglalaro",
        D: "Natutulog"
      },
      correct: "B"
    },
    {
      question: "Tuwing Sabado, nagluluto si Aling Nena ng adobo sa kanyang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong. Pinupunasan niya ang mga istante at inaayos ang mga produkto bago magbukas ang tindahan. Pagkatapos ay naghahanda rin siya ng pagkain para sa kanyang pamilya.\n\n7. Ano pa ang inihahanda ni Aling Nena?",
      options: {
        A: "Pagkain para sa pamilya",
        B: "Pagkain para sa mga kapitbahay",
        C: "Pagkain para sa tindahan",
        D: "Pagkain para sa kaibigan"
      },
      correct: "A"
    },
    {
      question: "Binigyan tayo ng Diyos ng bibig para makapagsalita at utak para makapag isip. Ngunit, naisip ko, paano kaya ang mga piping hindi naisasalita ang kanilang mga saloobin? Paano kaya nila sasabihin sa mga tao sa paligid nila ang kanilang mga hinaing? Salamat sa internet! Ito ang nagsilbing tulay ko upang maipahayag sa aking mga kausap ang ilang mga bagay na hindi ko kayang maiparating nang tuwiran. Dito namin ipinapakalat ang mga nalilikha naming mga tula, sanaysay, at artikulong magbubukas ng isip sa kapwa kabataan namin. Para akong piping natutong magsalita. Salamat kay Mama sapagkat natuklasan kong maging Mendiola ang internet na naging dahilan sa pagsasatinig ng aking mga saloobin.\n\n9. Ano ang nagsilbing tulay ng may akda upang maipahayag ang kanyang saloobin?",
      options: {
        A: "Telepono",
        B: "Internet",
        C: "Radyo",
        D: "Telebisyon"
      },
      correct: "B"
    },
    {
      question: "Binigyan tayo ng Diyos ng bibig para makapagsalita at utak para makapag isip. Ngunit, naisip ko, paano kaya ang mga piping hindi naisasalita ang kanilang mga saloobin? Paano kaya nila sasabihin sa mga tao sa paligid nila ang kanilang mga hinaing? Salamat sa internet! Ito ang nagsilbing tulay ko upang maipahayag sa aking mga kausap ang ilang mga bagay na hindi ko kayang maiparating nang tuwiran. Dito namin ipinapakalat ang mga nalilikha naming mga tula, sanaysay, at artikulong magbubukas ng isip sa kapwa kabataan namin. Para akong piping natutong magsalita. Salamat kay Mama sapagkat natuklasan kong maging Mendiola ang internet na naging dahilan sa pagsasatinig ng aking mga saloobin.\n\n10. Ano ang pinagkakalooban ng Diyos ayon sa sanaysay?",
      options: {
        A: "Bibig at utak para magsalita at mag isip",
        B: "Kayamanan at kapangyarihan",
        C: "Isang tahanan",
        D: "Aklat at pera"
      },
      correct: "A"
    },
    {
      question: "Binigyan tayo ng Diyos ng bibig para makapagsalita at utak para makapag isip. Ngunit, naisip ko, paano kaya ang mga piping hindi naisasalita ang kanilang mga saloobin? Paano kaya nila sasabihin sa mga tao sa paligid nila ang kanilang mga hinaing? Salamat sa internet! Ito ang nagsilbing tulay ko upang maipahayag sa aking mga kausap ang ilang mga bagay na hindi ko kayang maiparating nang tuwiran. Dito namin ipinapakalat ang mga nalilikha naming mga tula, sanaysay, at artikulong magbubukas ng isip sa kapwa kabataan namin. Para akong piping natutong magsalita. Salamat kay Mama sapagkat natuklasan kong maging Mendiola ang internet na naging dahilan sa pagsasatinig ng aking mga saloobin.\n\n11. Ano ang tinutukoy ng may akda na kayang ipahayag gamit ang internet?",
      options: {
        A: "Laro at musika",
        B: "Mga saloobin at opinyon",
        C: "Pagluluto",
        D: "Libangan lamang"
      },
      correct: "B"
    },
    {
      question: "Binigyan tayo ng Diyos ng bibig para makapagsalita at utak para makapag isip. Ngunit, naisip ko, paano kaya ang mga piping hindi naisasalita ang kanilang mga saloobin? Paano kaya nila sasabihin sa mga tao sa paligid nila ang kanilang mga hinaing? Salamat sa internet! Ito ang nagsilbing tulay ko upang maipahayag sa aking mga kausap ang ilang mga bagay na hindi ko kayang maiparating nang tuwiran. Dito namin ipinapakalat ang mga nalilikha naming mga tula, sanaysay, at artikulong magbubukas ng isip sa kapwa kabataan namin. Para akong piping natutong magsalita. Salamat kay Mama sapagkat natuklasan kong maging Mendiola ang internet na naging dahilan sa pagsasatinig ng aking mga saloobin.\n\n12. Bakit pinasalamatan ng may akda ang kanyang Mama?",
      options: {
        A: "Dahil sa pagkain",
        B: "Dahil naging dahilan na maging Mendiola ang internet para sa kanya",
        C: "Dahil sa pera",
        D: "Dahil sa paglalakbay"
      },
      correct: "B"
    },
    {
      question: "“Saan ka pupunta, O, Sundalong Patpat,” tanong ng sampalok.\n\n“Hahanapin ko ang nawawalang ulan,” sagot ng Sundalong Patpat habang inaayos ang papel na sombrero.\n\n“Pero hindi hinahanap ang ulan,” nagtatakang sabi ng sampalok.\n\n“Kung gayon, aalamin ko kung bakit matagal nang ayaw dumalaw ng ulan,” sagot ng sundalo at pinatakbo ang kaniyang kabayong payat.\n\n13. Sino ang nagtanong sa Sundalong Patpat?",
      options: {
        A: "Manok",
        B: "Bundok",
        C: "Sampalok",
        D: "Ulap"
      },
      correct: "C"
    },
    {
      question: "“Saan ka pupunta, O, Sundalong Patpat,” tanong ng sampalok.\n\n“Hahanapin ko ang nawawalang ulan,” sagot ng Sundalong Patpat habang inaayos ang papel na sombrero.\n\n“Pero hindi hinahanap ang ulan,” nagtatakang sabi ng sampalok.\n\n“Kung gayon, aalamin ko kung bakit matagal nang ayaw dumalaw ng ulan,” sagot ng sundalo at pinatakbo ang kaniyang kabayong payat.\n\n14. Ano ang sinasabi ng Sundalong Patpat na kanyang hinahanap?",
      options: {
        A: "Kayamanan",
        B: "Nawawalang ulan",
        C: "Ginto",
        D: "Kaibigan"
      },
      correct: "B"
    },
    {
      question: "“Saan ka pupunta, O, Sundalong Patpat,” tanong ng sampalok.\n\n“Hahanapin ko ang nawawalang ulan,” sagot ng Sundalong Patpat habang inaayos ang papel na sombrero.\n\n“Pero hindi hinahanap ang ulan,” nagtatakang sabi ng sampalok.\n\n“Kung gayon, aalamin ko kung bakit matagal nang ayaw dumalaw ng ulan,” sagot ng sundalo at pinatakbo ang kaniyang kabayong payat.\n\n15. Ano ang sinabi ng sampalok tungkol sa ulan?",
      options: {
        A: "Ito ay laging narito",
        B: "Hindi ito hinahanap",
        C: "Ito ay madaling makita",
        D: "Ito ay kanyang dala"
      },
      correct: "B"
    },
    {
      question: "Maganda at payapa ang ilog at ang dagat sa bayan ng Laguna noong araw. Ang mga bangkang yari sa kahoy ay ginagamit sa paglalakbay at pangingisda, at madalas silang sumasakay papunta sa kabilang pampang.\n\nIsang araw, nakasakay si Jose Rizal kasama ang kanyang pamilya at mga kaibigan sa isang bangka habang sila ay naglalakbay sa Laguna de Bay. Habang naglalaro at nakatitig sa tubig, nahulog ang isa niyang tsinelas sa gitna ng lawa at inanod kaagad ng agos.\n\nSinubukan niyang abutin ito, ngunit hindi na niya nahabol dahil mabilis ang pag agos ng tubig. Napatingin siya sa kanyang nanay at, sa hindi inaasahang kilos, itinapon niya rin ang kabilang tsinelas sa tubig.\n\nNag tataka ang kanyang mga kasama at nagtanong, “Bakit mo itinapon ang iyong isa pang tsinelas?”\n\nSagot ni Jose, “Isang tsinelas ang nawala na, at wala rin itong silbi kung wala ang kapareha. Kung sino mang makakita ng pares nito ay magagamit niya ito ng mabuti.”\n\nNapatingin ulit siya sa kanyang ina at marahil, naunawaan niya ang dahilan sa likod ng kakaibang kilos ng batang si Jose.\n\n16. Ano ang ginamit na sasakyan ni Jose Rizal at ng kanyang pamilya sa paglalakbay?",
      options: {
        A: "Kalesa",
        B: "Bangka",
        C: "Tren",
        D: "Eroplano"
      },
      correct: "B"
    },
    {
      question: "Maganda at payapa ang ilog at ang dagat sa bayan ng Laguna noong araw. Ang mga bangkang yari sa kahoy ay ginagamit sa paglalakbay at pangingisda, at madalas silang sumasakay papunta sa kabilang pampang.\n\nIsang araw, nakasakay si Jose Rizal kasama ang kanyang pamilya at mga kaibigan sa isang bangka habang sila ay naglalakbay sa Laguna de Bay. Habang naglalaro at nakatitig sa tubig, nahulog ang isa niyang tsinelas sa gitna ng lawa at inanod kaagad ng agos.\n\nSinubukan niyang abutin ito, ngunit hindi na niya nahabol dahil mabilis ang pag agos ng tubig. Napatingin siya sa kanyang nanay at, sa hindi inaasahang kilos, itinapon niya rin ang kabilang tsinelas sa tubig.\n\nNag tataka ang kanyang mga kasama at nagtanong, “Bakit mo itinapon ang iyong isa pang tsinelas?”\n\nSagot ni Jose, “Isang tsinelas ang nawala na, at wala rin itong silbi kung wala ang kapareha. Kung sino mang makakita ng pares nito ay magagamit niya ito ng mabuti.”\n\nNapatingin ulit siya sa kanyang ina at marahil, naunawaan niya ang dahilan sa likod ng kakaibang kilos ng batang si Jose.\n\n17. Ano ang nahulog sa tubig habang sila ay nasa bangka?",
      options: {
        A: "Isang payong",
        B: "Isang tsinelas",
        C: "Isang sumbrero",
        D: "Isang bag"
      },
      correct: "B"
    },
    {
      question: "Maganda at payapa ang ilog at ang dagat sa bayan ng Laguna noong araw. Ang mga bangkang yari sa kahoy ay ginagamit sa paglalakbay at pangingisda, at madalas silang sumasakay papunta sa kabilang pampang.\n\nIsang araw, nakasakay si Jose Rizal kasama ang kanyang pamilya at mga kaibigan sa isang bangka habang sila ay naglalakbay sa Laguna de Bay. Habang naglalaro at nakatitig sa tubig, nahulog ang isa niyang tsinelas sa gitna ng lawa at inanod kaagad ng agos.\n\nSinubukan niyang abutin ito, ngunit hindi na niya nahabol dahil mabilis ang pag agos ng tubig. Napatingin siya sa kanyang nanay at, sa hindi inaasahang kilos, itinapon niya rin ang kabilang tsinelas sa tubig.\n\nNag tataka ang kanyang mga kasama at nagtanong, “Bakit mo itinapon ang iyong isa pang tsinelas?”\n\nSagot ni Jose, “Isang tsinelas ang nawala na, at wala rin itong silbi kung wala ang kapareha. Kung sino mang makakita ng pares nito ay magagamit niya ito ng mabuti.”\n\nNapatingin ulit siya sa kanyang ina at marahil, naunawaan niya ang dahilan sa likod ng kakaibang kilos ng batang si Jose.\n\n18. Sino ang nagtatanong tungkol sa pag itapon ng tsinelas?",
      options: {
        A: "Ang guro",
        B: "Ang nanay ni Jose",
        C: "Ang kasama at mga kaibigan",
        D: "Ang iba pang bata"
      },
      correct: "C"
    },
    {
      question: "Maganda at payapa ang ilog at ang dagat sa bayan ng Laguna noong araw. Ang mga bangkang yari sa kahoy ay ginagamit sa paglalakbay at pangingisda, at madalas silang sumasakay papunta sa kabilang pampang.\n\nIsang araw, nakasakay si Jose Rizal kasama ang kanyang pamilya at mga kaibigan sa isang bangka habang sila ay naglalakbay sa Laguna de Bay. Habang naglalaro at nakatitig sa tubig, nahulog ang isa niyang tsinelas sa gitna ng lawa at inanod kaagad ng agos.\n\nSinubukan niyang abutin ito, ngunit hindi na niya nahabol dahil mabilis ang pag agos ng tubig. Napatingin siya sa kanyang nanay at, sa hindi inaasahang kilos, itinapon niya rin ang kabilang tsinelas sa tubig.\n\nNag tataka ang kanyang mga kasama at nagtanong, “Bakit mo itinapon ang iyong isa pang tsinelas?”\n\nSagot ni Jose, “Isang tsinelas ang nawala na, at wala rin itong silbi kung wala ang kapareha. Kung sino mang makakita ng pares nito ay magagamit niya ito ng mabuti.”\n\nNapatingin ulit siya sa kanyang ina at marahil, naunawaan niya ang dahilan sa likod ng kakaibang kilos ng batang si Jose.\n\n19. Ano ang dahilan ni Jose kung bakit niya itinapon ang pangalawang tsinelas?",
      options: {
        A: "Para siya ay mag laro",
        B: "Para mas madaling makasama ang agos",
        C: "Para magamit ito ng makakakita ng pares nito",
        D: "Para sa kanyang ina"
      },
      correct: "C"
    },
    {
      question: "Maganda at payapa ang ilog at ang dagat sa bayan ng Laguna noong araw. Ang mga bangkang yari sa kahoy ay ginagamit sa paglalakbay at pangingisda, at madalas silang sumasakay papunta sa kabilang pampang.\n\nIsang araw, nakasakay si Jose Rizal kasama ang kanyang pamilya at mga kaibigan sa isang bangka habang sila ay naglalakbay sa Laguna de Bay. Habang naglalaro at nakatitig sa tubig, nahulog ang isa niyang tsinelas sa gitna ng lawa at inanod kaagad ng agos.\n\nSinubukan niyang abutin ito, ngunit hindi na niya nahabol dahil mabilis ang pag agos ng tubig. Napatingin siya sa kanyang nanay at, sa hindi inaasahang kilos, itinapon niya rin ang kabilang tsinelas sa tubig.\n\nNag tataka ang kanyang mga kasama at nagtanong, “Bakit mo itinapon ang iyong isa pang tsinelas?”\n\nSagot ni Jose, “Isang tsinelas ang nawala na, at wala rin itong silbi kung wala ang kapareha. Kung sino mang makakita ng pares nito ay magagamit niya ito ng mabuti.”\n\nNapatingin ulit siya sa kanyang ina at marahil, naunawaan niya ang dahilan sa likod ng kakaibang kilos ng batang si Jose.\n\n20. Ano ang ibig sabihin ng kilos ni Jose sa anekdota?",
      options: {
        A: "Siya ay tamad",
        B: "Siya ay makasarili",
        C: "Siya ay praktikal at iniisip ang kapakanan ng iba",
        D: "Siya ay walang pakialam"
      },
      correct: "C"
    }
  ],
  level2: [],
  level3: []
};

let idx = 0;
let score = 0;
let badges = new Set();
let currentStudent = null;
let currentQuestionIndex = 0;
let assessmentScore = 0;
let currentLevel = null;
let assessmentScores = { level1: 0, level2: 0, level3: 0 };

function sanitizeId(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function getAllStudentIds() {
  const data = localStorage.getItem(STUDENT_LIST_KEY);
  return data ? JSON.parse(data) : [];
}

function setAllStudentIds(ids) {
  localStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(ids));
}

function getStudentKey(id) {
  return `filipino_student_${id}`;
}

function saveStudentProgress() {
  if (!currentStudent) return;
  const id = sanitizeId(currentStudent);
  const payload = {
    name: currentStudent,
    idx,
    score,
    badges: [...badges],
    assessmentScores,
    ref: document.getElementById('displayRef').innerText,
    section: document.getElementById('displaySection').innerText,
    updated: new Date().toISOString(),
  };
  localStorage.setItem(getStudentKey(id), JSON.stringify(payload));

  const ids = getAllStudentIds();
  if (!ids.includes(id)) {
    ids.push(id);
    setAllStudentIds(ids);
  }
}

function loadStudentProgress(name) {
  currentStudent = name;
  idx = 0;
  score = 0;
  badges = new Set();
  assessmentScores = { level1: 0, level2: 0, level3: 0 };

  const id = sanitizeId(name);
  const raw = localStorage.getItem(getStudentKey(id));
  if (raw) {
    try {
      const data = JSON.parse(raw);
      idx = data.idx ?? 0;
      score = data.score ?? 0;
      badges = new Set(data.badges ?? []);
      assessmentScores = data.assessmentScores ?? { level1: 0, level2: 0, level3: 0 };
      // Load additional info
      document.getElementById('displayName').innerText = data.name || name;
      document.getElementById('displayRef').innerText = data.ref || '';
      document.getElementById('displaySection').innerText = data.section || '';
    } catch (e) {
      console.error('Could not parse student data', e);
    }
  } else {
    // If no data, set defaults
    document.getElementById('displayName').innerText = name;
    document.getElementById('displayRef').innerText = '';
    document.getElementById('displaySection').innerText = '';
  }
  document.getElementById('studentTitle').innerText = `Student: ${currentStudent}`;
  updateStatus();
}

function showWord() {
  if (currentStudent) {
    document.getElementById('word').innerText = words[idx];
    updateStatus();
  }
}

function updateStatus() {
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('badges').innerText =
    'Badges: ' + (badges.size ? [...badges].join(', ') : 'None');

  // Update progress bar
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  if (fill && text) {
    const percentage = Math.min(100, Math.round((score / MAX_SCORE) * 100));
    fill.style.width = percentage + '%';
    text.innerText = `${score} / ${MAX_SCORE}`;
  }
}

function checkBadges() {
  if (score >= 30) badges.add('Word Warrior');
  if (score >= 60) badges.add('Speech Hero');
  if (score >= 100) badges.add('Master Reader');
  updateStatus();
}

function nextWord() {
  idx = (idx + 1) % words.length;
  showWord();
}

function startSpeech() {
  const resultBox = document.getElementById('result');
  resultBox.innerText = 'Listening...';

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    resultBox.innerText = 'Speech recognition not supported in this browser.';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'fil-PH';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    resultBox.innerText = 'Microphone started...';
  };

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.trim().toLowerCase();
    const word = document.getElementById('word').innerText.trim().toLowerCase();

    if (spoken === word) {
      score = Math.min(MAX_SCORE, score + 10);
      resultBox.innerText = 'Correct! +' + 10 + ' points';
      checkBadges();
      saveStudentProgress();
    } else {
      resultBox.innerText = 'You said: ' + spoken + ' (expected: ' + word + ')';
    }
    nextWord();
  };

  recognition.onerror = (event) => {
    resultBox.innerText = 'Error: ' + event.error;
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
  };

  recognition.start();
}

function showLogin() {
  const loginArea = document.getElementById('loginArea');
  const studentArea = document.getElementById('studentArea');
  const teacherArea = document.getElementById('teacherArea');
  if (!loginArea || !studentArea || !teacherArea) {
    console.warn('Some UI sections are missing; cannot show login.');
    return;
  }
  loginArea.style.display = 'block';
  studentArea.style.display = 'none';
  teacherArea.style.display = 'none';
}

function showStudentHome() {
  const home = document.getElementById('studentHome');
  const practice = document.getElementById('studentPractice');
  const assessment = document.getElementById('studentAssessment');
  if (!home || !practice || !assessment) {
    console.warn('Student home, practice, or assessment view missing.');
    return;
  }
  home.style.display = 'block';
  practice.style.display = 'none';
  assessment.style.display = 'none';
  const result = document.getElementById('result');
  if (result) result.innerText = 'Press "Mic record" to start practicing.';
}

function showStudentPractice() {
  const home = document.getElementById('studentHome');
  const practice = document.getElementById('studentPractice');
  const assessment = document.getElementById('studentAssessment');
  if (!home || !practice || !assessment) {
    console.warn('Student home, practice, or assessment view missing.');
    return;
  }
  home.style.display = 'none';
  practice.style.display = 'block';
  assessment.style.display = 'none';
  showWord();
  updateStatus();
}

function showStudentArea() {
  const loginArea = document.getElementById('loginArea');
  const studentArea = document.getElementById('studentArea');
  const teacherArea = document.getElementById('teacherArea');
  if (!loginArea || !studentArea || !teacherArea) {
    console.warn('Some UI sections are missing; cannot show student area.');
    return;
  }
  loginArea.style.display = 'none';
  studentArea.style.display = 'block';
  teacherArea.style.display = 'none';
  showStudentHome();
}

function showStudentAssessment() {
  const home = document.getElementById('studentHome');
  const assessment = document.getElementById('studentAssessment');
  if (!home || !assessment) {
    console.warn('Student home or assessment view missing.');
    return;
  }
  home.style.display = 'none';
  assessment.style.display = 'block';
  document.getElementById('levelSelection').style.display = 'block';
  document.getElementById('assessmentTitle').style.display = 'none';
  document.getElementById('questionContainer').style.display = 'none';
  document.getElementById('submitAnswerBtn').style.display = 'none';
  document.getElementById('nextQuestionBtn').style.display = 'none';
  document.getElementById('backToLevelsBtn').style.display = 'none';
}

function selectLevel(level) {
  currentLevel = level;
  const questions = assessmentQuestions[level];
  if (!questions || questions.length === 0) {
    alert(`No questions available for ${level}.`);
    return;
  }
  document.getElementById('levelSelection').style.display = 'none';
  document.getElementById('assessmentTitle').style.display = 'block';
  document.getElementById('currentLevelSpan').innerText = level.replace('level', '');
  document.getElementById('questionContainer').style.display = 'block';
  document.getElementById('submitAnswerBtn').style.display = 'inline-block';
  document.getElementById('backToLevelsBtn').style.display = 'inline-block';
  currentQuestionIndex = 0;
  assessmentScore = 0;
  showQuestion();
}

function backToLevels() {
  document.getElementById('levelSelection').style.display = 'block';
  document.getElementById('assessmentTitle').style.display = 'none';
  document.getElementById('questionContainer').style.display = 'none';
  document.getElementById('submitAnswerBtn').style.display = 'none';
  document.getElementById('nextQuestionBtn').style.display = 'none';
  document.getElementById('backToLevelsBtn').style.display = 'none';
  document.getElementById('assessmentResult').innerText = '';
}

function showQuestion() {
  const q = assessmentQuestions[currentLevel][currentQuestionIndex];
  document.getElementById('questionText').innerText = q.question;
  document.getElementById('optionA').innerText = q.options.A;
  document.getElementById('optionB').innerText = q.options.B;
  document.getElementById('optionC').innerText = q.options.C;
  document.getElementById('optionD').innerText = q.options.D;
  document.getElementById('assessmentResult').innerText = '';
  document.getElementById('nextQuestionBtn').style.display = 'none';
  // Clear radio selection
  const radios = document.querySelectorAll('input[name="option"]');
  radios.forEach(r => r.checked = false);
}

function checkAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('Please select an answer.');
    return;
  }
  const answer = selected.value;
  const correct = assessmentQuestions[currentLevel][currentQuestionIndex].correct;
  if (answer === correct) {
    assessmentScore += 10;
    document.getElementById('assessmentResult').innerText = 'Correct!';
  } else {
    document.getElementById('assessmentResult').innerText = 'Incorrect. The correct answer is ' + correct + '.';
  }
  document.getElementById('nextQuestionBtn').style.display = 'inline-block';
  document.getElementById('submitAnswerBtn').style.display = 'none';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < assessmentQuestions[currentLevel].length) {
    showQuestion();
    document.getElementById('submitAnswerBtn').style.display = 'inline-block';
  } else {
    // End of quiz
    assessmentScores[currentLevel] = assessmentScore;
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('assessmentResult').innerText = `Assessment complete! Your score for Level ${currentLevel.replace('level', '')}: ${assessmentScore} / ${assessmentQuestions[currentLevel].length * 10}`;
    // Add to main score
    score = Math.min(MAX_SCORE, score + assessmentScore);
    updateStatus();
    saveStudentProgress();
    document.getElementById('nextQuestionBtn').style.display = 'none';
  }
}

function showTeacherArea() {
  const loginArea = document.getElementById('loginArea');
  const studentArea = document.getElementById('studentArea');
  const teacherArea = document.getElementById('teacherArea');
  if (!loginArea || !studentArea || !teacherArea) {
    console.warn('Some UI sections are missing; cannot show teacher area.');
    return;
  }
  loginArea.style.display = 'none';
  studentArea.style.display = 'none';
  teacherArea.style.display = 'block';
  renderTeacherTable();
}

function renderTeacherTable() {
  const table = document.getElementById('studentTable');
  const ids = getAllStudentIds();
  if (!ids.length) {
    document.getElementById('teacherResult').innerText = 'No students registered yet.';
    table.innerHTML = '';
    return;
  }

  document.getElementById('teacherResult').innerText = 'Showing student progress from this browser.';
  let html = '<tr><th>Name</th><th>Score</th><th>Badges</th><th>Level 1</th><th>Level 2</th><th>Level 3</th><th>Updated</th></tr>';

  ids.forEach((id) => {
    const raw = localStorage.getItem(getStudentKey(id));
    if (!raw) return;
    let item;
    try {
      item = JSON.parse(raw);
    } catch (e) {
      return;
    }
    const levels = item.assessmentScores || { level1: 0, level2: 0, level3: 0 };
    html += `<tr><td>${item.name}</td><td>${item.score}</td><td>${(item.badges||[]).join(', ') || 'None'}</td><td>${levels.level1}</td><td>${levels.level2}</td><td>${levels.level3}</td><td>${item.updated ?? 'N/A'}</td></tr>`;
  });

  table.innerHTML = html;
}

function resetStudentProgress() {
  idx = 0;
  score = 0;
  badges = new Set();
  assessmentScores = { level1: 0, level2: 0, level3: 0 };
  saveStudentProgress();
  showWord();
  updateStatus();
  document.getElementById('result').innerText = 'Progress reset.';
}

function exportStudentProgress() {
  if (!currentStudent) return;
  const id = sanitizeId(currentStudent);
  const raw = localStorage.getItem(getStudentKey(id));
  if (!raw) {
    alert('No progress to export.');
    return;
  }
  const data = JSON.parse(raw);
  const levels = data.assessmentScores || { level1: 0, level2: 0, level3: 0 };
  const text = `Student: ${data.name}\nScore: ${data.score}\nBadges: ${(data.badges||[]).join(', ') || 'None'}\nLevel 1: ${levels.level1}\nLevel 2: ${levels.level2}\nLevel 3: ${levels.level3}\nUpdated: ${data.updated}`;
  navigator.clipboard.writeText(text).then(() => {
    alert('Progress copied to clipboard. Paste it to submit to teacher.');
  }).catch(() => {
    alert('Copy failed. Here is your progress:\n' + text);
  });
}

function exportCsv() {
  const ids = getAllStudentIds();
  if (!ids.length) {
    alert('No student progress to export yet.');
    return;
  }

  let csv = 'name,score,badges,level1,level2,level3,updated\n';
  ids.forEach((id) => {
    const raw = localStorage.getItem(getStudentKey(id));
    if (!raw) return;
    try {
      const item = JSON.parse(raw);
      const levels = item.assessmentScores || { level1: 0, level2: 0, level3: 0 };
      const row = `${item.name},${item.score},"${(item.badges||[]).join('; ')}",${levels.level1},${levels.level2},${levels.level3},${item.updated}`;
      csv += row + '\n';
    } catch (e) {}
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'student_progress.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// Event wiring
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, wiring buttons');
  const allIds = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
  console.log('All IDs in DOM:', allIds.join(', '));
  console.log('Available elements:', {
    loginArea: document.getElementById('loginArea'),
    studentArea: document.getElementById('studentArea'),
    teacherArea: document.getElementById('teacherArea'),
    studentLoginBtn: document.getElementById('studentLoginBtn'),
    teacherLoginBtn: document.getElementById('teacherLoginBtn'),
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    exportBtn: document.getElementById('exportBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    adminLogoutBtn: document.getElementById('adminLogoutBtn'),
  });

  document.getElementById('studentLoginBtn').addEventListener('click', () => {
    const name = document.getElementById('studentNameInput').value.trim();
    const ref = document.getElementById('studentRefInput').value.trim();
    const section = document.getElementById('studentSectionInput').value.trim();
    if (!name || !ref || !section) {
      alert('Please fill in all fields: Name, Reference Number, and Section and Grade Level.');
      return;
    }
    loadStudentProgress(name);
    // Override with current input values
    document.getElementById('displayRef').innerText = ref;
    document.getElementById('displaySection').innerText = section;
    saveStudentProgress(); // Save immediately with new info
    showStudentArea();
  });

  document.getElementById('teacherLoginBtn').addEventListener('click', () => {
    const pass = document.getElementById('teacherPasswordInput').value;
    if (pass === TEACHER_PASSWORD) {
      showTeacherArea();
    } else {
      alert('Wrong password. Use teacher123 (demo).');
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    currentStudent = null;
    showLogin();
  });

  document.getElementById('adminLogoutBtn').addEventListener('click', () => {
    showLogin();
  });

  document.getElementById('refreshLogBtn').addEventListener('click', renderTeacherTable);

  document.getElementById('exportCsvBtn').addEventListener('click', exportCsv);

  document.getElementById('resetBtn').addEventListener('click', resetStudentProgress);

  document.getElementById('exportBtn').addEventListener('click', exportStudentProgress);

  document.getElementById('startBtn').addEventListener('click', () => {
    if (!currentStudent) {
      alert('Please log in first as a student.');
      return;
    }
    startSpeech();
  });

  document.getElementById('goToPracticeBtn').addEventListener('click', () => {
    if (!currentStudent) {
      alert('Please log in first as a student.');
      return;
    }
    showStudentPractice();
  });

  document.getElementById('backToCoursesBtn').addEventListener('click', () => {
    showStudentHome();
  });

  document.getElementById('goToAssessmentBtn').addEventListener('click', () => {
    if (!currentStudent) {
      alert('Please log in first as a student.');
      return;
    }
    showStudentAssessment();
  });

  document.getElementById('submitAnswerBtn').addEventListener('click', checkAnswer);

  document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);

  document.getElementById('backToCoursesFromAssessmentBtn').addEventListener('click', () => {
    showStudentHome();
  });

  document.getElementById('level1Btn').addEventListener('click', () => selectLevel('level1'));
  document.getElementById('level2Btn').addEventListener('click', () => selectLevel('level2'));
  document.getElementById('level3Btn').addEventListener('click', () => selectLevel('level3'));
  document.getElementById('backToLevelsBtn').addEventListener('click', backToLevels);

  showLogin();
});
