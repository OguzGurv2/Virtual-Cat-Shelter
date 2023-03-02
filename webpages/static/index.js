'use strict';

import {hungerVP, cleanVP, sleepVP, happinessVP} from "./adjust.js";
import {cleaning, sleeping} from "./buttons.js";

window.addEventListener('load', addHandlers);

function addHandlers() {
  window.setInterval(controlFeels, 100);
  document.querySelector('#feedBtn').addEventListener('click', () => { feels.hunger += 4; feels.clean -= 2;});
  document.querySelector('#cleanBtn').addEventListener('click', cleaning);
  document.querySelector('#sleepBtn').addEventListener('click', sleeping);
  document.querySelector('#petBtn').addEventListener('click', () => { feels.pet += 2;});  
}

const dirts = document.getElementById('dirts');
fetch('svg/dirt.svg').then(r => r.text()).then(text => { dirts.innerHTML = text;});
const toggle = document.querySelector('#sleepBtn');

// creating feels
const feels = {
  hunger: 100,
  clean: 100,
  sleep: 100,
  pet: 100,
  dirtCount: 0
  };


//controls feels that are decreasing and controls them

//controls hunger, clean, happiness
  function controlFeels() {
  //control hunger
    if (feels.hunger > 105) {
      feels.hunger = 105;
    }
    hungerVP();
    feels.hunger = Math.max(80, -0.04 + feels.hunger);
    
    //control clean
    cleanVP();
    feels.clean = Math.max(0, -0.25 + feels.clean);
    
    //control pet
    if (feels.pet > 100) {
      feels.pet = 100;
    }
    feels.pet = Math.max(0, -1 + feels.pet);
    happinessVP();
  }
  
  function controlSleep() {
    sleepVP();
    feels.sleep = Math.max(0, -0.25 + feels.sleep);
  }

export { feels, toggle, controlSleep };