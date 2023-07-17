'use strict';

import { catStats, btnID, skeys } from './globals.js';
import { sleepVP, buttons, sleepingAnim, wakingAnim } from './anims.js';
import { controlSleep } from './pet.js';

setInterval(restart, 1000);

// saving cat's statistics

export function checkStat() {
  const svals = Object.values(catStats);
  for (let i = 0; i < skeys.length; i++) {
    localStorage.setItem(skeys[i], svals[i]);
  }
}

// button functions

// button controling for spamming buttons

export function controlButtons() {
  buttons.forEach(function event(button) {
    button.addEventListener('click', () => {
      const el = button.id;
      countingClicks(el);
    });
  });
}

export function countingClicks(el) {
  for (let i = 0; i < buttons.length; i++) {
    if (Object.values(btnID)[i] === 4) {
      buttons[i].disabled = true;
      setTimeout(() => { buttons[i].disabled = false; }, 1000);
    }
  }
  btnID[el]++;
}

export function restart() {
  for (let i = 0; i < buttons.length; i++) {
    const key = Object.keys(btnID)[i];
    btnID[key] = 0;
  }
}

// cleaning button
export function cleaning() {
  catStats.clean += 10;
  catStats.pet -= 5;
  if (catStats.dirtCount >= 1) {
    catStats.dirtCount = catStats.dirtCount - 1;
  }
  const lastDirt = document.getElementById('clone');
  if (lastDirt) {
    lastDirt.remove();
  }
}

// sleeping button

// sleeping intervals etc. for anims
const toggle = document.querySelector('#sleepBtn');
var awake = setInterval(controlSleep, 100);
var sleep = setInterval(handleSleep, 1000);
clearInterval(sleep);

// sleeping functions; button toggles
export function sleeping() {
  if (toggle.value === 'wakeup') {
    sleepingAnim();
    clearInterval(awake);
    sleep = setInterval(handleSleep, 1000);
  } else {
    wakingAnim();
    clearInterval(sleep);
    awake = setInterval(controlSleep, 100);
  }
}

// handles cat's sleeping value while button is on
export function handleSleep() {
  if (catStats.sleep === 105) {
    sleeping();
  }
  sleepVP();
  catStats.sleep = catStats.sleep + 2;
}

export { toggle, awake };