'use strict';

const _             = require('underscore');
const $             = require('jquery');
const Backbone      = require('Backbone');
const app           = require('core/application');
const FilterView    = require('modules/filters/filters');

const MainView  = Backbone.View.extend({
  template: _.template(app.DOM.app_view.html()),

  render: function() {
    this.$el.html(this.template());
    this.DOM = {
      filters: this.$('[data-filters]'),
      content: this.$('[data-content]')
    };

    this.initSubViews();

    return this;
  },

  initSubViews: function() {
    this.filtersView = new FilterView();
    this.listenTo(this.filtersView.filters, 'sync', this.renderFilters);
  },

  renderFilters: function() {
    this.DOM.filters.html(this.filtersView.render().$el);
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

module.exports = MainView;