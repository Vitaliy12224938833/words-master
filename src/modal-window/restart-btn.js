import { game } from "../word-master";
import { getSekretWord } from "../API/get-secret-word";
import { hideModal } from "./popup";
import { clearLetters } from "../clear-scoreboard";

export const restart = (btnSelector) => {
  const buttons = document.querySelectorAll(btnSelector);
  console.log(buttons);
  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      game.currWord = "";
      game.secretWord = await getSekretWord();
      game.index = 0;
      game.currIdx = 0;
      clearLetters(".scoreboard-letter");
      hideModal(".popup");
      return;
    });
  });
};
