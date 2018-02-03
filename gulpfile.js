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
var imageminSVG = require('imagemin-svgo');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

/* ==================================== */
/* TASKS
/* ==================================== */
gulp.task('css:backup', function() {
    return gulp.src('src/css/sparkle.css')
        .pipe(concatCSS('sparkle.css'))
        .pipe(gulp.dest('src/css/backup/'));
});

gulp.task('css:minify-backup', function() {
    return gulp.src('src/css/sparkle.css')
        .pipe(cleanCSS())
        .pipe(rename('sparkle.min.css'))
        .pipe(gulp.dest('src/css/backup/'));
});

// RENDER CSS FILES
gulp.task('sassify', function() {
    return gulp.src('src/scss/sparkle.scss')
        .pipe(sass({ outputStyle: 'expanded' })
            .on('error', sass.logError)
        )
        .pipe(rename('sparkle.css'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(cleanCSS())
		.pipe(rename('sparkle.min.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch:sass', function() {
    gulp.watch('src/scss/sparkle.scss', ['sassify'], browserSync.reload);
    console.log('Watching HTML files.');
});

// RENDER JS FILES
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

gulp.task('watch:js', function() {
    gulp.watch('src/js/*.js', ['uglify'], browserSync.reload);
    console.log('Watching HTML files.');
});

// RENDER HTML FILES
gulp.task('pug', function buildHTML() {
    return gulp.src('dev/*.pug')
        .pipe(
            pug({ pretty: true })
        )
        .pipe(gulp.dest('docs/'))
        .pipe(browserSync.reload({ stream: true })); // <-- Remove if it doesn't work
});

gulp.task('watch:html', function() {
    gulp.watch('dev/**/*.pug', ['pug'], browserSync.reload);
    console.log('Watching HTML files.');
});

// RENDER IMAGE FILES
gulp.task('minimg', function() {
    return gulp.src(['src/img/*.jpg', 'src/img/*.png', 'src/img/*.svg'])
        .pipe(imagemin(
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({ plugins: [{removeViewBox: true}] })
        ))
        .pipe(gulp.dest('dist/img/'));
});

// CREATE SERVER
gulp.task('serve', ['watch:html', 'watch:sass', 'watch:js'], function() {
    browserSync.init({
        server: "./docs"
    });

    gulp.watch(['src/scss/sparkle.scss'], ['sassify']);
    gulp.watch(['dev/**/*.pug'], ['pug']);
    gulp.watch("docs/*.html").on('change', browserSync.reload);
});

// DEFAULT RUN
gulp.task('default', ['pug', 'sassify', 'uglify', 'minimg']);