const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Задача для отслеживания изменений в папке dist
gulp.task('watch:dist', () => {
  return gulp.watch('dist/**/*').on('change', browserSync.reload);
});

// Задача для отслеживания изменений в папке src
gulp.task('watch:src', () => {
  return gulp.watch('src/**/*').on('change', browserSync.reload);
});

// Задача для отслеживания изменений при запуске браузера
gulp.task('watch:browser', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    port: 3000,
  });

  gulp.watch('dist/**/*').on('change', browserSync.reload);
});

// Задача по умолчанию, которая запускает все задачи watch
gulp.task('watch', gulp.parallel('watch:dist', 'watch:src', 'watch:browser'));
module.exports = {
  watch
};