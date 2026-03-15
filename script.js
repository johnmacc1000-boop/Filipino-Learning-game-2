import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

console.log('Script starting...');

const firebaseConfig = {
  apiKey: "AIzaSyAjgDNIb7Jkm5jbxS6lHdNBS_3qb9nHQWc",
  authDomain: "filipino-learning-game.firebaseapp.com",
  projectId: "filipino-learning-game",
  storageBucket: "filipino-learning-game.firebasestorage.app",
  messagingSenderId: "246534782161",
  appId: "1:246534782161:web:9b445c98995f7d4f9c19f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const words = ['mahal', 'ganda', 'talo', 'araw', 'gabi'];
let idx = 0;
let score = 0;
let badges = new Set();
let currentUser = null;
let isTeacher = false;

function showWord() {
  if (currentUser) {
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

async function saveProgress() {
  if (!currentUser) return;
  const userDoc = doc(db, 'students', currentUser.uid);
  await setDoc(userDoc, {
    name: currentUser.email,
    idx,
    score,
    badges: [...badges],
    updated: new Date().toISOString(),
  });
}

async function loadProgress() {
  if (!currentUser) return;
  const userDoc = doc(db, 'students', currentUser.uid);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    const data = docSnap.data();
    idx = data.idx ?? 0;
    score = data.score ?? 0;
    badges = new Set(data.badges ?? []);
  } else {
    idx = 0;
    score = 0;
    badges = new Set();
  }
  showWord();
  updateStatus();
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

  recognition.onresult = async (event) => {
    const spoken = event.results[0][0].transcript.trim().toLowerCase();
    const word = document.getElementById('word').innerText.trim().toLowerCase();

    if (spoken === word) {
      score += 10;
      resultBox.innerText = 'Correct! +' + 10 + ' points';
      checkBadges();
      await saveProgress();
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
  document.getElementById('loginArea').style.display = 'block';
  document.getElementById('studentArea').style.display = 'none';
  document.getElementById('teacherArea').style.display = 'none';
}

function showStudentArea() {
  document.getElementById('loginArea').style.display = 'none';
  document.getElementById('studentArea').style.display = 'block';
  document.getElementById('teacherArea').style.display = 'none';
}

function showTeacherArea() {
  document.getElementById('loginArea').style.display = 'none';
  document.getElementById('studentArea').style.display = 'none';
  document.getElementById('teacherArea').style.display = 'block';
  renderTeacherTable();
}

async function renderTeacherTable() {
  const table = document.getElementById('studentTable');
  const querySnapshot = await getDocs(collection(db, 'students'));
  if (querySnapshot.empty) {
    document.getElementById('teacherResult').innerText = 'No students registered yet.';
    table.innerHTML = '';
    return;
  }

  document.getElementById('teacherResult').innerText = 'Showing all student progress.';
  let html = '<tr><th>Name</th><th>Score</th><th>Badges</th><th>Updated</th></tr>';

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `<tr><td>${data.name}</td><td>${data.score}</td><td>${(data.badges||[]).join(', ') || 'None'}</td><td>${data.updated ?? 'N/A'}</td></tr>`;
  });

  table.innerHTML = html;
}

function resetProgress() {
  idx = 0;
  score = 0;
  badges = new Set();
  saveProgress();
  showWord();
  updateStatus();
  document.getElementById('result').innerText = 'Progress reset.';
}

// Auth listeners
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    isTeacher = user.email === 'teacher@school.com'; // Demo teacher email
    if (isTeacher) {
      showTeacherArea();
    } else {
      await loadProgress();
      showStudentArea();
    }
  } else {
    currentUser = null;
    isTeacher = false;
    showLogin();
  }
});

// Event wiring
console.log('Script loaded, attaching event listeners...');

document.getElementById('studentLoginBtn').addEventListener('click', async () => {
  console.log('Student login clicked');
  const email = document.getElementById('studentEmailInput').value.trim();
  const pass = document.getElementById('studentPasswordInput').value;
  if (!email || !pass) {
    alert('Please enter email and password.');
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert('Account created! You are now logged in.');
      } catch (createError) {
        alert('Error: ' + createError.message);
      }
    } else {
      alert('Error: ' + error.message);
    }
  }
});

document.getElementById('teacherLoginBtn').addEventListener('click', async () => {
  const email = 'teacher@school.com'; // Demo
  const pass = 'teacher123'; // Fixed password
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert('Teacher account created! You are now logged in.');
      } catch (createError) {
        alert('Error creating teacher account: ' + createError.message);
      }
    } else {
      alert('Error: ' + error.message);
    }
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  signOut(auth);
});

document.getElementById('adminLogoutBtn').addEventListener('click', () => {
  signOut(auth);
});

document.getElementById('refreshLogBtn').addEventListener('click', renderTeacherTable);

document.getElementById('exportCsvBtn').addEventListener('click', async () => {
  const querySnapshot = await getDocs(collection(db, 'students'));
  if (querySnapshot.empty) {
    alert('No data to export.');
    return;
  }
  let csv = 'name,score,badges,updated\n';
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = `${data.name},${data.score},"${(data.badges||[]).join('; ')}",${data.updated}`;
    csv += row + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'student_progress.csv';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('resetBtn').addEventListener('click', resetProgress);

document.getElementById('startBtn').addEventListener('click', () => {
  if (!currentUser) {
    alert('Please log in first.');
    return;
  }
  startSpeech();
});

showLogin();