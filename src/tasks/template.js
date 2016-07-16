import util from 'util';
import registry from 'undertaker-registry';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const templateConfig = {
	extension: '.html'
};

function template(config) {
	const {paths: {templates}} = config;

	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;
		gulp.task('template', gulp.series(this.templateCopy, this.templateOverwrite));
		gulp.task('template:dev', gulp.series('template', this.buildMustache));
	};

	this.templateCopy = cb => {
		const {gulp: {src, dest}} = this;

		if (!templates.srcCore) {
			cb();
			return;
		}

		return src(templates.srcCore)
		.pipe($.size({title: 'templates'}))
		.pipe(dest(templates.dest));
	};

	this.templateOverwrite = () => {
		const {gulp: {src, dest}} = this;

		return src(templates.src)
		.pipe($.size({title: 'templates overwrite'}))
		.pipe(dest(templates.dest));
	};

	this.buildMustache = () => {
		const {gulp: {src, dest}} = this;

		return src(`${templates.dest}**/*.mustache`)
		.pipe($.mustache(templates.data, templateConfig))
		.pipe(dest(templates.temp));
	};
}

util.inherits(template, registry);

export default template;
