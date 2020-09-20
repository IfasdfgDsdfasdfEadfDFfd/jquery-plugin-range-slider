const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');


const SRC_DIR = path.resolve(path.join(process.cwd(), 'src'));
const EXAMPLE_DIR = path.resolve(path.join(process.cwd(), 'example'));
const DIST_DIR = path.resolve(path.join(process.cwd(), 'dist'));


const getAllTemplates = folder => {
  const SEARCH_DIR = path.join(process.cwd(), folder);

  return glob.sync(`${SEARCH_DIR}/**/*.pug`).map(filepath => {
    return new HtmlWebpackPlugin({
      template: filepath,
      favicon: path.join(EXAMPLE_DIR, 'favicon.png'),
      filename: `${path.parse(filepath).name}.html`,
    });
  });
};


module.exports = {
  entry: {
    plugin: path.join(SRC_DIR, 'index.ts'),
    example: path.join(EXAMPLE_DIR, 'index.js'),
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
    ...getAllTemplates('example'),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
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

  mode: process.env.NODE_ENVIRONMENT,
  devtool: 'inline-source-map',
  watch: true,

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
  }
};
