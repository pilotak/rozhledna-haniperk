const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'public', 'scripts', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.public.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'src', 'public', 'img'), to: path.resolve(__dirname, 'static') }],
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['cs'],
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/public/img/logo-blue.svg'),
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
      logo: path.resolve(__dirname, 'src/public/img/logo.svg'),
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
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
  output: {
    filename: 'script.min.js',
    path: path.resolve(__dirname, 'static'),
  },
};
