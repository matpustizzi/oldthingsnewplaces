<<<<<<< HEAD
var gulp = require("gulp")
var Fontmin = require("fontmin")
=======
const gulp = require("gulp")
const Fontmin = require("fontmin")
>>>>>>> formatting

gulp.task("copy-fonts", () => {
  var fontmin = new Fontmin().src("src/fonts/*.ttf").dest("build/fonts")

  fontmin.run(function(err, files) {
    if (err) {
      throw err
    }
  })
})
<<<<<<< HEAD

gulp.task("copy-icons", () => {
  return gulp.src("src/icons/**").pipe(gulp.dest("build/icons"))
})

// var gulp = require('gulp');
// var fontmin = require('gulp-fontmin');

// gulp.task('copy-fonts', function () {
//     return gulp.src('src/fonts/*.ttf')
//         .pipe(fontmin())
//         .pipe(gulp.dest('build/fonts'));
// });
=======
>>>>>>> formatting
