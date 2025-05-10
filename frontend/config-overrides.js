const path = require("path");

module.exports = {
  webpack: function (config, env) {
    // Thêm alias vào đây
    config.resolve.alias = {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@resources": path.resolve(__dirname, "src/resources/"),
    };

    return config;
  },
};
