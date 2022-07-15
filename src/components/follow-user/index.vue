<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onfollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onfollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addusers, deleteusers } from '@/api/user'
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onfollow() {
      this.loading = true
      try {
        if (this.value) {
          // 已关注，取消关注
          await deleteusers(this.userId)
        } else {
          // 未关注，点击关注
          await addusers(this.auserId)
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('input', !this.value)
      } catch (err) {
        const message = '关注失败'
        if (err.response && err.response.status === 400) {
          message = '你不能关注自己'
        }
        this.$toast('获取失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
