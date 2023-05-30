'use strict';

import { breedPaths } from './globals.js';

// index page functions

// defining the selected cat, breeds, and cat name
window.addEventListener('load', handlePage);

function handlePage() {
  document.getElementById('name').addEventListener('keyup', checkName);
}

let selectedCat;

const startBtn = document.querySelector('#startBtn');
const alertUI = document.querySelector('#alertUI');

// calling each label a mouseover and mouseout event
// for displaying cat breeds
const inputs = document.querySelectorAll('input[type = radio]');
const labels = document.querySelectorAll('label');

labels.forEach(function (label) {
  label.addEventListener('mouseover', displayCat);
});

labels.forEach(function (label) {
  label.addEventListener('mouseout', returnDisplay);
});

// defining the cat display element and starting cat breed
const hoveredCat = document.getElementById('hoveredCat');
fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });

// checking the name is acceptible
function checkName() {
  const petName = document.getElementById('name');
  alertUI.textContent = '';

  if (petName) {
    const nameVal = petName.value;

    if (nameVal.length > 3) {
      if (nameVal.length === 20) {
        startBtn.disabled = false;
        alertUI.textContent = "Your cat's name can be maximum of 20 characters long.";
      }

      if (checkSpecialChars(nameVal)) {
        startBtn.disabled = true;
        alertUI.textContent = "Your cat's name cannot contain special characters.";
      } else {
        startBtn.addEventListener('click', startGame);
        startBtn.disabled = false;
      }
    } else {
      startBtn.disabled = true;
      alertUI.textContent = "Your cat's name must be at least 4 characters long.";
    }
  }
}

// checking special chars is not included
function checkSpecialChars(nameVal) {
  const specialChars =
    '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
  return specialChars.split('').some((specialChar) => nameVal.includes(specialChar));
}

// displaying cat function with hover
function displayCat() {
  if (checkHovers) {
    fetch(breedPaths[checkHovers()]).then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
  }
}

// checks if labels are hovered
function checkHovers() {
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].matches(':hover')) {
      return i;
    }
  }
}

// returning the checked(clicked) cat breed for displaying
function returnDisplay() {
  if (checkedInput) {
    setTimeout(function () {
      if (checkHovers() === undefined) {
        fetch(breedPaths[checkedInput()])
          .then(r => r.text())
          .then(text => { hoveredCat.innerHTML = text; });
        selectedCat = breedPaths[checkedInput()];
      }
    }, 500);
  }
}

// checks which input is checked
function checkedInput() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].matches(':checked')) {
      return i;
    }
  }
}

// a function to store starting data
function startGame() {
  localStorage.clear();
  localStorage.setItem('path', selectedCat);
  localStorage.setItem('name', document.getElementById('name').value);
}
