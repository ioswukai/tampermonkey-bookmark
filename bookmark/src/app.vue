<template>
  <div>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <!-- 图标位置 -->
    <van-popup
        v-model="show"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '30%' }"
    >内容</van-popup>
  </div>
</template>

<script>
import './app.less'

export default {
  data: function() {
    return {
      show: false
    }
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  }
}
</script>

<style scoped>
</style>
