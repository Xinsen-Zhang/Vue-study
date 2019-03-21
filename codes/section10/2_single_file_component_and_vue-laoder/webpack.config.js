var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
                        css: MiniCssExtractPlugin.loader
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
                loader: MiniCssExtractPlugin.loader
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ]
}

module.exports = config