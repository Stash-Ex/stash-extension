const isCssConfig = p => (Reflect.has(p, "options") &&Reflect.has(p.options, "filename") &&
p.options.filename && p.options.filename === "static/css/[name].[contenthash:8].css")

module.exports = {
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
        // console.log(JSON.stringify(webpackConfig, null, 4))
        return {
            ...webpackConfig,
            entry: {
                main: [env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
                background: './src/chromeServices/background.ts',
                walletProxy: './src/walletProxy/script.ts'
            },
            output: {
                ...webpackConfig.output,
                filename: 'static/js/[name].js',
            },
            optimization: {
                ...webpackConfig.optimization,
                runtimeChunk: false,
                splitChunks: {
                    chunks(chunk) {
                        return false
                    },
                },
            },
            plugins: [
                ...(webpackConfig.plugins.map(p => {
                    if (isCssConfig(p)) {
                        p.options.filename = "static/css/[name].css"
                        p.options.chunkFilename = "static/css/[name].chunk.css"
                    }
                    return p;
                }))
            ]
        }
    },
  }
}