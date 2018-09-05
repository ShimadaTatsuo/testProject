var glob = require("glob");
var webpack = require("webpack");
var entries = glob.sync(__dirname + '/src/js/**/index.js');
// var isProd = process.env.NODE_ENV === "production";
var plugins = [new webpack.optimize.ModuleConcatenationPlugin()];

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill'
    ].concat(entries)
  },
  output: {
    path: __dirname + '/dest/js',
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: [
          [
            'env',
            { 'modules': false }
          ],
          'stage-1'
        ]
      }
    }, {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ]
    }]
  },
  devServer: {
    contentBase: __dirname + '/dest',
    port: 8000
  },
  plugins: plugins
};
