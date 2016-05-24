var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
      './test/*'
    ],
    preprocessors: {
      './test/*': ['babel', 'webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['mocha'],
    reportSlowerThan: 5,
    plugins: [
      require('karma-babel-preprocessor'),
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher')
    ]
  });
};
