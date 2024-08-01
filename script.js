document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('#calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    keys.addEventListener('click', event => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) return;

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                calculate();
                break;
            case 'all-clear':
                clear();
                break;
            case 'plus-minus':
                toggleSign();
                break;
            case '%':
                inputPercent();
                break;
            case '.':
                inputDecimal(value);
                break;
            default:
                inputNumber(value);
                break;
        }
        updateScreen();
    });

    function handleOperator(nextOperator) {
        if (operator && currentInput) {
            calculate();
        } else {
            previousInput = currentInput;
        }
        operator = nextOperator;
        currentInput = '';
    }

    function calculate() {
        let result = 0;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
    }

    function toggleSign() {
        currentInput = (currentInput.charAt(0) === '-') ? currentInput.slice(1) : `-${currentInput}`;
    }

    function inputPercent() {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }

    function inputDecimal(dot) {
        if (!currentInput.includes(dot)) {
            currentInput += dot;
        }
    }

    function inputNumber(number) {
        currentInput += number;
    }

    function updateScreen() {
        calculatorScreen.value = currentInput;
    }
});
