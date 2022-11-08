<!--
  文件描述：
  创建时间：2022/11/3 11:49
  创建人：edy
  #
-->
<template>
  <div class="bookmark-list-container">
    <div
        class="cell-item"
        v-for="item in folderDataSource"
        :key="item.id">

      <van-swipe-cell
          ref="swipeCell"
          :disabled="!canSwipeDelete"
          @click="onSwipeCellClick($event, item)"
      >
        <!--文件夹cell-->
        <BookmarkFolderCellIndex
            @onCellClick="onCellClick"
            :info-model="item"
            v-if="item.isFolder()"
        />
        <!--书签cell-->
        <BookmarkCellIndex
            @onCellClick="onCellClick"
            :info-model="item"
            v-else
        />
        <template #right v-if="canSwipeDelete">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import BookmarkInfoModel from '../BookmarkInfoModel.js'
import BookmarkFolderCellIndex from './bookmark-folder-cell.vue'
import BookmarkCellIndex from './bookmark-cell.vue'

export default {
  name: "BookmarkListIndex",
  // import引入的组件需要注入到对象中才能使用
  components: {
    BookmarkFolderCellIndex,
    BookmarkCellIndex
  },
  props: {
    infoModel: {
      required:true,
      type: BookmarkInfoModel,
    }
  },
  data() {
    // 这里存放数据
    return {
      folderDataSource: this.infoModel.listInFolder.map((info) => {
        // 把object类型的书签，转化成BookmarkInfoModel类型
        return BookmarkInfoModel.modelWithDic(info,false);
      }),
      canSwipeDelete: true,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    setCellCanSwipeDelete(canSwipeDelele) {
      this.canSwipeDelete = canSwipeDelele
      this.$refs.swipeCell.forEach((el) => {
        // 关闭当前打开的
        el.close()
      });
    },
    refreshData(infoModel) {
      this.folderDataSource = infoModel.listInFolder.map((info) => {
        // 把object类型的书签，转化成BookmarkInfoModel类型
        return BookmarkInfoModel.modelWithDic(info,false);
      })
    },
    onCellClick(infoModel) {
      this.$emit('onCellClick', infoModel)
    },
    onSwipeCellClick(position, infoModel) {
      // 非删除不操作
      if (position != 'right') return
      // 找到当前模型的索引
      const idx = this.folderDataSource.findIndex((node) => {
        return node.id == infoModel.id
      });
      // 删除当前索引对应的对象
      this.folderDataSource.splice(idx, 1)
      // 删除本地存储数据
      infoModel.removeFromFolder()
    }
  },
  // 监控data中的数据变化
  watch: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {
  }, // 生命周期 - 创建之前
  beforeMount() {
  }, // 生命周期 - 挂载之前
  beforeUpdate() {
  }, // 生命周期 - 更新之前
  updated() {
  }, // 生命周期 - 更新之后
  beforeDestroy() {
  }, // 生命周期 - 销毁之前
  destroyed() {
  }, // 生命周期 - 销毁完成
  activated() {
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped lang="less">
//@import url(); 引入公共css类

// 容器
.bookmark-list-container {
  position: fixed;
  /*nav 高49*/
  top: calc(30vh + 49px);
  /*toolbar高是44*/
  bottom: 44px;
  width: 100%;
  overflow-y: auto;
}

</style>