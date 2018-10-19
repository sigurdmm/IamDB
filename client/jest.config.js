const path = require('path');

module.exports = {
  browser: true,
  verbose: true,

  /**
   * Defines how each file-types should be transformed,
   * before any tests are run.
   * */
  transform: {
    '\\.(less|css|sass)': path.resolve(__dirname, 'config/jest/cssTransform.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.resolve(__dirname, 'config/jest/fileTransform.js'),
    '^.+\\.js?$': 'babel-jest'
  },

  transformIgnorePatterns: [
    // Some of nav's modules aren't pre-bundled as
    // they are used live in other projects.
    // This would break our tests, because jest cannot read .less or .sass syntax.
    'node_modules/(?!nav*)'
  ],

  setupTestFrameworkScriptFile: path.resolve(__dirname + '/src/testSetup.js'),

  snapshotSerializers: ['enzyme-to-json/serializer'],

  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 80,
      statements: -20
    },
  }
};
