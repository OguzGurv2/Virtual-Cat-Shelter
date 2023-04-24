'use strict';

import { catStats, btnID } from './globals.js';
import { controlSleep, disableBtns } from './pet.js';
import { sleepVP, buttons } from './anims.js';

setInterval(restart, 1000);

// button functions

// button controling for spamming buttons

function controlButtons() {
  buttons.forEach(function event(button) {
    button.addEventListener('click', () => {
      const el = button.id;
      countingClicks(el);
    });
  });
}

function countingClicks(el) {
  for (let i = 0; i < buttons.length; i++) {
    if (Object.values(btnID)[i] === 4) {
      buttons[i].disabled = true;
      setTimeout(() => { buttons[i].disabled = false; }, 1000);
    }
  }
  btnID[el]++;
}

function restart() {
  for (let i = 0; i < buttons.length; i++) {
    const key = Object.keys(btnID)[i];
    btnID[key] = 0;
  }
}

// cleaning button
function cleaning() {
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

// sleeping intervals for animations
let awake = setInterval(controlSleep, 100);
let sleep = setInterval(handleSleep, 1000);
const toggle = document.querySelector('#sleepBtn');
clearInterval(sleep);

// sleeping animations and button toggles
function sleeping() {
  const eyes = document.getElementById('eyes');

  if (toggle.value === 'wakeup') {
    eyes.classList.replace('blink', 'sleeping');
    const an1 = document.querySelector('.sleeping');
    an1.addEventListener('animationend', () => {
      document.querySelector('#sleepBtn').disabled = false;
      eyes.setAttribute('transform', 'scale(1, 0.1)');
    });
    clearInterval(awake);
    sleep = setInterval(handleSleep, 1000);
    toggle.textContent = 'Wake up';
    toggle.value = 'sleep';
    disableBtns(buttons);
  } else if (toggle.value === 'sleep') {
    eyes.classList.replace('sleeping', 'opening');
    const an2 = document.querySelector('.opening');
    an2.addEventListener('animationend', () => {
      eyes.setAttribute('transform', 'scale(1, 1)');
      eyes.classList.replace('opening', 'blink');
      document.querySelector('#sleepBtn').disabled = false;
    });
    clearInterval(sleep);
    awake = setInterval(controlSleep, 100);
    toggle.textContent = 'Sleep';
    toggle.value = 'wakeup';
    document.querySelector('#feedBtn').disabled = false;
    document.querySelector('#cleanBtn').disabled = false;
    document.querySelector('#petBtn').disabled = false;
    document.querySelector('#sleepBtn').disabled = true;
  }
}

// handles cat's sleeping value while button is on
function handleSleep() {
  if (catStats.sleep === 105) {
    sleeping();
  }
  sleepVP();
  catStats.sleep = catStats.sleep + 2;
}

export { cleaning, sleeping, handleSleep, awake, controlButtons };
