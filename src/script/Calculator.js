var Calculator = (function ()  {

    "use strict";

    const Operations = {
        Add: "add",
        Subtract: "subtract",
        Divide: "divide",
        Multiply: "multiply",
    };

    let _operation = function(operation, numbers = []) {
        let total = numbers[0],          // We always start of from the first number, E.g.: 5 - 3 = 2 and not -8 
            i,
            l = numbers.length,
            currentNumber;
        for (i = 1; i < l; i++) {
            currentNumber = numbers[i];
            if (typeof (currentNumber) == "number") {
                switch (operation) {
                    case "add":
                        total += currentNumber;
                        break;

                    case "subtract":
                        total -= currentNumber;
                        break;

                    case "divide":
                        total /= currentNumber;
                        break;

                    case "multiply":
                        total *= currentNumber;
                        break;

                    default:
                        break;
                }
            } else {
                throw Error(currentNumber + " is not a number");
            }
        }
        return total;
    };

    let add = function(numbers) {
        return _operation(Operations.Add, numbers);
    };

    let subtract = function(numbers) {
        return _operation(Operations.Subtract, numbers);
    };

    let divide = function(numbers) {
        return _operation(Operations.Divide, numbers);
    };

    let multiply = function(numbers) {
        return _operation(Operations.Multiply, numbers);
    };

    let calculator = {
        add: add,
        subtract: subtract,
        divide: divide,
        multiply: multiply,
        Operations: Operations,
    };


    return calculator;

})();
