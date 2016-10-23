'use strict';

const _         = require('underscore');
const $         = require('jquery');
const Backbone  = require('Backbone');
const app       = require('core/application');
const Router    = require('./router');
Backbone.$      = $;

/**
 * Listen to "initialized" event
 */
app.on('initialized', onAppInitialized, this);

function onAppInitialized() {
  app.router = new Router();
  handleClicks();
  Backbone.history.start({ pushState: true });
}

function handleClicks() {
//  $('body').delegate('a[href]:not([href^=\#])', 'click', function (e) {
//    e.preventDefault();
//    Backbone.history.navigate($(this).attr('href'), {trigger: true});
//  });
}

/**
 * Kick off the app
 */
document.addEventListener('DOMContentLoaded', function () {
  app.init();
});

