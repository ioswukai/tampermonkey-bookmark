/**
 * 封装本地存储操作模板
 */

/**
 * 存储
 */
export const setItem = (key, value) => {
  // 存储数组，或对象 转换为JSON格式字符串存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 可解析就解析
    return JSON.parse(data)
  } catch (err) {
    // 不可则返回原始数据
    return data
  }
}

/**
 * 删除
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/**
 * 存储和访问localStorage中元素的key
 */
export const StoreKey = {
  /**
   * 显示书签icon
   */
  isBookmarkShow: 'IS_BOOKMARK_SHOW',
  /**
   * 显示书签列表
   */
  isListShow: 'IS_LIST_SHOW',
  /**
   * 书签列表数据
   */
  bookmarkListData: 'BOOKMARK_LIST_DATA',
}