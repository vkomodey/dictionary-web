'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        './main',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        'babel-polyfill',
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /.jsx$/,
                exclude: /node_modules*/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        ],
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
