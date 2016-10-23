'use strict';

const _ = require('underscore');
const Backbone = require('Backbone');

const OrdersCollection = Backbone.Collection.extend({
  url: './orders.json'
});

module.exports = OrdersCollection;