const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack")

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer"),
      }
    },
    plugins: [new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })]
  }
})