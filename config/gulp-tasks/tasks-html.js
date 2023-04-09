import versionNumber from "gulp-version-number"; // плагин для добавления версии к файлам
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // плагин для подключения webp изображений в HTML

export const html = () => {
	// опции для плагина versionNumber
	const versionNumberOptions = {
		'value': '%DT%', // шаблон версии, который будет заменен на текущую дату и время
		'append': {
			'key': '_v', // ключ, который будет добавлен к имени файла
			'cover': 0, // сколько символов заменить из имени файла на версию
			'to': ['css', 'js', 'img'] // список расширений файлов, к которым нужно добавить версию
		},
		'output': {
			'file': 'config/version.json' // путь к файлу, в котором будет храниться текущая версия
		}
	};

	return app.gulp.src(`${app.path.build.html}*.html`) // выбор исходных файлов
		.pipe(app.plugins.plumber( // плагин для обработки ошибок
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(
			app.plugins.if(
				app.isWebP, // проверка, поддерживает ли браузер формат WebP
				webpHtmlNosvg() // плагин для подключения WebP изображений в HTML
			)
		)
		.pipe(versionNumber(versionNumberOptions)) // плагин для добавления версии к файлам
		.pipe(app.gulp.dest(app.path.build.html)); // сохранение обработанных файлов
}
