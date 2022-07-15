<template>
  <div class="search-succession">
    <van-cell
      icon="search"
      v-for="(text, index) in suggessTionList"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { SearchResult } from '@/api/search'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggessTionList: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // handler(value) {
      //   // console.log(value);
      //   this.onLoadSearch(value);
      // },
      // 防抖：避免多次发出请求
      handler: debounce(function (value) {
        // console.log(value);
        this.onLoadSearch(value)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async onLoadSearch(q) {
      try {
        const { data } = await SearchResult(q)
        console.log(data)
        this.suggessTionList = data.data.options
      } catch (err) {
        this.$toast('数据加载失败')
      }
    },
    highlight(text) {
      const highlightStr = `<span class='active'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scope lang="less">
.search-succession {
  span.active {
    color: #3296fa;
  }
}
</style>
