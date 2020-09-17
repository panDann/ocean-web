const path = require('path')

const resolve = require('./config/webpack/resolves')
const plugins = require('./config/webpack/plugins')
const rules = require('./config/webpack/rules')
module.exports = {
    devtool: 'none',
    entry: {
        'bundle': './src/index.tsx',
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
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