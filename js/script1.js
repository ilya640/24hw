const inputCounter = document.querySelector("#counter");

string = "";

function addToInput(event) {
    const number = event.target.getAttribute("data-value");
    inputCounter.value += number;
    string += number;
}

const numberButtons = document.querySelectorAll(".number");
const numberOperation = document.querySelectorAll(".operation");

numberButtons.forEach(button => {
    button.addEventListener("click", addToInput);
});

numberOperation.forEach(button => {
    button.addEventListener("click", addToInput);
});

document.getElementById("clear").addEventListener("click", clear);

function clear() {
    inputCounter.value = "";
    string = "";

}

document.getElementById("out").addEventListener("click", outCalc);

const OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
};

function parseExpression(expression) {
    const tokens = [];
    let num = '';

    for (const char of expression) {
        if (!isNaN(char) || char === '.') {
            num += char;
        } else if (char in OPERATORS) {
            if (num) {
                tokens.push(parseFloat(num));
                num = '';
            }
            tokens.push(char);
        } else {
            throw new Error(`Недопустимый символ: ${char}`);
        }
    }

    if (num) {
        tokens.push(parseFloat(num));
    }

    return tokens;
}

function evaluateExpression(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const operatorFunc = OPERATORS[tokens[i]];
            const result = operatorFunc(tokens[i - 1], tokens[i + 1]);
            tokens.splice(i - 1, 3, result);
            i -= 1;
        }
    }

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '+' || tokens[i] === '-') {
            const operatorFunc = OPERATORS[tokens[i]];
            const result = operatorFunc(tokens[i - 1], tokens[i + 1]);
            tokens.splice(i - 1, 3, result);
            i -= 1;
        }
    }

    if (tokens.length !== 1) {
        throw new Error("Ошибка при вычислении выражения");
    }

    return tokens[0];
}

function calculate(expression) {
    const tokens = parseExpression(expression);
    return evaluateExpression(tokens);
}


function outCalc() {
    inputCounter.value = calculate(string);
    string = calculate(string);
}