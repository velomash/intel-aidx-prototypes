module.exports = (gulp, options) => {
    const srcPath = options.getPath('src', 'assets/VR-ASSETS/', '**/*');
    const distPath = options.getPath('dist', 'assets/VR-ASSETS/');

    gulp.task('copy:assets', () => gulp.src(srcPath).pipe(gulp.dest(distPath)));

    gulp.task('copy:watch', () => {
        gulp.watch(srcPath, ['copy:assets']);
    });
};
