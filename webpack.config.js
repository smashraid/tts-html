const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    // Use env.<YOUR VARIABLE> here:
    //console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
    //console.log('Production: ', env.production); // true

    return {
        mode: 'development',
        entry: {
            index: './src/index.ts'
        },
        devtool: 'eval-source-map',
        devServer: {
            contentBase: './dist',
            hot: true,
            port: 3000
        },
        plugins: [
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
            new HtmlWebpackPlugin({
                title: 'Output Management',
                template: 'index.html'
            }),
        ],
        output: {
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',                            
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        { loader: 'style-loader' },
                        // loader:Translates CSS into CommonJS
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader', // Run postcss actions
                            options: {
                                plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            },
                        },
                        { loader: 'resolve-url-loader' },
                        // Compiles Sass to CSS
                        { loader: 'sass-loader' },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        performance: {
            hints: 'warning'
        },
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },

        }
    };
};