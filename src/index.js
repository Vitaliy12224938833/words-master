import "../styles/styles.css";

import { game } from "./word-master";
import { generateSecretWord } from "./API/get-secret-word";
import { restart } from "./modal-window/restart-btn";

window.addEventListener("DOMContentLoaded", () => {
  generateSecretWord();
  game.addLetter(".scoreboard-letter");
  restart(".restart-btn");
});
