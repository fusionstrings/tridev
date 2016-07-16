import util from 'util';
import registry from 'undertaker-registry';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const imageminConfig = {interlaced: true, progressive: true};

function images(config = {}) {
	const {paths: {images}} = config;

	if (!images || !images.src) {
		throw new Error('Images Registry: path not defined');
	}

	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;
		gulp.task('images', gulp.series(this.imagesCore, this.images));
	};

	this.imagesCore = cb => {
		const {gulp: {src, dest}} = this;

		if (!images.srcCore) {
			cb();
			return;
		}

		return src(images.srcCore)
		.pipe($.imagemin(imageminConfig))
		.pipe($.size({title: 'images'}))
		.pipe(dest(images.dest));
	};

	this.images = () => {
		const {gulp: {src, dest}} = this;

		return src(images.src)
		.pipe($.imagemin(imageminConfig))
		.pipe($.size({title: 'images'}))
		.pipe(dest(images.dest));
	};
}

util.inherits(images, registry);
export default images;
