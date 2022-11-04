<template>
  <div class="bookmark-detail-container">
    <van-nav-bar
        :title="title"
        left-arrow
        :left-text="infoModel.title"
        @click-left="onBackClick()"
    />

    <van-form @submit="onSubmit">
      <!--书签cell-->
      <BookmarkCellIndex
          class="cell"
          :info-model="infoModel"
          :is-edit="isEdit"
          :disabled-field="false"
          ref="cell"
      />

      <!--位置选择-->
      <BookmarkLocalListIndex
          :info-model="currentFolderInfo"
          @selectedFolder="selectedFolder"
      />

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
        const infoModel = new BookmarkInfoModel()
        infoModel.title = document.title
        infoModel.url = location.href
        return infoModel
      }
    }
  },
  data() {
    return {
      title: this.isEdit ? '编辑书签' : '添加书签',
      currentFolderInfo: (() => {
        if (this.isEdit) {
          // 编辑模式，传入的是当前folder, 需要取值父级目录
          return BookmarkInfoModel.getSuperNode(BookmarkInfoModel.getRootTree(), this.infoModel.accessPath)
        } else {
          // 添加模式，传入的是当前目录
          return this.infoModel
        }

      })()
    };
  },
  mounted() {
    const rootTree = BookmarkInfoModel.getRootTree()
    if (!this.isEdit) {
      // 添加书签，下载icon
      this.getIconURL().then(res => {
        if (res) {
          this.infoModel.icon = res;
        } else {
          // 设置默认值
          this.infoModel.setupYueDurIcon()
        }
      })
    }
  },
  methods: {
    async getIconURL(urlPrefix = location.protocol + '//' + location.host) {
      const favicon =  urlPrefix + '/favicon.ico';
      const host = urlPrefix.replace(/http[s?]:\/\//, '')
      const apiFavicon = 'https://api.iowen.cn/favicon/' + host + '.png'

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
      if (this.isEdit
          && this.currentFolderInfo.id ==  BookmarkInfoModel.getSuperNode(BookmarkInfoModel.getRootTree(), this.infoModel.accessPath).id) {
        // 编辑状态下，只想改个名字而已
        this.infoModel.updateInfoModel((model) => {
          model.title = this.$refs.cell.title;
          model.url = this.$refs.cell.url;
          this.getIconURL(model.url).then(res => {
            if (res) {
              model.icon = res;
            } else {
              // 设置默认值
              model.setupYueDurIcon()
            }
          });
        })
      } else {
        // 改了存储路径或者非编辑状态下，相当于新建书签
        const infoModel =  new BookmarkInfoModel()
        infoModel.title = this.$refs.cell.title;
        infoModel.url = this.$refs.cell.url;
        if (this.isEdit) {
          // 编辑状态下
          infoModel.icon = this.infoModel.icon;
        } else {
          // 添加
          this.getIconURL(this.$refs.cell.url).then(res => {
            if (res) {
              infoModel.icon = res;
            } else {
              // 设置默认值
              infoModel.setupYueDurIcon()
            }
          })
        }
        this.currentFolderInfo.addSubmodel(infoModel)
      }
      this.$router.back()
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
.cell {
  margin: 16px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: auto;
}

/deep/ .cell .icon {
  flex-basis: 50px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  margin: 10px 15px 10px 20px;
}

/deep/ .icon .van-icon__image {
  height: 50px;
  width: 50px;
}
/deep/ .cell .van-cell  {
  padding: 10px 16px 10px 0px
}
/deep/ .cell .van-cell::after {
  border-bottom: 1px solid #ebedf0;
}
</style>