const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 3004,
  },
  output: {
    publicPath: process.env.NODE_ENV === "production" ? "/auth/" : "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
