'use strict';

import { hungerVP, cleanVP, sleepVP, happinessVP, death } from './adjust.js';
import { cleaning, sleeping } from './petbuttons.js';

// base pet functions

// getting the time that cat created and checking that cat is alive
var startTime = '';
window.addEventListener('load', () => { startTime = Date.now(); });
const time = window.setInterval(timesLived, 1000);
const feelControl = window.setInterval(controlFeels, 100);
window.setInterval(death, 1000);

// setting handlers for other things such as btns...
window.addEventListener('load', addHandlers);

function addHandlers() {
  document.querySelector('#feedBtn').addEventListener('click', () => { feels.hunger += 4; feels.clean -= 2; });
  document.querySelector('#cleanBtn').addEventListener('click', cleaning);
  document.querySelector('#sleepBtn').addEventListener('click', sleeping);
  document.querySelector('#petBtn').addEventListener('click', () => { feels.pet += 2; });  

  const petName = document.querySelector('#catName');
  const name = localStorage.getItem('name');
  petName.textContent = name.toUpperCase();
  
  const cat = document.querySelector('#cat');
  const path = localStorage.getItem('path');
  fetch(path).then(r => r.text()).then(text => { cat.innerHTML = text; });
  
  const dirts = document.querySelector('#dirts');
  fetch('./svgs/dirt.svg').then(r => r.text()).then(text => { dirts.innerHTML = text; });
}

// creating seconds, minutes, and hours to calculate how long that cat lived  
var secs = '';
var mins = '';
var hrs = '';
const timer = document.querySelector('#times-lived');

// creating feels
const feels = {
  hunger: 100,
  clean: 100,
  sleep: 100,
  pet: 100,
  dirtCount: 0,
  isAlive: true,
  starve: 0,
  infection: 0,
  sleeplessness: 0
};

// controls decreasing and increasing of hunger, sleep, clean, and happiness over time
function controlFeels() {
  // control hunger
  if (feels.hunger > 105) {
    feels.hunger = 105;
  }
  hungerVP();
  feels.hunger = Math.max(80, -0.04 + feels.hunger);
  
  // control clean
  cleanVP();
  feels.clean = Math.max(0, -0.25 + feels.clean);
  
  // control pet
  if (feels.pet > 100) {
    feels.pet = 100;
  }
  feels.pet = Math.max(0, -1 + feels.pet);
  happinessVP();
}

// control sleep
function controlSleep() {
  sleepVP();
  feels.sleep = Math.max(0, -0.125 + feels.sleep);
}

// checks the time that cat died
function timesLived() {
  const endTime = Date.now();
  secs = Math.round((endTime-startTime)/1000);
  mins = secs/60;
  hrs = mins/60;
  
  if (feels.isAlive == false) {
    clearInterval(time);
    return;
  }
  if (secs < 60) {
    timer.textContent = secs + 's';
  }
  else if (secs <3600) {
    secs = Math.round((mins - Math.floor(mins))*60);
    timer.textContent = Math.floor(mins) + 'm ' + secs + 's';
  }
  else if (secs < 74400) {
    secs = Math.round((mins - Math.floor(mins))*60);
    mins = Math.round((hrs - Math.floor(hrs))*60);
    timer.textContent = Math.floor(hrs) + 'hrs ' + Math.floor(mins) + 'm ';
  }
  
}

// gets the data for the death screen, reason of death etc.
function deathScreen() {
  const deathReason = document.querySelector('#death-reason');

  if(feels.infection === 5) {
    deathReason.textContent = 'Lack of hygiene';
    return;
  }
  if(feels.starve === 5) {
    deathReason.textContent = 'Starving';
    return;
  }
  if(feels.sleeplessness === 5) {
    deathReason.textContent = 'Lack of sleep';
    return;
  }

  deathReason.textContent = 'Neglecting';
}

// other substiantial functions that helps all the game system
function hasClass(element, clsName) {
  return (' ' + element.getAttribute("class") + ' ').indexOf(' ' + clsName+ ' ') > -1;
}

function disableBtns(buttons) {
  for(var i = 0, l = buttons.length; i < l; i++) {   
    buttons[i].disabled = true;
  }
}

export { feels, controlSleep, controlFeels, time, hasClass, disableBtns, feelControl, deathScreen };
