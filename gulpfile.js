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

gulp.task('compress-js', function() {
  return gulp.src('www/js/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-css', function() {
    gulp.src('www/css/*')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch-files', function() {
  gulp.watch('www/js/*.js',['compress-js']);
  gulp.watch('www/index.html',['compress-html']);
  gulp.watch('dist/*',['page-reload']);
  gulp.watch('dist/js/*',['page-reload']);
});

gulp.task('page-reload', function() {
  browserSync.reload();
})

gulp.task('browser-sync', ['compress-js','compress-html','copy-css','watch-files'], function() {
  browserSync.init({
      server: "dist/"
  });
  browserSync.stream();
});

gulp.task('default', ['browser-sync']);
