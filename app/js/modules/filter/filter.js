'use strict';

const _                   = require('underscore');
const $                   = require('jquery');
const Backbone            = require('Backbone');
const template            = require('modules/filter/filter.tpl.hbs');
const FiltersCollection   = require('modules/filter/filters.collection');
const OrdersCollection    = require('modules/filter/orders.collection');

const FilterView  = Backbone.View.extend({
  template: template,

  events: {
    'click [data-filter]': 'filter',
    'change select': 'filter',
    'change [data-date]': 'filter'
  },

  initialize: function() {
    //todo: listen for multiple fetch and then run render with all the data
    this.filters = new FiltersCollection();
    this.listenTo(this.filters, 'sync', this.render);
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

module.exports = FilterView;