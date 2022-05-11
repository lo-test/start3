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
        publicPath: 'auto',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
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
            {
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