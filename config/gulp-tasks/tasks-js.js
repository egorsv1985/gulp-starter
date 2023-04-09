// Загружаем модуль webpack-stream
import webpack from "webpack-stream";
// Импортируем конфигурационный файл для webpack.prod.js
import webPackConfig from '../webpack.prod.js';

// Экспортируем функцию js
export const js = () => {
// Загружаем исходные файлы JS из app.path.src.js
return app.gulp.src(app.path.src.js)
// Используем плагин plumber для обработки ошибок
.pipe(app.plugins.plumber(
app.plugins.notify.onError({
title: "JS",
message: "Error: <%= error.message %>"
}))
)
// Запускаем Webpack с конфигурационным файлом для production mode
.pipe(webpack({
config: webPackConfig
}))
// Копируем скомпилированные файлы JS в папку назначения app.path.build.js
.pipe(app.gulp.dest(app.path.build.js));
}