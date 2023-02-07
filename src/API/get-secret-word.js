import axios from "axios";
import { game } from "../word-master";

const WORDS_URL = "https://words.dev-apis.com/word-of-the-day?random=1";

export const getSekretWord = () =>
  axios
    .get(WORDS_URL)
    .then((response) => response.data.word)
    .catch((error) => console.log(error));

export const generateSecretWord = async () => {
  if (!game.secretWord.length) {
    game.secretWord = await getSekretWord();
  }
  console.log(game.secretWord);
  return;
};
