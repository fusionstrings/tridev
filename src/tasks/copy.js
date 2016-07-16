import util from 'util';
import registry from 'undertaker-registry';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

function copy(config) {
	const {paths} = config;

	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;
		gulp.task('copy', this.copy);
	};

	this.copy = () => {
		const {gulp: {src, dest}} = this;

		return src(paths.copy().src, {base: '.'})
		.pipe($.size({title: 'copied'}))
		.pipe(dest(config.paths.dest));
	};
}

util.inherits(copy, registry);

export default copy;
