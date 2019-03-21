var path = require('path')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var config = {
    // 入口的设置
    entry: {
        // 入口的 js 文件路径
        main: './main'
    },
    // 出口的设置
    output: {
        // 输出的保存路径
        path: path.join(__dirname, './dist'),
        // 静态资源的路径, 可以是 url
        publicPath: '/dist/',
        // 输出的文件名称
        filename: 'main.js'
    },
    // module 的配置
    module: {
        // 规则的配置
        rules: [
            // CSS
            {
                // 正则表达式来确定文件. require 和 import
                test: /\.css$/,
                // loader 的使用, 字符串或者数组. 数组从后往前
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            }
        ]
    },
    // 插件配置
    plugins: [
        // new ExtractTextPlugin("main.js")
        new MiniCssExtractPlugin({
            filename: 'main.css',
        })
    ]
}
module.exports = config