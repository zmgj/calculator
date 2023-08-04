let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function() {
    let clear = document.querySelector(".clear");
    let decimal = document.querySelector(".decimal");
    let equal = document.querySelector(".equal");

    let operators = document.querySelectorAll(".operator");
    let numbers = document.querySelectorAll(".number");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        //textContent: grabs the text from the html and returns it
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e) {
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener("click", function() {
        previousValue = "";
        currentValue = "";
        previousScreen.textContent = previousValue;
        currentScreen.textContent = currentValue
    })
    
    equal.addEventListener("click", function() {
        calculate()
        previousScreen.textContent = '';
        if(previousValue.length <= 10) {
            currentScreen.textContent = previousValue;
        } else {
            currentScreen.textContent = previousValue.slice(0, 10) + '...';
        }
        
    })

    decimal.addEventListener("click", function() {
        addDecimal();
    })
})

function handleNumber(num) {
    if(currentValue.length <= 10) {
       currentValue += num; 
    }
    
}

function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}

function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+") {
        previousValue += currentValue;
    } else if(operator === "-") {
        previousValue -= currentValue;
    } else if(operator === "x") {
        previousValue *= currentValue;
    } else if(operator === "/") {
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
    if(!currentValue.includes(".")) {
        currentValue += ".";
    }
}