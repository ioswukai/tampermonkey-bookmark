<template>
  <div class="home-container">
    <van-popup
        class="pop-content"
        v-model:show="store.state.isListShow"
        position="bottom"
        :overlay="false"
        :style="{height: '70%'}"
        v-if="store.state.isListShow"
    >
      <!-- vue2.x配置 -->
      <keep-alive>
        <!-- 一级路由的出口 -->
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <!-- 一级路由的出口 -->
      <router-view v-if="!$route.meta.keepAlive"/>
    </van-popup>
    <div class="icon-container"
         v-else-if="store.state.isBookmarkShow">
      <van-icon
          class="icon"
          name="star"
          color="#1989fa"
          @click="onListShow()"
      />
      <span class="close" @click="onClose()">x</span>
    </div>
  </div>
</template>

<script>
import store from './utils/vuex-store'
// 手动按需导入
// import Popup from 'vant/lib/popup';
// import 'vant/lib/popup/style';
// import Icon from 'vant/lib/icon';
// import 'vant/lib/icon/style';

// 自动按需导入
import Vue from 'vue'
import {
  Popup,
  Icon,
  NavBar,
  Cell,
  Field,
  SwipeCell,
  Button,
  Form
} from 'vant';
Vue.use(Popup)
    .use(Icon)
    .use(NavBar)
    .use(Cell)
    .use(Field)
    .use(SwipeCell)
    .use(Button)
    .use(Form);

export default {
  name: 'App',
  data () {
    return {
      store: store,
    };
  },
  mounted() {
    // 显示书签
    this.onBookmarkShow();
  },
  components: {
    // 手动按需导入需要注册组件
    // 'van-popup': Popup,
    // 'van-icon': Icon
  },
  computed: {
  },
  methods: {
    onBookmarkShow() {
      store.commit('setIsBookmarkShow', true);
      store.commit('setIsListShow', false);
    },
    onListShow() {
      store.commit('setIsListShow', true);
    },
    onClose() {
      store.commit('setIsBookmarkShow', false);
      store.commit('setIsListShow', false);
    }
  }
}
</script>

<style scoped>
.pop-content {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
}
.icon-container {
  position: fixed;
  top: calc(50vh - 34px);
  left: 20px;
  background: white;
  width: 68px;
  height: 68px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}
.icon {
  font-size: 48px;
  line-height: 65px;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  background: lightgray;
  width: 18px;
  height: 18px;
  line-height: 15px;
  font-size: 14px;
  border-radius: 50%;
  margin-top: 1px;
  margin-right: 1px;
}
</style>
