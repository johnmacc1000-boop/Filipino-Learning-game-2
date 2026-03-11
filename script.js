const words = ['mahal', 'ganda', 'talo', 'araw', 'gabi'];
let idx = 0;
let score = 0;
let badges = new Set();

function showWord() {
  document.getElementById('word').innerText = words[idx];
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('badges').innerText =
    'Badges: ' + (badges.size ? [...badges].join(', ') : 'None');
}
function checkBadges() {
  if (score >= 30) badges.add('Word Warrior');
  if (score >= 60) badges.add('Speech Hero');
  showWord();
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

document.getElementById('startBtn').addEventListener('click', startSpeech);
showWord();