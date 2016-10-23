'use strict';

const _         = require('underscore');
const $         = require('jquery');
const Backbone  = require('Backbone');

/**
 * @object app
 * @description
 *  Main application object - singleton
 */
const app = _.extend({}, {

    DOM: {
      app_view: $('[data-app-view]')
    },
    /**
     * @method init
     * @description
     *  Loads initial data (user language, etc) and trigger "initialized" event on successful data loading
     */
    init: function() {
        $.getJSON( './settings.json', (data) => {
          this.settings = data;
          this.trigger('initialized');
        })
          .fail(function() {
            console.log( "error" );
          });
    }
}, Backbone.Events);

module.exports = app;