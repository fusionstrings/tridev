import util from 'util';
import registry from 'undertaker-registry';

function registryCore(params = {buildDir: './build'}) {
	registry.call(this);
	console.log(this);
}

registryCore();