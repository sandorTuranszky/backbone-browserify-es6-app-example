'use strict';

const _                   = require('underscore');
const $                   = require('jquery');
const Backbone            = require('Backbone');
const template            = require('modules/filters/filters.tpl.hbs');
const FiltersCollection   = require('modules/filters/filters.collection');

const FiltersView  = Backbone.View.extend({
  template: template,

  events: {
    'click [data-filter]': 'filter',
    'change select': 'filter',
    'change [data-date]': 'filter'
  },

  initialize: function() {
    this.filters = new FiltersCollection();
    this.listenTo(this.filters, 'error', this.onError);
    this.filters.fetch();
  },

  render: function() {
    this.$el.html(this.template({filters: this.filters.toJSON()}));
    return this;
  },

  filter: function(e) {
    e.preventDefault();
    let target = $(e.currentTarget);
    let filter = target.attr('data-filter');

    //html select or input val
    if(!filter) {
      filter = target.val();
    }

    console.log('filter: ', filter);
  },

  onError: function(model, response) {
    console.log('error: ', response);
  },

  close: function() {
    this.stopListening();
    this.remove();
  }
});

module.exports = FiltersView;