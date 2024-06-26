const MAX_LEN = 15;

let [num1, num2, operator] = ["", "", ""];

const displayText = document.querySelector("#display .text");

const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", clickButton);

function clickButton(e) {
    let button = e.target;
    switch(true) {
        case button.classList.contains("num"):
            handleNum(button.textContent);
            break;
        case button.classList.contains("operator"):
            handleOperator(button.textContent);
            break;
        case button.classList.contains("equals"):
            handleEquals();
            break;
        case button.classList.contains("dot"):
            handleDot();
            break;
        case button.id === "clear":
            handleClear();
            break;
        case button.id === "delete":
            handleDelete();
            break;
        default:
    }
}

function handleNum(num) {
    // only happens after hitting equals
    if (typeof num1 === "number" && !num2 && !operator) {
        handleClear();
    }

    let curNum = num;
    if (operator && (num2 || curNum != 0)) {
        if (num2.length < MAX_LEN) {
            num2 += curNum;
        }
        curNum = num2;
    } else if (num1 || curNum != 0) {
        if (num1.length < MAX_LEN) {
            num1 += curNum;
        }
        curNum = num1;
    } else {
        return;
    }
    displayText.textContent = curNum;
}

function handleOperator(op) {
    if (num2) {
        handleEquals();
    }
    operator = op;
}

function handleEquals() {
    if (!operator || !num2) {
        return;
    }

    let val = operate(+num1, +num2, operator);
    handleClear();
    if (val.toString().length > MAX_LEN) {
        displayText.textContent = "OVERFLOW ERROR";
    } else {
        displayText.textContent = val;
        num1 = val;
    }
}

function handleDot() {
    if (num2 && num2.includes(".")) {
        return;
    } else if (num1 && num1.includes(".")) {
        return;
    } else if (num2) {
        num2 += ".";
    } else {
        num1 += ".";
    }
}

function handleClear() {
    num1 = "";
    num2 = "";
    operator = "";
    displayText.textContent = "";
}

function handleDelete() {
    if (num2) {
        num2 = num2.slice(0, -1);
        displayText.textContent = num2;
    } else if (num1) {
        num1 = num1.slice(0, -1);
        displayText.textContent = num1;
    }
}

function operate(a, b, op) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    let val = (a / b);
    return +val.toString().substring(0, 15);
}