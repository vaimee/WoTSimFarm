const path = require("path")
const html = require("html-webpack-plugin")
module.exports = {
    entry: {
        app: './src/farm.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist/frontend'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new html({
            template:"src/index.html"
        })
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        },{
            test: /\.html?$/,
            loader: 'html-loader'
        }]
    }
}