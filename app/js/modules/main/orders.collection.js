'use strict';

const _         = require('underscore');
const Backbone  = require('Backbone');

const OrdersCollection = Backbone.Collection.extend({
  url: './orders.json',

  parse: function(response) {
    _.each(response, function(value) {
      value.Color = value.Color.toLowerCase();
    });

    return response;
  }
});

module.exports = OrdersCollection;