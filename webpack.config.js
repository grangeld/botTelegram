const path = require('path');
const nodeExternals = require('webpack-node-externals');

const webpackConfig = {
    entry: './src/index.ts',
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ts-loader'},
        ],
    },
};

webpackConfig.externals = [nodeExternals()];

module.exports = webpackConfig;
