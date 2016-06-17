var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  babel = require('gulp-babel'),
  fs = require('fs'),
  browserSync = require('browser-sync'),
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber'),
  reload = browserSync.reload,
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  preprocess = require('gulp-preprocess'),
  NODE_ENV = process.env.NODE_ENV || 'development';

var path;

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

gulp.task('build-system', function () {
  return gulp.src(path.scripts)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(babel(compilerOptions))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build-html', function () {
  return gulp.src(path.html)
    .pipe(changed(path.output, {extension: '.html'}))
    .pipe(preprocess({
      context: {
        NODE_ENV: NODE_ENV
      }
    }))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});
/**
TODO : make a eslint task
gulp.task('lint', function() {
  return gulp.src(path.scripts)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});
*/

gulp.task('clean-dist', function (done) {
  del('dist', done);
});

gulp.task('build', function(callback) {
  return runSequence(
    ['build-system', 'build-html', 'css'],
    callback
  );
});

gulp.task('serve', ['build'], function(done) {
  browserSync({
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

gulp.task('css', function () {
    return gulp.src(path.css)
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['serve'], function() {
  var watcher = gulp.watch([path.scripts, path.html], ['build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch(path.css, ['css']);
});
