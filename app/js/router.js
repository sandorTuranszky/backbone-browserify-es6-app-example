'use strict';

const Backbone    = require('Backbone');
const FilterView  = require('modules/filter/filter');
const app         = require('core/application');

const Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:param': 'filter',
    '*path':  'defaultRoute'
  },

  filter: function(param=null) {
    let filterView = new FilterView({param: param});
    app.DOM.app_view.html(filterView.render().$el)
  },

  defaultRoute: function(path) {
    console.log('default path: ', path);
  }
});

module.exports = Router;