/**
 * @file
 */

const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');

const srcDir = path.resolve(__dirname, "src");
const distDir = path.resolve(__dirname, "axe");

module.exports = [
  {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.min.js(\?.*)?$/i,
          terserOptions: {
            mangle: true,
            output: {
              beautify: true
            }
          },
        }),
      ],
    },
    watch: true,
    entry: {
      'frame': path.resolve(__dirname, srcDir + '/frame.js'),
      'frame.min': path.resolve(__dirname, srcDir + '/frame.js'),
      'plugin': path.resolve(__dirname, srcDir + '/plugin.js'),
      'plugin.min': path.resolve(__dirname, srcDir + '/plugin.js'),
      'test': path.resolve(__dirname, srcDir + '/test.js'),
      'test.min': path.resolve(__dirname, srcDir + '/test.js')
    },
    output: {
      filename: '[name].js',
      path: `${distDir}/`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    },
    plugins: [
      new WebpackNotifierPlugin({alwaysNotify: true})
    ]
  },
];
