const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    if (preset) {
        opts.presets.push(preset)
    }
    return opts
}

const jsLoader = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}
const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: `./index.html`,
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new HTMLWebpackPlugin({
            template: `./about.html`,
            filename: 'about.html',
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new HTMLWebpackPlugin({
            template: `./blog.html`,
            filename: 'blog.html',
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist/')
                },
                {
                    from: path.resolve(__dirname, './src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
            ],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: filename('css') }),
    ];
    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './js/analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist/'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        extensions: ['.js', '.ts', '.json', '.tsx']
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.sa|s(c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"],
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoader()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions("@babel/preset-typescript")
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-react')
            }
        ],
    }
}