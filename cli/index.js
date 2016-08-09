console.log(process.argv.slice(2));
console.log('process.env.npm_config_frontend', process.env.npm_config_frontend);
console.log('process.env.npm_package_config_frontend', process.env.npm_package_config_frontend);
const environment = process.env.npm_config_frontend || process.argv[2] || process.env.npm_package_config_frontend;
console.log('environment', environment);
