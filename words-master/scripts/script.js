const letters = document.querySelectorAll(".scoreboard-letter");
const body = document.querySelector(".body");
const restartBtn = document.querySelector(".restart-btn");

const wordValidator = "https://words.dev-apis.com/validate-word";
const WORDS_URL = "https://words.dev-apis.com/word-of-the-day?random=1";

const wordSize = 5;

let currWord = "";
let secretWord = "";
let index = 0;
let currIdx = 0;
let valid = false;

if (!secretWord.length) getSekretWord();

async function addLeter(event) {
  const letter = event.key;
  if (
    isLetter(letter) &&
    letter !== "Backspace" &&
    currWord.length < wordSize
  ) {
    currWord += letter;
    letters[index].innerText = letter;
    index++;
  }
  if (letter === "Backspace" && index > currIdx) {
    index--;
    letters[index].innerText = "";
    currWord = currWord.substring(0, currWord.length - 1);
  }
  if (currWord.length === wordSize) {
    isValidWord(currWord, letter);
    valid = false;
  }
}

async function isValidWord(currWord, letter) {
  const promis = await fetch(wordValidator, {
    method: "POST",
    body: JSON.stringify({ word: currWord }),
  });
  const validObj = await promis.json();
  valid = validObj.validWord;
  if (letter === "Enter") {
    paintingLetters();
  }
}

async function getSekretWord() {
  const promis = await fetch(WORDS_URL);
  const wordObj = await promis.json();
  secretWord = wordObj.word;
}

function paintingLetters() {
  const currSize = currIdx + wordSize;
  if (!valid) {
    for (let i = currIdx; i < currSize; i++) {
      letters[i].style.borderColor = "#FF0000";
      letters[i].style.transition = "0.5s";
    }
    setTimeout(() => {
      for (let j = currIdx; j < currSize; j++) {
        letters[j].style.borderColor = "#333";
      }
    }, 500);
  } else {
    let idx = 0;
    for (let i = currIdx; i < currSize; i++) {
      const letterStyle = letters[i].style;
      const currLetter = currWord[idx];
      const secretLetter = secretWord[idx];
      letterStyle.transition = "";
      if (currLetter === secretLetter) {
        letterStyle.backgroundColor = "green";
      } else if (secretWord.indexOf(currLetter) !== -1) {
        letterStyle.backgroundColor = "#ffff00";
      } else {
        letterStyle.backgroundColor = "#C0C0C0";
      }
      idx++;
    }
    if (currWord === secretWord) console.log("You winner!!");
    currWord = "";
    currIdx = index;
  }
}

function isLetter(letter) {
  if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
    if (letter.length === 1 || letter === "Backspace") return true;
  }
  return false;
}

restartBtn.addEventListener("click", () => {
  getSekretWord();
  currWord = "";
  index = 0;
  currIdx = 0;
  valid = false;
  for (const letter of letters) {
    letter.innerText = "";
    letter.style.backgroundColor = "";
  }
});

body.addEventListener("keydown", addLeter);
