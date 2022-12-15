"use strict"

window.addEventListener('load', addHandlers);

function addHandlers() {
    window.setInterval(adjustHunger, 100); 
    document.querySelector("#feedMe").addEventListener('click', feedMe);
}

const feels = {
    hunger: 1
}

function feedMe() {
    feels.hunger = feels.hunger+ 0.02;
}

let count = 0;
function adjustHunger() {
    if (feels.hunger>1.15) {
        debugger;
        count = count + 1;
        feels.hunger= 1.15;

        // if the cat get overfed, game is over
        // if (count == 5) {
        //     document.querySelector("#feedMe").disabled= true;
        //     return adjustHunger;
        // }
    }
    adjustVP();
    feels.hunger = Math.max(0.9, -0.005+feels.hunger);
}

function adjustVP() {
    const body = document.querySelector("#body");
    body.setAttribute("transform", `translate(250,235) scale(${feels.hunger})` )
}