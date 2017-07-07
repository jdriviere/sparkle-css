'use strict';

/* ==================================== */
/* PACKAGES
/* ==================================== */
var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var pump = require('pump');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var imageminPNG = require('imagemin-optipng');
var imageminJPG = require('imagemin-jpegtran');
var sass = require('gulp-sass');

/* ==================================== */
/* TASKS
/* ==================================== */
gulp.task('build', function() {
    return gulp.src('src/css/sparkle.css')
        .pipe(concatCSS('sparkle.css'))
        .pipe(gulp.dest('src/css/backup/'));
});

gulp.task('minify', function() {
    return gulp.src('src/css/sparkle.css')
        .pipe(cleanCSS())
        .pipe(rename('sparkle.min.css'))
        .pipe(gulp.dest('src/css/backup/'));
});

// Use only if/when using SASS
gulp.task('sassify', function() {
    return gulp.src('src/scss/sparkle.scss')
        .pipe(sass({outputStyle: 'expanded'})
            .on('error', sass.logError)
        )
        .pipe(rename('sparkle.css'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(cleanCSS())
		.pipe(rename('sparkle.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('uglify', function(cb) {
    pump([
        gulp.src('src/js/sparkle.js'),
        gulp.dest('dist/js/'),
        uglify(),
        rename('sparkle.min.js'),
        gulp.dest('dist/js/')
    ],
    cb);
});

gulp.task('minimg', function() {
    return gulp.src('src/img/*.*')
        .pipe(imagemin(
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ))
        .pipe(gulp.dest('dist/img/'));
});

// gulp.task('default', ['build', 'minify', 'sassify', 'uglify', 'minimg']);
gulp.task('default', ['sassify', 'uglify', 'minimg']);