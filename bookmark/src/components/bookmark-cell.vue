<!--
  文件描述：
  创建时间：2022/10/28 19:13
  创建人：edy
  #
-->
<template>
  <div class="bookmark-cell-container" @click="onCellClick">
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
          v-model="title"
          placeholder="标题"
          :disabled="disabledField"
          :rules="[{ required: true, message: '请填写书签标题' }]"
      />
      <van-field
          v-model="url"
          placeholder="网址"
          :disabled="disabledField"
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
    },
    disabledField: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data() {
    // 这里存放数据
    return {
      title: this.infoModel&&this.infoModel.title,
      url: this.finalURL()
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    onCellClick() {
      this.$emit('onCellClick', this.infoModel)
    },
    finalURL() {
      let url = this.infoModel&&this.infoModel.url

      // 不存在，返回null
      if (url == false) { return url }

      // 去掉#/bookmark-detail相关的内容
      const idx = url.lastIndexOf('/#/bookmark-detail')
      if (idx != -1) {
        url = url.substr(0, idx)
      }
      return url
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
.bookmark-cell-container {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  flex-basis: 30px;
  height: 35px;
  width: 35px;
  line-height: 35px;
  font-size: 35px;
  text-align: center;
  margin: 0px 16px;
}
.icon .van-icon__image {
  height: 35px;
  width: 35px;
}
.bookmark-yuedu::before {
  font-size: 35px;
}
.fields-content {
  position: relative;
  flex: 1;
  padding: 8px 0px;
}
.fields-content::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.fields-content .van-cell {
  line-height: 16px;
  padding: 0px 16px 0px 0px
}
/deep/ .fields-content .van-field__control:disabled  {
  -webkit-text-fill-color: #323233;
}
.bookmark-cell-container .van-cell::after {
  left: 0px;
  right: 0px;
  border-bottom: none;
}


</style>