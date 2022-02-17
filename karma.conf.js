const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai', 'webpack'],
    files: ['./index.js', './test.spec.js'],
    preprocessors: {
      './index.js': ['webpack'],
      './test.spec.js': ['webpack'],
    },
    webpack: {
      resolve: webpackConfig.resolve, 
      plugins: webpackConfig.plugins,
      module: {
        rules: [
          { test: /\.dat$/, use: 'raw-loader' },
          { enforce: 'post', loader: "transform-loader", options: "brfs-node-15" },
        ],
      },
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    singleRun: false,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout : 60000,
    browserDisconnectTolerance : 2,
    concurrency: Infinity,
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-webpack',
    ],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      }
    },
  });
};
