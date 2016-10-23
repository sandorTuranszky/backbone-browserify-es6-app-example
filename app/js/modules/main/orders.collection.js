'use strict';

const _ = require('underscore');
const Backbone = require('Backbone');

const OrdersCollection = Backbone.Collection.extend({
  url: './orders.json',

  parse: function (response) {
    _.each(response, function (value) {
      value.Color = value.Color.toLowerCase();
    });

    return response;
  },

  filterByStatus: function(data) {
    let key = data.key.charAt(0).toUpperCase() + data.key.slice(1);
    let value = data.value.charAt(0).toUpperCase() + data.value.slice(1);
    var filtered = this.where(function(order) {
      return order.get(key) === value;
    });

    return new OrdersCollection(filtered);
  }
});

module.exports = OrdersCollection;