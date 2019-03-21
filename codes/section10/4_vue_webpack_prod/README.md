# webpack4 + vue 用于生产环境
## 图片, 文字等的支持
1. 安装`url-loader`, `file-loader`
__`npm install --save-dev url-laoder file-loader`__
2. 配置 webpack.config.js
```javascript
{
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader?limit=1024'
}
```
* 当遇到.gif,.png,.ttf 等格式的文件的时候,`url-loader`会将文件编译到 `./dist/` 目录下
* 如果图片大小小于1024b, 就会以 `base64` 的形式加载, 不会生成一个文件.

## 打包
### 安装必要的包
`cnpm install --save-dev webpack-merge html-webpack-plugin`
### 生产环境的配置
1. 新建配置文件
   * `touch ./config/webpack.prod.config.js`
2. 配置文件