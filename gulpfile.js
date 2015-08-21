var process    = require('process')
  , gulp       = require('gulp')
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
  , run        = require('tape-run')
  , watch      = require('gulp-watch')
  , request    = require('request')
  , fs         = require('fs')
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

gulp.task('test', function() {
  browserify({
    entries: ['./test/index.bundle.js'],
    extensions: ['*.js', '*.tag'],
    debug: true
  })
    .transform(riotify)
    .bundle()
    .pipe(run())
    .on('results', console.log)
    .pipe(process.stdout);
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

gulp.task('dpd', dpd);
gulp.task('dpd-watch', function() {
  dpd();
  watch("resources/**/*.json", dpd);
});

function dpd() {
  console.log("Building public/dist/dpd.js");
  request("http://localhost:2403/dpd.js", function(err, response, body) {
    if (err) throw err;
    fs.writeFile("public/dist/dpd.js", body, function(err2) {
      if (err2) throw err2;
    });
  })
}

function browserifyChain(b) {
  return browserifyChain2(b
    .transform(babelify)
    .transform(riotify));
}

function browserifyChain2(b) {
  return b
    .bundle()
    .pipe(source('index.bundle.js'))
    .pipe(rename('index.js'))
    .pipe(buffer()) // optional,buffer file contents
    .pipe(sourcemaps.init({loadMaps: true})) // optional, loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('public/dist'));
}