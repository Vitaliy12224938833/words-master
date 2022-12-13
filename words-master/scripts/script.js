"use strict";
const letters = document.querySelectorAll(".scoreboard-letter");
const body = document.querySelector(".body");
const restartBtn = document.querySelector(".restart-btn");

const WORDS_VALIDATOR_URL = "https://words.dev-apis.com/validate-word";
const WORDS_URL = "https://words.dev-apis.com/word-of-the-day?random=1";

const WORD_SIZE = 5;

async function isValidWord(currWord) {
  const promis = await fetch(WORDS_VALIDATOR_URL, {
    method: "POST",
    body: JSON.stringify({ word: currWord }),
  });
  const { validWord } = await promis.json();
  return validWord;
}

async function getSekretWord() {
  const promis = await fetch(WORDS_URL);
  const { word } = await promis.json();
  return word;
}

class WordsMaster {
  constructor() {
    this.currWord = "";
    this.secretWord = "";
    this.index = 0;
    this.currIdx = 0;
  }

  async addLetter(event) {
    const letter = event.key;
    if (this.isLetter(letter) && this.currWord.length < WORD_SIZE) {
      this.currWord += letter;
      letters[this.index++].innerText = letter;
    }
    if (letter === "Backspace" && this.index > this.currIdx) {
      letters[--this.index].innerText = "";
      this.currWord = this.currWord.substring(0, this.currWord.length - 1);
    }
    if (
      this.currWord.length === WORD_SIZE &&
      letter === "Enter" &&
      this.index - this.currIdx === WORD_SIZE
    ) {
      const validWord = await isValidWord(this.currWord);
      this.painting(validWord);
    }
    return;
  }

  painting(validWord) {
    const currSize = this.currIdx + WORD_SIZE;
    if (!validWord) this.paintingBorder(this.currIdx, currSize);
    else if (this.currWord.length === WORD_SIZE) {
      this.paintingLetter();
      this.currWord = "";
      this.currIdx = this.index;
    }
    if (this.currWord === this.secretWord) console.log("You winner!!");
    return;
  }
  paintingLetter() {
    let idx = 0;
    const currSize = this.currIdx + WORD_SIZE;
    const arrCurrWord = this.currWord.split("");
    const arrSecretWord = this.secretWord.split("");

    for (let i = this.currIdx; i < currSize; i++) {
      const letterStyle = letters[i].style;
      const currWordLetter = this.currWord[idx];
      const secretWordLetter = this.secretWord[idx++];

      const numOfLetCurrWord = this.numOfLetter(arrCurrWord, currWordLetter);
      const numOfLetSecretWord = this.numOfLetter(
        arrSecretWord,
        currWordLetter
      );

      const chopIndex = arrCurrWord.indexOf(currWordLetter);

      letterStyle.transition = "";

      if (currWordLetter === secretWordLetter) {
        letterStyle.backgroundColor = "green";
        if (numOfLetCurrWord > numOfLetSecretWord) {
          arrCurrWord.splice(chopIndex, 1);
        }
      } else if (!numOfLetSecretWord || numOfLetCurrWord > numOfLetSecretWord) {
        if (numOfLetCurrWord > numOfLetSecretWord) {
          arrCurrWord.splice(chopIndex, 1);
        }
        letterStyle.backgroundColor = "#C0C0C0";
      } else if (numOfLetSecretWord) {
        letterStyle.backgroundColor = "#ffff00";
      }
    }
    return;
  }

  paintingBorder(currIdx, currSize) {
    for (let i = currIdx; i < currSize; i++) {
      letters[i].style.borderColor = "#FF0000";
      letters[i].style.transition = "0.3s";
    }
    setTimeout(() => {
      for (let j = currIdx; j < currSize; j++) {
        letters[j].style.borderColor = "#333";
      }
    }, 300);
    return;
  }

  isLetter(letter) {
    if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
      if (letter.length === 1) return true;
    }
    return false;
  }

  numOfLetter(word, letter) {
    let count = 0;
    for (const ell of word) {
      if (ell === letter) count++;
    }
    return count;
  }

  async restart() {
    this.currWord = "";
    this.secretWord = await getSekretWord();
    this.index = 0;
    this.currIdx = 0;
    for (const letter of letters) {
      letter.innerText = "";
      letter.style.backgroundColor = "";
    }
    console.log(this.secretWord);
    return;
  }
}

const game = new WordsMaster();

(async () => {
  if (!game.secretWord.length) {
    game.secretWord = await getSekretWord();
    console.log(game.secretWord);
  }
  return;
})();

restartBtn.addEventListener("click", () => game.restart());
body.addEventListener("keydown", (event) => game.addLetter(event));
