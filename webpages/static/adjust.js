'use strict';

import { feels, time, hasClass, disableBtns, feelControl, deathScreen  } from './pet.js';
import { awake } from './petbuttons.js';

// functions that adjusts stats and some animations to cat

// some global elems that used by other js files
const buttons = document.querySelectorAll("button"); 
const vpHappiness = document.getElementById('happiness');

// adjusts feeding to the cat and stats
function hungerVP() {
  const body = document.querySelector('#body');
  const hungerBar = document.getElementById('hungerBar');
  body.setAttribute('transform', ` scale(${feels.hunger / 100})`);
  hungerBar.value = feels.hunger;
}

// adjusts dirts to cat and stats
function cleanVP() {
  if (feels.clean === 75) {
    feels.dirtCount++;
    addDirt();
  } else if (feels.clean === 65 && feels.dirtCount === 1) {
    feels.dirtCount++;
    addDirt();
  } else if (feels.clean === 55 && feels.dirtCount === 2) {
    feels.dirtCount++;
    addDirt();
  } else if (feels.clean === 45 && feels.dirtCount === 3) {
    feels.dirtCount++;
    addDirt();
  } else if (feels.clean === 35 && feels.dirtCount === 4) {
    feels.dirtCount++;
    addDirt();
  }
  
  if (feels.clean > 100) {
    feels.clean = 100;
  }
  
  const cleanBar = document.getElementById('cleanBar');
  cleanBar.value = feels.clean;
}

// additional adding dirt function
function addDirt() {
  const group = document.getElementById('dirts');
  const dirt = document.getElementById('dirt');
  const newDirt = dirt.cloneNode(true);
  newDirt.classList.remove('hidden');
  newDirt.id = 'clone';
  newDirt.setAttribute('transform', `translate(${Math.random() * (100) + 25}, ${Math.random() * (75) + 100})`);
  newDirt.setAttribute('fill', '#6e5001');
  newDirt.style.opacity = '60%';
  group.appendChild(newDirt);
}

// since sleeping anims are done with toggling,
// this function only adjusts stats to the interface
function sleepVP() {
  const sleepBar = document.getElementById('sleepBar');
  sleepBar.value = feels.sleep;
}

// adjusts cat's tail anim depeding on cat's happiness
function happinessVP() {
  const hunger = (feels.hunger - 80)*5;
  const happiness = (feels.pet + feels.clean + hunger + feels.sleep) / 4;
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
      feels.isAlive == false;
      death();
      return;
    }
}

// adjusts death screen and stops all other anims
function death() {

  if (feels.infection === 5 || feels.starve === 5 || feels.sleeplessness === 5 || feels.isAlive == false) {
    clearInterval(time);
    disableBtns(buttons);
    clearInterval(awake);
    clearInterval(feelControl);
    feels.isAlive == false;
    vpHappiness.textContent = '💀';
    const tail = document.getElementById('fall');
    tail.style.animationPlayState = 'paused';
    
    const eyes = document.getElementById('eyes'); 
    const classes= ['blink', 'sleeping', 'opening'];
    for(var i = 0, j = classes.length; i < j; i++) {
      if(hasClass(eyes, classes[i])) {
        var eyeClass = classes[i];
        break;
      }
    }

    eyes.classList.replace(eyeClass, 'hidden');
    document.querySelector('#dead-eye').classList.remove('hidden');
    document.querySelector('#dimmer').classList.add('dimmer');
    document.querySelector('#death-screen').classList.replace('hidden', 'death-screen');
    document.querySelector('#turn-home').disabled = false;
    deathScreen();
    return;
  }
  if (feels.clean === 0) {
    feels.infection++;
  } else {
    feels.infection = 0; 
  }
  if (feels.hunger === 0) {
    feels.starve++;
  } else {
    feels.starve = 0;
  }
  if (feels.sleeplessness === 0) {
    feels.sleeplessness++;
  } else {
    feels.sleeplessness = 0;
  }
}

export { hungerVP, cleanVP, sleepVP, happinessVP, buttons, death };
