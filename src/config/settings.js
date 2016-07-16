const root = './../..';
const src = 'src';
const dest = 'dist';
const temp = '.tmp';

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
			temp: `${temp}/styles/`
		},
		scripts: {
			src: [`${src}/scripts/**/*.js`],
			dest: `${dest}/scripts/`,
			temp: `${temp}/scripts/`
		},
		templates: {
			srcCore: '',
			src: [`${src}/templates/**/*`],
			dest: `${dest}/templates/`,
			temp: `${temp}/templates/`,
			data: {}
		},
		images: {
			srcCore: ``,
			src: `${src}/images/**/*.{png,jpg,jpeg,gif,svg}`,
			dest: `${dest}/images/`
		}
	}
};

export default settings;
