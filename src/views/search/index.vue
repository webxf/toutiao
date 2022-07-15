<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <searchResult v-if="isResultShow" :search-text="searchText"></searchResult>
    <!-- 搜索建议 -->
    <searchSuccession
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></searchSuccession>
    <!-- 搜索历史记录 -->
    <searchHistory
      v-else
      :search-histories="searchHistories"
      @clear-history="searchHistories = []"
      @search="onSearch"
    ></searchHistory>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory'
import searchResult from './components/searchResult'
import searchSuccession from './components/searchSuccession'
import { getItem, setItem } from '@/utils/storage'

export default {
  components: {
    searchHistory,
    searchResult,
    searchSuccession
  },
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  watch: {
    searchHistories(val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scope>
.search-container {
  padding-top: 50px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
