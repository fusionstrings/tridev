import util from 'util';
import del from 'del';
import registry from 'undertaker-registry';

function clean(config) {
	const {paths: {dest, temp}} = config;

	if (!dest) {
		throw new Error('clean Registry: path not defined');
	}

	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;
		gulp.task('clean', this.clean);
	};

	this.clean = () => {
		return del([dest, temp]);
	};
}

util.inherits(clean, registry);

export default clean;
