const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');

const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const EXAMPLE_DIR = path.resolve(path.join(process.cwd(), 'example'));
const DIST_DIR = path.resolve(path.join(process.cwd(), 'dist'));
const IS_DEV_MODE = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV);

module.exports = {
  entry: {
    plugin: path.join(SRC_DIR, 'index.ts'),
    example: { import: path.join(EXAMPLE_DIR, 'index.js'), dependOn: 'plugin' },
  },
  output: {
    path: DIST_DIR,
    filename: '[name].build.js',
  },

  // don't forget about dots...
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.pug', '.html', '.css'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'index.pug'),
      favicon: path.join(EXAMPLE_DIR, 'favicon.png'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV_MODE ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_DEV_MODE ? '[id].css' : '[id].[hash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: { loader: 'pug-loader', options: { pretty: true } },
      },
      {
        test: /\.scss$/,
        use: [
          IS_DEV_MODE
            ? { loader: 'style-loader' }
            : MiniCssExtractPlugin.loader,
          { loader: 'css-modules-typescript-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.(ico|png|svg|eot|woff|woff2|ttf|)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  mode: process.env.NODE_ENV,
  devtool: IS_DEV_MODE ? 'eval-cheap-module-source-map' : 'source-map',

  devServer: {
    contentBase: DIST_DIR,
    compress: true,

    host: '0.0.0.0',
    port: 8080,

    inline: true,

    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },

  optimization: {
    minimize: true,
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
