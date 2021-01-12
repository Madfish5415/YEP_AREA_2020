const withPlugins = require('next-compose-plugins');
const withTM = require("next-transpile-modules")(["@area-common/components"]);

module.exports = withPlugins([withTM], {
  assetPrefix: ".",
});
