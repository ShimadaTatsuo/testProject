const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.resolve('src/js', 'index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dest/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
            presets: [
                ['env', {'modules': false}],
                'stage-1',
            ],
        }
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  devServer: {
    port: 3000,
    contentBase: 'dest',
  },
}
