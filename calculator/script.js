// Get the display element
const display = document.getElementById('display');

// Store the current calculation
let currentValue = '0';
let previousValue = '';
let operation = null;

// Update the display
function updateDisplay() {
    display.value = currentValue;
}

// Append a number to the display
function appendNumber(num) {
    // Prevent multiple decimal points
    if (num === '.' && currentValue.includes('.')) {
        return;
    }
    
    // Replace 0 with new number (unless it's a decimal point)
    if (currentValue === '0' && num !== '.') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    updateDisplay();
}

// Append an operator
function appendOperator(op) {
    // If no number entered, don't do anything
    if (currentValue === '') {
        return;
    }
    
    // If there's already an operation pending, calculate first
    if (operation !== null && previousValue !== '') {
        calculateResult();
    }
    
    previousValue = currentValue;
    operation = op;
    currentValue += ' ' + op + ' ';
    updateDisplay();
}

// Calculate the result
function calculateResult() {
    try {
        // Extract numbers and operation from display
        let parts = currentValue.split(' ');
        
        if (parts.length < 3) {
            return; // Not enough to calculate
        }
        
        let num1 = parseFloat(parts[0]);
        let op = parts[1].replace(/×/g, '*').replace(/−/g, '-');
        let num2 = parseFloat(parts[2]);
        
        let result;
        
        switch(op) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    currentValue = 'Error: Div by 0';
                    updateDisplay();
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return;
        }
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        currentValue = String(result);
        operation = null;
        previousValue = '';
        updateDisplay();
    } catch (error) {
        currentValue = 'Error';
        updateDisplay();
    }
}

// Clear the display
function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    updateDisplay();
}

// Delete the last character
function deleteLastChar() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

// Initialize the display on page load
updateDisplay();
