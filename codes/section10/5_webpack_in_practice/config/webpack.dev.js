var config = require('./webpack.base');
var merge = require('webpack-merge');

module.exports = merge(config, {
    module:{
        rules: [
            {
                // css
                test: /\.(c|sc|sa)ss$/,
                use: [
                    'style-loader', // 样式的注入
                    {loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }},
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            
        ]
    }
})