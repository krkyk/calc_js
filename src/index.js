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

  console.log(leftValue);
  console.log(operator);
  console.log(currentNumber);

  updateDisplay();
};

// 演算子の処理
const handleOperator = (operator) => {
  if (operator === "=" && leftValue && currentNumber) {
    console.log("qqq");

    leftValue = calc();

    updateDisplay();
  } else if (operator !== "=" && !leftValue) {
    console.log("yyy");

    leftValue = parseFloat(currentNumber);
    currentNumber = "";

    updateDisplay();

    console.log(leftValue);
    console.log(operator);
    console.log(currentNumber);
  } else {
    throw new Error(`Sorry, please start over`);
  }

  // 左辺に対するオペレーターを保存
  operator = operator === "=" ? null : operator;
  currentNumber = "";
  updateDisplay();
};

// 計算処理
const calc = () => {
  const rightValue = parseFloat(currentNumber);
  // console.log(rightValue);
  // console.log(leftValue);

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
  // console.log("handleClearAll");

  updateDisplay();
};

// 表示の更新
const updateDisplay = () => {
  displayElement = currentNumber || leftValue || "0";
  document.getElementById("display").innerText = displayElement;

  // console.log(displayElement);
};
