module.exports = (gulp, options, plugins) => {
    gulp.task('imagemin:prod', () => {
        return gulp.src(options.getPath('src', 'images', '**'))
            .pipe(plugins.imagemin())
            .pipe(gulp.dest(options.getPath('dist', 'images')));
    });
};
