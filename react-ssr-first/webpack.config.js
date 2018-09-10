var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var src = path.resolve(__dirname, 'src')
var dist = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: src + '/index.js',
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['env', { modules: false }], 'react'],
        },
      },
    ],
  },
  plugins: [],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
}
