<template>
  <van-nav-bar
      title="书签列表"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="$router.back()"
  />
</template>

<script>

export default {
  name: "BookmarkList"
}
</script>

<style scoped>

</style>