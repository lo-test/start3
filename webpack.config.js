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
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://127.0.0.1:8080/',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename:  path.resolve(__dirname, 'dist/index.html'),
            template: './src/pages/index.html'
        }),
        new MiniCssExtractPlugin({
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
        ]
    },
    devServer: {
        compress: true,
        static: './dist',
        port: 8080,
    }
}