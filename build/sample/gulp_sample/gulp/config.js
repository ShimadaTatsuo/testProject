// @file config.js
var dest = './build';
var src = './src';

module.exports = {

    dest: dest,

    js: {
        src: src + '/js/**',
        dest: dest + '/js',
        uglify: false
    },

    webpack: {
        entry: src + '/js/app.js',
        output: {
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['', '.js']
        }
    }

};
