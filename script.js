const words = ['mahal', 'ganda', 'talo', 'araw', 'gabi'];
const TEACHER_PASSWORD = 'teacher123';
const STUDENT_LIST_KEY = 'filipino_student_list';
let idx = 0;
let score = 0;
let badges = new Set();
let currentStudent = null;

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

  const id = sanitizeId(name);
  const raw = localStorage.getItem(getStudentKey(id));
  if (raw) {
    try {
      const data = JSON.parse(raw);
      idx = data.idx ?? 0;
      score = data.score ?? 0;
      badges = new Set(data.badges ?? []);
    } catch (e) {
      console.error('Could not parse student data', e);
    }
  }
  document.getElementById('studentTitle').innerText = `Student: ${currentStudent}`;
  showWord();
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
      score += 10;
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
  let html = '<tr><th>Name</th><th>Score</th><th>Badges</th><th>Updated</th></tr>';

  ids.forEach((id) => {
    const raw = localStorage.getItem(getStudentKey(id));
    if (!raw) return;
    let item;
    try {
      item = JSON.parse(raw);
    } catch (e) {
      return;
    }
    html += `<tr><td>${item.name}</td><td>${item.score}</td><td>${(item.badges||[]).join(', ') || 'None'}</td><td>${item.updated ?? 'N/A'}</td></tr>`;
  });

  table.innerHTML = html;
}

function resetStudentProgress() {
  idx = 0;
  score = 0;
  badges = new Set();
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
  const text = `Student: ${data.name}\nScore: ${data.score}\nBadges: ${(data.badges||[]).join(', ') || 'None'}\nUpdated: ${data.updated}`;
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

  let csv = 'name,score,badges,updated\n';
  ids.forEach((id) => {
    const raw = localStorage.getItem(getStudentKey(id));
    if (!raw) return;
    try {
      const item = JSON.parse(raw);
      const row = `${item.name},${item.score},"${(item.badges||[]).join('; ')}",${item.updated}`;
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

  showLogin();
});
