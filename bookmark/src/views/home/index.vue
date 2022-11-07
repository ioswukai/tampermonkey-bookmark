<template>
  <div class="home-container">
    <van-nav-bar
        title="书签"
        :left-text="infoModel.id == rootInfoModel.id ? '' : infoModel.title"
        :right-text="isEdit ? '' : '完成'"
        :left-arrow="infoModel.id != rootInfoModel.id"
        @click-right="onCancelClick"
        @click-left="onBackClick"
    />

    <!-- 列表-->
    <BookmarkListIndex
        :info-model="infoModel"
        @onCellClick="onCellClick"
        ref="list"
    />

    <div class="tool-bar">
      <span
          class="left-btn"
          @click="onLeftClick()"
      >{{this.leftBtnTitle}}</span>
      <span
          class="right-btn"
          :class="{'edit-btn-color': isEdit}"
          @click="onRightClick()"
      >{{this.rightBtnTitle}}</span>
    </div>
  </div>
</template>

<script>
import store from "../../utils/vuex-store";
import BookmarkListIndex from  "../../components/bookmark-list.vue";
import BookmarkInfoModel from "../../BookmarkInfoModel";

export default {
  name: "Home",
  // import引入的组件需要注入到对象中才能使用
  components: {
    BookmarkListIndex,
  },
  data() {
    return {
      title: "书签",
      rootInfoModel: BookmarkInfoModel.getRootTree(),
      infoModel: BookmarkInfoModel.getRootTree(),
      leftBtnTitle: '添加书签',
      rightBtnTitle: '编辑',
      isEdit: false
    };
  },
  // 监控data中的数据变化
  watch: {
    isEdit: function (val) {
      this.$refs.list.setCellCanSwipeDelete(val)
    },
  },
  methods: {
    onLeftClick() {
      if (this.isEdit) {
        // 添加文件件
        this.$router.push({
          name: 'bookmark-folder-detail',
          params: {
            infoModel: (() => {
              return this.infoModel
            })()
          }
        })
      } else {
        // 添加书签
        this.$router.push({
          name:'bookmark-detail',
          params: {
            infoModel: (() => {
              return this.infoModel
            })()
          }
        })
      }
    },
    onRightClick() {
      this.isEdit = !this.isEdit
      if (this.isEdit) {
        this.leftBtnTitle = "添加文件夹"
        this.rightBtnTitle = "完成"
      } else {
        this.leftBtnTitle = "添加书签"
        this.rightBtnTitle = "编辑"
      }
    },
    onBackClick() {
      if (this.infoModel.id == this.rootInfoModel.id) {
        // 取消当前弹框
        this.onCancelClick();
      } else {
        // 回退上级节点
        this.infoModel = BookmarkInfoModel.getSuperNode(this.rootInfoModel, this.infoModel.accessPath)
        // 强制list刷新
        this.$refs.list.refreshData(this.infoModel)
      }
    },
    onCancelClick() {
      store.commit('setIsListShow', false);
    },
    onCellClick(infoModel) {
      if (!infoModel) {return}

      if (this.isEdit) {
        // 编辑状态
        const name = infoModel.isFolder() ? 'bookmark-folder-detail' : 'bookmark-detail';
        const isEdit = this.isEdit
        this.$router.push({
          name,
          params: {
            infoModel,
            isEdit
          }
        })
      } else  {
        // 常规状态
        if (infoModel.isFolder()){
          // 文件夹
          this.infoModel = infoModel
          // 强制list刷新
          this.$refs.list.refreshData(this.infoModel)
        } else {
          // 书签 当前窗口打开书签
          window.open(infoModel.url,'_self')
        }
      }
    }
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
.edit-btn-color {
  color: #1989fa;
}


</style>