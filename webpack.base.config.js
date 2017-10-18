const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 根据相对路径获取绝对路径
 * @param {string} dir 传入相对路径 
 * @return {string} 返回绝对路径
 */
function resolve (dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = {
    entry: {
        main: './src/main',
        vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader'
                ],
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            },
            // 代码检查
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /assets/,
                    /vendors\.js/
                ],
                loader: "eslint-loader"
            },
            {
                enforce: "pre",
                test: /\.(c|le)ss$/,
                exclude: [
                    /node_modules/,
                    /assets/,
                    /iconfont/
                ],
                loader: "stylelint-loader",
                options: {
                    failOnError: true,
                    severity: "error"
                }
            },
            {
                test: /\.vue$/,
                enforce: 'pre', // 在babel-loader对源码进行编译前进行lint的检查
                include: /src/, // src文件夹下的文件需要被lint
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                        eslintConfig: path.join(__dirname, ".eslintrc.json")
                    }
                }],
                exclude: /node_modules/ //可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    }
};
