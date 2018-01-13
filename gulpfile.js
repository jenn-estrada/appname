var config = require('./gulp.config')();
var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

function buildStyles() {
    console.log('Compiling SASS --> CSS');
    del(config.css);
    return gulp.src(config.sass)
        .pipe(sass())
        .pipe(gulp.dest('styles'));
}

function minComponents() {
    return gulp.src('components/*.js')
        .pipe(concat('components.js'))
        .pipe(gulp.dest('dist/'))
}

function minBase() {
    return gulp.src('*.js')
        .pipe(concat('base.js'))
        .pipe(gulp.dest('dist/'))
}

function minDist() {
    return gulp.src('dist/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/'))
    // .pipe(rename('scripts.min.js'))
    // .pipe(uglify())
    // .pipe(gulp.dest('dist/'));
}

gulp.task('styles', function() {
    buildStyles();
});

gulp.task('serve', function() {
    console.log('Serving to port 3000');
    buildStyles();
    gulp.src(['.'])
        .pipe(webserver({
            port: config.port
        }));
});

gulp.task('minify', function () {
    del('dist/*');
    minComponents()
    minBase();
    minDist();
});
