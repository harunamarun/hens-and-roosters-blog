/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
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
        use: [
          "style-loader",
          {
            loader: "css-loader?modules",
            options: {
              modules: {
                localIdentName: "[name]-[local]-[hash:base64:5]",
              },
            },
          },
        ],
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
    new webpack.EnvironmentPlugin([
      "BACKEND_URL",
      "AZURE_KEY",
      "GIPHY_KEY",
      "NEWS_URL",
    ]),
  ],
  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000,
  },
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
