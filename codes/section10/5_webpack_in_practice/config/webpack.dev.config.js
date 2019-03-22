var config = require('./webpack.base.config');
var merge = require('webpack-merge');


module.exports = merge(config, {
    module:{
        rules: [
            {
                // css
                test: /\.css$/,
                use: [
                    'style-loader', // 样式的注入
                    {loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }} // css 样式的识别
                ]
            }
            
        ]
    }
})