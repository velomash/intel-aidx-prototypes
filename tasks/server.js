import webpackDevMiddleware from 'webpack-dev-middleware';

module.exports = (gulp, options, plugins) => {
    gulp.task('server:start', () => {
        options.browserSync.init({
            server: options.getPath('dist'),
            notify: false,
            middleware: [
                webpackDevMiddleware(options.webpackDev, {
                    publicPath: '/',
                    stats: {
                        colors: true
                    }
                })
            ],
            plugins: ['bs-fullscreen-message'],
            files: [
                options.getPath('dist', '*.html'),
                options.getPath('dist', '*.css'),
                options.getPath('dist', 'assets/**'),
            ]
        }, (err, bs) => {
            // start ngrok server
            // ngrok.connect(bs.options.get('port'), (err, url) => {
            // console.log(err, url);
            // });
        });
    });
};
