const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const { Script } = require("vm");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const avif = require("gulp-avif");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const include = require('gulp-include');

function pages() {
	return src('app/pages/*.html')
	.pipe(include({
		includePaths: 'app/components'
	}))
	.pipe(dest('app'))
	.pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/scss"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("app/fonts/src/*.*")
    .pipe(fonter({ formats: ["woff", "ttf"] }))
    .pipe(src("app/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

function scripts() {
  return src(["node_modules/swiper/swiper-bundle.js", "app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src(["app/images/src/**/*.*", "!app/images/src/icons/*.svg"])
    .pipe(newer("app/images"))
    .pipe(avif({ quality: 50 }))
    .pipe(src("app/images/src/**/*.*"))
    .pipe(newer("app/images"))
    .pipe(webp())
    .pipe(src("app/images/src/**/*.*"))
    .pipe(newer("app/images"))
    .pipe(imagemin())
    .pipe(dest("app/images"));
}

function sprite() {
  return src("app/images/icons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

function watching() {
  watch(["app/scss/style.scss"], styles);
  watch(["app/components/*", "app/pages/*"], pages);
  watch(["app/fonts"], fonts);
  watch(["app/images/src"], images);
  watch(["app/js/main.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    port: 8000,
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    ["app/scss/style.min.css",
	'app/images/*.*',
	'!app/images/*.svg',
	'!app/images/stack/*.*',
	'app/images/sprite.svg',
	'app/fonts/*.*',
	 "app/js/main.min.js",
	  "app/**/*.html"],
    { base: "app" }
  ).pipe(dest("dist"));
}

exports.pages = pages;
exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);

exports.default = parallel(
	pages,
  styles,
  fonts,
  images,
  scripts,
  browsersync,
  watching
);
