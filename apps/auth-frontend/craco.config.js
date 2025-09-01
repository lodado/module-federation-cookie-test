module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // output 설정 수정
      webpackConfig.output.publicPath =
        process.env.NODE_ENV === "production" ? "/auth/" : "auto";
      return webpackConfig;
    },
  },
  devServer: {
    port: 3004,
  },
};

