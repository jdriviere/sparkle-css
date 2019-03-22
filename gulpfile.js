/**
 * @name            Gulpfile for Gulp v4
 * @author          J. D. Riviere
 * @desc            This is the gulpfile.js that uses Gulp v4.
 */

/* ==================================== */
/* MODULES
/* ==================================== */
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('autoprefixer');
const header = require('postcss-header');
const cssnano = require('cssnano');
const del = require('del');

/* ==================================== */
/* GLOBAL VARIABLES
/* ==================================== */
const pkg = require('./package.json');

const paths = {
  styles: {
    src: 'src/sass/sparkle.sass',
    dest: 'dist/css/'
  }
};

const banner = `
/*!
  * @name         ${pkg.name}
  * @author       ${pkg.author}
  * @version      ${pkg.version} - released on 03/22/2019
  * @website      ${pkg.homepage}
  * @license      ${pkg.license}
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
    browsers: [
      'last 3 versions',
      "IE >= 10"
    ]
  })
];

const shrinkOptions = [cssnano()];

/* ==================================== */
/* TASKS
/* ==================================== */
//--- Clean ---//
const clean = () => {
  console.log('Deleting files in \'dist\' folder...\n');
  return del(['dist/css/sparkle.*']);
}; // End of Clean

//--- Sassify ---//
const sassify = () => {
  console.log('Building expanded CSS file...\n');
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(options))
    .pipe(rename('sparkle.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}; // End of Sassify

//--- Minify ---//
const minify = () => {
  console.log('Building minified CSS files...\n');
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(options))
    .pipe(postcss(shrinkOptions))
    .pipe(rename({
      base: 'sparkle',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}; // End of Minify

//--- Linting ---//
const lintify = () => {
  console.log("Linting the CSS files...\n")
  return gulp.src('src/sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}; // End of Linting

//--- Watch ---//
const watch = () => {
  console.log('Watching SASS files for changes...\n');
  gulp.watch(paths.styles.src, sassify);
}; // End of Watch

/* ==================================== */
/* SERIES AND PARALLELS
/* ==================================== */
const build = gulp.series(lintify, clean, gulp.parallel(sassify, minify));

/* ==================================== */
/* DESCRIPTIONS
/* ==================================== */
build.description = 'Builds the expanded CSS file in production mode.';
clean.description = 'Deletes all files within the \'dist\' folder. A private command.';
lintify.description = 'Formats the CSS attributes and styling according to the \'.sass-lint.yml\' file.';
minify.description = 'Builds the minified CSS file in production mode.';
sassify.description = 'Builds the CSS file in development mode.';
watch.description = 'Watches all the CSS files (mainly the \'sparkle.sass\' file) for changes.';

/* ==================================== */
/* EXPORT TASKS
/* ==================================== */
exports.sassify = sassify;
exports.minify = minify;
exports.lintify = lintify;
exports.watch = watch;

/* ==================================== */
/* DEFAULT TASK RUNNER
/* ==================================== */
exports.default = build;