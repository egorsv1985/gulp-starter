// Импорт зависимостей
import ghPages from 'gulp-gh-pages';
import { path } from '../gulp-settings.js';
import { zip } from './tasks-zip.js';

// Экспорт задачи
export const githubPages = () => {
// Архивирование файлов перед публикацией на гитхабе
zip();

return app.gulp.src(`${path.rootFolder}/**/*`)
.pipe(ghPages({
remoteUrl: "https://github.com/egorsv1985/gulp-starter.git",
branch: "gh-pages"
}));
};

// remoteUrl - URL репозитория, на который будут загружаться файлы
// branch - название ветки, на которую будут загружаться файлы

// В данном коде используется экспорт задачи zip из файла tasks-zip.js, которая архивирует файлы сборки перед загрузкой на гитхаб. Затем выполняется задача gulp-gh-pages, которая загружает архивированные файлы в указанный репозиторий и ветку.