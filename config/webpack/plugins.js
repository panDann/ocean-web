const Html = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
module.exports=  [
    new Html({
        template: './index.html',
        filename: 'index.html'
    }),
    new ExtractText({
        filename: 'css/[name].css'
    })
]