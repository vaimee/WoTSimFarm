const path = require("path")
const html = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { EnvironmentPlugin } = require("webpack");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
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
    new VueLoaderPlugin(),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'css', 'html', 'typescript']  
    })
  ],
  module: {
    rules: [
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
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.html?$/,
        loader: "html-loader",
        options: {
          attributes : false
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(ttf)|(woff)|(woff2)|(eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            },
          },
        ]
      }
    ],
  },
};