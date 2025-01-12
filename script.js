
//Declare all the required selectors as variables to work on them
const operatorAndDigits = document.querySelectorAll("button.digit, button.operator");
const displayDiv = document.querySelector("div.display")
const clear = document.querySelector("button.clear")
const equals = document.querySelector("button.equals")

//Declaring the 3 main components of the calculator.
//First Operand is the first number clicked, Operator is the math operator (+,-,/,*) and 
//Second Operand is number after the Operator
let firstOperand = "";
let secondOperand = "";
let operator = "";


function add(num1, num2) {
    return parseInt(num1) + parseInt(num2) //parsed the numbers to integer - if not done, the function concatenates strings intead.
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

//Creating a function that operates on the operands and operator based on what operator was used.
function operate(operator, firstNum, secondNum) {
    if (operator === "+") {
        return add(firstNum, secondNum); //For addition
    }

    else if (operator === "-") {
        return subtract(firstNum, secondNum); //For subtraction 
    }

    else if (operator === "*") {
        return multiply(firstNum, secondNum); //For multiplication
    }

    else if (operator === "/") {
        return divide(firstNum, secondNum); //For division
    }

    else alert("invalid input!") //Alerting invalid input if somehow the operator is not among the 4 above, unlikely but good to be safe
}

//Adding a clear button function, clears display upon clicking
clear.addEventListener("click", () => {
    displayDiv.textContent = "";
    firstOperand = "";
    operator = "";
    secondOperand = "";
    lastInputWasOperator = false;
})


let lastInputWasOperator = false; //Boo variable to check if last button clicked was a operator or not. Used to distinguish between first and second operand 
let clickedFirstTime = true; //Boo variable to check if a button(operand or operator) was clicked for the first time.  
for (let button of operatorAndDigits) {
    button.addEventListener("click", () => {
        
        //If a button was clicked for the first time, we clear the display and flick the Boo variable to false.
        if (clickedFirstTime) {
            displayDiv.textContent = "";
            clickedFirstTime = false;
        }
        
        //Variables for if a button is a digit(operand) or operator
        const isDigit = button.classList.contains("digit");
        const isOperator = button.classList.contains("operator");
        
        if (isDigit && !lastInputWasOperator) { //if the button clicked is a digit and the last input was NOT an operator, we classify that as the first operand
            // Append digits to the display
            displayDiv.textContent += button.textContent;
            lastInputWasOperator = false; // Reset operator flag
            firstOperand += button.textContent;
            console.log(firstOperand)
        } else if (isOperator && !lastInputWasOperator) { ////if the button clicked is an operator and the last input was NOT an operator, we classify that as the operator
            // Add operator only if the last input wasn't an operator
            displayDiv.textContent += ` ${button.textContent} `;
            lastInputWasOperator = true; // Set operator flag
            operator = button.textContent;
            console.log(operator)
        } else if (isDigit && lastInputWasOperator) { //if the button clicked is a digit and the last input WAS an operator, we classify that as the second operand
            displayDiv.textContent += button.textContent;
            secondOperand += button.textContent
            lastInputWasOperator = false; // Reset operator flag
            console.log(secondOperand)
        }

        
    });
}

//When clicked on equals signs, it runs the operate function on the operator, first and second operands above.
equals.addEventListener("click", () => {
    let result = operate(operator, firstOperand,secondOperand);
    displayDiv.textContent = result;
})