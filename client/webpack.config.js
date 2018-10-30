'use strict';

let path = require('path');
let webpack = require('webpack');

let isDev = process.env.NODE_ENV === 'development';

let config = {
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
                {loader: 'resolve-url-loader'},
                {
                    loader: "sass-loader",
                    options: {
                        outputStyle: 'expanded',
                        data: '@import \'src/assets/styles/theme.scss\';',
                    }
                }
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
        extensions: ['.js', '.jsx', '.scss']
    },
    devtool: 'source-map',
};


if (isDev) {
    // consfigure ESLint
    config.module.rules.push({
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
            'babel-loader',
            'eslint-loader',
        ],
    });
}

module.exports = config;
