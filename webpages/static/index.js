'use strict';

// index page functions

// defining the cat breed and name
let selectedCat;

const petName = document.getElementById('name');
petName.addEventListener('keyup', checkName);

// calling each label a mouseover and mouseout event
// for displaying cat breeds
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

// checking the name is acceptible with addtional functions
function checkName() {
  const nameBtn = document.querySelector('#nameBtn');
  const nameAlert = document.querySelector('#nameAlert');
  nameAlert.textContent = '';

  if (petName) {
    const nameVal = petName.value;

    if (nameVal.length > 3) {
      if (nameVal.length === 20) {
        document.querySelector('#nameBtn').disabled = false;
        nameAlert.textContent = "Your cat's name can be maxium of 20 characters long.";
      }

      if (checkSpecialChars(nameVal)) {
        document.querySelector('#nameBtn').disabled = true;
        nameAlert.textContent = "Your cat's name cannot contain special characters.";
      } else {
        document.querySelector('#nameBtn').disabled = false;
        nameBtn.addEventListener('click', naming);
      }
    } else {
      document.querySelector('#nameBtn').disabled = true;
      nameAlert.textContent = "Your cat's name must be at least 4 characters long.";
    }
  }
}

function checkSpecialChars(nameVal) {
  const specialChars =
    '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
  return specialChars.split('').some((specialChar) => nameVal.includes(specialChar));
}

// naming buttons function for datas and changing the webpage
function naming() {
  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('path', selectedCat);
  location.href = './pet.html';
}

// displaying cat function with hover
function displayCat() {
  const scottish = document.querySelector('label[for = scottish]');
  const garfield = document.querySelector('label[for = garfield]');
  const siamese = document.querySelector('label[for = siamese]');
  const van = document.querySelector('label[for = van]');
  if (scottish.matches(':hover')) {
    fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
  }
  if (garfield.matches(':hover')) {
    fetch('./svgs/garfield.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
  }
  if (siamese.matches(':hover')) {
    fetch('./svgs/siamese.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
  }
  if (van.matches(':hover')) {
    fetch('./svgs/van.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
  }
}

// returning the checked(clicked) cat breed for displaying
function returnDisplay() {
  const hoveredScottish = document.querySelector('#scottish');
  const hoveredGarfield = document.querySelector('#garfield');
  const hoveredSiamese = document.querySelector('#siamese');
  const hoveredVan = document.querySelector('#van');

  if (hoveredScottish.matches(':checked')) {
    fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
    selectedCat = './svgs/scottish.svg';
  }
  if (hoveredGarfield.matches(':checked')) {
    fetch('./svgs/garfield.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
    selectedCat = './svgs/garfield.svg';
  }
  if (hoveredSiamese.matches(':checked')) {
    fetch('./svgs/siamese.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
    selectedCat = './svgs/siamese.svg';
  }
  if (hoveredVan.matches(':checked')) {
    fetch('./svgs/van.svg').then(r => r.text()).then(text => { hoveredCat.innerHTML = text; });
    selectedCat = './svgs/van.svg';
  }
}
