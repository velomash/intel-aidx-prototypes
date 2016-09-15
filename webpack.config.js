import webpack from 'webpack';
import path from 'path';

const webpackDevConfig = {
    context: path.join(__dirname, 'app'),
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: {
        'modules': ['./modules/all.js'],
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
        'modules': ['./modules/all.js'],
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
            $: 'jquery',
            jQuery: 'jquery',
            THREE: 'exports?THREE!three',
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
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


export {
    webpackDevConfig,
    webpackProdConfig,
};
