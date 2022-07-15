<template>
  <van-icon
    :color="value === 1 ? '#ffa500' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="collect"
    :loading="loading"
  />
</template>

<script>
import { addLike, removeLike } from '@/api/article'
export default {
  props: {
    value: {
      type: Number,
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
      this.loading = true

      try {
        let status = -1
        if (this.value === 1) {
          // 假如已经点赞，则取消点赞
          await removeLike(this.articleId)
        } else {
          // 没有点赞，则点赞
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('点赞失败')
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
