const fs = require("fs");
const { sources } = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  const newConfiguration = {
    plugins: [
      ...config.plugins,
      new (class CopySkiaPlugin {
        apply(compiler) {
          compiler.hooks.thisCompilation.tap("AddSkiaPlugin", (compilation) => {
            compilation.hooks.processAssets.tapPromise(
                {
                  name: "copy-skia",
                  stage:
                  compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                },
                async () => {
                  const src = require.resolve(
                      "canvaskit-wasm/bin/full/canvaskit.wasm"
                  );
                  if (compilation.getAsset(src)) {
                    return;
                  }

                  compilation.emitAsset(
                      "/canvaskit.wasm",
                      new sources.RawSource(await fs.promises.readFile(src))
                  );
                }
            );
          });
        }
      })(),
      new NodePolyfillPlugin(),
    ],
    externals: {
      ...config.externals,
      "react-native-reanimated": "require('react-native-reanimated')",
      "react-native-reanimated/package.json": "require('react-native-reanimated/package.json')",
    },
    resolve: {
      fallback: {
        "fs": require.resolve("browserify-fs"),
      },
    },
  };

  // Merge the new configurations with the existing config.
  const mergedConfig = {
    ...config,
    ...newConfiguration,
    plugins: [...config.plugins, ...newConfiguration.plugins],
    externals: {...config.externals, ...newConfiguration.externals},
    resolve: {...config.resolve, ...newConfiguration.resolve},
  };

  // Customize the config before returning it.
  return mergedConfig;
};
