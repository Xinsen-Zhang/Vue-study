var path = require('path');

var config = {
    // mode
    mode: 'none',
    // in
    entry: path.resolve(__dirname, '../src/index.js'),
    // out
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    }
}

module.exports = config