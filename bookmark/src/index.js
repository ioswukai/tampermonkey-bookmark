import Vue from 'vue'
import App from './app.vue'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

const wokooApp = document.createElement('div')
wokooApp.id = 'wokooApp-bookmark-35561'
document.body.appendChild(wokooApp)
const vm = new Vue({
  el: wokooApp,
  render: (h) => h(App),
})
