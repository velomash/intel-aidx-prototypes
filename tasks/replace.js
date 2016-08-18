module.exports = (gulp, options, plugins) => {

    gulp.task('replace:prod', callback => {
        const originalAssetPath = 'assets/VR-ASSETS/';
        const newAssetPath = '/content/dam/www/public/us/en/include/video-player/vr-modal/assets/images/vr/'
        return gulp.src([options.getPath('dist', '*')])
            .pipe(plugins.replace(originalAssetPath, newAssetPath))
            .pipe(gulp.dest(options.getPath('dist')));
    });

};
