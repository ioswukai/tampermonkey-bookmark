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
        <i class="bookmark bookmark-yuedu icon"></i>
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

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">存储</van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
export default {
  name: "BookmarkDetail",
  data() {
    return {
      // true: 编辑已有书签 false：添加新书签
      isEdit:  this.getEditState(),
      title: this.getEditState() ? '编辑书签' : '添加书签',
      bookmarkTitle: this.getEditState() ? this.$route.query.bookmarkInfo.title : document.title,
      bookmarkURL: this.getEditState() ? this.$route.query.bookmarkInfo.URL : location.href,
    };
  },
  mounted() {
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
    onBackClick() {
      this.$router.back()
    },
    onSubmit(values) {
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
  font-size: 50px;
  margin: 10px 15px 10px 20px;
}

.fields-content {
  flex: 1;
}
.fields-content .van-cell {
  padding: 10px 16px 10px 0px
}
.fields-content .van-cell::after {
  left: 0px;
  right: 0px;
}
</style>