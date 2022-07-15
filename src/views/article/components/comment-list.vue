<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <CommentItem v-for="(item, index) in list" :key="index" :comment="item" />
  </van-list>
</template>

<script>
import { addComment } from '@/api/comment'
import CommentItem from '@/views/article/components/comment-item.vue'
export default {
  components: {
    CommentItem
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      const { data } = await addComment({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      console.log(data)
      const { results } = data.data
      this.list.push(...results)
      this.$emit('load-count', data.data)
      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }

      this.error = true
      this.loading = false
    }
  }
}
</script>

<style></style>
