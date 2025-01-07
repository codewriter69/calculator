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
    return num1 / num2
}

let firstOperand;
let secondOperand;
let Operator;

let plus = document.querySelector(".plus")

plus.addEventListener("click", (e) => {
    console.log(e.target.target)
}) 
    
