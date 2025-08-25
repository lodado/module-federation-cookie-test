const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 3000,
  },
  output: {
    publicPath: "auto", // Docker 컨테이너에서는 항상 auto 사용
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        // Docker 환경에서는 개발/프로덕션 모두 동일한 포트 사용
        remote1: "remote1@http://localhost:3001/remoteEntry.js",
        remote2: "remote2@http://localhost:3002/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
