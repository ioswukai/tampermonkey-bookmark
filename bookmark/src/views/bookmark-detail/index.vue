<template>
  <div class="bookmark-detail-container">
    <van-nav-bar
        :title="title"
        left-arrow
        left-text="返回"
        @click-left="onBackClick()"
    />

    <van-form @submit="onSubmit">
      <div class="header">
        <van-icon
            :name="bookmarkIcon"
            :class="[bookmarkIcon ? null : 'bookmark bookmark-yuedu']"
            class="icon"
            size="50"
        />
        <div class="fields-content">
          <van-field
              v-model="bookmarkTitle"
              placeholder="标题"
              :rules="[{ required: true, message: '请填写书签标题' }]"
          />
          <van-field
              v-model="bookmarkURL"
              placeholder="网址"
              :rules="[{ required: true, message: '请填写网址' }]"
          />
        </div>
      </div>

      <!--位置选择-->
      <div class="local-title">位置</div>
      <BookmarkLocalListIndex @selectedFolder="selectedFolder"/>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">存储</van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import BookmarkLocalListIndex from  "../../components/bookmark-local-list.vue";
import store from "../../utils/vuex-store.js"
import BookmarkInfoModel from '../../BookmarkInfoModel.js'

export default {
  name: "BookmarkDetail",
  // import引入的组件需要注入到对象中才能使用
  components: {
    BookmarkLocalListIndex
  },
  data() {
    return {
      // true: 编辑已有书签 false：添加新书签
      isEdit:  this.getEditState(),
      title: this.getEditState() ? '编辑书签' : '添加书签',
      bookmarkTitle: this.getEditState() ? this.$route.query.bookmarkInfo.title : document.title,
      bookmarkURL: this.getEditState() ? this.$route.query.bookmarkInfo.URL : location.href,
      bookmarkIcon: null,
      currentFolderInfo: {
        type: BookmarkInfoModel,
        default: null
      },
    };
  },
  mounted() {
    this.getIconURL().then(res => {
      this.bookmarkIcon = res;
    })
  },
  methods: {
    getEditState() {
      // 编辑
      if (this.$route.query.bookmarkInfo
          && this.$route.query.bookmarkInfo.title
          && this.$route.query.bookmarkInfo.URL) return true;
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
      console.log(values)
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
.header {
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
.header .van-cell::after {
  left: 0px;
  right: 0px;
}
.local-title {
  margin-left: 32px;
  font-size: 10px;
  color: #999;
}
</style>