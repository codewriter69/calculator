// Declare all the required selectors
const operatorAndDigits = document.querySelectorAll("button.digit, button.operator");
const displayDiv = document.querySelector("div.display");
const clear = document.querySelector("button.clear");
const equals = document.querySelector("button.equals");
const backSpace = document.querySelector("button.backspace");

// Main calculator variables
let firstOperand = "";
let secondOperand = "";
let operator = "";
let lastInputWasOperator = false; // Tracks if the last input was an operator
let currentOperand = "first"; // Tracks which operand (first or second) is being built

// Arithmetic functions
function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    if (num2 === 0) {
        alert("Division by zero is not allowed.");
        return "Error";
    }
    return parseFloat(num1) / parseFloat(num2);
}

// Function to perform calculations based on the operator
function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
        default:
            alert("Invalid operator!");
            return null;
    }
}

// Clear functionality
clear.addEventListener("click", () => {
    displayDiv.textContent = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    lastInputWasOperator = false;
    currentOperand = "first";
});

// Backspace functionality
backSpace.addEventListener("click", () => {
    if (currentOperand === "first") {
        // Remove the last digit from firstOperand
        firstOperand = firstOperand.slice(0, -1);
        displayDiv.textContent = firstOperand;
    } else if (currentOperand === "second") {
        // Remove the last digit from secondOperand
        secondOperand = secondOperand.slice(0, -1);
        displayDiv.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    }

    // If secondOperand is empty and operator exists, remove the operator
    if (!secondOperand && operator && currentOperand === "first") {
        operator = "";
        displayDiv.textContent = firstOperand;  // Display only firstOperand without the operator
    }

    // If both operands and operator are empty, clear the display completely
    if (!firstOperand && !secondOperand && !operator) {
        displayDiv.textContent = "";
        currentOperand = "first"; // Start building the first operand after clearing everything
    }
});

// Main button click functionality
for (let button of operatorAndDigits) {
    button.addEventListener("click", () => {
        const isDigit = button.classList.contains("digit");
        const isOperator = button.classList.contains("operator");

        if (isDigit) {
            if (currentOperand === "first") {
                firstOperand += button.textContent;
                displayDiv.textContent = firstOperand;
            } else if (currentOperand === "second") {
                secondOperand += button.textContent;
                displayDiv.textContent = `${firstOperand} ${operator} ${secondOperand}`;
            }
            lastInputWasOperator = false;
        } else if (isOperator) {
            if (firstOperand && secondOperand && operator) {
                firstOperand = operate(operator, firstOperand, secondOperand).toString();
                secondOperand = "";
                displayDiv.textContent = `${firstOperand} ${button.textContent}`;
            } else if (firstOperand && !secondOperand) {
                operator = button.textContent;
                displayDiv.textContent = `${firstOperand} ${operator}`;
                currentOperand = "second";
            } else if (!firstOperand) {
                alert("Please enter a number first!");
            }
            lastInputWasOperator = true;
        }
    });
}

// Equals functionality
equals.addEventListener("click", () => {
    if (firstOperand && secondOperand && operator) {
        let result = operate(operator, firstOperand, secondOperand).toString();
        displayDiv.textContent = result;
        firstOperand = result;
        secondOperand = "";
        operator = "";
        lastInputWasOperator = false;
        currentOperand = "first";
    }
});
