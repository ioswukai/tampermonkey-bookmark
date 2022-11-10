import Vue from 'vue'
import App from './app.vue'
// 导入router设置
import router from './router'
// 导入icon
import './icon.less'

const wokooApp = document.createElement('div')
wokooApp.id = 'wokooApp-bookmark-35561'
document.body.appendChild(wokooApp)
const vm = new Vue({
  el: wokooApp,
  render: (h) => h(App),
  // 这里需导入router
  router
})
