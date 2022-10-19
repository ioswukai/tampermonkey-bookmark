<template>
  <div class="home-container">
    <van-nav-bar
        title="书签"
        right-text="完成"
        @click-right="onCancelClick()"
    />

    <van-list
        class="list-content"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
    <div class="tool-bar">
      <span
          class="left-btn"
          @click="onLeftClick()"
      >添加书签</span>
      <span
          class="right-btn"
          @click="onRightClick()"
      >编辑</span>
    </div>
  </div>
</template>

<script>
import store from "../../utils/vuex-store";

export default {
  name: "Home",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLeftClick() {
      this.$router.push('/bookmark-detail')
    },
    onRightClick() {

    },
    onCancelClick() {
      store.commit('setIsListShow', false);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);

      // 加载状态结束
      // this.loading = false;
      // this.finished = true;
    },
  },
}
</script>

<style scoped>
.list-content {
  position: fixed;
  /*nav 高49*/
  top: calc(30vh + 49px);
  /*toolbar高是44*/
  bottom: 44px;
  width: 100%;
  overflow-y: auto;
}

.tool-bar {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  border-top: 0.5px solid #ededed;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.left-btn {
  font-size: 14px;
  color: #323233;
  padding: 11.5px 16px;
}
.right-btn {
  font-size: 14px;
  color: #323233;
  padding: 11.5px 16px;
}

</style>