module.exports = {
    presets: [
        "@babel/preset-env"
    ],
    plugins: [
        // 在 .babelrc 或 babel-loader 中添加插件配置
        // 注意：webpack 1 无需设置 libraryDirectory
        ["import", {
            "libraryName": "vant",
            "libraryDirectory": "es",
            "style": true
        }]
    ]
};