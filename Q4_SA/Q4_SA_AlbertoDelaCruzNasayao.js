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
    question: "Choose which word/s best fit the given statements: I _____ going to the concert tonight.",
    options: ["will", "was", "not", "am"],
    correct: "am",
    type: "multiple-choice",
  },
  {
    id: "1",
    question: "Choose which word/s best fit the given statements: Ian and Robert cleaned my dad's yesterday. _____ were exhausted.",
    options: ["He and He", "They","We", "Their"],
    correct: "They",
    type: "multiple-choice",
  },
  {
    id: "2",
    question: "Choose which word/s best fit the given statements: Samantha went to the park last week but _____ dog got lost while catching a squirrel.",
    options: ["their", "her", "our", "his"],
    correct: "her",
    type: "multiple-choice",
  },
  {
    id: "3",
    question: "Choose which word/s best fit the given statements: I _____ passing my project next week.",
    options: ["will be", "were", "will", "none of the above"],
    correct: "will be",
    type: "multiple-choice",
  },
  {
    id: "4",
    question: "Choose which word/s best fit the given statements: How _____ money do you owe?",
    options: ["many", "more", "less", "much"],
    correct: "much",
    type: "multiple-choice",
  },
  {
    id: "5",
    question: "Choose which word/s best fit the given statements: I worked hard _____ failed the examination.",
    options: ["thought", "and", "hence", "but"],
    correct: "but",
    type: "multiple-choice",
  },
  {
    id: "6",
    question: "Choose which word/s best fit the given statements: Franz is the _____ man in his village.",
    options: ["poorest", "most poor", "poorer", "more poor"],
    correct: "poorest",
    type: "multiple-choice",
  },
  {
    id: "7",
    question: "Choose which word/s best fit the given statements: The chicken walked _____ the road.",
    options: ["over", "through", "across", "below"],
    correct: "across",
    type: "multiple-choice",
  },
  {
    id: "8",
    question: "Identify the gerunds used in the given statement: Cooking is one of the best hobbies a person can do",
    options: ["Cooking", "hobbies", "do", "No gerunds were used"],
    correct: "Cooking",
    type: "multiple-choice",
  },
  {
    id: "9",
    question: "Identify the gerunds used in the given statement: It was nice seeing Michelle laugh.",
    options: ["seeing", "laugh", "nice", "No gerunds were used"],
    correct: "No gerunds were used",
    type: "multiple-choice",
  },
  {
    id: "10",
    question: "Analyze and identify the attitude of the statement: I am very disappointed in you!",
    options: ["dispondent", "incandescent", "timorous", "All of the above"],
    correct: "incandescent",
    type: "multiple-choice",
  },
  {
    id: "11",
    question: "Analyze and identify the attitude of the statement: Thank you for the gift! I was not expecting to receive such an expensive one.",
    options: ["abhorrent", "timorous", "appreciative", "All of the above"],
    correct: "appreciative",
    type: "multiple-choice",
  },
  {
    id: "12",
    question: "Analyze and identify the attitude of the statement: Jackie was kidnapped! What should we do?!",
    options: ["woebegone", "ecstatic", "agitated", "All of the above"],
    correct: "agitated",
    type: "multiple-choice",
  },
  {
    id: "13",
    question: "The prefix ____ can be added to 'complete' to form a new word.",
    options: ["en-", "un-", "im-", "in-"],
    correct: "in-",
    type: "multiple-choice",
  },
  {
    id: "14",
    question: "The suffix ____ can be added to 'enjoy' to form a new word.",
    options: ["-ly", "-able", "-ful", "-al"],
    correct: "-able",
    type: "multiple-choice",
  },
  {
    id: "15",
    question: "Identify the conjunction in the sentence: Sheldon likes painting _____ he finds it therapeutic.",
    answer: "because",
    type: "fill-in-the-blank",
  },
  {
    id: "16",
    question: "Identify the conjunction in the sentence: My mother always wakes up early _____ she always ends up leaving the house late.",
    answer: "but",
    type: "fill-in-the-blank",
  },
  {
    id: "17",
    question: "Identify the conjunction in the sentence: I will sing at the reunion _____ there is a cash prize.",
    answer: "if",
    type: "fill-in-the-blank",
  },
  {
    id: "18",
    question: "Identify the conjunction in the sentence: They don't want to come _____ Matthew will be there.",
    answer: "since",
    type: "fill-in-the-blank",
  },
  {
    id: "19",
    question: "Identify the conjunction in the sentence: I can change the sculpture _____ I have the client's approval.",
    answer: "once",
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
      const answerInput = document.querySelector(".fill-in-answer");
      if (!isFillInAnswerSubmitted && answerInput && answerInput.value.trim() === "") {
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

    if (quizArray[questionCount].type === "fill-in-the-blank") {
      const answerInput = document.querySelector(".fill-in-answer");
      if (answerInput) {
        answerInput.value = ""; // Reset the input value
        answerInput.classList.remove("correct", "incorrect"); // Remove the classes
        answerInput.disabled = false; // Enable the input
        isFillInAnswerSubmitted = false; // Reset fill-in answer submitted status
      }
    }
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
    submitBtn.innerHTML = "Check Answer";
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
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    div.appendChild(question_DIV);

    if (i.type === "multiple-choice") {
      i.options.sort(() => Math.random() - 0.5);

      let options_DIV = document.createElement("div");
      options_DIV.classList.add("options");
      div.appendChild(options_DIV);
    } else if (i.type === "fill-in-the-blank") {
      let answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.classList.add("fill-in-answer");
      div.appendChild(answerInput);

      let submitBtn = document.createElement("button");
      submitBtn.innerHTML = "Check Answer";
      submitBtn.classList.add("submit-btn");
      submitBtn.addEventListener("click", () => {
        fillInChecker(answerInput, i.answer);
      });
      div.appendChild(submitBtn);
    }

    quizContainer.appendChild(div);
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

