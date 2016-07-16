import util from 'util';
import moduleImporter from 'sass-module-importer';
import registry from 'undertaker-registry';
import autoprefixer from 'autoprefixer';
import doiuse from 'doiuse';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

const sourcemapsConfig = ['./', {}];

const sassConfig = {
	importer: moduleImporter(),
	precision: 10,
	indentType: 'tab',
	indentWidth: 1
};

function style(config = {}) {
	const {paths: {styles}} = config;

	if (!styles) {
		throw new Error('Style Registry: path not defined');
	}

	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;
		gulp.task('style', this.style);
	};

	this.style = () => {
		const {gulp: {src, dest}} = this;

		return src(styles.src)
		.pipe($.newer(styles.temp))
		.pipe($.sourcemaps.init())
		.pipe($.sass(sassConfig).on('error', $.sass.logError))
		.pipe($.postcss([
			// rucksack(),

			autoprefixer({
				browsers: AUTOPREFIXER_BROWSERS
			})

			// doiuse({
			// 	browsers: AUTOPREFIXER_BROWSERS,
			// 	onFeatureUsage(usageInfo) {
			// 		console.info(usageInfo.message);
			// 	}
			// })

			// cssnano()
		]))
		.pipe($.sourcemaps.write(...sourcemapsConfig))
		.pipe($.size({title: 'styles'}))
		.pipe(dest(styles.dest));
	};
}

util.inherits(style, registry);
export default style;
