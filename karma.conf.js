'use strict';

module.exports = function (config) {
  config.set({
    files: [
      'app/js/app.js',
      'app/js/**/*.spec.js'
    ],
    frameworks: ['browserify', 'jasmine'], //'jasmine-jquery', 'jasmine-ajax'
    preprocessors: {
      'app/js/app.js': ['browserify'],
      'app/js/**/*.spec.js': ['browserify']
    },
    browsers: ['PhantomJS'],
    reporters: ['jasmine-diff', 'spec', 'failed'],
    browserify: {
      paths: ['./node_modules', './app/js'], //'./bower_components/'
      bundleDelay: 1000,
      debug: true,
      transform: ['hbsfy', ['babelify', { 'presets': ['es2015'] }], 'istanbulify']
    }
  });
};
