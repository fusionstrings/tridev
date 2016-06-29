const src = 'src';
const dest = 'dist';
const temp = '.tmp';

const settings = {
	paths: {
		src,
		dest,
		styles: {
			src: [`${src}/scss/styles.scss`],
			watch: [`${src}/scss/**/*.scss`],
			dest: `${dest}/styles/`,
			temp: `${temp}/styles/`
		},
		scripts: {
			src: `${src}/scripts/**/*.js`,
			dest: `${dest}/scripts/`,
			temp: `${temp}/scripts/`
		},
		package: {
			src: 'package.json',
			dest
		}

	}
};

export default settings;
