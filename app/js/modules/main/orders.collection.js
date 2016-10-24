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

  capitalize: function(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  filterByStatus: function(data) {
    if(data.key || data.value) {
      var filtered = this.where({
        [this.capitalize(data.key)]: this.capitalize(data.value)
    });

      return new OrdersCollection(filtered);
    }

    return new OrdersCollection(this.models);
  }
});

module.exports = OrdersCollection;