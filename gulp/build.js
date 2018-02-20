const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del(['api/**.json','build/**']);
});

gulp.task('build', function(callback) {
    return runSequence('clean','fetch','copy-fonts','render','sass','bundle',callback);
});

gulp.task('build-prod', ['build'], function(){
    process.exit(0)
});