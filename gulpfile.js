var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watchCss', function () {
    console.log('Watching CSS files for change.');
    return gulp.src('/css/*.css')
                .pipe(browserSync.reload({
                    stream: true
                }))
});

gulp.task('watchJs', function () {
    console.log('Watching JavaScript files for change.');
    return gulp.src('/js/*.js')
                .pipe(browserSync.reload({
                    stream: true
                }))
});

gulp.task('watchHtml', function () {
    console.log('Watching HTML files for change.');
    return gulp.src('index.html')
                .pipe(browserSync.reload({
                    stream: true
                }))
});

gulp.task('browserSync', function () {
    console.log('Browser-Sync started.');
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

gulp.task('watch', ['browserSync', 'watchCss', 'watchJs', 'watchHtml'], function () {
    gulp.watch('/css/*.css', ['watchCss']);
    gulp.watch('/js/*.js', ['watchJs']);
    gulp.watch('index.html', ['watchHtml']);
});

gulp.task('default', ['watch']);
