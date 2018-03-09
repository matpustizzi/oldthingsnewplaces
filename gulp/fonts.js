const gulp = require("gulp")
const Fontmin = require("fontmin")

gulp.task("copy-fonts", () => {
  var fontmin = new Fontmin().src("src/fonts/*.ttf").dest("build/fonts")

  fontmin.run(function(err, files) {
    if (err) {
      throw err
    }
  })
})

gulp.task("copy-icons", () => {
  return gulp.src("src/icons/**").pipe(gulp.dest("build/icons"))
})
