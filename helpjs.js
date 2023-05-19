let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let isFillInAnswerSubmitted = false; // Track if fill-in answer is submitted

// Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "German"],
    correct: "Mandarin",
    type: "multiple-choice",
  },
  {
    id: "1",
    question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    correct: "Europe",
    type: "multiple-choice",
  },
  {
    id: "2",
    question: "Who invented the Computer?",
    answer: "Charles Babbage",
    type: "fill-in-the-blank",
  },
];

// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener("click", () => {
    if (questionCount < quizArray.length - 1) {
      if (quizArray[questionCount].type === "fill-in-the-blank") {
        if (!isFillInAnswerSubmitted) {
          alert("Please write your answer.");
          return;
        }
      } else {
        if (!validateAnswer()) {
          return;
        }
      }
      displayNext();
    } else {
      displayNext();
    }
  });

// Display Next
const displayNext = () => {
  questionCount += 1;

  if (questionCount == quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
  } else {
    countOfQuestion.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " Question";
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
  }
};

// Display Quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  let currentQuestion = quizArray[questionCount];

  if (currentQuestion.type === "multiple-choice") {
    quizCards[questionCount].classList.remove("hide");
    let question_DIV = quizCards[questionCount].querySelector(".question");
    let options_DIV = quizCards[questionCount].querySelector(".options");
    question_DIV.innerHTML = currentQuestion.question;

    let optionsHTML = "";
    for (let option of currentQuestion.options) {
      optionsHTML += `<button class="option-div" onclick="checker(this)">${option}</button>`;
    }
    options_DIV.innerHTML = optionsHTML;
  } else if (currentQuestion.type === "fill-in-the-blank") {
    let fillInCard = document.createElement("div");
    fillInCard.classList.add("container-mid", "hide");

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = currentQuestion.question;
    fillInCard.appendChild(question_DIV);

    let answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.classList.add("fill-in-answer");
    fillInCard.appendChild(answerInput);

    let submitBtn = document.createElement("button");
    submitBtn.innerHTML = "Submit";
    submitBtn.classList.add("submit-btn");
    submitBtn.addEventListener("click", () => {
      fillInChecker(answerInput, currentQuestion.answer);
    });
    fillInCard.appendChild(submitBtn);

    quizContainer.appendChild(fillInCard);
    fillInCard.classList.remove("hide");
  }
};

// Fill-in-the-Blank Checker Function
function fillInChecker(answerInput, correctAnswer) {
  const userAnswer = answerInput.value.trim();

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    answerInput.classList.add("correct");
    scoreCount++;
  } else {
    answerInput.classList.add("incorrect");
  }

  answerInput.disabled = true;
  isFillInAnswerSubmitted = true; // Mark fill-in answer as submitted
  clearInterval(countdown);
}

// Multiple-Choice Checker Function
function checker(userOption) {
  const quizData = quizArray[questionCount];
  const selectedOption = userOption.innerText;
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Initial Setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  isFillInAnswerSubmitted = false; // Reset fill-in answer submitted status
  quizCreator();
  quizDisplay(questionCount);
}

// Quiz Creation
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    if (i.type === "multiple-choice") {
      i.options.sort(() => Math.random() - 0.5);

      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

      let question_DIV = document.createElement("p");
      question_DIV.classList.add("question");
      div.appendChild(question_DIV);

      let options_DIV = document.createElement("div");
      options_DIV.classList.add("options");
      div.appendChild(options_DIV);

      quizContainer.appendChild(div);
    }
  }
}

function validateAnswer() {
  let currentQuestion = quizArray[questionCount];

  if (currentQuestion.type === "multiple-choice") {
    let options = document
      .getElementsByClassName("container-mid")[questionCount]
      .querySelectorAll(".option-div");
    let isSelected = false;

    for (let option of options) {
      if (
        option.classList.contains("correct") ||
        option.classList.contains("incorrect")
      ) {
        isSelected = true;
        break;
      }
    }

    if (!isSelected) {
      alert("Please choose an option.");
      return false;
    }
  }

  return true;
}

// Start Button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Hide Quiz and Display Start Screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
