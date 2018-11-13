var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const STATIC_OUT_DIR = 'static';
const BUILD_DIR = path.join(__dirname, 'build');
const SRC_DIR = path.join(__dirname, 'src');

/**
 * Common configurations for all environments of Webpack (default and prod)
 * */
const config = {
  target: 'web',
  entry: SRC_DIR + '/index.js',
  context: __dirname,
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: `${STATIC_OUT_DIR}/js/[name].bundle.js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        exclude: path.join(__dirname, 'node_modules/'),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash].[ext]',
              outputPath: `${STATIC_OUT_DIR}/img/`,
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      SRC_DIR, // IMPORTANT! Include SRC_DIR or webpack cannot import our src-files.
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },

  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      cacheGroups: {
        vendors: {
          // Force vendors name to be "vendors", ...suffixed with .bundle.js
          name: () => 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1
        }
      }
    }
  },

  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'
  })],

  externals: {
  }
};

module.exports = config;
