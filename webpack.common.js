const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const DotEnv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
      {
        test: /\.(png|jpg|gif|mp4|jpeg)$/,
        type: "asset",
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "esbuild-loader",
            options: {
              loader: "css",
              minify: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: "/",
    filename: "[name].[chunkhash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      hash: true,
      favicon: path.resolve(__dirname, "public", "favicon.ico"), 
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new DotEnv(),
  ],
};
