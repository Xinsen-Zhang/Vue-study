var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader'
                    }
                }
            },
            // js 文件的 loader
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // css 文件的 loader
            {
                test: /\.css$/,
                // loader: MiniCssExtractPlugin.loader
                loader: 'css-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config