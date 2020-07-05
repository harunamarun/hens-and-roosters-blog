/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },

      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader?modules"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
    }),
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(["BACKEND_URL"]),
  ],
  devServer: {
    contentBase: `${__dirname}/dist`,
    compress: true,
    host: "0.0.0.0",
    port: 8080,
    watchContentBase: true,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
};
