
const nunjucks = require('gulp-nunjucks');
const fs = require('fs');

gulp.task('render', () => {

	const pages = JSON.parse( fs.readFileSync('./api/pages.json', { encoding: 'utf8' }));
		homepage = posts[0]; // for this project we only have one page, index.html
		res = nunjucks.render('src/index.html', homepage);

		fs.writeFile('dist/index.html', res);
})l

