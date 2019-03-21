var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

// vueLoaderPlugin 的导入
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 入口的配置
    entry: path.join(__dirname, './src/index.js'),
    // 出口的配置
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    // module的 rules 配置(文件加载的设置)
    module: {
        rules: [
            // 使用对象的形式对不同类型的文件的加载方式进行配置
            // .vue 文件的配置
            {
                // 正则表达式来检验文件是否使用此类配置
                test: /\.vue$/,
                // loader的配置
                loader: 'vue-loader'
            },
            // .css 文件的配置
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader']
            }
        ]
    },
    // plugins 的配置
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new VueLoaderPlugin()
    ]
}