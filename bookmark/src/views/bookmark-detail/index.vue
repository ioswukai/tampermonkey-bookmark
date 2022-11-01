<template>
  <div class="bookmark-detail-container">
    <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        @click-left="onBackClick()"
    />

    <van-form @submit="onSubmit">
      <!--书签cell-->
      <BookmarkCellIndex
          :info-model="infoModel"
      />

      <!--位置选择-->
      <BookmarkLocalListIndex @selectedFolder="selectedFolder"/>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">存储</van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import BookmarkLocalListIndex from  "../../components/bookmark-local-list.vue";
import BookmarkCellIndex from  "../../components/bookmark-cell.vue";
import BookmarkInfoModel from '../../BookmarkInfoModel.js'

export default {
  name: "BookmarkDetail",
  // import引入的组件需要注入到对象中才能使用
  components: {
    BookmarkLocalListIndex,
    BookmarkCellIndex
  },
  data() {
    return {
      title: this.getEditState() ? '编辑书签' : '添加书签',
      currentFolderInfo: {
        type: BookmarkInfoModel,
        default: null
      },
      infoModel: function () {
        // if (this.getEditState()) {
        //   // 编辑书签
        //   return  this.$route.query.bookmarkInfo
        // } else {
          // 添加书签
          const infoModel = new BookmarkInfoModel()
          infoModel.title = document.title
          infoModel.url = location.href
          return infoModel
          return infoModel
        // }
      }(),
    };
  },
  mounted() {
    this.getIconURL().then(res => {
      if (res) {
        this.infoModel.icon = res;
      } else {
        // 设置默认值
        this.infoModel.setupYueDurIcon()
      }
    })
  },
  methods: {
    getEditState() {
      // 编辑
      if (this.$route.query.bookmarkInfo
          && this.$route.query.bookmarkInfo.title
          && this.$route.query.bookmarkInfo.url) return true;
      // 添加
      return false;
    },
    async getIconURL() {
      const urlPrefix = location.protocol + '//' + location.host;
      const favicon =  urlPrefix + '/favicon.ico';
      const apiFavicon = 'https://api.iowen.cn/favicon/' + location.host + '.png'

      // 直接取favicon
      if (await this.isImgURLValid(favicon)) {
        return  favicon
      };
      // 直接取不到时，用api取
      if (await this.isImgURLValid(apiFavicon)) {
        return apiFavicon
      };
      // 都取不到，返回null
      return null;
    },
     isImgURLValid(imgURL) {
      return new Promise(function(resolve, reject) {
        let ImgObj = new Image(); //判断图片是否存在
        ImgObj.src = imgURL;
        ImgObj.onload = function(res) {
          resolve(res);
        }
        ImgObj.onerror = function(err) {
          reject(err)
        }
      }).catch((e) => {}); // 加上这句不会报错（Uncaught (in promise)）
    },
    onBackClick() {
      this.$router.back()
    },
    onSubmit(values) {
        const infoModel =  new BookmarkInfoModel()
      {
        // TODO 写假数据
        infoModel.title = '谷歌'
        infoModel.url = 'https://www.google.com'
        infoModel.icon = 'https://www.google.com/favicon.ico'
      }
      this.currentFolderInfo.addSubmodel(infoModel)
    },
    selectedFolder(bookmarkInfoModel) {
      this.currentFolderInfo = bookmarkInfoModel
    }
  },
}
</script>

<style scoped>
.bookmark-detail-container {
  background: #f5f5f5;
  height: 100%;
}
</style>