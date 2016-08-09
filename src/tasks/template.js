import {join} from 'path';
import util from 'util';
import registry from 'undertaker-registry';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const templateConfig = {
	extension: '.html'
};

function template(config) {
	const {paths: {templates, root}} = config;

	const pkgName = require(join(root, 'package.json')).name;

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
		.pipe($.size({title: `Copy external templates for ${pkgName}`}))
		.pipe(dest(templates.dest));
	};

	this.templateCopy.displayName = `Copy external templates for ${pkgName}`;

	this.templateOverwrite = () => {
		const {gulp: {src, dest}} = this;

		return src(templates.src)
		.pipe($.size({title: `Copy source templates of ${pkgName}`}))
		.pipe(dest(templates.dest));
	};

	this.templateOverwrite.displayName = `Copy source templates of ${pkgName}`;

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
			console.info(`No source specified. Nothing to build!: ${pkgName}`);
			cb();
			return;
		}

		return src(templates.staticBuildSrc, {base: templates.dest})
		.pipe($.mustache(templates.data, templateConfig))
		.pipe($.size({title: `Static templates: ${pkgName}`}))
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
		.pipe($.size({title: `templates alt destination ${pkgName}`}))
		.pipe(dest(templates.altDest));
	};
}

util.inherits(template, registry);

export default template;
