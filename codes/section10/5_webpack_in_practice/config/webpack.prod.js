var path = require('path');
var config = require('./webpack.base');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var prodConfig = merge(config, {
    module: {
        rules: [{
            // stylesheet
            test: /\.(c|sc|sa)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: false
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }
            ]
        }, ]
    },
    plugins: [
        // extract css file
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin({}),
            new UglifyJsWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    }
});
module.exports = prodConfig;