import path from 'path';
import util from 'util';
import browserSync from 'browser-sync';
import registry from 'undertaker-registry';

function server(config) {
	const {paths} = config;
	const pkg = require(path.join(__dirname, paths.root, 'package.json'));

	const server = browserSync.create();
	const serverDefaults = {
		server: {
			baseDir: [
				paths.dest,
				paths.temp
			]
		},
		logPrefix: pkg.name
	};

	const serverOptions = (config.options || {}).server || {};
	const serverConfig = Object.assign({}, serverDefaults, serverOptions);

	// check paths
	if (!paths || !paths.dest || !paths.temp) {
		throw new Error('BrowserSync Server: paths not defined');
	}

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
	this.server = () => {
		server.init(serverConfig);
	};
}

util.inherits(server, registry);

export default server;
