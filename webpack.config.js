const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        'main': '@js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@sass': path.resolve(__dirname, './sass'),
            '@js': path.resolve(__dirname, './js'),
        }
    },
    module: {
        rules: [
            {
                test: /\s?css$/,
				use: [MiniCssExtractPlugin.loader,
					'css-loader',
                    'sass-loader',
                    'postcss-loader'
				]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: { 
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(jpg|svg|gif|png)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
        new TerserWebpackPlugin()
	]
}