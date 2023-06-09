// Импорт основного модуля
import gulp from "gulp";

// Импорт общих плагинов
import { plugins } from "./config/gulp-plugins.js";

// Импорт путей
import { path } from "./config/gulp-settings.js";

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  isWebP: !process.argv.includes("--nowebp"),
  isFontsReW: process.argv.includes("--rewrite"),
  gulp: gulp,
  path: path,
  plugins: plugins,
};

// Импорт задач
import { reset } from "./config/gulp-tasks/tasks-reset.js";
import { html } from "./config/gulp-tasks/tasks-html.js";
import { css } from "./config/gulp-tasks/tasks-css.js";
import { js } from "./config/gulp-tasks/tasks-js.js";
import { jsp } from "./config/gulp-tasks/tasks-js-p.js";
import { images } from "./config/gulp-tasks/tasks-images.js";
import { ftp } from "./config/gulp-tasks/tasks-ftp.js";
import { zip } from "./config/gulp-tasks/tasks-zip.js";
import { sprite } from "./config/gulp-tasks/tasks-sprite.js";
import { gitignore } from "./config/gulp-tasks/tasks-gitignore.js";
// import { videos } from "./config/gulp-tasks/tasks-videos.js";
import { githubPages } from "./config/gulp-tasks/tasks-github.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./config/gulp-tasks/tasks-fonts.js";


// Последовательная обработка шрифтов
const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fontsStyle);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const devTasks = gulp.parallel(fonts, sprite, gitignore);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const buildTasks = gulp.series(fonts, js, gulp.parallel(html, css, images, sprite, gitignore, githubPages), jsp);

// Экспорт задач
export { html };
export { css };
export { js };
export { images };
export { fonts };
export { sprite };
export { ftp };
export { zip };
// export { videos };
export { githubPages };

// Построение сценариев выполнения задач
const development = gulp.series(devTasks);
const build = gulp.series(buildTasks);
const deployFTP = gulp.series(buildTasks, ftp);
const deployZIP = gulp.series(buildTasks, zip);

// Экспорт сценариев
export { development };
export { build };
export { deployFTP };
export { deployZIP };

// Выполнение сценария по умолчанию
gulp.task("default", development);
