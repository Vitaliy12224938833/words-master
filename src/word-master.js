import { memoize } from "./memoize";
import { showModal } from "./modal-window/popup";
import { isValidWord } from "./API/word-validator";
const letters = document.querySelectorAll(".scoreboard-letter");

const WORD_SIZE = 5;

class WordsMaster {
  constructor() {
    this.currWord = "";
    this.secretWord = "";
    this.index = 0;
    this.currIdx = 0;
  }

  isValid = memoize(isValidWord);

  numOfLetter = memoize(this.numLettersInWord);

  addLetter = (selector) =>
    document.body.addEventListener("keydown", async (event) => {
      const scoreboards = document.querySelectorAll(selector);
      const letter = event.key;
      if (this.isLetter(letter) && this.currWord.length < WORD_SIZE) {
        this.currWord += letter;
        scoreboards[this.index++].innerText = letter;
      }
      if (letter === "Backspace" && this.index > this.currIdx) {
        scoreboards[--this.index].innerText = "";
        this.currWord = this.currWord.substring(0, this.currWord.length - 1);
      }
      if (
        this.currWord.length === WORD_SIZE &&
        letter === "Enter" &&
        this.index - this.currIdx === WORD_SIZE
      ) {
        const validWord = await this.isValid(this.currWord);
        console.log(validWord);
        this.painting(validWord);
      }
      return;
    });

  painting(validWord) {
    const currSize = this.currIdx + WORD_SIZE;
    if (!validWord) {
      this.paintingBorder(currSize);
      return;
    }
    if (this.currWord === this.secretWord) showModal(".popup-winer");
    else if (this.index === letters.length) showModal(".popup-loser");

    this.paintingLetter(currSize);
    this.currWord = "";
    this.currIdx = this.index;
  }

  paintingLetter(currSize) {
    let idx = 0;
    const arrCurrWord = this.currWord.split("");

    for (let i = this.currIdx; i < currSize; i++) {
      const letterStyle = letters[i].style;
      const currWordLetter = this.currWord[idx];
      const secretWordLetter = this.secretWord[idx++];
      const chopIndex = arrCurrWord.indexOf(currWordLetter);
      const numOfLetCurrWord = this.numOfLetter(arrCurrWord, currWordLetter);
      const numOfLetSecretWord = this.numOfLetter(
        this.secretWord,
        currWordLetter
      );
      letterStyle.transition = "";

      if (currWordLetter === secretWordLetter) {
        letterStyle.backgroundColor = "green";
      } else if (!numOfLetSecretWord || numOfLetCurrWord > numOfLetSecretWord) {
        letterStyle.backgroundColor = "#C0C0C0";
      } else if (numOfLetSecretWord) {
        letterStyle.backgroundColor = "#ffff00";
      }

      if (numOfLetCurrWord > numOfLetSecretWord) {
        arrCurrWord.splice(chopIndex, 1);
      }
    }
    return;
  }

  paintingBorder(currSize) {
    for (let i = this.currIdx; i < currSize; i++) {
      letters[i].style.borderColor = "#FF0000";
      letters[i].style.transition = "0.3s";
    }
    setTimeout(() => {
      for (let j = this.currIdx; j < currSize; j++) {
        letters[j].style.borderColor = "#333";
      }
    }, 300);
    return;
  }

  isLetter(letter) {
    if (
      (letter >= "a" && letter <= "z") ||
      (letter >= "A" && letter <= "Z" && letter.length === 1)
    ) {
      return true;
    }
    return false;
  }

  numLettersInWord(word, letter) {
    let count = 0;
    for (let ell of word) {
      if (ell === letter) count++;
    }
    return count;
  }
}

export const game = new WordsMaster();
