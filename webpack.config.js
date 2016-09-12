import webpack from 'webpack';
import path from 'path';

const webpackDevConfig = {
    context: path.join(__dirname, 'app'),
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: {
        'global-nav': ['./scripts/global-nav.js', './scripts/seventh-gen-hero.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
        libraryTarget: 'umd',
        library: '[name]'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            THREE: 'exports?THREE!three',
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
            }
        }],
        resolve: {
            extensions: ['.js']
        }
    }
};

const webpackProdConfig = {
    context: path.join(__dirname, 'app'),
    entry: {
        intel: ['./scripts/app.js'],
        vr: ['./modules/vr/vr.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
        libraryTarget: 'umd',
        library: '[name]'
    },
    plugins: [
        new webpack.ProvidePlugin({
            THREE: 'exports?THREE!three',
        })
    ],
    externals: {
        $: 'jquery',
        jQuery: 'jquery',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['transform-object-assign'],
            }
        }],
        resolve: {
            extensions: ['.js']
        }
    }
};

export {
    webpackDevConfig,
    webpackProdConfig,
};
