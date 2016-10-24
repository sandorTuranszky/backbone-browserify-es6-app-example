'use strict';

const _                   = require('underscore');
const $                   = require('jquery');
const Backbone            = require('Backbone');
const app                 = require('core/application');
const template            = require('modules/main/filters.tpl.hbs');
const FiltersCollection   = require('modules/main/filters.collection');

const FiltersView  = Backbone.View.extend({
  template: template,

  events: {
    'click [data-filter-btn]': 'filterBtn',
    'click [data-filter-checkbox]': 'filterCheckbox',
    'change select': 'filter',
    'change [data-date]': 'filter'
  },

  initialize: function() {
    this.filters = new FiltersCollection();
    this.listenTo(this.filters, 'error', this.onError);
    this.filters.fetch();

    this.active_f = [];
    this.f_map = {
      open: 'status',
      installation: 'type',
      maintenance: 'type',
      failure: 'type'
    }
  },

  render: function() {
    this.$el.html(this.template({filters: this.filters.toJSON()}));
    return this;
  },

  filterBtn: function(e) {
    e.preventDefault();
    let target = $(e.currentTarget);

    //set/unset active state
    target.toggleClass('c-button--active');

    let value = target.hasClass('c-button--active') ? target.attr('data-filter-btn') : '';
    let data = {key: this.f_map[value], value: value};

    app.trigger('filter', data);
  },

  filterCheckbox: function(e) {
    let target = $(e.currentTarget);
    let value = target.is(':checked') ? target.attr('data-filter-checkbox') : '';
    let data = {key: this.f_map[value], value: value};
    app.trigger('filter', data);
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