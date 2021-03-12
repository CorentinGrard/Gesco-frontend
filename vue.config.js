module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        ws: true,
        pathRewrite: {
          '^/api/': '/',
        },
      },
    }
  }
}