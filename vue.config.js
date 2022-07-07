const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
  // 开启代理服务器1
  // devServer: {
  //   proxy: "http://localhost:8080",
  // },
  // devServer: {
  //   proxy: {
  //     "/v1_0": {
  //       target: "http://localhost:8000/",
  //       pathWrite: { "^/v1_0": "" },
  //       ws: true,
  //       changeOrigin: true,
  //     },
  //   },
  // },
})
