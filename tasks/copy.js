module.exports = (gulp, options) => {
    const srcPath = options.getPath('src', 'assets', '**/*');
    const distPath = options.getPath('dist', 'assets');

    gulp.task('copy:assets', () => gulp.src(srcPath).pipe(gulp.dest(distPath)));

    gulp.task('copy:watch', () => {
        gulp.watch(srcPath, ['copy:assets']);
    });
};
