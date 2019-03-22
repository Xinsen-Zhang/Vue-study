var config = require('./webpack.base.config');
var merge = require('webpack-merge');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

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
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
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