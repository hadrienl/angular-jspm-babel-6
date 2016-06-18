var gulp = require('gulp'),
  path = {
    source: 'src',
    scripts: 'src/**/*.js',
    html: ['index.html', 'src/**/*.html'],
    output:'dist/',
    css: 'css/*.css',
    sass: 'src/styles/*.scss',
    dist: 'dist/',
    bundle: 'bundle/',
    appmodule: 'src/app',
    images: 'img/**/*',
    fonts: 'fonts/**/*'
  },
  bundleTask = require('./tasks/bundle')(path),
  watchTask = require('./tasks/watch')(path);

gulp.task('default', ['watch']);
