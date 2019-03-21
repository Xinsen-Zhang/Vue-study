// 引入需要的 packages
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config');
var VueLoaderPlugin = require('vue-loader/lib/plugin');


// 清空基本配置的插件列表
webpackBaseConfig.plugins = [];

// 暴露对象
module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/assets/',
        // 将入口文件重命名为带有20位 hash 值的唯一文件
        filename: '[name].[hash].js'
    },
    plugins: [
        // 定义当前 node.js 的环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // vue-loader-plugin
        new VueLoaderPlugin(),
        // css file
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // 压缩 js
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // 提取模板的 plugin
        new HtmlWebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ]
})