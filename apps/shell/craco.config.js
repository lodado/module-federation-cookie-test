const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Module Federation 플러그인 추가
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "shell",
          remotes: {
            remote1: "remote1@http://localhost:3001/remoteEntry.js",
            remote2: "remote2@http://localhost:3002/remoteEntry.js",
          },
          shared: {
            react: { singleton: true },
            "react-dom": { singleton: true },
          },
        })
      );

      // output 설정 수정
      webpackConfig.output.publicPath = "auto";

      return webpackConfig;
    },
  },
  devServer: {
    port: 3000,
  },
};
