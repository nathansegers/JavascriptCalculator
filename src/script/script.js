(function(){
    "use strict";
    let calculator_result,
        calculator_numbers,
        calculator_divide,
        calculator_times,
        calculator_minus,
        calculator_add,
        calculator_reset,
        calculator_back,
        calculator_mode,
        calculator_operations,
        selected_operation,
        chosen_number,
        total;


    let initializeElements = function(){
        calculator_result = document.querySelector(".js-result");

        calculator_numbers = document.querySelectorAll(".js-number");
        
        calculator_back = document.querySelector(".js-back");

        calculator_divide = document.querySelector(".js-divide");
        calculator_times = document.querySelector(".js-times");
        calculator_minus = document.querySelector(".js-minus");
        calculator_add = document.querySelector(".js-add");

        calculator_operations = [calculator_add, calculator_divide, calculator_times, calculator_minus]

        calculator_reset = document.querySelector(".js-reset");

        calculator_mode = document.querySelector(".js-mode");
    }

    let addEvents = function(){
        // calculator_numbers
        for (let i = 0; i < calculator_numbers.length; i++) {
            const number = calculator_numbers[i];
            number.addEventListener("click", clicked.number.bind(number.innerHTML));
        }

        calculator_back.addEventListener("click", clicked.back)

        calculator_divide.addEventListener("click", clicked.operation.bind(Calculator.Operations.Divide, calculator_divide));
        calculator_times.addEventListener("click", clicked.operation.bind(Calculator.Operations.Multiply, calculator_times));
        calculator_minus.addEventListener("click", clicked.operation.bind(Calculator.Operations.Subtract, calculator_minus));
        calculator_add.addEventListener("click", clicked.operation.bind(Calculator.Operations.Add, calculator_add));

        calculator_reset.addEventListener("click", clicked.reset);
        
        calculator_mode.addEventListener("click", clicked.mode);


        console.log("Bindings set");
    };

    let clicked = {
        number: function() {
            // Since we bound the object to the class, we can now access it via THIS. Read the documentation on .bind() above
            total = calculator_result.value;
            chosen_number = this;
            // console.log("Selected number " + chosen_number)
            // console.log("Total is now " + total)
            switch (selected_operation) {
                case "add":
                    calculator_result.value = Calculator.add([parseInt(total), parseInt(chosen_number)]);
                    break;
                case "subtract":
                    calculator_result.value = Calculator.subtract([parseInt(total), parseInt(chosen_number)]);
                    break;
                case "divide":
                    calculator_result.value = Calculator.divide([parseInt(total), parseInt(chosen_number)]);
                    break;
                case "multiply":
                    calculator_result.value = Calculator.multiply([parseInt(total), parseInt(chosen_number)]);
                    break;
                default:
                    break;
            }
        },
        back: function() {
            clearInput();
        },
        operation: function(element) {
            // This is the operation that has been chosen by the user
            selected_operation = this;
            console.log("Set operation to " + this);

            // Remove class on other operation buttons
            for (let i = 0; i < calculator_operations.length; i++) {
                const all_operations = calculator_operations[i];
                if (all_operations.classList.contains("js-operation-active")) {
                    all_operations.classList.remove("js-operation-active");
                }
            }
            // Add an active class to the operation button
            element.classList.add("js-operation-active");
        },
        reset: function() {
            clearInput();
        },
        mode: function() {
            console.log("Change mode button clicked");
        }
    }

    let clearInput = function(){
        calculator_result.value = 0;
    }


    let init = (function () {
        console.log("Init method executed")
        initializeElements();
        addEvents();
    })();
})();

