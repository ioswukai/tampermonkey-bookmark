import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from './storage'
import StoreKey from './store-key'

Vue.use(Vuex)

export default new Vuex.Store({
  // 初始化数据
  state: {
    isBookmarkShow: getItem(StoreKey.isBookmarkShow),
    isListShow: getItem(StoreKey.isListShow),
    bookmarkListData: getItem(StoreKey.bookmarkListData),
  },
  // 修改数据，永远通过mutations修改数据，可响应式
  mutations: {
    setIsBookmarkShow (state, data) {
      state.isBookmarkShow = data
      setItem(StoreKey.isBookmarkShow, state.isBookmarkShow)
    },
    setIsListShow (state, data) {
      state.isListShow = data
      setItem(StoreKey.isListShow, state.isListShow)
    },
    setBookmarkListData (state, data) {
      state.bookmarkListData = data
      setItem(StoreKey.bookmarkListData, state.bookmarkListData)
    },
  },
  actions: {
  },
  modules: {
  }
})
