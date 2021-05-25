const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@ui-kitten/components", 
          "@toast-ui/react-image-editor"
        ],
      },
    },
    argv
  );
  return config;
};
