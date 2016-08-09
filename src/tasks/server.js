import {join} from 'path';
import util from 'util';
import browserSync from 'browser-sync';
import registry from 'undertaker-registry';

function server(config) {
	const {paths} = config;

	// check paths
	if (!paths || !paths.dest || !paths.temp) {
		throw new Error('BrowserSync Server: paths not defined');
	}

	const pkgName = require(join(paths.root, 'package.json')).name;

	const server = browserSync.create(pkgName);
	const serverDefaults = {
		server: {
			baseDir: [
				paths.dest,
				paths.temp
			]
		},
		logPrefix: pkgName
	};

	const serverOptions = (config.options || {}).server || {};
	const serverConfig = Object.assign({}, serverDefaults, serverOptions);

	registry.call(this);

	this.init = gulp => {
		this.gulp = gulp;
		gulp.task('server', this.server);
		gulp.task('reload', this.reload);
	};
	/**
	 * reloads the application
	 */
	this.reload = cb => {
		server.reload();
		cb();
	};

	/**
	* serves the application
	*/
	this.server = cb => {
		server.init(serverConfig);
		cb();
	};
}

util.inherits(server, registry);

export default server;
