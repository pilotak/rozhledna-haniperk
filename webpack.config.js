/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.scss', '.js'],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['cs'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'static') },
        { from: path.resolve(__dirname, 'src/views'), to: path.resolve(__dirname, 'views') },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/img/logo-blue.svg'),
      prefix: '/favicon/',
      favicons: {
        background: 'transparent',
        icons: {
          android: false,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    //inverse for Windows tiles
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/img/logo.svg'),
      prefix: '/favicon/',
      favicons: {
        background: '#2C3E8C',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: false,
          firefox: false,
          windows: true,
          yandex: false,
        },
      },
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  output: {
    filename: 'script.min.js',
    path: path.resolve(__dirname, 'static'),
  },
};
