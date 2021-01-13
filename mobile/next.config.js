const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const { withPlugins, optional } = require("next-compose-plugins");

const nextConfiguration = {
  assetPrefix: ".",
};

module.exports = withPlugins([
  [
    optional(() =>
      require("next-transpile-modules")(["@area-common/components"])
    ),
    nextConfiguration,
    [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],
  ],
]);
