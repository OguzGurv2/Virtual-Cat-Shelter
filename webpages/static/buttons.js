'use strict'
    
import { feels, toggle, controlSleep } from "./index.js";
import { sleepVP } from "./adjust.js";

// button functions

// cleaning button
function cleaning() {
    feels.clean += 10;
    feels.pet -= 5;
    if (feels.dirtCount > 0) {
      feels.dirtCount = feels.dirtCount - 1;
    }
      const lastDirt = document.getElementById('clone');
      lastDirt.remove();
  }

//sleeping button
let awake = setInterval(controlSleep, 100);
let sleep = setInterval(handleSleep, 1000);
clearInterval(sleep);

  function sleeping() {
    const eyes = document.querySelector('#eyes');
    if (toggle.value === 'wakeup') {
      eyes.classList.replace('eyes', 'sleepEyes');
      const an1 = document.querySelector('.sleepEyes');
      an1.addEventListener('animationend', () => {
        document.querySelector("#sleepBtn").disabled = false;
        eyes.setAttribute('transform', 'scale(1, 0.1)');
      });
      clearInterval(awake);
      sleep = setInterval(handleSleep, 1000);
      toggle.textContent = 'Wake up';
      toggle.value = 'sleep';
      document.querySelector("#feedBtn").disabled = true;
      document.querySelector("#cleanBtn").disabled = true;
      document.querySelector("#petBtn").disabled = true;
      document.querySelector("#sleepBtn").disabled = true;
    } else if (toggle.value === 'sleep') {
      eyes.classList.replace('sleepEyes', 'openEyes');
      const an2 = document.querySelector('.openEyes');
      an2.addEventListener('animationend', () => {
        eyes.setAttribute('transform', 'scale(1, 1)');
        eyes.classList.replace('openEyes', 'eyes');
        document.querySelector("#sleepBtn").disabled = false;
      });
      clearInterval(sleep);
      awake = setInterval(adjustSleep, 100);
      toggle.textContent = 'Sleep';
      toggle.value = 'wakeup';
      document.querySelector("#feedBtn").disabled = false;
      document.querySelector("#cleanBtn").disabled = false;
      document.querySelector("#petBtn").disabled = false;
      document.querySelector("#sleepBtn").disabled = true;
    }
  }

  function handleSleep() {
    if (feels.sleep > 110) {
      sleeping();
      feels.sleep = 110;
    }
    sleepVP();
    feels.sleep = feels.sleep + 2;
  }

export {cleaning, sleeping, handleSleep};