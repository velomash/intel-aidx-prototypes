import del from 'del';

module.exports = (gulp, options) => {
    gulp.task('clean:dist', () => {
        return del.sync(options.getPath('dist', '*'));
    });
};
