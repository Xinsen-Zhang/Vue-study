var path = require('path');
var config = require('./webpack.base.config');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var CleanWebpackPlugin = require('clean-webpack-plugin');

config.output.filename = 'index.[hash].js';

module.exports = merge(config, {
    mode: 'production',
    module:{rules:[
        {
            test: /\.(c|sc|sa)ss$/,
            use:[
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options:{sourceMap: true}
                },
                {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }
            ]
        }
    ]},
    plugins:[
        // extract css file
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        // generate a html file with link:css and scrpt:src
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            title: 'html-webpack-plugin 的使用',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        // clean files
        new CleanWebpackPlugin()
    ],
    optimization:{minimizer:[
        new OptimizeCssAssetsWebpackPlugin({}),
        new UglifyJsWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        })
    ]}
});