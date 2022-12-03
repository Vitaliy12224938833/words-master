const button = document.querySelector(".operations");
const dispaly = document.querySelector(".display");
let secondArrNum = [];
let firstArrNum = [];
let operation = "";

button.addEventListener("click", function (event) {
  const target = event.target.innerText;
  const num = parseInt(target);

  if (num >= 0) {
    secondArrNum.push(num);
    dispaly.innerText = secondArrNum.join("");
    return;
  }
  if (target === "←" || target === "C") {
    remove(target);
  }
  if (target === "÷" || target === "+" || target === "-" || target === "×") {
    if (firstArrNum.length) {
      calculate(operation);
    }
    firstArrNum = [...secondArrNum];
    secondArrNum = [];
    operation = target;
    dispaly.innerText = "0";
    return;
  }

  if (target === "=" && firstArrNum.length) {
    calculate(operation);
    firstArrNum = [];
    return;
  }
});

function remove(target) {
  if (secondArrNum.length === 1) {
    dispaly.innerText = "0";
    firstArrNum = [];
    return;
  }
  if (target === "C") {
    dispaly.innerText = "0";
    secondArrNum = [];
    return;
  }
  if (dispaly.innerText !== "0") {
    secondArrNum.pop();
    dispaly.innerText = secondArrNum.join("");
    return;
  }
}

function calculate(operation) {
  if (!secondArrNum.length) {
    secondArrNum = firstArrNum;
    return;
  }
  const firstNum = parseInt(firstArrNum.join(""));
  const secondNum = parseInt(secondArrNum.join(""));

  if (operation === "+") {
    const result = firstNum + secondNum;
    secondArrNum = result.toString().split("");
    dispaly.innerText = result;
    return;
  }
  if (operation === "÷") {
    const result = firstNum / secondNum;
    secondArrNum = result.toString().split("");
    dispaly.innerText = result;
    return;
  }
  if (operation === "-") {
    const result = firstNum - secondNum;
    secondArrNum = result.toString().split("");
    dispaly.innerText = result;
    return;
  }
  if (operation === "×") {
    const result = firstNum * secondNum;
    secondArrNum = result.toString().split("");
    dispaly.innerText = result;
    return;
  }
}
