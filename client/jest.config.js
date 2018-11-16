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
      branches: 60,
      functions: 60,
      lines: 65,
      statements: -40
    },
    'src/pages/**/*.js': {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: -50
    },

    /**
     * Forms, through Formik are difficult to test
     * */
    'src/components/CommentList/CommentForm.js': {
      statements: -80,
      branches: 0,
      lines: 20,
      functions: 25
    }
    /**
     * Requires canvas, which makes it difficult to test in Jest
     * */
    // 'src/components/WordCloud/index.js': {}
  }
};
