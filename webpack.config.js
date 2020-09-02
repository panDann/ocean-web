const path = require('path')

const resolve = require('./config/webpack/resolves')
const plugins = require('./config/webpack/plugins')
const rules = require('./config/webpack/rules')
module.exports = {
    devtool: 'none',
    entry: {
        'bundle': './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules
    },
    resolve,
    plugins

}