'use strict';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    gulpsass = require('gulp-sass'),
    sketch = require("gulp-sketch"),
    iconfont = require('gulp-iconfont'),
    bourbon = require('node-bourbon').includePaths,
    deploypages = require('gulp-gh-pages'),
    webpack = require('gulp-webpack'),
    serve = require('gulp-serve'),
    lunrindex = require('./gulp-plugins/gulp-lunrindex.js'),
    sitemap = require('./gulp-plugins/gulp-sitemap.js');

var dest = './dest',
    fontName = 'appfont';

gulp.task("webpack", function() {
    var config = require('./webpack.config.js');
    return gulp.src('src/assets/js/apps/apps.js')
      .pipe(webpack(config))
      .pipe(gulp.dest(dest+'/assets/js/'));
});

gulp.task("webpack-watch", function() {
    var config = require('./webpack.config.js');
    config.watch = true;
    return gulp.src('src/assets/js/apps/apps.js')
      .pipe(webpack(config))
      .pipe(gulp.dest(dest+'/assets/js/'));
});

gulp.task('lint', function () {
    return gulp.src(['src/assets/js/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

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

gulp.task('resources', function() {
    return gulp.src(['./src/**', '!./src/assets/**'])
        .pipe(gulp.dest(dest));
});

gulp.task('lunrindex', function() {
    return gulp.src('./src/sitemap.json')
        .pipe(lunrindex({filename:'searchindex.json'}))
        .pipe(gulp.dest(dest));
});

gulp.task('sitemap', function() {
    return gulp.src('./src/sitemap.json')
        .pipe(sitemap({url:'http://oleg.smetan.in/#'}))
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
    gulp.watch('./src/assets/scss/**', ['styles']);
    gulp.watch('./src/assets/icons/**', ['iconfont']);
    gulp.watch(['./src/**', '!./src/assets/**'], ['resources']);
    gulp.watch('./src/assets/img/**', ['img']);
});

gulp.task('serve', serve('dest'));

gulp.task('default', ['styles', 'resources', 'img', 'lunrindex', 'sitemap', 'iconfont', 'webpack']);
gulp.task('dev', ['styles', 'resources', 'img', 'lunrindex', 'sitemap', 'iconfont', 'watch', 'webpack-watch', 'serve']);