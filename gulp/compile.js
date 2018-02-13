const gulp = require('gulp'),
	nunjucks = require('nunjucks'),
	gulpnunjucks = require('gulp-nunjucks'),
	markdown = require('nunjucks-markdown'),
	marked = require('marked'),
	fs = require('fs'),
	templatesDir = 'src',	
	env = nunjucks.configure(templatesDir,{ watch: true, noCache : true });

markdown.register(env, marked);
	 
gulp.task('render', () => {

	const pages = JSON.parse( fs.readFileSync('./api/pages.json', { encoding: 'utf8' })),
		data = pages[0]; // for this project we only have one page, index.html

	gulp.src([templatesDir + '/index.html'])
        .pipe(gulpnunjucks.compile( data , { env : env }))
		.pipe(gulp.dest('build'))		
});

