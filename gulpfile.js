var gulp = require('gulp');
    sass = require('gulp-sass');
    browserSync = require('browser-sync');
    concat = require('gulp-concat');
    uglify = require('gulp-uglifyjs');
    cssnano = require('gulp-cssnano');
    rename = require('gulp-rename')

gulp.task('sass',function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});
gulp.task('jquery', function(){
  return gulp.src(['app/libs/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('app/js'))
});
gulp.task('libs-css', ['sass'], function(){
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});
// gulp.task('libs-js', function(){
//   return gulp.src([
//     'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
//   ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'));
// })
gulp.task('watch', ['browser-sync', 'libs-css', 'jquery'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('default', ['watch']);
