
//Declare all the required selectors as variables to work on them
const operatorAndDigits = document.querySelectorAll("button.digit, button.operator");
const displayDiv = document.querySelector("div.display")
const clear = document.querySelector("button.clear")
const equals = document.querySelector("button.equals")
const backSpace = document.querySelector("button.backspace")

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
    if (num2 == 0) { // Check if the denominator is zero
        alert("No can do! Division by zero is not allowed.");
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
let lastButtonWas = "";
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
            lastButtonWas = "firstOperand";
            console.log(firstOperand)
            console.log(lastButtonWas)
        } else if (isOperator && !lastInputWasOperator) {
            // If an operator is clicked, and there's already a firstOperand and operator,
            // calculate the result of the previous operation before updating the operator
            if (firstOperand && secondOperand && operator) {
                firstOperand = operate(operator, firstOperand, secondOperand).toString(); // Perform calculation
                displayDiv.textContent = `${firstOperand} ${button.textContent} `; // Update the display
                secondOperand = ""; // Reset the second operand
            } else {
                // Otherwise, just add the operator to the display
                displayDiv.textContent += ` ${button.textContent} `;
            }
            
            lastInputWasOperator = true;
            operator = button.textContent;
            lastButtonWas = "operator"
            console.log(operator);
            console.log(lastButtonWas)
        } else if (isDigit && lastInputWasOperator) { //if the button clicked is a digit and the last input WAS an operator, we classify that as the second operand
            displayDiv.textContent += button.textContent;
            secondOperand += button.textContent
            lastInputWasOperator = false; // Reset operator flag
            lastButtonWas = "secondOperand";
            console.log(secondOperand)
            console.log(lastButtonWas)
        }

        
    });
}

backSpace.addEventListener("click", () => {
    // Remove the last character from the display
    displayDiv.textContent = displayDiv.textContent.slice(0, -1);

    if (lastButtonWas === "firstOperand") {
        // Remove the last character from the firstOperand
        firstOperand = firstOperand.slice(0, -1);
    } else if (lastButtonWas === "secondOperand") {
        // Remove the last character from the secondOperand
        secondOperand = secondOperand.slice(0, -1);
    } else if (lastButtonWas === "operator") {
        // Clear the operator and reset the flag
        operator = "";
        lastInputWasOperator = false;
    }

    // If everything is empty, reset the clickedFirstTime flag to allow clearing properly
    if (!firstOperand && !secondOperand && !operator) {
        clickedFirstTime = true;
    }
});

//When clicked on equals signs, it runs the operate function on the operator, first and second operands above.
equals.addEventListener("click", () => {
    if (firstOperand && secondOperand && operator) {
        let result = operate(operator, firstOperand, secondOperand).toString();
        displayDiv.textContent = result;
        firstOperand = result; // Set result as the new first operand for further operations
        secondOperand = ""; // Reset the second operand
        operator = ""; // Reset the operator
        lastInputWasOperator = false;
    }
});