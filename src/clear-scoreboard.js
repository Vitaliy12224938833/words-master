export const clearLetters = (letterSelector) => {
  const letters = document.querySelectorAll(letterSelector);
  letters.forEach((letter) => {
    letter.innerText = "";
    letter.style.backgroundColor = "";
  });
};
