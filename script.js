// Quiz Questions Data
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is 15 + 27?",
    options: ["40", "42", "44", "46"],
    correct: 1
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    correct: 1
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2
  }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// DOM Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const quizContent = document.getElementById("quiz-content");
const resultScreen = document.getElementById("result-screen");
const finalScoreEl = document.getElementById("final-score");
const totalQuestionsEl = document.getElementById("total-questions");
const restartBtn = document.getElementById("restart-btn");

// Initialize quiz
function initQuiz() {
  shuffledQuestions = shuffleArray([...questions]).slice(0, 5);
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizContent.classList.remove("hidden");
  updateScore();
  loadQuestion();
}

// Load current question
function loadQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  feedbackEl.classList.add("hidden");
  nextBtn.classList.add("hidden");

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(index, button));
    optionsContainer.appendChild(button);
  });

  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
}

// Handle answer selection
function selectAnswer(selectedIndex, selectedButton) {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const allButtons = optionsContainer.querySelectorAll(".option-btn");

  // Disable all buttons
  allButtons.forEach(btn => btn.disabled = true);

  // Check if correct
  if (selectedIndex === currentQuestion.correct) {
    score++;
    selectedButton.classList.add("correct");
    feedbackEl.textContent = "✓ Correct!";
    feedbackEl.className = "feedback correct";
  } else {
    selectedButton.classList.add("incorrect");
    allButtons[currentQuestion.correct].classList.add("correct");
    feedbackEl.textContent = "✗ Incorrect!";
    feedbackEl.className = "feedback incorrect";
  }

  updateScore();
  feedbackEl.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Next button handler
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Show final results
function showResults() {
  quizContent.classList.add("hidden");
  feedbackEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreEl.textContent = `${score} / ${shuffledQuestions.length}`;
  totalQuestionsEl.textContent = shuffledQuestions.length;
}

// Restart quiz
restartBtn.addEventListener("click", initQuiz);

// Utility: Shuffle array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start the quiz on load
initQuiz();