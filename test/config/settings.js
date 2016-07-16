import dataCore from './../src-core/fixtures/data.json';
import dataSrc from './../src/fixtures/data.json';

const data = {
	...dataCore,
	...dataSrc
};

const src = 'src';
const dest = 'dist';

const settings = {
	paths: {
		dest,
		root: './../../test',
		styles: {
			src: [`${src}/scss/style.scss`],
			dest: `${dest}/styles/`
		},
		templates: {
			srcCore: ['src-core/templates/**/*.mustache'],
			src: [`${src}/templates/**/*.mustache`],
			dest: `${dest}/templates/`,
			data
		},
		images: {
			srcCore: [`src-core/images/**/*.{png,jpg,jpeg,gif,svg}`],
			src: [`${src}/images/**/*.{png,jpg,jpeg,gif,svg}`],
			dest: `${dest}/images/`
		}
	}
};

export default settings;
