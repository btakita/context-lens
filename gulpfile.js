var gulp       = require('gulp')
  , watchify   = require('watchify')
  , rename     = require('gulp-rename')
  , browserify = require('browserify')
  , babelify   = require('babelify')
  , riotify    = require('riotify')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , sourcemaps = require('gulp-sourcemaps')
  , gutil      = require('gulp-util')
  , assign     = require('lodash.assign')
  ;

// add custom browserify options here
var browserifyOpts = {
  entries: ['./public/index.bundle.js'],
  extensions: ['*.js', '*.tag'],
  debug: true
};
var watchifyOpts = assign({}, watchify.args, browserifyOpts);
var watchify2 = watchify(browserify(watchifyOpts));

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('browserify', function(){
  browserifyChain(browserify(browserifyOpts));
});

gulp.task('js', function() {
  browserifyChain(watchify2);
});
watchify2.on('update', function() {
  browserifyChain2((watchify2));
}); // on any dep update, runs the bundler
watchify2.on('log', gutil.log); // output build logs to terminal

function browserifyChain(b) {
  browserifyChain2(b
    .transform(babelify)
    .transform(riotify));
}

function browserifyChain2(b) {
  b
    .bundle()
    .pipe(source('index.bundle.js'))
    .pipe(rename('index.js'))
    .pipe(buffer()) // optional,buffer file contents
    .pipe(sourcemaps.init({loadMaps: true})) // optional, loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('public/dist'));
}