import buffer from 'vinyl-buffer';
import merge from 'merge-stream';

module.exports = (gulp, options, plugins) => {
    gulp.task('sprites:carets', () => {
        const caretsSpriteData = gulp.src(options.getPath('src', 'sprites', 'carets/*.png'))
            .pipe(plugins.spritesmith({
                imgPath: 'assets/images/sprite-carets.png',
                imgName: 'sprite-carets.png',
                retinaImgPath: 'assets/images/sprite-carets@2x.png',
                retinaImgName: 'sprite-carets@2x.png',
                retinaSrcFilter: [options.getPath('src', 'sprites', 'carets/*@2x.png')],
                cssName: 'carets.less'
            }));
        const caretsLessStream = caretsSpriteData.css.pipe(gulp.dest(options.getPath('src', 'styles', './sprites')));
        const caretsImgStream = caretsSpriteData.img
            .pipe(buffer())
            .pipe(plugins.imagemin())
            .pipe(gulp.dest(options.getPath('src', 'images')));
        return merge(caretsImgStream, caretsLessStream);
    });

    gulp.task('sprites:icons', () => {
        const iconsSpriteData = gulp.src((options.getPath('src', 'sprites', 'icons/*.png')))
            .pipe(plugins.spritesmith({
                imgPath: 'assets/images/sprite-icons.png',
                imgName: 'sprite-icons.png',
                retinaImgPath: 'assets/images/sprite-icons@2x.png',
                retinaImgName: 'sprite-icons@2x.png',
                retinaSrcFilter: [options.getPath('src', 'sprites', 'icons/*@2x.png')],
                cssName: 'icons.less'
            }));
        const iconsLessStream = iconsSpriteData.css.pipe(gulp.dest(options.getPath('src', 'styles', './sprites')));
        const iconsImgStream = iconsSpriteData.img
            .pipe(buffer())
            .pipe(plugins.imagemin())
            .pipe(gulp.dest(options.getPath('src', 'images')));
        return merge(iconsImgStream, iconsLessStream);
    });

    gulp.task('sprites:dev', ['sprites:carets', 'sprites:icons']);
    gulp.task('sprites:watch', () => {
        gulp.watch(options.getPath('src', 'sprites', 'carets/*.png'), ['sprites:carets']);
        gulp.watch(options.getPath('src', 'sprites', 'icons/*.png'), ['sprites:icons']);
    });
};
