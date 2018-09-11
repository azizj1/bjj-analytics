const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateFilePlugin = require('create-file-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const endpoints = require('./endpoints');
const cnames = require('./cnames');

const STYLELINT_CONFIG = {
    files: 'src/**/*.scss',
    syntax: 'scss'
};
const BUILD_DIR = path.join(__dirname, 'build');
const BROWSERS_LIST = require('./postcss.config').plugins.autoprefixer.browsers;

const STATS = {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
    children: false,
    errors: true,
    errorDetails: true,
    warnings: true
};

// for css-loader
function cssConfig(modules, debug) {
    return {
        sourceMap: debug,
        modules,
        localIdentName: debug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
        minimize: !debug
    };
}

function getVendors(directory, currentListOfVendors) {
    currentListOfVendors = currentListOfVendors || [];
    fs.readdirSync(directory).forEach(file => {
        if (fs.statSync(directory + file).isDirectory())
            currentListOfVendors = getVendors(directory + file + '/', currentListOfVendors);
        else if (['.css', '.scss', '.js'].includes((path.extname(file) || '').toLowerCase()))
            currentListOfVendors.push(directory + file);
    });
    return currentListOfVendors;
}

const vendors = getVendors('./vendor/', []);

module.exports = function (env) {
    const DEBUG = env !== 'prod' && env !== 'dev';
    const PROD = env === 'prod';
    const TIER = DEBUG ? 'local' : PROD ? 'prod' : 'dev';
    const GLOBALS = {
        'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production'),
        __DEV__: JSON.stringify(DEBUG),
        __CALENDAR_ENDPOINT__: JSON.stringify(endpoints[TIER])
    };
    const BABEL_CONFIG = {
        babelrc: false,
        presets: [
            '@babel/react', 
            ['@babel/env', { 'targets': { 'browsers': BROWSERS_LIST } }]],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread', 
            '@babel/transform-runtime',
            ...DEBUG ? [] : [
                'transform-react-remove-prop-types',
                '@babel/plugin-transform-react-constant-elements'
            ]
        ],
        cacheDirectory: DEBUG 
    };
    const CREATE_FILE_CONFIG = {
        path: BUILD_DIR, fileName: 'CNAME', content: DEBUG ? '' : cnames[TIER]
    };

    const config = {
        mode: DEBUG ? 'development' : 'production',
        entry: {
            'lib': vendors,
            'main': './src/main'
        },
        output: {
            path: BUILD_DIR,
            filename: '[name].js?[chunkhash]',
            publicPath: '/'
        },
        devtool: DEBUG ? 'inline-source-map' : false, 
        devServer: {
            contentBase: BUILD_DIR,
            stats: STATS,
            historyApiFallback: true
        },
        resolve: {
            alias: {
                '~': path.join(__dirname, 'src')
            },
            extensions: ['*', '.tsx', '.ts', '.jsx', '.js', '.json']
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    use: 'tslint-loader',
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.tsx?$/,
                    exclude: [
                        /node_modules/,
                        path.join(__dirname, 'vendor')
                    ],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: BABEL_CONFIG
                        },
                        {
                            loader: 'ts-loader',
                            options: { silent: true }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    include: /src/,
                    use: [
                        DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: cssConfig(true, DEBUG)
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: DEBUG }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: DEBUG, includePaths: [path.join(__dirname, 'src/shared/styles/')] }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    include: /(vendor|node_modules\/react-select|node_modules\/rc-slider)/,
                    use: [
                        DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: cssConfig(false, DEBUG) 
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: DEBUG }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    include: /vendor/,
                    use: [
                        DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: cssConfig(false, DEBUG)
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: DEBUG }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: DEBUG }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|svg|otf|woff2?|gif|png)(\?v=\d+\.\d+\.\d+)?$/,
                    include: /vendor/,
                    loader: 'file-loader',
                    options: { 
                        name: DEBUG ? '[name].[ext]?[hash]' : '[hash].[ext]',
                        outputPath: 'assets/'
                    },
                },
                {
                    test: /\.(png|jpg)$/,
                    include: /src/,
                    loader: 'url-loader',
                    options: {
                        name: DEBUG ? '[name]-[hash].[ext]' : '[hash].[ext]',
                        limit: 100000,
                        outputPath: 'assets/'
                    }
                }
            ]
        },
        plugins: [
            new CleanPlugin([BUILD_DIR]),
            new HtmlWebpackPlugin({
                template: 'index.ejs'
            }),
            new webpack.DefinePlugin(GLOBALS),
            new MiniCssExtractPlugin('[name].css?[contenthash]'),
            new AssetsPlugin({ path: BUILD_DIR }),
            new StyleLintPlugin(STYLELINT_CONFIG),
            new CopyWebpackPlugin([
                { from: 'public/', to: BUILD_DIR }
            ], { ignore: ['node_modules/**/*', 'build/**/*']}),
            ...DEBUG ? [] : [
                new CreateFilePlugin(CREATE_FILE_CONFIG)
            ]
        ],
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        performance: {
            hints: false
        },
        cache: DEBUG,
        stats: STATS
    };

    return config;
}

