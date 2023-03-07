'use strict';

const petName = document.getElementById('name');
petName.addEventListener('keyup', checkName);

const labels = document.querySelectorAll('label');
labels.forEach(function (label) {
  label.addEventListener('mouseover', displayCat);
});

labels.forEach(function (label) {
  label.addEventListener('mouseout', returnDisplay);
});

const selectedCat = document.getElementById('selectedCat');
fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });

let checkedCat;

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

function naming() {
  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('path', checkedCat);
  location.href = './pet.html';
}

function displayCat() {
  const scottish = document.querySelector('label[for = scottish]');
  const garfield = document.querySelector('label[for = garfield]');
  const siamese = document.querySelector('label[for = siamese]');
  const van = document.querySelector('label[for = van]');
  if (scottish.matches(':hover')) {
    fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
  }
  if (garfield.matches(':hover')) {
    fetch('./svgs/garfield.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
  }
  if (siamese.matches(':hover')) {
    fetch('./svgs/siamese.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
  }
  if (van.matches(':hover')) {
    fetch('./svgs/van.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
  }
}

function returnDisplay() {
  const selectedScottish = document.querySelector('#scottish');
  const selectedGarfield = document.querySelector('#garfield');
  const selectedSiamese = document.querySelector('#siamese');
  const selectedVan = document.querySelector('#van');

  if (selectedScottish.matches(':checked')) {
    fetch('./svgs/scottish.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
    checkedCat = './svgs/scottish.svg';
  }
  if (selectedGarfield.matches(':checked')) {
    fetch('./svgs/garfield.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
    checkedCat = './svgs/garfield.svg';
  }
  if (selectedSiamese.matches(':checked')) {
    fetch('./svgs/siamese.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
    checkedCat = './svgs/siamese.svg';
  }
  if (selectedVan.matches(':checked')) {
    fetch('./svgs/van.svg').then(r => r.text()).then(text => { selectedCat.innerHTML = text; });
    checkedCat = './svgs/van.svg';
  }
}
