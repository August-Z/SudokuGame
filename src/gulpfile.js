const gulp = require("gulp");

// 转译JavaScript
gulp.task("webpack", () => {
    const webpack = require("webpack-stream");
    gulp.src("./js/**/*.js")
        .pipe(webpack())
        .pipe(gulp.dest("../www/js"));
});

// 编译 less -> css
gulp.task("less", () => {
    const less = require("gulp-less");
    gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css"));
});

gulp.task("default",["webpack","less"]);

