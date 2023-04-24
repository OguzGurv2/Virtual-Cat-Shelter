'use strict';

// index page datas

const breedPaths = [
  './svgs/scottish.svg',
  './svgs/garfield.svg',
  './svgs/siamese.svg',
  './svgs/van.svg',
];

// getting the time that cat created
let startTime = '';
window.addEventListener('load', () => { startTime = Date.now(); });

// creating timer for time that pet lived
const timer = document.querySelector('#times-lived');

// creating feels and string to manipulate them
const catStats = {
  hunger: 100,
  clean: 100,
  sleep: 100,
  pet: 100,
  dirtCount: 0,
  isAlive: true,
};

const skeys = Object.keys(catStats);

// creating death-reasons and string to manipulate them
const reasons = {
  starve: 0,
  infection: 0,
  sleeplessness: 0,
};

const reasonExp = [
  'Lack of hygiene',
  'Starving',
  'Lack of sleep',
];

const rkeys = Object.keys(reasons);

// creating btnID to manipulate them

const btnID = {
  feedBtn: 0,
  cleanBtn: 0,
  sleepBtn: 0,
  petBtn: 0,
};

export { catStats, reasons, reasonExp, timer, startTime, rkeys, skeys, btnID, breedPaths };
