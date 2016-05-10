'use strict';

/* eslint-env node */

const path = require("path"),
    webpack = require('webpack');

module.exports = {
    // This is the main file that should include all other JS files
    entry: './app/main',
    target: "web",
    cache: true,
    output: {
        path: path.join(__dirname, "/target/dist"),
        // If you want to generate a filename with a hash of the content (for cache-busting)
        // filename: "main-[hash].js",
        filename: "bundle.js",
        chunkFilename: "webpack.[hash].js"
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: "eslint-loader",
            exclude: /node_modules|gulp|dist|vendor/
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            include: [path.join(__dirname, 'app')]
        }],
        noParse: /\.min\.js/
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        //don't include alternative moment.js locales
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new webpack.DefinePlugin({
            API_ENTRY_URI: JSON.stringify(
                    process.env.API_ENTRY_URI || 'http://localhost:8080/')
        })
    ],
    eslint: {
        configFile: './.eslintrc'
    },
    devtool: 'source-map'
};
