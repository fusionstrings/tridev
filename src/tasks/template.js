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
		gulp.task('template:dev', gulp.series('template', gulp.parallel(this.buildMustacheStatic, this.buildMustacheAlt)));
		gulp.task('template:dev:alt', gulp.series('template', this.buildMustacheAlt));
		gulp.task('template:dev:static', gulp.series('template', this.buildMustacheStatic));
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

	this.useref = () => {
		const {gulp: {src, dest}} = this;

		return src(templates.dest)
		.pipe($.useref())
		.pipe($.size({title: 'Applied useref'}))
		.pipe(dest(templates.dest));
	};

	this.buildMustacheStatic = cb => {
		const {gulp: {src, dest}} = this;

		if (!templates.staticBuildSrc) {
			console.info('No source specified. Nothing to build!');
			cb();
			return;
		}

		return src(templates.staticBuildSrc, {base: templates.dest})
		.pipe($.mustache(templates.data, templateConfig))
		.pipe($.size({title: 'Static templates'}))
		.pipe(dest(templates.temp));
	};

	this.buildMustacheAlt = cb => {
		const {gulp: {src, dest}} = this;

		if (!templates.altDest) {
			console.info('No alternate destination specified. skipping!');
			cb();
			return;
		}

		return src(`${templates.dest}/**/*`)
		.pipe($.replace(templates.path, templates.publicPath))
		.pipe($.size({title: 'templates alt destination'}))
		.pipe(dest(templates.altDest));
	};
}

util.inherits(template, registry);

export default template;
