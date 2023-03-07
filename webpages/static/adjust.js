'use strict';

import { feels } from './pet.js';

function hungerVP() {
  const body = document.querySelector('#body');
  const hungerBar = document.getElementById('hungerBar');
  body.setAttribute('transform', ` scale(${feels.hunger / 100})`);
  hungerBar.value = feels.hunger;
}

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

function sleepVP() {
  const sleepBar = document.getElementById('sleepBar');
  sleepBar.value = feels.sleep;
}

function happinessVP() {
  const vpHappiness = document.getElementById('happiness');
  const happiness = (feels.pet + feels.clean + feels.hunger + feels.sleep) / 4;
  const tail = document.getElementById('fall');

  if (happiness > 80) {
    vpHappiness.style.color = '#2c4c3b';
    vpHappiness.textContent = 'Ecstatic';
    tail.style['-webkit-animation-duration'] = 2 + 's';
  } else if (happiness > 60) {
    vpHappiness.style.color = '#306844';
    vpHappiness.textContent = 'Happy';
    tail.style['-webkit-animation-duration'] = 3 + 's';
  } else if (happiness > 40) {
    vpHappiness.style.color = 'orange';
    vpHappiness.textContent = 'Mediocre';
    tail.style['-webkit-animation-duration'] = 4 + 's';
  } else if (happiness > 20) {
    vpHappiness.style.color = 'red';
    vpHappiness.textContent = 'Sad';
    tail.style['-webkit-animation-duration'] = 5 + 's';
  }
}

export { hungerVP, cleanVP, sleepVP, happinessVP };
