const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    moduleImporter = require('sass-module-importer'),
    reload  = browserSync.reload,
    src = {
        scss: 'src/scss/*.scss',
        css:  'build/css',
        html: 'src/*.html'
    };

gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass({ importer: moduleImporter() }).on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['fetch','render','sass','bundle'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch('src/*.html', ['render']);
    gulp.watch('build/*.html').on("change",reload);
});


//js
const gutil     = require('gulp-util'),
    source      = require('vinyl-source-stream'),
    babelify    = require('babelify'),
    watchify    = require('watchify'),
    exorcist    = require('exorcist'),
    browserify  = require('browserify');

watchify.args.debug = true;

const bundler = watchify(browserify('./src/js/app.js', watchify.args));

bundler.transform(babelify.configure({
    sourceMapRelative: 'build/js'
}));

bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('build/js/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream({once: true}));
}

gulp.task('bundle', function () {
    return bundle();
});

gulp.task('default', ['serve']);