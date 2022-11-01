<template>
  <div class="home-container">
    <van-nav-bar
        title="书签"
        right-text="完成"
        @click-right="onCancelClick()"
    />
    <div class="list-content">

      <!--书签cell-->
      <BookmarkCellIndex
          v-for="item in folderDataSource"
          :key="item.id"
          :info-model="item" />
    </div>

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
import BookmarkCellIndex from  "../../components/bookmark-cell.vue";
import BookmarkInfoModel from '../../BookmarkInfoModel.js'

export default {
  name: "Home",
  // import引入的组件需要注入到对象中才能使用
  components: {
    BookmarkCellIndex
  },
  data() {
    return {
      folderDataSource: BookmarkInfoModel.getRootTree().listInFolder,
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