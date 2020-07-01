const nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: ABSPATH + '/config.json' });

module.exports = nconf;