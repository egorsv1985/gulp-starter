import gulp from 'gulp'; // подключаем Gulp

import { path } from '../gulp-settings.js'; // импортируем переменные из отдельного файла
import { plugins } from '../gulp-plugins.js'; // импортируем переменные из отдельного файла

export const videos = () => { // экспортируем задачу videos

  const videoPipeline = gulp.src(path.src.videos) // выбираем источник для обработки
    .pipe(plugins.if(
      !global.isDev,
      plugins.newer(path.build.videos)
    ))
    .pipe(plugins.plumber({ // отслеживаем ошибки
      errorHandler: plugins.notify.onError({
        title: 'Videos',
        message: 'Error: <%= error.message %>',
      }),
    }))
    // .pipe(plugins.concat('videos.mp4'))
	// объединяем все видеофайлы в один
    .pipe(plugins.uglify()) // сжимаем код
    .pipe(plugins.rename({
      suffix: '.min', // добавляем суффикс .min к названию файла
    }))
    .pipe(plugins.size({
      showFiles: true, // выводим размеры файлов в консоль
    }))
    .pipe(gulp.dest(path.build.videos)) // отправляем обработанные файлы в build папку
    .pipe(plugins.if(
      global.isDev,
      plugins.notify({
        title: 'Videos',
        message: 'Success',
        onLast: true,
      })
    ));

  return videoPipeline; // возвращаем результат обработки
};
