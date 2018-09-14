'use strict';

/* ==================================== */
/* PACKAGES
/* ==================================== */
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

/* ==================================== */
/* TASKS
/* ==================================== */
// RENDER CSS FILES
gulp.task('sassify', function() {
  const browser_pref = [
    autoprefixer({
      browsers: ['last 3 versions', "IE 9"]
    })
  ];
  const shrink_opt = [cssnano()];

  return gulp.src('src/sass/sparkle.sass')
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError)
    )
    .pipe(postcss(browser_pref))
    .pipe(rename('sparkle.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(postcss(shrink_opt))
    .pipe(rename('sparkle.min.css'))
    .pipe(gulp.dest('dist/css/'));

    // .pipe(browserSync.reload({
    //   stream: true
    // }));
});

// RENDER HTML FILES
gulp.task('pug', function buildHTML() {
  return gulp.src('dev/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./'));

    // .pipe(browserSync.reload({
    //   stream: true
    // }));
});

// DEFAULT RUN
gulp.task('default', ['pug', 'sassify']);