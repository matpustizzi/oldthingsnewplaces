const gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  moduleImporter = require("sass-module-importer"),
  reload = browserSync.reload,
  env = require("dotenv").config(),
  src = {
    scss: "src/scss/*.scss",
    css: "build/css",
    html: "src/*.html"
  }

gulp.task("sass", function() {
  var options = {
    importer: moduleImporter()
  }

  if (process.env.env !== "development") options.outputStyle = "compressed"

  return gulp
    .src(src.scss)
    .pipe(sass(options).on("error", sass.logError))
    .pipe(gulp.dest(src.css))
    .pipe(
      reload({
        stream: true
      })
    )
})

gulp.task("serve", ["build"], function() {
  browserSync.init({
    server: "./build"
  })

  gulp.watch(src.scss, ["sass"])
  gulp.watch("src/*.html", ["render"])
  gulp.watch("build/*.html").on("change", reload)
})

//js
const gutil = require("gulp-util"),
  source = require("vinyl-source-stream"),
  babelify = require("babelify"),
  watchify = require("watchify"),
  exorcist = require("exorcist"),
  browserify = require("browserify"),
  plumber = require("gulp-plumber")

watchify.args.debug = true
watchify.args.verbose = true

const bundler = watchify(browserify("./src/js/app.js", watchify.args))

bundler.transform(
  babelify.configure({
    sourceMapRelative: "build/js",
    presets: ["es2015"]
  })
)

bundler.on("update", bundle)

function bundle() {
  gutil.log("Compiling JS...")

  return bundler
    .bundle()
    .on("error", function(err) {
      gutil.log(err.message)
      browserSync.notify("Browserify Error!")
      this.emit("end")
    })
    .pipe(plumber())
    .pipe(exorcist("build/js/bundle.js.map"))
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build/js"))
    .pipe(
      browserSync.stream({
        once: true
      })
    )
}

gulp.task("bundle", function() {
  return bundle()
})

gulp.task("default", ["serve"])

const buffer = require("vinyl-buffer")
const uglify = require("gulp-uglify")

gulp.task("bundle-prod", function() {
  return browserify("./src/js/app.js")
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .on("error", function(err) {
      gutil.log(err.message)
      this.emit("end")
    })
    .pipe(plumber())
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
})
