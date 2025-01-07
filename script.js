function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    if (num1 === 0) {
        alert("No can do!");
    }
    return num1 / num2
}

let firstOperand;
let secondOperand;
let operator;

function operate(operator, firstNum, secondNum) {
    if (operator === "+") {
        return add(firstNum, secondNum);
    }

    else if (operator === "-") {
        return subtract(firstNum, secondNum);
    }

    else if (operator === "*") {
        return multiply(firstNum, secondNum);
    }

    else if (operator === "/") {
        return divide(firstNum, secondNum);
    }

    else alert("invalid input!")
}

const operatorAndDigits = document.querySelectorAll("button.digit, button.operator");
const displayDiv = document.querySelector("div.display")
const clear = document.querySelector("button.clear")

let lastInputWasOperator = false;
for (let button of operatorAndDigits) {
    button.addEventListener("click", () => {
        const isDigit = button.classList.contains("digit");
        const isOperator = button.classList.contains("operator");

        if (isDigit) {
            // Append digits to the display
            displayDiv.textContent += button.textContent;
            lastInputWasOperator = false; // Reset operator flag
        } else if (isOperator && !lastInputWasOperator) {
            // Add operator only if the last input wasn't an operator
            displayDiv.textContent += ` ${button.textContent} `;
            lastInputWasOperator = true; // Set operator flag
        }
    });
}


clear.addEventListener("click", () => {
    displayDiv.textContent = " ";
})