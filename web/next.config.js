module.exports = {
  async rewrites() {
    return [
      {
        source: "/client.apk",
        destination: "/api/client.apk",
      },
    ];
  },
};
