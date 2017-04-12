const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const minifyCSS = require('gulp-cssnano');
const mocha = require('gulp-mocha');
const browserify = require('gulp-browserify');
const del = require('del');

gulp.task('clean', function(){
  return del(['web/dist'])
});

gulp.task('test', function(){
    return gulp.src([
        'engine/*test.js',
        'slack/*test.js',
        'web/*test.js'
    ])
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('sites', function(){
  return gulp.src('web/www/*.html')
    .pipe(gulp.dest('web/dist/www'));
});

gulp.task('images', function(){
  return gulp.src([
      'web/www/img/*.svg'
    ])
    .pipe(gulp.dest('web/dist/www/img'));
});

gulp.task('css', function(){
  return gulp.src([
      'web/www/css/*.css',
      'node_modules/metrics-graphics/dist/metricsgraphics.css',
      'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(minifyCSS())
    .pipe(gulp.dest('web/dist/www/css'));
});

gulp.task('react', function(){
  return gulp.src([
      'web/www/js/*.jsx'])
    .pipe(babel({
      plugins: ['transform-react-jsx'],
      presets: ['es2015','stage-2']
    }))
    .pipe(browserify())
//    .pipe(uglify())
    .pipe(gulp.dest('web/dist/www/js'));
});

gulp.task('scripts', function(){
  return gulp.src([
      'web/www/js/*.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js'])
//    .pipe(uglify())
    .pipe(gulp.dest('web/dist/www/js'));
});

gulp.task('default',
  gulp.series(
    'clean',
    gulp.series(
      gulp.parallel('sites', 'images', 'css', 'react'),
      'scripts'
    )
  )
);
