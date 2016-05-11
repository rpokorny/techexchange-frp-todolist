'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    buildDir = 'target/dist',
    htmlPattern = 'app/index.html',
    cssPattern = 'app/style.css',
    toggleCss = 'node_modules/react-toggle/style.css';

gulp.task('copy-3rd-party-resources', function() {
    return gulp.src(toggleCss)
        .pipe(rename('toggle.css'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('copy', ['copy-3rd-party-resources'], function() {
    const html = gulp.src([htmlPattern, cssPattern]);

    return html.pipe(gulp.dest(buildDir));
});
