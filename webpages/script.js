'use strict';

window.addEventListener('load', addHandlers);


function addHandlers() {
  let awake = setInterval(adjustSleep, 100);
  let sleep = setInterval(handleSleep, 1000);
  clearInterval(sleep);
  window.setInterval(adjustHunger, 100);
  window.setInterval(adjustClean, 100);
  window.setInterval(adjustPet, 100);
  document.querySelector('#feedMe').addEventListener('click', feedMe);
  document.querySelector('#cleanMe').addEventListener('click', cleanMe);
  document.querySelector('#sleepMe').addEventListener('click', sleepMe);
  document.querySelector('#petMe').addEventListener('click', petMe);

  let dirtCount = 0;

  const feels = {
    hunger: 100,
    clean: 100,
    sleep: 100,
    pet: 100,
  };

  function feedMe() {
    feels.hunger = feels.hunger + 4;
  }

  function cleanMe() {
    feels.clean = feels.clean + 10;
    if (dirtCount > 0) {
      dirtCount = dirtCount - 1;
    }
    const lastDirt = document.getElementById('dirt');
    lastDirt.remove();
  }

  function sleepMe() {
    const toggle = document.querySelector('#sleepMe');
    if (toggle.value === 'sleep') {
      const eyes = document.querySelector('#eyes');
      eyes.classList.remove('eyes');
      eyes.classList.add('sleepEyes');
      setTimeout(eyes.setAttribute('transform', 'scale(1, 0.1)'), 3000);
      clearInterval(awake);
      sleep = setInterval(handleSleep, 1000);
      toggle.textContent = 'Wake up';
      toggle.value = 'wakeup';
    } else {
      const eyes = document.querySelector('#eyes');
      eyes.classList.remove('sleepEyes');
      eyes.classList.add('openEyes');
      setTimeout(eyes.setAttribute('transform', 'scale(1, 1)'), 3000);
      const animation = document.querySelector('.openEyes');
      animation.addEventListener('animationend', () => {
        eyes.classList.remove('class', 'openEyes');
        eyes.classList.add('class', 'eyes');
      });
      clearInterval(sleep);
      awake = setInterval(adjustSleep, 100);
      toggle.textContent = 'Sleep';
      toggle.value = 'sleep';
    }
  }

  function handleSleep() {
    sleepVP();
    feels.sleep = feels.sleep + 2;
  }

  function petMe() {
    feels.pet = feels.pet + 20;
  }

  function adjustHunger() {
  // let count = 0;
  // while (count < 6) {
  //     if (feels.hunger > 1.15) {
  //         count =+ 1;
  //         feels.hunger= 1.15;
  //     }
  //     else if (count = 5) {
  //         document.querySelector("#feedMe").disabled= true;
  //         break;
  //     }
  //     hungerVP();
  //     feels.hunger = Math.max(0.8, -0.001+feels.hunger);
  // }

    if (feels.hunger > 115) {
      feels.hunger = 115;
    }
    hungerVP();
    feels.hunger = Math.max(80, -0.04 + feels.hunger);
  }

  function adjustClean() {
    cleanVP();
    feels.clean = Math.max(0, -0.5 + feels.clean);
  }

  function addDirt() {
    const svg = document.querySelector('svg');
    const newDirt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newDirt.setAttribute('id', 'dirt');
    newDirt.setAttribute('r', '10');
    newDirt.setAttribute('cx', `${Math.random() * (100) + 200}`);
    newDirt.setAttribute('cy', `${Math.random() * (190) + 100}`);
    newDirt.style.fill = '#402905';
    newDirt.style.opacity = '60%';
    svg.appendChild(newDirt);
  }

  function adjustSleep() {
    if (feels.sleep > 100) {
      feels.sleep = 100;
    }
    sleepVP();
    feels.sleep = Math.max(0, -1 + feels.sleep);
  }

  function adjustPet() {
    if (feels.pet > 100) {
      feels.pet = 100;
    }
    petVP();
    feels.pet = Math.max(0, -1 + feels.pet);
  }

  function hungerVP() {
    const body = document.querySelector('#body');
    const hungerBar = document.getElementById('hungerBar');
    body.setAttribute('transform', `translate(250,235) scale(${feels.hunger / 100})`);
    hungerBar.value = feels.hunger;
  }

  function cleanVP() {
    if (feels.clean === 75) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 65 && dirtCount === 1) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 55 && dirtCount === 2) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 45 && dirtCount === 3) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 35 && dirtCount === 4) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 25 && dirtCount === 5) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 15 && dirtCount === 6) {
      dirtCount++;
      addDirt();
    } else if (feels.clean === 5 && dirtCount === 7) {
      dirtCount++;
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

  function petVP() {
    const petBar = document.getElementById('petBar');
    petBar.value = feels.pet;
  }
}
