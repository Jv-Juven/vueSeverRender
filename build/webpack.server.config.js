const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
/**
 * vue-ssr-webpack-plugin
 * 当明确使用webpack的代码分割（组件异步加载）功能时（使用require.ensure或者动态import），
 * 服务端渲染的打包会包含多个分开的文件。此插件将通过自动化打包这些分开的文件到一个单json文件，
 * 以提供给bundleRenderer使用，简化工作流。
 */
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = merge(base, {
  target: 'node', // 编译运行于node环境的代码
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    // 此设置参考：https://webpack.js.org/concepts/output/#output-librarytarget
    // 代码暴露方式为：module.exports = xxx
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  // 详细用法请参考：https://github.com/zhengweikeng/blog/issues/10
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
})
