var gulp = require('gulp');
var bs = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Запускаем сервер, предварительно скопилировав SASS
gulp.task('serve', ['sass'], function() {

    bs.init({
      server: "./src"
    });
    
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', bs.reload);
});

// Делаем компиляцию SASS в CSS 
gulp.task('sass', function() {
 return gulp.src("src/sass/*.sass")
   .pipe(sass())
   .pipe(gulp.dest("src/css"))
   .pipe(bs.stream());
});

gulp.task('autoprefixer', function () {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'));
});


gulp.task('default', ['serve']);