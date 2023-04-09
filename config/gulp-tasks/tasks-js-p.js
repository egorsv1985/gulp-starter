export const jsp = () => {
	// Выбор исходного файла для обработки
	return app.gulp.src(app.path.buildFolder + '/js/app.min.js')
	  // Обработка ошибок с помощью plumber и notify
	  .pipe(app.plugins.plumber(
		app.plugins.notify.onError({
		  title: "JSP",
		  message: "Error: <%= error.message %>"
		}))
	  )
	  // Применение форматирования с помощью Prettier
	  .pipe(app.plugins.prettier({}))
	  // Переименование файла
	  .pipe(app.plugins.rename("app.js"))
	  // Выгрузка файла в папку build/js
	  .pipe(app.gulp.dest(app.path.build.js));
  }
  