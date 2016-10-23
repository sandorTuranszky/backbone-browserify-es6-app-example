'use strict';

const _                 = require('underscore');
const $                 = require('jquery');
const Backbone          = require('Backbone');
const template          = require('modules/filter/filter.tpl.hbs');
const FilterCollection  = require('modules/filter/filter.collection');

const FilterView  = Backbone.View.extend({
  template: template,

  events: {
    'click [data-filter]': 'filter',
    'change select': 'filter',
    'change [data-date]': 'filter'
  },

  initialize: function() {
    this.collection = new FilterCollection();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'error', this.onError);
    this.collection.fetch();
  },

  render: function() {
    this.$el.html(this.template({filters: this.collection.toJSON()}));
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