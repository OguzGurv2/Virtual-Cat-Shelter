'use strict';

import { catStats, reasons, reasonExp, timer, startTime, skeys, svals } from './globals.js';
import { hungerVP, cleanVP, sleepVP, happinessVP, adjustAge, death } from './anims.js';
import { cleaning, sleeping, controlButtons, checkStat } from './gamemanager.js';

// setting handlers for other things such as btns...
const time = window.setInterval(timesLived, 1000);
const age = window.setInterval(adjustAge, 1000);
const feelControl = window.setInterval(controlStats, 100);

window.addEventListener('load', handlePage);
window.addEventListener('load', controlButtons);

// base pet functions
export function handlePage() {
  // setting handlers for other things such as btns...
  window.setInterval(death, 1000);
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

// control sleep
export function controlSleep() {
  catStats.sleep = Math.max(0, -0.125 + catStats.sleep);
  sleepVP();
}

// checks the time that cat died

export function timesLived() {
  let secs = '';
  let mins = '';
  let hrs = '';

  const endTime = Date.now();
  secs = Math.round((endTime - startTime) / 1000);
  mins = secs / 60;
  hrs = mins / 60;

  if (catStats.isAlive === false) {
    clearInterval(time);
    return;
  }
  if (secs < 60) {
    timer.textContent = secs + 's';
  } else if (secs < 3600) {
    secs = Math.round((mins - Math.floor(mins)) * 60);
    timer.textContent = Math.floor(mins) + 'm ' + secs + 's';
  } else if (secs < 74400) {
    secs = Math.round((mins - Math.floor(mins)) * 60);
    mins = Math.round((hrs - Math.floor(hrs)) * 60);
    timer.textContent = Math.floor(hrs) + 'hrs ' + Math.floor(mins) + 'm ';
  }
}

// gets the data for the death screen, reason of death etc.
function deathScreen() {
  const deathReason = document.querySelector('#death-reason');
  // play again button
  document.querySelector('#turn-home').addEventListener('click', () => { location.href = './index.html'; });
  if (checkReason) {
    deathReason.textContent = reasonExp[checkReason()];
    return;
  }

  deathReason.textContent = 'Neglecting';
}

// checks death reason
function checkReason() {
  for (let i = 0; i < reasonExp.length; i++) {
    if (Object.values(reasons)[i] === 5) {
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

export { hasClass, disableBtns, deathScreen, age, feelControl, time };
