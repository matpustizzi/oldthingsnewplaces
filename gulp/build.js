const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del(['api/**.json', 'build/**']);
});

gulp.task('build', function (callback) {
    return runSequence('clean', 'fetch', 'copy-fonts', 'render', 'sass', 'bundle', callback);
});

// same as build, but uses bundle-prod for js. bundle is for js development only
gulp.task('build-prod', function (callback) {
    return runSequence('clean', 'fetch', 'copy-fonts', 'render', 'sass', 'bundle-prod', callback);
});