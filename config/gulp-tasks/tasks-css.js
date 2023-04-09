import postcss from "gulp-postcss"; // Импортируем модуль gulp-postcss
import cssnano from "cssnano"; // Импортируем модуль cssnano
import webpcss from "gulp-webp-css"; // Импортируем модуль gulp-webp-css
import autoprefixer from "autoprefixer"; // Импортируем модуль autoprefixer
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Импортируем модуль gulp-group-css-media-queries
import eslint from "gulp-eslint"; // Импортируем модуль gulp-eslint
import pxtorem from "postcss-pxtorem"; // Импортируем модуль postcss-pxtorem

export const css = () => {
  return (app.gulp
    .src(`${app.path.build.css}style.css`, {})
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: "CSS",
          message: "Error: <%= error.message %>",
        }),
      })
    )
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(
      postcss([
        pxtorem({
          rootValue: 16,
          propList: ["*"],
        }),
      ])
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isWebP,
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
          })
        )
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(app.isBuild, cssnano()))
    .pipe(app.plugins.rename({ suffix: ".min" }))
    .pipe(app.gulp.dest(app.path.build.css))
	);
};


