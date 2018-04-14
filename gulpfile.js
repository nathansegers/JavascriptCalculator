const gulp = require("gulp"),
    livereload = require("gulp-livereload"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    cleancss = require("gulp-clean-css");
    // uglify = require("gulp-uglify");

gulp.task("css", function() {
    gulp.src("./src/style/screen.scss")
        .pipe(sass())
        .on("error", onError)
        .pipe(cleancss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/style/"));
    livereload.reload();
});

gulp.task("script", function(){
    gulp.src("./src/script/**/*.js")
        .pipe(concat("app.js"))
        .pipe(rename({ suffix: ".min" }))
        // .pipe(uglify())
        .on("error", onError)
        .pipe(gulp.dest("./dist/script"));
    livereload.reload()
})

gulp.task("html", function() {
    livereload.reload()
});

function onError(err) {
    console.log(err);
    this.emit("end");
}

gulp.task("default", function() {
    gulp.watch("./src/style/**/*.scss", ["css"]);
    gulp.watch("./src/script/*.js", ["script"]);
    gulp.watch("./dist/*.html", ["html"]);
    livereload.listen();
});