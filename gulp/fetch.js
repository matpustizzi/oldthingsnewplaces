const gulp = require("gulp"),
  env = require("dotenv").config(),
  gutil = require("gulp-util"),
  fs = require("fs"),
  contentful = require("contentful"),
  stringify = require("json-stringify-safe"),
  opts = {
    space: process.env.space_id,
    accessToken: process.env.api_key,
    host: `${process.env.preview ? "preview" : "cdn"}.contentful.com`
  },
  client = contentful.createClient(opts)

// content type 'page' contains one entry representing th homepage
// page content type has slug 'categoryOrder', this needs fixing
gulp.task("fetch", () => {
  var req = client
    .getEntries({
      content_type: "categoryOrder",
      include: 10
    })
    .then(resp => {
      const data = resp.items.map((item, i) => item.fields)
      fs.writeFileSync("api/pages.json", stringify(data, null, 2))
    })
    .catch(err => {
      gutil.log("Error: " + err.message)
      process.exit(1)
    })

  return req
})
