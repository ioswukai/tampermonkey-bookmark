<!--
  文件描述：
  创建时间：2022/11/3 11:49
  创建人：edy
  #
-->
<template>
  <div class="bookmark-list-container">
    <!--使用draggable组件-->
    <draggable
        v-model="folderDataSource"
        chosenClass="chosen"
        handle=".bookmark-move"
        animation="300"
        @start="onStart"
        @end="onEnd">
      <transition-group>
        <van-swipe-cell
            ref="swipeCell"
            v-for="item in folderDataSource"
            :key="item.id"
            :disabled="!canSwipeDelete"
            @click="onSwipeCellClick($event, item)"
        >
          <div class="cell-container">
            <i class="bookmark bookmark-jianhao"
               @click="deleteBookmark(item)"
               v-if="!canSwipeDelete"
            />
            <!--文件夹cell-->
            <BookmarkFolderCellIndex
                class="cell-content"
                :class="{'cell-margin-left-zero': !canSwipeDelete}"
                @onCellClick="onCellClick"
                :info-model="item"
                v-if="item.isFolder()"
            />
            <!--书签cell-->
            <BookmarkCellIndex
                class="cell-content"
                :class="{'cell-margin-left-zero': !canSwipeDelete}"
                @onCellClick="onCellClick"
                :info-model="item"
                v-else
            />
            <i class="bookmark bookmark-move"
               v-if="!canSwipeDelete"
            />
          </div>
          <template #right v-if="canSwipeDelete">
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </transition-group>
    </draggable>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import BookmarkInfoModel from '../BookmarkInfoModel.js'
import BookmarkFolderCellIndex from './bookmark-folder-cell.vue'
import BookmarkCellIndex from './bookmark-cell.vue'
//导入draggable组件
import draggable from 'vuedraggable'

export default {
  name: "BookmarkListIndex",
  // import引入的组件需要注入到对象中才能使用
  // 注册draggable组件
  components: {
    BookmarkFolderCellIndex,
    BookmarkCellIndex,
    draggable
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
      this.deleteBookmark(infoModel)
    },
    deleteBookmark(infoModel) {
      // 找到当前模型的索引
      const idx = this.folderDataSource.findIndex((node) => {
        return node.id == infoModel.id
      });
      // 删除当前索引对应的对象
      this.folderDataSource.splice(idx, 1)
      // 删除本地存储数据
      infoModel.removeFromFolder()
    },
    onStart(arg){
      // console.log('开始拖拽事件')
      // console.log(arg)
    },
    onEnd(arg) {
      // console.log('拖拽结束事件')
      // console.log(arg)
      const {newIndex, oldIndex} = arg
      // 修改本地存储数据的顺序
      this.infoModel.swapSubmodels(newIndex, oldIndex)
    },
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
.cell-container {
  display: flex;
  justify-content: stretch;
  align-items: center;
}
.cell-content {
  flex: 1;
}
/deep/ .cell-margin-left-zero .icon {
  margin-left: 0px;
}
/deep/ .cell-margin-left-zero .folder-icon {
  margin-left: 0px;
}
.bookmark-jianhao {
  flex-basis: 52px;
  color: red;
  font-size: 20px;
  text-align: center;
}
.bookmark-move {
  flex-basis: 52px;
  color: #999;
  font-size: 20px;
  text-align: center;
  // 设置可被draggable 拖拽
  cursor: move;
}
.btn {
  flex-basis: 60px;
}
/*选中边框的样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
</style>