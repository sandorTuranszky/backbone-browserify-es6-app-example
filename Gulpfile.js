'use strict';

var path        = require('path');
var gulp        = require('gulp');
var watchify    = require('watchify');
var compass     = require('gulp-compass');
var filter      = require('gulp-filter');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var size        = require('gulp-size');
var streamify   = require('gulp-streamify');
var hbsfy       = require('hbsfy');
var del         = require('del');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');

var Server      = require('karma').Server;
var browserSync = require('browser-sync').create();
var gutil       = require('gulp-util');

var prod        = gutil.env.prod;
var ENV         = gutil.env.prod || 'develop';

/**
 *
 * gulp - run server in development env
 * gulp --prod - runs serve in production env (uglify and no source maps)
 *
 * 'compile:watch:js' transforms ES6 with babelify
 *
 **/

gulp.task('default', ['clean', 'compile:watch:js', 'copy:assets', 'compile:sass'], function () {
    console.log('\nStart server in `'+ ENV +'` environment...\n');

    browserSync.init({
      server: {
        baseDir: "./public"
      }
    });

    gulp.watch('app/index.hbs', ['copy:html']);
    gulp.watch('app/scss/**/*.scss', ['compile:sass']);
    gulp.watch('app/assets/**/*', ['copy:assets']);
    gulp.watch('public/**/*.{js,html}').on('change', browserSync.reload);
});

gulp.task('build', ['compile:js', 'copy:assets', 'compile:sass'], function () {
    console.log('\nBuild completed...\n');
});


gulp.task('compile:sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(compass({
            style: prod ? 'compressed' : 'nested',
            sourcemap: !prod,
            css: 'public/css',
            sass: 'app/scss',
            font: 'app/assets/fonts',
            image: 'app/assets/images',
            require: [],
            project: path.join(__dirname),
            generated_images_path: 'public/images/',
            import_path: [path.join(__dirname, '..', 'node_modules')]
        }))
        .on('error', errorHandler)
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(prod ? cssnano() : gutil.noop())
        .pipe(size({showFiles: true}))
        .pipe(browserSync.stream());
});

gulp.task('compile:watch:js', function () {
    var bundler = watchify(browserify({
        cache: {},
        packageCache: {},
        entries: [path.join(__dirname, './app/js/app.js')],
        paths: ['./app/js'],
        noparse: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/underscore/underscore-min.js',
            './node_modules/underscore/underscore.js'
        ],
        transform: ['hbsfy'],
        fast: true,
        debug: true
    }).transform('babelify', { presets: ['es2015'], sourceMaps: false }));

    function rebundle() {
        return bundler.bundle()
            .on('error', errorHandler)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(prod ? streamify(uglify()) : gutil.noop())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/js/'));
    }

    bundler.on('update', rebundle);
    bundler.on('time', function (time) {
        console.log('Times: %s s.', (time / 1000) % 60);
    });
    bundler.on('bytes', function (bytes) {
        console.log('Size: %s', bytesToSize(bytes));
    });

    return rebundle();
});

gulp.task('copy:assets', function() {
    return gulp.src(['app/assets/**/*.{png,jpeg,eot,svg,ttf,woff,woff2,json}'], {base: 'app/assets'})
        .on('error', errorHandler)
        .pipe(gulp.dest('public/'));
});

gulp.task('clean', function(cb) {
    return del(['public/js/*', 'public/css/*', 'public/images/**/*', 'app/.sass-cache'], function() {
        cb();
    });
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});


function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function errorHandler() {
    console.log(arguments);
    this.emit('end');
    return this;
}
