'use strict';

const _ = require('underscore');
const Backbone = require('Backbone');

const FiltersCollection = Backbone.Collection.extend({
  url: './filters.json',

  parse: function (response) {
    this.process(response);
    return response;
  },

  process: function (response) {
    _.each(response, (value) => {
      let type = this.checkType(value);
      if (type) {
        value[type] = true;
      }

      if (value.options) {
        this.process(value.options)
      }

    });
  },

  checkType: function (value) {
    let type;
    switch (value.input_type) {
      case 'checkbox':
        type = 'checkbox';
        break;
      case 'select':
        type = 'select';
        break;
      case 'select_option':
        type = 'select_option';
        break;
      case 'input_date':
        type = 'input_date';
        break;
    }
    return type;
  }

});

module.exports = FiltersCollection;