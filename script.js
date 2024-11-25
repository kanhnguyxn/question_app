const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryagain-btn");
const gohomeBnt = document.querySelector(".gohome-btn");
const optionList = document.querySelector(".option-list");
const nextBtn = document.querySelector(".next-btn");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  showQuestion(0);
  questionCounter(1);
  headerScore();
};

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;

    showQuestion(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.add("active");
  } else {
    showResultBox();
  }
};

tryAgainBtn.onclick = () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  showQuestion(questionCount);
  questionCounter(questionNumb);

  headerScore();
};

gohomeBnt.onclick = () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  showQuestion(questionCount);
  questionCounter(questionNumb);
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

function showQuestion(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].num}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
      <div class="option"><span>${questions[index].options[1]}</span></div>
      <div class="option"><span>${questions[index].options[2]}</span></div>
      <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOption = optionList.children.length;

  if (userAnswer === correctAnswer) {
    console.log("Correct");
    answer.classList.add("correct");
    userScore += 1;
    headerScore(userScore);
  } else {
    console.log("Incorrect");
    answer.classList.add("incorrect");
    for (let i = 0; i < allOption; i++) {
      if (optionList.children[i].textContent === correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  for (let i = 0; i < allOption; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const score = document.querySelector(".header-score");
  score.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");

  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg,rgba(255,255,255,.1) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
