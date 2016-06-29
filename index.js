import util from 'util';
import registry from 'undertaker-registry';
import defaultsDeep from 'lodash.defaultsdeep';
import clean from './src/tasks/clean';
import settings from './src/config/settings';

const registries = [
	clean
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

		gulp.task('clean', gulp.series(
			'clean'
		));
	};
}

util.inherits(registryCore, registry);

export default registryCore;
