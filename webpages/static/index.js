'use strict';

import { breedPaths } from './globals.js';

// index page functions

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('name').addEventListener('keyup', checkInput);
  
  // defining the selected cat breed and cat's name
  let selectedSVG;

  const startBtn = document.querySelector('#startBtn');
  const nameAlert = document.querySelector('#name-alert');

  // calling each label a mouseover and mouseout event
  // for displaying cat breeds
  const inputs = document.querySelectorAll('input[type = radio]');
  const labels = document.querySelectorAll('label');

  labels.forEach(function (label) {
    label.addEventListener('mouseover', displaySVG);
  });

  labels.forEach(function (label) {
    label.addEventListener('mouseout', returnDisplay);
  });

  // defining the cat display element and starting cat breed
  const hoveredSVG = document.getElementById('hovered-svg');
  fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { hoveredSVG.innerHTML = text; });

  // checking the name is acceptible
  function checkInput() {
    const petName = document.getElementById('name');
    nameAlert.textContent = '';

    if (petName) {
      const nameVal = petName.value;

      if (nameVal.length > 3) {
        if (nameVal.length === 20) {
          startBtn.disabled = false;
          nameAlert.textContent = "Your cat's name can be maximum of 20 characters long.";
        }

        if (checkSpecialChars(nameVal)) {
          startBtn.disabled = true;
          nameAlert.textContent = "Your cat's name cannot contain special characters.";
        } else {
          startBtn.addEventListener('click', startGame);
          startBtn.disabled = false;
        }
      } else {
        startBtn.disabled = true;
        nameAlert.textContent = "Your cat's name must be at least 4 characters long.";
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
  function displaySVG() {
    if (checkHovers) {
      fetch(breedPaths[checkHovers()]).then(r => r.text()).then(text => { hoveredSVG.innerHTML = text; });
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
            .then(text => { hoveredSVG.innerHTML = text; });
          selectedSVG = breedPaths[checkedInput()];
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
    localStorage.setItem('path', selectedSVG);
    localStorage.setItem('name', document.getElementById('name').value);
  }

} );
