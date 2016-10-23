'use strict';

const Backbone    = require('Backbone');
const MainView    = require('modules/main/main');
const app         = require('core/application');

const Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:param': 'filter',
    '*path':  'defaultRoute'
  },

  filter: function(param=null) {
    let mainView = new MainView({param: param});
    app.DOM.app_view.html(mainView.render().$el)
  },

  defaultRoute: function(path) {
    console.log('default path: ', path);
  }
});

module.exports = Router;