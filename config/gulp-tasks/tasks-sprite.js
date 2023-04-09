import svgSprite from "gulp-svg-sprite";

// Создает спрайт из исходных SVG-иконок
export const sprite = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {}) // Исходные файлы SVG-иконок
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`, // Путь к создаваемому спрайту
          example: true // Создавать страницу с перечнем иконок
        }
      },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`)); // Директория для генерируемого спрайта
}
