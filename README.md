# vueServerRender
##### 参考 [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

## 搭建

**需要版本 Node.js 6+**

``` bash
# 安装依赖
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## 特性

> + 使用`axios`结合`vuex`做服务端渲染（可能需要对`axios`于客户端和服务端做差异性处理，服务端的`axios`没有相关浏览器行为，如携带cookie）
