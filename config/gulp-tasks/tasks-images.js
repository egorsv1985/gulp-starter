import webp from "gulp-webp"; // плагин для конвертирования изображений в формат WebP
import imagemin from "gulp-imagemin"; // плагин для оптимизации изображений

export const images = () => {
  const imagePipeline = app.gulp.src(app.path.src.images) // получаем исходные изображения
    .pipe(app.plugins.plumber( // отлавливаем ошибки
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(app.plugins.newer(app.path.build.images)); // фильтруем только новые изображения

  if (app.isWebP) { // если нужно создать версии изображений в формате WebP
    imagePipeline.pipe(webp()) // конвертируем в формат WebP
      .pipe(app.gulp.dest(app.path.build.images)) // сохраняем в папку с собранными изображениями
      .pipe(app.gulp.src(app.path.src.images)) // получаем исходные изображения снова
      .pipe(app.plugins.newer(app.path.build.images)); // фильтруем только новые изображения
  }

  return imagePipeline.pipe(imagemin({ // оптимизируем все изображения
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    }))
    .pipe(app.gulp.dest(app.path.build.images)) // сохраняем в папку с собранными изображениями
    .pipe(app.gulp.src(app.path.src.svg)) // получаем все SVG файлы
    .pipe(app.gulp.dest(app.path.build.images)); // сохраняем их в папку с собранными изображениями
}
