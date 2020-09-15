const path = require("path")
const html = require("html-webpack-plugin")
var HtmlWebpackSkipAssetsPlugin = require("html-webpack-skip-assets-plugin").HtmlWebpackSkipAssetsPlugin;

module.exports = {
  entry: {
    app: "./src/farm.ts",
  },
  module: {
    noParse: /browser-bundle/,
  },
  output: {
    path: path.resolve(__dirname, "../dist/frontend"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  plugins: [
    new html({
      template: "src/index.html",
    }),
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
      },
    ],
  },
};