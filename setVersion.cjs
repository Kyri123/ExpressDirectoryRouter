const fs = require('fs');
const Package = require('./package.json');
const semver = require('semver');

Package.version = semver.inc(Package.version, 'patch');

fs.writeFileSync('package.json', JSON.stringify(Package, null, 4));
