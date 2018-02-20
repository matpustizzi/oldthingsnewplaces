const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');


gulp.task('clean', function() {
    return del(['api/**.json','build/**']);
});

gulp.task('build', function(callback) {
    return runSequence('clean','fetch','copy-fonts','render','sass','bundle',callback);
});

gulp.task('build-prod', function(callback){
    return runSequence('clean','fetch','copy-fonts','render','sass','bundle-prod',callback);
});

// manually end bundle-prod task
gulp.task('deploy', ['build-prod'], function(){
    process.exit(0);
});