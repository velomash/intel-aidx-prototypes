import lessGlobbing from 'less-plugin-glob';
import autoprefix from 'less-plugin-autoprefix';
const autoprefixPlugin = new autoprefix({
    browsers: ["> 1%"]
});

module.exports = (gulp, options, plugins) => {
    gulp.task('less:dev', () => {
        return gulp.src(options.getPath('src', 'styles', 'main.less'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less({
                plugins: [lessGlobbing, autoprefixPlugin]
            }))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(options.getPath('dist')));
    });
    gulp.task('less:prod', () => {
        return gulp.src(options.getPath('src', 'styles', 'main.less'))
            .pipe(plugins.less({
                plugins: [lessGlobbing, autoprefixPlugin]
            }))
            .pipe(gulp.dest(options.getPath('dist')));
    });
    gulp.task('less:watch', () => {
        gulp.watch([
            options.getPath('src', 'styles', '**/*.less'),
            options.getPath('src', 'partials', '**/*.less'),
        ], ['less:dev']);
    });
};
