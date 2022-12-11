"use strict";
const letters = document.querySelectorAll(".scoreboard-letter");
const body = document.querySelector(".body");
const restartBtn = document.querySelector(".restart-btn");

const WORDS_VALIDATOR_URL = "https://words.dev-apis.com/validate-word";
const WORDS_URL = "https://words.dev-apis.com/word-of-the-day?random=1";

const WORD_SIZE = 5;

const obj = {
  currWord: "",
  secretWord: "",
  index: 0,
  currIdx: 0,
  valid: false,

  addLetter(event) {
    const letter = event.key;
    if (obj.isLetter(letter) && obj.currWord.length < WORD_SIZE) {
      obj.currWord += letter;
      letters[obj.index].innerText = letter;
      obj.index++;
    }
    if (letter === "Backspace" && obj.index > obj.currIdx) {
      obj.index--;
      letters[obj.index].innerText = "";
      obj.currWord = obj.currWord.substring(0, obj.currWord.length - 1);
    }
    if (obj.currWord.length === WORD_SIZE && letter === "Enter") {
      obj.isValidWord(obj.currWord);
      obj.valid = false;
    }
  },

  isValidWord: async function (currWord) {
    const promis = await fetch(WORDS_VALIDATOR_URL, {
      method: "POST",
      body: JSON.stringify({ word: currWord }),
    });
    const validObj = await promis.json();
    this.valid = validObj.validWord;
    this.paintingLetters();
  },

  getSekretWord: async function () {
    const promis = await fetch(WORDS_URL);
    const wordObj = await promis.json();
    this.secretWord = wordObj.word;
    console.log(this.secretWord);
  },

  paintingLetters() {
    const { secretWord, numOfLetter, index, valid, currWord, currIdx } = this;

    const currSize = currIdx + WORD_SIZE;

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

      const arrCurrWord = currWord.split("");
      const arrSecretWord = secretWord.split("");

      for (let i = currIdx; i < currSize; i++) {
        const letterStyle = letters[i].style;
        const currWordLetter = currWord[idx];
        const secretWordLetter = secretWord[idx];

        const numOfLetCurrWord = numOfLetter(arrCurrWord, currWordLetter);
        const numOfLetSecretWord = numOfLetter(arrSecretWord, currWordLetter);

        const chopIndex = arrCurrWord.indexOf(currWordLetter);

        letterStyle.transition = "0.1s";

        if (currWordLetter === secretWordLetter) {
          letterStyle.backgroundColor = "green";
          if (numOfLetCurrWord > numOfLetSecretWord) {
            arrCurrWord.splice(chopIndex, 1);
          }
        } else if (
          !numOfLetSecretWord ||
          numOfLetCurrWord > numOfLetSecretWord
        ) {
          if (numOfLetCurrWord > numOfLetSecretWord) {
            arrCurrWord.splice(chopIndex, 1);
          }
          letterStyle.backgroundColor = "#C0C0C0";
        } else if (numOfLetSecretWord) {
          letterStyle.backgroundColor = "#ffff00";
        }
        idx++;
      }
      if (currWord === secretWord) console.log("You winner!!");
      this.currWord = "";
      this.currIdx = index;
    }
  },

  isLetter(letter) {
    if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
      if (letter.length === 1) return true;
    }
    return false;
  },

  numOfLetter(word, letter) {
    let count = 0;
    for (const ell of word) {
      if (ell === letter) count++;
    }
    return count;
  },

  restart() {
    obj.getSekretWord();
    obj.currWord = "";
    obj.index = 0;
    obj.ocurrIdx = 0;
    obj.valid = false;
    for (const letter of letters) {
      letter.innerText = "";
      letter.style.backgroundColor = "";
    }
  },
};
{
  if (!obj.secretWord.length) obj.getSekretWord();
}
restartBtn.addEventListener("click", obj.restart);
body.addEventListener("keydown", obj.addLetter);
