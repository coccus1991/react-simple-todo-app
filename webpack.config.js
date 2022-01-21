const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';

    return {
        entry: {
            client: './src/index.tsx',
        },
        devtool: devMode ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },

                {
                    test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                },

                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto',
                    use: {
                        loader: 'babel-loader',
                    },
                },

                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            limit: 10000,
                            mimetype: 'application/font-woff',
                        },
                    },
                },

                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                },

                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                },

                {
                    test: /\.(jpe?g|png|gif)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                },

                {
                    test: /\.ico$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'name=[name].[ext]',
                        },
                    },
                },

                {
                    test: /\.json$/,
                    type: 'javascript/auto',
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'configs/[name].[ext]',
                        },
                    },
                },
                {
                    test: /module\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-modules-typescript-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName:
                                        'css_module_[hash:base64:8]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: [/module\.(sa|sc|c)ss$/],
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },

                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: [
                        /node_modules/,
                        '/**/*.test.tsx',
                        '/**/*.test.ts',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx'],
        },
        output: {
            path: __dirname + '/dist',
            publicPath: '',
            filename: devMode
                ? 'scripts/[name].bundle.js'
                : 'scripts/[name].[contenthash].bundle.js',
        },

        //split of the bundle
        optimization: {
            
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: /\/node_modules\//,
                        enforce: true,
                    },
                },
            },
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),

            new ESLintPlugin({
                extensions: ['js', 'jsx', 'ts', 'tsx'],
            }),

            //for adding automatically js files include on index.html
            new HtmlWebpackPlugin({
                template: 'src/index.ejs',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                inject: true,
            }),

            //for extracting css/scss code and create bundle.css
            new MiniCssExtractPlugin({
                filename: devMode
                    ? 'css/[name].css'
                    : 'css/[name].[contenthash].css',
                chunkFilename: devMode
                    ? 'css/[id].css'
                    : 'css/[id].[contenthash].css',
            }),

            // for remove unused style css rules
            new PurgeCSSPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
                safelist: [/css_module_*/, 'active'],
            }),
        ],
        devServer: {
            host: '0.0.0.0',
            hot: true,
            port: 3000,
            historyApiFallback: true,
        },
    };
};
