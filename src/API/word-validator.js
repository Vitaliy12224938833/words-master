import axios from "axios";

const WORDS_VALIDATOR_URL = "https://words.dev-apis.com/validate-word";

export const isValidWord = (currWord) =>
  axios
    .post(WORDS_VALIDATOR_URL, { word: currWord })
    .then((response) => response.data.validWord)
    .catch((error) => console.log(error));
