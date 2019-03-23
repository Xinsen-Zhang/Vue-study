var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

var config = {
    // mode
    mode: process.env.NODE_ENV,
    // in
    entry: path.resolve(__dirname, '../src/index.js'),
    // out
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isProd ? 'index.[hash].js' : 'index.js'
    },
    module: {
        rules: [{
                // image
                test: /\.(gif|png|jpe?g|svg)/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // Specifies an alternative loader to use when a target file's size exceeds the limit set in the limit option.
                        limit: 10240,
                        fallback: 'file-loader'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                }]
            },
            {
                // font
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: 'file-loader'
                    }
                }
            },
            {
                // js
                test: /\.js$/,
                // loader: 'babel-loader',
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        // generate a html file with link:css and scrpt:src
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            title: 'html-webpack-plugin 的使用',
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
                removeAttributeQuotes: isProd
            }
        }),
        // clean files
        new CleanWebpackPlugin()
    ]
};

if (isProd) {
    config.devtool = 'inline-source-map';
}

module.exports = config;