import path from 'path';
import stripAnsi from 'strip-ansi';

module.exports = (gulp, options) => {

    gulp.task('scripts:dev', callback => {
        options.webpackDev.run((err, stats) => {
            return err ? callback(err) : callback();
        });
    });

    gulp.task('scripts:prod', callback => {
        options.webpackProd.run((err, stats) => {
            return err ? callback(err) : callback();
        });
    });

    gulp.task('scripts:watch', () => {
        options.webpackDev.watch({
            aggregateTimeout: 300,
        }, (err, stats) => {
            if (stats.hasErrors() || stats.hasWarnings()) {
                return options.browserSync.sockets.emit('fullscreen:message', {
                    title: "Webpack Error:",
                    body: stripAnsi(stats.toString()),
                    timeout: 100000
                });
            }
            options.browserSync.reload();
        });
    });
};
