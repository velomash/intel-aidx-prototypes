import loader from 'assemble-loader';
import runtimes from 'composer-runtimes';
import gutil from 'gutil';
import assembleCode from 'assemble';
const assemble = assembleCode();

module.exports = (gulp, options, plugins) => {
    assemble.use(runtimes());
    assemble.use(loader());
    assemble.engine('*', require('engine-handlebars'));

    function updateFileTargets() {
        assemble.partials(options.getPath('src', 'partials', '**/*.hbs'));
        assemble.data(options.getPath('src', 'data', '**/*.json'));
        assemble.helpers(options.getPath('src', 'helpers', '**/*.js'));
        assemble.layouts(options.getPath('src', 'layouts', '**/*.hbs'));
    }

    // set the default layout if none is provided
    assemble.preLayout(/\.hbs$/, (view, next) => {
        if (!view.layout) {
            view.layout = 'default';
        }
        next();
    });

    // log file names after they're rendered
    assemble.on('postRender', view => {
        const htmlFileName = view.relative.replace(/\.hbs$/, '.html');
        console.log(`  rendered > ${htmlFileName}`)
    });

    gulp.task('markup:dev', () => {
        updateFileTargets();
        return assemble.src(options.getPath('src', 'pages', '**/*.hbs'))
            .pipe(assemble.renderFile('*'))
            .on('error', gutil.log)
            .pipe(plugins.extname())
            .pipe(plugins.prettify({
                indent_size: 4,
            }))
            .pipe(gulp.dest(options.getPath('dist')));
    });

    gulp.task('markup:prod', () => {
        updateFileTargets();
        return assemble.src(options.getPath('src', 'pages', '**/*.hbs'))
            .pipe(assemble.renderFile('*'))
            .on('error', gutil.log)
            .pipe(plugins.extname())
            .pipe(plugins.htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(options.getPath('dist')));
    });

    gulp.task('markup:watch', () => {
        const templateWatcher = gulp.watch([
            options.getPath('src', 'partials', '**/*.hbs'),
            options.getPath('src', 'data', '**/*.json'),
            options.getPath('src', 'helpers', '**/*.js'),
            options.getPath('src', 'layouts', '**/*.hbs'),
        ], ['markup:dev']);
    });
};
