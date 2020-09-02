
const path = require('path')
module.exports=  [
    {
        test: /\.(tsx|ts)?$/,
        use: [
            // {
            //     loader: 'babel-loader',
            // },
            'awesome-typescript-loader',
        ]
    },
    {
        test: /\.styl?$/,
        // use: ExtractText.extract({
        //     fallback: {
        //         loader: 'style-loader',  // 可以把css放在页面上
        //         options: {
        //             singleton: true, // 使用一个style标签
        //             transform: './css.transform.js' // transform 是css的变形函数,相对于webpack.config的路径
        //         }
        //     },
        //     // 继续处理的loader
        //     use: [
        //         {
        //             loader: 'css-loader',   // 放在后面的先被解析
        //             options: {
        //                 minimize: true,
        //                 modules: true,
        //                 localIdentName: '[path][name]_[local]_[hash:base64:5]'
        //             }
        //         },
        //         {
        //             loader: 'stylus-loader'
        //         },
        //         {
        //             loader: 'style-resources-loader',
        //             options: {
        //                 patterns: [path.resolve(__dirname, './src/styles/variables.styl')]
        //             }
        //         }
        //     ]
        // })
        use: [
            'style-loader',
            'css-loader',
            // {
            //     loader: 'css-loader',
            //     options: {
            //       modules: true, //引入模块
            //     }
            //   },
            'stylus-loader',
            {
                loader: 'style-resources-loader',
                options: {
                    patterns: [path.resolve(__dirname, '../../src/styles/variables.styl')]
                }
            }
        ]
    },
    {
        test:/\.(png|jpg)$/,
        use:{
            loader:'url-loader',
            options:{

            }
        }
    },
    // {
    //     test:/\.(json)$/,
    //     use:{
    //         loader:'file-loader',
    //         options:{
                
    //         }
    //     }
    // }
   
]