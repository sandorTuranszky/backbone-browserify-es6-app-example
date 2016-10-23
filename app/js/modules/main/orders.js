'use strict';

const _                   = require('underscore');
const $                   = require('jquery');
const Backbone            = require('Backbone');
const template            = require('modules/main/orders.tpl.hbs');
const OrdersCollection    = require('modules/main/orders.collection');

const OrdersView  = Backbone.View.extend({
  template: template,

  initialize: function() {
    this.orders = new OrdersCollection();
    this.listenTo(this.orders, 'error', this.onError);
    this.orders.fetch();
  },

  render: function() {
    console.log(this.orders.toJSON());
    this.$el.html(this.template({orders: this.orders.toJSON()}));
    return this;
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