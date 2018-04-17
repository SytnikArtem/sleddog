var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng = require('gulp-tinypng-compress'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass',function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: true
    }))
    .pipe(sourcemaps.write())
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

gulp.task('tiny', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg')
    .pipe(cache(tinypng({
      key: '8wL2zZK5TlepqbA5Bti1akor3EE7pwV7',
      sigFile: 'images/.tinypng-sigs',
      sameDest: true,
      log: true
    })
    ))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('img', ['tiny'], function(){
  return gulp.src('app/img/**/*.+(svg|ico)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'libs-css', 'jquery'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['sass', 'jquery', 'img'], function(){
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/libs.min.css'
  ])
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  var buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);
