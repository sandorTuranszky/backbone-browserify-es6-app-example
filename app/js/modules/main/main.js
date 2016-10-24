'use strict';

const _             = require('underscore');
const $             = require('jquery');
const Backbone      = require('Backbone');
const app           = require('core/application');
const FilterView    = require('modules/main/filters');
const OrdersView    = require('modules/main/orders');

const MainView  = Backbone.View.extend({
  template: _.template(app.DOM.app_view.html()),

  render: function() {
    this.$el.html(this.template());
    this.DOM = {
      filters: this.$('[data-filters]'),
      orders: this.$('[data-content]')
    };

    this.initSubViews();

    return this;
  },

  initSubViews: function() {
    this.filtersView = new FilterView();
    this.listenTo(this.filtersView.filters, 'sync', this.renderFilters);

    this.ordersView = new OrdersView();
    this.listenTo(this.ordersView.orders, 'sync', this.renderOrders);
  },

  renderFilters: function() {
    this.DOM.filters.html(this.filtersView.render().$el);
  },

  renderOrders: function() {
    this.DOM.orders.html(this.ordersView.render().$el);
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