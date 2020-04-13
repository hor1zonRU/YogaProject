require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {

  'use strict';

  let calc = require('./parts/calc.js'),
      form = require('./parts/form.js'),
      modal = require('./parts/modal'),
      slider = require('./parts/slider.js'),
      tabs = require('./parts/tabs.js'),
      timer = require('./parts/timer');

  calc();
  form();
  modal();
  slider();
  tabs();
  timer();
});





