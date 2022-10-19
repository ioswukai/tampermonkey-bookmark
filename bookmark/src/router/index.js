// vue2.x 创建路由
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'
import BookmarkList from '../views/bookmark-list/index.vue'
import BookmarkDetail from '../views/bookmark-detail/index.vue'
import BookmarkFolderDetail from '../views/bookmark-folder-detail/index.vue'

// 这里要使用Router
Vue.use(Router)

const routes = [
    { // 首页
        name: ' home',
        path: '/', // 根页面
        component: Home,
    },
    { // 书签列表
        name: 'bookmark-list',
        path: '/bookmark-list',
        component: BookmarkList,
    },
    { // 书签详情
        name: 'bookmark-detail',
        path: '/bookmark-detail',
        component: BookmarkDetail,
    },
    { // 书签文件夹详情
        name: 'bookmark-folder-detail',
        path: '/bookmark-folder-detail',
        component: BookmarkFolderDetail,
    }
]

export default new Router({
    routes
})
