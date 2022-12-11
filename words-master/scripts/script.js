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
    obj.valid = validObj.validWord;
    obj.paintingLetters();
  },

  getSekretWord: async function () {
    const promis = await fetch(WORDS_URL);
    const wordObj = await promis.json();
    obj.secretWord = wordObj.word;
  },

  paintingLetters() {
    const currSize = obj.currIdx + WORD_SIZE;
    if (!obj.valid) {
      for (let i = obj.currIdx; i < currSize; i++) {
        letters[i].style.borderColor = "#FF0000";
        letters[i].style.transition = "0.5s";
      }
      setTimeout(() => {
        for (let j = obj.currIdx; j < currSize; j++) {
          letters[j].style.borderColor = "#333";
        }
      }, 500);
    } else {
      let idx = 0;
      const chopSecretWord = obj.secretWord.split("");
      for (let i = obj.currIdx; i < currSize; i++) {
        const letterStyle = letters[i].style;
        const currLetter = obj.currWord[idx];
        const secretLetter = obj.secretWord[idx];
        const chopIndex = chopSecretWord.indexOf(currLetter);
        letterStyle.transition = "";
        if (currLetter === secretLetter) {
          letterStyle.backgroundColor = "green";
        } else if (
          obj.secretWord.indexOf(currLetter) !== -1 &&
          chopIndex !== -1
        ) {
          letterStyle.backgroundColor = "#ffff00";
        } else {
          letterStyle.backgroundColor = "#C0C0C0";
        }
        chopSecretWord.splice(chopIndex, 1);
        idx++;
      }
      if (obj.currWord === obj.secretWord) console.log("You winner!!");
      obj.currWord = "";
      obj.currIdx = obj.index;
    }
  },

  isLetter(letter) {
    if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
      if (letter.length === 1) return true;
    }
    return false;
  },
  restart() {
    obj.getSekretWord();
    currWord = "";
    index = 0;
    currIdx = 0;
    valid = false;
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
