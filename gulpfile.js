"use strict";

var fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    browserify = require('browserify'),
    eslint = require('gulp-eslint'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync');

// directories object
var dirs = {
  root: '',
  npm: 'node_modules/',
  src: 'src/',
  dist: 'dist/',
  test: 'test/'
};

var printError = function(task, message) {
  gutil.log(gutil.colors.white.bgRed.bold(task), gutil.colors.red(message));
  gutil.beep();
};

var printSuccess = function(task, message) {
  gutil.log(gutil.colors.white.bgGreen.bold(task), gutil.colors.green(message));
};

gulp.task('jslint', function() {
  return gulp.src(dirs.src + '**/*.js')
    .pipe(eslint({
      extends: 'eslint:recommended',
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }))
    .pipe(eslint.format());
});

gulp.task('browserify', function() {
  var b = browserify({
    debug: false,
    standalone: 'Scrollo',
    entries: dirs.src,
    paths: [dirs.src],
    extensions: ['.js']
  });

  b.transform('babelify', {
    presets: ['es2015'],
    plugins: ['add-module-exports']
  });

  var bundle = function() {
    return b.bundle()
      .on('error', function(err) {
        printError('browserify', err.message);
      })
      .pipe(source('scrollo.js'))
      .pipe(gulp.dest(dirs.dist));
  };

  b.transform({
    global: true,
    sourcemap: false
  }, 'uglifyify');

  return bundle();
});

gulp.task('server', function() {
  browserSync.init({
    logLevel: 'info',
    server: {
      baseDir: dirs.test,
      routes: {
        "/dist": "dist"
      }
    }
  });
});

gulp.task('default', ['browserify']);

gulp.task('test', ['server']);
