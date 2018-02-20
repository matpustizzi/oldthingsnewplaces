var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del(['api/**.json','build/**']);
});

gulp.task('build', function(callback) {
    return runSequence('clean','fetch','copy-fonts','render','sass','bundle',callback);
});