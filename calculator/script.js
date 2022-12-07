const button = document.querySelector(".operations");
const dispaly = document.querySelector(".display");
const body = document.querySelector(".body");

let head = "";
let tail = "";
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

  if (value === "=" && tail.length) {
    calculate(operation);
    tail = "";
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

  if (value === "=" || (value === "Enter" && tail.length)) {
    calculate(operation);
    tail = "";
    return;
  }
});

function add(value) {
  if ((value >= "0" && value <= "9") || value === "." || value === ",") {
    if (
      (head.indexOf(".") !== -1 && head.length && value === ".") ||
      (head.indexOf(",") !== -1 && head.length && value === ",")
    ) {
      return;
    }
    head += value;
    dispaly.innerText = head;
    return;
  }
}

function swap(value) {
  if (tail.length) {
    calculate(operation);
  }
  tail = head;
  head = "";
  operation = value;
  dispaly.innerText = "0";
  return;
}

function remove(value) {
  if (head.length === 1 || value === "C" || value === "Delete") {
    dispaly.innerText = "0";
    head = "";
    return;
  }
  if (dispaly.innerText !== "0") {
    head = head.substring(0, head.length - 1);
    dispaly.innerText = head;
    return;
  }
}

function calculate(operation, precision = 100000000) {
  if (!head.length) {
    head = tail;
    return;
  }
  const tailNum = Number(tail);
  const headNum = Number(head);
  let result = 0;
  if (operation === "+")
    result = (tailNum * precision + headNum * precision) / precision;
  if (operation === "-")
    result = (tailNum * precision - headNum * precision) / precision;
  if (operation === "÷" || operation === "/")
    result = (tailNum * precision) / (headNum * precision);
  if (operation === "×" || operation === "*")
    result =
      (tailNum * precision * headNum * precision) / (precision * precision);

  head = result.toString();
  dispaly.innerText = result;
  return;
}
