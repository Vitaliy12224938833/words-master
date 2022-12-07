const button = document.querySelector(".operations");
const dispaly = document.querySelector(".display");
const body = document.querySelector(".body");

let topArrNum = "";
let tailArrNum = "";
let operation = "";

button.addEventListener("click", function (event) {
  const value = event.target.innerText;

  add(value);

  if (value === "←" || value === "C") {
    remove(value);
  }

  if (value === "÷" || value === "+" || value === "-" || value === "×") {
    swap(value);
    return;
  }

  if (value === "=" && tailArrNum.length) {
    calculate(operation);
    tailArrNum = "";
    return;
  }
});

body.addEventListener("keydown", function (event) {
  const value = event.key;

  add(value);

  if (value === "Backspace" || value === "Delete") {
    remove(value);
  }

  if (value === "/" || value === "+" || value === "-" || value === "*") {
    swap(value);
    return;
  }

  if (value === "=" || (value === "Enter" && tailArrNum.length)) {
    calculate(operation);
    tailArrNum = "";
    return;
  }
});

function add(value) {
  if ((value >= "0" && value <= "9") || value === ".") {
    console.log(topArrNum.indexOf("."));
    if (topArrNum.indexOf(".") !== -1 && topArrNum.length && value === ".") {
      return;
    }
    topArrNum += value;
    dispaly.innerText = topArrNum;
    return;
  }
}

function swap(value) {
  if (tailArrNum.length) {
    calculate(operation);
  }
  tailArrNum = topArrNum;
  topArrNum = "";
  operation = value;
  dispaly.innerText = "0";
  return;
}

function remove(value) {
  if (topArrNum.length === 1 || value === "C" || value === "Delete") {
    dispaly.innerText = "0";
    topArrNum = "";
    return;
  }
  if (dispaly.innerText !== "0") {
    topArrNum = topArrNum.substring(0, topArrNum.length - 1);
    dispaly.innerText = topArrNum;
    return;
  }
}

function calculate(operation, precision = 100000000) {
  if (!topArrNum.length) {
    topArrNum = tailArrNum;
    return;
  }
  const tailNum = Number(tailArrNum);
  const topNum = Number(topArrNum);
  let result = 0;
  if (operation === "+")
    result = (tailNum * precision + topNum * precision) / precision;
  if (operation === "-")
    result = (tailNum * precision - topNum * precision) / precision;
  if (operation === "÷" || operation === "/")
    result = (tailNum * precision) / (topNum * precision);
  if (operation === "×" || operation === "*")
    result =
      (tailNum * precision * (topNum * precision)) / (precision * precision);

  topArrNum = result.toString();
  dispaly.innerText = result;
  return;
}
