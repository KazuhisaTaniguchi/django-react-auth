var gulp = require('gulp');

var sass = require('gulp-sass');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths_css = {
  'scss': 'client/sass/',
  'css': 'assets/css/'
}
var paths_img = {
  'default': 'client/images/',
  'min': 'assets/images/'
}
var paths_js = {
  'default': 'client/js_react/',
  'min': 'assets/js/'
}

gulp.task('scss', function() {
  // compressed or expanded
  return gulp.src(paths_css.scss + '**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(paths_css.css))
});

//画像圧縮
gulp.task('image', () => {
  return gulp.src([paths_img.default + '**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths_img.min));
});


gulp.task('watch', function(){
    gulp.watch(paths_css.scss + '**/*.scss', ['scss']);
    gulp.watch(paths_img.default + '**', ['image']);
});

gulp.task('default', function(){
    gulp.run('watch');
});
