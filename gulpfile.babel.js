import gulp from 'gulp';
import path from 'path';
import tasks from 'load-gulp-tasks';
import sequence from 'run-sequence';
import bs from 'browser-sync';
import webpack from 'webpack';
import { webpackDevConfig, webpackProdConfig} from './webpack.config.js';

tasks(gulp, {
    paths: {
        src: 'app/',
        dist: 'dist/',
        styles: 'styles/',
        scripts: 'scripts/',
        fonts: 'assets/font/',
        svgs: 'assets/svg/',
        helpers: 'templates/helpers/',
        layouts: 'templates/layouts/',
        partials: 'modules/',
        data: 'modules/',
        pages: 'pages/',
    },
    getPath: function (...pathStrings) {
        const pathsArray = pathStrings.map(name => this.paths[name] || name);
        return path.join(__dirname, ...pathsArray);
    },
    browserSync: bs.create(),
    webpackDev: webpack(webpackDevConfig),
    webpackProd: webpack(webpackProdConfig)
});

// task definitions in /tasks
gulp.task('build', callback => {
    sequence('clean:dist', ['sprites:dev', 'less:dev', 'copy:assets', 'markup:dev', 'scripts:dev'], callback);
});
gulp.task('build:prod', callback => {
    sequence('clean:dist', ['sprites:dev', 'less:prod', 'copy:assets', 'markup:dev', 'scripts:prod'], callback);
});
gulp.task('watch', ['sprites:watch', 'less:watch', 'copy:watch', 'markup:watch', 'scripts:watch']);
gulp.task('serve', callback => {
    sequence('build', 'server:start', 'watch', callback);
});
gulp.task('prod', callback => {});
