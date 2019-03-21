var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsWebpackPlugin =require('optimize-css-assets-webpack-plugin');
var config = {
    // 入口
    entry: {
        main: './src/index'
    },
    // 出口
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: './assets/'
    },
    // module
    module: {
        rules: [
            // .css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // .vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 图片的支持
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    // plugins
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new VueLoaderPlugin()
    ],
    // optimization
    // optimization: {
    //     minimizer: [
    //         new UglifyJsWebpackPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true
    //         }),
    //         new OptimizeCssAssetsWebpackPlugin({})
    //     ]
    // }
}

module.exports = config

// ES5 中的语法
// module.exports = config;