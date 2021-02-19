module.exports = {
  async rewrites() {
    return [
      {
        source: "/client.apk",
        destination: "/api/client.apk",
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
};
