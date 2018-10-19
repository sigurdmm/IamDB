const webpack = require('webpack');
const webpackBase = require('./webpack.config.base');

const config = webpackBase;

// Only use hash on production build, as we have no way to clear out
// the previous hashes
config.output.filename = `static/js/[name].[hash].bundle.js`;

config.performance = {
  hints: 'warning'
};

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}));
config.plugins.push(new webpack.ProvidePlugin({
  React: 'react' // ReactJS module name in node_modules folder
}));
config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());

config.optimization.mangleWasmImports = true;

module.exports = config;
