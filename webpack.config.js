var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./main.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
   },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
 };
