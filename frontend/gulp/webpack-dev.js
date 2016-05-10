'use strict';

const gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require("webpack"),
    webpackConfig = require("../webpack.config.js"),
    WebpackDevServer = require('webpack-dev-server');

gulp.task('webpack-dev', ['html'], function () {
    const devConfig = Object.assign({}, webpackConfig, {
            debug: true
        }),

        // Start a webpack-dev-server
        server = new WebpackDevServer(webpack(devConfig), {
            publicPath: '/target/dist',
            stats: {
                colors: true
            }
        });

    server.listen(8000, "0.0.0.0", function (err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8000/webpack-dev-server/target/dist");
    });
});
