<!--
  文件描述：
  创建时间：2022/10/27 14:29
  创建人：edy
  #
-->
<template>
  <div class="bookmark-local-list-container">
    <van-cell
        :title="currentFolderInfo&&currentFolderInfo.title"
        class="folder-cell"
        @click="isLocalUnfold=!isLocalUnfold"
        v-if="!isLocalUnfold"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <van-icon
            :name="currentFolderInfo&&currentFolderInfo.isIconUseNamePorp&&currentFolderInfo.icon"
            class="folder-icon"
            :class="[isLocalUnfold && 'folder-cell-selected',
            currentFolderInfo && !currentFolderInfo.isIconUseNamePorp && currentFolderInfo.icon]"
        />
      </template>
    </van-cell>
    <div class="list" v-else>
      <van-cell
          class="folder-cell"
          v-for="(folderInfo, index) in folderDataSource"
          :title="folderInfo.title"
          :key="folderInfo.id"
          @click="didSelectCell(folderInfo)" >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-icon
              :name="folderInfo&&folderInfo.isIconUseNamePorp&&folderInfo.icon"
              class="folder-icon"
              :class="[folderInfo.id == currentFolderInfo.id && 'folder-cell-selected',
              folderInfo && !folderInfo.isIconUseNamePorp && folderInfo.icon]"
          />
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon
              name="success"
              class="duigou-icon folder-cell-selected"
              v-if="folderInfo.id == currentFolderInfo.id"
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import store from "../utils/vuex-store.js"
import BookmarkInfoModel from '../BookmarkInfoModel.js'

export default {
  name: 'BookmarkLocalListIndex',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    // patientIn: {
    //   type: Object,
    //   default () {
    //     return {}
    //   }
    // }
  },
  data() {
    // 这里存放数据
    return {
      folderDataSource: [],
      currentFolderInfo: null,
      isLocalUnfold:false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    didSelectCell(folderInfo) {
      this.currentFolderInfo = folderInfo
      this.isLocalUnfold = false
    },
    // 深拷贝
    cloneDeepObj(obj) {
      let str, newobj = obj.constructor === Array ? [] : {};
      if(typeof obj !== 'object'){
        return;
      } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
      } else {
        for(let i in obj){
          newobj[i] = typeof obj[i] === 'object' ?
              this.cloneDeepObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    // 遍历树结构
    mapTree(tree, func) {
      // 深度优先遍历树形结构 node当前节点  curTree当前树
      let node, curTree = this.cloneDeepObj(tree);
      // 遍历子节点
      while ((node = curTree.listInFolder.shift())) {
        // 调用回调
        func()
        node.listInFolder && curTree.listInFolder.unshift(...node.listInFolder)
      }
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 清空之前的数据
    this.folderDataSource.length = 0;
    const tree = store.state.bookmarkListData;
    // 添加根节点
    this.folderDataSource.unshift(tree)
    // 遍历树
    this.mapTree(tree, (node) => {
      // 添加子节点
      this.folderDataSource.push(node)
    });
    this.folderDataSource.forEach((node) => {
      console.log('path = ' + node.path)
      console.log(node)
      console.log('id = ' + node.id)

    })
    this.currentFolderInfo = this.folderDataSource[0]
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
.bookmark-local-list-container {
  background: white;
  margin: 16px;
  margin: 5px 16px 16px 16px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: auto;
}
.folder-cell-selected {
  color: #99C5FD;
}
.van-cell::after {
  left: 42px;
  right: 0px;
}
.folder-icon {
  font-size: 18px;
  line-height: inherit;
  margin-right: 8px;
}
.duigou-icon {
  font-size: 18px;
  line-height: inherit;
}

</style>