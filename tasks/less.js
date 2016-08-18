import cleancss from 'less-plugin-clean-css';
const cleanCSSPlugin = new cleancss({
    advanced: true
});
import lessGlobbing from 'less-plugin-glob';
import autoprefix from 'less-plugin-autoprefix';
const autoprefixPlugin = new autoprefix({
    browsers: ["last 2 versions"]
});

module.exports = (gulp, options, plugins) => {
    gulp.task('less:dev', ['less:bootstrap'], () => {
        return gulp.src(options.getPath('src', 'styles', 'global-nav.less'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less({
                plugins: [lessGlobbing, autoprefixPlugin]
            }))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(options.getPath('dist')));
    });
    gulp.task('less:bootstrap', () => {
        return gulp.src(options.getPath('src', 'styles', 'bootstrap.less'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less({
                plugins: [lessGlobbing, autoprefixPlugin]
            }))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(options.getPath('dist')));
    });
    gulp.task('less:prod', ['less:bootstrap-prod'], () => {
        return gulp.src(options.getPath('src', 'styles', 'global-nav.less'))
            .pipe(plugins.less({
                plugins: [lessGlobbing, autoprefixPlugin]
            }))
            .pipe(gulp.dest(options.getPath('dist')));
    });
    gulp.task('less:bootstrap-prod', () => {
        return gulp.src(options.getPath('src', 'styles', 'bootstrap.less'))
            .pipe(plugins.less({
                plugins: [lessGlobbing, autoprefixPlugin]
            }))
            .pipe(gulp.dest(options.getPath('dist')));
    });
    gulp.task('less:watch', () => {
        gulp.watch([
            options.getPath('src', 'styles', '**/*.less'),
        ], ['less:dev']);
    });
};
