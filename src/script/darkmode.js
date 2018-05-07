let DarkMode = (function(){
    "use strict";
    let body;

    let initializeElements = function(){
        body = document.body;
    }

    let checkDarkMode = function(){
        if (window.location.hash == "#dark") {
            toggleDarkMode(true);
        }
    }
    let toggleDarkMode = function(on){
        if (!!on || typeof(on) === Boolean) {
            if (on === true) {
                body.classList.add("dark");
            } else {
                if (body.classList.contains("dark")) {
                    body.classList.remove("dark");
                } else {
                    console.warn("Not in darkmode.")
                }
            }
        } else {
            if (body.classList.contains("dark")) {
                body.classList.remove("dark");
            } else {
                body.classList.add("dark");
            }
        }

    }

    let init = (function(){
        console.log("Darkmode.js initialized");
        initializeElements();
        checkDarkMode();
    })();

    let darkmode = {
        set: toggleDarkMode,
    }

    return darkmode;

})();