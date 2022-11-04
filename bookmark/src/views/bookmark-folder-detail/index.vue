<!--
  文件描述：
  创建时间：2022/11/2 17:12
  创建人：edy
  #
-->
<template>
  <div class="bookmark-folder-detail-container">
    <!-- 导航栏 -->
    <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        @click-left="onBackClick()"/>

    <van-form @submit="onSubmit">

      <van-field
          class="fields-content"
          v-model="fieldsText"
          placeholder="标题"
          :rules="[{ required: true, message: '请填写文件夹标题' }]"
      />

      <!--位置选择-->
      <BookmarkLocalListIndex
          :info-model="infoModel"
          @selectedFolder="selectedFolder"/>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">存储</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import BookmarkLocalListIndex from  "../../components/bookmark-local-list.vue";
import BookmarkInfoModel from '../../BookmarkInfoModel.js'

export default {
  name: "BookmarkFolderDetailIndex",
  // import引入的组件需要注入到对象中才能使用
  components: {
    BookmarkLocalListIndex
  },
  props: {
    isEdit: {
      type: Boolean,
      default() {
        return false
      }
    },
    infoModel: {
      type: BookmarkInfoModel,
      default() {
        return BookmarkInfoModel.getRootTree()
      }
    }
  },
  data() {
    // 这里存放数据
    return {

      title: this.isEdit ? '编辑文件夹' : '添加文件夹',
      currentFolderInfo: {
        type: BookmarkInfoModel,
        default: this.infoModel
      },
      fieldsText: this.isEdit ? this.infoModel.title : null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    onBackClick() {
      this.$router.back()
    },
    onSubmit(values) {
      // 编辑
      if (this.isEdit && this.currentFolderInfo.id == this.infoModel.id) {
          // 编辑状态下，只想改个名字而已
        this.infoModel.updateInfoModel((model) => {
          model.title = this.fieldsText
        })
      } else {
          // 改了存储路径或者非编辑状态下，相当于新建文件夹
        const infoModel =  new BookmarkInfoModel()
        infoModel.title = this.fieldsText
        infoModel.setupFolderIcon()
        this.currentFolderInfo.addSubmodel(infoModel)
      }
      this.$router.back()
    },
    selectedFolder(bookmarkInfoModel) {
      this.currentFolderInfo = bookmarkInfoModel
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
.bookmark-folder-detail-container {
  background: #f5f5f5;
  height: 100%;
}
.fields-content {
  margin: 16px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: auto;
}

.van-form .van-cell {
  width: unset;
}
</style>