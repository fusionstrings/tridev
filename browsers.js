
const browserslist = require('browserslist');

const validBrowserslistTargets = [
	...Object.keys(browserslist.data),
	//...Object.keys(browserslist.aliases),
  ]
console.log(browserslist());
