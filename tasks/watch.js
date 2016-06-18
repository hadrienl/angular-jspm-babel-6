var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  babel = require('gulp-babel'),
  fs = require('fs'),
  browserSync = require('browser-sync').create(),
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  preprocess = require('gulp-preprocess'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  exec = require('gulp-exec'),
  purify = require('gulp-purifycss'),
  NODE_ENV = process.env.NODE_ENV || 'development',
  path;

module.exports = function (_path_) {
  path = _path_;
};

var compilerOptions = {
  "presets": ["es2015"],
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
};

var jshintConfig = {esnext:true};

gulp.task('build-app', function () {
  return gulp.src('src/app-template.js')
    .pipe(preprocess({
      context: getConfig()
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('build-system', ['build-app'], function () {
  return gulp.src(path.scripts)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(preprocess({
      context: getConfig()
    }))
    .pipe(babel(compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.stream());
});

gulp.task('build-html', function () {
  return gulp.src(path.html)
    .pipe(changed(path.output, {extension: '.html'}))
    .pipe(preprocess({
      context: getConfig()
    }))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean-dist', function (done) {
  del.sync([path.dist]);
  done();
});

gulp.task('build', function(callback) {
  return runSequence(
    ['build-system', 'build-html', 'sass'],
    callback
  );
});

gulp.task('serve', ['build'], function(done) {
  browserSync.init({
    open: false,
    port: 9000,
    files: {
      src: path.css
    },
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        if (req.url.match(/^(.(?!\..+))*$/) ||
            req.url === 'index.html') {
          req.url = '/dist/index.html';
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('sass', function() {
  return gulp.src(path.sass)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .on('error', function(err) {
    console.log(err.toString());
    this.emit('end');
  })
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'))
});

gulp.task('purify', function() {
  return gulp.src('css/main.css')
    .pipe(purify(['src/**/*.js', '**/*.html']))
    .pipe(rename('main.clean.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('prepare-watch', function (done) {
  return runSequence('clean-dist', 'serve', done);
});

gulp.task('watch', ['prepare-watch'], function() {
  gulp.watch([path.source, path.html], ['build']);
  gulp.watch(['css/sass/**/*.scss', '!css/sass/doc/**/*.scss'], ['sass', 'styledoc']);
  gulp.watch('css/sass/doc/**/*.scss', ['styledoc']);
});


function getConfig () {
  var config = {};
  try {
    config = require('./config.json')[NODE_ENV];
  } catch (e) {
    throw new Error('tasks/config.json is malformed');
  }
  config.NODE_ENV = NODE_ENV;
  return config;
}
