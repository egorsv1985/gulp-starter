// Импортируем модуль path из Node.js
import * as nodePath from 'path';

// Получаем имя папки проекта
const rootFolder = nodePath.basename(nodePath.resolve());

// Пути к папке с исходниками и папке с результатом
const buildFolder = `./dist`; // Также можно использовать rootFolder
const srcFolder = `./src`;

// Пути к папкам и файлам проекта
export const path = {
build: {
html: `${buildFolder}/`,
js: `${buildFolder}/js/`,
css: `${buildFolder}/css/`,
images: `${buildFolder}/img/`,
fonts: `${buildFolder}/fonts/`,
files: `${buildFolder}/files/`,
videos: `${buildFolder}/videos/`
},
src: {
html: `${srcFolder}/**/*.html`,
pug: `${srcFolder}/pug/*.pug`,
js: `${srcFolder}/js/app.js`,
scss: [`${srcFolder}/scss/style.scss`, `${srcFolder}/scss/fonts.scss`],
images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
svg: `${srcFolder}/img/**/*.svg`,
fonts: `${srcFolder}/fonts/*.*`,
files: `${srcFolder}/files/**/*.*`,
videos: `${srcFolder}/videos/**/*.*`,
svgicons: `${srcFolder}/svgicons/*.svg`,
},
clean: buildFolder,
buildFolder: buildFolder,
rootFolder: rootFolder,
srcFolder: srcFolder,
ftp: `` // Путь к нужной папке на удаленном сервере. gulp добавит имя папки проекта автоматически
};

// Настройка FTP соединения
export const configFTP = {
host: "", // Адрес FTP сервера
user: "", // Имя пользователя
password: "", // Пароль
parallel: 5 // Кол-во одновременных потоков
};