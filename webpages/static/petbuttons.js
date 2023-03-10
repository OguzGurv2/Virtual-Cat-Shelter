'use strict';

import { feels, controlSleep, disableBtns } from './pet.js';
import { sleepVP, buttons } from './adjust.js';

// button functions

// play again button
document.querySelector('#turn-home').addEventListener('click', () => { location.href = './index.html';});

// cleaning button
function cleaning() {
  feels.clean += 10;
  feels.pet -= 5;
  if (feels.dirtCount > 0) {
    feels.dirtCount = feels.dirtCount - 1;
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
  if (feels.sleep > 110) {
    sleeping();
    feels.sleep = 110;
  }
  sleepVP();
  feels.sleep = feels.sleep + 2;
}

export { cleaning, sleeping, handleSleep, awake };
