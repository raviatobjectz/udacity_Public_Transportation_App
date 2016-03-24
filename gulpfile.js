var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate')
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('compress-html', function() {
  return gulp.src('www/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('compress-js1', function() {
  return gulp.src('www/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-js2', function() {
  return gulp.src('www/js/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch-files', function() {
  gulp.watch('www/index.html',['compress-html']);
  gulp.watch('www/*.js',['compress-js1']);
  gulp.watch('www/js/*.js',['compress-js2']);
  gulp.watch('dist/js/*.js',['page-reload']);
  gulp.watch('dist/*.html',['page-reload']);
  gulp.watch('dist/*.js',['page-reload']);
});

gulp.task('page-reload', function() {
  browserSync.reload();
})

gulp.task('browser-sync', ['compress-html','compress-js1','compress-js2','copy-js3','copy-css','copy-icons', 'watch-files'], function() {
  browserSync.init({
      server: "dist/"
  });
  browserSync.stream();
});

gulp.task('copy-css', function () {
        return gulp.src(['www/css/*']).pipe(gulp.dest('dist/css'));
});

gulp.task('copy-js3', function () {
        return gulp.src(['www/js/import/*']).pipe(gulp.dest('dist/js/import'));
});

gulp.task('copy-icons', function () {
        return gulp.src(['www/icons/*']).pipe(gulp.dest('dist/icons'));
});

//gulp.task('default', ['copy','browser-sync']);
gulp.task('default', ['browser-sync']);



