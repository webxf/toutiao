<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      @click="addCommentlist"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentList } from '@/api/comment'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addCommentlist() {
      try {
        const { data } = await addCommentList({
          target: this.target,
          content: this.message,
          art_id: null
        })
        console.log(data)
        // 情况输入框
        this.message = ''
        this.$emit('update-input', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  .van-button {
    margin-bottom: 45px;
    width: 50px;
  }
}
</style>
