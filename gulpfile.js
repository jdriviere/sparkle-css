'use strict';

/* ==================================== */
/* PACKAGES
/* ==================================== */
const gulp = require('gulp');
const rename = require('gulp-rename');
const pump = require('pump');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Deprecated at the moment
// const uglify = require('gulp-uglify'); // Only deactivated for now
// const concatCSS = require('gulp-concat-css');
// const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
// const browserSync = require('browser-sync').create();

/* ==================================== */
/* TASKS
/* ==================================== */
// RENDER CSS FILES
gulp.task('sassify', () => {
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
    .pipe(gulp.dest('dist/css/'))
    // .pipe(browserSync.reload({
    //   stream: true
    // }));
});

gulp.task('watch:sass', () => {
  gulp.watch('src/sass/**/*.sass', ['sassify'], browserSync.reload);
  console.log('Watching CSS files.');
});

// RENDER HTML FILES
gulp.task('pug', function buildHTML() {
  return gulp.src('dev/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./'))
    // .pipe(browserSync.reload({
    //   stream: true
    // }));
});

gulp.task('watch:html', () => {
  gulp.watch('dev/**/*.pug', ['pug'], browserSync.reload);
  console.log('Watching HTML files.');
});

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

// gulp.task('watch:js', () => {
//   gulp.watch('src/js/*.js', ['uglify'], browserSync.reload);
//   console.log('Watching JS files.');
// });

// RENDER IMAGE FILES
// gulp.task('minimg', () => {
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

// CREATE SERVER
// gulp.task('serve', ['watch:html', 'watch:sass', 'watch:js'], () => {
//   browserSync.init({
//     server: "./"
//   });

//   gulp.watch(['src/sass/sparkle.sass'], ['sassify']);
//   gulp.watch(['dev/**/*.pug'], ['pug']);
//   gulp.watch("./index.html").on('change', browserSync.reload);
// });

// DEFAULT RUN
gulp.task('default', ['pug', 'sassify']);