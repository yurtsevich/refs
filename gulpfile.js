var scssSources = './sass/screen.scss';

var gulp = require('gulp');

var scsslint = require('gulp-scss-lint');
gulp.task('scss-lint', function() {
  return gulp.src(scssSources)
    .pipe(scsslint());
});

var compass = require('gulp-compass');
 
gulp.task('compass', function() {
  gulp.src(scssSources)
    .pipe(compass({
      css: 'css',
      sass: 'sass',
      image: 'images',
      comments: true
    }))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['compass'], function () {
  var watcher_css = gulp.watch(scssSources, ['compass']);
  watcher_css.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running "compass" tasks...');
  });
});

gulp.task('default', ['watch']);