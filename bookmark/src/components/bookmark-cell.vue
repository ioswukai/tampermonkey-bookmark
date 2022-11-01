<!--
  文件描述：
  创建时间：2022/10/28 19:13
  创建人：edy
  #
-->
<template>
  <div class="bookmark-cell-container">
    <van-icon
        :name="function () {
          return infoModel&&(infoModel.isIconUseNamePorp()) ? infoModel.icon : null
        }()"
        :class="[infoModel&&(!infoModel.isIconUseNamePorp()) ? infoModel.icon : null]"
        class="icon"
        size="50"
    />
    <div class="fields-content">
      <van-field
          v-model="infoModel&&infoModel.title"
          placeholder="标题"
          :rules="[{ required: true, message: '请填写书签标题' }]"
      />
      <van-field
          v-model="infoModel&&infoModel.url"
          placeholder="网址"
          :rules="[{ required: true, message: '请填写网址' }]"
      />
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import BookmarkInfoModel from '../BookmarkInfoModel.js'

export default {
  name: "BookmarkCellIndex",
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    infoModel: {
      required: true,
      type: BookmarkInfoModel,
      default () {
        return null
      }
    }
  },
  data() {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {

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
.bookmark-cell-container {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: auto;
}
.icon {
  flex-basis: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 10px 15px 10px 20px;
}

.fields-content {
  flex: 1;
}
.fields-content .van-cell {
  padding: 10px 16px 10px 0px
}
.bookmark-cell-container .van-cell::after {
  left: 0px;
  right: 0px;
}

</style>