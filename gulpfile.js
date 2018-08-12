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
  var browser_pref = [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ];
  var shrink_opt = [cssnano()];

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

// =================================
// DEPRECATED MODULES
// =================================
// const pump = require('pump');
// const uglify = require('gulp-uglify'); // Only deactivated for now
// const concatCSS = require('gulp-concat-css');
// const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
// const browserSync = require('browser-sync').create();

// =================================
// DEPRECATED TASKS
// =================================
// RENDER JS FILES
// gulp.task('uglify', function (cb) {
//   pump([
//       gulp.src('src/js/sparkle.js'),
//       gulp.dest('dist/js/'),
//       uglify(),
//       rename('sparkle.min.js'),
//       gulp.dest('dist/js/')
//     ],
//     cb);
// });

// gulp.task('watch:js', function() {
//   gulp.watch('src/js/*.js', ['uglify'], browserSync.reload);
//   console.log('Watching JS files.');
// });

// RENDER IMAGE FILES
// gulp.task('minimg', function() {
//   return gulp.src(['src/img/*.jpg', 'src/img/*.png', 'src/img/*.svg'])
//     .pipe(imagemin(
//       imagemin.jpegtran({
//         progressive: true
//       }),
//       imagemin.optipng({
//         optimizationLevel: 5
//       }),
//       imagemin.svgo({
//         plugins: [{
//           removeViewBox: true
//         }]
//       })
//     ))
//     .pipe(gulp.dest('dist/img/'));
// });

// WATCHES
// gulp.task('watch:sass', function() {
//   gulp.watch('src/sass/**/*.sass', ['sassify'], browserSync.reload);
//   console.log('Watching CSS files.');
// });

// gulp.task('watch:html', function() {
//   gulp.watch('dev/**/*.pug', ['pug'], browserSync.reload);
//   console.log('Watching HTML files.');
// });

// CREATE SERVER
// gulp.task('serve', ['watch:html', 'watch:sass', 'watch:js'], function() {
//   browserSync.init({
//     server: "./"
//   });

//   gulp.watch(['src/sass/sparkle.sass'], ['sassify']);
//   gulp.watch(['dev/**/*.pug'], ['pug']);
//   gulp.watch("./index.html").on('change', browserSync.reload);
// });