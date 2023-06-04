const gulp = require('gulp');
const { eslint, htmlhint } = require('../common/plugins');

function lintHtml() {
  return gulp
    .src('src/html/**/*.html')
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failAfterError());
}

function lintJs() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

const html = gulp.series(lintHtml, lintJs);

module.exports = html;
