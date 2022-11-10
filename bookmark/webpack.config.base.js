const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    app: '/src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules下的文件，其他文件都处理
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
