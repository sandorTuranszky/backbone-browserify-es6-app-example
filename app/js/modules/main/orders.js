'use strict';

const _                   = require('underscore');
const $                   = require('jquery');
const Backbone            = require('Backbone');
const app                 = require('core/application');
const template            = require('modules/main/orders.tpl.hbs');
const OrdersCollection    = require('modules/main/orders.collection');

const OrdersView  = Backbone.View.extend({
  template: template,

  initialize: function() {
    this.orders = new OrdersCollection();
    this.listenTo(this.orders, 'error', this.onError);
    this.orders.fetch();

    this.listenTo(app, 'filter', this.filter);
  },

  render: function() {
    this.$el.html(this.template({orders: this.filtered ? this.filtered.toJSON() : this.orders.toJSON()}));
    return this;
  },

  filter: function(data) {
    this.filtered = this.orders.filterBy(data);
    this.render();
  },

  onError: function(model, response) {
    console.log('error: ', response);
  },

  close: function() {
    this.stopListening();
    this.remove();
  }
});

module.exports = OrdersView;