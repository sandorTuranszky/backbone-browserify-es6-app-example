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
    'click [data-filter]': 'filter',
    'change select': 'filter',
    'change [data-date]': 'filter'
  },

  initialize: function() {
    this.filters = new FiltersCollection();
    this.listenTo(this.filters, 'error', this.onError);
    this.filters.fetch();

    this.f = [];
    this.f_map = {
      open: 'status'
    }
  },

  render: function() {
    this.$el.html(this.template({filters: this.filters.toJSON()}));
    return this;
  },

  filter: function(e) {
    e.preventDefault();
    let target = $(e.currentTarget);
    let value = target.attr('data-filter') || target.val();
    let data = {key: this.f_map[value], value: value};

    //save some filters to be used together with other filters
    this.storeFilter(data);

    app.trigger('filter', data);
  },

  storeFilter: function(data) {
    if(data.key === 'status') {
      this.f.push(data);
    }
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