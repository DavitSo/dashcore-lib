const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['./index.js'],
  mode: 'production',
  resolve: {
    fallback: {
      fs: false,
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      assert: require.resolve('assert/'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      os: require.resolve('os-browserify/browser'),
      zlib: require.resolve('browserify-zlib'),
      events: require.resolve('events-browserify'),
      string_decoder: require.resolve('string_decoder/'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
	
  target: 'web',
  plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: 'process/browser',
      })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dashcore-lib.min.js',
    library: 'dashcore',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
