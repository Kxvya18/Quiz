const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Which programming language is used for web development?",
    choices: ["Python", "JavaScript", "C++", "Java"],
    correct: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correct: 2,
  },
  {
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    correct: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Oxygen", "Gold", "Osmium", "Oxide"],
    correct: 0,
  },
  {
    question: "What is the capital of Japan?",
    choices: ["Osaka", "Kyoto", "Tokyo", "Nagoya"],
    correct: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 30;
let timer;
let startTime;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const finalScoreEl = document.getElementById("final-score");
const correctAnswersEl = document.getElementById("correct-answers");
const wrongAnswersEl = document.getElementById("wrong-answers");
const totalTimeEl = document.getElementById("total-time");
const timerEl = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsEl = document.getElementById("total-questions");

function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice");
    button.onclick = () => selectAnswer(index);
    choicesEl.appendChild(button);
  });

  updateProgressBar();
}

function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  Array.from(choicesEl.children).forEach((button, index) => {
    if (index === correctIndex) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    score++;
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  nextBtn.disabled = false; // Enable Next button after answer is selected
}

function resetState() {
  nextBtn.disabled = true;
  choicesEl.innerHTML = "";
}

function startTimer() {
  timeLeft = 70; // Reset the time
  timerEl.textContent = `${timeLeft}s`; // Reset the timer display

  startTime = Date.now();
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.querySelector(".quiz-content").classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  finalScoreEl.textContent = score;
  correctAnswersEl.textContent = correctAnswers;
  wrongAnswersEl.textContent = wrongAnswers;
  totalQuestionsEl.textContent = questions.length;

  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  totalTimeEl.textContent = totalTime;
}

function restartQuiz() {
  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  timeLeft = 70;

  // Reset UI elements
  scoreContainer.classList.add("hidden"); // Hide the score container
  document.querySelector(".quiz-content").classList.remove("hidden"); // Show quiz content
  progressBar.style.width = "0%"; // Reset the progress bar

  // Clear and restart the timer
  clearInterval(timer);
  startTimer();

  // Load the first question
  loadQuestion();
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
startTimer();
