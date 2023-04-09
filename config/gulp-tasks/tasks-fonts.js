import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

// Конвертация otf в ttf
export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

// Конвертация ttf в woff и woff2
export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

// Создание файла стилей для подключения шрифтов
export const fontsStyle = (cb) => {
    const fontsFile = `${app.path.srcFolder}/scss/fonts/fonts.scss`;
    if (app.isFontsReW) {
        // Удаляем файл подключения шрифтов, если передан флаг --rewrite
        fs.unlinkSync(fontsFile);
        cb();
    } else {
        // Проверяем, существуют ли файлы шрифтов
        fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
            if (fontsFiles) {
                if (!fs.existsSync(fontsFile)) {
                    // Если файл стилей для подключения шрифтов не существует, создаем его
                    fs.writeFileSync(fontsFile, '');
                    let newFileOnly;
                    for (var i = 0; i < fontsFiles.length; i++) {
                        // Записываем подключения шрифтов в файл стилей
                        let fontFileName = fontsFiles[i].split('.')[0];
                        let isItalic = fontFileName.toLowerCase().includes('italic');
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (isItalic) {
                            fontWeight = 'italic ' + fontWeight;
                        } else {
                            switch (fontWeight.toLowerCase()) {
                                case 'thin':
                                    fontWeight = 100;
                                    break;
                                case 'extralight':
                                    fontWeight = 200;
                                    break;
                                case 'light':
                                    fontWeight = 300;
                                    break;
                                case 'medium':
                                    fontWeight = 500;
                                    break;
                                case 'semibold':
                                    fontWeight = 600;
                                    break;
                                case 'bold':
                                    fontWeight = 700;
                                    break;
                                case 'extrabold':
                                    fontWeight = 800;
                                    break;
                                case 'black':
                                    fontWeight = 900;
                                    break;
                                default:
                                    fontWeight = 400;
                            }
                        }
                        let newLine = `@include font-face("${fontName}", "${app.path.build.fonts}/${fontsFiles[i]}", ${fontWeight});\n`;
                        fs.appendFileSync(fontsFile, newLine);
                        newFileOnly += newLine;
                    }
                    console.log(`Файл ${fontsFile} успешно создан`);
                    cb();
                } else {
                    console.log(`Файл ${fontsFile} уже существует`);
                    cb();
                }
            } else {
                console.log(`Не найдены файлы шрифтов в директории ${app.path.build.fonts}`);
                cb();
            }
        });
    }
};

  