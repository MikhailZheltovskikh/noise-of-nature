const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new ESLintPlugin({
            context: './src',
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            exclude: ['node_modules', 'dist'],
        }),
    ],
    devServer: {
        port: 3001,
        hot: true,
        open: true,
    },
});
