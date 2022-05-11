const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: './src/assets/js/main.js',
    },
    output: {
        clean: true,
        /* 打包js到assets/js/目录 */
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
        /* 打包image到assets/images/目录 */
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            /* 打包css到assets/css/目录 */
            filename: 'assets/css/[name].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                /* 使html-webpack-plugin的template能处理asset/resource类型 */
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    devServer: {
        compress: true,
        static: './dist',
        port: 8080,
        watchFiles: {
            paths: ['src/**/*', 'dist/**/*']
        }
    }
}