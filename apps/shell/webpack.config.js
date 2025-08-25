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
    publicPath: "auto",
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
        remote1:
          process.env.NODE_ENV === "production"
            ? "remote1@/remote1/remoteEntry.js"
            : "remote1@http://localhost:3001/remoteEntry.js",
        remote2:
          process.env.NODE_ENV === "production"
            ? "remote2@/remote2/remoteEntry.js"
            : "remote2@http://localhost:3002/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
