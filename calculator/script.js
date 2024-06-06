document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let firstOperand = null;
    let secondOperand = null;
    let currentOperation = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { number, action } = button.dataset;
            if (number !== undefined) {
                appendNumber(number);
            } else if (action !== undefined) {
                handleAction(action);
            }
        });
    });

    function appendNumber(number) {
        if (display.textContent === '0' || shouldResetDisplay) {
            display.textContent = number;
            shouldResetDisplay = false;
        } else {
            display.textContent += number;
        }
    }

    function handleAction(action) {
        switch (action) {
            case 'clear':
                clear();
                break;
            case 'backspace':
                backspace();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                chooseOperation(action);
                break;
            case 'calculate':
                calculate();
                break;
            case 'decimal':
                addDecimal();
                break;
        }
    }

    function clear() {
        display.textContent = '0';
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
    }

    function backspace() {
        if (display.textContent.length === 1) {
            display.textContent = '0';
        } else {
            display.textContent = display.textContent.slice(0, -1);
        }
    }

    function chooseOperation(action) {
        if (currentOperation !== null) {
            calculate();
        }
        firstOperand = parseFloat(display.textContent);
        currentOperation = action;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (currentOperation === null || shouldResetDisplay) return;
        secondOperand = parseFloat(display.textContent);
        let result;
        switch (currentOperation) {
            case 'add':
                result = firstOperand + secondOperand;
                break;
            case 'subtract':
                result = firstOperand - secondOperand;
                break;
            case 'multiply':
                result = firstOperand * secondOperand;
                break;
            case 'divide':
                result = firstOperand / secondOperand;
                break;
        }
        display.textContent = result;
        firstOperand = result;
        currentOperation = null;
    }

    function addDecimal() {
        if (shouldResetDisplay) {
            display.textContent = '0';
            shouldResetDisplay = false;
        }
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    }
});
