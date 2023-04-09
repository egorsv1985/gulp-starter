// Импорт зависимостей
import del from "del";
import zipPlugin from "gulp-zip";

// Экспорт задачи
export const zip = () => {
// Определение имени архива и целевой директории
const zipName = `${app.path.rootFolder}`.zip;
const targetDirectory = './';
// Удалить существующий архив
const deleteResult = del.sync(zipName);
// Вывод в консоль количества удаленных файлов или директорий
if (deleteResult && deleteResult.length > 0) {
	console.log(`Deleted ${deleteResult.length} files or directories`);
}

// Загрузка файлов для архивирования из директории сборки
return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
	// Обработка ошибок и вывод уведомления в случае ошибки
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "ZIP",
			message: "Error: <%= error.message %>"
		}))
	)
	// Архивирование файлов
	.pipe(zipPlugin(zipName))
	// Обработка ошибок при создании архива и вывод сообщения об ошибке в консоль
	.on("error", (err) => {
		console.error("Error creating archive", err);
	})
	// Сохранение архива в целевой директории
	.pipe(app.gulp.dest(targetDirectory));
};
