import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, StoreKey } from './storage'
import BookmarkInfoModel from "../BookmarkInfoModel";

Vue.use(Vuex)

export default new Vuex.Store({
  // 初始化数据
  state: {
    isBookmarkShow: getItem(StoreKey.isBookmarkShow),
    isListShow: getItem(StoreKey.isListShow),
    bookmarkListData: function () {
      // 反序列化后是一个普通的对象
      const treeJson = getItem(StoreKey.bookmarkListData)
      if (treeJson) {
        return BookmarkInfoModel.modelWithDic(treeJson)
      } else {
        const rootTree = BookmarkInfoModel.createRootTree()
        setItem(StoreKey.bookmarkListData, rootTree)
        return rootTree
      }
    }()
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
