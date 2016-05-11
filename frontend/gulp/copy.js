'use strict';

const gulp = require('gulp'),
    buildDir = 'target/dist',
    htmlPattern = 'app/index.html',
    cssPattern = 'app/style.css';

gulp.task('copy', function() {
    const html = gulp.src([htmlPattern, cssPattern]);

    return html.pipe(gulp.dest(buildDir));
});
