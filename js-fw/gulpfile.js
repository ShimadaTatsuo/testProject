var gulp = require('gulp');
var pug = require("gulp-pug");
var browserSync = require('browser-sync');
var plumber = require("gulp-plumber");
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var nib = require('nib');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var path = require('path');
var src = './src';
var dest = './dest';
var relativeSrcPath = path.relative('.', src);
var config = {
    src: src,
    dest: dest,
    pug: {
        src: [
            src + '/www/**/!(_)*.pug'
        ],
        dest: dest + '/www/',
        options: { pretty: true }
    },
    stylus: {
        src: [
            src + '/styl/**/!(_)*'
        ],
        dest: dest + '/css/',
        output: 'main.css',
        autoprefixer: {
            browsers: ["last 2 versions", "ie >= 9", "Android >= 3","ios_saf >= 7"],
            cascade: false
        },
        minify: false
    },
    js: {
        src: [
            src + '/js/**/!(_)*'
        ],
        dest: dest + '/js/'
    },
    watch: {
        pug: relativeSrcPath + '/www/**',
        styl: relativeSrcPath + '/styl/**',
        js: relativeSrcPath + '/js/**'
    }
}

gulp.task('browser-sync',function(){
    browserSync({
        server: {
            baseDir: config.dest
            ,index  : "www/index.html"
        }
    });
});

gulp.task("pug", function(){
    gulp.src(config.pug.src)
        .pipe(plumber())
        .pipe(pug(config.pug.options))
        .pipe(gulp.dest(config.pug.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('stylus', function () {
    gulp.src(config.stylus.src)
        .pipe(plumber())
        .pipe(stylus({use: [nib()]}))
        .pipe(autoprefixer(config.stylus.autoprefixer))
        .pipe(gulp.dest(config.stylus.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
    browserify({
        entries: [src + '/js/main.js']
    })
    .bundle()
    .on('error',function(error){
        console.log(error.message)
        this.emit('end')
    })
    //.pipe(plumber())
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.reload({stream:true}));

    gulp.src([src + '/js/*.js', '!' + src + '/js/main.js'])
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    watch(config.watch.styl, function () {
        gulp.start(['stylus']);
    });
    watch(config.watch.pug, function() {
        gulp.start(['pug']);
    });
    watch(config.watch.js, function() {
        gulp.start(['js']);
    });
});

gulp.task('default', ['stylus', 'pug', 'js', 'watch', 'browser-sync']);
