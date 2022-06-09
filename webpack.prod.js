const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'common',
            runtime: false
        },
        common: 'bootstrap'
    },
    output: {
        clean: true,
        /* 打包js到assets/js/目录 */
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
        
        
    },
    optimization: {
        runtimeChunk: 'single',
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            /* 打包css到assets/css/目录 */
            filename: 'assets/css/[name].css',
            chunkFilename: '[id].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]', /* 打包image到assets/images/目录 */
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                generator: {
                    filename: 'assets/css/[hash][ext][query]', /* 打包image到assets/images/目录 */
                }
            },
            {
                /* 使html-webpack-plugin的template能处理asset/resource类型 */
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    }
}