const path = require("path")
const html = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { EnvironmentPlugin } = require("webpack");
var HtmlWebpackSkipAssetsPlugin = require("html-webpack-skip-assets-plugin").HtmlWebpackSkipAssetsPlugin;

module.exports = {
  entry: {
    app: "./src/farm.ts",
  },
  devServer: {
    port: 80
  },
  module: {
    noParse: /browser-bundle/,
  },
  output: {
    path: path.resolve(__dirname, "../dist/frontend"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devtool: "source-map",
  plugins: [
    new html({
      template: "src/index.html",
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        loader: "html-loader",
        options: {
          attributes : false
        }
      },
      //@see https://github.com/microsoft/TypeScript-Vue-Starter
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ],
  },
};