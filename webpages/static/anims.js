'use strict';

import { catStats, dReasons, startTime, rkeys, skeys, timer, reasonExp } from './globals.js';
import { hasClass, disableBtns, feelControl, time, checkReason } from './pet.js';
import { toggle, awake } from './gamemanager.js';

// functions that adjusts stats and some animations to cat

// some global elems that used by other js files
const buttons = document.querySelectorAll('.button');
const vpHappiness = document.getElementById('happiness');

// adjusts feeding to the cat and stats
function hungerVP() {
  const body = document.querySelector('#body');
  const hungerBar = document.getElementById('hungerBar');
  body.setAttribute('transform', ` scale(${catStats.hunger / 100})`);
  hungerBar.value = catStats.hunger;
}

// adjusts dirts to cat and stats
function cleanVP() {
  if (catStats.clean < 75 && catStats.dirtCount === 0) {
    catStats.dirtCount++;
    addDirt();
  } else if (catStats.clean < 65 && catStats.dirtCount === 1) {
    catStats.dirtCount++;
    addDirt();
  } else if (catStats.clean < 55 && catStats.dirtCount === 2) {
    catStats.dirtCount++;
    addDirt();
  } else if (catStats.clean < 45 && catStats.dirtCount === 3) {
    catStats.dirtCount++;
    addDirt();
  } else if (catStats.clean < 35 && catStats.dirtCount === 4) {
    catStats.dirtCount++;
    addDirt();
  }
  if (catStats.clean > 100) {
    catStats.clean = 100;
  }

  const cleanBar = document.getElementById('cleanBar');
  cleanBar.value = catStats.clean;
}

// additional adding dirt function
function addDirt() {
  const svg = document.querySelector('svg');
  const dirt = document.getElementById('dirt');
  const newDirt = dirt.cloneNode(true);
  newDirt.classList.remove('hidden');
  newDirt.id = 'clone';
  newDirt.setAttribute('transform', `translate(${Math.random() * (100) + 25}, ${Math.random() * (75) + 100})`);
  newDirt.setAttribute('fill', '#6e5001');
  newDirt.style.opacity = '60%';
  svg.appendChild(newDirt);
}

// this function only adjusts stats to the interface
function sleepVP() {
  const sleepBar = document.getElementById('sleepBar');
  sleepBar.value = catStats.sleep;
}

// toggling anims for sleeping


export function sleepingAnim() {
  const eyes = document.querySelector('#eyes');
  eyes.classList.replace('blink', 'fall-asleep');
  const an1 = document.querySelector('.fall-asleep');
  an1.addEventListener('animationend', () => {
    document.querySelector('#sleepBtn').disabled = false;
    eyes.classList.replace('fall-asleep', 'sleeping')
  });
  toggle.textContent = 'Wake up';
  toggle.value = 'sleep';
  disableBtns(buttons);
}

export function wakingAnim() {
  const eyes = document.querySelector('#eyes');
  eyes.classList.replace('sleeping', 'waking');
  const an2 = document.querySelector('.waking');
  an2.addEventListener('animationend', () => {
    eyes.classList.replace('waking', 'blink');
    document.querySelector('#sleepBtn').disabled = false;
  });
  toggle.value = 'wakeup';
  toggle.textContent = 'Sleep';
  document.querySelector('#feedBtn').disabled = false;
  document.querySelector('#cleanBtn').disabled = false;
  document.querySelector('#petBtn').disabled = false;
  document.querySelector('#sleepBtn').disabled = true;
}

// adjusts cat's tail anim depeding on cat's happiness
function happinessVP() {
  const hunger = (catStats.hunger - 80) * 5;
  const happiness = (catStats.pet + catStats.clean + hunger + catStats.sleep) / 4;
  const tail = document.getElementById('fall');

  if (happiness > 80) {
    vpHappiness.style.color = '#2c4c3b';
    vpHappiness.textContent = 'Ecstatic';
    tail.style['-webkit-animation-duration'] = 1 + 's';
  } else if (happiness > 60) {
    vpHappiness.style.color = '#306844';
    vpHappiness.textContent = 'Happy';
    tail.style['-webkit-animation-duration'] = 2 + 's';
  } else if (happiness > 40) {
    vpHappiness.style.color = 'orange';
    vpHappiness.textContent = 'Mediocre';
    tail.style['-webkit-animation-duration'] = 3 + 's';
  } else if (happiness > 20) {
    vpHappiness.style.color = 'red';
    vpHappiness.textContent = 'Sad';
    tail.style['-webkit-animation-duration'] = 4 + 's';
  }
  if (happiness === 0) {
    death();
  }
}

// adjusts death screen and stops all other anims
function death() {
  if (dReasons.infection === 5 || dReasons.starve === 5 || dReasons.sleeplessness === 5 || catStats.isAlive === false) {
    if (catStats.isAlive === true) {
      catStats.isAlive = false;
    }

    clearInterval(time);
    disableBtns(buttons);
    clearInterval(awake);
    clearInterval(feelControl);
    clearInterval(age);
    vpHappiness.textContent = '💀';
    const tail = document.getElementById('fall');
    tail.style.animationPlayState = 'paused';

    let eyeClass;
    const eyes = document.getElementById('eyes');
    const classes = ['blink', 'sleeping', 'waking'];

    for (let i = 0, j = classes.length; i < j; i++) {
      if (hasClass(eyes, classes[i])) {
        eyeClass = classes[i];
        break;
      }
    }

    eyes.classList.replace(eyeClass, 'hidden');
    document.querySelector('#dead-eye').classList.remove('hidden');
    document.querySelector('#death-screen').classList.add('dimmer');
    document.querySelector('#death-screen').classList.replace('hidden', 'death-screen');
    deathScreen();
    return;
  }

  for (let i = 0; i < 3; i++) {
    if (catStats[skeys[i]] === 0) {
      dReasons[rkeys[i]]++;
    }
  }
}

// checks the time that cat died also
// displays age of the cat

export function timesLived() {
  let secs = '';
  let mins = '';
  let hrs = '';

  const endTime = Date.now();
  const age = document.querySelector('#age');
  secs = Math.round((endTime - startTime) / 1000);
  mins = secs / 60;
  hrs = mins / 60;

  if (Math.floor(mins) === 5) {
    age.textContent = 'Kitten';
  }
  if (Math.floor(mins) === 15) {
    age.textContent = 'Junior';
  }
  if (Math.floor(mins) === 35) {
    age.textContent = 'Adult';
  }
  if (Math.floor(mins) === 55) {
    age.textContent = 'Senior';
  }
  if (Math.floor(mins) === 95) {
    age.textContent = 'Super Senior';
  }

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
export function deathScreen() {
  const deathReason = document.querySelector('#death-reason');
  // play again button
  document.querySelector('#turn-home').addEventListener('click', () => { location.href = './index.html'; });
  if (checkReason) {
    deathReason.textContent = reasonExp[checkReason()];
    return;
  }

  deathReason.textContent = 'Neglecting';
}

export { hungerVP, cleanVP, sleepVP, happinessVP, buttons, death };
