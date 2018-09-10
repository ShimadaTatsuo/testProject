module.exports = {
    context: __dirname + '/src',
    devtool: '#source-map',
    entry: {
        'app': './app/app',
    },
    output: {
        path: __dirname + '/dist/js',
        publicPath: '/js/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: __dirname + '/dist',
        port: 3002
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:{
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
