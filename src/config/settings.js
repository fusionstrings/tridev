const root = './../..';
const src = 'src';
const dest = 'dist';
const altDest = 'alt-dist';
const temp = '.tmp';
const staticBuildDest = 'static';

const settings = {
	paths: {
		root,
		src,
		dest,
		temp,
		styles: {
			src: [`${src}/scss/styles.scss`],
			watch: [`${src}/scss/**/*.scss`],
			dest: `${dest}/styles/`,
			temp: `${temp}/styles/`,
			altDest: `${altDest}/styles/`
		},
		scripts: {
			src: [`${src}/scripts/**/*.js`],
			dest: `${dest}/scripts/`,
			temp: `${temp}/scripts/`,
			altDest: `${altDest}/scripts/`
		},
		templates: {
			srcCore: '',
			src: [`${src}/templates/**/*`],
			dest: `${dest}/templates/`,
			temp: `${temp}/templates/`,
			staticBuildSrc: [`${dest}/**/*.mustache`],
			staticBuildDest,
			altDest: `${altDest}/templates/`, // alternate destination for dist.
			path: '', // path of assets may be during development. Generally it'll be replaced by publicPath during build.
			publicPath: '', // path to be used during build.
			data: {}
		},
		images: {
			srcCore: ``,
			src: `${src}/images/**/*.{png,jpg,jpeg,gif,svg}`,
			dest: `${dest}/images/`,
			altDest: `${altDest}/images/`
		}
	}
};

export default settings;
