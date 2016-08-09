import path from 'path';
import util from 'util';
import registry from 'undertaker-registry';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const imageminConfig = {interlaced: true, progressive: true};

function images(config = {}) {
	const {paths: {images, root}} = config;
	const pkgName = require(path.join(root, 'package.json')).name;

	if (!images || !images.src) {
		throw new Error(`Images Registry ${pkgName}: path not defined`);
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
		.pipe($.size({title: `Copied external images to ${pkgName}`}))
		.pipe(dest(images.dest));
	};

	this.imagesCore.displayName = `Copy external images to ${pkgName}`;

	this.images = () => {
		const {gulp: {src, dest}} = this;

		return src(images.src)
		.pipe($.imagemin(imageminConfig))
		.pipe($.size({title: `Optimized and copied source images of ${pkgName}`}))
		.pipe(dest(images.dest));
	};
	this.images.displayName = `Optimize and copy source images of ${pkgName}`;
}

util.inherits(images, registry);
export default images;
