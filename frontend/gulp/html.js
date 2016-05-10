'use strict';

const gulp = require('gulp'),
    buildDir = 'target/dist',
    htmlPattern = 'app/index.html';

function fileContents(filePath, file) {
    return file.contents.toString('utf-8');
}

gulp.task('html', function() {
    const html = gulp.src(htmlPattern);

    return html.pipe(gulp.dest(buildDir));
});
