import util from 'util';
import del from 'del';
import registry from 'undertaker-registry';

function clean(config = {}) {
	const {dist} = config;

	registry.call(this);

	this.init = taker => {
		this.taker = taker;
		taker.task('clean', this.clean);
	};

	this.clean = () => {
		return del([dist]);
	};
}

util.inherits(clean, registry);
export default clean;
