import util from 'util';
import registry from 'undertaker-registry';
import defaultsDeep from 'lodash.defaultsdeep';
import clean from './src/tasks/clean';
import style from './src/tasks/style';
import copy from './src/tasks/copy';
import images from './src/tasks/images';
import server from './src/tasks/server';
import template from './src/tasks/template';
import settings from './src/config/settings';

const registries = [
	clean,
	style,
	copy,
	template,
	images,
	server
];

function registryCore(config) {
	this.config = {};
	defaultsDeep(this.config, config, settings);
	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;

		registries.forEach(Registry => {
			gulp.registry(new Registry(this.config));
		}, this);

		gulp.task('build', gulp.series('clean', gulp.parallel(
			'style',
			'template',
			'images'
		)));

		gulp.task('build:dev', gulp.series('clean', gulp.parallel(
			'style',
			'template:dev',
			'images'
		)));

		gulp.task('serve', gulp.series(
			'build:dev',
			'server',
			this.watchServe
		));

		gulp.task('watch', gulp.series(
			this.watch
		));

		gulp.task('default', gulp.series('build'));
	};

	this.watchServe = () => {
		const {config, gulp} = this;
		const {paths} = config;

		gulp.watch(paths.styles.watch, gulp.series('style', 'reload'));
		gulp.watch([...paths.templates.srcCore, ...paths.templates.src], gulp.series('template:dev', 'reload'));
		gulp.watch(paths.images.src, gulp.series('images', 'reload'));
	};

	this.watch = () => {
		const {config, gulp} = this;
		const {paths} = config;

		gulp.watch(paths.styles.watch, gulp.series('style'));
		gulp.watch([...paths.templates.srcCore, ...paths.templates.src], gulp.series('template'));
		gulp.watch(paths.images.src, gulp.series('images'));
	};
}

util.inherits(registryCore, registry);

export default registryCore;
