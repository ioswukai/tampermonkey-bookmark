<template>
  <div class="home-container">
    <van-popup
        class="pop-content"
        v-model:show="store.state.isListShow"
        position="bottom"
        :overlay="true"
        :style="{height: '70%'}"
        v-if="store.state.isListShow"
    >
      <!-- 一级路由的出口 -->
      <router-view />
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
pop-content {

}
.icon-container {
  position: relative;
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
