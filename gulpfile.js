'use strict';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require("babelify"),
    source = require('vinyl-source-stream'),
    exorcist = require('exorcist'),
    uglifyify = require('uglifyify'),
    jshint = require("gulp-jshint"),
    gulpsass = require('gulp-sass'),
    sketch = require("gulp-sketch"),
    iconfont = require('gulp-iconfont'),
    bourbon = require('node-bourbon').includePaths,
    deploypages = require('gulp-gh-pages');

var dest = './dest',
    fontName = 'appfont';

gulp.task('styles', function() {
    return gulp.src([
            './src/assets/scss/app.scss'
        ])
        .pipe(gulpsass({
            outputStyle: 'expanded',
            includePaths: [
                './src/assets/scss'
            ].concat(bourbon),
            errLogToConsole: true
        }))
        .pipe(gulp.dest(dest + '/assets/css'));
});

gulp.task('iconfont', function() {
    return gulp.src('./src/assets/icons/symbol-font-16px.sketch') // you can also choose 'symbol-font-16px.sketch'
        .pipe(sketch({
            export: 'artboards',
            formats: 'svg'
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true,
            descent: 80
        }))
        .pipe(gulp.dest(dest + '/assets/fonts'))

});

gulp.task('html', function() {
    return gulp.src(['./src/**', '!./src/assets/**'])
        .pipe(gulp.dest(dest));
});

gulp.task('img', function() {
    return gulp.src(['./src/assets/img/**'])
        .pipe(gulp.dest(dest+ '/assets/img'));
});

gulp.task('deploypages', function() {
    return gulp.src('./dest/**/*')
        .pipe(deploypages({branch:'master'}));
});

gulp.task('watch', function() {
    gulp.watch('./src/assets/js/apps/**', ['apps']);
    gulp.watch('./src/assets/js/lib/**', ['lib']);
    gulp.watch('./src/assets/scss/**', ['styles']);
    gulp.watch('./src/assets/icons/**', ['iconfont']);
    gulp.watch(['./src/**', '!./src/assets/**'], ['html']);
});

gulp.task('default', ['styles', 'html', /* 'img', */ 'watch']);