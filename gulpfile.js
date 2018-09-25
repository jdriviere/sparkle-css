/* ==================================== */
/* PACKAGES
/* ==================================== */
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const header = require('postcss-header');
const cssnano = require('cssnano');

const pkg = require('./package.json');

/* ==================================== */
/* TASKS
/* ==================================== */
// RENDER CSS FILES
gulp.task('sassify', function() {
  const banner = `
  /*!
    * @name         ${pkg.name}
    * @author       ${pkg.author}
    * @version      ${pkg.version} - released on 09/25/2018
    * @website      ${pkg.homepage}
    * Welcome and thank you for using Sparkle, a lightweight, open-source CSS framework
    * to help you create simple, responsive website templates. It was developed by J. Djimitry Riviere
    * in late 2016, and continues to be improved upon by its developer to bring more creative features.
    * The major key to this framework lies within its ease of us to deliver superb results
    * when creating a website.
    * Thank you for using Sparkle! Happy Designing!
    */
  `;
  const options = [
    header({
      header: banner
    }),
    autoprefixer({
      browsers: ['last 3 versions', "IE >= 8"]
    })
  ];
  const shrink_opt = [cssnano()];

  return gulp.src('src/sass/sparkle.sass')
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError)
    )
    .pipe(postcss(options))
    .pipe(rename('sparkle.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(postcss(shrink_opt))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css/'));
});

// DEFAULT RUN
gulp.task('default', ['sassify']);