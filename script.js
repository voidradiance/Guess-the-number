"use strict";
const threshold = 20;
let trueNumber = generateNewNumber(threshold); // 1 - threshold
let guesses = 0;
let currentScore = 20;
let highScore = 0;

(function () {
  tryAndGuess(); //click
  tryAgain(); //click
})();

function tryAndGuess() {
  const form = document.querySelector("form");
  const button = form.querySelector("input[type=submit]");
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const guess = form.querySelector("input[type=text]").value;

    const isCorrect = answerCheck(guess);
    currentScoreCount(isCorrect);
    guessesCount(isCorrect);
    highScoreCount(isCorrect);
  });
}

function answerCheck(guess) {
  const hint = document.querySelector(".hint");

  if (guess == trueNumber) {
    hint.textContent = "You Are Correct! 😲🎉";
    document.querySelector(".number").textContent = trueNumber;
    document.querySelector(".try-again").classList.toggle("btn");
    // document.querySelector(".try-again").style.display = "block";
    return true;
  }

  if (guess > trueNumber) {
    hint.textContent = "Too High 📈";
  } else {
    hint.textContent = "Too Low 📉";
  }
  return false;
}

function currentScoreCount(isCorrect) {
  if (!isCorrect) {
    document.querySelector(".current-score").textContent = --currentScore;
  }
}

function guessesCount(isCorrect) {
  if (!isCorrect) {
    document.querySelector(".guesses").textContent = ++guesses;
  }
}

function highScoreCount(isCorrect) {
  if (isCorrect && currentScore > highScore) {
    document.querySelector(".highscore").textContent = currentScore;
    highScore = currentScore;
  }
}

function tryAgain() {
  document.querySelector(".try-again").addEventListener("click", () => {
    document.querySelector(".number").textContent = "?";

    document.querySelector(".hint").textContent = "";
    currentScore = 20;
    document.querySelector(".current-score").textContent = "";
    guesses = 0;
    document.querySelector(".guesses").textContent = "";
    document.querySelector("form").reset();

    document.querySelector(".try-again").classList.toggle("btn");
    // document.querySelector(".try-again").style.display = "none";
  });
}

function generateNewNumber(threshold) {
  return Math.floor(Math.random() * (threshold - 1 + 1) + 1);
}
