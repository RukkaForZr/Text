import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store';
import '../static/weui/weui.css'
import Fly from 'flyio/dist/npm/wx'
Vue.config.productionTip = false;
App.mpType = 'app';

/**
 * 请求配置
 */
var fly = new Fly()
fly.config.baseURL = process.env.API_HOST
fly.interceptors.request.use((req, promise) => {
  wx.showLoading({
    title: '加载中'
  })
  // 给所有请求添加自定义header
  req.headers['content-type'] = 'application/json;charset=utf-8'
  return req
})
// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(response => {
  wx.hideLoading();
  if (response.data && response.data && response.status === 200) return response.data
}, err => {
  // 发生网络错误后会走到这里
  wx.hideLoading()
  wx.showToast({
    title: '请求出错：' + err.status,
    icon: 'none',
    duration: 3000
  })
  return Promise.reject(err)
})
Vue.prototype.$http = fly;




Vue.prototype.$store = store;
const app = new Vue({
  App
})
app.$mount();
