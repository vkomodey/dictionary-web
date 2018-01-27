'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        './main',
        'babel-polyfill',
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules*/,
            use: [
                {
                    loader: 'babel-loader',
                    options: { cacheDirectory: true},
                },
            ],
        }, {
            test: /\.scss$/,
            use: [
                {loader: "style-loader"},
                {loader: "css-loader" },
                {loader: "sass-loader"}
            ]
        }, {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
            ],
        }, {
            test: /\.(jpg|png|svg|woff2?|ttf|eot|otf)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
            },
        }],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        extensions: ['.js', '.jsx', '.css']
    },
    devtool: 'source-map',
};
