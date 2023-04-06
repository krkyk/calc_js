import "./styles.css";

/** @type {string} 現在の入力値　*/
let currentNumber = "";
/** @type {string} 演算子　*/
let operator = "";
/** @type {null|number} 演算子入力前の入力値　*/
let leftValue = null;
/** @type {null|Element} 入力値や演算結果の表示要素　*/
let displayElement = null;

// 数字ボタンを押したときの処理
const numpudElements = document.querySelectorAll(".numpad");
numpudElements.forEach((numpudElement) => {
  numpudElement.addEventListener("click", (e) => {
    handleNumpad(e.currentTarget.textContent);
  });
});

// 演算子ボタンを押したときの処理
const operatorElements = document.querySelectorAll(".operator");
operatorElements.forEach((operatorElement) => {
  operatorElement.addEventListener("click", (e) =>
    handleOperator(e.currentTarget.textContent)
  );
});

// クリアボタンを押したときの処理
const clearAllElement = document.getElementById("clear-all");
clearAllElement.addEventListener("click", () => handleClearAll());

// 数字の入力処理
const handleNumpad = (num) => {
  if (currentNumber.length === 0 && num === "0") {
    return;
  }

  currentNumber += num;

  updateDisplay();
};

// 演算子の処理
const handleOperator = (inputOperator) => {
  if (inputOperator === "=" && leftValue && currentNumber) {
    leftValue = calc(operator);
    currentNumber = "";

    updateDisplay();
  } else if (inputOperator !== "=" && !leftValue) {
    leftValue = parseFloat(currentNumber);
    currentNumber = "";
    operator = inputOperator;

    updateDisplay();
  } else {
    alert("Sorry, please start over");
    handleClearAll();
  }
};

// 計算処理
const calc = (operator) => {
  const rightValue = parseFloat(currentNumber);

  switch (operator) {
    case "+":
      return leftValue + rightValue;
    case "-":
      return leftValue - rightValue;
    case "×":
      return leftValue * rightValue;
    case "÷":
      return leftValue / rightValue;
    default:
      throw new Error(`Unsupported operator ${operator}`);
  }
};

// すべて削除
const handleClearAll = () => {
  currentNumber = "";
  operator = null;
  leftValue = null;

  updateDisplay();
};

// 表示の更新
const updateDisplay = () => {
  displayElement = currentNumber || leftValue || "0";
  document.getElementById("display").innerText = displayElement;
};
