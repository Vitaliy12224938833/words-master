const letters = document.querySelectorAll(".scoreboard-letter");
const body = document.querySelector(".body");
const restart = document.querySelector(".restart-btn");

const wordValidator = "https://words.dev-apis.com/validate-word";
const WORDS_URL = "https://words.dev-apis.com/word-of-the-day";

const wordSize = 5;

let currWord = "";
let secretWord = "";
let index = 0;
let currIdx = 0;
let valid = false;

function addLeter(event) {
  const letter = event.key;

  if (letter === "Enter" && valid) {
    if (!secretWord.length) getSekretWord();
    console.log(valid);
    if (currWord === secretWord) console.log("You winтer!!");
    currWord = "";
    currIdx = index;
  }

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
    isValidWord(currWord);
    return;
  }
}

function isLetter(letter) {
  if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
    if (letter.length === 1 || letter === "Backspace") return true;
  }
  return false;
}

async function getSekretWord() {
  const promis = await fetch(WORDS_URL);
  const response = await promis.json();
  secretWord = response.word;
  console.log(secretWord);
  return;
}

async function isValidWord(currWord) {
  const promis = await fetch(wordValidator, {
    method: "POST",
    body: JSON.stringify({ word: currWord }),
  });
  const response = await promis.json();
  valid = response.validWord;
}

restart.addEventListener("click", function () {
  currWord = "";
  index = 0;
  currIdx = 0;
  valid = false;
  for (const letter of letters) {
    letter.innerText = "";
  }
});

body.addEventListener("keydown", addLeter);
