var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('src/fonts/*.ttf')
    .dest('build/fonts');

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});