const Html = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const proPlugins = []
if(process.env.NODE_ENV === 'production'){
    proPlugins = [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                  
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                  },
                  output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                  },
                mangle: true,
            }
            
        })
    ]
}
module.exports=  [
    new Html({
        template: './index.html',
        filename: 'index.html'
    }),
    ...proPlugins
]