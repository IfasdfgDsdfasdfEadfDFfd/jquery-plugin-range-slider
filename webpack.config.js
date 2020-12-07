const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const EXAMPLE_DIR = path.resolve(path.join(process.cwd(), 'example'));
const BUILD_DIR = path.resolve(path.join(process.cwd(), 'build'));
const IS_DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    plugin: path.join(SRC_DIR, 'index.ts'),
    example: { import: path.join(EXAMPLE_DIR, 'index.js'), dependOn: 'plugin' },
  },
  output: {
    path: BUILD_DIR,
    publicPath: '',
    filename: '[name].build.js',
  },

  externals: {
    jquery: 'jQuery',
  },

  // don't forget about dots...
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.pug', '.html', '.css'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: './docs/**/*' }],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLE_DIR, 'index.pug'),
      favicon: path.join(EXAMPLE_DIR, 'favicon.png'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV_MODE ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: IS_DEV_MODE ? '[id].css' : '[id].[fullhash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: { loader: 'pug-loader', options: { pretty: IS_DEV_MODE } },
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
    contentBase: BUILD_DIR,
    compress: true,

    host: 'localhost',
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
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
