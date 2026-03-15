console.log('script.js loaded');
const words = ['mahal', 'ganda', 'talo', 'araw', 'gabi'];
const MAX_SCORE = 100;
const TEACHER_PASSWORD = 'teacher123';
const STUDENT_LIST_KEY = 'filipino_student_list';

const assessmentQuestions = {
  level1: [
    {
      question: "Tuwing Sabado, nagluluto si Mang Juan ng adobo sa kanilang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong.\n\n1. Ano ang niluluto ni Mang Juan?",
      options: {
        A: "Sinigang",
        B: "Adobo",
        C: "Tinola",
        D: "Kare-kare"
      },
      correct: "B"
    },
    {
      question: "Tuwing Sabado, nagluluto si Mang Juan ng adobo sa kanilang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong.\n\n2. Kailan nagluluto si Mang Juan?",
      options: {
        A: "Biyernes",
        B: "Sabado",
        C: "Linggo",
        D: "Huwebes"
      },
      correct: "B"
    },
    {
      question: "Tuwing Sabado, nagluluto si Mang Juan ng adobo sa kanilang kusina. Nakikita ng mga bata ang kanyang kasipagan at natututo silang tumulong.\n\n3. Sino ang natututo habang nagluluto si Mang Juan?",
      options: {
        A: "Mga bata",
        B: "Mga guro",
        C: "Mga kapitbahay",
        D: "Mga magulang"
      },
      correct: "A"
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
    } catch (e) {
      console.error('Could not parse student data', e);
    }
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
    if (!name) {
      alert('Please type your student name.');
      return;
    }
    loadStudentProgress(name);
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
