const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Module Federation 플러그인 추가
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "remote1",
          filename: "remoteEntry.js",
          exposes: {
            "./CookieValue": "./src/CookieValue",
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
    port: 3001,
  },
};

