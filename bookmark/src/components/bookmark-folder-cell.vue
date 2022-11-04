<!--
  文件描述：
  创建时间：2022/11/3 09:57
  创建人：edy
  #
-->
<template>
  <div class="bookmark-folder-cell-container" @click="onCellClick">
    <van-cell
          :title="infoModel.title"
          class="folder-cell"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-icon
              :name="infoModel&&infoModel.isIconUseNamePorp() ? infoModel.icon : null"
              class="folder-icon folder-cell-selected"
              :class="[infoModel &&!infoModel.isIconUseNamePorp()&& infoModel.icon]"
          />
        </template>
      </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import BookmarkInfoModel from '../BookmarkInfoModel.js'

export default {
  name: "BookmarkFolderCellIndex",
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    infoModel: {
      required: true,
      type: BookmarkInfoModel,
    }
  },
  data() {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    onCellClick() {
      this.$emit('onCellClick', this.infoModel)
    }
  },
  // 监控data中的数据变化
  watch: {},
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
.bookmark-folder-cell-container {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.folder-cell {
  display: flex;
  align-items: center;
}
.van-cell__title {
  position: relative;
}
.folder-cell .van-cell__title::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0px;
  bottom: -12px;
  left: 0px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.folder-cell-selected {
  color: #99C5FD;
}
.van-cell {
  height: 48px;
  padding: unset;
}
.van-cell::after {
  left: 42px;
  right: 0px;
}
.folder-icon {
  margin: 0px 16px;
  height: 35px;
  width: 35px;
  font-size: 35px;
}
</style>