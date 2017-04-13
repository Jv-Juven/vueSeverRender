const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base, {
  // resolve: {
  //   alias: {
  //     'create-api': './create-api-client.js'
  //   }
  // },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    // 为了更好地缓存所有模块的公共代码部分，将公共代码部分提取出来（在之前为运行时代码runtime），但是提取出来的
    // 公共代码名字（后缀哈希值）会随着每次打包（即使改的不是公共代码）而改变。
    // 参考：https://www.zhihu.com/question/31352596
    // 将webpack的runtime代码抽取为manifest（公共代码清单），避免公共代码（vendor chunk）的哈希值在每次编译代码时变化
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // auto generate service worker
    // 缓存数据，拦截浏览器请求，校验及提供命中缓存的数据
    // 一个使用服务端进程（service workers）缓存你项目外部依赖的webpack插件，将使用sw-precache生成一个服务端进程文件，并放入到构建好的生产包目录里。
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = config
