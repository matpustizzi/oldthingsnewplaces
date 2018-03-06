const gulp = require("gulp"),
  nunjucks = require("nunjucks"),
  gulpnunjucks = require("gulp-nunjucks"),
  markdown = require("nunjucks-markdown"),
  marked = require("marked"),
  fs = require("fs"),
  templatesDir = "src",
  plumber = require("gulp-plumber"),
  dotenv = require("dotenv").config(),
  env = nunjucks.configure(templatesDir, {
    watch: process.env.dotenv === "development", // if watch is set to true, then gulp task won't exit. build-task will never close if env is not set to prod
    noCache: true
  })

env.addGlobal("getSlides", function(slides) {
  return JSON.stringify(
    slides.map((slide, i) => {
      return slide.fields
    })
  )
})

marked.setOptions({
  breaks: true
})

markdown.register(env, marked)

gulp.task("render", () => {
  const pages = JSON.parse(
      fs.readFileSync("./api/pages.json", {
        encoding: "utf8"
      })
    ),
    data = pages[0] // for this project we only have one page, index.html

  return gulp
    .src([templatesDir + "/index.html"])
    .on("error", function(err) {
      gutil.log(err.message)
      this.emit("end")
    })
    .pipe(plumber())
    .pipe(
      gulpnunjucks.compile(data, {
        env: env
      })
    )
    .pipe(gulp.dest("build"))
})
