const webpack = require('webpack');
const webpackBase = require('./webpack.config.base');

const config = webpackBase;

config.devtool = 'source-map';
config.plugins.push(new webpack.ProvidePlugin({
  React: 'react' // ReactJS module name in node_modules folder
}));

module.exports = config;
