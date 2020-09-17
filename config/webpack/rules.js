
const path = require('path')
const _pathResolve = (p)=>path.resolve(__dirname,p)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const proRules = []
if(process.env.NODE_ENV === 'production'){
    proRules = [MiniCssExtractPlugin.loader]
}
module.exports=  [
    {
        test: /\.(tsx|ts)?$/,
        loader:'awesome-typescript-loader',
        exclude:_pathResolve('node_modules'),

    },
    {
        test: /\.styl?$/,
        use: [
            'style-loader',
            ...proRules,
            'css-loader',
            'stylus-loader',
            {
                loader: 'style-resources-loader',
                options: {
                    patterns: [_pathResolve( '../../src/styles/variables.styl')]
                }
            }
        ],
        exclude:_pathResolve('node_modules'),
    },
 
    {
        test:/\.(png|jpg)$/,
        use:{
            loader:'file-loader',
            options:{
                publicPath:'../assets',
                outputPath:'./assets/',
            }
        },
        exclude:_pathResolve('node_modules'),
    },
]