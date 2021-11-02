/**
 * * Webpack configuration
 * *
 * - For node and browser
 *  
 */

const path = require('path')

const config = {
    mode: 'production',
    entry: {
        main: './src/foreach-extra.ts',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    }
}

const serverConfig = {
    target: 'node',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'foreach-extra.node.js',
        libraryTarget: 'commonjs2',
    },
    ...config
}

const clientConfig = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'foreach-extra.js'
    },
    ...config
}

module.exports = [ clientConfig, serverConfig ]
