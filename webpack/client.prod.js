const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                camelCase: 'dashes',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "variables/_variables.scss";',
                includePaths: [path.resolve('./src/sass/')],
                sourceMap: true,
              }
            }
          ]
        }),
      },
    ]
  },
  resolve: {
    alias: {
      api: path.resolve('src/api'),
      components: path.resolve('src/components'),
      containers: path.resolve('src/containers'),
      img: path.resolve('src/images'),
      modules: path.resolve('node_modules'),
      services: path.resolve('src/services'),
      _redux: path.resolve('src/redux')
    },
    modules: [path.resolve('src/'), 'node_modules'],
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [
    new ExtractTextPlugin("style.css"),

    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
    })
  ]
}
