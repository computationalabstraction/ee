const fs = require("fs");
const gzip = require('zlib').createGzip();
const babel = require("@babel/core");
const util = require('util');

const transform = util.promisify(babel.transformFile);

// Dist Gen
transform(`${__dirname}/src/ee.js`,{"presets":["minify"],"comments":false})
.then(result => {
    fs.writeFileSync(`${__dirname}/dist/ee.min.js`,result.code);
    fs.createReadStream(`${__dirname}/dist/ee.min.js`)
    .pipe(gzip)
    .pipe(fs.createWriteStream(`${__dirname}/dist/ee.min.js.gz`));
});