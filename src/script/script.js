(function(){
    "use strict";
    let calculator_result,
        calculator_numbers,
        calculator_divide,
        calculator_multiply,
        calculator_subtract,
        calculator_add,
        calculator_reset,
        calculator_back,
        calculator_mode,
        calculator_operations,
        selected_operation,
        chosen_number,
        total;


    const KeyCodeMapping = {
        96: 0,
        97: 1,
        98: 2,
        99: 3,
        100: 4,
        101: 5,
        102: 6,
        103: 7,
        104: 8,
        105: 9,
        111: Calculator.Operations.Divide,
        106: Calculator.Operations.Multiply,
        109: Calculator.Operations.Subtract,
        107: Calculator.Operations.Add,
        8: "Clear",
        46: "Clear",
        67: "Clear",
    };



    let initializeElements = function(){
        calculator_result = document.querySelector(".js-result");

        calculator_numbers = document.querySelectorAll(".js-number");
        
        calculator_back = document.querySelector(".js-back");

        calculator_divide = document.querySelector(".js-divide");
        calculator_multiply = document.querySelector(".js-times");
        calculator_subtract = document.querySelector(".js-minus");
        calculator_add = document.querySelector(".js-add");

        calculator_operations[Calculator.Operations.Add] = calculator_add;
        calculator_operations[Calculator.Operations.Divide] = calculator_divide;
        calculator_operations[Calculator.Operations.Multiply] = calculator_multiply;
        calculator_operations[Calculator.Operations.Subtract] = calculator_subtract;

        calculator_reset = document.querySelector(".js-reset");

        calculator_mode = document.querySelector(".js-mode");
    }

    let addEvents = function(){
        // calculator_numbers
        for (let i = 0; i < calculator_numbers.length; i++) {
            const number = calculator_numbers[i];
            number.addEventListener("click", clicked.number.bind(null, number.innerHTML));
        }

        calculator_back.addEventListener("click", clicked.reset)

        calculator_divide.addEventListener("click", clicked.operation.bind(null, Calculator.Operations.Divide));
        calculator_multiply.addEventListener("click", clicked.operation.bind(null, Calculator.Operations.Multiply));
        calculator_subtract.addEventListener("click", clicked.operation.bind(null, Calculator.Operations.Subtract));
        calculator_add.addEventListener("click", clicked.operation.bind(null, Calculator.Operations.Add));

        calculator_reset.addEventListener("click", clicked.reset);
        
        calculator_mode.addEventListener("click", clicked.mode);

        document.addEventListener("keydown", keypressed.bind(event))

        console.log("Bindings set");
    };


    let keypressed = function (event) {
        let keycode = event.keyCode;
        let pressed_key = KeyCodeMapping[keycode];
        if (pressed_key !== undefined) {
            if (typeof(pressed_key) === "number") {
                clicked.number(pressed_key);
            } else {
                if (calculator_operations.includes(pressed_key)) {
                    clicked.operation(pressed_key);
                } else {
                    clicked.reset();
                }
            }
        }

    };

    let clicked = {
        number: function(number) {
            // Since we bound the object to the class, we can now access it via THIS. Read the documentation on .bind() above
            total = calculator_result.value;
            // console.log("Total is now " + total)
            switch (selected_operation) {
                case Calculator.Operations.Add:
                    calculator_result.value = Calculator.add([parseInt(total), parseInt(number)]);
                    break;
                case Calculator.Operations.Subtract:
                    calculator_result.value = Calculator.subtract([parseInt(total), parseInt(number)]);
                    break;
                case Calculator.Operations.Divide:
                    calculator_result.value = Calculator.divide([parseInt(total), parseInt(number)]);
                    break;
                case Calculator.Operations.Multiply:
                    calculator_result.value = Calculator.multiply([parseInt(total), parseInt(number)]);
                    break;
                default:
                    break;
            }
        },
        operation: function(operation) {
            // This is the operation that has been chosen by the user
            // Remove class on other operation buttons
            selected_operation = operation;
            for (let i = 0; i < calculator_operations.length; i++) {
                const operation = calculator_operations[i];
                if (calculator_operations[operation].classList.contains("js-operation-active")) {
                    calculator_operations[operation].classList.remove("js-operation-active");
                }
            }
            // Add an active class to the operation button
            calculator_operations[operation].classList.add("js-operation-active");
        },
        reset: function() {
            clearInput();
        },
        mode: function() {
            DarkMode.set();
        }
    }

    let clearInput = function(){
        calculator_result.value = 0;
    }


    let init = (function () {
        console.log("Init method executed")
        calculator_operations = Object.values(Calculator.Operations);
        initializeElements();
        addEvents();
    })();
})();
