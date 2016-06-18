// next
// ng-templates

var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  exec = require('gulp-exec'),
  useref = require('gulp-useref'),
  preprocess = require('gulp-preprocess'),
  rename = require('gulp-rename'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  ngTemplates = require('gulp-ng-templates'),
  NODE_ENV = process.env.NODE_ENV || 'production',
  path;

module.exports = function (_path_) {
  path = _path_;
};

gulp.task('clean-bundle', function (done) {
  del('bundle', done);
});

gulp.task('bundle-app', ['build-app'], function () {
  return gulp.src(path.appmodule)
    .pipe(exec('jspm bundle-sfx src/app bundle/app.js'))
    .on('error', function(err) {
      console.error('Failed to bundle app. Run `jspm bundle-sfx src/app bundle/app.js` to fix it.');
    })
    .pipe(exec.reporter({
      err: true,
      stderr: false,
      stdout: false
    }));
});

gulp.task('bundle-systemjs', function () {
  return gulp.src(['config.js', 'jspm_packages/system.js*', 'jspm_packages/es6-module-loader.js*'])
    .pipe(gulp.dest('bundle'));
});

gulp.task('bundle-css', function () {
  return gulp.src(path.css)
    .pipe(gulp.dest('bundle/css'));
});

gulp.task('bundle-images', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest('bundle/img'));
});

gulp.task('bundle-fonts', function () {
  return gulp.src(path.fonts)
    .pipe(gulp.dest('bundle/fonts'));
});

gulp.task('pre-bundle-templates', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('bundle/dist'));
});
gulp.task('bundle-templates', ['pre-bundle-templates'], function () {
  return gulp.src(['bundle/**/*.html', '!bundle/index.html'])
    .pipe(ngTemplates({
      filename: 'templates.js',
      module: 'sleek',
      standalone: false
    }))
    .pipe(gulp.dest('bundle'));
});

gulp.task('bundle-index', function () {
  var config = getConfig();

  var assets = useref.assets();

  return gulp.src(['index.html'])
    .pipe(preprocess({
      context: config
    }))
    .pipe(assets)
    .pipe(rev())
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest('bundle'));
});

gulp.task('bundle-message-format', function () {
  gulp.src('jspm_packages/github/SlexAxton/messageformat.js*/locale/*')
    .pipe(gulp.dest('bundle/jspm_packages/github/SlexAxton'));
});
gulp.task('bundle-locales', ['locales', 'bundle-message-format'], function () {
  gulp.src('locales/*')
    .pipe(gulp.dest('bundle/locales'));
});

gulp.task('bundle-statics', function (done) {
  runSequence('sass', [
    'bundle-templates',
    'bundle-systemjs',
    'bundle-images',
    'bundle-locales',
    'bundle-fonts',
    'bundle-css'
  ], done);
});

gulp.task('bundle', function (done) {
  runSequence(/*'clean-bundle', */'bundle-app', 'bundle-statics', 'bundle-index', done);
});

function getConfig () {
  var config = {};
  try {
    config = require('./config.json')[NODE_ENV];
  } catch (e) {
    throw new Error('taks/config.json is malformed');
  }
  config.NODE_ENV = NODE_ENV;
  return config;
}
