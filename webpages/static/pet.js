'use strict';

import { catStats, dReasons, reasonExp, skeys, svals } from './globals.js';
import { hungerVP, cleanVP, sleepVP, happinessVP, death, timesLived } from './anims.js';
import { cleaning, controlButtons, sleeping, checkStat } from './gamemanager.js';


// setting handlers for other things such as btns...
const time = window.setInterval(timesLived, 1000);
const feelControl = window.setInterval(controlStats, 100);

window.addEventListener('load', handlePage);
window.addEventListener('load', controlButtons);
window.setInterval(death, 1000);

// base pet functions
export function handlePage() {
  // handles buttons
  document.querySelector('#feedBtn').addEventListener('click', () => { catStats.hunger += 4; catStats.clean -= 2; });
  document.querySelector('#cleanBtn').addEventListener('click', cleaning);
  document.querySelector('#sleepBtn').addEventListener('click', sleeping);
  document.querySelector('#petBtn').addEventListener('click', () => { catStats.pet += 2; });

  // handles the data
  const petName = document.querySelector('#catName');
  const name = localStorage.getItem('name');
  petName.textContent = name.toUpperCase();

  const cat = document.querySelector('#cat');
  const path = localStorage.getItem('path');
  fetch(path).then(r => r.text()).then(text => { cat.innerHTML = text; });

  const dirts = document.querySelector('#dirts');
  fetch('./svgs/dirt.svg').then(r => r.text()).then(text => { dirts.innerHTML = text; });

  for (let i = 0; i < skeys.length; i++) {
    if (localStorage.getItem(skeys[i])) {
      // alert(localStorage.getItem(skeys[i]));
      if (typeof svals[i] === 'number') {
        catStats[skeys[i]] = Math.floor(localStorage.getItem(skeys[i]));
      } else {
        catStats[skeys[i]] = localStorage.getItem(skeys[i]);
      }
      // alert(catStats[skeys[i]]);
    }
  }
  setInterval(checkStat, 1000);
}

// controls decreasing and increasing of hunger, sleep, clean, and happiness over time
export function controlStats() {
  for (let i = 0; i < 4; i++) {
    if (catStats[skeys[i]] > 105) {
      catStats[skeys[i]] = 105;
    }
  }
  if (catStats.pet > 105) {
    catStats.pet = 105;
  }

  catStats.hunger = Math.max(80, -0.04 + catStats.hunger);
  catStats.clean = Math.max(0, -0.25 + catStats.clean);
  catStats.pet = Math.max(0, -1 + catStats.pet);

  hungerVP();
  cleanVP();
  happinessVP();
}

// controls sleep stat
export function controlSleep() {
  catStats.sleep = Math.max(0, -0.125 + catStats.sleep);
  sleepVP();
}

// checks death reason
export function checkReason() {
  for (let i = 0; i < reasonExp.length; i++) {
    if (Object.values(dReasons)[i] === 5) {
      return i - 1;
    }
  }
}

// substiantial function that helps the stats system
function hasClass(element, clsName) {
  return (' ' + element.getAttribute('class') + ' ').indexOf(' ' + clsName + ' ') > -1;
}

// disables buttons in case of spamming
function disableBtns(buttons) {
  for (let i = 0, l = buttons.length; i < l; i++) {
    buttons[i].disabled = true;
  }
}

export { hasClass, disableBtns, feelControl, time };
