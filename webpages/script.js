"use strict"

window.addEventListener('load', addHandlers);

function addHandlers() {
    window.setInterval(adjustHunger, 100); 
    window.setInterval(adjustClean, 100);
    window.setInterval(adjustSleep, 100);
    window.setInterval(adjustPet, 100);
    document.querySelector("#feedMe").addEventListener('click', feedMe);
    document.querySelector("#cleanMe").addEventListener('click', cleanMe);
    document.querySelector("#sleepMe").addEventListener('click', sleepMe);
    document.querySelector("#petMe").addEventListener('click', petMe);
}

const feels = {
    hunger: 1,
    clean: 1,
    sleep: 1,
    pet: 1
}

function feedMe() {
    feels.hunger = feels.hunger+ 0.02;
}

function cleanMe() {
    feels.clean = feels.clean+ 0.02;
}

function sleepMe() {
    feels.sleep = feels.sleep+ 0.02;
}

function petMe() {
    feels.pet = feels.pet+ 0.02;
}

function adjustHunger() {
    // let count = 0;
    // while (count < 6) {
    //     if (feels.hunger > 1.15) {
    //         count =+ 1;
    //         feels.hunger= 1.15;
    //     }
    //     else if (count = 5) {
    //         document.querySelector("#feedMe").disabled= true;
    //         break;
    //     }     
    //     hungerVP();
    //     feels.hunger = Math.max(0.8, -0.001+feels.hunger);
    // }

    if (feels.hunger > 1.15) {
        feels.hunger= 1.15;
    }
    hungerVP();
    feels.hunger = Math.max(0.8, -0.001+feels.hunger);
}

function adjustClean() {
    if (feels.clean > 1) {
        feels.clean = 1;
    }
    cleanVP();
    feels.clean = Math.max(0.8, -0.001+feels.clean);
}

function adjustSleep() {
    if (feels.sleep > 1) {
        feels.sleep = 1;
    }
    sleepVP();
    feels.sleep = Math.max(0.8, -0.001+feels.sleep);
}

function adjustPet() {
    if (feels.pet > 1) {
        feels.pet = 1;
    }
    petVP();
    feels.pet = Math.max(0.8, -0.001+feels.pet);
}

function hungerVP() {
    const body = document.querySelector("#body");
    let hungerBar = document.getElementById("hungerBar");
    body.setAttribute("transform", `translate(250,235) scale(${feels.hunger})` )
    hungerBar.value = feels.hunger;
}

function cleanVP() {
    let cleanBar = document.getElementById("cleanBar");
    cleanBar.value = feels.clean;
}

function sleepVP() {
    let sleepBar = document.getElementById("sleepBar");
    sleepBar.value = feels.sleep;
}

function petVP() {
    let petBar = document.getElementById("petBar");
    petBar.value = feels.pet;
}