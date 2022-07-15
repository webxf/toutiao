<template>
  <van-icon
    :color="value ? '#ffa500' : ''"
    :name="value ? 'star' : 'star-o'"
    @click="collect"
    :loading="loading"
  />
  <!-- <van-icon color="#777" name="star-o" /> -->
</template>

<script>
import { addCollect, removeCollect } from '@/api/article'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async collect() {
      try {
        if (this.value) {
          // 取消收藏
          await removeCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '收藏失败')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
    }
  }
}
</script>

<style scope lang="less">
// .collected {
//   .van-icon {
//     color: #ffa500;
//   }
// }
</style>
