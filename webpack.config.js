const path = require("path");

module.exports = {
  // 다른 설정...
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
    },
  },
};
