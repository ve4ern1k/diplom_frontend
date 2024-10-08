const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://127.0.0.1:2509'
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/'
})
